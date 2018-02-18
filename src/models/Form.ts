export type FormItemType = 'Text' | 'Number' | 'Radio';
export type ConditionType = 'Equals' | 'Greater than' | 'Less than';
export type ConditionValue = string | number;

export const formItemTypes = {
  text: 'Text',
  number: 'Number',
  radio: 'Radio',
};

export type Condition = {
  type: ConditionType;
  value: ConditionValue;
};

export interface StoreItemBase<G> {
  id: string;
  children: G[];
}

export interface BuilderItem extends StoreItemBase<BuilderItem> {
  entityType: FormItemType;
  condition: Condition;
  question: string;
}
export interface FormItem extends StoreItemBase<FormItem> {
  value: string;
  isValid: boolean;
}
