/* Source cards, USGS reference panel and surface-image fallback.
 * The map viewport now lives in map.js; this module no longer pans or zooms.
 */
import { datasets } from './datasets.js';

const $ = (id) => document.getElementById(id);

for (const data of datasets) {
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  const p = document.createElement('p');
  const a = document.createElement('a');
  summary.textContent = `${data.classification}: ${data.name}`;
  p.textContent = `${data.attribution}. ${data.coverage}. ${data.resolution || 'Resolution unknown'}. ${data.limitations}`;
  a.href = data.source;
  a.textContent = 'Original source';
  details.append(summary, p, a);
  $('source-cards').append(details);
}

const units = {
  NHjf1: 'INTERPRETED: A relatively smooth delta unit with few craters and visible layering, stratigraphically below fan unit 2.',
  NHjf2: 'INTERPRETED: Delta sediments deposited as river flow slowed on entering a lake; layering motivates study of past water activity.',
  Aeb: 'INTERPRETED: Wind-transported sediments accumulated into dunes and ripples. This regional classification does not establish local traversability.'
};
$('unit').onchange = () => {
  $('unit-description').textContent = units[$('unit').value];
};
$('unit').onchange();

$('geology-visible').onchange = (event) => {
  $('geology-panel').hidden = !event.target.checked;
};

const surface = $('surface');
surface.onerror = () => {
  surface.hidden = true;
};
if (surface.complete && !surface.naturalWidth) surface.onerror();
