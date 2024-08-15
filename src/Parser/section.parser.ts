import { extractSpotifyID } from "@/Utils/getSpotifyId";
import type { Sections } from "@/Interfaces/Sections";
export function sectionParser(body: any): Sections {
  const { data } = body;
  const browseSection = data?.browseSection;
  const sectionData = browseSection?.data;
  const title = sectionData?.title?.transformedLabel;
  const pagingInfo = {
    nextOffSet: browseSection?.sectionItems?.pagingInfo?.nextOffset,
  };
  const items = browseSection?.sectionItems?.items?.map((item: any) => {
    const content = item?.content?.data;
    const title = content?.name;
    const type = content?.__typename;
    const playlists = [];
    const albums = [];
    if (type === "Playlist") {
      const playlist = fetchPlaylist(content);
      playlists.push(playlist);
    } else if (type === "Album") {
      const album = fetchAlbum(content);
      albums.push(album);
    }
    return {
      title,
      albums: albums[0],
      playlists: playlists[0],
    };
  });
  return {
    title,
    pagingInfo,
    items,
  };
}

function fetchPlaylist(content: any) {
  const description = content?.description;
  const images = content?.images?.items[0]?.sources?.at(-1)?.url;
  const format = content?.format;
  const owner = {
    name: content?.ownerV2?.data?.name,
    type: content?.ownerV2?.data?.__typename,
  };
  const id = extractSpotifyID(content?.uri);
  return {
    description,
    images,
    format,
    owner,
    id,
  };
}

export function fetchAlbum(content: any) {
  const title = content?.name;
  const id = extractSpotifyID(content?.uri);
  const artwork = content?.coverArt?.sources?.at(-1)?.url;
  const artists = content?.artists?.items?.map((a: any) => ({
    name: a.profile?.name,
    id: extractSpotifyID(a?.uri),
  }));
  return {
    title,
    id,
    artists,
    artwork,
  };
}
