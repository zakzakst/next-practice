"use client";
// 参考：https://react-spectrum.adobe.com/react-aria/ListBox.html

import classNames from "classnames";
import styles from "./index.module.scss";
import {
  ListBox as RaListBox,
  ListBoxProps as RaListBoxProps,
  ListBoxItem,
} from "react-aria-components";

type Item = {
  id: string;
  label: string;
};

type OwnProps = {
  label: string;
  items: Item[];
  className?: string;
};

// TODO: RaMenuPropsの引数きちんと読み切れていない（エラーが出ていないだけ）。余裕ある時にちゃんと見る。
type Props = OwnProps & Omit<RaListBoxProps<Item>, keyof OwnProps>;

const ListBox = ({ label, items, className, ...rest }: Props) => {
  return (
    <RaListBox
      className={classNames(className, styles.main)}
      {...rest}
      aria-label={label}
    >
      {items.map((item) => (
        <ListBoxItem key={item.id}>{item.label}</ListBoxItem>
      ))}
    </RaListBox>
  );
};

export default ListBox;
