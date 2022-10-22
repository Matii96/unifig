export class ConfigContainerMock<TTemplate extends Record<string, any> = any> {
  values = {};
  setValue = jest.fn((values: TTemplate) => (this.values = values));
  refresh = jest.fn();
}
