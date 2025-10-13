import mongoose from 'mongoose';

const connect = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
    });
    console.log('MongoDB conectado');
  } 
  catch (error) {
    console.error('Erro de conexão MongoDB:', error);
    process.exit(1);
  }
}

export default { connect };