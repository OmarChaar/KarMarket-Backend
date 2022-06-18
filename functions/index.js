const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

exports.dealerships = functions.https.onRequest(async (req, res) => {
    const snapshot = await admin.firestore().collection("dealerships").get();
    res.json(snapshot.docs.map(doc => doc.data()));
});