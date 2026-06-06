import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export default defineConfig({
  site: 'https://bigbutters.top',
  integrations: [
    svelte(),
    mdx(),
  ],
  output: 'static',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: 'ignore' }]],
  },
  build: {
    format: 'directory',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
