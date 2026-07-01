import { useReplOutput } from '../composables/useReplOutput';

interface MinimalWritable {
  write(chunk: unknown): boolean;
}

interface ProcessLike {
  stdout: MinimalWritable;
  stderr: MinimalWritable;
}

/**
 * Install minimal `stdout` / `stderr` sinks on the given process-like object
 * that route to the shared REPL output ref. The browser polyfill
 * (`process/browser`) used by vite-plugin-node-polyfills omits `stdout` and
 * `stderr`, so kei-lisp's `print` / `printc` / `terpri` / `format` builtins
 * would fail without this.
 *
 * Must be called before `new LispInterpreter()` so that `StreamManager`
 * captures the shimmed references at construction time.
 *
 * @param target - process-like object to patch. Defaults to the global
 *   `process`. Overridable for testing.
 */
export const installProcessShim = (
  target: ProcessLike = process as unknown as ProcessLike,
): void => {
  const replOutput = useReplOutput();
  const sink: MinimalWritable = {
    write(chunk) {
      replOutput.value += String(chunk);
      return true;
    },
  };
  target.stdout = sink;
  target.stderr = sink;
};
