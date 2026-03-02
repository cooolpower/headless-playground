// This file is used by Next's MDX integration (providerImportSource) via the
// 'next-mdx-import-source-file' alias.
//
// IMPORTANT:
// - Do NOT import from '@mdx-js/react' here (it uses createContext which can
//   break under RSC).
// - Keep this module lightweight and server-compatible.

import { Pre } from '@/components/mdx/pre';
import { Table } from '@/components/mdx/table';

export function useMDXComponents(components: Record<string, unknown> = {}) {
  return {
    pre: Pre,
    table: Table,
    ...components,
  };
}
