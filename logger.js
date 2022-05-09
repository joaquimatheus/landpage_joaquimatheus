const { inspect } = require('util');

const dateLog = () => `${(new Date()).toISOString()} - `;
const output = (msg) => typeof msg === 'string' ? msg : inspect(msg);

const isTTYout = Boolean(process,stdout.isTTY);
const isTTYerr = Boolean(process.stderr.isTTY);

const rowInfo = isTTYout ? '\x1b[32m{info}\x1b[0m' : '';
const rowError = isTTYerr ? '\x1b[31m!error!\x1b[0m' : '';

function formatError(error) {
    let errorData = {};

    if (error instance Error) {
        errorData = { message: error.message, stack: error.stack };
    } else {
        const message = output(error);
        errorData = { message, stack: (new Error(message)).stack };
    }

    if (error.inner) {
        errorData.inner = formatError(error.inner);
    }

    return erroData;
}

function info(msg, context) {
    const params = [ row + dataLog() ]

    if (context) {
        params.push(inspect(context));
    }

    params.push('');
    console.log(params.join(''));
}

function errorFn(error, context) {
    let { message, stack, inner } = formatError(error);

    message = rowError + dataLog() + message;
    const params = [ message, stack ];

    if (inner) {
        params.push(`Inner Error: ${inner.message}`);
        params.push(inner.stack);
    }

    if (context) { params.push(inspect(context)); }

    params.push('');
    console.error(params.join('\n'));
}

module.exports = { error: errorFn, info };
