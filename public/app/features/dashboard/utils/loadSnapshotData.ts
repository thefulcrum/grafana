<<<<<<< HEAD
import { applyFieldOverrides, DefaultTimeRange, LoadingState, PanelData } from '@grafana/data';
import { config } from 'app/core/config';
import { getDatasourceSrv } from 'app/features/plugins/datasource_srv';
import { DashboardModel, PanelModel } from '../state';
import { getProcessedDataFrames } from '../state/runRequest';
=======
import { applyFieldOverrides, getDefaultTimeRange, LoadingState, PanelData } from '@grafana/data';
import { config } from 'app/core/config';
import { DashboardModel, PanelModel } from '../state';
import { getProcessedDataFrames } from '../../query/state/runRequest';
>>>>>>> v7.4.1

export function loadSnapshotData(panel: PanelModel, dashboard: DashboardModel): PanelData {
  const data = getProcessedDataFrames(panel.snapshotData);

  return {
<<<<<<< HEAD
    timeRange: DefaultTimeRange,
=======
    timeRange: getDefaultTimeRange(),
>>>>>>> v7.4.1
    state: LoadingState.Done,
    series: applyFieldOverrides({
      data,
      fieldConfig: {
        defaults: {},
        overrides: [],
      },
<<<<<<< HEAD
      autoMinMax: true,
      replaceVariables: panel.replaceVariables,
      getDataSourceSettingsByUid: getDatasourceSrv().getDataSourceSettingsByUid.bind(getDatasourceSrv()),
=======
      replaceVariables: panel.replaceVariables,
>>>>>>> v7.4.1
      fieldConfigRegistry: panel.plugin!.fieldConfigRegistry,
      theme: config.theme,
      timeZone: dashboard.getTimezone(),
    }),
  };
}
