"use client";
// NOTE: https://react-spectrum.adobe.com/react-aria/ComboBox.html

import {
  Button,
  ComboBox as RaComboBox,
  ComboBoxProps as RaComboBoxProps,
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

type OwnProps = {
  label: string;
  items: Item[];
  className?: string;
};

// TODO: RaComboBoxPropsの引数きちんと読み切れていない（エラーが出ていないだけ）。余裕ある時にちゃんと見る。
type Props = OwnProps & Omit<RaComboBoxProps<Item>, keyof OwnProps>;

const ComboBox = ({ label, items, className, ...props }: Props) => {
  return (
    <RaComboBox className={classNames(className, styles.main)} {...props}>
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
