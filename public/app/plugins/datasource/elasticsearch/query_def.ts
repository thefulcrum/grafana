import { BucketAggregation } from './components/QueryEditor/BucketAggregationsEditor/aggregations';
import {
  ExtendedStat,
  MetricAggregation,
  MovingAverageModelOption,
  MetricAggregationType,
} from './components/QueryEditor/MetricAggregationsEditor/aggregations';
import { metricAggregationConfig, pipelineOptions } from './components/QueryEditor/MetricAggregationsEditor/utils';

export const extendedStats: ExtendedStat[] = [
  { label: 'Avg', value: 'avg' },
  { label: 'Min', value: 'min' },
  { label: 'Max', value: 'max' },
  { label: 'Sum', value: 'sum' },
  { label: 'Count', value: 'count' },
  { label: 'Std Dev', value: 'std_deviation' },
  { label: 'Std Dev Upper', value: 'std_deviation_bounds_upper' },
  { label: 'Std Dev Lower', value: 'std_deviation_bounds_lower' },
];

export const movingAvgModelOptions: MovingAverageModelOption[] = [
  { label: 'Simple', value: 'simple' },
  { label: 'Linear', value: 'linear' },
  { label: 'Exponentially Weighted', value: 'ewma' },
  { label: 'Holt Linear', value: 'holt' },
  { label: 'Holt Winters', value: 'holt_winters' },
];

export function defaultMetricAgg(id = '1'): MetricAggregation {
  return { type: 'count', id };
}

<<<<<<< HEAD
export function isPipelineAggWithMultipleBucketPaths(metricType: any) {
  if (metricType) {
    return metricAggTypes.find(t => t.value === metricType && t.supportsMultipleBucketPaths) !== undefined;
  }

  return false;
}

export function getAncestors(target: ElasticsearchQuery, metric?: ElasticsearchAggregation) {
  const { metrics } = target;
  if (!metrics) {
    return (metric && [metric.id]) || [];
  }
  const initialAncestors = metric != null ? [metric.id] : ([] as string[]);
  return metrics.reduce((acc: string[], metric: ElasticsearchAggregation) => {
    const includedInField = (metric.field && acc.includes(metric.field)) || false;
    const includedInVariables = metric.pipelineVariables?.some(pv => acc.includes(pv?.pipelineAgg ?? ''));
    return includedInField || includedInVariables ? [...acc, metric.id] : acc;
  }, initialAncestors);
}

export function getPipelineAggOptions(target: ElasticsearchQuery, metric?: ElasticsearchAggregation) {
  const { metrics } = target;
  if (!metrics) {
    return [];
  }
  const ancestors = getAncestors(target, metric);
  return metrics.filter(m => !ancestors.includes(m.id)).map(m => ({ text: describeMetric(m), value: m.id }));
}

export function getMovingAvgSettings(model: any, filtered: boolean) {
  const filteredResult: any[] = [];
  if (filtered) {
    _.each(movingAvgModelSettings[model], setting => {
      if (!setting.isCheckbox) {
        filteredResult.push(setting);
      }
    });
    return filteredResult;
  }
  return movingAvgModelSettings[model];
}

export function getOrderByOptions(target: any) {
  const metricRefs: any[] = [];
  _.each(target.metrics, metric => {
    if (metric.type !== 'count' && !isPipelineAgg(metric.type)) {
      metricRefs.push({ text: describeMetric(metric), value: metric.id });
    }
  });

  return orderByOptions.concat(metricRefs);
=======
export function defaultBucketAgg(id = '1'): BucketAggregation {
  return { type: 'date_histogram', id, settings: { interval: 'auto' } };
>>>>>>> v7.4.1
}

export const findMetricById = (metrics: MetricAggregation[], id: MetricAggregation['id']) =>
  metrics.find((metric) => metric.id === id);

export function hasMetricOfType(target: any, type: string): boolean {
  return target && target.metrics && target.metrics.some((m: any) => m.type === type);
}

// Even if we have type guards when building a query, we currently have no way of getting this information from the response.
// We should try to find a better (type safe) way of doing the following 2.
export function isPipelineAgg(metricType: MetricAggregationType) {
  return metricType in pipelineOptions;
}

export function isPipelineAggWithMultipleBucketPaths(metricType: MetricAggregationType) {
  return !!metricAggregationConfig[metricType].supportsMultipleBucketPaths;
}
