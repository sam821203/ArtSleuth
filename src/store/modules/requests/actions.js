export default {
  async contactArtist(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      userMessage: payload.message,
    };

    const response = await fetch(`https://artsleuth-requests-4684a-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.artistId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request!');
      throw error;
    }

    // 將 firebase 傳回來的 name 設置在 newRequest 的 id 裡
    newRequest.id = responseData.name;
    newRequest.artistId = payload.artistId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const artistId = context.rootGetters.userId;
    const response = await fetch(`https://artsleuth-requests-4684a-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${artistId}.json`);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch request!');
      throw error;
    }

    const requests = [];

    Object.keys(responseData).forEach((key) => {
      const request = {
        id: key,
        artistId,
        userEmail: responseData[key].userEmail,
        userMessage: responseData[key].userMessage,
      };

      requests.push(request);
    });

    context.commit('setRequests', requests);
  },
};
