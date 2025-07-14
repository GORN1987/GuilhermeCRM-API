import { DataSource } from 'typeorm';
import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const keyVaultUrl = process.env.KEY_VAULT_URL;
      if (!keyVaultUrl) {
        throw new Error("KEY_VAULT_URL environment variable is not set.");
      }

      const credential = new DefaultAzureCredential();
      const client = new SecretClient(keyVaultUrl, credential);

      // Fetch secrets from Azure Key Vault
      const dbHost = (await client.getSecret("db-host")).value;
      const dbUsername = (await client.getSecret("db-username")).value;
      const dbPassword = (await client.getSecret("db-password")).value;
      const dbName = (await client.getSecret("db-name")).value;

      if (!dbHost || !dbUsername || !dbPassword || !dbName) {
        throw new Error("Could not retrieve all database credentials from Key Vault.");
      }

      const dataSource = new DataSource({
        type: 'mssql',
        host: dbHost,
        port: 1433,
        username: dbUsername,
        password: dbPassword,
        database: dbName,
        logging: ["query", "error"],
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        // Note: synchronize: true is not recommended for production.
        // Use migrations instead.
        synchronize: true,
        options: {
            // Encrypt connection for Azure SQL
            encrypt: true,
        }
      });

      return dataSource.initialize();
    },
  },
];