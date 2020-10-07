const api = {
  getToken: async (): Promise<any> => {
    const refreshToken = "543f607b454a74d6088c009c5f9b40d4";
    let response = await fetch(
      "https://api.cinemarket-dev.com/api/refreshToken",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
    return response.accessToken;
  },

  getRightsRequest: async (
    accessToken: string,
    seller: string,
    movie: string
  ): Promise<any> => {
    let response = await fetch(
      `https://api.cinemarket-dev.com/api/sellers/${seller}/movies/${movie}/availableRights`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
    return response;
  },

  getRights: async (seller: string, movie: string): Promise<any> => {
    // although this isn't the right workflow in a production app
    // for our case we're simplifying it and always getting a new token
    let accessToken = await api.getToken();
    let data = await api.getRightsRequest(accessToken, seller, movie);
    return data;
  },
};

export default api;
