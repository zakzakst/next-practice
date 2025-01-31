import { render, RenderResult } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import ToggleButtonGroup, { Props as ToggleButtonGroupProps } from "./";

// 参考：https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/ToggleButtonGroup.test.js

const renderComponent = (props: ToggleButtonGroupProps): RenderResult => {
  return render(<ToggleButtonGroup {...props} />);
};

const ToggleButtonItems = [
  {
    id: "button1",
    label: "button1",
  },
  {
    id: "button2",
    label: "button2",
    isDisabled: true,
  },
];

describe("ToggleButtonGroup", () => {
  /**
   * Propsの確認
   */
  it("ボタンの内容が反映される", () => {
    const { getAllByRole } = renderComponent({
      items: ToggleButtonItems,
    });
    const toggleButtonEls = getAllByRole("radio");
    expect(toggleButtonEls[0].textContent).toBe("button1");
    expect(toggleButtonEls[1].textContent).toBe("button2");
    expect(toggleButtonEls[1]).toBeDisabled();
  });

  it("カスタムクラスが設定される", () => {
    const { getByRole } = renderComponent({
      items: ToggleButtonItems,
      className: "custom-class",
    });
    const toggleButtonGroupEl = getByRole("radiogroup");
    expect(toggleButtonGroupEl).toHaveClass("custom-class");
  });

  it("無効状態が設定される", () => {
    const { getByRole, getAllByRole } = renderComponent({
      items: ToggleButtonItems,
      isDisabled: true,
    });
    const toggleButtonGroupEl = getByRole("radiogroup");
    expect(toggleButtonGroupEl).toHaveAttribute("aria-disabled", "true");
    for (const radio of getAllByRole("radio")) {
      expect(radio).toBeDisabled();
    }
  });

  it("複数選択が設定される", () => {
    const { getByRole } = renderComponent({
      items: ToggleButtonItems,
      selectionMode: "multiple",
    });
    const toggleButtonGroupEl = getByRole("toolbar");
    expect(toggleButtonGroupEl).toBeInTheDocument();
  });

  it("横方向の並び（デフォルト）が設定される", () => {
    const { getByRole } = renderComponent({
      items: ToggleButtonItems,
    });
    const toggleButtonGroupEl = getByRole("radiogroup");
    expect(toggleButtonGroupEl).toHaveAttribute(
      "aria-orientation",
      "horizontal"
    );
  });

  it("縦方向の並びが設定される", () => {
    const { getByRole } = renderComponent({
      items: ToggleButtonItems,
      orientation: "vertical",
    });
    const toggleButtonGroupEl = getByRole("radiogroup");
    expect(toggleButtonGroupEl).toHaveAttribute("aria-orientation", "vertical");
  });

  it("ARIAラベルが設定される", () => {
    const { getByRole } = renderComponent({
      items: ToggleButtonItems,
      "aria-label": "label",
    });
    const toggleButtonGroupEl = getByRole("radiogroup");
    expect(toggleButtonGroupEl).toHaveAttribute("aria-label", "label");
  });
});
