// NOTE: https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/ComboBox.test.js

import { render } from "@testing-library/react";
import ComboBox from "./";

const ComboBoxItems = [
  {
    id: "comboBox1",
    label: "comboBox1",
  },
  {
    id: "comboBox2",
    label: "comboBox2",
    // isDisabled: true,
  },
  {
    id: "comboBox3",
    label: "comboBox3",
  },
];

describe("ComboBox", () => {
  /**
   * Propsの確認
   */
  it("カスタムクラスが設定される", () => {
    const { container } = render(
      <ComboBox
        className="custom-class"
        label="ComboBox"
        items={ComboBoxItems}
      />
    );
    const comboboxEl = container.querySelector("div");
    expect(comboboxEl).toHaveClass("custom-class");
  });

  it("デフォルトの値が設定される", () => {
    const { container } = render(
      <ComboBox
        label="ComboBox"
        items={ComboBoxItems}
        defaultInputValue="default"
      />
    );
    const comboboxInputEl = container.querySelector("input");
    expect(comboboxInputEl).toHaveValue("default");
  });

  // it("aria-labelledbyの値が設定される", () => {
  //   const { container } = render(
  //     <ComboBox label="ComboBox" items={ComboBoxItems} />
  //   );
  //   const comboboxLabelEl = container.querySelector("label");
  //   const comboboxInputEl = container.querySelector("input");
  //   const comboboxLabelEl
  //   expect(comboboxInputEl).toHaveAttribute("aria-labelledby");
  // });
});
