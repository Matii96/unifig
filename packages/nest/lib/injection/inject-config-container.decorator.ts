import { Type, Inject } from '@nestjs/common';
import { getConfigContainerToken } from './get-config-container-token.factory';

export const InjectConfig = (template?: Type): ParameterDecorator => Inject(getConfigContainerToken(template));
