import { PureComponent } from 'react';

import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { ConnectionConfig } from '@grafana/google-sdk';
import { ConfigSection, DataSourceDescription } from '@grafana/plugin-ui';
import { reportInteraction, config } from '@grafana/runtime';
import { Divider, SecureSocksProxySettings } from '@grafana/ui';

import { CloudMonitoringOptions, CloudMonitoringSecureJsonData } from '../../types/types';

export type Props = DataSourcePluginOptionsEditorProps<CloudMonitoringOptions, CloudMonitoringSecureJsonData>;

export class ConfigEditor extends PureComponent<Props> {
  handleOnOptionsChange = (options: Props['options']) => {
    if (options.jsonData.privateKeyPath || options.secureJsonFields['privateKey']) {
      reportInteraction('grafana_cloud_monitoring_config_changed', {
        authenticationType: 'JWT',
        privateKey: options.secureJsonFields['privateKey'],
        privateKeyPath: !!options.jsonData.privateKeyPath,
      });
    }
    this.props.onOptionsChange(options);
  };

  render() {
    const { options, onOptionsChange } = this.props;
    return (
      <>
<<<<<<< HEAD
        <div className="gf-form-group">
          <div className="grafana-info-box">
            <h4>Google Cloud Monitoring Authentication</h4>
            <p>
              There are two ways to authenticate the Google Cloud Monitoring plugin - either by uploading a Service
              Account key file or by automatically retrieving credentials from the Google metadata server. The latter
              option is only available when running Grafana on a GCE virtual machine.
            </p>

            <h5>Uploading a Service Account Key File</h5>
            <p>
              There are two ways to authenticate the Google Cloud Monitoring plugin. You can upload a Service Account
              key file or automatically retrieve credentials from the Google metadata server. The latter option is only
              available when running Grafana on a GCE virtual machine.
            </p>
            <p>
              The <strong>Monitoring Viewer</strong> role provides all the permissions that Grafana needs. The following
              API needs to be enabled on GCP for the data source to work:{' '}
              <a
                className="external-link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://console.cloud.google.com/apis/library/monitoring.googleapis.com"
              >
                Monitoring API
              </a>
            </p>

            <h5>GCE Default Service Account</h5>
            <p>
              If Grafana is running on a Google Compute Engine (GCE) virtual machine, it is possible for Grafana to
              automatically retrieve the default project id and authentication token from the metadata server. In order
              for this to work, you need to make sure that you have a service account that is setup as the default
              account for the virtual machine and that the service account has been given read access to the Google
              Cloud Monitoring Monitoring API.
            </p>

            <p>
              Detailed instructions on how to create a Service Account can be found{' '}
              <a
                className="external-link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://grafana.com/docs/grafana/latest/datasources/google-cloud-monitoring/"
              >
                in the documentation.
              </a>
            </p>
          </div>
        </div>

        <FieldSet>
          <InlineField label="Authentication type" labelWidth={20}>
            <Select
              menuShouldPortal
              width={40}
              value={authTypes.find((x) => x.value === jsonData.authenticationType) || authTypes[0]}
              options={authTypes}
              defaultValue={jsonData.authenticationType}
              onChange={onUpdateDatasourceJsonDataOptionSelect(this.props, 'authenticationType')}
            />
          </InlineField>
          {jsonData.authenticationType === AuthType.JWT && (
            <JWTConfig
              isConfigured={secureJsonFields && !!secureJsonFields.jwt}
              onChange={({ private_key, client_email, project_id, token_uri }) => {
                onOptionsChange({
                  ...options,
                  secureJsonData: {
                    ...options.secureJsonData,
                    privateKey: private_key,
                  },
                  jsonData: {
                    ...options.jsonData,
                    defaultProject: project_id,
                    clientEmail: client_email,
                    tokenUri: token_uri,
                  },
                });
              }}
            ></JWTConfig>
          )}
        </FieldSet>
        {jsonData.authenticationType === AuthType.GCE && (
          <Alert title="" severity="info">
            Verify GCE default service account by clicking Save & Test
          </Alert>
=======
        <DataSourceDescription
          dataSourceName="Google Cloud Monitoring"
          docsLink="https://grafana.com/docs/grafana/latest/datasources/google-cloud-monitoring/"
          hasRequiredFields
        />
        <Divider />
        <ConnectionConfig {...this.props} onOptionsChange={this.handleOnOptionsChange}></ConnectionConfig>
        {config.secureSocksDSProxyEnabled && (
          <>
            <Divider />
            <ConfigSection
              title="Additional settings"
              description="Additional settings are optional settings that can be configured for more control over your data source. This includes Secure Socks Proxy."
              isCollapsible={true}
              isInitiallyOpen={options.jsonData.enableSecureSocksProxy !== undefined}
            >
              <SecureSocksProxySettings options={options} onOptionsChange={onOptionsChange} />
            </ConfigSection>
          </>
>>>>>>> v12.1.0
        )}
      </>
    );
  }
}
