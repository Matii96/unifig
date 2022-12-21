import { ValidationError } from 'class-validator';
import { DbConfigMock, TemplateMock } from '../core.mocks';

export const mockFailedValidation: ValidationError[] = [
  {
    target: new TemplateMock(),
    property: 'port',
    children: [] as any[],
    constraints: { isInt: 'port must be an integer number' },
  },
  {
    target: new TemplateMock(),
    value: {},
    property: 'db',
    children: [
      {
        target: new DbConfigMock(),
        property: 'url',
        children: [] as any[],
        constraints: { isString: 'url must be a string' },
      },
      {
        target: new DbConfigMock(),
        property: 'password',
        children: [],
        constraints: { isString: 'password must be a string' },
      },
    ],
  },
  {
    target: new TemplateMock(),
    value: {},
    property: 'db2',
    children: [
      {
        target: new DbConfigMock(),
        property: 'url',
        children: [] as any[],
        constraints: { isDefined: 'url must be a defined', isString: 'url must be a string' },
      },
      {
        target: new DbConfigMock(),
        property: 'subdb',
        children: [
          {
            target: new DbConfigMock(),
            property: 'url',
            children: [] as any[],
            constraints: { isString: 'url must be a string' },
          },
          {
            target: new DbConfigMock(),
            property: 'password',
            children: [],
            constraints: { isString: 'password must be a string' },
          },
        ],
        constraints: { isString: 'password must be a string' },
      },
    ],
  },
];
