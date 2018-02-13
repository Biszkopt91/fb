export class Store {
  private static _instance: Store;
  public static get Instance(){
    return this._instance || (this._instance = new this());
  }

  addItem(parentId: string) {

  }

  deleteItem(parentId: string) {
    
  }
}