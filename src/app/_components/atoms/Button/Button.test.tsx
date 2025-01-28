import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    const { getByRole, container } = render(<Button isPending>ボタン</Button>);
    const buttonEl = getByRole("button");
    const loadingEl = container.querySelector("span");
    expect(buttonEl).toHaveAttribute("data-pending", "true");
    expect(buttonEl).toHaveAttribute("aria-disabled", "true");
    expect(loadingEl?.textContent).toBe("...");
  });

  it("無効状態が設定される", () => {
    const { getByRole } = render(<Button isDisabled>ボタン</Button>);
    const buttonEl = getByRole("button");
    expect(buttonEl).toBeDisabled();
  });

  it("カスタムクラスが設定される", () => {
    const { getByRole } = render(
      <Button className="custom-class">ボタン</Button>
    );
    const buttonEl = getByRole("button");
    expect(buttonEl).toHaveClass("custom-class");
  });

  /**
   * 挙動の確認
   */
  it("タブ移動でフォーカスされる", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Button>ボタン</Button>);
    const buttonEl = getByRole("button");

    expect(buttonEl).not.toHaveFocus();

    await user.tab();
    expect(buttonEl).toHaveFocus();

    await user.tab();
    expect(buttonEl).not.toHaveFocus();
  });

  // it('TODO: フォーム送信が正しく挙動する', () => {
  // // NOTE: 待機状態もテストする
  // })
});
