import { render } from "@testing-library/react";
import Button from "./";

describe("Button", () => {
  /**
   * Propsの確認
   */
  it("ボタンのテキストが表示される", () => {
    const { getByRole } = render(<Button>ボタン</Button>);
    const buttonEl = getByRole("button");
    expect(buttonEl).toBeInTheDocument();
  });

  it("アイコンが挿入される", () => {
    const { getByRole, getByText } = render(
      <Button icon={<span>アイコン</span>}>ボタン</Button>
    );
    const buttonEl = getByRole("button");
    const iconEl = getByText("アイコン");
    expect(buttonEl).toHaveAttribute("data-has-icon", "true");
    expect(iconEl).toBeInTheDocument();
  });

  it("待機状態が設定される", () => {
    const { getByRole } = render(<Button isPending>ボタン</Button>);
    const buttonEl = getByRole("button");
    expect(buttonEl).toHaveAttribute("data-pending", "true");
    expect(buttonEl).toHaveAttribute("aria-disabled", "true");
  });

  it("無効状態が設定される", () => {
    const { getByRole } = render(<Button isDisabled>ボタン</Button>);
    const buttonEl = getByRole("button");
    expect(buttonEl).toBeDisabled();
  });
});
