import * as React from 'react';
import Tile from '../tile/Tile';
import { BuilderItem } from '../../../models/Form';
import EventBus from '../../../Bus';
import './NodeBuilder.scss';

interface NodeBuilderProps {
  parentId: string;
  nodes: BuilderItem[];
  bus: EventBus;
}

const TileList = (props: NodeBuilderProps ): any => {
  return props.nodes.map(node => 
    (
      <div key={`tile-${node.id}`}>
        <Tile parentId={props.parentId} node={node} bus={props.bus}/>
        <div className="sub-node">
          <NodeBuilder parentId={node.id} nodes={node.children} bus={props.bus}/>
        </div>
      </div>
    )
  );
};

class NodeBuilder extends React.Component<NodeBuilderProps> {

  render() {
    const props = this.props;
    return (
      <div className="node">
        {TileList(props)}
      </div>
    );
  }
}

export default NodeBuilder;
