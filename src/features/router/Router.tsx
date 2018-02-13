import * as React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Router extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Create" key="1">Create</TabPane>
        <TabPane tab="Preview" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="Export" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>
    );
  }
}

export default Router;
