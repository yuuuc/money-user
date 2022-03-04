import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
	mode: 'development',
	server: {
		port: 8082
	},
	plugins: [
		vue(),
		styleImport({
			resolves: [VantResolve()]
		})
	]
});
