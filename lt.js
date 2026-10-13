const localtunnel = require('localtunnel');
(async () => {
  try {
    const tunnel = await localtunnel({ port: 3000 });
    console.log("TUNNEL URL:", tunnel.url);
    tunnel.on('close', () => {
      console.log("TUNNEL CLOSED");
    });
  } catch (err) {
    console.error("Tunnel failed", err);
  }
})();
