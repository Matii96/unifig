import { Validator } from './validator';

export class ValidatorMock implements Validator {
  validate = jest.fn();
}
