import { css } from '@emotion/css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { EventBusSrv, getTimeZone } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { stopQueryState } from 'app/core/utils/explore';
import { StoreState, useSelector } from 'app/types/store';

import Explore from './Explore';
import ExploreQueryInspector from './ExploreQueryInspector';
import { getExploreItemSelector } from './state/selectors';

const containerStyles = css({
  label: 'explorePaneContainer',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '600px',
  height: '100%',
});

interface Props {
  exploreId: string;
}

/*
  Connected components subscribe to the store before function components (using hooks) and can react to store changes. Thus, this connector function is called before the parent component (ExplorePage) is rerendered.
  This means that child components' mapStateToProps will be executed with a zombie `exploreId` that is not present anymore in the store if the pane gets closed.
  By connecting this component and returning the pane we workaround the zombie children issue here instead of modifying every children.
  This is definitely not the ideal solution and we should in the future invest more time in exploring other approaches to better handle this scenario, potentially by refactoring panels to be function components
  (therefore immune to this behaviour), or by forbidding them to access the store directly and instead pass them all the data they need via props or context.

  You can read more about this issue here: https://react-redux.js.org/api/hooks#stale-props-and-zombie-children
*/
function ExplorePaneContainerUnconnected({ exploreId }: Props) {
  useStopQueries(exploreId);
  const eventBus = useRef(new EventBusSrv());
  const ref = useRef(null);
  const [showQueryInspector, setShowQueryInspector] = useState(false);

  useEffect(() => {
    const bus = eventBus.current;
    return () => bus.removeAllListeners();
  }, []);

<<<<<<< HEAD
  componentDidMount() {
    const { initialized, exploreId, initialDatasource, initialQueries, initialRange, originPanelId } = this.props;
    const width = this.el?.offsetWidth ?? 0;

    // initialize the whole explore first time we mount and if browser history contains a change in datasource
    if (!initialized) {
      this.props.initializeExplore(
        exploreId,
        initialDatasource,
        initialQueries,
        initialRange,
        width,
        this.exploreEvents,
        originPanelId
      );
    }
  }

  componentWillUnmount() {
    this.exploreEvents.removeAllListeners();
    this.props.cleanupPaneAction({ exploreId: this.props.exploreId });
  }

  componentDidUpdate(prevProps: Props) {
    this.refreshExplore(prevProps.urlQuery);
  }

  refreshExplore = (prevUrlQuery: string) => {
    const { exploreId, urlQuery } = this.props;

    // Update state from url only if it changed and only if the change wasn't initialised by redux to prevent any loops
    if (urlQuery !== prevUrlQuery && urlQuery !== lastSavedUrl[exploreId]) {
      this.props.refreshExplore(exploreId, urlQuery);
    }
  };

  getRef = (el: any) => {
    this.el = el;
  };

  render() {
    const exploreClass = this.props.split ? 'explore explore-split' : 'explore';
    return (
      <div className={exploreClass} ref={this.getRef} data-testid={selectors.pages.Explore.General.container}>
        {this.props.initialized && <Explore exploreId={this.props.exploreId} />}
      </div>
    );
  }
=======
  return (
    <div className={containerStyles} ref={ref} data-testid={selectors.pages.Explore.General.container}>
      <Explore
        exploreId={exploreId}
        eventBus={eventBus.current}
        showQueryInspector={showQueryInspector}
        setShowQueryInspector={setShowQueryInspector}
      />
      {showQueryInspector && (
        <ExploreQueryInspector
          exploreId={exploreId}
          onClose={() => setShowQueryInspector(false)}
          timeZone={getTimeZone()}
        />
      )}
    </div>
  );
>>>>>>> v12.1.0
}

function mapStateToProps(state: StoreState, props: Props) {
  const pane = state.explore.panes[props.exploreId];

  return { pane };
}

const connector = connect(mapStateToProps);

export const ExplorePaneContainer = connector(ExplorePaneContainerUnconnected);

function useStopQueries(exploreId: string) {
  const paneSelector = useMemo(() => getExploreItemSelector(exploreId), [exploreId]);
  const paneRef = useRef<ReturnType<typeof paneSelector>>();
  paneRef.current = useSelector(paneSelector);

  useEffect(() => {
    return () => {
      stopQueryState(paneRef.current?.querySubscription);
    };
  }, []);
}
