function gitApiRequest(data, headers) {
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
}

const topLenguagesQuery = (variables, token) => {};

module.exports = {
  gitApiRequest,
};
