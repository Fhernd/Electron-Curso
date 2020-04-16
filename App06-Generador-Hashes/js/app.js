const crypto = require('crypto');
const {clipboard} = require('electron');

$(document).ready(() => {
    $('#texto').focus();

    $('#texto').bind('input propertychange', function() {
        let texto = this.value;

        const md5 = crypto.createHash('md5').update(texto, 'utf8').digest('hex');
        $('#md5').text(md5);

        const sha1 = crypto.createHash('sha1').update(texto, 'utf8').digest('hex');
        $('#sha1').text(sha1);

        const sha256 = crypto.createHash('sha256').update(texto, 'utf8').digest('hex');
        $('#sha256').text(sha256);

        const sha512 = crypto.createHash('sha512').update(texto, 'utf8').digest('hex');
        $('#sha512').text(sha512);
    });

    $('#md5, #sha1, #sha256, #sha512').click(function() {
        let hash = this.innerText;

        console.log(hash);

        clipboard.writeText(hash);
    });
});
