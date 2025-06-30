import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from "@/components/ui/provider"
import {ChakraProvider, defaultSystem,} from "@chakra-ui/react";

import App from './App.tsx'

import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ChakraProvider value={defaultSystem}>
        <App/>
      </ChakraProvider>
    </Provider>
  </StrictMode>,
)
