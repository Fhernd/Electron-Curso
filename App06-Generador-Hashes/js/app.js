const crypto = require('crypto');

$(document).ready(() => {
    $('#texto').focus();

    $('#texto').bind('input propertychange', function() {
        let texto = this.value;

        const md5 = crypto.createHash('md5').update(texto, 'utf8').digest('hex');
        $('#md5').text(md5);

        const sha1 = crypto.createHash('sha1').update(texto, 'utf8').digest('hex');
        $('#md5').text(sha1);

        
    });
});
