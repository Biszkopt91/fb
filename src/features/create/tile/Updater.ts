import Bus from '../../../Bus';
import Store from '../../../store/Store';
import { BuilderItem, FormItemType, ConditionType } from '../../../models/Form';

export default class TileUpdater {
  bus: any = Bus.Instance;
  store: Store = Store.Instance;
  
  constructor(private item: BuilderItem, private parentId: string) {}

  emitValidationStateChange() {
    this.bus.emit(`${Bus.Configuration.validationConditionUpdated}-${this.item.id}`);
  }

  updateItemType(entityType: FormItemType) {
    this.item.entityType = entityType;
    this.resetConditionValue();
    this.store.commitChanges();
    this.emitValidationStateChange();
  }
  updateConditionType(type: ConditionType) {
    this.item.condition.type = type;
    this.store.commitChanges();
    this.emitValidationStateChange();
  }
  updateConditionValue(value: string) {
    this.item.condition.value = value;
    this.store.commitChanges();
    this.emitValidationStateChange();
  }
  updateQuestion(question: string) {
    this.item.question = question;
    this.store.commitChanges();
  }

  resetConditionValue() {
    this.item.condition.value = '';
    this.item.condition.type = 'Equals';
  }

  deleteItem() {
    this.store.deleteItem(this.parentId, this.item.id);
  }

  addSubItem() {
    this.store.addItem(this.item.id);
  }
 
}