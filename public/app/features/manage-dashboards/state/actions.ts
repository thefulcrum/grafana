import { DataSourceInstanceSettings } from '@grafana/data';
import { getBackendSrv, getDataSourceSrv, isFetchError } from '@grafana/runtime';
import {
  Spec as DashboardV2Spec,
  QueryVariableKind,
  PanelQueryKind,
  AnnotationQueryKind,
} from '@grafana/schema/dist/esm/schema/dashboard/v2alpha1/types.spec.gen';
import { notifyApp } from 'app/core/actions';
import { createErrorNotification } from 'app/core/copy/appNotification';
import { browseDashboardsAPI, ImportInputs } from 'app/features/browse-dashboards/api/browseDashboardsAPI';
import { getDatasourceSrv } from 'app/features/plugins/datasource_srv';
import { PermissionLevelString, SearchQueryType } from 'app/types/acl';
import { ThunkResult } from 'app/types/store';

import {
  Input,
  InputUsage,
  LibraryElementExport,
  LibraryPanel,
} from '../../dashboard/components/DashExportModal/DashboardExporter';
import { getLibraryPanel } from '../../library-panels/state/api';
import { LibraryElementDTO, LibraryElementKind } from '../../library-panels/types';
import { DashboardSearchHit } from '../../search/types';
import { DashboardJson } from '../types';

import {
  clearDashboard,
<<<<<<< HEAD
  ImportDashboardDTO,
  InputType,
  setGcomDashboard,
  setInputs,
  setJsonDashboard,
} from './reducers';
import { DashboardDataDTO, DashboardDTO, FolderInfo, PermissionLevelString, ThunkResult } from 'app/types';
import { appEvents } from '../../../core/core';
import { dashboardWatcher } from 'app/features/live/dashboard/dashboardWatcher';
import { getDataSourceSrv, locationService } from '@grafana/runtime';
import { DashboardSearchHit } from '../../search/types';
=======
  DataSourceInput,
  fetchDashboard,
  fetchFailed,
  ImportDashboardDTO,
  ImportDashboardState,
  InputType,
  LibraryPanelInput,
  LibraryPanelInputState,
  setGcomDashboard,
  setInputs,
  setJsonDashboard,
  setLibraryPanelInputs,
} from './reducers';
>>>>>>> v12.1.0

export function fetchGcomDashboard(id: string): ThunkResult<void> {
  return async (dispatch) => {
    try {
      dispatch(fetchDashboard());
      const dashboard = await getBackendSrv().get(`/api/gnet/dashboards/${id}`);
      await dispatch(processElements(dashboard.json));
      await dispatch(processGcomDashboard(dashboard));
      dispatch(processInputs());
    } catch (error) {
      dispatch(fetchFailed());
      if (isFetchError(error)) {
        dispatch(notifyApp(createErrorNotification(error.data.message || error)));
      }
    }
  };
}

export function importDashboardJson(dashboard: any): ThunkResult<void> {
  return async (dispatch) => {
    await dispatch(processElements(dashboard));
    await dispatch(processJsonDashboard(dashboard));
    dispatch(processInputs());
  };
}

export function importDashboardV2Json(dashboard: DashboardV2Spec): ThunkResult<void> {
  return async (dispatch) => {
    dispatch(setJsonDashboard(dashboard));
    dispatch(processV2Datasources(dashboard));
  };
}

const getNewLibraryPanelsByInput = (input: Input, state: ImportDashboardState): LibraryPanel[] | undefined => {
  return input?.usage?.libraryPanels?.filter((usageLibPanel) =>
    state.inputs.libraryPanels.some(
      (libPanel) => libPanel.state !== LibraryPanelInputState.Exists && libPanel.model.uid === usageLibPanel.uid
    )
  );
};

