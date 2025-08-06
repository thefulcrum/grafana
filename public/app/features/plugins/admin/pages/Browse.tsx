import { css } from '@emotion/css';
<<<<<<< HEAD
import { SelectableValue, dateTimeParse, GrafanaTheme2 } from '@grafana/data';
import { LoadingPlaceholder, Select, RadioButtonGroup, useStyles2 } from '@grafana/ui';
import { useLocation } from 'react-router-dom';
import { locationSearchToObject } from '@grafana/runtime';
import { GrafanaRouteComponentProps } from 'app/core/navigation/types';
import { PluginList } from '../components/PluginList';
import { SearchField } from '../components/SearchField';
import { useHistory } from '../hooks/useHistory';
import { CatalogPlugin, PluginAdminRoutes } from '../types';
import { Page as PluginPage } from '../components/Page';
import { HorizontalGroup } from '../components/HorizontalGroup';
=======
import { useState } from 'react';
import { useLocation } from 'react-router-dom-v5-compat';

import { SelectableValue, GrafanaTheme2, PluginType } from '@grafana/data';
import { Trans, t } from '@grafana/i18n';
import { locationSearchToObject } from '@grafana/runtime';
import { Select, RadioButtonGroup, useStyles2, Tooltip, Field, TextLink } from '@grafana/ui';
>>>>>>> v12.1.0
import { Page } from 'app/core/components/Page/Page';
import { getNavModel } from 'app/core/selectors/navModel';
import { AdvisorRedirectNotice } from 'app/features/connections/components/AdvisorRedirectNotice/AdvisorRedirectNotice';
import { ROUTES as CONNECTIONS_ROUTES } from 'app/features/connections/constants';
import { useSelector } from 'app/types/store';

