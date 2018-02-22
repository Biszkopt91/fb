import * as React from 'react';
import { Tabs } from 'antd';
import Create from '../create/Create';
import Export from '../export/Export';
import Preview from '../preview/Preview';
import { BuilderItem, FormItem } from '../../models/Form';
import Store from '../../store/Store';
import EventBus from '../../Bus';
import './FakeRouter.scss';

const TabPane = Tabs.TabPane;

interface FakeRouterState {
  nodes: BuilderItem[];
  formItems: FormItem[];
}

class FakeRouter extends React.Component<any, FakeRouterState> {
  store: Store = Store.Instance;
  bus: EventBus = EventBus.Instance;
  subscribeDestroyers: any[] = [];
  constructor(props: any, state: FakeRouterState) {
    super(props, state);
    this.state = {
      nodes: [],
      formItems: []
    };
    this.subscribeEvents();
  }

  subscribeEvents() {
    this.subscribeDestroyers.push(
      this.bus.subscribe(this.bus.Configuration.storeUpdated, this.handleStoreUpdate.bind(this))
    );
  }

  handleStoreUpdate() {
    this.setState({
      nodes: this.store.builderItems,
      formItems: this.store.formItems
    });
  }

  componentWillUnmount() {
    this.bus.unsubscribeEvents(this.subscribeDestroyers);
  }

  componentDidMount() {
    this.handleStoreUpdate();
  }

  render() {
    const nodes = this.state.nodes;
    const formItems = this.state.formItems;
    const bus = this.bus;
    return (
      <Tabs className="container" defaultActiveKey="1">
        <TabPane tab="Create" key="1" ><Create nodes={nodes} bus={bus}/></TabPane>
        <TabPane tab="Preview" key="2"><Preview nodes={nodes} formItems={formItems} bus={bus}/></TabPane>
        <TabPane tab="Export" key="3"><Export nodes={nodes}/></TabPane>
      </Tabs>
    );
  }
}

export default FakeRouter;
