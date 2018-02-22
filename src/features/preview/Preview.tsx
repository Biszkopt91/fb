import * as React from 'react';
import { BuilderItem, FormItem } from '../../models/Form';
import FormBuilder from './form-builder/FormBuilder';
import Store from '../../store/Store';

interface CreateProps {
  nodes: BuilderItem[];
  formItems: FormItem[];
}
class Create extends React.Component<CreateProps> {
  store: Store;
  constructor(props: any) {
    super(props);
    this.store = Store.Instance;
  }

  render() {
    return (
      <FormBuilder formBuilderItems={this.props.nodes} formItems={this.props.formItems}/>
    );
  }
}

export default Create;
