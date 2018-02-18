import * as React from 'react';
import { BuilderItem } from '../../models/Form';
import { Input } from 'antd';
const TextArea  = Input.TextArea;

interface PreviewProps {
  nodes: BuilderItem[];
}

class Export extends React.Component<PreviewProps> {
  jsonPrettify(nodes: BuilderItem[]) {
    return JSON.stringify({formBuilderNodes: nodes}, undefined, 4);
  }
  render() {
    const value = this.jsonPrettify(this.props.nodes);
    return (
      <TextArea value={value} autosize={true}/>
    );
  }
}

export default Export;