<<<<<<< HEAD
export default function Browse({ route }: GrafanaRouteComponentProps): ReactElement | null {
  const location = useLocation();
  const query = locationSearchToObject(location.search);
  const navModelId = getNavModelId(route.routeName);
  const navModel = useSelector((state: StoreState) => getNavModel(state.navIndex, navModelId));
  const styles = useStyles2(getStyles);

  const q = (query.q as string) ?? '';
  const filterBy = (query.filterBy as string) ?? 'installed';
  const filterByType = (query.filterByType as string) ?? 'all';
  const sortBy = (query.sortBy as string) ?? 'nameAsc';

  const { plugins, isLoading, error } = usePluginsByFilter({ searchBy: q, filterBy, filterByType });
  const sortedPlugins = plugins.sort(sorters[sortBy]);
=======
import { HorizontalGroup } from '../components/HorizontalGroup';
import { PluginList } from '../components/PluginList';
import { RoadmapLinks } from '../components/RoadmapLinks';
import { SearchField } from '../components/SearchField';
import UpdateAllButton from '../components/UpdateAllButton';
import { UpdateAllModal } from '../components/UpdateAllModal';
import { Sorters } from '../helpers';
import { useHistory } from '../hooks/useHistory';
import { useGetAll, useGetUpdatable, useIsRemotePluginsAvailable } from '../state/hooks';

export default function Browse() {
  const location = useLocation();
  const locationSearch = locationSearchToObject(location.search);
  const navModel = useSelector((state) => getNavModel(state.navIndex, 'plugins'));
  const styles = useStyles2(getStyles);
>>>>>>> v12.1.0
  const history = useHistory();
  const remotePluginsAvailable = useIsRemotePluginsAvailable();

  const keyword = locationSearch.q?.toString() || '';
  const filterBy = locationSearch.filterBy?.toString() || 'all';
  const filterByType = (locationSearch.filterByType as PluginType | 'all') || 'all';
  const sortBy = (locationSearch.sortBy as Sorters) || Sorters.nameAsc;
  const { isLoading, error, plugins } = useGetAll(
    {
      keyword,
      type: filterByType !== 'all' ? filterByType : undefined,
      isInstalled: filterBy === 'installed' ? true : undefined,
      hasUpdate: filterBy === 'has-update' ? true : undefined,
    },
    sortBy
  );

  const filterByOptions = [
    { value: 'all', label: t('plugins.browse.filter-by-options.label.all', 'All') },
    { value: 'installed', label: t('plugins.browse.filter-by-options.label.installed', 'Installed') },
    { value: 'has-update', label: t('plugins.browse.filter-by-options.label.new-updates', 'New Updates') },
  ];

  const { isLoading: areUpdatesLoading, updatablePlugins } = useGetUpdatable();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const disableUpdateAllButton = updatablePlugins.length <= 0 || areUpdatesLoading;

  const onFilterByChange = (value: string) => {
    history.push({ query: { filterBy: value } });
  };

<<<<<<< HEAD
  const onFilterByChange = (value: string) => {
    history.push({ query: { filterBy: value } });
  };

  const onFilterByTypeChange = (value: string) => {
    history.push({ query: { filterByType: value } });
  };

  const onSearch = (q: any) => {
    history.push({ query: { filterBy: 'all', filterByType: 'all', q } });
=======
  const onFilterByTypeChange = (value: SelectableValue<string>) => {
    history.push({ query: { filterByType: value.value } });
  };

  const onSearch = (q: string) => {
    history.push({ query: { filterBy, filterByType, q } });
  };

  const onUpdateAll = () => {
    setShowUpdateModal(true);
>>>>>>> v12.1.0
  };

  // How should we handle errors?
  if (error) {
    console.error(error.message);
    return null;
  }

<<<<<<< HEAD
  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <PluginPage>
          <HorizontalGroup wrap>
            <SearchField value={q} onSearch={onSearch} />
            <HorizontalGroup wrap className={styles.actionBar}>
              <div>
                <RadioButtonGroup
                  value={filterByType}
                  onChange={onFilterByTypeChange}
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'datasource', label: 'Data sources' },
                    { value: 'panel', label: 'Panels' },
                    { value: 'app', label: 'Applications' },
                  ]}
                />
              </div>
              <div>
                <RadioButtonGroup
                  value={filterBy}
                  onChange={onFilterByChange}
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'installed', label: 'Installed' },
                  ]}
                />
              </div>
              <div>
                <Select
                  menuShouldPortal
                  width={24}
                  value={sortBy}
                  onChange={onSortByChange}
                  options={[
                    { value: 'nameAsc', label: 'Sort by name (A-Z)' },
                    { value: 'nameDesc', label: 'Sort by name (Z-A)' },
                    { value: 'updated', label: 'Sort by updated date' },
                    { value: 'published', label: 'Sort by published date' },
                    { value: 'downloads', label: 'Sort by downloads' },
                  ]}
                />
              </div>
            </HorizontalGroup>
          </HorizontalGroup>
          <div className={styles.listWrap}>
            {isLoading ? (
              <LoadingPlaceholder
                className={css`
                  margin-bottom: 0;
                `}
                text="Loading results"
              />
            ) : (
              <PluginList plugins={sortedPlugins} />
            )}
          </div>
        </PluginPage>
