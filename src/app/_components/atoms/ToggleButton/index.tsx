"use client";

import { ToggleButton as RaToggleButton } from "react-aria-components";
import type { ToggleButtonProps as RaToggleButtonProps } from "react-aria-components";
import classNames from "classnames";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
} & RaToggleButtonProps;

const ToggleButton = ({ children, icon, className, ...raProps }: Props) => {
  return (
    <RaToggleButton
      className={classNames(className, styles.main)}
      data-has-icon={icon ? true : undefined}
      {...raProps}
    >
      {icon}
      {children}
    </RaToggleButton>
  );
};

export default ToggleButton;
