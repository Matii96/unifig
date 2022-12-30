import { containerFactory } from '../container/container.factory';
import { ConfigLoader } from '../../loader/loader.impl';
import { ClassValidator } from '../../validator/validator.impl';
import { ConfigSourceGroup } from './source-group.impl';
import { SourceGroup } from './source-group';

export const sourceGroupFactory = (): SourceGroup =>
  new ConfigSourceGroup(new ConfigLoader(), new ClassValidator(), containerFactory);
