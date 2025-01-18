"use client";

import { Button as RaButton } from "react-aria-components";
import classNames from "classnames";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AtomSample = ({ children, className }: Props) => {
  return (
    <RaButton
      className={classNames(className, styles.main)}
      onPress={() => alert("Hello world!")}
    >
      {children}
    </RaButton>
  );
};

export default AtomSample;
