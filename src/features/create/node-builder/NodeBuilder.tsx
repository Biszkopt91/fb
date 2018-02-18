import * as React from 'react';
import Tile from '../tile/Tile';
import { BuilderItem } from '../../../models/Form';

import './NodeBuilder.scss';

interface NodeBuilderProps {
  parentId: string;
  nodes: BuilderItem[];
}

class NodeBuilder extends React.Component<NodeBuilderProps> {

  render() {
    const nodes = this.props.nodes;
    const parentId = this.props.parentId;
    return (
      <div className="node">
        {TileList(parentId, nodes)}
      </div>
    );
  }
}

function TileList(parentId: string, nodes: BuilderItem[] ): any {
  return nodes.map(node => 
    (
      <div key={`tile-${node.id}`}>
        <Tile parentId={parentId} node={node}/>
        <div className="sub-node">
          <NodeBuilder parentId={node.id} nodes={node.children}/>
        </div>
      </div>
    )
  );
}

export default NodeBuilder;
