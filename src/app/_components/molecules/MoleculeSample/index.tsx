import AtomSample from "@/app/_components/atoms/AtomSample";
import classNames from "classnames";
import styles from "./index.module.scss";

type Props = {
  className?: string;
};

const MoleculeSample = ({ className }: Props) => {
  return (
    <AtomSample className={classNames(className, styles.main)}>
      MoleculeSample
    </AtomSample>
  );
};

export default MoleculeSample;
