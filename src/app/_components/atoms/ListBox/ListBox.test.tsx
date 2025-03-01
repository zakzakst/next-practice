// 参考：https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/ListBox.test.js
import { render } from "@testing-library/react";
import ListBox from "./";

const ListBoxItems = [
  {
    id: "menu1",
    label: "menu1",
  },
  {
    id: "menu2",
    label: "menu2",
  },
  {
    id: "menu3",
    label: "menu3",
  },
];

describe("ListBox", () => {
  /**
   * Propsの確認
   */
  it("カスタムクラスが設定される", () => {
    const { getByRole } = render(
      <ListBox className="custom-class" items={ListBoxItems} label="ListBox" />
    );
    const ListBoxEl = getByRole("listbox");
    expect(ListBoxEl).toHaveClass("custom-class");
  });
});
