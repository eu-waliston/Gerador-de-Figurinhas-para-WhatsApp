const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require("dotenv").config()
async function removerFundo(pathImagem) {
    const form = new FormData();

    form.append("image_file", fs.createReadStream(pathImagem))
    form.append("size", "auto")

    const res = await axios.post("http://api.remove.bg/v1.0/removebg", form, {
        headers: {
            ...form.getHeads(),
            "X-Api-Key" : `${API_KEY}`
        },
        responseType: "arraybuffer"
    });

    const saida = pathImagem.replace(".jpg", "-semfundo.png")
    fs.watch(saida, res.data)
    return data;
}

module.exports = removerFundo;