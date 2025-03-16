"use client";
// 参考：https://react-spectrum.adobe.com/react-aria/Table.html

import {
  Table as RaTable,
  TableProps as RaTableProps,
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
} from "react-aria-components";
import classNames from "classnames";
import styles from "./index.module.scss";

type Row = string[];

type OwnProps = {
  label: string;
  headerRow: Row;
  bodyRows: {
    row: Row;
    isDisabled?: boolean;
  }[];
  className?: string;
};

type Props = OwnProps & Omit<RaTableProps, keyof OwnProps>;

const Table = ({ label, className, headerRow, bodyRows, ...rest }: Props) => {
  return (
    <RaTable
      aria-label={label}
      className={classNames(className, styles.main)}
      {...rest}
    >
      <TableHeader>
        {headerRow.map((cell, index) => (
          <Column key={`header-row-${index}`} isRowHeader={index === 0}>
            {cell}
          </Column>
        ))}
      </TableHeader>
      <TableBody renderEmptyState={() => "データがありません"}>
        {bodyRows.map((row, index) => (
          <Row key={`body-row-${index}`} isDisabled={row.isDisabled}>
            {row.row.map((cell, index) => (
              <Cell key={`body-cell-${index}`}>{cell}</Cell>
            ))}
          </Row>
        ))}
      </TableBody>
    </RaTable>
  );
};

export default Table;
