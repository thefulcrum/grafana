<<<<<<< HEAD
import { GrafanaPlugin, PluginMeta, PluginType, PluginSignatureStatus, PluginSignatureType } from '@grafana/data';
=======
import { EntityState } from '@reduxjs/toolkit';

import {
  PluginType,
  PluginSignatureStatus,
  PluginSignatureType,
  PluginDependencies,
  PluginErrorCode,
  WithAccessControlMetadata,
} from '@grafana/data';
import { IconName } from '@grafana/ui';
import { PluginsState } from 'app/types/plugins';
import { StoreState } from 'app/types/store';

>>>>>>> v12.1.0
export type PluginTypeCode = 'app' | 'panel' | 'datasource';

export enum PluginAdminRoutes {
  Home = 'plugins-home',
  Browse = 'plugins-browse',
  Details = 'plugins-details',
<<<<<<< HEAD
  HomeAdmin = 'plugins-home-admin',
  BrowseAdmin = 'plugins-browse-admin',
  DetailsAdmin = 'plugins-details-admin',
}

export interface CatalogPlugin {
=======
}

export enum PluginIconName {
  app = 'apps',
  datasource = 'database',
  panel = 'credit-card',
  renderer = 'capture',
}

export interface CatalogPlugin extends WithAccessControlMetadata {
>>>>>>> v12.1.0
  description: string;
  downloads: number;
  hasUpdate: boolean;
  id: string;
  info: CatalogPluginInfo;
  isDev: boolean;
  isCore: boolean;
  isEnterprise: boolean;
  isInstalled: boolean;
  isDisabled: boolean;
  isDeprecated: boolean;
  isManaged: boolean; // Indicates that the plugin version is managed by Grafana
  isPreinstalled: { found: boolean; withVersion: boolean }; // Indicates that the plugin is pre-installed
  // `isPublished` is TRUE if the plugin is published to grafana.com
  isPublished: boolean;
  latestVersion?: string;
  name: string;
  orgName: string;
  signature: PluginSignatureStatus;
<<<<<<< HEAD
=======
  signatureType?: PluginSignatureType;
  signatureOrg?: string;
>>>>>>> v12.1.0
  popularity: number;
  publishedAt: string;
  type?: PluginType;
  updatedAt: string;
  installedVersion?: string;
  details?: CatalogPluginDetails;
  error?: PluginErrorCode;
  angularDetected?: boolean;
  // instance plugins may not be fully installed, which means a new instance
  // running the plugin didn't started yet
  isFullyInstalled?: boolean;
  isUninstallingFromInstance?: boolean;
  isUpdatingFromInstance?: boolean;
  iam?: IdentityAccessManagement;
  isProvisioned?: boolean;
  url?: string;
}
export interface Screenshots {
  path: string;
  name: string;
}

export interface CatalogPluginDetails {
  readme?: string;
  versions?: Version[];
  links: Array<{
    name: string;
    url: string;
  }>;
  grafanaDependency?: string;
  pluginDependencies?: PluginDependencies['plugins'];
  statusContext?: string;
  iam?: IdentityAccessManagement;
  changelog?: string;
  lastCommitDate?: string;
  licenseUrl?: string;
  documentationUrl?: string;
  sponsorshipUrl?: string;
  repositoryUrl?: string;
  raiseAnIssueUrl?: string;
  signatureType?: PluginSignatureType;
  signature?: PluginSignatureStatus;
  screenshots?: Screenshots[] | null;
}

export interface CatalogPluginInfo {
  logos: {
    large: string;
    small: string;
  };
  keywords: string[];
}

