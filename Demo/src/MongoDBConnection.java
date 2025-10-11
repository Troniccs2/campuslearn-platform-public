import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

public class MongoDBConnection {
    public static void main(String[] args) {
        // MongoDB connection string
        // Replace with your MongoDB connection string (e.g., from MongoDB Atlas or local instance)
        String connectionString = "mongodb://localhost:27017";
        
        try {
            // Create MongoClient
            MongoClient mongoClient = MongoClients.create(connectionString);
            
            // Connect to the database
            MongoDatabase database = mongoClient.getDatabase("myDatabase");
            
            // Get a collection
            MongoCollection<Document> collection = database.getCollection("myCollection");
            
            // Example: Insert a sample document
            Document document = new Document("name", "John Doe")
                    .append("age", 30)
                    .append("city", "New York");
            collection.insertOne(document);
            
            System.out.println("Successfully connected to MongoDB and inserted a document!");
            
            // Example: Query the collection
            Document foundDocument = collection.find(new Document("name", "John Doe")).first();
            if (foundDocument != null) {
                System.out.println("Found document: " + foundDocument.toJson());
            }
            
            // Close the connection
            mongoClient.close();
            
        } catch (Exception e) {
            System.err.println("Error connecting to MongoDB: " + e.getMessage());
            e.printStackTrace();
        }
    }
}