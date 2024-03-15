import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Adjust the chunk size warning limit
    chunkSizeWarningLimit: 1000, // Set the limit to 1000 kB (1 MB)
  },
})
