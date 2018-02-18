import { ConditionType, FormItemType, formItemTypes } from '../models/Form';

export const conditionsConfiguration = {
  eq: 'Equals' as ConditionType,
  gt: 'Greater than' as ConditionType,
  lt: 'Less than' as ConditionType
};
const _dictionaryConfiguration = [
  { value: conditionsConfiguration.eq, enableIn: [formItemTypes.text, formItemTypes.number, formItemTypes.radio] },
  { value: conditionsConfiguration.gt, enableIn: [formItemTypes.number] },
  { value: conditionsConfiguration.lt, enableIn: [formItemTypes.number] },
];

export class Conditions {
  static get dictionary(): ConditionType[] {
    return _dictionaryConfiguration.map(condition => condition.value);
  }

  static dictionaryByType(formItemType: FormItemType) {
    return formItemType ? 
      _dictionaryConfiguration
        .filter(configuration => configuration.enableIn.some(formItem => formItem === formItemType))
        .map(condition => condition.value)
      : Conditions.dictionary;
  }
}