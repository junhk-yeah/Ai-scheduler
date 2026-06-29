// api/config.js
// 클라이언트가 OAuth 시작에 필요한 client_id만 반환 (secret은 반환 안 함)
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ clientId: process.env.GOOGLE_CLIENT_ID });
}
 
