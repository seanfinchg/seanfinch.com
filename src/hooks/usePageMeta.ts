import { useEffect } from "react";

const SUFFIX = "Sean Finch";

function setMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Set the document title and (optionally) the description for a route, keeping
 * the Open Graph / Twitter tags in sync so shared sub-page links read well.
 * `title` is the page name; the "· Sean Finch" suffix is appended automatically.
 */
export function usePageMeta(title: string, description?: string): void {
  useEffect(() => {
    const fullTitle = title === SUFFIX ? title : `${title} · ${SUFFIX}`;
    document.title = fullTitle;
    setMeta("property", "og:title", fullTitle);
    setMeta("name", "twitter:title", fullTitle);
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
  }, [title, description]);
}
