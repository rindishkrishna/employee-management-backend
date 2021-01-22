const express = require("express");
const app =express();
const logger =require('./Startup/Logging');
const cors= require('cors');
app.use(cors());

require('./Startup/Config')();
require('./Startup/Prod')(app);
require('./Startup/Db')();
require('./Startup/Router')(app);

const port = process.env.PORT;
app.listen(port,()=>{
logger.info(`listening on ${port}`);
});

