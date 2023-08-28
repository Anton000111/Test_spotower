export const getDataFromForm = (form) => {
  const data = new FormData(form);
  const body = {};
  for (const [name,value] of data) {
    body[name] = value;
  }

  return body;
};
