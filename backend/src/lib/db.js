import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName :"we-chat-database"
        });

        console.log(`Success Connect Database ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`Failed Connect Database ${error.message}`)
    }
}

export default connectDB