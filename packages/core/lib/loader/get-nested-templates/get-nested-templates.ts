import { PropertiesNesting } from '../../shared/types';
import { ClassConstructor } from '../../utils/class-constructor';
import { PROPERTIES_NESTING_METADATA } from '../constants';

export const getNestedTemplates = (template: ClassConstructor): ClassConstructor[] => {
  const nesting: PropertiesNesting = Reflect.getMetadata(PROPERTIES_NESTING_METADATA, template);
  if (!nesting) {
    return [template];
  }

  return [
    template,
    ...Array.from(nesting.values()).flatMap((getSubTemplate) =>
      getNestedTemplates(getSubTemplate()),
    ),
  ];
};
