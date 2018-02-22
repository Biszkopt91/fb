var Minibus = require('minibus');

export default class EventBus {
  private static _instance: EventBus;
  private static minibus: any = Minibus.create();

  private static trigger(topic: string, ...restArgs: any[]) {
    EventBus.minibus.emit(topic, ...restArgs);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  get Configuration() {
    return {
      storeUpdated: 'store-updated',
      validationConditionUpdated: 'validation-condition-updated',
      commitChanges: 'commit-changes',
      addItem: 'add-item',
      deleteItem: 'delete-item'
    };
  }

  subscribe(topic: string, callback: () => void) {
    return EventBus.minibus.on(topic, callback);
  }

  unsubscribe(destroyer: any) {
    EventBus.minibus.off(destroyer);
  }
  
  unsubscribeEvents(subscribeDestroyers: any) {
    subscribeDestroyers.forEach((destroyer: any) => {
      this.unsubscribe(destroyer);
    });
  }

  triggerStoreUpdated() {
    EventBus.trigger(this.Configuration.storeUpdated);
  }

  triggerValidationConditionUpdated(itemId: string) {
    EventBus.trigger(`${this.Configuration.validationConditionUpdated}-${itemId}`);
  }

  triggerCommitChanges() {
    EventBus.trigger(this.Configuration.commitChanges);
  }

  triggerAddItem(parentId?: string) {
    EventBus.trigger(this.Configuration.addItem, parentId);
  }

  triggerDeleteItem(parentId: string, itemId: string) {
    EventBus.trigger(this.Configuration.deleteItem, parentId, itemId);
  }
}