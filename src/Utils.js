const IS_PRODUCTION = window.location.hostname !== 'localhost'

export const API_URL = IS_PRODUCTION ? 'https://sertifikat.victim.id' : 'http://localhost'
