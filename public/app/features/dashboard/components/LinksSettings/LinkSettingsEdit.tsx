import { useState } from 'react';

import { DashboardLink } from '@grafana/schema';
import { DashboardLinkForm } from 'app/features/dashboard-scene/settings/links/DashboardLinkForm';
import { NEW_LINK } from 'app/features/dashboard-scene/settings/links/utils';

import { DashboardModel } from '../../state/DashboardModel';

type LinkSettingsEditProps = {
  editLinkIdx: number;
  dashboard: DashboardModel;
  onGoBack: () => void;
};

export const LinkSettingsEdit = ({ editLinkIdx, dashboard, onGoBack }: LinkSettingsEditProps) => {
  const [linkSettings, setLinkSettings] = useState(editLinkIdx !== null ? dashboard.links[editLinkIdx] : NEW_LINK);

  const onUpdate = (link: DashboardLink) => {
    const links = [...dashboard.links];
    links.splice(editLinkIdx, 1, link);
    dashboard.links = links;
    setLinkSettings(link);
  };

<<<<<<< HEAD
  const onTagsChange = (tags: any[]) => {
    onUpdate({ ...linkSettings, tags: tags });
  };

  const onTypeChange = (selectedItem: SelectableValue) => {
    const update = { ...linkSettings, type: selectedItem.value };

    // clear props that are no longe revant for this type
    if (update.type === 'dashboards') {
      update.url = '';
      update.tooltip = '';
    } else {
      update.tags = [];
    }

    onUpdate(update);
  };

  const onIconChange = (selectedItem: SelectableValue) => {
    onUpdate({ ...linkSettings, icon: selectedItem.value });
  };

  const onChange = (ev: React.FocusEvent<HTMLInputElement>) => {
    const target = ev.currentTarget;
    onUpdate({
      ...linkSettings,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    });
  };

  const isNew = linkSettings.title === newLink.title;

  return (
    <div style={{ maxWidth: '600px' }}>
      <Field label="Title">
        <Input name="title" id="title" value={linkSettings.title} onChange={onChange} autoFocus={isNew} />
      </Field>
      <Field label="Type">
        <Select menuShouldPortal value={linkSettings.type} options={linkTypeOptions} onChange={onTypeChange} />
      </Field>
      {linkSettings.type === 'dashboards' && (
        <>
          <Field label="With tags">
            <TagsInput tags={linkSettings.tags} placeholder="add tags" onChange={onTagsChange} />
          </Field>
        </>
      )}
      {linkSettings.type === 'link' && (
        <>
          <Field label="URL">
            <Input name="url" value={linkSettings.url} onChange={onChange} />
          </Field>
          <Field label="Tooltip">
            <Input name="tooltip" value={linkSettings.tooltip} onChange={onChange} placeholder="Open dashboard" />
          </Field>
          <Field label="Icon">
            <Select menuShouldPortal value={linkSettings.icon} options={linkIconOptions} onChange={onIconChange} />
          </Field>
        </>
      )}
      <CollapsableSection label="Options" isOpen={true}>
        {linkSettings.type === 'dashboards' && (
          <Field>
            <Checkbox label="Show as dropdown" name="asDropdown" value={linkSettings.asDropdown} onChange={onChange} />
          </Field>
        )}
        <Field>
          <Checkbox
            label="Include current time range"
            name="keepTime"
            value={linkSettings.keepTime}
            onChange={onChange}
          />
        </Field>
        <Field>
          <Checkbox
            label="Include current template variable values"
            name="includeVars"
            value={linkSettings.includeVars}
            onChange={onChange}
          />
        </Field>
        <Field>
          <Checkbox
            label="Open link in new tab"
            name="targetBlank"
            value={linkSettings.targetBlank}
            onChange={onChange}
          />
        </Field>
      </CollapsableSection>
    </div>
  );
=======
  return <DashboardLinkForm link={linkSettings} onUpdate={onUpdate} onGoBack={onGoBack} />;
>>>>>>> v12.1.0
};
