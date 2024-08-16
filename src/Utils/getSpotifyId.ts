export function extractSpotifyID(uri: string) {
  if (!uri?.startsWith("spotify:"))
    return "Either the value is undefined or not a valid Spotify id.";
  const parts = uri.split(":");

  if (parts.length === 3) {
    return parts[2];
  } else {
    throw new Error("Invalid Spotify URI format");
  }
}
