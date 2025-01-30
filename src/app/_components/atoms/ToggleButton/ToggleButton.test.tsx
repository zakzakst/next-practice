import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleButton from "./";

describe("ToggleButton", () => {
  /**
   * Propsの確認
   */
  it("ボタンのテキストが表示される", () => {
    const { getByRole } = render(<ToggleButton>ボタン</ToggleButton>);
    const toggleButtonEl = getByRole("button");
    expect(toggleButtonEl.textContent).toBe("ボタン");
  });

  it("アイコンが挿入される", () => {
    const { getByRole, getByText } = render(
      <ToggleButton icon={<span>アイコン</span>}>ボタン</ToggleButton>
    );
    const toggleButtonEl = getByRole("button");
    const iconEl = getByText("アイコン");
    expect(toggleButtonEl).toHaveAttribute("data-has-icon", "true");
    expect(iconEl).toBeInTheDocument();
  });

  it("カスタムクラスが設定される", () => {
    const { getByRole } = render(
      <ToggleButton className="custom-class">ボタン</ToggleButton>
    );
    const toggleButtonEl = getByRole("button");
    expect(toggleButtonEl).toHaveClass("custom-class");
  });

  it("選択状態が設定される", () => {
    const { getByRole } = render(
      <ToggleButton isSelected>ボタン</ToggleButton>
    );
    const toggleButtonEl = getByRole("button");
    expect(toggleButtonEl).toHaveAttribute("aria-pressed", "true");
  });

  it("無効状態が設定される", () => {
    const { getByRole } = render(
      <ToggleButton isDisabled>ボタン</ToggleButton>
    );
    const toggleButtonEl = getByRole("button");
    expect(toggleButtonEl).toBeDisabled();
  });

  /**
   * 挙動の確認
   */
  it("タブ移動でフォーカスされる", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<ToggleButton>ボタン</ToggleButton>);
    const toggleButtonEl = getByRole("button");

    expect(toggleButtonEl).not.toHaveFocus();

    await user.tab();
    expect(toggleButtonEl).toHaveFocus();

    await user.tab();
    expect(toggleButtonEl).not.toHaveFocus();
  });
});
