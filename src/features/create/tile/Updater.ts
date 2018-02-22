import EventBus from '../../../Bus';
import { BuilderItem, FormItemType, ConditionType } from '../../../models/Form';

export default class TileUpdater {
  
  constructor(private item: BuilderItem, private parentId: string, private bus: EventBus) {}

  emitValidationStateChange() {
    this.bus.triggerValidationConditionUpdated(this.item.id);
  }
  triggerCommitChanges() {
    this.bus.triggerCommitChanges();
  }

  updateItemType(entityType: FormItemType) {
    this.item.entityType = entityType;
    this.resetConditionValue();
    this.triggerCommitChanges();
    this.emitValidationStateChange();
  }
  updateConditionType(type: ConditionType) {
    this.item.condition.type = type;
    this.triggerCommitChanges();
    this.emitValidationStateChange();
  }
  updateConditionValue(value: string) {
    this.item.condition.value = value;
    this.triggerCommitChanges();
    this.emitValidationStateChange();
  }
  updateQuestion(question: string) {
    this.item.question = question;
    this.triggerCommitChanges();
  }

  resetConditionValue() {
    this.item.condition.value = '';
    this.item.condition.type = 'Equals';
  }

  deleteItem() {
    this.bus.triggerDeleteItem(this.parentId, this.item.id);
  }

  addSubItem() {
    this.bus.triggerAddItem(this.item.id);
  }
 
}