export function processDashboard(dashboardJson: DashboardJson, state: ImportDashboardState): DashboardJson {
  let inputs = dashboardJson.__inputs;
  if (!!state.inputs.libraryPanels?.length) {
    const filteredUsedInputs: Input[] = [];
    dashboardJson.__inputs?.forEach((input: Input) => {
      if (!input?.usage?.libraryPanels) {
        filteredUsedInputs.push(input);
        return;
      }

      const newLibraryPanels = getNewLibraryPanelsByInput(input, state);
      input.usage = { libraryPanels: newLibraryPanels };

      const isInputBeingUsedByANewLibraryPanel = !!newLibraryPanels?.length;
      if (isInputBeingUsedByANewLibraryPanel) {
        filteredUsedInputs.push(input);
      }
    });
    inputs = filteredUsedInputs;
  }

  return { ...dashboardJson, __inputs: inputs };
}

function processGcomDashboard(dashboard: { json: DashboardJson }): ThunkResult<void> {
  return (dispatch, getState) => {
    const state = getState().importDashboard;
    const dashboardJson = processDashboard(dashboard.json, state);
    dispatch(setGcomDashboard({ ...dashboard, json: dashboardJson }));
  };
}

function processJsonDashboard(dashboardJson: DashboardJson): ThunkResult<void> {
  return (dispatch, getState) => {
    const state = getState().importDashboard;
    const dashboard = processDashboard(dashboardJson, state);
    dispatch(setJsonDashboard(dashboard));
  };
}

function processInputs(): ThunkResult<void> {
  return (dispatch, getState) => {
    const dashboard = getState().importDashboard.dashboard;
    if (dashboard && dashboard.__inputs) {
      const inputs: any[] = [];
      dashboard.__inputs.forEach((input: any) => {
        const inputModel: any = {
          name: input.name,
          label: input.label,
          info: input.description,
          value: input.value,
          type: input.type,
          pluginId: input.pluginId,
          options: [],
        };

        inputModel.description = getDataSourceDescription(input);

        if (input.type === InputType.DataSource) {
          getDataSourceOptions(input, inputModel);
        } else if (!inputModel.info) {
          inputModel.info = 'Specify a string constant';
        }

        inputs.push(inputModel);
      });
      dispatch(setInputs(inputs));
    }
  };
}

function processElements(dashboardJson?: { __elements?: Record<string, LibraryElementExport> }): ThunkResult<void> {
  return async function (dispatch) {
    const libraryPanelInputs = await getLibraryPanelInputs(dashboardJson);
    dispatch(setLibraryPanelInputs(libraryPanelInputs));
  };
}

export function processV2Datasources(dashboard: DashboardV2Spec): ThunkResult<void> {
  return async function (dispatch) {
    const { elements, variables, annotations } = dashboard;
    // get elements from dashboard
    // each element can only be a panel
    let inputs: Record<string, DataSourceInput> = {};
    for (const element of Object.values(elements)) {
      if (element.kind !== 'Panel') {
        throw new Error('Only panels are currenlty supported in v2 dashboards');
      }
      if (element.spec.data.spec.queries.length > 0) {
        for (const query of element.spec.data.spec.queries) {
          inputs = await processV2DatasourceInput(query.spec, inputs);
        }
      }
    }

    for (const variable of variables) {
      if (variable.kind === 'QueryVariable') {
        inputs = await processV2DatasourceInput(variable.spec, inputs);
      }
    }

    for (const annotation of annotations) {
      inputs = await processV2DatasourceInput(annotation.spec, inputs);
    }

    dispatch(setInputs(Object.values(inputs)));
  };
}

export async function getLibraryPanelInputs(dashboardJson?: {
  __elements?: Record<string, LibraryElementExport>;
}): Promise<LibraryPanelInput[]> {
  if (!dashboardJson || !dashboardJson.__elements) {
    return [];
  }

  const libraryPanelInputs: LibraryPanelInput[] = [];

  for (const element of Object.values(dashboardJson.__elements)) {
    if (element.kind !== LibraryElementKind.Panel) {
      continue;
    }

    const model = element.model;
    const { type, description } = model;
    const { uid, name } = element;
    const input: LibraryPanelInput = {
      model: {
        model,
        uid,
        name,
        version: 0,
        type,
        kind: LibraryElementKind.Panel,
        description,
      } as LibraryElementDTO,
      state: LibraryPanelInputState.New,
    };

    try {
      const panelInDb = await getLibraryPanel(uid, true);
      input.state = LibraryPanelInputState.Exists;
      input.model = panelInDb;
    } catch (e: any) {
      if (e.status !== 404) {
        throw e;
      }
    }

    libraryPanelInputs.push(input);
  }

  return libraryPanelInputs;
}

