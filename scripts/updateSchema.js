#!/usr/bin/env node
'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const cliArgs = process.argv.slice(2).reduce((acc, arg) => {
  const [key, val] = arg.replace(/^--/, '').split('=');
  acc[key] = val;
  return acc;
}, {});

const BACK_URL = cliArgs['back-url'] || process.env.BACK_URL;
const INDEX_HTML_PATH = cliArgs['index-path'] || process.env.FRONT_INDEX_HTML_PATH;

if (!BACK_URL) {
  console.error('[update-schema] BACK_URL is not set (use --back-url=... or .env)');
  process.exit(1);
}

if (!INDEX_HTML_PATH) {
  console.error('[update-schema] FRONT_INDEX_HTML_PATH is not set (use --index-path=... or .env)');
  process.exit(1);
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error(`Failed to parse response: ${data}`));
          }
        });
      })
      .on('error', reject);
  });
}

async function main() {
  const timestamp = new Date().toISOString();
  console.log(`[update-schema] ${timestamp} — starting`);

  const apiUrl = `${BACK_URL}/feedbacks?page=1&limit=1`;
  const { total, averageRating } = await fetchJson(apiUrl);

  const ratingValue =
    averageRating != null
      ? Number(averageRating).toFixed(1).replace('.', ',')
      : '0,0';
  const reviewCount = String(total || 0);
  const bestRating = '5';

  console.log(
    `[update-schema] fetched: ratingValue=${ratingValue}, reviewCount=${reviewCount}`
  );

  let html = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  html = html.replace(/"ratingValue":\s*"[^"]*"/, `"ratingValue": "${ratingValue}"`);
  html = html.replace(/"bestRating":\s*"[^"]*"/, `"bestRating": "${bestRating}"`);
  html = html.replace(/"reviewCount":\s*"[^"]*"/, `"reviewCount": "${reviewCount}"`);

  fs.writeFileSync(INDEX_HTML_PATH, html, 'utf-8');
  console.log(`[update-schema] ${INDEX_HTML_PATH} updated successfully`);
}

main().catch((err) => {
  console.error('[update-schema] ERROR:', err.message);
  process.exit(1);
});
