import { Type } from '@nestjs/common';

let globalIdCounter = 0;
const TEMPLATE_ID = '__unifigNestTemplateId__';

export const getConfigContainerToken = (template?: Type) => {
  if (!template) {
    return 'Unifig_container_GLOBAL';
  }
  let id: number = Reflect.getMetadata(TEMPLATE_ID, template);
  if (id === undefined) {
    id = globalIdCounter++;
    Reflect.defineMetadata(TEMPLATE_ID, id, template);
  }
  return `Unifig_container_${template.name}${id}`;
};
