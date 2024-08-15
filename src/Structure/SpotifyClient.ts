import * as Constant from "./Constant";
export default class SpotifyClient {
  accessToken?: string;

  constructor(options?: any) {}

  async getAccessToken<T>(): Promise<string> {
    const response = await this.request(Constant.ACCESS_TOKEN_URL);
    const fetchedToken = response?.accessToken as string;
    this.accessToken = fetchedToken;
    return fetchedToken;
  }

  async request(url: string, body?: BodyInit | any) {
    const request = await fetch(url, {
      headers: {
        ...body,
      },
    });
    const response = await request.json();
    return response as any;
  }
}
