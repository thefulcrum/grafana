import { OrgRole } from '@grafana/data';
import { t } from '@grafana/i18n';
import { Select } from '@grafana/ui';

interface Props {
  value: OrgRole;
  disabled?: boolean;
  'aria-label'?: string;
  inputId?: string;
  onChange: (role: OrgRole) => void;
  autoFocus?: boolean;
  width?: number | 'auto';
}

const basicRoles = Object.values(OrgRole).filter((r) => r !== OrgRole.None);
const options = basicRoles.map((r) => ({ label: r, value: r }));

<<<<<<< HEAD
export const OrgRolePicker: FC<Props> = ({ value, onChange, ...restProps }) => (
  <Select
    menuShouldPortal
    value={value}
    options={options}
    onChange={(val) => onChange(val.value as OrgRole)}
    placeholder="Choose role..."
    {...restProps}
  />
);
=======
export function OrgRolePicker({ value, onChange, 'aria-label': ariaLabel, inputId, autoFocus, ...restProps }: Props) {
  return (
    <Select
      inputId={inputId}
      value={value}
      options={options}
      onChange={(val) => onChange(val.value ?? OrgRole.None)}
      placeholder={t('admin.org-role-picker.placeholder-choose-role', 'Choose role...')}
      aria-label={ariaLabel}
      autoFocus={autoFocus}
      {...restProps}
    />
  );
}
>>>>>>> v12.1.0
