const fs = require('fs');
const filePath = 'ips-watched.json'
console.log(filePath);

function saveMaliciousIPs(email, ip, userAgent) {
    const template = {email: email, ip: ip, userAgent}
    try {
        const saver = fs.createWriteStream(filePath, {flags: 'a'});
        saver.write(JSON.stringify(template, null, 3) + ',' + '\n');
    } catch (err) {
        console.error(err);
    }
}

function readMaliciousIP() {
    let rawdata = fs.readFileSync(filePath);
    return rawdata.toString();
}

module.exports = { saveMaliciousIPs, readMaliciousIP }
