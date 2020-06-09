import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface MyQuery extends DataQuery {
  topic: string;
  member: string;
  legend: string;
}

export const defaultQuery: Partial<MyQuery> = {
  topic: '',
  member: '',
  legend: 'value',
};

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  url: string;
}
