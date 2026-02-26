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

  clean: true,
  treeshake: true,
  minify: false,
  external: ['react', 'react-dom'],
  onSuccess: 'tsx scripts/post-build.ts',
});
