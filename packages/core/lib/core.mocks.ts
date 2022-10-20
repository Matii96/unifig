import { IsDefined, IsInt, IsString } from 'class-validator';
import { From, Nested } from './loader';

class DbConfig {
  @From('DB_URL')
  @IsString()
  url: string;

  @From('DB_PASSWORD')
  @IsString()
  password: string;
}

export class TemplateMock {
  @From('PORT')
  @IsInt()
  port: number;

  @Nested(DbConfig)
  @IsDefined()
  db: DbConfig;
}

export const mockFailedValidation = [
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
        target: new DbConfig(),
        property: 'url',
        children: [] as any[],
        constraints: { isString: 'url must be a string' },
      },
      {
        target: new DbConfig(),
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
        target: new DbConfig(),
        property: 'url',
        children: [] as any[],
        constraints: { isDefined: 'url must be a defined', isString: 'url must be a string' },
      },
      {
        target: new DbConfig(),
        property: 'subdb',
        children: [
          {
            target: new DbConfig(),
            property: 'url',
            children: [] as any[],
            constraints: { isString: 'url must be a string' },
          },
          {
            target: new DbConfig(),
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
