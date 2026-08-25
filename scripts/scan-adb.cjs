const net = require('net');

const targetIp = '192.168.1.42';

async function scanPorts() {
  console.log(`Scanning ports on ${targetIp}...`);
  // Check standard port 5555 first
  const portsToCheck = [5555];
  for (let p = 30000; p <= 48000; p += 1) {
    portsToCheck.push(p);
  }

  const batchSize = 250;
  for (let i = 0; i < portsToCheck.length; i += batchSize) {
    const batch = portsToCheck.slice(i, i + batchSize);
    const promises = batch.map(port => {
      return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(250);
        socket.on('connect', () => {
          socket.destroy();
          resolve(port);
        });
        socket.on('timeout', () => {
          socket.destroy();
          resolve(null);
        });
        socket.on('error', () => {
          socket.destroy();
          resolve(null);
        });
        socket.connect(port, targetIp);
      });
    });

    const results = await Promise.all(promises);
    const open = results.filter(Boolean);
    if (open.length > 0) {
      console.log(`Found open ADB ports:`, open);
      return open;
    }
  }

  console.log('No open ports found on 192.168.1.42');
  return [];
}

scanPorts().catch(console.error);
