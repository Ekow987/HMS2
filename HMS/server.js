const express =require ('express')
const app = express ();
const http = require ('http');
const mongoose =require('mongoose');
require ('dotenv').config();
const opdsController = require('./controllers/opds.js');
const drugsController = require('./controllers/drugs.js');
const assignsController = require('./controllers/assigns.js');
const wardsController = require('./controllers/wards.js');


const port = process.env.PORT|| 5000;

app.set ('port', port);
http.createServer(app);

const uri = process.env.dblink;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
mongoose
  .connect(uri, options)
  .catch((error) => console.log('Database Error:' + error));
/*handleError(error));*/
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDb database connection established successfully');
});

app.use(express.json());
app.use('/opds',opdsController);
app.use('/drugs',drugsController);
app.use('/assigns',assignsController);
app.use('/wards',wardsController);



app.listen(port ,()=>{console.log(`listen on port ${port}`)});