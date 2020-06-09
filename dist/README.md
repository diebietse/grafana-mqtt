# Simple MQTT streaming plugin

This is a simple plugin that supports real time streaming of a single JSON value from a single topic per query. This is most useful for gauges that should show the latest value as quickly as possible. Plots are also possible but will lose all history on dashboard refresh.

## Installation

Copy the dist folder from a release branch to you Grafana plugins folder (Usually /var/lib/grafana/plugins) and restart Grafana. The plugin should then be available under Configuration -> Data Sources.

## Known issues

- After editing a panel and clicking "Go back" the old version of tha panel is shown. Clicking refresh dashboard will show the new version.
- Plugin has no history or ability to backfill history.

## Development instructions from template

### What is Grafana Data Source Plugin?
Grafana supports a wide range of data sources, including Prometheus, MySQL, and even Datadog. There’s a good chance you can already visualize metrics from the systems you have set up. In some cases, though, you already have an in-house metrics solution that you’d like to add to your Grafana dashboards. Grafana Data Source Plugins enables integrating such solutions with Grafana.

### Getting started
1. Install dependencies
```BASH
yarn install
```
2. Build plugin in development mode or run in watch mode
```BASH
yarn dev
```
or
```BASH
yarn watch
```
3. Build plugin in production mode
```BASH
yarn build
```

### Learn more
- [Build a data source plugin tutorial](https://grafana.com/tutorials/build-a-data-source-plugin)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System