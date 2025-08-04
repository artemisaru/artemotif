import { defineConfig } from 'vite'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

export default defineConfig({
  plugins: [
    createSvgSpritePlugin({
      include: ['**/assets/icons/*.svg']
    })
  ]
})