
export default class LocalStorage {
  private static _instance: any;
  public static get Instance() {
    return this._instance || (this._instance = window.localStorage);
  }
  public static get nodes() {
    return {
      formBuilderNodes: 'formBuilderNodes',
      formItems: 'formItems'
    };
  }
}