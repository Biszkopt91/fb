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

class Tile extends React.Component<TileProps> {
  tileUpdater: Updater;

  constructor(props: TileProps) {
    super(props);
    this.tileUpdater = new Updater(props.node.id, props.parentId);
  }

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
              onSelect={(value: ConditionType) => { this.tileUpdater.updateConditionType(value); }}
            >
              {Conditions.dictionaryByType(node.entityType as FormItemType).map(item =>
                <Option key={item}>{item}</Option>
              )}
            </Select>
          </Col>
          <Col span={6}>
            {ConditionValue(node, (value: string) => { this.tileUpdater.updateConditionValue(value); })}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <span className="tile-label">Question</span>
          </Col>
          <Col span={18}>
            <Input 
              value={node.question} 
              onChange={(ev: any) => { 
                this.tileUpdater.updateQuestion(ev.target.value);
              }}
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
              onSelect={(value: FormItemType) => { this.tileUpdater.updateItemType(value); }}
            >
              {FormItemTypes.dictionary.map(item =>
                <Option key={item}>{item}</Option>
              )}
            </Select>
          </Col>
        </Row>
        <Row gutter={16} justify="end">
          <Col span={6}>
            <Button type="danger" onClick={() => { this.tileUpdater.deleteItem(); }}>Remove</Button>
          </Col>
          <Col span={6}>
          <Button type="primary" onClick={() => { this.tileUpdater.addSubItem(); }}>Add sub-item</Button>

          </Col>
        </Row>
      </div>
    );
  }
}

function ConditionValue(node: BuilderItem, updateFunction: (value: string) => void) {
  return node.entityType === 'Radio' ?
    (
      <Select 
        value={node.condition.value as string} 
        onSelect={(value: string) => {
          updateFunction(value);
        }}
      >
        <Option value="Yes">Yes</Option>
        <Option value="No">No</Option>
      </Select>
    ) :
    (
      <Input 
        type={node.entityType.toLowerCase()} 
        value={node.condition.value} 
        onChange={(ev: any) => {
          updateFunction(ev.target.value);
        }}
      />
    );
}

export default Tile;
