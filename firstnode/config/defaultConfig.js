module.exports = {
  hostname: '127.0.0.1',
  post: 8089,
  root: process.cwd(),
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true,
  }
}