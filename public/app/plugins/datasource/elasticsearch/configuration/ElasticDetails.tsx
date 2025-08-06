import * as React from 'react';

import { DataSourceSettings, SelectableValue } from '@grafana/data';
import { ConfigDescriptionLink, ConfigSubSection } from '@grafana/plugin-ui';
import { InlineField, Input, Select, InlineSwitch } from '@grafana/ui';

import { ElasticsearchOptions, Interval } from '../types';

const indexPatternTypes: Array<SelectableValue<'none' | Interval>> = [
  { label: 'No pattern', value: 'none' },
  { label: 'Hourly', value: 'Hourly', example: '[logstash-]YYYY.MM.DD.HH' },
  { label: 'Daily', value: 'Daily', example: '[logstash-]YYYY.MM.DD' },
  { label: 'Weekly', value: 'Weekly', example: '[logstash-]GGGG.WW' },
  { label: 'Monthly', value: 'Monthly', example: '[logstash-]YYYY.MM' },
  { label: 'Yearly', value: 'Yearly', example: '[logstash-]YYYY' },
];

type Props = {
  value: DataSourceSettings<ElasticsearchOptions>;
  onChange: (value: DataSourceSettings<ElasticsearchOptions>) => void;
};
export const ElasticDetails = ({ value, onChange }: Props) => {
  return (
    <ConfigSubSection
      title="Elasticsearch details"
      description={
        <ConfigDescriptionLink
          description="Specific settings for the Elasticsearch data source."
          suffix="elasticsearch/#index-settings"
          feature="Elasticsearch details"
        />
      }
    >
      <InlineField
        label="Index name"
        htmlFor="es_config_indexName"
        labelWidth={29}
        tooltip="Name of your Elasticsearch index. You can use a time pattern, such as YYYY.MM.DD, or a wildcard for the index name."
      >
        <Input
          id="es_config_indexName"
          value={value.jsonData.index ?? (value.database || '')}
          onChange={indexChangeHandler(value, onChange)}
          width={24}
          placeholder="es-index-name"
          required
        />
      </InlineField>

      <InlineField
        label="Pattern"
        htmlFor="es_config_indexPattern"
        labelWidth={29}
        tooltip="If you're using a pattern for your index, select the type, or no pattern."
      >
        <Select
          inputId="es_config_indexPattern"
          value={indexPatternTypes.find(
            (pattern) => pattern.value === (value.jsonData.interval === undefined ? 'none' : value.jsonData.interval)
          )}
          options={indexPatternTypes}
          onChange={intervalHandler(value, onChange)}
          width={24}
        />
      </InlineField>

<<<<<<< HEAD
          <div className="gf-form">
            <FormField
              labelWidth={10}
              label="Pattern"
              inputEl={
                <Select
                  menuShouldPortal
                  options={indexPatternTypes}
                  onChange={intervalHandler(value, onChange)}
                  value={indexPatternTypes.find(
                    (pattern) =>
                      pattern.value === (value.jsonData.interval === undefined ? 'none' : value.jsonData.interval)
                  )}
                />
              }
            />
          </div>
        </div>
=======
      <InlineField
        label="Time field name"
        htmlFor="es_config_timeField"
        labelWidth={29}
        tooltip="Name of your time field. Defaults to @timestamp."
      >
        <Input
          id="es_config_timeField"
          value={value.jsonData.timeField || ''}
          onChange={jsonDataChangeHandler('timeField', value, onChange)}
          width={24}
          placeholder="@timestamp"
          required
        />
      </InlineField>
>>>>>>> v12.1.0

      <InlineField
        label="Max concurrent Shard Requests"
        htmlFor="es_config_shardRequests"
        labelWidth={29}
        tooltip="Maximum number of concurrent shards a search request can hit per node. Defaults to 5."
      >
        <Input
          id="es_config_shardRequests"
          value={value.jsonData.maxConcurrentShardRequests || ''}
          onChange={jsonDataChangeHandler('maxConcurrentShardRequests', value, onChange)}
          width={24}
        />
      </InlineField>

<<<<<<< HEAD
        <div className="gf-form">
          <FormField
            labelWidth={10}
            label="Version"
            inputEl={
              <Select
                menuShouldPortal
                options={esVersions}
                onChange={(option) => {
                  const maxConcurrentShardRequests = getMaxConcurrenShardRequestOrDefault(
                    value.jsonData.maxConcurrentShardRequests,
                    option.value!
                  );
                  onChange({
                    ...value,
                    jsonData: {
                      ...value.jsonData,
                      esVersion: option.value!,
                      maxConcurrentShardRequests,
                    },
                  });
                }}
                value={esVersions.find((version) => version.value === value.jsonData.esVersion)}
              />
            }
          />
        </div>
        {gte(value.jsonData.esVersion, '5.6.0') && (
          <div className="gf-form max-width-30">
            <FormField
              aria-label={'Max concurrent Shard Requests input'}
              labelWidth={15}
              label="Max concurrent Shard Requests"
              value={value.jsonData.maxConcurrentShardRequests || ''}
              onChange={jsonDataChangeHandler('maxConcurrentShardRequests', value, onChange)}
            />
          </div>
        )}
        <div className="gf-form-inline">
          <div className="gf-form">
            <FormField
              labelWidth={10}
              label="Min time interval"
              inputEl={
                <Input
                  className={'width-6'}
                  value={value.jsonData.timeInterval || ''}
                  onChange={jsonDataChangeHandler('timeInterval', value, onChange)}
                  placeholder="10s"
                  validationEvents={{
                    [EventsWithValidation.onBlur]: [
                      regexValidation(
                        /^\d+(ms|[Mwdhmsy])$/,
                        'Value is not valid, you can use number with time unit specifier: y, M, w, d, h, m, s'
                      ),
                    ],
                  }}
                />
              }
              tooltip={
                <>
                  A lower limit for the auto group by time interval. Recommended to be set to write frequency, for
                  example <code>1m</code> if your data is written every minute.
                </>
              }
            />
          </div>
        </div>
        <div className="gf-form-inline">
          <Switch
            label="X-Pack enabled"
            labelClass="width-10"
            checked={value.jsonData.xpack || false}
            onChange={jsonDataSwitchChangeHandler('xpack', value, onChange)}
          />
        </div>

        {gte(value.jsonData.esVersion, '6.6.0') && value.jsonData.xpack && (
          <div className="gf-form-inline">
            <Switch
              label="Include frozen indices"
              labelClass="width-10"
              checked={value.jsonData.includeFrozen ?? false}
              onChange={jsonDataSwitchChangeHandler('includeFrozen', value, onChange)}
            />
          </div>
        )}
      </div>
    </>
=======
      <InlineField
        label="Min time interval"
        htmlFor="es_config_minTimeInterval"
        labelWidth={29}
        tooltip={
          <>
            A lower limit for the auto group by time interval. Recommended to be set to write frequency, for example{' '}
            <code>1m</code> if your data is written every minute.
          </>
        }
        error="Value is not valid, you can use number with time unit specifier: y, M, w, d, h, m, s"
        invalid={!!value.jsonData.timeInterval && !/^\d+(ms|[Mwdhmsy])$/.test(value.jsonData.timeInterval)}
      >
        <Input
          id="es_config_minTimeInterval"
          value={value.jsonData.timeInterval || ''}
          onChange={jsonDataChangeHandler('timeInterval', value, onChange)}
          width={24}
          placeholder="10s"
        />
      </InlineField>
      <InlineField
        label="Include Frozen Indices"
        htmlFor="es_config_frozenIndices"
        labelWidth={29}
        tooltip="Include frozen indices in searches."
      >
        <InlineSwitch
          id="es_config_frozenIndices"
          value={value.jsonData.includeFrozen ?? false}
          onChange={jsonDataSwitchChangeHandler('includeFrozen', value, onChange)}
        />
      </InlineField>
    </ConfigSubSection>
>>>>>>> v12.1.0
  );
};

