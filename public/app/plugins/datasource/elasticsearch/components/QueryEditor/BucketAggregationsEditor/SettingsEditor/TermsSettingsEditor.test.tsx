<<<<<<< HEAD
import { screen } from '@testing-library/react';
import { ElasticsearchQuery } from '../../../../types';
import React from 'react';
import { renderWithESProvider } from '../../../../test-helpers/render';
import { Average, Derivative, TopMetrics } from '../../MetricAggregationsEditor/aggregations';
import { Terms } from '../aggregations';
import { TermsSettingsEditor } from './TermsSettingsEditor';
import selectEvent from 'react-select-event';
import { describeMetric } from 'app/plugins/datasource/elasticsearch/utils';
=======
import { fireEvent, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';

import {
  Average,
  Derivative,
  ElasticsearchDataQuery,
  Terms,
  TopMetrics,
} from 'app/plugins/datasource/elasticsearch/dataquery.gen';

import { useDispatch } from '../../../../hooks/useStatelessReducer';
import { renderWithESProvider } from '../../../../test-helpers/render';
import { describeMetric } from '../../../../utils';

import { TermsSettingsEditor } from './TermsSettingsEditor';

jest.mock('../../../../hooks/useStatelessReducer');
>>>>>>> v12.1.0

describe('Terms Settings Editor', () => {
  it('Pipeline aggregations should not be in "order by" options', () => {
    const termsAgg: Terms = {
      id: '1',
      type: 'terms',
    };
    const avg: Average = { id: '2', type: 'avg', field: '@value' };
    const derivative: Derivative = { id: '3', field: avg.id, type: 'derivative' };
    const topMetrics: TopMetrics = { id: '4', type: 'top_metrics' };
<<<<<<< HEAD
    const query: ElasticsearchQuery = {
=======
    const query: ElasticsearchDataQuery = {
>>>>>>> v12.1.0
      refId: 'A',
      query: '',
      bucketAggs: [termsAgg],
      metrics: [avg, derivative, topMetrics],
    };

    renderWithESProvider(<TermsSettingsEditor bucketAgg={termsAgg} />, { providerProps: { query } });

    const selectEl = screen.getByLabelText('Order By');
    expect(selectEl).toBeInTheDocument();

    selectEvent.openMenu(selectEl);

    // Derivative is a pipeline aggregation, it shouldn't be present in the order by options
    expect(screen.queryByText(describeMetric(derivative))).not.toBeInTheDocument();
    // TopMetrics cannot be used as order by option
    expect(screen.queryByText(describeMetric(topMetrics))).not.toBeInTheDocument();
    // All other metric aggregations can be used in order by
    expect(screen.getByText(describeMetric(avg))).toBeInTheDocument();
  });
<<<<<<< HEAD
=======

  describe('Handling change', () => {
    let dispatch = jest.fn();
    beforeEach(() => {
      dispatch.mockClear();
      jest.mocked(useDispatch).mockReturnValue(dispatch);
    });

    test('updating size', async () => {
      const termsAgg: Terms = {
        id: '1',
        type: 'terms',
      };
      const avg: Average = { id: '2', type: 'avg', field: '@value' };
      const derivative: Derivative = { id: '3', field: avg.id, type: 'derivative' };
      const topMetrics: TopMetrics = { id: '4', type: 'top_metrics' };
      const query: ElasticsearchDataQuery = {
        refId: 'A',
        query: '',
        bucketAggs: [termsAgg],
        metrics: [avg, derivative, topMetrics],
      };

      renderWithESProvider(<TermsSettingsEditor bucketAgg={termsAgg} />, { providerProps: { query } });

      const sizeInput = screen.getByLabelText('Size');
      fireEvent.change(sizeInput, { target: { value: '30' } });
      fireEvent.blur(sizeInput);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch.mock.calls[0][0].payload.settingName).toBe('size');
      expect(dispatch.mock.calls[0][0].payload.newValue).toBe('30');
    });
  });
>>>>>>> v12.1.0
});
