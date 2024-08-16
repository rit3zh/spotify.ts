import { extractSpotifyID } from "../Utils/getSpotifyId";
import type { Playlist } from "../Interfaces/Playlist";
import { fetchPlaylistAttributes } from "../Helpers/fetchAttributes";
export function playlistParser(body: any): Playlist {
  const { data } = body;
  const playlistV2 = data?.playlistV2;
  const type = playlistV2?.__typename;
  const description = playlistV2?.description;
  const permission = playlistV2?.basePermission;
  const followers = playlistV2?.followers;
  const owner = {
    name: playlistV2?.ownerV2?.data?.name,
    id: extractSpotifyID(playlistV2?.ownerV2?.data?.uri),
    username: playlistV2?.ownerV2?.data?.username,
    type: playlistV2?.ownerV2?.data?.__typename,
    image: playlistV2?.ownerV2?.data?.avatar?.sources?.at(-1)?.url,
  };

  const format = playlistV2?.format;
  const title = playlistV2?.name;
  const id = extractSpotifyID(playlistV2?.uri);
  const headerImage = fetchPlaylistAttributes(playlistV2?.attributes) ?? "";

  const items = playlistV2?.content?.items?.map((item: any) => {
    const content = item?.itemV2?.data;
    if (!content?.uri) return;
    const addedAt = item?.addedAt?.isoString;
    const title = content?.name;
    const type = content?.__typename;
    const artists = content?.artists?.items?.map((a: any) => ({
      name: a.profile?.name,
      id: extractSpotifyID(a?.uri),
    }));
    const duration = content?.trackDuration?.totalMilliseconds;
    const id = extractSpotifyID(content?.uri);
    const attr = content;

    const album = {
      name: content?.albumOfTrack?.name,
      id: extractSpotifyID(content?.albumOfTrack?.uri),
      artwork: content?.albumOfTrack?.coverArt?.sources?.at(-1)?.url,
      artists: content?.albumOfTrack?.artists?.items?.map((a: any) => ({
        name: a?.profile?.name,
        id: extractSpotifyID(a?.uri),
      })),
    };
    return {
      addedAt,
      title,
      type,
      artists,
      album,
      id,
      duration,
    };
  });
  return {
    title,
    id,
    type,
    format,
    followers,
    owner,
    permission,
    description,
    items,
    headerImage,
  };
}
