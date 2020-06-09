const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

let db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.getGames = functions.https.onRequest((req, res) => {
    db.collection("boardgames")
    .get()
    .then((data) => {
        let games = [];
        data.forEach((doc) => {
            games.push(doc.data());
        });
        return res.json(games);
    })
    .catch((err) => console.errror(err));
});
