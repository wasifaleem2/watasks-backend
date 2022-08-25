// import and use mongoose
const mongoose = require("mongoose");

const connect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    });
    //use await for con.connection.host
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connect;
