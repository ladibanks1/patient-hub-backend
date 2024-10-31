import mongoose from "mongoose";
import "dotenv/config";


const uri = process.env.MONGO_URI;
const connectToDatabase = async() => {
    try {
        await mongoose.connect(`${uri}patientHub`)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}


export const disconnectFromDatabase = async() => {
    try {
        await mongoose.disconnect()
        console.log("Disconnected from MongoDB")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }

}

export default connectToDatabase