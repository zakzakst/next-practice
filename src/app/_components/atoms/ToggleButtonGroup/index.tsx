"use client";

import { ToggleButton as RaToggleButton } from "react-aria-components";
import { ToggleButtonGroup as RaToggleButtonGroup } from "react-aria-components";
import type { ToggleButtonGroupProps as RaToggleButtonGroupProps } from "react-aria-components";
import classNames from "classnames";
import styles from "./index.module.scss";

export type Item = {
  id: string;
  label: string;
  isDisabled?: boolean;
};

export type Props = {
  items: Item[];
  className?: string;
} & RaToggleButtonGroupProps;

const ToggleButtonGroup = ({ items, className, ...raProps }: Props) => {
  return (
    <RaToggleButtonGroup
      className={classNames(className, styles.main)}
      {...raProps}
    >
      {items.map((item) => (
        <RaToggleButton
          key={item.id}
          id={item.id}
          isDisabled={item.isDisabled}
          className={styles.button}
        >
          {item.label}
        </RaToggleButton>
      ))}
    </RaToggleButtonGroup>
  );
};

export default ToggleButtonGroup;
