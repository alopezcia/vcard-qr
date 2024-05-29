const { request, response } = require('express');
const qrcode = require("qrcode");


const qr  = async (req = request, res = response ) => {
    const solicitud = req.body;
    console.log( solicitud.vcard );

    qrcode.toDataURL(solicitud.vcard, (err, src) => {
        if (err) 
            res.status(401).send({ status: 200, message: 'Error occured' });
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        res.status(200).send( { status: 200, message: src } );
//        res.send( src );
    });
}

module.exports = {
    qr
}
