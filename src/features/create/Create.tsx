import * as React from 'react';
import NodeBuilder from './node-builder/NodeBuilder';
import { BuilderItem } from '../../models/Form';
import { Button } from 'antd';
import EventBus from '../../Bus';

interface CreateProps {
  nodes: BuilderItem[];
  bus: EventBus;
}
class Create extends React.Component<CreateProps> {
  constructor(props: any) {
    super(props);
  }

  handleAddItemClick = () => { this.props.bus.triggerAddItem(); };

  render() {
    return (
      <>
        <NodeBuilder parentId="" nodes={this.props.nodes} bus={this.props.bus}/>
        <Button type="primary" onClick={this.handleAddItemClick}>Add item</Button>
      </>
    );
  }
}

export default Create;
