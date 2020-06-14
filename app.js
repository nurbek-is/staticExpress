const express = require('express');
const {check, validationResult} = require('express-validator');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.redirect('/ice-cream.html');
});

app.post('/process', [
    check('username','Invalid username, It has to be between 8-25 chaerachters').isLength({min:8,max:25}).isLowercase()
    .withMessage('Username must be in all lowercase letters.'),
    check('email','Invalid email, please type in a valid email').isEmail(),
    check('phone','Invalid phone, please type in a valid phone number in format: ###-###-####').matches(
        /[1-9]\d{2}-\d{3}-\d{4}/),
    check('flavor','please choose at least one of the flavors').not().equals('0'),
    check('container','please choose at least one of the choice of container').exists(),
    check('terms','You must accept the terms.').exists(),
    check('requests','Comments must be from 10-200 characters').custom(
        (value)=> {
            return value.length===0 ||
            (value.length>=10 && value.length<=200)
        }
    )
    
], (request, response) => {
    const errors = validationResult(request);

    if (errors.isEmpty()) {
        // code to process form goes here
        response.redirect('/success.html');
    } else {
        let msg = 'You have the following errors:<ol>';
        for (error of errors.array()) {
            msg += "<li>" + error.msg + "</li>";
        }
        msg += "</ol>";
        const html_process = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="stylesheet" href="normalize.css">
        <link rel="stylesheet" href="styles.css">
        <title>Oops!</title>
        </head>
        <body>
        <main>
            <h1>Form Errors</h1>
            ${msg}
            <a href="javascript:history.back()">Try again.</a>
        </main>
        </body>
        </html>`;
        response.status(200);
        response.send(html_process);
    }
    console.log(request.body);
    console.log(errors.array());
});

app.listen(8080);