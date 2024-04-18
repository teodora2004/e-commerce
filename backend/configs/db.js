import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('success')
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;