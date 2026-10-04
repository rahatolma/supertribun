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

test('landing presents every primary app area without hiding cards in a carousel',()=>{
  for(const copy of ['01 / ARENA','02 / AKIŞ','03 / SIRALAMA','04 / ODALAR','05 / KARİYER','Kendi tribününü kur','Sözünün geçmişini gör'])assert.match(page,new RegExp(copy));
  assert.match(css,/\.bento-grid \{[\s\S]*grid-template-columns: repeat\(6, minmax\(0, 1fr\)\)/);
  assert.match(css,/\.bento-card\.feature-card-primary \{ grid-column: span 2; \}/);
  assert.match(css,/\.bento-card\.feature-card-wide \{ grid-column: span 3; min-height: 420px; \}/);
  assert.match(page,/Kariyer adımlarını tamamla, rozetlerini aç/);
  assert.doesNotMatch(page,/feature-carousel|swiper/i);
});
