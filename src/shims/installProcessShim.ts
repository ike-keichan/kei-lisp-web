import { useReplOutput } from '../composables/useReplOutput';

/**
 * Replace `process.stdout.write` / `process.stderr.write` with sinks that
 * append to the shared REPL output ref. Must be called before
 * `new LispInterpreter()` is constructed so that `StreamManager` captures the
 * patched references.
 */
export const installProcessShim = (): void => {
  const replOutput = useReplOutput();
  const sink = (chunk: unknown): boolean => {
    replOutput.value += String(chunk);
    return true;
  };
  process.stdout.write = sink as typeof process.stdout.write;
  process.stderr.write = sink as typeof process.stderr.write;
};
