<<<<<<< HEAD
import { DataSourceSettings } from '@grafana/data';
import { config } from '@grafana/runtime';
import { AzureCloud, AzureCredentials, ConcealedSecret } from './AzureCredentials';

const concealed: ConcealedSecret = Symbol('Concealed client secret');

function getDefaultAzureCloud(): string {
  return config.azure.cloud || AzureCloud.Public;
}

function getSecret(options: DataSourceSettings<any, any>): undefined | string | ConcealedSecret {
  if (options.secureJsonFields.azureClientSecret) {
    // The secret is concealed on server
    return concealed;
  } else {
    const secret = options.secureJsonData?.azureClientSecret;
    return typeof secret === 'string' && secret.length > 0 ? secret : undefined;
  }
}

export function getCredentials(options: DataSourceSettings<any, any>): AzureCredentials {
  const credentials = options.jsonData.azureCredentials as AzureCredentials | undefined;

  // If no credentials saved, then return empty credentials
  // of type based on whether the managed identity enabled
  if (!credentials) {
    return {
      authType: config.azure.managedIdentityEnabled ? 'msi' : 'clientsecret',
      azureCloud: getDefaultAzureCloud(),
    };
  }

  switch (credentials.authType) {
    case 'msi':
      if (config.azure.managedIdentityEnabled) {
        return {
          authType: 'msi',
        };
      } else {
        // If authentication type is managed identity but managed identities were disabled in Grafana config,
        // then we should fallback to an empty app registration (client secret) configuration
        return {
          authType: 'clientsecret',
          azureCloud: getDefaultAzureCloud(),
        };
      }
    case 'clientsecret':
      return {
        authType: 'clientsecret',
        azureCloud: credentials.azureCloud || getDefaultAzureCloud(),
        tenantId: credentials.tenantId,
        clientId: credentials.clientId,
        clientSecret: getSecret(options),
      };
  }
}

export function updateCredentials(
  options: DataSourceSettings<any, any>,
  credentials: AzureCredentials
): DataSourceSettings<any, any> {
  switch (credentials.authType) {
    case 'msi':
      if (!config.azure.managedIdentityEnabled) {
        throw new Error('Managed Identity authentication is not enabled in Grafana config.');
      }

      options = {
        ...options,
        jsonData: {
          ...options.jsonData,
          azureCredentials: {
            authType: 'msi',
          },
        },
      };

      return options;

    case 'clientsecret':
      options = {
        ...options,
        jsonData: {
          ...options.jsonData,
          azureCredentials: {
            authType: 'clientsecret',
            azureCloud: credentials.azureCloud || getDefaultAzureCloud(),
            tenantId: credentials.tenantId,
            clientId: credentials.clientId,
          },
        },
        secureJsonData: {
          ...options.secureJsonData,
          azureClientSecret:
            typeof credentials.clientSecret === 'string' && credentials.clientSecret.length > 0
              ? credentials.clientSecret
              : undefined,
        },
        secureJsonFields: {
          ...options.secureJsonFields,
          azureClientSecret: typeof credentials.clientSecret === 'symbol',
        },
      };

      return options;
  }
}
=======
import {
  AzureCredentials,
  AzureDataSourceJsonData,
  AzureDataSourceSecureJsonData,
  AzureDataSourceSettings,
  getAzureClouds,
  getDatasourceCredentials,
  getDefaultAzureCloud,
  updateDatasourceCredentials,
} from '@grafana/azure-sdk';
import { DataSourceSettings, SelectableValue } from '@grafana/data';
import { PromOptions } from '@grafana/prometheus';
import { config } from '@grafana/runtime';

export function getAzureCloudOptions(): Array<SelectableValue<string>> {
  const cloudInfo = getAzureClouds();

  return cloudInfo.map((cloud) => ({
    value: cloud.name,
    label: cloud.displayName,
  }));
}

export function getDefaultCredentials(): AzureCredentials {
  if (config.azure.managedIdentityEnabled) {
    return { authType: 'msi' };
  } else {
    return { authType: 'clientsecret', azureCloud: getDefaultAzureCloud() };
  }
}

export function getCredentials(options: AzureDataSourceSettings): AzureCredentials {
  const credentials = getDatasourceCredentials(options);
  if (credentials) {
    return credentials;
  }

  // If no credentials saved, then return empty credentials
  // of type based on whether the managed identity enabled
  return getDefaultCredentials();
}

export function updateCredentials(
  options: AzurePromDataSourceSettings,
  credentials: AzureCredentials
): AzurePromDataSourceSettings {
  return updateDatasourceCredentials(options, credentials);
}

export function setDefaultCredentials(options: AzurePromDataSourceSettings): Partial<AzurePromDataSourceSettings> {
  return {
    jsonData: {
      ...options.jsonData,
      azureCredentials: getDefaultCredentials(),
    },
  };
}

export function resetCredentials(options: AzurePromDataSourceSettings): Partial<AzurePromDataSourceSettings> {
  return {
    jsonData: {
      ...options.jsonData,
      azureCredentials: undefined,
      azureEndpointResourceId: undefined,
    },
  };
}

export interface AzurePromDataSourceOptions extends PromOptions, AzureDataSourceJsonData {
  azureEndpointResourceId?: string;
}

export type AzurePromDataSourceSettings = DataSourceSettings<AzurePromDataSourceOptions, AzureDataSourceSecureJsonData>;
>>>>>>> v12.1.0
