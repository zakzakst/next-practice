"use client";

import { Button as RaButton } from "react-aria-components";
import type { ButtonProps as RaButtonProps } from "react-aria-components";
import classNames from "classnames";
import styles from "./index.module.scss";

// TODO:
// - 待機中の時、現状は設定されたテキスト要素をなくしているが、ボタンの幅が変わってしまうので、要素は無くさずにCSSで対応する。その際、アクセシビリティも考慮する
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
      {raProps.isPending ? (
        <span aria-label="loading">...</span>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </RaButton>
  );
};

export default Button;
