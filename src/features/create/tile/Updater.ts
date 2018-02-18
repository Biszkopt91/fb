import Bus from '../../../Bus';
import Store from '../../../store/Store';
import { BuilderItem, FormItemType, ConditionType } from '../../../models/Form';

export default class TileUpdater {
  bus: any = Bus.Instance;
  store: Store = Store.Instance;
  item: BuilderItem;
  
  constructor(private itemId: string, private parentId: string) {
    this.item = Store.findItem(this.store.builderItems, this.itemId);
  }

  emitValidationStateChange() {
    this.bus.emit(`${Bus.Configuration.validationConditionUpdated}-${this.item.id}`);
  }

  updateItemType(entityType: FormItemType) {
    this.item.entityType = entityType;
    this.item.condition.value = '';
    this.item.condition.type = 'Equals';
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

  deleteItem() {
    this.store.deleteItem(this.parentId, this.itemId);
  }

  addSubItem() {
    this.store.addItem(this.itemId);
  }
 
}