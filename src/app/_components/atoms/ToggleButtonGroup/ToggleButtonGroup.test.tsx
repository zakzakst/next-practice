import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  {
    id: "button3",
    label: "button3",
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

  it("デフォルトの選択状態が反映される", () => {
    const { getAllByRole } = renderComponent({
      items: ToggleButtonItems,
      defaultSelectedKeys: ["button1"],
    });
    const toggleButtonEls = getAllByRole("radio");
    expect(toggleButtonEls[0]).toHaveAttribute("aria-checked", "true");
  });

  /**
   * 挙動の確認
   */
  it("ボタンの選択状態変更が正しく挙動する", async () => {
    // NOTE: 単一選択の場合以下の属性が設定される
    // - 要素のRole：radio
    // - 選択されているかどうか：aria-checked
    const user = userEvent.setup();
    const onSelectionChange = jest.fn();

    const { getAllByRole } = renderComponent({
      items: ToggleButtonItems,
      onSelectionChange,
    });
    const toggleButtonEls = getAllByRole("radio");

    // 初期状態の確認
    toggleButtonEls.forEach((el) => {
      expect(el).toHaveAttribute("aria-checked", "false");
    });

    // 選択有効ボタンの確認
    await user.click(toggleButtonEls[0]);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(toggleButtonEls[0]).toHaveAttribute("aria-checked", "true");

    // 選択無効ボタンの確認
    await user.click(toggleButtonEls[1]);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(toggleButtonEls[1]).toHaveAttribute("aria-checked", "false");

    // 単一選択の確認
    await user.click(toggleButtonEls[2]);
    expect(onSelectionChange).toHaveBeenCalledTimes(2);
    expect(toggleButtonEls[0]).toHaveAttribute("aria-checked", "false");
    expect(toggleButtonEls[2]).toHaveAttribute("aria-checked", "true");

    // チェック解除の確認
    await user.click(toggleButtonEls[2]);
    expect(onSelectionChange).toHaveBeenCalledTimes(3);
    expect(toggleButtonEls[2]).toHaveAttribute("aria-checked", "false");
  });

  it("ボタンの選択状態変更が正しく挙動する（複数選択）", async () => {
    // NOTE: 複数選択の場合以下の属性が設定される
    // - 選択されているかどうか：aria-pressed
    const user = userEvent.setup();
    const onSelectionChange = jest.fn();

    const { getAllByRole } = renderComponent({
      items: ToggleButtonItems,
      selectionMode: "multiple",
      onSelectionChange,
    });
    const toggleButtonEls = getAllByRole("button");

    // 初期状態の確認
    toggleButtonEls.forEach((el) => {
      expect(el).toHaveAttribute("aria-pressed", "false");
    });

    // 選択有効ボタンの確認
    await user.click(toggleButtonEls[0]);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(toggleButtonEls[0]).toHaveAttribute("aria-pressed", "true");

    // 選択無効ボタンの確認
    await user.click(toggleButtonEls[1]);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(toggleButtonEls[1]).toHaveAttribute("aria-pressed", "false");

    // 複数選択の確認
    await user.click(toggleButtonEls[2]);
    expect(onSelectionChange).toHaveBeenCalledTimes(2);
    expect(toggleButtonEls[0]).toHaveAttribute("aria-pressed", "true");
    expect(toggleButtonEls[2]).toHaveAttribute("aria-pressed", "true");
  });

  it("横方向の並びの時のキーボード操作が正しく挙動する", async () => {
    const user = userEvent.setup();
    const { getAllByRole } = renderComponent({
      items: ToggleButtonItems,
    });
    const toggleButtonEls = getAllByRole("radio");

    await user.tab();
    expect(document.activeElement).toBe(toggleButtonEls[0]);

    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(toggleButtonEls[2]);

    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(toggleButtonEls[0]);
  });

  it("縦方向の並びの時のキーボード操作が正しく挙動する", async () => {
    const user = userEvent.setup();
    const { getAllByRole } = renderComponent({
      items: ToggleButtonItems,
      orientation: "vertical",
    });
    const toggleButtonEls = getAllByRole("radio");

    await user.tab();
    expect(document.activeElement).toBe(toggleButtonEls[0]);

    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(toggleButtonEls[2]);

    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toBe(toggleButtonEls[0]);
  });
});
