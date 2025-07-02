import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        paper: {
          DEFAULT: { value: "#d7cdbd" },
          100: { value: "#C5BC98" }
        },
        darkpaper: {
          DEFAULT: { value: "#1C1C1C" },
          100: { value: "#37443A" },
        },
        green: {
          DEFAULT: { value: '#3F4D3F' },
          100: { value: '#DCDBD8' },
          200: { value: '#C4C4BF' },
          300: { value: '#ABACA5' },
          400: { value: '#91958B' },
          500: { value: '#767D72' },
          600: { value: '#5B6558' },
          700: { value: '#3F4D3F' },
          800: { value: '#37443A' },
          900: { value: '#2F3A34' },
          1000: { value: '#1F2726' },
        }
      },
    },
    semanticTokens: {
      colors: {
        colorPalette: {
          contrast: { value: { _light: '{colors.gray.200}', _dark: '{colors.gray.200}' } },
          solid: { value: { _light: '{colors.green}', _dark: '{colors.green}' } },
          muted: { value: { _light: '{colors.paper.100}', _dark: '{colors.gray.800}' } },
          subtle: { value: { _light: '{colors.paper.100}', _dark: '{colors.gray.800}' } },
        },
        bg: {
          DEFAULT: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          subtle: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          muted: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          emphasized: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          inverted: { value: { _light: '{colors.darkpaper}', _dark: '{colors.paper}' } },
          panel: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          error: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          warning: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          success: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          info: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
        },
        fg: {
          DEFAULT: { value: { _light: '{colors.gray.800}', _dark: '{colors.gray.300}' } },
          // subtle: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // muted: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // emphasized: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // inverted: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // panel: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // error: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // warning: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // success: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // info: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
        },
        border: {
          DEFAULT: { value: { _light: '{colors.paper.100}', _dark: '{colors.gray.700}' } },
          // subtle: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // muted: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // emphasized: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          inverted: { value: { _light: '{colors.green.400}', _dark: '{colors.green.1000}' } },
          panel: { value: { _light: '{colors.gray.300}', _dark: '{colors.gray.800}' } },
          // error: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // warning: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // success: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
          // info: { value: { _light: '{colors.paper}', _dark: '{colors.darkpaper}' } },
        },
      },
    },
  },
})

export default createSystem(defaultConfig, config)