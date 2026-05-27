// Browser stub for node:vm. kei-lisp only uses vm.runInNewContext('gc') inside
// the (gc) builtin's lazy initializer; the throwing stub satisfies bundling
// and (gc) becomes an error if actually invoked at runtime.
export default {
  runInNewContext: (_code: string): unknown => {
    throw new Error('vm.runInNewContext is not supported in the browser build');
  },
};
