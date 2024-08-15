import { createSpotifyAuthorizationContext } from "../Structure/Context";
import { client } from "../Structure/RequestClient";
import {
  createSpotifySectionParams,
  fixDoubleEncodedUrl,
  getSpotifyURL,
} from "../Modifiers/url+modifiers";
import { sectionParser } from "../Parser/section.parser";
import type { Sections } from "../Interfaces/Sections";

interface PagePagination {
  offSet?: number;
  limit?: number;
}
interface IOptions {
  sectionId: string;
  pagePagination?: PagePagination;
}

export async function getSections<T extends IOptions>(
  options: T
): Promise<Sections> {
  const token = await client.getAccessToken();
  const context = createSpotifyAuthorizationContext(token);
  const params = createSpotifySectionParams({
    id: options?.sectionId,
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
  return sectionParser(fetchRequest);
}
