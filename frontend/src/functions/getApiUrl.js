const server_url = process.env.REACT_APP_SERVER_URL;

export const getApiUrl = (endpoint) => {
  const base = server_url && server_url.includes('/api/Admin') ? server_url : `${server_url}/api/Admin`;
  return `${base}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
