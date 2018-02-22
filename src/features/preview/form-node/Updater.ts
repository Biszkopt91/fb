import { BuilderItem, FormItem } from '../../../models/Form';
import { conditionsConfiguration  } from '../../../dictionaries/Conditions';
import EventBus from '../../../Bus';

export default class TileUpdater {

  subscribeDestroyers: any[] = [];
  constructor(private builderItem: BuilderItem, private formItem: FormItem, private bus: EventBus) {}

  subscribeEvents() {
    return this.subscribeDestroyers.push(
      this.bus.subscribe(
        `${this.bus.Configuration.validationConditionUpdated}-${this.builderItem.id}`,
        this.checkValidation.bind(this)
      )
    );
  }

  unsubscribeEvents() {
    this.bus.unsubscribeEvents(this.subscribeDestroyers);
  }

  checkValidation() {
    this.formItem.isValid = this.isValid(this.formItem.value);
    this.bus.triggerCommitChanges();
  }

  valueUpdated(newValue: string) {
    this.formItem.value = newValue;
    this.formItem.isValid = this.isValid(newValue);

    this.bus.triggerCommitChanges();
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