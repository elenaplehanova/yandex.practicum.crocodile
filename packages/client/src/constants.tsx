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
