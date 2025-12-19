import tls from "tls";

export function checkSSLStatus(domain) {
  return new Promise((resolve) => {
    const socket = tls.connect(
      443,
      domain,
      { servername: domain, timeout: 5000 },
      () => {
        const cert = socket.getPeerCertificate();
        socket.end();

        resolve({
          valid: true,
          issuer: cert.issuer?.O || null,
          valid_from: cert.valid_from,
          valid_to: cert.valid_to
        });
      }
    );

    socket.on("error", (err) => {
      resolve({
        valid: false,
        error: err.message
      });
    });
  });
}

