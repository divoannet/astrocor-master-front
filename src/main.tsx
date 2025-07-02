import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import { ChakraProvider } from "@chakra-ui/react";
import system from './theme';

import App from './App.tsx'

import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
)
