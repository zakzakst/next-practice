---
Name: <%= h.capitalize(name) %>
to: src/app/_components/<%= type %>/<%= Name %>/index.tsx
---
"use client";
// 参考：

import classNames from "classnames";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const <%= Name %> = ({ children, className }: Props) => {
  return (
    <div className={classNames(className, styles.main)}>{children}</div>
  );
};

export default <%= Name %>;