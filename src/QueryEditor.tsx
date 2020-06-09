import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onTopicChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, topic: event.target.value });
    // executes the query
    onRunQuery();
  };

  onMemberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, member: event.target.value });
    // executes the query
    onRunQuery();
  };

  onLegendChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, legend: event.target.value });
    onRunQuery();
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { topic, member, legend } = query;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            inputWidth={30}
            value={topic}
            onChange={this.onTopicChange}
            label="MQTT Topic"
            type="string"
            placeholder="some/mqtt/topic"
          />
        </div>
        <div className="gf-form">
          <FormField
            inputWidth={30}
            value={member}
            onChange={this.onMemberChange}
            label="JSON member"
            type="string"
            placeholder="some.member"
          />
        </div>
        <div className="gf-form">
          <FormField
            inputWidth={30}
            value={legend}
            onChange={this.onLegendChange}
            label="Legend"
            type="string"
            placeholder="Legend"
          />
        </div>
      </div>
    );
  }
}