=======
  const subTitle = (
    <div>
      <Trans i18nKey="plugins.browse.subtitle">
        Extend the Grafana experience with panel plugins and apps. To find more data sources go to{' '}
        <TextLink href={`${CONNECTIONS_ROUTES.AddNewConnection}?cat=data-source`}>Connections</TextLink>.
      </Trans>
    </div>
  );

  const updateAllButton = (
    <UpdateAllButton
      disabled={disableUpdateAllButton}
      onUpdateAll={onUpdateAll}
      updatablePluginsLength={updatablePlugins.length}
    />
  );

  return (
    <Page navModel={navModel} actions={updateAllButton} subTitle={subTitle}>
      <Page.Contents>
        <AdvisorRedirectNotice />
        <HorizontalGroup wrap>
          <Field label={t('plugins.browse.label-search', 'Search')}>
            <SearchField value={keyword} onSearch={onSearch} />
          </Field>
          <HorizontalGroup wrap className={styles.actionBar}>
            {/* Filter by type */}
            <Field label={t('plugins.browse.label-type', 'Type')}>
              <Select
                aria-label={t('plugins.browse.aria-label-plugin-type-filter', 'Plugin type filter')}
                value={filterByType}
                onChange={onFilterByTypeChange}
                width={18}
                options={[
                  { value: 'all', label: t('plugins.browse.label.all', 'All') },
                  { value: 'datasource', label: t('plugins.browse.label.data-sources', 'Data sources') },
                  { value: 'panel', label: t('plugins.browse.label.panels', 'Panels') },
                  { value: 'app', label: t('plugins.browse.label.applications', 'Applications') },
                ]}
              />
            </Field>

            {/* Filter by installed / all */}
            {remotePluginsAvailable ? (
              <Field label={t('plugins.browse.label-state', 'State')}>
                <RadioButtonGroup value={filterBy} onChange={onFilterByChange} options={filterByOptions} />
              </Field>
            ) : (
              <Tooltip
                content={t(
                  'plugins.browse.tooltip-filter-disabled',
                  'This filter has been disabled because the Grafana server cannot access grafana.com'
                )}
                placement="top"
              >
                <div>
                  <Field label={t('plugins.browse.label-state', 'State')}>
                    <RadioButtonGroup
                      disabled={true}
                      value={filterBy}
                      onChange={onFilterByChange}
                      options={filterByOptions}
                    />
                  </Field>
                </div>
              </Tooltip>
            )}
          </HorizontalGroup>
        </HorizontalGroup>
        <div className={styles.listWrap}>
          <PluginList plugins={plugins} isLoading={isLoading} />
        </div>
        <RoadmapLinks />
        <UpdateAllModal
          isOpen={showUpdateModal}
          isLoading={areUpdatesLoading}
          onDismiss={() => setShowUpdateModal(false)}
          plugins={updatablePlugins}
        />
>>>>>>> v12.1.0
      </Page.Contents>
    </Page>
  );
}

const getStyles = (theme: GrafanaTheme2) => ({
<<<<<<< HEAD
  actionBar: css`
    ${theme.breakpoints.up('xl')} {
      margin-left: auto;
    }
  `,
  listWrap: css`
    margin-top: ${theme.spacing(2)};
  `,
});

// Because the component is used under multiple paths (/plugins and /admin/plugins) we need to get
// the correct navModel from the store
const getNavModelId = (routeName?: string) => {
  if (routeName === PluginAdminRoutes.HomeAdmin || routeName === PluginAdminRoutes.BrowseAdmin) {
    return 'admin-plugins';
  }

  return 'plugins';
};

const sorters: { [name: string]: (a: CatalogPlugin, b: CatalogPlugin) => number } = {
  nameAsc: (a: CatalogPlugin, b: CatalogPlugin) => a.name.localeCompare(b.name),
  nameDesc: (a: CatalogPlugin, b: CatalogPlugin) => b.name.localeCompare(a.name),
  updated: (a: CatalogPlugin, b: CatalogPlugin) =>
    dateTimeParse(b.updatedAt).valueOf() - dateTimeParse(a.updatedAt).valueOf(),
  published: (a: CatalogPlugin, b: CatalogPlugin) =>
    dateTimeParse(b.publishedAt).valueOf() - dateTimeParse(a.publishedAt).valueOf(),
  downloads: (a: CatalogPlugin, b: CatalogPlugin) => b.downloads - a.downloads,
};
=======
  actionBar: css({
    [theme.breakpoints.up('xl')]: {
      marginLeft: 'auto',
    },
  }),
  listWrap: css({
    marginTop: theme.spacing(2),
  }),
  displayAs: css({
    svg: {
      marginRight: 0,
    },
  }),
});
>>>>>>> v12.1.0
