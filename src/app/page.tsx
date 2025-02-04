"use client";

import ComboBox from "@/app/_components/atoms/ComboBox";

export default function Home() {
  return (
    <>
      <ComboBox
        className="custom-class"
        label="ComboBox"
        items={[
          {
            id: "hoge",
            label: "hoge",
          },
        ]}
      />
    </>
  );
}
