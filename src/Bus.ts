var Minibus = require('minibus');

export default class EventBus {
  private static _instance: any;
  
  public static get Instance() {
    return this._instance || (this._instance = Minibus.create());
  }

  public static get Configuration() {
    return {
      storeUpdated: 'store-updated',
      validationConditionUpdated: 'validation-condition-updated'
    };
  }
}