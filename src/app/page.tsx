"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
// import styles from "@/app/page.module.scss";
import FileTrigger from "@/app/_components/atoms/FileTrigger";

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
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: DefaultFormData,
  });
  const [data, setData] = useState<FormData>(DefaultFormData);
  console.log("errors: ", errors);

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
      <form onSubmit={handleSubmit((data) => setData(data))}>
        <input
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
        />
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
        {errors.name?.message && <p>{errors.name?.message}</p>}
      </form>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
