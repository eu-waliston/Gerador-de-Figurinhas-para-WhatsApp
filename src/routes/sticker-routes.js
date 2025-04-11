const express = require('express')
const multer = require('multer');
const sharp = require('sharp');
const upload = multer({dest: "upload/"});
const fs = require('fs');

const app = express();
const router = express.Router();
app.use(express.static('public'));

router.get("/", (req,res) => {
    try {
        res.status(200).send("Hello")
    } catch (error) {
        res.status(500).send("error")
    }
})

//expect a file path and string with the imagem source
// locate the source path pls 
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

app.post('/enviar-figurinha', upload.single('imagem'), async (req, res) => {
    const numero = req.body.numero + '@c.us';
    const imgPath = req.file.path;
  
    try {
      const stickerPath = await sendFigurinha(imgPath);
      const media = require('whatsapp-web.js').MessageMedia.fromFilePath(stickerPath);
      await client.sendMessage(numero, media, { sendMediaAsSticker: true });
  
      fs.unlinkSync(imgPath);
      fs.unlinkSync(stickerPath);
  
      res.send('<h3>✅ Figurinha enviada com sucesso pro WhatsApp!</h3><a href="/">Voltar</a>');
    } catch (e) {
      console.error('Erro ao gerar figurinha:', e.message);
      res.status(500).send('❌ Erro ao gerar figurinha.');
    }
  });

module.exports = router
