"use client";

import { useState, useEffect } from "react";
import { Button as AntButton } from "antd";
import { Button as RsButton } from "@adobe/react-spectrum";
import AtomSample from "@/app/_components/atoms/AtomSample";
import Button from "@/app/_components/atoms/Button";
import ToggleButton from "@/app/_components/atoms/ToggleButton";
import ToggleButtonGroup from "@/app/_components/atoms/ToggleButtonGroup";
import type { Item as ToggleButtonGroupItem } from "@/app/_components/atoms/ToggleButtonGroup";
import MoleculeSample from "@/app/_components/molecules/MoleculeSample";
import styles from "@/app/page.module.scss";
import { StyleProvider } from "@ant-design/cssinjs";

export default function Home() {
  const [isSelected, setSelected] = useState(false);
  const [toggleButtonItems, setToggleButtonItems] = useState<
    ToggleButtonGroupItem[]
  >([]);

  useEffect(() => {
    setToggleButtonItems([
      {
        id: "all",
        label: "All",
      },
      {
        id: "item1",
        label: "Item 1",
      },
      {
        id: "item2",
        label: "Item 2",
        isDisabled: true,
      },
    ]);
  }, []);
  return (
    <StyleProvider layer>
      {/* TODO: 余裕がある時調べるstylesの型付けが有効にならない */}
      <div className={styles.page}>
        <p>ページ</p>
        <AtomSample>AtomSample</AtomSample>
        <MoleculeSample />
        <Button
          className={styles.button}
          icon={<span>icon</span>}
          onPress={() => alert("Button pressed")}
          // isPending
          // isDisabled
        >
          Button
        </Button>
        <ToggleButton
          className={styles.button}
          icon={<span>icon</span>}
          isSelected={isSelected}
          // isDisabled
          onPress={() => setSelected(!isSelected)}
        >
          ToggleButton
        </ToggleButton>
        <AntButton className={styles.antButton}>AntButton</AntButton>
        <RsButton
          variant="accent"
          // NOTE: react-spectrumではカスタムクラスは設定できない
          // className={styles.rsButton}
        >
          RsButton
        </RsButton>
        <ToggleButtonGroup
          aria-label="toggle button group"
          className="custom-class"
          items={toggleButtonItems}
          // NOTE: 未選択無効だと全部選択しない状態のクリック時に前選択になる
          // disallowEmptySelection
          // NOTE: selectionModeによって各ボタン要素がチェックボックスかラジオボタンか変わる（スタイルの設定時に注意）
          selectionMode="multiple"
          onSelectionChange={(keys) => console.log(keys)}
        />
      </div>
    </StyleProvider>
  );
}
