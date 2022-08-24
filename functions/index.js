"use strict";

const admin = require("firebase-admin");
const functions = require("firebase-functions");


const serviceAccount = require("./sec.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const fcm = admin.messaging();

exports.phoneexists = functions.https.onCall(async (data, _) => {
    try {
        const phone = data.phone;
        return (await admin.auth().getUserByPhoneNumber(phone)
            .then((u) => u.phoneNumber != null).catch((_) => false));
    } catch (_) {
        return false;
    }
});


exports.sendtotoken = functions.https.onCall(async (data, _) => {
    const payload = {
        notification: {
            title: data.title,
            body: data.body,
            icon: data.icon,
        },
        data: data.payload,
    };
    try {
        return (await fcm.sendToDevice(data.token, payload)
            .then((res) => res.failureCount == 0 ? true : false)
            .catch((_) => false));
    } catch (_) {
        return false;
    }
});

exports.multicast = functions.https.onCall(async (data, _) => {
    const payload = {
        notification: {
            title: data.title,
            body: data.body,
            icon: data.icon,
        },
        data: data.payload,
        tokens: data.tokens,
    };
    try {
        return (await fcm.sendMulticast(payload)
            .then((res) => res.successCount > 0 ? true : false)
            .catch((_) => false));
    } catch (_) {
        return false;
    }
});
