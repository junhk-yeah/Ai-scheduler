// api/auth.js
// Google OAuth 인가코드 → 액세스토큰 교환 (서버에서 처리 → client_secret 노출 없음)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
 
  const { code, redirect_uri } = req.body;
  if (!code) return res.status(400).json({ error: 'code required' });
 
  const params = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri,
    grant_type: 'authorization_code',
  });
 
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const data = await tokenRes.json();
  if (data.error) return res.status(400).json(data);
  res.json({ access_token: data.access_token });
}
