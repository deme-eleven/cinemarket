import { isRegExp } from "util";

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

  getRightsRequest: async (accessToken: string): Promise<any> => {
    let response = await fetch(
      "https://api.cinemarket-dev.com/api/sellers/4f4da566-19a0-4eff-9952-9d2d4d2900f3/movies/036dbdf4-294f-4473-b088-5b7f6d29d4eb/availableRights",
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

  getRights: async (): Promise<any> => {
    let accessToken = await api.getToken();
    let data = await api.getRightsRequest(accessToken);
    // let accessToken = localStorage.getItem("accessToken");
    // if (!accessToken) {
    //   accessToken = await api.getToken();
    //   if (accessToken) {
    //     localStorage.setItem("accessToken", accessToken);
    //   }
    //   return await api.getRightsRequest(accessToken!);
    // } else {
    //   let data = await api.getRightsRequest(accessToken!);
    //   if (data.message === "Access token has expired.") {
    //     accessToken = await api.getToken();
    //     if (accessToken) {
    //       localStorage.setItem("accessToken", accessToken);
    //     }
    //     let data = await api.getRightsRequest(accessToken!);
    //     return data;
    //   } else {
    //     return data;
    //   }
    // }
    return data;
  },
};

export default api;
