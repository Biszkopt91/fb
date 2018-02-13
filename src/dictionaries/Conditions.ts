export const conditionsConfiguration = {
  eq: 'Equals' as Condition,
  gt: 'Greater than' as Condition,
  lt: 'Less than' as Condition
};
const _dictionaryConfiguration = [
  { value: conditionsConfiguration.eq, enableInText: true, enabledInNumber: true, enabledInRadio: true },
  { value: conditionsConfiguration.gt, enableInText: false, enabledInNumber: true, enabledInRadio: false },
  { value: conditionsConfiguration.lt, enableInText: false, enabledInNumber: true, enabledInRadio: false },
];
type Condition = 'Equals' | 'Greater than' | 'Less than';

export class Conditions {
  static get dictionary(): Condition[] {
    return _dictionaryConfiguration.map(condition => condition.value);
  }
  static get textDictionary(): Condition[] {
    return _dictionaryConfiguration.filter(condition => condition.enableInText).map(condition => condition.value);
  }
  static get numberDictionary(): Condition[] {
    return _dictionaryConfiguration.filter(condition => condition.enabledInNumber).map(condition => condition.value);
  }
  static get radioDictionary(): Condition[] {
    return _dictionaryConfiguration.filter(condition => condition.enabledInRadio).map(condition => condition.value);
  }
}