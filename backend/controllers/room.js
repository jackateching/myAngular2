const dbo = require("../db/conn");
const { ObjectId } = require('mongodb');

module.exports = {
    getAllRooms: function(req, res){
        let dbConnect = dbo.getDb();
        dbConnect
            .collection('rooms')
            .find({})
            .toArray(function(err, result){
                if (err) throw err;
                res.json(result)
            });
    },

    getOneRoom: function(req, res){
        const {id} = req.params;
        const query = { _id: ObjectId(id)};
        let dbConnect = dbo.getDb();
        dbConnect
            .collection('rooms')
            .findOne(query, function(err, found){
                if (!err) {
                    res.send(found);
                } else {
                    res.send("no room with this roomId")
                    console.log(err);
                }
            });
    },

    createRoom: async function(req, res) {
        const {name, price, floor, bathTub, balcony} = req.body;
    
        if (!(name && price && floor && bathTub!=null && balcony!=null)) {
            return res.status(400).send("All input is required");
        }

        const newRoom = {
            name: name,
            price: price,
            floor: floor,
            bathTub: bathTub,
            balcony: balcony,
            roomState: true
        };
    
        let dbConnect = dbo.getDb();
    
        // check if room already exist
        const oldRoom = await dbConnect.collection('rooms').findOne({name: name});
        if (oldRoom) {
            return res.status(409).send("Room name already exists!")
        }
    
        // create new room
        dbConnect
            .collection('rooms')
            .insertOne(newRoom, function(err, result){
                if (!err) {
                    try {
                        console.log("create new room");
                        addRoomChange(dbConnect, req.user.username, req.user.level, "create", name);
                        return res.status(201).send(result);
                    } catch {
                        return res.status(400).send("error adding log")
                    }
                } else {
                    console.loge(err);
                    return res.status(400).send("error adding new user");
                }
        });
    },

    updateOneRoom: async function(req, res) {
        const {id} = req.params;
        const {name, price, floor, bathTub, balcony, roomState} = req.body;
        let dbConnect = dbo.getDb();
        const query = {_id: ObjectId(id)};
        const newRoom = {
            $set: {
                name: name,
                price: price,
                floor: floor,
                bathTub: bathTub,
                balcony: balcony,
                roomState: roomState
            }
        }
        
        // check if room exists
        const oldRoom = await dbConnect.collection('rooms').findOne(query);
        if (!oldRoom) {
            console.log(oldRoom);
            return res.status(409).send("Room doest not exist!");
        }

        dbConnect
            .collection('rooms')
            .updateOne(query, newRoom, function(err, result){
                if (!err) {
                    try{
                        console.log("update a room")
                        addRoomChange(dbConnect, req.user.username, req.user.level, "edit", name)
                        return res.status(200).send(result);
                    } catch {
                        return res.status(400).send("error adding log")
                    }
                } else {
                    console.log(err);
                    return res.status(400).send("error updaing a room");
                    
                }
        });
    },

    deleteRoom: async function(req, res) {
        const {id} = req.params;
        let dbConnect = dbo.getDb();
        const query = {_id: ObjectId(id)};

        // check if room exists
        const oldRoom = await dbConnect.collection('rooms').findOne(query);
        if (!oldRoom) {
            console.log(oldRoom);
            return res.status(409).send("Room doest not exist!");
        }

        dbConnect
            .collection("rooms")
            .deleteOne(query, function(err, result){
                if (!err) {
                    try {
                        console.log("delete a room")
                        addRoomChange(dbConnect, req.user.username, req.user.level, "delete", oldRoom.name);
                        return res.status(200).send(result);
                    } catch {
                        return res.status(400).send("error adding log")
                    }
                    
                } else {
                    console.log(err);
                    return res.status(400).send("error deleting a room");
                    
                }
            });
    },

    // test: function(req, res) {
    //     let dbConnect = dbo.getDb();
    //     console.log(req.user);
    //     addRoomChange(dbConnect, req.user.username, req.user.level, "create")
    //     return res.status(200).send('ok');
    // }
    
}

function addRoomChange(dbConnect, username, level, action, roomName){
    // new log
    const newLog = {
        datetime: new Date(),
        username: username,
        level: level,
        action: action,
        roomName: roomName
    };

    // create new log
    dbConnect
    .collection('logs')
    .insertOne(newLog, function(err, result){
        if (!err) {
            console.log("create new log")
        } else {
            console.log(err);
            throw err
        }
    });
};