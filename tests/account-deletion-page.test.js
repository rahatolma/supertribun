import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
const legal = await readFile(new URL('../src/pages/LegalPage.jsx', import.meta.url), 'utf8');

test('public account deletion route is stable and linked from the site footer', () => {
  assert.match(app, /path="\/hesap-silme"/);
  assert.match(legal, /to="\/hesap-silme"/);
  assert.match(legal, /Kariyer → Ayarlar → Hesabımı sil/);
});

test('deletion instructions explain scope and offer a verified fallback without requesting secrets', () => {
  for (const phrase of ['profilin', 'tahminlerin', 'oda üyeliklerin', 'akış yorumların', 'takip/engel ilişkilerin', 'destek taleplerin']) {
    assert.match(legal, new RegExp(phrase));
  }
  assert.match(legal, /mailto:destek@supertribun\.com/);
  assert.match(legal, /Parolanı, SMS kodunu, kimlik belgeni veya ödeme bilgini e-postaya ekleme/);
  assert.match(legal, /hesabı yeterince doğrulanamayan talepler doğrudan silme işlemine dönüştürülmez/);
});
