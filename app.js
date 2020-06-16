const express = require('express');
const {check, validationResult} = require('express-validator');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const couponCodes = [
    'webuc8',
    'buyonegetone',
    'zippy'
];

app.get('/', (request, response) => {
    response.redirect('/ice-cream.html');
});
app.post('/coupon-check', [
    check('coupon', 'Invalid coupon code').isIn(couponCodes)
], function(request, response) {
    const errors = validationResult(request);
 
    let msg;
    if (errors.isEmpty()) {
        msg = '<span class="valid">Coupon validated</span>';
    } else {
        msg = '<span class="invalid">Invalid coupon</span>';
    }
    response.status(200);
    response.send(msg);
});
app.post('/process', [
    check('username', 
        'Username must be 8 to 25 characters.').isLength(
            { min: 8, max: 25 }
        ),
    check('email', 'Invalid Email').isEmail(),
    check('phone', 'Invalid Phone. Use format: ###-###-####').matches(
        /[1-9]\d{2}-\d{3}-\d{4}/
    ),
    check('flavor','Please select a flavor.').not().equals('0'),
    check('container','Please select a container.').exists(),
    check('terms','You must accept the terms.').exists(),
    check('requests','Comment must be from 10 to 200 chars.').custom(
        (value) => {
            return value.trim().length === 0 || 
                (value.length >= 10 && value.length <= 200);
        }
    ),
    check('coupon', 'Invalid coupon code').custom(
        function(value) {
            return value.trim().length == 0 ||
            couponCodes.indexOf(value) >= 0
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