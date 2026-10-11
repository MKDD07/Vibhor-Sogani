import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.BASE_PATH || '/';
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('BASE_PATH must start and end with /.');

export default defineConfig({
  base,
  plugins: [{
    name: 'public-asset-base',
    enforce: 'pre',
    transform(code, id) {
      if (base === '/' || !id.replaceAll('\\', '/').includes('/src/') || !/\.(jsx?|json)$/.test(id)) return;
      return code.replace(/(["'])\/(images\/|assets\/|logo(?:-white)?\.svg|favicon\.svg|icons\.svg)/g, `$1${base}$2`);
    },
  }, react(), tailwindcss()],
})
