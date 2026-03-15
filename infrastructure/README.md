# Azure Infrastructure (Bicep)

## Deploy

```bash
# Dev
az deployment group create \
  --resource-group rg-alhayaat-dev \
  --template-file infrastructure/main.bicep \
  --parameters infrastructure/parameters/dev.json

# Staging
az deployment group create \
  --resource-group rg-alhayaat-staging \
  --template-file infrastructure/main.bicep \
  --parameters infrastructure/parameters/staging.json

# Production
az deployment group create \
  --resource-group rg-alhayaat-prod \
  --template-file infrastructure/main.bicep \
  --parameters infrastructure/parameters/prod.json
```

## Key Vault Secrets to Set After Deployment

| Secret Name | Description |
|-------------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| NEXTAUTH_SECRET | Random 32-byte base64 string |
| STRIPE_SECRET_KEY | Stripe secret key |
| STRIPE_WEBHOOK_SECRET | Stripe webhook signing secret |
| RESEND_API_KEY | Resend email API key |
