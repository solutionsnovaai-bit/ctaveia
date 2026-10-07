import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Endereço público do site. Na Vercel ele vem sozinho do projeto;
 * com domínio próprio, defina SITE_URL nas variáveis de ambiente.
 */
const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '')

/** Preenche as URLs absolutas do index.html e gera robots.txt e sitemap.xml. */
function enderecoDoSite() {
  return {
    name: 'endereco-do-site',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', SITE_URL),
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (SITE_URL) {
        robots.push('', `Sitemap: ${SITE_URL}/sitemap.xml`)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source:
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            `  <url><loc>${SITE_URL}/</loc><changefreq>monthly</changefreq></url>\n` +
            '</urlset>\n',
        })
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), enderecoDoSite()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: { movimento: ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText', 'gsap/CustomEase', 'lenis'] },
      },
    },
  },
})
