"use client";

import classNames from "classnames";
import styles from "./index.module.scss";

// NOTE: react hook formをコンポーネント分割する場合の書き方が分からなかったので、試しで作成した（registerもエラーメッセージも普通に親コンポーネント側からそのまま渡していいっぽい）
// 参考：https://qiita.com/yuk1_sys/items/7ec0e0dd2c61fdab9c7c#inputtext

// TODO: refを渡すの上手くできない。方法調べる。
// 参考：https://qiita.com/P-man_Brown/items/63fc7d281baae22c74e5 （一回試したが上手くいかなかった）

type BaseProps = {
  id: string;
  label: string;
  // ref?: React.Ref<HTMLInputElement>;
  errMsg?: string;
  className?: string;
};

type Props = BaseProps &
  Omit<React.ComponentPropsWithoutRef<"input">, keyof BaseProps>;

const InputTest = ({
  id,
  label,
  // ref,
  errMsg,
  className,
  ...inputProps
}: Props) => {
  return (
    <div className={classNames(className, styles.main)}>
      <label htmlFor={id}>{label}</label>
      <div>
        <div>
          {/* <input type="text" ref={ref} id={id} {...inputProps} /> */}
          <input type="text" id={id} {...inputProps} />
        </div>
        {errMsg && <p>{errMsg}</p>}
      </div>
    </div>
  );
};

export default InputTest;
