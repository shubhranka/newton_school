const mongoose = require('mongoose')
// const uri = process.env.mongouri; 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log("Connected to mongodb database")
  
// });
