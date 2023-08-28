export const fetchApi = async (reducedUrl, options) => {
  return fetch(`${window.location.origin}/api${reducedUrl}`, options);
};
