// Al-Hayaat School — Azure Infrastructure
// Deploy: az deployment group create --resource-group rg-alhayaat-{env} --template-file infrastructure/main.bicep --parameters infrastructure/parameters/{env}.json

@description('Environment name (dev, staging, prod)')
param environment string

@description('Location for all resources')
param location string = resourceGroup().location

@description('PostgreSQL admin login')
param dbAdminLogin string

@secure()
@description('PostgreSQL admin password')
param dbAdminPassword string

var appName = 'al-hayaat-${environment}'
var tags = {
  project: 'al-hayaat-school'
  environment: environment
}

module appService 'modules/app-service.bicep' = {
  name: 'appService'
  params: {
    appName: appName
    location: location
    tags: tags
    environment: environment
  }
}

module database 'modules/database.bicep' = {
  name: 'database'
  params: {
    serverName: '${appName}-psql'
    location: location
    tags: tags
    adminLogin: dbAdminLogin
    adminPassword: dbAdminPassword
  }
}

module keyVault 'modules/keyvault.bicep' = {
  name: 'keyVault'
  params: {
    vaultName: '${appName}-kv'
    location: location
    tags: tags
    appServicePrincipalId: appService.outputs.principalId
  }
}

module storage 'modules/storage.bicep' = {
  name: 'storage'
  params: {
    storageAccountName: replace('${appName}storage', '-', '')
    location: location
    tags: tags
  }
}

output appServiceUrl string = appService.outputs.defaultHostName
output keyVaultName string = keyVault.outputs.vaultName
