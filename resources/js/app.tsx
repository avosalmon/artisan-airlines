import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { route as routeFn } from "ziggy-js";

declare global {
  const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || "Artisan Airlines";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    // If `name` is a `module::page`, return the page from the module
    if (name.includes("::")) {
      const [module, page] = name.split("::");

      return resolvePageComponent(
        `../../app-modules/${module}/resources/js/pages/${page}.tsx`,
        import.meta.glob("../../app-modules/*/resources/js/pages/**/*.tsx"),
      );
    } else {
      return resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx"));
    }
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: "#4B5563",
  },
});
