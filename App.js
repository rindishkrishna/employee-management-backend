const express = require("express");
const app =express();
const logger =require('./Startup/Logging');
const cors= require('cors');
require('./Startup/Config')();
require('./Startup/Prod')(app);
require('./Startup/Db')();
require('./Startup/Router')(app);
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const port = process.env.PORT;
app.listen(port,()=>{
logger.info(`listening on ${port}`)
});

