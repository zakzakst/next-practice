"use client";

import { Button as RaButton } from "react-aria-components";
import { FileTrigger as RaFileTrigger } from "react-aria-components";
import type { FileTriggerProps as RaFileTriggerProps } from "react-aria-components";
import classNames from "classnames";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
  className?: string;
  isDisabled?: boolean;
} & RaFileTriggerProps;

const FileTrigger = ({
  children,
  ref,
  className,
  isDisabled,
  ...raProps
}: Props) => {
  return (
    <div className={classNames(className, styles.main)}>
      <RaFileTrigger {...raProps} ref={ref}>
        <RaButton className={styles.button} isDisabled={isDisabled}>
          {children}
        </RaButton>
      </RaFileTrigger>
    </div>
  );
};

export default FileTrigger;
