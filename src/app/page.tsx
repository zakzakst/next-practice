"use client";

// #region import
// import ComboBox from "@/app/_components/atoms/ComboBox";
// import Select from "@/app/_components/atoms/Select";
// import Menu from "@/app/_components/atoms/Menu";
// import ListBox from "@/app/_components/atoms/ListBox";
import GridList from "@/app/_components/atoms/GridList";
// #endregion

export default function Home() {
  return (
    <>
      {/* ComboBox */}
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
      </>
      {/* Select */}
      <>
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
      </>
      {/* Menu */}
      <>
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
      </>
      {/* ListBox */}
      <>
        {/* <ListBox
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
              // isDisabled: true,
            },
          ]}
          autoFocus
          onAction={(id) => {
            console.log(id);
          }}
          renderEmptyState={() => "No results"}
          selectionMode="multiple"
          // orientation="horizontal"
        /> */}
      </>
      {/* GridList */}
      <>
        <GridList
          label="GridList"
          className="custom-class"
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
              id: "hedo",
              label: "hedo label",
            },
          ]}
          // items={[]}
          renderEmptyState={() => "No results"}
          selectionMode="multiple"
          onAction={(id) => {
            console.log(id);
          }}
          layout="grid"
        />
      </>
    </>
  );
}
