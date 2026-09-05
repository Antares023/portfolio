import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import './i18n'

export function render(url) {
  const helmetContext = {}
  
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App helmetContext={helmetContext} />
      </StaticRouter>
    </StrictMode>
  )
  
  const { helmet } = helmetContext
  const headTags = `
    ${helmet?.title?.toString() || ''}
    ${helmet?.priority?.toString() || ''}
    ${helmet?.meta?.toString() || ''}
    ${helmet?.link?.toString() || ''}
    ${helmet?.script?.toString() || ''}
  `
  
  return { html, headTags }
}
