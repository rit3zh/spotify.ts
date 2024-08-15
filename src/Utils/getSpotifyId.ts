export function extractSpotifyID(uri: string) {
  if (!uri?.startsWith("spotify:")) {
    throw new Error("Invalid Spotify URI");
  }

  const parts = uri.split(":");

  if (parts.length === 3) {
    return parts[2];
  } else {
    throw new Error("Invalid Spotify URI format");
  }
}
