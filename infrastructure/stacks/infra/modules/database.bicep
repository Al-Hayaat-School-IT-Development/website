param serverName string
param location string
param tags object
param adminLogin string
@secure()
param adminPassword string

@description('Principal (object) ID of the user-assigned managed identity — set as Entra admin on the PostgreSQL server')
param identityPrincipalId string

@description('Display name of the managed identity — used as the PostgreSQL Entra admin username')
param identityName string

resource pgServer 'Microsoft.DBforPostgreSQL/flexibleServers@2023-06-01-preview' = {
  name: serverName
  location: location
  tags: tags
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  properties: {
    administratorLogin: adminLogin
    administratorLoginPassword: adminPassword
    version: '15'
    storage: {
      storageSizeGB: 32
    }
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
    }
    highAvailability: {
      mode: 'Disabled'
    }
    // Enable Entra ID auth alongside password auth.
    // passwordAuth stays Enabled so local psql / emergency admin access still works.
    // Once fully validated, passwordAuth can be set to Disabled.
    authConfig: {
      activeDirectoryAuth: 'Enabled'
      passwordAuth: 'Enabled'
    }
  }
}

// Register the app's managed identity as an Entra admin on the PostgreSQL server.
// This allows the App Service to authenticate with an OAuth2 access token instead of a password.
resource entraAdmin 'Microsoft.DBforPostgreSQL/flexibleServers/administrators@2023-06-01-preview' = {
  name: identityPrincipalId
  parent: pgServer
  properties: {
    principalType: 'ServicePrincipal'
    principalName: identityName
    tenantId: tenant().tenantId
  }
}

resource database 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2023-06-01-preview' = {
  name: 'alhayaat_db'
  parent: pgServer
}

output serverFqdn string = pgServer.properties.fullyQualifiedDomainName
output serverName string = pgServer.name
