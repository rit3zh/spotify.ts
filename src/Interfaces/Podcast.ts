export interface Podcast {
  name?: string;
  image?: string;
  publisher?: string;
  description?: string;
  type?: string;
  id?: string;
  rating?: number | undefined;
  topics?: Topics[];
}
interface Topics {
  name?: string;
  id?: string;
}
