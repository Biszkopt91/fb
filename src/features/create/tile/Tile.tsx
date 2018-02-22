import * as React from 'react';
import { Button, Select, Row, Col, Input } from 'antd';
import { BuilderItem, FormItemType, ConditionType } from '../../../models/Form';

import { FormItemTypes } from '../../../dictionaries/FormItemTypes';
import { Conditions } from '../../../dictionaries/Conditions';
import Updater from './Updater';

import './Tile.scss';

const Option = Select.Option;

export interface TileProps {
  parentId: string;
  node: BuilderItem;
}

const ConditionValue = (node: BuilderItem, selectUpdater: (value: string) => void, inputUpdater: (ev: any) => void) => {
  

  return node.entityType === 'Radio' ?
    (
      <Select 
        value={node.condition.value as string} 
        onSelect={selectUpdater}
      >
        <Option value="Yes">Yes</Option>
        <Option value="No">No</Option>
      </Select>
    ) :
    (
      <Input 
        type={node.entityType.toLowerCase()} 
        value={node.condition.value}
        onChange={inputUpdater}
      />
    );
};

class Tile extends React.Component<TileProps> {
  tileUpdater: Updater;

  constructor(props: TileProps) {
    super(props);
    this.tileUpdater = new Updater(props.node.id, props.parentId);
  }

  conditionSelectUpdate = (value: string) => { this.handleConditionValueUpdate(value); };

  conditionInputUpdate = (ev: any) => { this.handleConditionValueUpdate(ev.target.value); };

  handleConditionTypeUpdate = (value: ConditionType) => { this.tileUpdater.updateConditionType(value); };

  handleConditionValueUpdate = (value: string) => { this.tileUpdater.updateConditionValue(value); };

  handleQuestionTypeUpdate = (ev: any) => { this.tileUpdater.updateQuestion(ev.target.value); };

  handleItemTypeUpdate = (value: FormItemType) => { this.tileUpdater.updateItemType(value); };

  handleItemAdd = () => { this.tileUpdater.deleteItem(); };

  handleItemDelete = () => { this.tileUpdater.addSubItem(); };

  render() {
    let node = this.props.node;
    return (
      <div className="tile">
        <Row gutter={16}>
          <Col span={6}>
            <span className="tile-label">Condition</span>
          </Col>
          <Col span={12}>
            <Select 
              value={node.condition.type as string}
              onSelect={this.handleConditionTypeUpdate}
            >
              {Conditions.dictionaryByType(node.entityType as FormItemType).map(item =>
                <Option key={item}>{item}</Option>
              )}
            </Select>
          </Col>
          <Col span={6}>
            { ConditionValue(node, this.conditionSelectUpdate, this.conditionInputUpdate)}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <span className="tile-label">Question</span>
          </Col>
          <Col span={18}>
            <Input 
              value={node.question} 
              onChange={this.handleQuestionTypeUpdate}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <span className="tile-label">Type</span>
          </Col>
          <Col span={18}>
            <Select 
              value={node.entityType as string} 
              onSelect={this.handleItemTypeUpdate}
            >
              {FormItemTypes.dictionary.map(item =>
                <Option key={item}>{item}</Option>
              )}
            </Select>
          </Col>
        </Row>
        <Row gutter={16} justify="end">
          <Col span={6}>
            <Button type="danger" onClick={this.handleItemAdd}>Remove</Button>
          </Col>
          <Col span={6}>
          <Button type="primary" onClick={this.handleItemDelete}>Add sub-item</Button>

          </Col>
        </Row>
      </div>
    );
  }
}

export default Tile;
