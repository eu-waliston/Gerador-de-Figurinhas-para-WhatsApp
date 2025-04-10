const express = require('express')
const multer = require('multer');
const sharp = require('sharp');
const upload = multer({dest: "upload/"});
const fs = require('fs');

const app = express();
const router = express.Router();

router.get("/", (req,res) => {
    try {
        res.status(200).send("Hello")
    } catch (error) {
        res.status(500).send("error")
    }
})
router.post("/figurinha", upload.single("imagem"), async(req,res) => {
    const inputPath = req.file.path;
    const outputPath = `src/figurinhas/${Date.now().webp}`

    try {
        await sharp(inputPath)
            .resize(512, 512, {fit: "contain", background: {r: 0, g: 0, b: 0, alpha: 0}})
            .webp({ quality: 80})
            .toFile(outputPath);

        fs.unlinkSync(inputPath); // limpa o upload temporario

        res.download(outputPath, () => {
            fs.unlinkSync(outputPath); // limpa a figurinha depois de baixar
        })
    } catch (err) {
        res.status(500).send("Erro ao criar figurinha")
    }
})

module.exports = router
