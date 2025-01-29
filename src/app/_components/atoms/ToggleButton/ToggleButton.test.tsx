import { render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
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
});
