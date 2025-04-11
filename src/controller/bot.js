const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const sharp = require('sharp');
const path = require('path');
require("dotenv").config()

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('🤖 Bot está online!');
});

client.on('message', async message => {
  if (message.hasMedia) {
    const media = await message.downloadMedia();

    if (media.mimetype.startsWith('image/')) {
      console.log('🖼️ Imagem recebida, processando...');

      const buffer = Buffer.from(media.data, 'base64');
      const imgInputPath = `./uploads/${Date.now()}.jpg`;
      const noBgPath = imgInputPath.replace('.jpg', '-nobg.png');
      const stickerPath = imgInputPath.replace('.jpg', '.webp');

      fs.writeFileSync(imgInputPath, buffer);

      try {
        // Remove o fundo
        const form = new FormData();
        form.append('image_file', fs.createReadStream(imgInputPath));
        form.append('size', 'auto');

        const response = await axios.post('https://api.remove.bg/v1.0/removebg', form, {
          headers: {
            ...form.getHeaders(),
            'X-Api-Key': `${API_KEY}`, // <-- Coloca tua chave da remove.bg
          },
          responseType: 'arraybuffer'
        });

        fs.writeFileSync(noBgPath, response.data);

        // Cria figurinha com sharp
        await sharp(noBgPath)
          .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .webp({ quality: 90 })
          .toFile(stickerPath);

        const stickerMedia = MessageMedia.fromFilePath(stickerPath);
        await message.reply(stickerMedia, undefined, { sendMediaAsSticker: true });

        console.log('✅ Figurinha enviada com sucesso!');

        // Limpa os arquivos temporários
        fs.unlinkSync(imgInputPath);
        fs.unlinkSync(noBgPath);
        fs.unlinkSync(stickerPath);
      } catch (error) {
        console.error('Erro ao processar a figurinha:', error.message);
        await message.reply('❌ Ocorreu um erro ao criar a figurinha.');
      }
    }
  }
});

client.initialize();
