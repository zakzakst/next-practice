"use client";
// 参考：https://react-spectrum.adobe.com/react-aria/GridList.html

import classNames from "classnames";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const GridList = ({ children, className }: Props) => {
  return <div className={classNames(className, styles.main)}>{children}</div>;
};

export default GridList;
