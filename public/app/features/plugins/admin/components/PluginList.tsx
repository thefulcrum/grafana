<<<<<<< HEAD
import React from 'react';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import { CatalogPlugin } from '../types';
import { PluginListCard } from './PluginListCard';
import { useLocation } from 'react-router-dom';
=======
import { useLocation } from 'react-router-dom-v5-compat';

import { t } from '@grafana/i18n';
import { config } from '@grafana/runtime';
import { EmptyState, Grid } from '@grafana/ui';

import { CatalogPlugin } from '../types';

import { PluginListItem } from './PluginListItem';
>>>>>>> v12.1.0

interface Props {
  plugins: CatalogPlugin[];
  isLoading?: boolean;
}

<<<<<<< HEAD
export const PluginList = ({ plugins }: Props) => {
  const styles = useStyles2(getStyles);
  const location = useLocation();

  return (
    <div className={styles} data-testid="plugin-list">
      {plugins.map((plugin) => (
        <PluginListCard key={plugin.id} plugin={plugin} pathName={location.pathname} />
      ))}
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  grid-gap: ${theme.spacing(3)};
`;
=======
export const PluginList = ({ plugins, isLoading }: Props) => {
  const { pathname } = useLocation();

  const pathName = config.appSubUrl + (pathname.endsWith('/') ? pathname.slice(0, -1) : pathname);

  if (!isLoading && plugins.length === 0) {
    return <EmptyState variant="not-found" message={t('plugins.empty-state.message', 'No plugins found')} />;
  }

  return (
    <Grid gap={3} {...{ minColumnWidth: 34 }} data-testid="plugin-list">
      {isLoading
        ? new Array(50).fill(null).map((_, index) => <PluginListItem.Skeleton key={index} />)
        : plugins.map((plugin) => <PluginListItem key={plugin.id} plugin={plugin} pathName={pathName} />)}
    </Grid>
  );
};
>>>>>>> v12.1.0
