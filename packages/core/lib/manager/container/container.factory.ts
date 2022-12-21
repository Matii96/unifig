import { SourceGroup } from '../source-group/source-group';
import { InternalConfigContainer } from './container.impl';
import { EditableConfigContainer } from './editable-container';

export const containerFactory = (sourceGroup: SourceGroup): EditableConfigContainer =>
  new InternalConfigContainer(sourceGroup);
