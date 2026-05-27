// Browser stub for node:v8. kei-lisp only calls v8.setFlagsFromString from the
// (gc) builtin's lazy initializer; a no-op keeps the bundle resolvable and
// makes (gc) a quiet no-op in the browser.
export default {
  setFlagsFromString: (_flags: string): void => {},
};
