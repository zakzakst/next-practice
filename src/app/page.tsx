"use client";

import ComboBox from "@/app/_components/atoms/ComboBox";
import Select from "@/app/_components/atoms/Select";

export default function Home() {
  return (
    <>
      <ComboBox
        className="custom-class"
        label="ComboBox"
        items={[
          {
            id: "hoge",
            label: "hoge label",
          },
          {
            id: "foga",
            label: "fuga label",
          },
        ]}
        defaultInputValue="default"
      />
      <Select
        className="custom-class"
        label="Select"
        items={[
          {
            id: "hoge",
            label: "hoge label",
          },
          {
            id: "foga",
            label: "fuga label",
          },
        ]}
      />
    </>
  );
}
