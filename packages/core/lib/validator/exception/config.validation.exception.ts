import { ValidationError } from 'class-validator';
import { getBorderCharacters, SpanningCellConfig, table } from 'table';
import { PROPERTIES_MAPPING_METADATA } from '../../loader/constants';
import { PropertiesMapping, PropertySource, PropertyTarget } from '../../loader/types';
import { ConfigValidationExceptionOptions } from './config.validation.exception.options';

const headers = ['Template', 'Property', 'Source', 'Current Value', 'Failed constraints'];

// interface TemplateValidationErrors {
//   template: ClassConstructor<any>;
//   errors: ValidationError[];
// }

interface ValidationError {
  propertyTarget: PropertyTarget;
  propertySource?: PropertySource;
  failedConstraints: string[];
  currentValue: any;
}

export class ConfigValidationException extends Error {
  constructor(failedValidations: ConfigValidationExceptionOptions[]) {
    super();
    this.name = ConfigValidationException.name;

    const tableRows = this.formatTableRows(failedValidations);
    this.message = '\n' + this.formatMessage(tableRows);
  }

  private formatMessage(tableRows: { templateTableData: any[][]; spanningCells: SpanningCellConfig }[]) {
    const tableData = [headers, ...tableRows.flatMap(({ templateTableData }) => templateTableData)];
    return table(tableData, {
      columns: [{ alignment: 'left', width: 16 }],
      spanningCells: tableRows.map(({ spanningCells }) => spanningCells),
      border: getBorderCharacters('ramac'),
    });
  }

  private formatTableRows(failedValidations: ConfigValidationExceptionOptions[]) {
    let spanningCellsRowIdx = 1;
    return failedValidations.map((failedValidation) => {
      const templateTableData = this.formatExceptionsReport(failedValidation.errors).map((row) => [
        '',
        row.propertyTarget,
        row.propertySource ?? '',
        row.currentValue,
        row.failedConstraints,
      ]);
      templateTableData[0][0] = failedValidation.template.name;

      const spanningCells: SpanningCellConfig = {
        col: 0,
        row: spanningCellsRowIdx,
        rowSpan: templateTableData.length,
        verticalAlignment: 'middle',
      };
      spanningCellsRowIdx += templateTableData.length;
      return { templateTableData, spanningCells };
    });
  }

  private formatExceptionsReport(errors: ValidationError[], parentPath = ''): ValidationError[] {
    return errors.flatMap<ValidationError>((error) => {
      const propertyTarget = parentPath + error.property;
      if (error.children && error.children.length > 0) {
        return this.formatExceptionsReport(error.children, `${propertyTarget}.`);
      }

      const propertiesMapping: PropertiesMapping = error.target
        ? Reflect.getMetadata(PROPERTIES_MAPPING_METADATA, error.target.constructor)
        : undefined;
      return {
        propertyTarget,
        propertySource: propertiesMapping?.get(error.property),
        failedConstraints: error.constraints ? Object.keys(error.constraints) : [],
        currentValue: error.value,
      };
    });
  }
}
