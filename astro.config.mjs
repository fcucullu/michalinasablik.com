// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://michalinasablik.com',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  redirects: {
    // The page used to live at /writtings (typo). Keep old links working.
    '/writtings': '/writings/',
    // This page held a third-person SUMMARY of Michalina's essay, presented in
    // the metadata as the essay itself. The real text is the PDF from the book.
    '/exhibitions/text-raczynska': '/writings/hay-anna-raczynska-michalina-sablik.pdf',
  },
});
