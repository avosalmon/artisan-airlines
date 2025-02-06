/* prettier-ignore */
import {
createInertiaApp
} from '@inertiajs/react';
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob(["./pages/**/*.tsx", "../../app-modules/*/resources/js/pages/**/*.tsx"], {
        eager: true,
      });

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
    // prettier-ignore
    setup: ({ App, props }) => <App {...props} />,
  }),
);
