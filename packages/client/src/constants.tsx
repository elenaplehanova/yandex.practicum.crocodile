import './client.d'

export const SERVER_HOST =
  typeof window === 'undefined'
    ? __INTERNAL_SERVER_URL__
    : __EXTERNAL_SERVER_URL__

export const PROTOCOL_HTTPS = 'https://'
export const DOMAIN = 'ya-praktikum.tech'
export const API_BASE_URL = `${PROTOCOL_HTTPS}${DOMAIN}/api`
export const API_VERSION = 'v2'
export const API_URL = `${API_BASE_URL}/${API_VERSION}`
export const GEO_API_KEY = 'd0fc3dcfe71d4b4e868c900badd967e3'

// добавлен proxy в vite.config.ts, чтобы не было проблем с установкой cookies
// делаем запрос на тот же url, где запущен клиент, и все что начинается с /api/v2 проксируется на наш сервер
export const API_PROXY_URL = 'http://localhost:3000/api/v2'
