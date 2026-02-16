import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  banner: {
    js: "'use client';",
  },
  splitting: false,
  dts: true,



  sourcemap: true,

  clean: false,
  treeshake: true,
  minify: false,
  external: ['react', 'react-dom'],
  onSuccess: 'sed -i "" "1s/^/\'use client\';\\n/" dist/index.mjs && sed -i "" "1s/^/\'use client\';\\n/" dist/index.js',
});
