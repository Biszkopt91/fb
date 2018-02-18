import Bus from '../../../Bus';
import Store from '../../../store/Store';
import { BuilderItem, FormItem } from '../../../models/Form';
import { conditionsConfiguration  } from '../../../dictionaries/Conditions';

export default class TileUpdater {
  bus: any = Bus.Instance;
  store: Store = Store.Instance;
  builderItem: BuilderItem;
  formItem: FormItem;
  subscribeDestroyers: any[] = [];
  constructor(private itemId: string) {
    this.builderItem = Store.findItem(this.store.builderItems, this.itemId);
    this.formItem = Store.findItem(this.store.formItems, this.itemId);
  }

  subscribeEvents() {
    this.subscribeDestroyers.push(
      this.bus.on(
        `${Bus.Configuration.validationConditionUpdated}-${this.builderItem.id}`,
        this.checkValidation.bind(this)
      )
    );
  }

  unsubscribeEvents() {
    this.subscribeDestroyers.forEach(destroyer => {
      this.bus.off(destroyer);
    });
  }

  checkValidation() {
    this.formItem.isValid = this.isValid(this.formItem.value);
    this.store.commitChanges();
  }

  valueUpdated(newValue: string) {
    this.formItem.value = newValue;
    this.formItem.isValid = this.isValid(newValue);

    this.store.commitChanges();
  }

  private isValid(value: string) {
    const conditionValue = this.builderItem.condition.value as any;
    switch ( this.builderItem.condition.type ) {
      case conditionsConfiguration.eq:
        return value === conditionValue;
      case conditionsConfiguration.lt:
        return parseFloat(value) < parseFloat(conditionValue);
      case conditionsConfiguration.gt:
        return parseFloat(value) > parseFloat(conditionValue);
      default:
        return true;
    }
  }
}