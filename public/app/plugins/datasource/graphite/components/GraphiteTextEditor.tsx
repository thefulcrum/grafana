<<<<<<< HEAD
import React, { useCallback } from 'react';
=======
import { useCallback } from 'react';

>>>>>>> v12.1.0
import { QueryField } from '@grafana/ui';

import { actions } from '../state/actions';
import { useDispatch } from '../state/context';

type Props = {
  rawQuery: string;
};

<<<<<<< HEAD
export function GraphiteTextEditor({ rawQuery, dispatch }: Props) {
  const updateQuery = useCallback(
    (query: string) => {
      dispatch(actions.updateQuery({ query }));
    },
    [dispatch]
  );

=======
export function GraphiteTextEditor({ rawQuery }: Props) {
  const dispatch = useDispatch();

  const updateQuery = useCallback(
    (query: string) => {
      dispatch(actions.updateQuery({ query }));
    },
    [dispatch]
  );

>>>>>>> v12.1.0
  const runQuery = useCallback(() => {
    dispatch(actions.runQuery());
  }, [dispatch]);

  return (
<<<<<<< HEAD
    <>
      <QueryField
        query={rawQuery}
        onChange={updateQuery}
        onBlur={runQuery}
        onRunQuery={runQuery}
        placeholder={'Enter a Graphite query (run with Shift+Enter)'}
        portalOrigin="graphite"
      />
    </>
=======
    <QueryField
      query={rawQuery}
      onChange={updateQuery}
      onBlur={runQuery}
      onRunQuery={runQuery}
      placeholder={'Enter a Graphite query (run with Shift+Enter)'}
      portalOrigin="graphite"
    />
>>>>>>> v12.1.0
  );
}
