const axios = require('axios');

// Substitua com suas chaves reais
const USER_ID = '13a15845-4326-46b0-85f9-16262514dcf7';
const API_KEY = '288bbc53-44c7-4fc1-8aa3-852431adf38b';

const gerarImagem = async (html, css, width = '1200', height = '500') => {
  const payload = {
    html,
    css,
    google_fonts: 'Poppins',
    viewport_width: width,
    viewport_height: height,
    device_scale: '2'
  };

  try {
    const { data } = await axios.post(
      'https://hcti.io/v1/image',
      payload,
      {
        auth: {
          username: USER_ID,
          password: API_KEY
        }
      }
    );
    return data.url;
  } catch (err) {
    console.error('Erro ao gerar imagem:', err.response?.data || err.message);
    return null;
  }
};


const Welcome = async (profilePic, userNumber, groupName, memberCount) => {
  const html = `
    <html>
      <body>
        <div class="wrapper">
          <div class="card">
            <div class="header">
              <h2>🎉 Novo Membro Chegou!</h2>
            </div>
            <div class="content">
              <img class="avatar" src="${profilePic}" />
              <div class="info">
                <h1>${userNumber}</h1>
                <p>Entrou no grupo <span class="group">${groupName}</span></p>
                <p class="member">👥 Você é o <strong>#${memberCount}</strong> membro!</p>
              </div>
            </div>
            <div class="footer">
              <p>🌟 Aproveite e participe das conversas!</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const css = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #ff9a9e, #fad0c4);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .wrapper {
      width: 1200px;
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      background: #ffffffdd;
      border-radius: 24px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.2);
      overflow: hidden;
      width: 1000px;
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    .header {
      background: linear-gradient(90deg, #ff6a88, #ff99ac);
      padding: 20px;
      color: #fff;
    }

    .header h2 {
      font-size: 32px;
      font-weight: 600;
    }

    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
      padding: 40px 20px;
    }

    .avatar {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 6px solid #ff6a88;
      object-fit: cover;
      box-shadow: 0 0 20px rgba(255, 106, 136, 0.5);
    }

    .info h1 {
      font-size: 38px;
      color: #333;
      font-weight: bold;
    }

    .info p {
      font-size: 22px;
      color: #555;
      margin-top: 10px;
    }

    .info .group {
      font-weight: bold;
      color: #ff4d6d;
    }

    .info .member {
      margin-top: 16px;
      font-size: 20px;
      color: #222;
    }

    .footer {
      background: #fceef5;
      padding: 20px;
      font-size: 20px;
      color: #444;
      font-style: italic;
    }
  `;

  return await gerarImagem(html, css);
};

module.exports.Ping = async (backgroundImage, characterImage, botName, pingSpeed, uptime, totalGroups, totalUsers) => {
  const html = `
    <html>
      <body>
        <div class="banner">
          <div class="character-container">
            <img class="character" src="${characterImage}" />
          </div>
          <div class="info-boxes left-boxes">
            <div class="box groups-box"><h3>Total de Grupos 👥</h3><p>${totalGroups}</p></div>
            <div class="box users-box"><h3>Total de Usuários 🌟</h3><p>${totalUsers}</p></div>
          </div>
          <div class="info-boxes right-boxes">
            <div class="box speed-box"><h3>Velocidade ⚡</h3><p>${pingSpeed}s</p></div>
            <div class="box uptime-box"><h3>Tempo Online ⏰</h3><p>${uptime}</p></div>
          </div>
        </div>
      </body>
    </html>
  `;

  const css = `body { margin: 0; padding: 0; font-family: 'Poppins', sans-serif; background: #ffe6f0; }
    .banner { width: 1200px; height: 500px; background: url('${backgroundImage}') center/cover no-repeat; display: flex; align-items: center; justify-content: space-between; position: relative; overflow: hidden; }
    .character-container { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1; }
    .character { width: 320px; height: 320px; object-fit: contain; border-radius: 50%; border: 6px solid #fff; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); }
    .info-boxes { display: flex; flex-direction: column; gap: 20px; z-index: 2; }
    .left-boxes { margin-left: 30px; }
    .right-boxes { margin-right: 30px; }
    .box { background: rgba(255, 255, 255, 0.9); padding: 25px; border-radius: 20px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); text-align: center; width: 220px; backdrop-filter: blur(6px); }
    .groups-box, .users-box { background: rgba(255, 182, 193, 0.85); }
    .groups-box h3, .users-box h3 { font-size: 18px; color: #ff4d6d; margin: 0 0 8px; }
    .groups-box p, .users-box p { font-size: 20px; color: #333; font-weight: 600; margin: 0; }
    .speed-box, .uptime-box { background: rgba(255, 182, 193, 0.85); width: 250px; padding: 30px; }
    .speed-box h3, .uptime-box h3 { font-size: 20px; color: #ff4d6d; margin: 0 0 10px; }
    .speed-box p, .uptime-box p { font-size: 24px; color: #333; font-weight: 600; margin: 0; }`;

  return await gerarImagem(html, css);
};

const Play = async (thumbnailImage, songName, artistName, duration) => {
  const html = `
    <html>
      <body>
        <div class="container">
          <div class="card">
            <img src="${thumbnailImage}" class="cover" />
            <div class="details">
              <h1 class="title">🎧 ${songName}</h1>
              <h2 class="artist">por ${artistName}</h2>
              <div class="duration">⏱️ Duração: ${duration}</div>
              <div class="progress">
                <div class="bar"></div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const css = `
    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #1f1c2c, #928dab);
    }

    .container {
      width: 1200px;
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      display: flex;
      background: rgba(255, 255, 255, 0.07);
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      backdrop-filter: blur(10px);
      max-width: 1000px;
    }

    .cover {
      width: 400px;
      height: 400px;
      object-fit: cover;
      border-right: 4px solid #fff;
    }

    .details {
      padding: 40px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 560px;
    }

    .title {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .artist {
      font-size: 24px;
      color: #ffdd57;
      margin-bottom: 20px;
    }

    .duration {
      font-size: 18px;
      margin-bottom: 30px;
      color: #eee;
    }

    .progress {
      width: 100%;
      height: 10px;
      background: #333;
      border-radius: 10px;
      overflow: hidden;
    }

    .bar {
      width: 50%;
      height: 100%;
      background: linear-gradient(90deg, #00d2ff, #3a7bd5);
      box-shadow: 0 0 12px #00d2ff;
    }
  `;

  return await gerarImagem(html, css);
};

module.exports = { Play, Welcome};
