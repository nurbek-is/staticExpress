const express = require('express');
const app = express();
 
app.use(express.static('public'));
//We use the following line to bring in middleware to parse the incoming URL-encoded data
//The express.urlencoded middleware adds a body property to the request object. 
//The body property is an object that contains key-value pairs generated from the form submission. 
app.use(express.urlencoded({ extended: false }));
 
app.post('/process', (request, response) => {
    const html_process = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Hello, ${request.body.fname}!</title>
    </head>
    <body>
        <h1>Hello, ${request.body.fname}!</h1>
    </body>
    </html>`;
    response.status(200);
    response.send(html_process);
    console.log(request.body);
});
 
app.listen(8080);