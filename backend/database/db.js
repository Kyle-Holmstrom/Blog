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

module.exports = db;