import { put, list } from '@vercel/blob';

const NAME = 'household.json';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const { blobs } = await list({ prefix: NAME, limit: 1 });
      if (!blobs.length) return res.status(200).json({});
      const r = await fetch(blobs[0].url + '?t=' + Date.now(), { cache: 'no-store' });
      const data = await r.json().catch(() => ({}));
      return res.status(200).json(data || {});
    }
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body || '{}'); } catch { body = {}; } }
      if (!body || typeof body !== 'object') body = {};
      await put(NAME, JSON.stringify(body), {
        access: 'public', addRandomSuffix: false, allowOverwrite: true,
        contentType: 'application/json', cacheControlMaxAge: 0,
      });
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'method' });
  } catch (e) {
    return res.status(500).json({ error: String(e && e.message || e) });
  }
}
