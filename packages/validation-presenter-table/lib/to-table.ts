import {
  ConfigTemplateValidationError,
  ConfigValidationError,
  ConfigPropertyValidationError,
  ConfigSubtemplateValidationError,
} from '@unifig/core';
import { getBorderCharacters, SpanningCellConfig, table } from 'table';
import { TemplateRow } from './template-row/template-row';
import { ToTableOptions } from './to-table.options';

const HEADER = ['Template', 'Property', 'Type', 'Source', 'Current Value', 'Failed constraints'];

export const toTable = (
  validationException: ConfigValidationError,
  options: ToTableOptions = {}
): string => {
  const tableRows = formatTableRowsGroup(validationException.errors);
  const tableData = [HEADER, ...tableRows.flatMap(({ templateTableData }) => templateTableData)];

  return table(tableData, {
    columns: [{ alignment: 'left', width: 16 }],
    spanningCells: tableRows.map(({ spanningCells }) => spanningCells),
    border: getBorderCharacters(options.border ?? 'norc'),
  });
};

const formatTableRowsGroup = (failedValidations: ConfigTemplateValidationError[]) => {
  let spanningCellsRowIdx = 1;
  return failedValidations.map((failedValidation) => {
    const templateTableData = failedValidation.errors
      .flatMap((error) => formatTemplateRows(error))
      .map((row) => row.toArray());
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
};

const formatTemplateRows = (
  error: ConfigPropertyValidationError | ConfigSubtemplateValidationError,
  parentPrefix = ''
): TemplateRow[] => {
  if (error instanceof ConfigPropertyValidationError) {
    return [TemplateRow.fromValidationError(error, parentPrefix)];
  }
  if (error instanceof ConfigSubtemplateValidationError) {
    const propertyParentPrefix = parentPrefix + error.property + '.';
    const subtemplateRows = error.children.flatMap((child) =>
      formatTemplateRows(child, propertyParentPrefix)
    );
    return error.failedConstraints
      ? [TemplateRow.fromValidationError(error), ...subtemplateRows]
      : subtemplateRows;
  }
  throw new Error('Passed plain validation object: ' + JSON.stringify(error));
};
