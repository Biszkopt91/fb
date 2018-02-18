import * as React from 'react';
import FormNode from '../form-node/FormNode';
import { BuilderItem, FormItem } from '../../../models/Form';

import './FormBuilder.scss';

interface NodeBuilderProps {
  formBuilderItems: BuilderItem[];
  formItems: FormItem[];
}

class FormBuilder extends React.Component<NodeBuilderProps> {

  render() {
    const formBuilderItems = this.props.formBuilderItems;
    const formItems = this.props.formItems;
    return (
      <div className="node">
        {FormElementList( formBuilderItems, formItems)}
      </div>
    );
  }
}

function FormElementList(formBuilderItems: BuilderItem[], formItems: FormItem[] ): any {
  return formBuilderItems.map((formBuilderItem, index) => 
    (
      <div key={`form-element-${formBuilderItem.id}`}>
        <FormNode formBuilderItem={formBuilderItem} formItem={formItems[index]}/>
        <div className="sub-node">
          {formItems[index].isValid && 
            <FormBuilder formBuilderItems={formBuilderItem.children} formItems={formItems[index].children}/>
          }
        </div>
      </div>
    )
  );
}

export default FormBuilder;
