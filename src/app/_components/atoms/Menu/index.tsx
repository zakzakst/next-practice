"use client";
// NOTE: https://react-spectrum.adobe.com/react-aria/Menu.html

import {
  Button,
  Menu as RaMenu,
  MenuProps as RaMenuProps,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";
import classNames from "classnames";
import styles from "./index.module.scss";

type Item = {
  id: string;
  label: string;
  isDisabled?: boolean;
};

type OwnProps = {
  label: string;
  items: Item[];
  className?: string;
  onClickMenu?: (id: string) => void;
};

// TODO: RaMenuPropsの引数きちんと読み切れていない（エラーが出ていないだけ）。余裕ある時にちゃんと見る。
type Props = OwnProps & Omit<RaMenuProps<Item>, keyof OwnProps>;

const Menu = ({ label, items, className, onClickMenu, ...rest }: Props) => {
  return (
    <MenuTrigger {...rest}>
      <Button aria-label={label}>☰</Button>
      <Popover>
        <RaMenu className={classNames(className, styles.main)}>
          {items.map((item) => (
            <MenuItem
              key={item.id}
              onAction={onClickMenu ? () => onClickMenu(item.id) : undefined}
              isDisabled={item.isDisabled}
            >
              {item.label}
            </MenuItem>
          ))}
        </RaMenu>
      </Popover>
    </MenuTrigger>
  );
};

export default Menu;
