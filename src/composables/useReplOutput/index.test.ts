import { describe, it, expect } from 'vitest';
import { useReplOutput } from './index';

describe('useReplOutput', () => {
  it('returns a ref with default empty string', () => {
    const output = useReplOutput();
    expect(output.value).toBe('');
  });

  it('returns the same ref instance on repeated calls (singleton)', () => {
    const a = useReplOutput();
    const b = useReplOutput();
    expect(a).toBe(b);
  });
});
