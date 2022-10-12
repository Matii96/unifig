import { Type } from '@nestjs/common';

export const getConfigContainerToken = (template?: Type<any>) => `Unifig_container_${template?.name ?? 'GLOBAL'}`;
