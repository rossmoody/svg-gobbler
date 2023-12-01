const isDev = process.env.NODE_ENV === 'development'

const server = {
  dev: { svgr: 'http://localhost:8080/*' },
  prod: { svgr: 'https://us-west2-svg-gobbler.cloudfunctions.net/svg-gobbler-svgr' },
}

export const serverEndpoint = isDev ? server.dev : server.prod
