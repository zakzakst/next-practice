"use client";
// NOTE: https://react-spectrum.adobe.com/react-aria/ComboBox.html

import {
  Button,
  ComboBox as RaComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import classNames from "classnames";
import styles from "./index.module.scss";

type Item = {
  id: string;
  label: string;
};

type Props = {
  label: string;
  items: Item[];
  className?: string;
};

const ComboBox = ({ label, items, className }: Props) => {
  return (
    <RaComboBox className={classNames(className, styles.main)}>
      <Label>{label}</Label>
      <div>
        <Input />
        <Button>▼</Button>
      </div>
      <Popover>
        <ListBox>
          {items.map((item) => (
            <ListBoxItem key={item.id} id={item.id}>
              {item.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </RaComboBox>
  );
};

export default ComboBox;
