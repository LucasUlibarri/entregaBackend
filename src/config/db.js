import mongoose from "mongoose"


const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.URI_MONGODB)
        console.log('Conectado con MongDB!')
    } catch (error) {
        console.log("Error al conectar con MongoDB")
        console.log(error)
    }
}

export default connectMongoDB;