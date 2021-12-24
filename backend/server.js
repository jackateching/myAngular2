require('dotenv').config()
const express = require("express");
// const ejs = require("ejs");
// const { MongoClient, ListCollectionsCursor } = require('mongodb');
const app = express();
const cors = require("cors");
const dbo = require("./db/conn");
// const { ObjectId } = require('mongodb');
// const jwt = require('jsonwebtoken');
const routes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(cors());

// routes
app.use(routes);

const PORT = process.env.PORT || 3000;

// get mongodb connection
app.listen(PORT, function() {
    dbo.connectToServer(function(err){
        if(err) {
            console.error(err);
        }
    })
    console.log("Server started on port 3000");
})

//
app.get('/', (req, res) => {res.send('server is working')});

//// get all rooms ///////
// app.route('/rooms')
// .get(function(req, res){
//     let dbConnect = dbo.getDb();
//     dbConnect
//         .collection('rooms')
//         .find({})
//         .toArray(function(err, result){
//             if (err) throw err;
//             res.json(result)
//         });
// });

/// get all users///
// app.route('/users')
// .get(function(req, res){
//     let dbConnect = dbo.getDb();
//     dbConnect
//         .collection('users')
//         .find({})
//         .toArray(function(err, result){
//             if (err) throw err;
//             res.json(result);
//         });
// });

///// get a specific room //////////
// app.route('/rooms/:id')
// .get(function(req, res){
//     const {id} = req.params;
//     const query = { _id: ObjectId(id)};
//     let dbConnect = dbo.getDb();
//     dbConnect
//         .collection('rooms')
//         .findOne(query, function(err, found){
//             if (!err) {
//                 res.send(found);
//             } else {
//                 res.send("no room with this roomId")
//                 console.log(err);
//             }
//         });
// });

///// get a specific user //////////
// app.route('/users/:id')
// .get(function(req, res){
//     const {id} = req.params;
//     const query = {_id: ObjectId(id)};
//     let dbConnect = dbo.getDb();
//     dbConnect
//         .collection('users')
//         .findOne(query, function(err, user){
//             if (!err) {
//                 res.send(user);
//             } else {
//                 res.send("no room with this roomId")
//                 console.log(err);
//             }
//         });
// });

/// register ///
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// app.route('/register')
// .post(async function(req, res) {
//     const {username, password} = req.body;

//     if (!(username && password)) {
//         res.status(400).send("All input is required");
//     }

//     let dbConnect = dbo.getDb();

//     // check if user already exist
//     const oldUser = await dbConnect.collection('users').findOne({username: username});
//     if (oldUser) {
//         return res.status(409).send("User already exists. Please Login")
//     }

//     // encrypt user password
//     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//     const newUser = {
//         username: req.body.username,
//         password: hashedPassword,
//         status: "active",
//         level: "employee"
//     };
//     console.log(newUser)
    
//     // create new user
//     dbConnect
//         .collection('users')
//         .insertOne(newUser, function(err, result){
//             if (!err) {
//                 console.log("create new user")

//                 // create token
//                 const token = jwt.sign(
//                     {user_id: result._id}, 
//                     process.env.TOKEN_KEY, 
//                     {
//                         expiresIn: "2h"
//                     }
//                 );
//                 result.token = token;
//                 res.status(201).send(result);
//             } else {
//                 res.send("error adding new user");
//                 console.loge(err);
//             }
//     });

    
// });


/// login
// app.route("/login")
// .post(async function(req, res) {
//     try {
//         const {username, password} = req.body;

//         // validate input
//         if (!(username && password)) {
//             res.status(400).send("All input is required");
//         }
//         let dbConnect = dbo.getDb();
//         dbConnect
//             .collection('users')
//             .findOne({username: username}, function(err, foundUser){
//                 if (foundUser) {
//                     if (foundUser) {
//                         bcrypt.compare(password, foundUser.password, function(err, result) {
//                             if (result) {
//                                 // create token
//                                 const token = jwt.sign(
//                                     {user_id: foundUser._id}, 
//                                     process.env.TOKEN_KEY, 
//                                     {
//                                         expiresIn: "2h"
//                                     }
//                                 );
//                                 foundUser.token = token;
//                                 res.status(200).send(foundUser)
//                             } else {
//                                 res.status(400).json('Invalid Credentials')
//                             }
//                         });
//                     }
//                 } else {
//                     res.status(400).json('Invalid Credentials')
//                 }
//         });

//     } catch (err) {
//         consol.log(err);
//     }
// });

// require auth
// app.get("/welcome", auth.verifyToken, (req, res) => {
//     res.status(200).send("Welcome");
//   });



