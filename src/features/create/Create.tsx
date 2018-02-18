import * as React from 'react';
import NodeBuilder from './node-builder/NodeBuilder';
import { BuilderItem } from '../../models/Form';
import { Button } from 'antd';

import Store from '../../store/Store';

interface CreateProps {
  nodes: BuilderItem[];
}
class Create extends React.Component<CreateProps> {
  store: Store;
  constructor(props: any) {
    super(props);
    this.store = Store.Instance;
  }

  render() {
    return (
      <div>
        <NodeBuilder parentId="" nodes={this.props.nodes}/>
        <Button type="primary" onClick={() => { this.store.addItem(); }}>Add item</Button>
      </div>
    );
  }
}

export default Create;
