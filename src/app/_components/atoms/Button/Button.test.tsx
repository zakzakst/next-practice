import { render } from "@testing-library/react";
import Button from "./";

describe("Button", () => {
  /**
   * Propsの確認
   */
  it("ボタンのテキストが表示される", () => {
    const { getByText } = render(<Button>ボタン</Button>);
    expect(getByText("ボタン")).toBeInTheDocument();
  });

  it("アイコンが挿入される", () => {
    const { getByText } = render(
      <Button icon={<span>アイコン</span>}>ボタン</Button>
    );
    expect(getByText("アイコン")).toBeInTheDocument();
    expect(getByText("ボタン")).toHaveAttribute("data-has-icon", "true");
  });

  it("待機状態が設定される", () => {
    const { getByText } = render(<Button isPending>ボタン</Button>);
    expect(getByText("ボタン")).toHaveAttribute("data-pending", "true");
    expect(getByText("ボタン")).toHaveAttribute("aria-disabled", "true");
  });

  it("無効状態が設定される", () => {
    const { getByText } = render(<Button isDisabled>ボタン</Button>);
    expect(getByText("ボタン")).toHaveAttribute("data-disabled", "true");
    expect(getByText("ボタン")).toHaveAttribute("disabled");
  });
});
