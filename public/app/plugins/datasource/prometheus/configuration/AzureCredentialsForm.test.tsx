<<<<<<< HEAD
import React from 'react';
import { shallow } from 'enzyme';
=======
import { render, screen } from '@testing-library/react';

>>>>>>> v12.1.0
import AzureCredentialsForm, { Props } from './AzureCredentialsForm';

const setup = (propsFunc?: (props: Props) => Props) => {
  let props: Props = {
    managedIdentityEnabled: false,
<<<<<<< HEAD
=======
    workloadIdentityEnabled: false,
>>>>>>> v12.1.0
    credentials: {
      authType: 'clientsecret',
      azureCloud: 'azuremonitor',
      tenantId: 'e7f3f661-a933-3h3f-0294-31c4f962ec48',
      clientId: '34509fad-c0r9-45df-9e25-f1ee34af6900',
      clientSecret: undefined,
<<<<<<< HEAD
      defaultSubscriptionId: '44987801-6nn6-49he-9b2d-9106972f9789',
=======
>>>>>>> v12.1.0
    },
    azureCloudOptions: [
      { value: 'azuremonitor', label: 'Azure' },
      { value: 'govazuremonitor', label: 'Azure US Government' },
<<<<<<< HEAD
      { value: 'germanyazuremonitor', label: 'Azure Germany' },
      { value: 'chinaazuremonitor', label: 'Azure China' },
    ],
    onCredentialsChange: jest.fn(),
    getSubscriptions: jest.fn(),
=======
      { value: 'chinaazuremonitor', label: 'Azure China' },
    ],
    onCredentialsChange: jest.fn(),
    getSubscriptions: jest.fn().mockResolvedValue([]),
>>>>>>> v12.1.0
  };

  if (propsFunc) {
    props = propsFunc(props);
  }

<<<<<<< HEAD
  return shallow(<AzureCredentialsForm {...props} />);
};

describe('Render', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should disable azure monitor secret input', () => {
    const wrapper = setup((props) => ({
      ...props,
      credentials: {
        authType: 'clientsecret',
        azureCloud: 'azuremonitor',
        tenantId: 'e7f3f661-a933-3h3f-0294-31c4f962ec48',
        clientId: '34509fad-c0r9-45df-9e25-f1ee34af6900',
        clientSecret: Symbol(),
      },
    }));
    expect(wrapper).toMatchSnapshot();
  });

  it('should enable azure monitor load subscriptions button', () => {
    const wrapper = setup((props) => ({
      ...props,
      credentials: {
        authType: 'clientsecret',
        azureCloud: 'azuremonitor',
        tenantId: 'e7f3f661-a933-3h3f-0294-31c4f962ec48',
        clientId: '34509fad-c0r9-45df-9e25-f1ee34af6900',
        clientSecret: 'e7f3f661-a933-4b3f-8176-51c4f982ec48',
      },
    }));
    expect(wrapper).toMatchSnapshot();
=======
  render(<AzureCredentialsForm {...props} />);
};

describe('AzureCredentialsForm', () => {
  it('should render without error', () => {
    expect(() => setup()).not.toThrow();
  });

  it('should disable azure monitor secret input when the clientSecret is a symbol', async () => {
    setup((props) => ({
      ...props,
      credentials: {
        ...props.credentials,
        clientSecret: Symbol(),
      },
    }));
    expect(await screen.findByLabelText('Client Secret')).toBeDisabled();
>>>>>>> v12.1.0
  });
});
