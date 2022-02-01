const http = require('http')
const fs = require('fs')

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('myWebPage.html').pipe(res)
})

server.listen(PORT)
console.log('Server running at http://127.0.0.1:' + PORT);