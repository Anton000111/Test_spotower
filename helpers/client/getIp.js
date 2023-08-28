let ip;

export const getIp = async () => {
  if (ip) return ip;

  const response = await fetch('https://api.db-ip.com/v2/free/self');

  const { ipAddress } = await response.json();

  ip = ipAddress;

  return ipAddress;
};
