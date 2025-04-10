const express = require('express');
const cosr = require("cors")
const helmet = require("helmet")
require("dotenv").config()

const app = express();

// Servir a página HTML
app.use(express.static('public'));

//middleware
app.use(cosr("*"))
app.use(helmet())

//rotas
const StickerRouter = require("./routes/sticker-routes");
app.use("/", StickerRouter)

//Server 
app.listen(process.envPORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
});
