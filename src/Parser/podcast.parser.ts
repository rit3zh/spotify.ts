import { Podcast } from "@/Interfaces/Podcast";
import { extractSpotifyID } from "@/Utils/getSpotifyId";

export function parsePodcast(body: any): Podcast {
  const { data } = body;
  const podcast = data?.podcastUnionV2;
  const name = podcast?.name;
  const image = podcast?.coverArt?.sources?.at(-1)?.url;
  const publisher = podcast?.publisher?.name;
  const description = podcast?.description;
  const type = podcast?.__typename;
  const id = podcast?.id;
  const rating = podcast?.rating?.averageRating?.average;
  const topics = podcast?.topics?.items?.map((item: any) => ({
    name: item?.title,
    id: extractSpotifyID(item?.uri),
  }));
  return {
    name,
    image,
    publisher,
    description,
    type,
    id,
    rating,
    topics,
  };
}
