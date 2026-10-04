import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const [page,css]=await Promise.all([
  readFile(new URL('../src/pages/Landing.jsx',import.meta.url),'utf8'),
  readFile(new URL('../src/pages/Landing.css',import.meta.url),'utf8'),
]);

test('landing gives duel and Story clean product panels with focused actions',()=>{
  for(const copy of ['Arkadaşına meydan oku','Bir maç da olur','Beş maç da','9:16 Story','Rehber ve e-posta toplamadan davet','DÜELLOYA ÇAĞIR','TAHMİNİNİ STORY’DE PAYLAŞ'])assert.match(page,new RegExp(copy));
  assert.match(page,/className="showcase-action"/);assert.match(page,/Meydan okumayı gönder/);assert.match(page,/Story’de paylaş/);
  assert.doesNotMatch(page,/className="duel-visual"/);assert.doesNotMatch(page,/className="story-card"/);
  assert.match(css,/\.social-showcase-grid/);assert.match(css,/\.showcase-action/);
  assert.match(css,/\.social-showcase \{[\s\S]*padding: 130px 10%/);
  assert.match(css,/\.social-showcase-head h2 \{[^}]*font-size: 64px/);
  assert.match(css,/\.showcase-copy h3 \{[^}]*font-size: 36px/);
});
