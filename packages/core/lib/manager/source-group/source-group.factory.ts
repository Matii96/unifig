import { Loader } from '../../loader/loader';
import { Validator } from '../../validator/validator';
import { containerFactory as configContainerFactory } from '../container/container.factory';
import { ConfigSourceGroup } from './source-group.impl';
import { SourceGroup } from './source-group';

export const sourceGroupFactory = (
  loader: Loader,
  validator: Validator,
  containerFactory: typeof configContainerFactory
): SourceGroup => new ConfigSourceGroup(loader, validator, containerFactory);
