var Minibus = require('minibus');

export default class EventBus {

  private static _instance: any;
  
  public static get Instance() {
    return this._instance || (this._instance = Minibus.create());
  }

  public static get Configuration() {
    return {
      storeUpdated: 'store-updated',
      validationConditionUpdated: 'validation-condition-updated',
      commitChanges: 'commit-changes',
      addItem: 'add-item',
      deleteItem: 'delete-item'
    };
  }

  public static subscribe(topic: string, callback: () => void) {
    return EventBus.Instance.on(topic, callback);
  }

  public static unsubscribe(destroyer: any) {
    EventBus.Instance.off(destroyer);
  }
  
  public static unsubscribeEvents(subscribeDestroyers: any) {
    subscribeDestroyers.forEach((destroyer: any) => {
      EventBus.unsubscribe(destroyer);
    });
  }

  public static triggerStoreUpdated() {
    EventBus.trigger(EventBus.Configuration.storeUpdated);
  }

  public static triggerValidationConditionUpdated() {
    EventBus.trigger(EventBus.Configuration.validationConditionUpdated);
  }

  public static triggerCommitChanges() {
    EventBus.trigger(EventBus.Configuration.commitChanges);
  }

  public static triggerAddItem(parentId?: string) {
    EventBus.trigger(EventBus.Configuration.addItem, parentId);
  }

  public static triggerDeleteItem(parentId: string, itemId: string) {
    EventBus.trigger(EventBus.Configuration.deleteItem, parentId, itemId);
  }

  private static trigger(topic: string, ...restArgs: any[]) {
    EventBus.Instance.emit(topic, ...restArgs);
  }
}