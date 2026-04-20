// Central API config
// Dev mein Vite proxy /api -> localhost:5000 forward karega
// Production mein VITE_API_URL set karo (e.g. https://yourbackend.com)
const BASE = import.meta.env.VITE_API_URL || '';
export const API_URL = `${BASE}/api/jobs`;
