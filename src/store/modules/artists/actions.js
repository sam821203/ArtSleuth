export default {
  async registerArtist(context, data) {
    const userId = context.rootGetters.userId;
    const artistData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const URL = `https://artsleuth-requests-4684a-default-rtdb.asia-southeast1.firebasedatabase.app/artists/${userId}.json`;

    const response = await fetch(URL, {
      method: 'PUT',
      body: JSON.stringify(artistData),
    });

    // const responseData = await response.json();

    if (!response.ok) {
      //error...
    }

    context.commit('registerArtist', {
      ...artistData,
      id: userId
    });
  }
}