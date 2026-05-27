// Browser stub for node:module. kei-lisp's Repl class lazily uses createRequire
// to load node:readline; we never instantiate Repl from the web app, so a stub
// that throws if actually called is enough to satisfy the bundler.
export const createRequire = (_url: string | URL): ((id: string) => unknown) => {
  return (id: string) => {
    throw new Error(`require('${id}') is not supported in the browser build`);
  };
};
