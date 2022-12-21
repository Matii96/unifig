import { Type } from '@nestjs/common';
import { CONFIG_CONTAINER_TOKEN } from './constants';

const getToken = (name: string) => `Config_container_${name}`;
const DEFAULT_CONTAINER_TOKEN = Symbol(getToken('DEFAULT'));

export const getConfigContainerToken = (template?: Type<any>) => {
  if (!template) {
    return DEFAULT_CONTAINER_TOKEN;
  }

  let token: symbol = Reflect.getMetadata(CONFIG_CONTAINER_TOKEN, template);
  if (!token) {
    token = Symbol(getToken(template.name));
    Reflect.defineMetadata(CONFIG_CONTAINER_TOKEN, token, template);
  }

  return token;
};
