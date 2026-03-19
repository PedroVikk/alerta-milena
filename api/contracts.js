const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_KEY;

async function sbFetch(path, method = 'GET', body = null) {
  if (!SB_URL || !SB_KEY) throw new Error('Variáveis de ambiente não configuradas');
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
  if (!r.ok) throw new Error(`Supabase error ${r.status}: ${t}`);
  return t ? JSON.parse(t) : null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const data = await sbFetch('contacts?order=created_at.asc');
      return res.status(200).json(data || []);
    }
    if (req.method === 'POST') {
      const data = await sbFetch('contacts', 'POST', req.body);
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.query;
      await sbFetch('contacts?id=eq.' + id, 'DELETE');
      return res.status(200).json({ success: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('contacts error:', e);
    res.status(500).json({ error: e.message });
  }
}   