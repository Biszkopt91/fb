import { BuilderItem, FormItem } from '../models/Form';

export interface FormConfiguration {
  builderItem: BuilderItem;
  formItem: FormItem;
}

export default class ItemGenerator {
  public static get createFormConfiguration(): FormConfiguration {
    const guid = this.guid;
    return {
      builderItem: {
        id: guid,
        entityType: 'Text',
        condition: {
          type: 'Equals',
          value: ''
        },
        question: '',
        children: []
      },
      formItem: {
        id: guid,
        value: '',
        isValid: true,
        children: []
      }
    };
  }

  createForm() {
    return; 
  }

  private static get guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}