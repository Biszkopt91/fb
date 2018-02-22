import * as React from 'react';
import FormNode from '../form-node/FormNode';
import { BuilderItem, FormItem } from '../../../models/Form';
import EventBus from '../../../Bus';
import './FormBuilder.scss';

interface NodeBuilderProps {
  formBuilderItems: BuilderItem[];
  formItems: FormItem[];
  bus: EventBus;
}

class FormBuilder extends React.Component<NodeBuilderProps> {

  render() {
    const props = this.props;
    return (
      <div className="node">
        {FormElementList(props)}
      </div>
    );
  }
}

function FormElementList(props: NodeBuilderProps): any {
  return props.formBuilderItems.map((formBuilderItem, index) => 
    (
      <div key={`form-element-${formBuilderItem.id}`}>
        <FormNode formBuilderItem={formBuilderItem} formItem={props.formItems[index]} bus={props.bus}/>
        <div className="sub-node">
          {props.formItems[index].isValid && 
            <FormBuilder 
              formBuilderItems={formBuilderItem.children} 
              formItems={props.formItems[index].children} 
              bus={props.bus}
            />
          }
        </div>
      </div>
    )
  );
}

export default FormBuilder;
