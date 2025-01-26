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
});
