const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_KEY;

async function sbFetch(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: {
      'apikey': SB_KEY,
      'Authorization': 'Bearer ' + SB_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(SB_URL + '/rest/v1/' + path, opts);
  const t = await r.text();
  return { status: r.status, body: t ? JSON.parse(t) : null };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { status, body } = await sbFetch('settings?id=eq.1');
    return res.status(status).json(body);
  }

  if (req.method === 'PATCH') {
    const { status, body } = await sbFetch('settings?id=eq.1', 'PATCH', req.body);
    return res.status(status).json(body);
  }

  res.status(405).json({ error: 'Method not allowed' });
}