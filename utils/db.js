const mongoose = require('mongoose');


const connectDB = async(uri) => {
    try {
        // console.log("Uri is", uri);
        await mongoose.connect(uri)
        console.log("Connection to Database Successfull")
    } catch (error) {
        console.log(error)
        process.exit(0);
    }
}



module.exports = connectDB;