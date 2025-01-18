import AtomSample from "@/app/_components/atoms/AtomSample";
import MoleculeSample from "@/app/_components/molecules/MoleculeSample";
import styles from "@/app/sample/page.module.scss";

export default function Home() {
  return (
    // TODO: 余裕がある時調べるstylesの型付けが有効にならない
    <div className={styles.page}>
      <p>ページ</p>
      <AtomSample>AtomSample</AtomSample>
      <MoleculeSample />
    </div>
  );
}
