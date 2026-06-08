import { put, list } from '@vercel/blob';

const KEY = 'poobears';
const NAME = 'household.json';

// Strongly-consistent KV (Upstash Redis via Vercel) if provisioned, else Blob fallback.
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const hasKV = !!(KV_URL && KV_TOK);

async function redis(cmd) {
  const r = await fetch(KV_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + KV_TOK, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  return j.result;
}

async function readState() {
  if (hasKV) {
    const v = await redis(['GET', KEY]);
    if (!v) return {};
    try { return JSON.parse(v); } catch { return {}; }
  }
  const { blobs } = await list({ prefix: NAME, limit: 1 });
  if (!blobs.length) return {};
  const r = await fetch(blobs[0].url + '?t=' + Date.now(), { cache: 'no-store' });
  return (await r.json().catch(() => ({}))) || {};
}

async function writeState(body) {
  const json = JSON.stringify(body);
  if (hasKV) { await redis(['SET', KEY, json]); return; }
  await put(NAME, json, {
    access: 'public', addRandomSuffix: false, allowOverwrite: true,
    contentType: 'application/json', cacheControlMaxAge: 0,
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const data = await readState();
      res.setHeader('x-pb-store', hasKV ? 'kv' : 'blob');
      return res.status(200).json(data || {});
    }
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body || '{}'); } catch { body = {}; } }
      if (!body || typeof body !== 'object') body = {};
      await writeState(body);
      return res.status(200).json({ ok: true, store: hasKV ? 'kv' : 'blob' });
    }
    return res.status(405).json({ error: 'method' });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
