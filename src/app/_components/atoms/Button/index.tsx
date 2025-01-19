"use client";

import { Button as RaButton } from "react-aria-components";
import type { ButtonProps as RaButtonProps } from "react-aria-components";
import classNames from "classnames";
import styles from "./index.module.scss";

// TODO:
// - Aタグとの使い分け（他のreactのコンポーネントライブラリの実装方法見てみる）

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
} & RaButtonProps;

const Button = ({ children, className, icon, ...raProps }: Props) => {
  return (
    <RaButton
      className={classNames(
        className,
        styles.main,
        icon ? styles["-has-icon"] : undefined
      )}
      {...raProps}
    >
      {icon}
      {children}
    </RaButton>
  );
};

export default Button;
