"use client";

import { Button as AntButton } from "antd";
import { Button as RsButton } from "@adobe/react-spectrum";
import AtomSample from "@/app/_components/atoms/AtomSample";
import Button from "@/app/_components/atoms/Button";
import MoleculeSample from "@/app/_components/molecules/MoleculeSample";
import styles from "@/app/page.module.scss";
import { StyleProvider } from "@ant-design/cssinjs";

export default function Home() {
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
        >
          Button
        </Button>
        <AntButton className={styles.antButton}>AntButton</AntButton>
        <RsButton
          variant="accent"
          // NOTE: react-spectrumではカスタムクラスは設定できない
          // className={styles.rsButton}
        >
          RsButton
        </RsButton>
      </div>
    </StyleProvider>
  );
}
