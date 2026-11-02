import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { AnimatePresence } from "framer-motion";
import App from "../client/src/App";
export {
  landingMetadata,
  pageSchema,
  absoluteImage,
} from "../client/src/lib/seoMetadata";

/** Build-only SSG. Existing createRoot enhances these identical pages on the client. */
export function renderRoute(route: string) {
  return renderToStaticMarkup(
    <Router ssrPath={route}>
      <AnimatePresence initial={false}>
        <App />
      </AnimatePresence>
    </Router>
  );
}
