import { fireEvent, render, screen } from '@testing-library/react';

import { Field } from '@grafana/ui';

import { PasswordField } from './PasswordField';

describe('PasswordField', () => {
<<<<<<< HEAD
  const props = {
    id: 'password',
    placeholder: 'enter password',
    'data-testid': 'password-field',
  };
  it('should render correctly', () => {
    render(<PasswordField {...props} />);
    expect(screen.getByTestId('password-field')).toBeInTheDocument();
=======
  it('should render correctly', () => {
    render(
      <Field label="Password">
        <PasswordField id="password" />
      </Field>
    );

    expect(screen.getByLabelText('Password')).toBeInTheDocument();
>>>>>>> v12.1.0
    expect(screen.getByRole('switch', { name: 'Show password' })).toBeInTheDocument();
  });

  it('should able to show password value if clicked on password-reveal icon', () => {
<<<<<<< HEAD
    render(<PasswordField {...props} />);
    expect(screen.getByTestId('password-field')).toHaveProperty('type', 'password');
    fireEvent.click(screen.getByRole('switch', { name: 'Show password' }));
    expect(screen.getByTestId('password-field')).toHaveProperty('type', 'text');
=======
    render(
      <Field label="Password">
        <PasswordField id="password" />
      </Field>
    );

    expect(screen.getByLabelText('Password')).toHaveProperty('type', 'password');
    fireEvent.click(screen.getByRole('switch', { name: 'Show password' }));
    expect(screen.getByLabelText('Password')).toHaveProperty('type', 'text');
>>>>>>> v12.1.0
  });
});
