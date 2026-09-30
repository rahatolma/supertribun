import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/pages/SuperTribunAI.jsx', import.meta.url), 'utf8');

test('AI page describes the validated production model, not research-only features', () => {
  for (const claim of ['40.934', 'Poisson GLM', 'dinlenme', 'skor matrisi', '3.192']) {
    assert.match(source, new RegExp(claim, 'i'));
  }
  for (const researchOnly of ['100.000 MONTE CARLO', 'ZAMAN SIRALI ELO', 'Dixon–Coles']) {
    assert.doesNotMatch(source, new RegExp(researchOnly, 'i'));
  }
  assert.match(source, /kesin maç sonucu veya bahis kazancı vaadi değildir/i);
});
