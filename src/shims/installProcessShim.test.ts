import { describe, it, expect, beforeEach } from 'vitest';
import { installProcessShim } from './installProcessShim';
import { useReplOutput } from '../composables/useReplOutput';

type FakeStream = { write(chunk: unknown): boolean };
type FakeProcess = { stdout: FakeStream; stderr: FakeStream };

const createFakeProcess = (): FakeProcess =>
  ({ stdout: undefined, stderr: undefined }) as unknown as FakeProcess;

describe('installProcessShim', () => {
  beforeEach(() => {
    useReplOutput().value = '';
  });

  it('assigns stdout / stderr with a working write function', () => {
    const fake = createFakeProcess();
    installProcessShim(fake);
    expect(typeof fake.stdout.write).toBe('function');
    expect(typeof fake.stderr.write).toBe('function');
  });

  it('routes stdout writes to the shared REPL output ref', () => {
    const fake = createFakeProcess();
    installProcessShim(fake);
    fake.stdout.write('hello');
    expect(useReplOutput().value).toBe('hello');
  });

  it('routes stderr writes to the shared REPL output ref', () => {
    const fake = createFakeProcess();
    installProcessShim(fake);
    fake.stderr.write('boom');
    expect(useReplOutput().value).toBe('boom');
  });
});
