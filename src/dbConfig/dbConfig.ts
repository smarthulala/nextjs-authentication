import mongoose from 'mongoose'

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.log('MongoDB connected successfully')
    })

    connection.on('error', (error) => {
      console.log(
        'MongoDB connection failed, Please make sure MongoDB is running' + error
      )
      process.exit(1)
    })
  } catch (error) {
    console.log('Something goes wrong')
    console.log(error)
  }
}
