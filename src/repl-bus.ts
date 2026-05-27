import { ref } from 'vue';

/**
 * Shared REPL output buffer. Both the Lisp interpreter (via the process.stdout
 * shim installed below) and the App.vue UI append text here; the UI renders it.
 */
export const replOutput = ref('');

/**
 * Replace `process.stdout.write` / `process.stderr.write` with sinks that
 * append to `replOutput`. Must be called before `new LispInterpreter()` is
 * constructed so that `StreamManager` captures the patched references.
 */
export const installProcessShim = (): void => {
  const sink = (chunk: unknown): boolean => {
    replOutput.value += String(chunk);
    return true;
  };
  process.stdout.write = sink as typeof process.stdout.write;
  process.stderr.write = sink as typeof process.stderr.write;
};