export type RemotePlugin = {
<<<<<<< HEAD
=======
  changelog: string;
>>>>>>> v12.1.0
  createdAt: string;
  description: string;
  downloads: number;
  downloadSlug: string;
  featured: number;
  id: number;
  internal: boolean;
<<<<<<< HEAD
  json?: {
    dependencies: {
      grafanaDependency: string;
      grafanaVersion: string;
    };
=======
  keywords: string[];
  json?: {
    dependencies: PluginDependencies;
    iam?: IdentityAccessManagement;
>>>>>>> v12.1.0
    info: {
      links: Array<{
        name: string;
        url: string;
      }>;
<<<<<<< HEAD
=======
      screenshots?: Screenshots[] | null;
>>>>>>> v12.1.0
    };
  };
  links: Array<{ rel: string; href: string }>;
  name: string;
  orgId: number;
  orgName: string;
  orgSlug: string;
  orgUrl: string;
  packages: {
    [arch: string]: {
      packageName: string;
      downloadUrl: string;
    };
  };
  popularity: number;
  readme?: string;
  signatureType: PluginSignatureType | '';
  slug: string;
<<<<<<< HEAD
  status: string;
=======
  status: RemotePluginStatus;
  statusContext?: string;
>>>>>>> v12.1.0
  typeCode: PluginType;
  typeId: number;
  typeName: string;
  updatedAt: string;
  url: string;
  userId: number;
  verified: boolean;
  version: string;
  versionSignatureType: PluginSignatureType | '';
  versionSignedByOrg: string;
  versionSignedByOrgName: string;
  versionStatus: string;
<<<<<<< HEAD
};
=======
  angularDetected?: boolean;
  lastCommitDate?: string;
  licenseUrl?: string;
  documentationUrl?: string;
  sponsorshipUrl?: string;
  repositoryUrl?: string;
  raiseAnIssueUrl?: string;
};

// The available status codes on GCOM are available here:
// https://github.com/grafana/grafana-com/blob/main/packages/grafana-com-plugins-api/src/plugins/plugin.model.js#L74
export enum RemotePluginStatus {
  Deleted = 'deleted',
  Active = 'active',
  Pending = 'pending',
  Deprecated = 'deprecated',
  Enterprise = 'enterprise',
}
>>>>>>> v12.1.0

export type LocalPlugin = WithAccessControlMetadata & {
  category: string;
  defaultNavUrl: string;
  dev?: boolean;
  enabled: boolean;
  hasUpdate: boolean;
  latestVersion: string;
  id: string;
  info: {
    author: Rel;
    description: string;
    links?: Rel[];
    logos: {
      small: string;
      large: string;
    };
<<<<<<< HEAD
=======
    keywords: string[];
>>>>>>> v12.1.0
    build: Build;
    screenshots?: Array<{
      path: string;
      name: string;
    }> | null;
    version: string;
    updated: string;
  };
  name: string;
  pinned: boolean;
  signature: PluginSignatureStatus;
  signatureOrg: string;
  signatureType: PluginSignatureType;
  state: string;
  type: PluginType;
<<<<<<< HEAD
};

=======
  dependencies: PluginDependencies;
  angularDetected: boolean;
  iam?: IdentityAccessManagement;
};

interface IdentityAccessManagement {
  permissions: Permission[];
}

export interface Permission {
  action: string;
  scope: string;
}

>>>>>>> v12.1.0
interface Rel {
  name: string;
  url: string;
}

export interface Build {
  time?: number;
  repo?: string;
  branch?: string;
  hash?: string;
}

export interface Version {
  version: string;
  createdAt: string;
  updatedAt?: string;
  isCompatible: boolean;
  grafanaDependency: string | null;
  angularDetected?: boolean;
}

export interface PluginDetails {
  remote?: RemotePlugin;
  remoteVersions?: Version[];
  local?: LocalPlugin;
}

export interface Org {
  slug: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  avatarUrl: string;
}

