"use client";

// import ComboBox from "@/app/_components/atoms/ComboBox";
// import Select from "@/app/_components/atoms/Select";
// import Menu from "@/app/_components/atoms/Menu";
import ListBox from "@/app/_components/atoms/ListBox";

export default function Home() {
  return (
    <>
      {/* <ComboBox
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
      /> */}
      {/* <Select
        className="custom-class"
        label="Select"
        // defaultSelectedKey="hoge"
        items={[
          {
            id: "hoge",
            label: "hoge label",
          },
          {
            id: "fuga",
            label: "fuga label",
          },
        ]}
        // isDisabled
        placeholder="test"
        name="test"
        isRequired
      /> */}
      {/* <Menu
        className="custom-class"
        label="Menu"
        items={[
          {
            id: "hoge",
            label: "hoge label",
          },
          {
            id: "fuga",
            label: "fuga label",
            isDisabled: true,
          },
          {
            id: "ara",
            label: "ara label",
          },
        ]}
        onClickMenu={(id) => console.log(id)}
        selectionMode="multiple"
      /> */}
      <ListBox
        label="ListBox"
        className="custom-class"
        items={[
          {
            id: "hoge",
            label: "hoge label",
          },
          {
            id: "fuga",
            label: "fuga label",
          },
        ]}
      />
    </>
  );
}
