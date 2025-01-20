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

const Button = ({ children, icon, className, ...raProps }: Props) => {
  return (
    <RaButton
      className={classNames(
        className,
        styles.main
        // icon ? styles["--has-icon"] : undefined
      )}
      // NOTE: typed-scss-modules はハイフンやアンダースコアを含めたクラス名を自動でケバブケースにしてしまう。これを避けるため、マルチクラスではなくdata属性をセレクタに利用した
      data-has-icon={icon ? true : undefined}
      {...raProps}
    >
      {icon}
      {children}
    </RaButton>
  );
};

export default Button;
