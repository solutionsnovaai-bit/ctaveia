import { createRoot } from 'react-dom/client'

import '@fontsource-variable/saira/wdth.css'
import '@fontsource-variable/saira/wdth-italic.css'
import '@fontsource-variable/geist/wght.css'

import './styles/index.css'
import './styles/tipografia.css'
import './styles/componentes.css'
import './styles/marca.css'
import './styles/loader.css'
import './styles/layout.css'
import './styles/hero.css'
import './styles/secoes.css'

import App from './App'
import { PalcoProvider } from './hooks/usePalco'

// A posição da rolagem recomeça do topo: a tela de load abre sempre no hero.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')).render(
  <PalcoProvider>
    <App />
  </PalcoProvider>,
)
