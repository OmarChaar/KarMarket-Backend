const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

/*
    FETCH ALL DEALERSHIPS
*/
exports.dealerships = functions.https.onRequest(async (req, res) => {
    const snapshot = await admin.firestore().collection("dealerships").get();
    
    const dealerships = [];

    for (const snap of snapshot.docs) {
        const id = snap.id;
        const dealership = snap.data();

        // Filter out dealerships that should not be displayed.
        if(dealership.displayed == true) {
            dealerships.push({...dealership, id: id});
        }
    }

    res.json(dealerships);
});
/*
    FETCH SPECIFIC DEALERSHIP ACCORDING TO UNIQUE ID
*/
exports.dealership = functions.https.onRequest(async (req, res) => {
    const snapshot = await admin.firestore().collection("dealerships").doc(req.body.id).get();

    res.json({...snapshot.data(), id: req.body.id});
});

/*
    FETCH VEHICLES OF UNIQUE DEALERSHIP
*/
exports.dealershipVehicles = functions.https.onRequest(async (req, res) => {
    const snapshot = await admin.firestore().collection("dealerships").doc(req.body.id).get();

    const vehiclesArray = snapshot.data().vehicles;

    const vehicles = [];

    for(const vehicleID of vehiclesArray) {
        const vehiclesSnapshot = await admin.firestore().collection("vehicles").doc(vehicleID).get();
        vehicles.push({...vehiclesSnapshot.data(), id: vehiclesSnapshot.id});
    }
    res.json(vehicles);
});

/*
    FETCH ALL VEHICLES
*/
exports.vehicles = functions.https.onRequest(async (req, res) => {
    const snapshot = await admin.firestore().collection("vehicles").get();
    
    const vehicles = [];

    for (const snap of snapshot.docs) {
        const id = snap.id;
        const vehicle = snap.data();

        // Filter out vehicles that should not be displayed.
        if(vehicle.displayed == true) {
            vehicles.push({...vehicle, id: id});
        }
    }

    res.json(vehicles);
});
/*
    FETCH SPECIFIC VEHICLE ACCORDING TO UNIQUE ID
*/
exports.vehicle = functions.https.onRequest(async (req, res) => {
    const snapshot = await admin.firestore().collection("vehicles").doc(req.body.id).get();

    res.json({...snapshot.data(), id: req.body.id});
});