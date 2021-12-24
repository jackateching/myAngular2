const bcrypt = require('bcrypt');
const dbo = require("../db/conn");
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const { ObjectId } = require('mongodb');

module.exports = {
    register: async function(req, res) {
        const {username, password} = req.body;
    
        if (!(username && password)) {
            return res.status(400).send("All input is required");
        }
    
        let dbConnect = dbo.getDb();
    
        // check if user already exist
        const oldUser = await dbConnect.collection('users').findOne({username: username});
        if (oldUser) {
            return res.status(409).send("User already exists. Please Login")
        }
    
        // encrypt user password
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = {
            username: req.body.username,
            password: hashedPassword,
            status: "active",
            level: req.body.level
        };
        console.log(newUser)
        
        // create new user
        dbConnect
            .collection('users')
            .insertOne(newUser, function(err, result){
                if (!err) {
                    console.log("create new user")
    
                    // create token
                    let payload = {id: newUser._id, username: newUser.username, level: newUser.level}
                    const token = jwt.sign(
                        payload, 
                        process.env.TOKEN_KEY, 
                        {
                            expiresIn: "2h"
                        }
                    );
                    result.token = token;
                    return res.status(201).send(result);
                } else {
                    console.loge(err);
                    return res.send("error adding new user");
                }
        });
    },

    login: async function(req, res) {
        try {
            const {username, password} = req.body;
    
            // validate input
            if (!(username && password)) {
                res.status(400).send("All input is required");
            }
            let dbConnect = dbo.getDb();
            dbConnect
                .collection('users')
                .findOne({username: username}, function(err, foundUser){
                    if (foundUser) {
                        if (foundUser) {
                            bcrypt.compare(password, foundUser.password, function(err, result) {
                                if (result) {
                                    // create token
                                    const token = jwt.sign(
                                        {id: foundUser._id, username: foundUser.username, level: foundUser.level}, 
                                        process.env.TOKEN_KEY, 
                                        {
                                            expiresIn: "2h"
                                        }
                                    );
                                    foundUser.token = token;
                                    res.status(200).send(foundUser)
                                } else {
                                    res.status(400).json('Invalid Credentials')
                                }
                            });
                        }
                    } else {
                        res.status(400).json('Invalid Credentials')
                    }
            });
    
        } catch (err) {
            consol.log(err);
        }
    },

    getAllUsers: function(req, res){
        let dbConnect = dbo.getDb();
        dbConnect
            .collection('users')
            .find({})
            .toArray(function(err, result){
                if (err) throw err;
                res.json(result);
            });
    },

    getOneUser: function(req, res){
        const {id} = req.params;
        const query = {_id: ObjectId(id)};
        let dbConnect = dbo.getDb();
        dbConnect
            .collection('users')
            .findOne(query, function(err, user){
                if (!err) {
                    res.send(user);
                } else {
                    res.send("no room with this roomId")
                    console.log(err);
                }
            });
    },

    updateOneUser: async function(req, res) {
        const {id} = req.params;
        const {status, level} = req.body;
        let dbConnect = dbo.getDb();
        const query = {_id: ObjectId(id)};
        const newUser = {
            $set: {
                status: status,
                level: level
            }
        }

        // check if user exists
        const oldUser = await dbConnect.collection('users').findOne(query);
        if (!oldUser) {
            return res.status(409).send("User does not exist");
        }

        dbConnect
            .collection('users')
            .updateOne(query, newUser, function(err, result){
                if (!err) {
                    console.log("update a user")
                    return res.status(200).send(result);
                } else {
                    console.log(err);
                    return res.status(400).send("error updaing a user");
                    
                }
        });
    },

    deleteUser: function(req, res) {
        const {id} = req.params;
        let dbConnect = dbo.getDb();
        const query = {_id: ObjectId(id)};

        dbConnect
            .collection("users")
            .deleteOne(query, function(err, result){
                if (!err) {
                    console.log("delete a user")
                    res.status(200).send(result);
                } else {
                    console.log(err);
                    return res.status(400).send("error deleting a user");
                }
            });
    }
}