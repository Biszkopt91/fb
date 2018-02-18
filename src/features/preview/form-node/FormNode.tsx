import * as React from 'react';
import { BuilderItem, FormItem } from '../../../models/Form';
import { entityTypesConfiguration } from '../../../dictionaries/FormItemTypes';
import Updater from './Updater';
import { Radio, Input } from 'antd';
import Bus from '../../../Bus';
const RadioGroup = Radio.Group;

interface NodeBuilderProps {
  formBuilderItem: BuilderItem;
  formItem: FormItem;
}

class FormNode extends React.Component<NodeBuilderProps> {
  formElementUpdater: Updater;
  bus = Bus.Instance;
  constructor(props: NodeBuilderProps) {
    super(props);
    this.formElementUpdater = new Updater(props.formBuilderItem.id);
    this.formElementUpdater.checkValidation();
  }

  componentDidMount() {
    this.formElementUpdater.subscribeEvents();
  }

  componentWillUnmount() {
    this.formElementUpdater.unsubscribeEvents();
  }

  render() {
    let formBuilderItem = this.props.formBuilderItem as BuilderItem;
    let formItem = this.props.formItem as FormItem;
    return (
      <div>
        <h3>{formBuilderItem.question}?</h3>
        {FormElement(formBuilderItem , formItem, (value: string) => this.formElementUpdater.valueUpdated(value))}
      </div>
    );
  }
}

function FormElement(formBuilderItem: BuilderItem, formItem: FormItem, onChange: (value: string) => void) {
  function onChangeHandler(ev: any) {
    onChange(ev.target.value);
  }
  switch (formBuilderItem.entityType) {
    case entityTypesConfiguration.radio:
      return (
        <RadioGroup onChange={onChangeHandler} value={formItem.value}>
          <Radio value={'Yes'}>Yes</Radio>
          <Radio value={'No'}>No</Radio>
        </RadioGroup>
      );
    default:
      return (
        <Input type={formBuilderItem.entityType.toLowerCase()} value={formItem.value} onChange={onChangeHandler}/>
      );
  }
}

export default FormNode;
