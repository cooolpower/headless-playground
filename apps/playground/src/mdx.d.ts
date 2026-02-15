declare module '*.mdx' {
  import type { ComponentType } from 'react';

  const MDXComponent: ComponentType<{
    components?: Record<string, unknown>;
  }>;

  export default MDXComponent;
}

// Vanilla Extract CSS module declarations
// This allows importing .css.ts files as .css
// Vanilla Extract's style() function returns string class names
declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export = classes;
}
