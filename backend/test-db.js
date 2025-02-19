require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to MongoDB!');
        
        // Create a test document
        const testSchema = new mongoose.Schema({
            name: String,
            timestamp: { type: Date, default: Date.now }
        });
        
        const Test = mongoose.model('Test', testSchema);
        
        const testDoc = new Test({ name: 'Test Connection' });
        await testDoc.save();
        console.log('Successfully created test document!');
        
        // Clean up
        await Test.deleteMany({});
        console.log('Cleaned up test data');
        
        await mongoose.connection.close();
        console.log('Connection closed successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

testConnection();
