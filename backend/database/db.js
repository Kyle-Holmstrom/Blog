const { MongoClient } = require('mongodb');  

async function db() {
    const uri = "mongodb+srv://atlas_kyle:ULpTaOX54XbUXUVG@cluster0.e9xvcks.mongodb.net/Blog";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('MongoDB connected successfully...');
        
        // Make the appropriate DB calls
        
        //await listDatabases(client);
        //await findOneUserByName(client, 'Kyle');
        //await getAllUsers(client);
        //await updateUser(client, "Holmstrom", { password: "Admin321" });
        //await upsertUser(client, "Holmstrom", { password: "Admin123" });
        //await deleteUser(client, "Superman");

    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
    
}
db().catch(console.error);

// List all Databases on mongodb atlas
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// Get all users in database
async function getAllUsers(client) {
    const cursor = client.db("Blog").collection("users").find({});
    const result = await cursor.toArray();

    if (result) {
        console.log(result);
    } else {
        console.log('Couldn\'t find any users in database.');
    }

}

// Get user by name
async function findOneUserByName(client, nameOfUser) {
    const result = await client.db("Blog").collection("users").findOne({ lastName: nameOfUser });
    
    if (result) {
        console.log(`Found users: ${nameOfUser}.`);
        console.log(result);
    } else {
        console.log('No users found in database.');
    }
}

// Update user by name (try to change this to id later...)
async function updateUser(client, nameOfUser, updatedUser) {
    const result = await client.db("Blog").collection("users").updateOne(
        { lastName: nameOfUser },
        { $set: updatedUser } 
        );
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} documents was/were updated.`);

}

// Update user by name using UPSERT
// this function search's DB for user by last name if found will update
// with new data, if the user that was passed in doesn't exist it will create
// a new document with that user and the data that was passed in.. all in one function call.
async function upsertUser(client, nameOfUser, updatedUser) {
    const result = await client.db("Blog").collection("users").updateOne(
        { lastName: nameOfUser },
        { $set: updatedUser },
        { upsert: true } 
        );
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/wer updated`);
    }
}

// Delete a user by last name
async function deleteUser(client, selectedUser) {
    const result = await client.db("Blog").collection("users").deleteOne(
        { lastName: selectedUser }
    );
    console.log(`${result.deletedCount} was/were deleted.`);
}


module.exports = db;