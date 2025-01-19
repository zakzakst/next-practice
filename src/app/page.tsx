"use client";

import AtomSample from "@/app/_components/atoms/AtomSample";
import Button from "@/app/_components/atoms/Button";
import MoleculeSample from "@/app/_components/molecules/MoleculeSample";
import styles from "@/app/page.module.scss";

export default function Home() {
  return (
    // TODO: 余裕がある時調べるstylesの型付けが有効にならない
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
    </div>
  );
}