export function clearLoadedDashboard(): ThunkResult<void> {
  return (dispatch) => {
    dispatch(clearDashboard());
  };
}

export function importDashboard(importDashboardForm: ImportDashboardDTO): ThunkResult<void> {
  return async (dispatch, getState) => {
    const dashboard = getState().importDashboard.dashboard;
    const inputs = getState().importDashboard.inputs;

    const inputsToPersist: ImportInputs[] = [];
    importDashboardForm.dataSources?.forEach((dataSource: DataSourceInstanceSettings, index: number) => {
      const input = inputs.dataSources[index];
      inputsToPersist.push({
        name: input.name,
        type: input.type,
        pluginId: input.pluginId,
        value: dataSource.uid,
      });
    });

    importDashboardForm.constants?.forEach((constant, index) => {
      const input = inputs.constants[index];

      inputsToPersist.push({
        value: constant,
        name: input.name,
        type: input.type,
      });
    });

<<<<<<< HEAD
    const result = await getBackendSrv().post('api/dashboards/import', {
      // uid: if user changed it, take the new uid from importDashboardForm,
      // else read it from original dashboard
      // by default the uid input is disabled, onSubmit ignores values from disabled inputs
      dashboard: { ...dashboard, title: importDashboardForm.title, uid: importDashboardForm.uid || dashboard.uid },
      overwrite: true,
      inputs: inputsToPersist,
      folderId: importDashboardForm.folder.id,
    });

    const dashboardUrl = locationUtil.stripBaseFromUrl(result.importedUrl);
    locationService.push(dashboardUrl);
=======
    dispatch(
      browseDashboardsAPI.endpoints.importDashboard.initiate({
        // uid: if user changed it, take the new uid from importDashboardForm,
        // else read it from original dashboard
        // by default the uid input is disabled, onSubmit ignores values from disabled inputs
        dashboard: { ...dashboard, title: importDashboardForm.title, uid: importDashboardForm.uid || dashboard.uid },
        overwrite: true,
        inputs: inputsToPersist,
        folderUid: importDashboardForm.folder.uid,
      })
    );
>>>>>>> v12.1.0
  };
}

const getDataSourceOptions = (input: { pluginId: string; pluginName: string }, inputModel: any) => {
  const sources = getDataSourceSrv().getList({ pluginId: input.pluginId });

  if (sources.length === 0) {
    inputModel.info = 'No data sources of type ' + input.pluginName + ' found';
  } else if (!inputModel.info) {
    inputModel.info = 'Select a ' + input.pluginName + ' data source';
  }
};

const getDataSourceDescription = (input: { usage?: InputUsage }): string | undefined => {
  if (!input.usage) {
    return undefined;
  }

  if (input.usage.libraryPanels) {
    const libPanelNames = input.usage.libraryPanels.reduce(
      (acc: string, libPanel, index) => (index === 0 ? libPanel.name : `${acc}, ${libPanel.name}`),
      ''
    );
    return `List of affected library panels: ${libPanelNames}`;
  }

<<<<<<< HEAD
  const options = {
    dashboard: fullDash.dashboard,
    folderId: toFolder.id,
    overwrite: false,
  };

  try {
    await saveDashboard(options);
    return { succeeded: true };
  } catch (err) {
    if (err.data?.status !== 'plugin-dashboard') {
      return { succeeded: false };
    }

    err.isHandled = true;
    options.overwrite = true;

    try {
      await saveDashboard(options);
      return { succeeded: true };
    } catch (e) {
      return { succeeded: false };
    }
  }
}

function createTask(fn: (...args: any[]) => Promise<any>, ignoreRejections: boolean, ...args: any[]) {
  return async (result: any) => {
    try {
      const res = await fn(...args);
      return Array.prototype.concat(result, [res]);
    } catch (err) {
      if (ignoreRejections) {
        return result;
      }

      throw err;
    }
  };
}

