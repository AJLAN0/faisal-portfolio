import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted display font: Reem Kufi (geometric Najdi Kufi) — Arabic subset
import '@fontsource/reem-kufi/arabic-400.css'
import '@fontsource/reem-kufi/arabic-500.css'
import '@fontsource/reem-kufi/arabic-600.css'
import '@fontsource/reem-kufi/arabic-700.css'
import App from './App.tsx'
import './index.css'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element #root was not found in index.html')

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
