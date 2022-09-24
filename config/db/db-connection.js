module.exports.connectDatabase = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to database ${process.env.NODE_ENV}`)
  } catch (error) {
    console.log(`Some Error From Database Connection, Error`+ `${error}`);
  }
}