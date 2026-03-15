param storageAccountName string
param location string
param tags object

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  tags: tags
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}

resource resumesContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  name: '${storageAccount.name}/default/resumes'
  properties: {
    publicAccess: 'None'
  }
}

output storageAccountId string = storageAccount.id
