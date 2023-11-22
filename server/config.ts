const isDev = process.env.NODE_ENV === 'development'

const server = {
  dev: {
    base: 'http://localhost:3000',
    manifest: 'http://localhost:3000/*',
  },
  prod: {
    base: 'https://example.com',
    manifest: 'https://example.com/*',
  },
}

export const serverEndpoint = isDev ? server.dev : server.prod
