import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Tentukan rute yang ingin di-prerender
const routesToPrerender = [
  '/',
  '/project/hidroponnik-pwa',
  '/project/NutriscanAI',
  '/project/fuzzy_tingkat_stress_mahasiswa',
  '/project/Kelulusan_Mahasiswa_ANN',
  '/project/aplikasi-penjualan-sederhana',
  '/project/termoapp',
  '/project/aquasync'
]

let sitemapUrls = ''

for (const url of routesToPrerender) {
  const { html, headTags } = render(url)

  let appHtml = template.replace('<!--app-html-->', html)
  if (headTags) {
    appHtml = appHtml.replace('<!--head-tags-->', headTags)
  }

  const filePath = `dist${url === '/' ? '/index' : url}.html`
  const dir = path.dirname(filePath)
  if (!fs.existsSync(toAbsolute(dir))) {
    fs.mkdirSync(toAbsolute(dir), { recursive: true })
  }
  
  fs.writeFileSync(toAbsolute(filePath), appHtml)
  console.log('pre-rendered:', filePath)

  // Append sitemap
  sitemapUrls += `  <url>
    <loc>https://emham.my.id${url}</loc>
    <changefreq>${url === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>\n`
}

// Generate sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}</urlset>`

fs.writeFileSync(toAbsolute('dist/sitemap.xml'), sitemapContent)
console.log('generated: dist/sitemap.xml')

// Generate robots.txt
const robotsContent = `User-agent: *
Allow: /

Sitemap: https://emham.my.id/sitemap.xml`
fs.writeFileSync(toAbsolute('dist/robots.txt'), robotsContent)
console.log('generated: dist/robots.txt')

// Cleanup server folder so it's not deployed
fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true })
console.log('cleaned up: dist/server')
