import AtomSample from "@/app/_components/atoms/AtomSample";
import MoleculeSample from "@/app/_components/molecules/MoleculeSample";
import styles from "@/app/page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <p>ページ</p>
      <AtomSample>AtomSample</AtomSample>
      <MoleculeSample />
    </div>
  );
}
