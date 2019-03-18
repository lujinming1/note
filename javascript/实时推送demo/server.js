const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const basePath = path.join(__dirname, '/');
const server = http.createServer((req, res) => {
    if(req.url === '/longpolling'){
        // setTimeout(() => {res.end(new Date().toLocaleString())}, 10000);
        res.end(new Date().toLocaleString());
    } else if(req.url === '/'){
        fs.readFile(basePath + 'index.html',(err, data) => {
            if(err && err.code !== 'ENOENT'){
                throw err;
            }
            res.end(data);
        })

    } else if(req.url === '/polling'){
        res.end(new Date().toLocaleString());
    } else if(req.url.startsWith('/iframeStream')){
        let urlObj = url.parse(req.url, true);
        setInterval(() => {
            res.write(`<script>${urlObj.query.callback}('${new Date().toLocaleString()}')</script>`)
        }, 1000)
    }
});

server.listen(8000);