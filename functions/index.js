"use strict";

const admin = require("firebase-admin");
const functions = require("firebase-functions");


var serviceAccount = require("./sec.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.checkIfPhoneExists = functions.https.onCall(async (data, context) => {
    const phone = data.phone;
    try {
        const _ = await admin.auth().getUserByPhoneNumber(phone);
        return true;
    } catch (__1) {
        return false;
    }
});