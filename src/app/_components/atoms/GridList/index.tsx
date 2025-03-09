"use client";
// 参考：https://react-spectrum.adobe.com/react-aria/GridList.html

import classNames from "classnames";
import styles from "./index.module.scss";
import {
  GridList as RaGridList,
  GridListProps as RaGridListProps,
  GridListItem,
} from "react-aria-components";

type Item = {
  id: string;
  label: string;
  isDisabled?: boolean;
};

type OwnProps = {
  label: string;
  items: Item[];
  className?: string;
  onAction?: (id: string) => void;
};

// TODO: RaGridListPropsの引数きちんと読み切れていない（エラーが出ていないだけ）。余裕ある時にちゃんと見る。
type Props = OwnProps & Omit<RaGridListProps<Item>, keyof OwnProps>;

const GridList = ({ label, items, className, onAction, ...rest }: Props) => {
  return (
    <RaGridList
      className={classNames(className, styles.main)}
      {...rest}
      aria-label={label}
    >
      {items.map((item) => (
        <GridListItem
          key={item.id}
          isDisabled={item.isDisabled}
          onAction={() => onAction && onAction(item.id)}
        >
          {item.label}
        </GridListItem>
      ))}
    </RaGridList>
  );
};

export default GridList;
