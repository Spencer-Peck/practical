const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});


admin.initializeApp();

let db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.handler = ((req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' }).sendStatus(200)
})

exports.getGames = functions.https.onRequest((req, res) => {

    cors(req, res, () => {
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
});

exports.createGame = functions.https.onRequest((req, res) => {
    
    let gamesRef = db.collection("boardgames");
    
    const newGame = {
        title: req.body.title,
        ImageUrl: req.body.ImageUrl
    };

    cors(req, res, () => {
        db.collection("boardgames")
        .add(newGame)
        .then((doc) => {
            res.json({message: "Success!"})
            return res;
        })
        .catch((err) => {
            res.status(500).json({ error: "Something went horribly wrong!!"});
            console.error(err);
        })
    });


});