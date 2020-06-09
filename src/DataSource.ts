import defaults from 'lodash/defaults';
import _ from 'lodash';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  FieldType,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions, defaultQuery } from './types';
import { Observable, merge } from 'rxjs';
import { CircularDataFrame } from '@grafana/data';
import * as mqtt from 'mqtt';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  url: string;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    this.url = instanceSettings.jsonData.url;
  }

  query(options: DataQueryRequest<MyQuery>): Observable<DataQueryResponse> {
    const streams = options.targets.map(target => {
      const query = defaults(target, defaultQuery);

      return new Observable<DataQueryResponse>(subscriber => {
        const frame = new CircularDataFrame({
          append: 'tail',
          capacity: 1000,
        });

        frame.refId = query.refId;
        frame.addField({ name: 'time', type: FieldType.time });
        frame.addField({ name: query.legend, type: FieldType.number });
        const client = mqtt.connect(this.url);
        client.subscribe(query.topic);

        client.on('message', function(topic, message) {
          const parsedMessage = JSON.parse(message.toString());
          frame.add({ time: Date.now(), [query.legend]: _.get(parsedMessage, query.member) });
          subscriber.next({
            data: [frame],
            key: frame.refId,
          });
        });

        return () => {
          client.end();
        };
      });
    });

    return merge(...streams);
  }

  async testDatasource() {
    // Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
