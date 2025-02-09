"use client";
// NOTE: https://react-spectrum.adobe.com/react-aria/Select.html

import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as RaSelect,
  SelectProps as RaSelectProps,
  SelectValue,
} from "react-aria-components";
import classNames from "classnames";
import styles from "./index.module.scss";

type Item = {
  id: string;
  label: string;
};

type OwnProps = {
  label: string;
  items: Item[];
  className?: string;
};

type Props = OwnProps & Omit<RaSelectProps, keyof OwnProps>;

const Select = ({ label, items, className, ...props }: Props) => {
  return (
    <RaSelect className={classNames(className, styles.main)} {...props}>
      <Label>{label}</Label>
      <Button>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox>
          {items.map((item) => (
            <ListBoxItem key={item.id}>{item.label}</ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </RaSelect>
  );
};

export default Select;
