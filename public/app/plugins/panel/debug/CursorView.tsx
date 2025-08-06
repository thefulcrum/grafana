<<<<<<< HEAD
import React, { Component } from 'react';
=======
import { Component } from 'react';
import { Subscription } from 'rxjs';

>>>>>>> v12.1.0
import {
  EventBus,
  LegacyGraphHoverEvent,
  LegacyGraphHoverClearEvent,
  DataHoverEvent,
  DataHoverClearEvent,
  BusEventBase,
} from '@grafana/data';
<<<<<<< HEAD
import { Subscription } from 'rxjs';
import { CustomScrollbar } from '@grafana/ui';
import { DataHoverView } from '../geomap/components/DataHoverView';
=======
import { Trans } from '@grafana/i18n';
import { CustomScrollbar } from '@grafana/ui';
import { DataHoverView } from 'app/features/visualization/data-hover/DataHoverView';
>>>>>>> v12.1.0

interface Props {
  eventBus: EventBus;
}

interface State {
  event?: BusEventBase;
}
export class CursorView extends Component<Props, State> {
  subscription = new Subscription();
  state: State = {};

  componentDidMount() {
    const { eventBus } = this.props;

    this.subscription.add(
      eventBus.subscribe(DataHoverEvent, (event) => {
        this.setState({ event });
      })
    );

    this.subscription.add(
      eventBus.subscribe(DataHoverClearEvent, (event) => {
        this.setState({ event });
      })
    );

    this.subscription.add(
      eventBus.subscribe(LegacyGraphHoverEvent, (event) => {
        this.setState({ event });
      })
    );

    this.subscription.add(
      eventBus.subscribe(LegacyGraphHoverClearEvent, (event) => {
        this.setState({ event });
      })
    );
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    const { event } = this.state;
    if (!event) {
      return (
        <div>
          <Trans i18nKey="debug.cursor-view.no-events-yet">No events yet</Trans>
        </div>
      );
    }
    const { type, payload, origin } = event;
    return (
      <CustomScrollbar autoHeightMin="100%" autoHeightMax="100%">
<<<<<<< HEAD
        <h3>Origin: {(origin as any)?.path}</h3>
        <span>Type: {type}</span>
        <pre>{JSON.stringify(payload.point, null, '  ')}</pre>
        {payload.data && (
          <DataHoverView data={payload.data} rowIndex={payload.rowIndex} columnIndex={payload.columnIndex} />
=======
        {/* eslint-disable-next-line @grafana/i18n/no-untranslated-strings */}
        <h3>event.origin: {(origin as any)?.path}</h3>
        {/* eslint-disable-next-line @grafana/i18n/no-untranslated-strings */}
        <span>event.type: {type}</span>
        {Boolean(payload) && (
          <>
            <pre>{JSON.stringify(payload.point, null, '  ')}</pre>
            {payload.data && (
              <DataHoverView data={payload.data} rowIndex={payload.rowIndex} columnIndex={payload.columnIndex} />
            )}
          </>
>>>>>>> v12.1.0
        )}
      </CustomScrollbar>
    );
  }
}
