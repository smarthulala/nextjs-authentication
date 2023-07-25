import mongoose, { mongo } from 'mongoose'

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.log('MongoDB is connected successful')
    })

    connection.on('error', (err) => {
      console.log('Failed to connect MongoDB', err)
      process.exit(1)
    })
  } catch (error: any) {
    console.log('Error when connect MongoDB', error.message)
  }
}
