@description('Application name')
param appName string
param location string
param tags object
param environment string

var skuMap = {
  dev: { name: 'B1', tier: 'Basic' }
  staging: { name: 'S1', tier: 'Standard' }
  prod: { name: 'P1v2', tier: 'PremiumV2' }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: '${appName}-plan'
  location: location
  tags: tags
  sku: skuMap[environment]
  kind: 'linux'
  properties: {
    reserved: true
  }
}

resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: appName
  location: location
  tags: tags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|20-lts'
      nodeVersion: '20-lts'
      appSettings: [
        { name: 'NODE_ENV', value: 'production' }
        { name: 'NEXTAUTH_URL', value: 'https://${appName}.azurewebsites.net' }
        // Secrets referenced from Key Vault — set after keyvault module deploys
      ]
      alwaysOn: environment != 'dev'
    }
    httpsOnly: true
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${appName}-insights'
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    RetentionInDays: 90
  }
}

output defaultHostName string = appService.properties.defaultHostName
output principalId string = appService.identity.principalId
