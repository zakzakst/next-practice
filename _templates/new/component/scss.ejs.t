---
Name: <%= h.capitalize(name) %>
to: src/app/_components/<%= type %>/<%= Name %>/index.module.scss
---
@use "@/app/_styles/variables" as v;

@layer <%= type %> {
  .main {
    background-color: v.$primary-color;
  }
}