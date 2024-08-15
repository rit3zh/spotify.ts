export function createSpotifyAuthorizationContext(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}
