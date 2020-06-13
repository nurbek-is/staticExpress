const express = require('express');
const app = express();

app.use(express.static('public'))
const html=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="styles/main.css">

<title>Welcome</title>
</head>
<body>
  <h1>Welcome</h1>
  <a href="hello-world.html">See Winnies the Pooh my friend"</a>
</body>
</html>`

app.get('/',(request,response)=> {
    response.status(200)
    response.send(html)
})
app.listen(8080)


 