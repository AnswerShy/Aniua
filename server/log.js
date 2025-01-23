const logWithTime = (message, type = 'log') => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0'); // Ensure two digits
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timestamp = `${hours}:${minutes}:${seconds}`;

  switch (type) {
    case 'log':
      console.log(`[${timestamp}] ${message}`);
      break;
    case 'warn':
      console.warn(`[${timestamp}] ${message}`);
      break;
    case 'error':
      console.error(`[${timestamp}] ${message}`);
      break;
  }
};

export default logWithTime;
