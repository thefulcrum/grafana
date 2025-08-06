<<<<<<< HEAD
import React, { ChangeEvent, FunctionComponent, useEffect, useReducer, useState } from 'react';
import { SelectableValue } from '@grafana/data';
import { InlineFormLabel, Button } from '@grafana/ui/src/components';
import { Select } from '@grafana/ui/src/components/Forms/Legacy/Select/Select';
import { Input } from '@grafana/ui/src/components/Forms/Legacy/Input/Input';
import { AzureAuthType, AzureCredentials, isCredentialsComplete } from './AzureCredentials';

export interface Props {
  managedIdentityEnabled: boolean;
=======
import { cx } from '@emotion/css';
import { ChangeEvent, useMemo } from 'react';

import { AzureAuthType, AzureCredentials } from '@grafana/azure-sdk';
import { SelectableValue } from '@grafana/data';
import { InlineFormLabel, Button, Select, Input } from '@grafana/ui';

export interface Props {
  managedIdentityEnabled: boolean;
  workloadIdentityEnabled: boolean;
>>>>>>> v12.1.0
  credentials: AzureCredentials;
  azureCloudOptions?: SelectableValue[];
  onCredentialsChange: (updatedCredentials: AzureCredentials) => void;
  getSubscriptions?: () => Promise<SelectableValue[]>;
<<<<<<< HEAD
}

const authTypeOptions: Array<SelectableValue<AzureAuthType>> = [
  {
    value: 'msi',
    label: 'Managed Identity',
  },
  {
    value: 'clientsecret',
    label: 'App Registration',
  },
];

export const AzureCredentialsForm: FunctionComponent<Props> = (props: Props) => {
  const { credentials, azureCloudOptions, onCredentialsChange, getSubscriptions } = props;
  const hasRequiredFields = isCredentialsComplete(credentials);

  const [subscriptions, setSubscriptions] = useState<Array<SelectableValue<string>>>([]);
  const [loadSubscriptionsClicked, onLoadSubscriptions] = useReducer((val) => val + 1, 0);
  useEffect(() => {
    if (!getSubscriptions || !hasRequiredFields) {
      updateSubscriptions([]);
      return;
    }
    let canceled = false;
    getSubscriptions().then((result) => {
      if (!canceled) {
        updateSubscriptions(result, loadSubscriptionsClicked);
      }
    });
    return () => {
      canceled = true;
    };
    // This effect is intended to be called only once initially and on Load Subscriptions click
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadSubscriptionsClicked]);

  const updateSubscriptions = (received: Array<SelectableValue<string>>, autoSelect = false) => {
    setSubscriptions(received);
    if (getSubscriptions) {
      if (autoSelect && !credentials.defaultSubscriptionId && received.length > 0) {
        // Selecting the default subscription if subscriptions received but no default subscription selected
        onSubscriptionChange(received[0]);
      } else if (credentials.defaultSubscriptionId) {
        const found = received.find((opt) => opt.value === credentials.defaultSubscriptionId);
        if (!found) {
          // Unselecting the default subscription if it isn't found among the received subscriptions
          onSubscriptionChange(undefined);
        }
      }
    }
  };

  const onAuthTypeChange = (selected: SelectableValue<AzureAuthType>) => {
    if (onCredentialsChange) {
      setSubscriptions([]);
      const updated: AzureCredentials = {
        ...credentials,
        authType: selected.value || 'msi',
        defaultSubscriptionId: undefined,
      };
      onCredentialsChange(updated);
    }
  };

  const onAzureCloudChange = (selected: SelectableValue<string>) => {
    if (onCredentialsChange && credentials.authType === 'clientsecret') {
      setSubscriptions([]);
      const updated: AzureCredentials = {
        ...credentials,
        azureCloud: selected.value,
        defaultSubscriptionId: undefined,
=======
  disabled?: boolean;
}

export const AzureCredentialsForm = (props: Props) => {
  const {
    credentials,
    azureCloudOptions,
    onCredentialsChange,
    disabled,
    managedIdentityEnabled,
    workloadIdentityEnabled,
  } = props;

  const authTypeOptions = useMemo(() => {
    let opts: Array<SelectableValue<AzureAuthType>> = [
      {
        value: 'clientsecret',
        label: 'App Registration',
      },
    ];

    if (managedIdentityEnabled) {
      opts.push({
        value: 'msi',
        label: 'Managed Identity',
      });
    }

    if (workloadIdentityEnabled) {
      opts.push({
        value: 'workloadidentity',
        label: 'Workload Identity',
      });
    }
    return opts;
  }, [managedIdentityEnabled, workloadIdentityEnabled]);

  const onAuthTypeChange = (selected: SelectableValue<AzureAuthType>) => {
    const defaultAuthType = managedIdentityEnabled
      ? 'msi'
      : workloadIdentityEnabled
        ? 'workloadidentity'
        : 'clientsecret';
    const updated: AzureCredentials = {
      ...credentials,
      authType: selected.value || defaultAuthType,
    };
    onCredentialsChange(updated);
  };

  const onAzureCloudChange = (selected: SelectableValue<string>) => {
    if (credentials.authType === 'clientsecret') {
      const updated: AzureCredentials = {
        ...credentials,
        azureCloud: selected.value,
>>>>>>> v12.1.0
      };
      onCredentialsChange(updated);
    }
  };

  const onTenantIdChange = (event: ChangeEvent<HTMLInputElement>) => {
<<<<<<< HEAD
    if (onCredentialsChange && credentials.authType === 'clientsecret') {
      setSubscriptions([]);
      const updated: AzureCredentials = {
        ...credentials,
        tenantId: event.target.value,
        defaultSubscriptionId: undefined,
=======
    if (credentials.authType === 'clientsecret') {
      const updated: AzureCredentials = {
        ...credentials,
        tenantId: event.target.value,
>>>>>>> v12.1.0
      };
      onCredentialsChange(updated);
    }
  };

  const onClientIdChange = (event: ChangeEvent<HTMLInputElement>) => {
<<<<<<< HEAD
    if (onCredentialsChange && credentials.authType === 'clientsecret') {
      setSubscriptions([]);
      const updated: AzureCredentials = {
        ...credentials,
        clientId: event.target.value,
        defaultSubscriptionId: undefined,
=======
    if (credentials.authType === 'clientsecret') {
      const updated: AzureCredentials = {
        ...credentials,
        clientId: event.target.value,
>>>>>>> v12.1.0
      };
      onCredentialsChange(updated);
    }
  };

  const onClientSecretChange = (event: ChangeEvent<HTMLInputElement>) => {
<<<<<<< HEAD
    if (onCredentialsChange && credentials.authType === 'clientsecret') {
      setSubscriptions([]);
      const updated: AzureCredentials = {
        ...credentials,
        clientSecret: event.target.value,
        defaultSubscriptionId: undefined,
=======
    if (credentials.authType === 'clientsecret') {
      const updated: AzureCredentials = {
        ...credentials,
        clientSecret: event.target.value,
>>>>>>> v12.1.0
      };
      onCredentialsChange(updated);
    }
  };

  const onClientSecretReset = () => {
<<<<<<< HEAD
    if (onCredentialsChange && credentials.authType === 'clientsecret') {
      setSubscriptions([]);
      const updated: AzureCredentials = {
        ...credentials,
        clientSecret: '',
        defaultSubscriptionId: undefined,
      };
      onCredentialsChange(updated);
    }
  };

  const onSubscriptionChange = (selected: SelectableValue<string> | undefined) => {
    if (onCredentialsChange) {
      const updated: AzureCredentials = {
        ...credentials,
        defaultSubscriptionId: selected?.value,
=======
    if (credentials.authType === 'clientsecret') {
      const updated: AzureCredentials = {
        ...credentials,
        clientSecret: '',
>>>>>>> v12.1.0
      };
      onCredentialsChange(updated);
    }
  };

  return (
    <div className="gf-form-group">
<<<<<<< HEAD
      {props.managedIdentityEnabled && (
=======
      {authTypeOptions.length > 1 && (
>>>>>>> v12.1.0
        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel className="width-12" tooltip="Choose the type of authentication to Azure services">
              Authentication
            </InlineFormLabel>
            <Select
<<<<<<< HEAD
              menuShouldPortal
=======
>>>>>>> v12.1.0
              className="width-15"
              value={authTypeOptions.find((opt) => opt.value === credentials.authType)}
              options={authTypeOptions}
              onChange={onAuthTypeChange}
<<<<<<< HEAD
=======
              isDisabled={disabled}
>>>>>>> v12.1.0
            />
          </div>
        </div>
      )}
      {credentials.authType === 'clientsecret' && (
        <>
          {azureCloudOptions && (
            <div className="gf-form-inline">
              <div className="gf-form">
                <InlineFormLabel className="width-12" tooltip="Choose an Azure Cloud">
                  Azure Cloud
                </InlineFormLabel>
                <Select
<<<<<<< HEAD
                  menuShouldPortal
=======
>>>>>>> v12.1.0
                  className="width-15"
                  value={azureCloudOptions.find((opt) => opt.value === credentials.azureCloud)}
                  options={azureCloudOptions}
                  onChange={onAzureCloudChange}
<<<<<<< HEAD
=======
                  isDisabled={disabled}
>>>>>>> v12.1.0
                />
              </div>
            </div>
          )}
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-12">Directory (tenant) ID</InlineFormLabel>
              <div className="width-15">
                <Input
<<<<<<< HEAD
                  className="width-30"
                  placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                  value={credentials.tenantId || ''}
                  onChange={onTenantIdChange}
=======
                  className={cx('width-20')}
                  placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                  value={credentials.tenantId || ''}
                  onChange={onTenantIdChange}
                  disabled={disabled}
>>>>>>> v12.1.0
                />
              </div>
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-12">Application (client) ID</InlineFormLabel>
              <div className="width-15">
                <Input
<<<<<<< HEAD
                  className="width-30"
                  placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                  value={credentials.clientId || ''}
                  onChange={onClientIdChange}
=======
                  className={cx('width-20')}
                  placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                  value={credentials.clientId || ''}
                  onChange={onClientIdChange}
                  disabled={disabled}
>>>>>>> v12.1.0
                />
              </div>
            </div>
          </div>
          {typeof credentials.clientSecret === 'symbol' ? (
            <div className="gf-form-inline">
              <div className="gf-form">
<<<<<<< HEAD
                <InlineFormLabel className="width-12">Client Secret</InlineFormLabel>
                <Input className="width-25" placeholder="configured" disabled={true} />
              </div>
              <div className="gf-form">
                <div className="max-width-30 gf-form-inline">
                  <Button variant="secondary" type="button" onClick={onClientSecretReset}>
                    reset
                  </Button>
                </div>
              </div>
=======
                <InlineFormLabel htmlFor="azure-client-secret" className="width-12">
                  Client Secret
                </InlineFormLabel>
                <Input id="azure-client-secret" className={cx('width-20')} placeholder="configured" disabled />
              </div>
              {!disabled && (
                <div className="gf-form">
                  <div className={cx('max-width-20 gf-form-inline')}>
                    <Button variant="secondary" type="button" onClick={onClientSecretReset}>
                      reset
                    </Button>
                  </div>
                </div>
              )}
>>>>>>> v12.1.0
            </div>
          ) : (
            <div className="gf-form-inline">
              <div className="gf-form">
                <InlineFormLabel className="width-12">Client Secret</InlineFormLabel>
                <div className="width-15">
                  <Input
<<<<<<< HEAD
                    className="width-30"
                    placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                    value={credentials.clientSecret || ''}
                    onChange={onClientSecretChange}
=======
                    className={cx('width-20')}
                    placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                    value={credentials.clientSecret || ''}
                    onChange={onClientSecretChange}
                    disabled={disabled}
>>>>>>> v12.1.0
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
<<<<<<< HEAD
      {getSubscriptions && (
        <>
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-12">Default Subscription</InlineFormLabel>
              <div className="width-25">
                <Select
                  menuShouldPortal
                  value={
                    credentials.defaultSubscriptionId
                      ? subscriptions.find((opt) => opt.value === credentials.defaultSubscriptionId)
                      : undefined
                  }
                  options={subscriptions}
                  onChange={onSubscriptionChange}
                />
              </div>
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <div className="max-width-30 gf-form-inline">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={onLoadSubscriptions}
                  disabled={!hasRequiredFields}
                >
                  Load Subscriptions
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
=======
>>>>>>> v12.1.0
    </div>
  );
};

export default AzureCredentialsForm;