const indexChangeHandler =
  (value: Props['value'], onChange: Props['onChange']) =>
  (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({
      ...value,
      database: '',
      jsonData: {
        ...value.jsonData,
        index: event.currentTarget.value,
      },
    });
  };

// TODO: Use change handlers from @grafana/data
const jsonDataChangeHandler =
  (key: keyof ElasticsearchOptions, value: Props['value'], onChange: Props['onChange']) =>
  (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({
      ...value,
      jsonData: {
        ...value.jsonData,
        [key]: event.currentTarget.value,
      },
    });
  };

const jsonDataSwitchChangeHandler =
  (key: keyof ElasticsearchOptions, value: Props['value'], onChange: Props['onChange']) =>
  (event: React.SyntheticEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      jsonData: {
        ...value.jsonData,
        [key]: event.currentTarget.checked,
      },
    });
  };

const intervalHandler =
  (value: Props['value'], onChange: Props['onChange']) => (option: SelectableValue<Interval | 'none'>) => {
    // If option value is undefined it will send its label instead so we have to convert made up value to undefined here.
    const newInterval = option.value === 'none' ? undefined : option.value;

    const currentIndex = value.jsonData.index ?? value.database;
    if (!currentIndex || currentIndex.length === 0 || currentIndex.startsWith('[logstash-]')) {
      let newDatabase = '';

      if (newInterval !== undefined) {
        const pattern = indexPatternTypes.find((pattern) => pattern.value === newInterval);

        if (pattern) {
          newDatabase = pattern.example ?? '';
        }
      }

      onChange({
        ...value,
        database: '',
        jsonData: {
          ...value.jsonData,
          index: newDatabase,
          interval: newInterval,
        },
      });
    } else {
      onChange({
        ...value,
        jsonData: {
          ...value.jsonData,
          interval: newInterval,
        },
      });
    }
  };

export function defaultMaxConcurrentShardRequests() {
  return 5;
}
