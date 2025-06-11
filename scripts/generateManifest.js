/*Developed by @jams2blues with love for the Tezos community
  File: scripts/generateManifest.js
  Summary: CLI helper — injects START_URL & THEME_COLOR from deployTarget.js
           and writes public/manifest.json.
*/

/*──────── imports ─────────*/
import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  START_URL,
  THEME_COLOR,
  MANIFEST_NAME,
} from '../src/config/deployTarget.js' assert { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/*──────── logic ─────────*/
const src  = path.join(__dirname, '..', 'public', 'manifest.base.json');
const dest = path.join(__dirname, '..', 'public', 'manifest.json');

const tpl = JSON.parse(fs.readFileSync(src, 'utf8'));
tpl.start_url   = START_URL;
tpl.theme_color = THEME_COLOR;
tpl.name        = MANIFEST_NAME;

fs.writeFileSync(dest, JSON.stringify(tpl, null, 2));
console.log('🚀  Manifest refreshed → public/manifest.json');

/* What changed & why
   • Reads THEME_COLOR from deployTarget constants, so if user picks a soft
     palette as default the PWA chrome matches at build time.
*/
