const http = require('http');
const url = require('url');
const fs= require('fs');
const querystring = require('querystring');
const data = fs.readFileSync('./data.json');
let projects = JSON.parse(data);

let lastindex = projects.length === 0 ?
    0 :
    projects[projects.length-1].id;

const server = http.createServer((req, res) => {

    const urlparse = url.parse(req.url, true);

    if(urlparse.pathname == '/projects' && req.method == 'GET')
    {
        //TODO: GET logic
    }
    if(urlparse.pathname == '/projects' && req.method == 'POST')
    {
        //TODO: POST logic
    }
    if(urlparse.pathname == '/projects/tasks' && req.method == 'POST')
    {
        //TODO: POST logic
    }
    if(urlparse.pathname == '/projects' && req.method == 'PUT')
    {
        //TODO: PUT logic
    }
    if(urlparse.pathname == '/projects' && req.method == 'DELETE')
    {
        //TODO: DELETE logic
    }
});
