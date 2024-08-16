import { Podcast } from "../Interfaces/Podcast";
import {
  createSpotifyPodcastParams,
  fixDoubleEncodedUrl,
  getSpotifyURL,
} from "../Modifiers/url+modifiers";
import { parsePodcast } from "../Parser/podcast.parser";
import { createSpotifyAuthorizationContext } from "../Structure/Context";
import { client } from "../Structure/RequestClient";

export async function getPodcast<T extends string>(id: T): Promise<Podcast> {
  const token = await client.getAccessToken();
  const context = createSpotifyAuthorizationContext(token);
  const params = createSpotifyPodcastParams({
    id,
  });
  const spotifyResolvedObjectURL: string = getSpotifyURL(params);
  const doubleEncodedURL: string = fixDoubleEncodedUrl(
    spotifyResolvedObjectURL
  );
  const fetchRequest = await client.request(doubleEncodedURL, {
    ...context,
  });
  return parsePodcast(fetchRequest);
}
