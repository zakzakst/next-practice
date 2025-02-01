"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import styles from "@/app/page.module.scss";
import FileTrigger from "@/app/_components/atoms/FileTrigger";
import InputTest from "@/app/_components/atoms/InputTest";

// NOTE: 任意の入力要素の位置にスクロールさせることなどを想定して、refを取得する処理のやりかたを考えていたが、スマートな方法は思いつかなかった。一応下記ならできそうかなと感じた。
// - パターン1: setFocusでフォーカスを当ててからdocument.activeElementで要素取得
// - パターン2: registerで設定するrefとは別でuseRefで設定する

type FormData = {
  name: string;
};

const DefaultFormData: FormData = {
  name: "",
};

export default function Home() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: DefaultFormData,
  });
  const [data, setData] = useState<FormData>(DefaultFormData);
  console.log("errors: ", errors);
  const { onChange, onBlur, name, ref } = register("name", {
    required: "名前を入力してください",
    maxLength: {
      value: 5,
      message: "5文字以下で入力してください",
    },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "アルファベットで入力してください",
    },
    onChange() {
      console.log(errors.name?.ref);
    },
  });

  useEffect(() => {
    setFocus("name");
    // console.log(document.activeElement);
  }, [setFocus]);

  return (
    <>
      <FileTrigger
        // isDisabled
        // acceptDirectory
        allowsMultiple
        acceptedFileTypes={["image/png", "image/jpeg"]}
        onSelect={(files) => console.log(files)}
      >
        FileTrigger
      </FileTrigger>
      {/* <div className={styles.main}>
        <h1 className="text-3xl font-bold underline px-1">Hello, Next.js!</h1>
      </div> */}
      <form
        onSubmit={handleSubmit((data) => {
          setData(data);
          console.error(errors.name?.ref);
        })}
      >
        {/* <input
          type="text"
          id="name"
          placeholder="名前"
          {...register("name", {
            required: "名前を入力してください",
            maxLength: {
              value: 5,
              message: "5文字以下で入力してください",
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "アルファベットで入力してください",
            },
          })}
          // maxLength={5}
        /> */}
        {/*
          NOTE: 独自コンポーネント内のフォーム操作
          - 参考：https://react-hook-form.com/docs/useform/register
          - refのプロパティ名で値を渡せなかったため、スプレッド演算子使えない
          - フォーカルするときはsetFocusを利用する
        */}
        <InputTest
          id="name"
          label="名前"
          placeholder="例）Taro"
          errMsg={errors.name?.message}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          inputRef={ref}
        />
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
        {/* {errors.name?.message && <p>{errors.name?.message}</p>} */}
      </form>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