export function deleteFoldersAndDashboards(folderUids: string[], dashboardUids: string[]) {
  const tasks = [];

  for (const folderUid of folderUids) {
    tasks.push(createTask(deleteFolder, true, folderUid, true));
  }

  for (const dashboardUid of dashboardUids) {
    tasks.push(createTask(deleteDashboard, true, dashboardUid, true));
  }

  return executeInOrder(tasks);
}

export interface SaveDashboardOptions {
  dashboard: DashboardDataDTO;
  message?: string;
  folderId?: number;
  overwrite?: boolean;
}

export function saveDashboard(options: SaveDashboardOptions) {
  dashboardWatcher.ignoreNextSave();

  return getBackendSrv().post('/api/dashboards/db/', {
    dashboard: options.dashboard,
    message: options.message ?? '',
    overwrite: options.overwrite ?? false,
    folderId: options.folderId,
  });
}

function deleteFolder(uid: string, showSuccessAlert: boolean) {
  return getBackendSrv().request({
    method: 'DELETE',
    url: `/api/folders/${uid}?forceDeleteRules=true`,
    showSuccessAlert: showSuccessAlert === true,
  });
}
=======
  return undefined;
};
>>>>>>> v12.1.0

/** @deprecated Use RTK Query methods from features/browse-dashboards/api/browseDashboardsAPI.ts instead */
export function createFolder(payload: any) {
  return getBackendSrv().post('/api/folders', payload);
}

<<<<<<< HEAD
export function searchFolders(query: any, permission?: PermissionLevelString): Promise<DashboardSearchHit[]> {
  return getBackendSrv().search({ query, type: 'dash-folder', permission });
}

export function getFolderById(id: number): Promise<{ id: number; title: string }> {
  return getBackendSrv().get(`/api/folders/id/${id}`);
}

export function deleteDashboard(uid: string, showSuccessAlert: boolean) {
  return getBackendSrv().request({
    method: 'DELETE',
    url: `/api/dashboards/uid/${uid}`,
    showSuccessAlert: showSuccessAlert === true,
=======
export const SLICE_FOLDER_RESULTS_TO = 1000;

export async function searchFolders(
  query: string,
  permission?: PermissionLevelString,
  type: SearchQueryType = SearchQueryType.Folder
): Promise<DashboardSearchHit[]> {
  return getBackendSrv().get('/api/search', {
    query,
    type: type,
    permission,
    limit: SLICE_FOLDER_RESULTS_TO,
>>>>>>> v12.1.0
  });
}

export function getFolderByUid(uid: string): Promise<{ uid: string; title: string }> {
  return getBackendSrv().get(`/api/folders/${uid}`);
}

export async function processV2DatasourceInput(
  obj: PanelQueryKind['spec'] | QueryVariableKind['spec'] | AnnotationQueryKind['spec'],
  inputs: Record<string, DataSourceInput> = {}
) {
  const datasourceRef = obj?.datasource;
  if (!datasourceRef && obj?.query) {
    const dsType = obj.query.kind;
    // if dsType is grafana, it means we are using a built-in annotation or default grafana datasource, in those
    // cases we don't need to map it
    // "datasource" type is what we call "--Dashboard--" datasource <.-.>
    if (dsType === 'grafana' || dsType === 'datasource') {
      return inputs;
    }
    const datasource = await getDatasourceSrv().get({ type: dsType });
    let dataSourceInput: DataSourceInput | undefined;
    if (datasource) {
      dataSourceInput = {
        name: datasource.name,
        label: datasource.name,
        info: `Select a ${datasource.name} data source`,
        value: datasource.uid,
        type: InputType.DataSource,
        pluginId: datasource.meta?.id,
      };

      inputs[datasource.meta?.id] = dataSourceInput;
    } else {
      dataSourceInput = {
        name: dsType,
        label: dsType,
        info: `No data sources of type ${dsType} found`,
        value: '',
        type: InputType.DataSource,
        pluginId: dsType,
      };

      inputs[dsType] = dataSourceInput;
    }
  }
  return inputs;
}
