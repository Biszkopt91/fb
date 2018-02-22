import Bus from '../../../Bus';
import Store from '../../../store/Store';
import { BuilderItem, FormItem } from '../../../models/Form';
import { conditionsConfiguration  } from '../../../dictionaries/Conditions';

export default class TileUpdater {
  bus: any = Bus.Instance;
  store: Store = Store.Instance;

  subscribeDestroyers: any[] = [];
  constructor(private builderItem: BuilderItem, private formItem: FormItem) {}

  subscribeEvents() {
    return this.subscribeDestroyers.push(
      Bus.subscribe(
        `${Bus.Configuration.validationConditionUpdated}-${this.builderItem.id}`,
        this.checkValidation.bind(this)
      )
    );
  }

  unsubscribeEvents() {
    Bus.unsubscribeEvents(this.subscribeDestroyers);
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