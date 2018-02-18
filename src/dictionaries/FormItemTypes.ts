import { FormItemType } from '../models/Form';

export const entityTypesConfiguration = {
  text: 'Text' as FormItemType,
  number: 'Number' as FormItemType,
  radio: 'Radio' as FormItemType
};

export class FormItemTypes {
  static get dictionary(): FormItemType[] {
    return [entityTypesConfiguration.text, entityTypesConfiguration.number, entityTypesConfiguration.radio];
  }
}
