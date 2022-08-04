"use strict";

const admin = require("firebase-admin");
const functions = require("firebase-functions/v2");


const serviceAccount = require("./sec.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

exports.phoneexists = functions.https.onCall(async (data, _) => {
    try {
        const phone = data.phone;
        return (await admin.auth().getUserByPhoneNumber(phone)
            .then((u) => u.phoneNumber != null).catch((_) => false));
    } catch (_) {
        return false;
    }
});
