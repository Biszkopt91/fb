export const entityTypesConfiguration = {
  text: 'Text' as EntityType,
  number: 'Number' as EntityType,
  radio: 'Radio' as EntityType
};

export class EntityTypes {
  static get dictionary(): EntityType[] {
    return [entityTypesConfiguration.text, entityTypesConfiguration.number, entityTypesConfiguration.radio];
  }
}
export type EntityType = 'Text' | 'Number' | 'Radio';
