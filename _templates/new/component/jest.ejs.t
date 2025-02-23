---
Name: <%= h.capitalize(name) %>
to: "<%= jest ? `src/app/_components/${type}/${Name}/${Name}.test.tsx` : null %>"
---
// 参考：
import { render } from "@testing-library/react";
import <%= Name %> from "./";

describe("<%= Name %>", () => {
  /**
   * Propsの確認
   */
});