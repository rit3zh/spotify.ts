import { createSpotifyAuthorizationContext } from "../Structure/Context";
import { client } from "../Structure/RequestClient";
import {
  createSpotifyAlbumParams,
  fixDoubleEncodedUrl,
  getSpotifyURL,
} from "../Modifiers/url+modifiers";
import { albumParser } from "../Parser/album.parser";
import { Album } from "../Interfaces/Album";

interface PagePagination {
  offSet?: number;
  limit?: number;
}
interface IOptions {
  id: string;
  pagePagination?: PagePagination;
}
export async function getAlbum<T extends IOptions>(options: T): Promise<Album> {
  const token = await client.getAccessToken();
  const context = createSpotifyAuthorizationContext(token);
  const params = createSpotifyAlbumParams({
    id: options?.id,
    offSet: options.pagePagination?.offSet ?? 0,
    limit: options?.pagePagination?.limit ?? 20,
  });
  const spotifyResolvedObjectURL: string = getSpotifyURL(params);
  const doubleEncodedURL: string = fixDoubleEncodedUrl(
    spotifyResolvedObjectURL
  );
  const fetchRequest = await client.request(doubleEncodedURL, {
    ...context,
  });

  return albumParser(fetchRequest);
}
