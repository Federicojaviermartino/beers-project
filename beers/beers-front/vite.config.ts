import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  //Añadimos soporte al navegador
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles:  ['./src/test/setup.ts'],
    css:false,
  }
})