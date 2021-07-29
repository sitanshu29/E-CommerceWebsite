const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

//app
const app = express();


//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log(`DB CONEECTED`))
    .catch(err => console.log(`DB Connection Error ${err}`));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser({ limit: "2mb" }));
app.use(cors());

//routes middleware
fs.readdirSync("./routes").map((r) =>
    app.use("/api", require("./routes/" + r))
);


//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on Port ${port}`));

