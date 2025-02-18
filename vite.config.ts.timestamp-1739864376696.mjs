// vite.config.ts
import { defineConfig } from "file:///C:/Users/abdop/Desktop/Programming/projects/stocks-toolbar-extension/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/abdop/Desktop/Programming/projects/stocks-toolbar-extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Users/abdop/Desktop/Programming/projects/stocks-toolbar-extension/node_modules/vite-plugin-svgr/dist/index.mjs";
import { crx } from "file:///C:/Users/abdop/Desktop/Programming/projects/stocks-toolbar-extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "InvestFellow: Real Time Stock/Crypto Prices\u2122",
  version: "1.6.3",
  permissions: ["storage", "identity", "identity.email"],
  background: {
    service_worker: "background.js"
  },
  commands: {
    "reload-e": {
      suggested_key: {
        default: "Ctrl+Q",
        mac: "Command+Q"
      },
      description: "Reloads extension package in the browser, helpful in development"
    }
  },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhYmRvcFxcXFxEZXNrdG9wXFxcXFByb2dyYW1taW5nXFxcXHByb2plY3RzXFxcXHN0b2Nrcy10b29sYmFyLWV4dGVuc2lvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYWJkb3BcXFxcRGVza3RvcFxcXFxQcm9ncmFtbWluZ1xcXFxwcm9qZWN0c1xcXFxzdG9ja3MtdG9vbGJhci1leHRlbnNpb25cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FiZG9wL0Rlc2t0b3AvUHJvZ3JhbW1pbmcvcHJvamVjdHMvc3RvY2tzLXRvb2xiYXItZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5qc29uJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgc3Zncih7XG4gICAgICBzdmdyT3B0aW9uczoge1xuICAgICAgICBpY29uOiB0cnVlLFxuICAgICAgICAvLyAuLi5zdmdyIG9wdGlvbnMgKGh0dHBzOi8vcmVhY3Qtc3Znci5jb20vZG9jcy9vcHRpb25zLylcbiAgICAgIH0sXG4gICAgfSksXG4gICAgLy8gQnVpbGQgQ2hyb21lIEV4dGVuc2lvblxuICAgIGNyeCh7IG1hbmlmZXN0IH0pLFxuICBdXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0WSxTQUFTLG9CQUFvQjtBQUN6YSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlwQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxhQUFhO0FBQUEsUUFDWCxNQUFNO0FBQUEsTUFFUjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBRUQsSUFBSSxFQUFFLDJCQUFTLENBQUM7QUFBQSxFQUNsQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
