// NOTE: https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/ComboBox.test.js

import { render } from "@testing-library/react";
import ComboBox from "./";

describe("ComboBox", () => {
  /**
   * Propsの確認
   */
  it("カスタムクラスが設定される", () => {
    const { container } = render(
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
    );
    const comboboxEl = container.querySelector("div");
    expect(comboboxEl).toHaveClass("custom-class");
  });
});
