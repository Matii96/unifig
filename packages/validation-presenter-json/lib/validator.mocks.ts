import {
  ConfigPropertyValidationError,
  ConfigSubtemplateValidationError,
  ConfigTemplateValidationError,
} from '@unifig/core';

export class StorageOptions {}
export class NetworkOptions {}

export const mockFailed1dValidation = () =>
  new ConfigTemplateValidationError({
    template: StorageOptions,
    errors: [
      new ConfigPropertyValidationError({
        currentValue: 'not-a-port',
        type: 'Number',
        failedConstraints: [{ details: 'port must be an integer number', name: 'isInt' }],
        property: 'port',
        source: 'PORT',
      }),
    ],
  }) satisfies ConfigTemplateValidationError;

export const mockFailed2dValidation = () =>
  [
    {
      errors: [
        ...mockFailed1dValidation().errors,
        new ConfigSubtemplateValidationError({
          property: 'db',
          children: [
            new ConfigPropertyValidationError({
              currentValue: undefined,
              type: 'String',
              failedConstraints: [{ details: 'url must be a string', name: 'isString' }],
              property: 'url',
              source: 'DB_URL',
            }),
            new ConfigPropertyValidationError({
              currentValue: undefined,
              type: 'String',
              failedConstraints: [{ details: 'password must be a string', name: 'isString' }],
              property: 'password',
              source: 'DB_PASSWORD',
            }),
          ],
        }),
      ],
      template: StorageOptions,
    },
    {
      errors: [
        new ConfigSubtemplateValidationError({
          property: 'ipRange',
          failedConstraints: [{ details: 'ipRange must be defined', name: 'isDefined' }],
          children: [],
        }),
      ],
      template: NetworkOptions,
    },
  ] satisfies ConfigTemplateValidationError[];
