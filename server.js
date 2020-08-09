const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const mongoose = require('mongoose');
const dbConnection = process.env.DATABASE.replace(
    '<PASSWORD>',process.env.DATABASE_PASSWORD
)

mongoose.connect(dbConnection, {useNewUrlParser: true,useCreateIndex:true,useFindAndModify:false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')  
});

const app = require('./app');

app.get('/',(req, res)=>{
  res.send(😀)
});
const port  = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Sever is lisetnning on port ${port}`)
})