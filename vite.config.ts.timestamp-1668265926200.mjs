// vite.config.ts
import { defineConfig } from "file:///Users/abdelrahmanmohamadeen/Programming/projects/stocks%20extension/code/node_modules/vite/dist/node/index.js";
import react from "file:///Users/abdelrahmanmohamadeen/Programming/projects/stocks%20extension/code/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///Users/abdelrahmanmohamadeen/Programming/projects/stocks%20extension/code/node_modules/vite-plugin-svgr/dist/index.mjs";
import { crx } from "file:///Users/abdelrahmanmohamadeen/Programming/projects/stocks%20extension/code/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "A Invest Fellow",
  version: "1.0.0",
  permissions: ["storage", "identity", "identity.email", "identity.accounts"],
  action: {
    default_title: "Popup",
    default_popup: "index.html#popup",
    default_icon: "logo.png"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/content/main.tsx"],
      media: []
    }
  ],
  icons: {
    "16": "logo.png",
    "48": "logo.png",
    "128": "logo.png"
  }
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true
      }
    }),
    crx({ manifest: manifest_default })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWJkZWxyYWhtYW5tb2hhbWFkZWVuL1Byb2dyYW1taW5nL3Byb2plY3RzL3N0b2NrcyBleHRlbnNpb24vY29kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FiZGVscmFobWFubW9oYW1hZGVlbi9Qcm9ncmFtbWluZy9wcm9qZWN0cy9zdG9ja3MgZXh0ZW5zaW9uL2NvZGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FiZGVscmFobWFubW9oYW1hZGVlbi9Qcm9ncmFtbWluZy9wcm9qZWN0cy9zdG9ja3MlMjBleHRlbnNpb24vY29kZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJ1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuanNvbidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHN2Z3Ioe1xuICAgICAgc3Znck9wdGlvbnM6IHtcbiAgICAgICAgaWNvbjogdHJ1ZSxcbiAgICAgICAgLy8gLi4uc3ZnciBvcHRpb25zIChodHRwczovL3JlYWN0LXN2Z3IuY29tL2RvY3Mvb3B0aW9ucy8pXG4gICAgICB9LFxuICAgIH0pLFxuICAgIC8vIEJ1aWxkIENocm9tZSBFeHRlbnNpb25cbiAgICBjcngoeyBtYW5pZmVzdCB9KSxcbiAgXVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVksU0FBUyxvQkFBb0I7QUFDdGEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJcEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsYUFBYTtBQUFBLFFBQ1gsTUFBTTtBQUFBLE1BRVI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUVELElBQUksRUFBRSwyQkFBUyxDQUFDO0FBQUEsRUFDbEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
