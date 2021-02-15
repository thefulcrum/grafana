import React, { FC } from 'react';
import { TableCellProps } from './types';

<<<<<<< HEAD
export const ImageCell: FC<TableCellProps> = props => {
=======
export const ImageCell: FC<TableCellProps> = (props) => {
>>>>>>> v7.4.1
  const { field, cell, tableStyles, cellProps } = props;

  const displayValue = field.display!(cell.value);

  return (
    <div {...cellProps} className={tableStyles.cellContainer}>
      <img src={displayValue.text} className={tableStyles.imageCell} />
    </div>
  );
};
