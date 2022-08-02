require('./dotenv');
process.env.TZ = 'UTC';

const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('./logger');

const environment = process.env.ENVRONMENT || 'development';
const knex = require('knex')(require('./knexfile')[environment]);

const { sendEmail } = require('./email');
const { saveMaliciousIPs } = require('./watches');

function getUiFiles(pathtofile) {
    return fs.readFileSync(path.resolve(__dirname, `public/${pathtofile}`))
}

const htmls = {
    index: getUiFiles('index.html'),
    errEmail: getUiFiles('emailError.html')
}

app.enable('trust proxy', 1);

app.use((req, res, next) => {
    const { ip, method, url } = req;

    const id = new Date().getTime();
    const msg = `[${ip}] {${method}} ${id} - Start: ${url}`;

    logger.info(msg);
    res.on('finish', () => { logger.logResponse(req, res, id, 'Finish'); });
    res.on('close', () => { logger.logResponse(req, res, id, 'Close'); });

    next();
})


app.use(express.static('./public/', {index: false}))
app.use(bodyParser.json())

app.get('/index', (req, res) => { 
    res.end(htmls.index) 
});

app.get('/index.html', (req, res) => { 
    res.end(htmls.index) 
});

app.get('/', (req, res) => { 
    res.end(htmls.index) ;
});

app.get('/cv', (req, res) => {
    res.download('cv/cv_joaquimatheus.pdf', 'cv_joaquimatheus.pdf');
})

app.get('/mailerror', (req, res) => {res.end(htmls.errEmail)})

const sendFormDataByIp = {}
app.post('/contact', async(req, res) => {
    const { ip, headers } = req
    const userAgent = headers['user-agent'];
    const { email, name, msg, subject } = req.body

    if (!sendFormDataByIp[ip]) { sendFormDataByIp[ip] = 0 };

    sendFormDataByIp[ip]++;
    console.log(sendFormDataByIp);
    if (sendFormDataByIp[ip] > 5) {
        const msg = `${ip} - ${email} - ${userAgent}`
        try {
            await saveMaliciousIPs(email, ip, userAgent);
            logger.info(`Saved malicious ip: ${msg} `);
        } catch (err) {
            logger.error(err);
        }; 
        logger.info(`This ip(${ip} was redirected)`)
        return res.status(500).redirect('mailerror');
    };

    try {
        const sendUser = await knex('users').insert({
            name: name, 
            email: email, 
            msg: msg,
            subject: subject
        });
        console.log('pass')
        logger.info(`Saving email on database: ${email} - ${name} `,'SavingMail')
    } catch (err) {
        logger.error(err);
    }

    try {
        await sendEmail(email, subject, name, msg);
        logger.info(`Sending email: ${email} - ${name} `, 'Sending Mail');
    } catch (err) {
        res.status(500).end('foi mal, mas algo deu errado. :/');
        logger.error(err);
    }
});

const _get = app.get;
const _post = app.post;

app.post = function(route) {
    logger.info(`Online route: {POST} ${route}`);
    return _post.apply(this, arguments);
}

app.post = function(route) {
    logger.info(`Online route: {GET} ${route}`);
    return _get.apply(this, arguments);
}

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Is running ya in port in ${process.env.HTTP_PORT}`)
})
