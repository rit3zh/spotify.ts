import { Search } from "../Interfaces/Search";
import { extractSpotifyID } from "../Utils/getSpotifyId";

export function searchParser(body: any): Search {
  const { data } = body;
  const searchV2 = data?.searchV2;

  const preRelease: any[] = [];
  const albums: any[] = [];
  searchV2?.albumsV2?.items?.map((albumItem: any) => {
    const album = albumItem?.data;
    const type = albumItem?.__typename;
    if (type === "PreReleaseResponseWrapper") {
      const pre = fetchPreReleaseAlbum(album);
      preRelease.push(pre);
    } else {
      const al = fetchAlbum(album);
      albums.push(al);
    }
  });
  const artist = searchV2?.artists?.items?.map((item: any) => {
    return fetchArtist(item?.data);
  });
  const playlists = searchV2?.playlists?.items?.map((item: any) => {
    const list = item?.data;
    return fetchPlaylist(list);
  });
  const tracks = searchV2?.tracksV2?.items?.map((item: any) => {
    const song = item?.item?.data;
    return fetchTrack(song);
  });
  const genres = searchV2?.genres?.items?.map((item: any) => {
    const genre = item?.data;
    return fetchGenre(genre);
  });
  const user = searchV2?.users?.items?.map((item: any) => {
    return fetchUser(item);
  });
  const podcasts = searchV2?.podcasts?.items?.map((item: any) => {
    return fetchPodcast(item?.data);
  });
  const topResultsV2 = searchV2?.topResultsV2?.itemsV2?.map((i: any) => {
    return fetchTopResult(i?.item?.data);
  });
  return {
    tracks,
    artist,
    genres,
    user,
    podcasts,
    topResults: topResultsV2,
    playlists,
    albums: {
      preRelease,
      items: albums,
    },
  };
}

function fetchTopResult(content: any) {
  const type = content?.__typename;
  const artist: any[] = [];
  const track: any[] = [];
  const list: any[] = [];
  if (type === "Artist") {
    const a = fetchArtist(content);
    artist.push(a);
  } else if (type === "Track") {
    const t = fetchTrack(content);
    track.push(t);
  } else if (type === "Playlist") {
    const p = fetchPlaylist(content);
    list.push(p);
  }
  return {
    artist,
    track,
    list,
  };
}

function fetchPodcast(content: any) {
  const title = content?.name;
  const type = content?.__typename;
  if (type === "NotFound") return;
  const mediaType = content?.mediaType;
  const id = extractSpotifyID(content?.uri);
  const image = content?.coverArt?.sources?.at(-1)?.url;
  const publisher = content?.publisher?.name;
  return {
    title,
    id,
    type,
    image,
    publisher,
    mediaType,
  };
}
function fetchUser(content: any) {
  const user = content?.data;
  const name = user?.displayName;

  const username = user?.username;
  const type = user?.__typename;
  if (type === "NotFound") return;
  const id = extractSpotifyID(user?.uri);
  const image = user?.avatar?.sources?.at(-1)?.url;
  return {
    id,
    name,
    username,
    type,
    image,
  };
}

function fetchGenre(content: any) {
  const type = content?.__typename;
  if (type === "NotFound") return;
  const image = content?.image?.sources?.at(-1)?.url;
  const name = content?.name;
  const id = extractSpotifyID(content?.uri);
  return {
    name,
    id,
    image,
    type,
  };
}
function fetchPlaylist(content: any) {
  const type = content?.__typename;
  if (type === "NotFound") return;
  const title = content?.name;
  const id = extractSpotifyID(content?.uri);
  const format = content?.format;
  const description = content?.description;
  const image = content?.images?.items[0]?.sources?.at(0)?.url;

  const _owner = content?.ownerV2?.data;
  const owner = {
    name: _owner.name,
    id: extractSpotifyID(_owner?.uri),
    image: _owner?.avatar?.sources?.at(-1).url,
  };

  return {
    owner,
    title,
    id,
    format,
    description,
    image,
    type,
  };
}

function fetchPreReleaseAlbum(content: any) {
  const album = content?.preReleaseContent;
  const title = album?.name;
  const type = content?.__typename;
  if (type === "NotFound") return;
  const artwork = album?.coverArt?.sources?.at(-1)?.url;
  const id = extractSpotifyID(album?.uri);
  const timezone = content?.timezone;
  const date = content?.releaseDate?.isoString;
  return {
    title,
    type,
    artwork,
    id,
    date,
    timezone,
  };
}

function fetchTrack(track: any) {
  const title = track?.name;
  const album = {
    id: extractSpotifyID(track?.albumOfTrack?.uri),
    artwork: track?.albumOfTrack?.coverArt?.sources?.at(-1)?.url,
    title: track?.albumOfTrack?.name,
  };
  const artists = track?.artists?.items?.map((a: any) => ({
    name: a.profile?.name,
    id: extractSpotifyID(a?.uri),
  }));
  const duration = track?.duration?.totalMilliseconds;
  const id = track?.id;
  const contentRating = track?.contentRating?.label;
  return {
    title,
    album,
    artists,
    duration,
    id,

    contentRating,
  };
}

function fetchAlbum(_latest: any) {
  if (_latest?.__typename === "NotFound") return;
  return {
    title: _latest?.name,
    id: extractSpotifyID(_latest?.uri),
    artwork: _latest?.coverArt?.sources?.at(-1)?.url,
    date: _latest?.date?.year,
    type: _latest?.__typename,
  };
}

function fetchArtist(content: any) {
  const type = content?.__typename;
  if (type === "NotFound") return;
  const name = content?.profile?.name;
  const id = extractSpotifyID(content?.uri);
  const verified = content?.profile?.verified;
  const image = content?.visuals?.avatarImage?.sources?.at(0)?.url;
  return {
    name,
    id,
    verified,
    type,
    image,
  };
}
