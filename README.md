# 🤖 Gerador de Figurinhas para WhatsApp

Este projeto é um bot com interface web simples que permite enviar imagens e transformá-las em figurinhas do WhatsApp com remoção automática de fundo!

### 🧩 Funcionalidades

- Interface web HTML simples
- Remoção de fundo automática via [remove.bg](https://www.remove.bg/)
- Criação de figurinha em `.webp`
- Envio direto da figurinha para um número de WhatsApp
- Comando personalizado `/figurinha` no próprio WhatsApp

---

## 🔧 Tecnologias Usadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [whatsapp-web.js](https://wwebjs.dev/)
- [Multer](https://github.com/expressjs/multer) (upload de imagens)
- [Sharp](https://sharp.pixelplumbing.com/)
- [remove.bg API](https://www.remove.bg/api)

---

## 💻 Interface Web

Tela simples para envio da imagem:

![Formulário Web](./print-form.png)

---

## 🚀 Como Rodar Localmente

1. Clone o projeto:

```bash
git clone https://github.com/seu-usuario/whatsapp-sticker-bot.git
cd whatsapp-sticker-bot
