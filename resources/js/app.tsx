import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { route as routeFn } from "ziggy-js";

declare global {
  const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || "Artisan Airlines";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob(["./pages/**/*.tsx", "../../app-modules/*/resources/js/pages/**/*.tsx"]);

    const pattern = /([^:]+)::(.+)/;
    const matches = pattern.exec(name);

    // If the `name` is a `module::page`, return the page from the module
    if (matches && matches.length > 2) {
      const module = matches[1].toLowerCase();
      const page = matches[2];

      return pages[`../../app-modules/${module}/resources/js/pages/${page}.tsx`]();
    } else {
      return pages[`./pages/${name}.tsx`]();
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
