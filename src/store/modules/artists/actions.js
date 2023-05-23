export default {
  async registerArtist(context, data) {
    const { userId } = context.rootGetters;
    const artistData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    // const URL = `https://artsleuth-requests-4684a-default-rtdb.asia-southeast1.firebasedatabase.app/artists/${userId}.json`;

    // const response = await fetch(URL, {
    //   method: 'PUT',
    //   body: JSON.stringify(artistData),
    // });

    // const responseData = await response.json();

    // if (!response.ok) {
    // }

    context.commit('registerArtist', {
      ...artistData,
      id: userId,
    });
  },
  async loadArtists(context, payload) {
    // 確認是否要更新資料，不需要就直接返回
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch('https://artsleuth-requests-4684a-default-rtdb.asia-southeast1.firebasedatabase.app/artists.json');
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const artists = [];

    Object.keys(responseData).forEach((key) => {
      const artist = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };

      artists.push(artist);
    });

    context.commit('setArtists', artists);
    // cache data
    context.commit('setFetchTimestamp');
  },
};
