const IS_PRODUCTION = window.location.hostname !== 'localhost'

export const API_URL = IS_PRODUCTION ? 'https://sertifikat.bbplkbandung.com' : 'http://localhost'
