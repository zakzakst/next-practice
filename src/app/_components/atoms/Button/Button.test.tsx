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
});
