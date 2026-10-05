// @ts-check
import { defineConfig } from 'astro/config';

// User site (akamaurya.github.io), so no `base`. A custom domain later needs public/CNAME and a new `site`.
export default defineConfig({
	site: 'https://akamaurya.github.io',
});
