const {MongoClient} = require('mongodb');


async function main(){
    const uri = "mongodb+srv://jack:jack000123@cluster0.2nieg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try{
        await client.connect();
        await listDatabases(client);
    }catch(error){
        console.error(error)
    }finally{ 
        client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    const databases = await client.db().admin().listDatabases
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(`-${db.name}`))
}