import { BuilderItem, FormItem, StoreItemBase } from '../models/Form';
import ItemGenerator, { FormConfiguration } from './ItemGenerator';
import Bus from '../Bus';
import LocalStorage from './LocalStorage';

export default class Store {
  private static _instance: Store;
  bus: any = Bus.Instance;
  localStorage: LocalStorage = LocalStorage.Instance;
  builderItems: BuilderItem[];
  formItems: FormItem[];
  public static findItem(data: StoreItemBase<any>[], id: string) {
    const iterator = this.deepIterator(data);
    let item = iterator.next();
    let profileMatch = item.value.id === id;
    while (!item.done && !profileMatch) {
      item = iterator.next();
      profileMatch = item.value.id === id;
    }
    return profileMatch ? item.value : null;
  }

  private static *deepIterator(data: StoreItemBase<any>[]): any {
    for (let i = 0; i < data.length; i++) {
      const val = data[i];
      yield val;
  
      if (val.children) {
        yield *this.deepIterator(val.children);
      }
    }
  }

  constructor() {
    const localStorageData = localStorage.getItem(LocalStorage.nodes.formBuilderNodes);
    const formItemsLS = localStorage.getItem(LocalStorage.nodes.formItems);
    this.builderItems = localStorageData ? JSON.parse(localStorageData).formBuilderNodes : [];
    this.formItems = formItemsLS ? JSON.parse(formItemsLS).formItems : [];
    this.bus.emit(Bus.Configuration.storeUpdated);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public addItem(parentId?: string) {
    const formConfiguration = ItemGenerator.createFormConfiguration;
    parentId ? this.addItemToParent(parentId, formConfiguration) : this.addItemToRoot(formConfiguration);
    this.commitChanges();
  }

  public deleteItem(parentId: string, itemId: string) {
    parentId ? this.deleteItemFromParent(parentId, itemId) : this.deleteItemFromRoot(itemId);
    this.commitChanges();
  }

  public commitChanges() {
    localStorage.setItem(LocalStorage.nodes.formBuilderNodes, JSON.stringify({ formBuilderNodes: this.builderItems }));
    localStorage.setItem(LocalStorage.nodes.formItems, JSON.stringify({ formItems: this.formItems }));
    this.bus.emit(Bus.Configuration.storeUpdated);
  }

  private addItemToParent(parentId: string, { builderItem, formItem }: FormConfiguration) {
    const parentItem = Store.findItem(this.builderItems, parentId);
    parentItem.children = [...parentItem.children, builderItem];
    const formParentItem = Store.findItem(this.formItems, parentId);
    formParentItem.children = [...formParentItem.children, formItem];
  }

  private addItemToRoot({ builderItem, formItem }: FormConfiguration) {
    this.builderItems = [...this.builderItems, builderItem];
    this.formItems = [...this.formItems, formItem];
  }

  private deleteItemFromParent(parentId: string, itemId: string) {
    let parentItem = Store.findItem(this.builderItems, parentId);
    parentItem.children.splice(parentItem.children.findIndex((item: BuilderItem) => item.id === itemId), 1);
    let formParentItem = Store.findItem(this.formItems, parentId);
    formParentItem.children.splice(formParentItem.children.findIndex((item: FormItem) => item.id === itemId), 1);
  }

  private deleteItemFromRoot(itemId: string) {
    this.builderItems.splice(this.builderItems.findIndex((item: BuilderItem) => item.id === itemId), 1);
    this.formItems.splice(this.formItems.findIndex((item: FormItem) => item.id === itemId), 1);
  }
}