export default {
  contactArtist(context, payload) {
    const newMessage = {
      id: new Date().toISOString(),
      artistId: payload.artistId,
      userEmail: payload.email,
      userMessage: payload.message,
    }

    context.commit('addMessage', newMessage);
  }
}