<<<<<<< HEAD
export interface PluginDetailsState {
  hasInstalledPanel: boolean;
  hasUpdate: boolean;
  isInstalled: boolean;
  isInflight: boolean;
=======
export type CatalogPluginsState = {
>>>>>>> v12.1.0
  loading: boolean;
  error?: Error;
  plugins: CatalogPlugin[];
};

export enum PluginStatus {
  INSTALL = 'INSTALL',
  UNINSTALL = 'UNINSTALL',
  UPDATE = 'UPDATE',
  REINSTALL = 'REINSTALL',
  DOWNGRADE = 'DOWNGRADE',
}

export enum PluginTabLabels {
  OVERVIEW = 'Overview',
  VERSIONS = 'Version history',
  CONFIG = 'Config',
  DASHBOARDS = 'Dashboards',
  USAGE = 'Usage',
  IAM = 'IAM',
  CHANGELOG = 'Changelog',
  PLUGINDETAILS = 'Plugin details',
  DATASOURCE_CONNECTIONS = 'Data source connections',
  SCREENSHOTS = 'Screenshots',
}

<<<<<<< HEAD
export type PluginDetailsActions =
  | { type: ActionTypes.FETCHED_PLUGIN; payload: CatalogPluginDetails }
  | { type: ActionTypes.ERROR; payload: Error }
  | { type: ActionTypes.FETCHED_PLUGIN_CONFIG; payload?: GrafanaPlugin<PluginMeta<{}>> }
  | {
      type: ActionTypes.UPDATE_TABS;
      payload: Array<{ label: string }>;
    }
  | { type: ActionTypes.INSTALLED; payload: boolean }
  | { type: ActionTypes.SET_ACTIVE_TAB; payload: number }
  | {
      type: ActionTypes.LOADING | ActionTypes.INFLIGHT | ActionTypes.UNINSTALLED | ActionTypes.UPDATED;
    };

export type CatalogPluginsState = {
  loading: boolean;
  error?: Error;
  plugins: CatalogPlugin[];
};

export type FilteredPluginsState = {
  isLoading: boolean;
  error?: Error;
  plugins: CatalogPlugin[];
};

export type PluginsByFilterType = {
  searchBy: string;
  filterBy: string;
  filterByType: string;
};

export type PluginFilter = (plugin: CatalogPlugin, query: string) => boolean;
=======
export enum PluginTabIds {
  OVERVIEW = 'overview',
  VERSIONS = 'version-history',
  CONFIG = 'config',
  DASHBOARDS = 'dashboards',
  USAGE = 'usage',
  IAM = 'iam',
  CHANGELOG = 'changelog',
  PLUGINDETAILS = 'right-panel',
  DATASOURCE_CONNECTIONS = 'datasource-connections',
  SCREENSHOTS = 'screenshots',
}

export enum RequestStatus {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}
export type RemotePluginResponse = {
  plugins: RemotePlugin[];
  error?: Error;
};

export type RequestInfo = {
  status: RequestStatus;
  // The whole error object
  error?: any;
  // An optional error message
  errorMessage?: string;
};

export type PluginDetailsTab = {
  label: PluginTabLabels | string;
  icon?: IconName;
  id: PluginTabIds | string;
  href?: string;
};

// TODO<remove `PluginsState &` when the "plugin_admin_enabled" feature flag is removed>
export type ReducerState = PluginsState & {
  items: EntityState<CatalogPlugin, string>;
  requests: Record<string, RequestInfo>;
};

// TODO<remove when the "plugin_admin_enabled" feature flag is removed>
export type PluginCatalogStoreState = StoreState & { plugins: ReducerState };

// The data that we receive when fetching "/api/gnet/plugins/<plugin>/versions"
export type PluginVersion = {
  id: number;
  pluginId: number;
  pluginSlug: string;
  version: string;
  url: string;
  commit: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  downloads: number;
  verified: boolean;
  status: string;
  downloadSlug: string;
  links: Array<{ rel: string; href: string }>;
  isCompatible: boolean;
  grafanaDependency: string | null;
  angularDetected?: boolean;
};

export type InstancePlugin = {
  pluginSlug: string;
  version: string;
};

export type ProvisionedPlugin = {
  slug: string;
};
>>>>>>> v12.1.0
