export function getParamsFromUrl(url: string): {
  operationName: string;
  variables: Record<string, any>;
  extensions: Record<string, any>;
} {
  const urlObj = new URL(url);

  const operationName = urlObj.searchParams.get("operationName") || "";

  const variables = JSON.parse(
    decodeURIComponent(urlObj.searchParams.get("variables") || "{}")
  );
  const extensions = JSON.parse(
    decodeURIComponent(urlObj.searchParams.get("extensions") || "{}")
  );

  return {
    operationName,
    variables,
    extensions,
  };
}

export function getSpotifyURL<T extends Record<string, any>>(
  params: T
): string {
  const baseURL = "https://api-partner.spotify.com/pathfinder/v1/query";

  const urlObj = new URL(baseURL);

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "object") {
      urlObj.searchParams.set(key, encodeURIComponent(JSON.stringify(value)));
    } else {
      urlObj.searchParams.set(key, String(value));
    }
  }

  return urlObj.toString();
}
interface Pagination {
  offset: number;
  limit: number;
}

interface Params {
  id: string;
  pagePagination: Pagination;
  sectionPagination: Pagination;
}

export function createSpotifyParams(params: Params): Record<string, any> {
  const { id, pagePagination, sectionPagination } = params;

  return {
    operationName: "browsePage",
    variables: {
      pagePagination: {
        offset: pagePagination.offset,
        limit: pagePagination.limit,
      },
      sectionPagination: {
        offset: sectionPagination.offset,
        limit: sectionPagination.limit,
      },
      uri: `spotify:page:${id}`,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          "177a4ae12a90e35d335f060216ce5df7864a228c6ca262bd5ed90b37c2419dd9",
      },
    },
  };
}
export function fixDoubleEncodedUrl(url: string): string {
  function decodeTwice(encodedStr: string): string {
    try {
      return decodeURIComponent(decodeURIComponent(encodedStr));
    } catch (e) {
      console.error("Error decoding URL:", e);
      return encodedStr;
    }
  }

  const urlObj = new URL(url);

  const variables = urlObj.searchParams.get("variables");
  const extensions = urlObj.searchParams.get("extensions");

  if (variables) {
    urlObj.searchParams.set("variables", decodeTwice(variables));
  }

  if (extensions) {
    urlObj.searchParams.set("extensions", decodeTwice(extensions));
  }

  return urlObj.toString();
}

export function createSpotifySectionParams(params: any) {
  return {
    operationName: "browseSection",
    variables: {
      pagination: { offset: params.offSet, limit: params.limit },
      uri: `spotify:section:${params.id}`,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          "8cb45a0fea4341b810e6f16ed2832c7ef9d3099aaf0034ee2a0ce49afbe42748",
      },
    },
  };
}

export function createSpotifyPlaylisrParams(params: any) {
  return {
    operationName: "fetchPlaylist",
    variables: {
      uri: `spotify:playlist:${params.id}`,
      offset: params.offSet,
      limit: params.limit,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          "76849d094f1ac9870ac9dbd5731bde5dc228264574b5f5d8cbc8f5a8f2f26116",
      },
    },
  };
}

export function createSpotifyAlbumParams(params: any) {
  return {
    operationName: "getAlbum",
    variables: {
      uri: `spotify:album:${params.id}`,
      locale: "",
      offset: params.offSet,
      limit: params.limit,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          "ea2ba83b1e7c59f47c829543609d99255f5a79ce8ad3b356f3660f22350fb1cb",
      },
    },
  };
}

export function createSpotifyArtistParams(params: any) {
  return {
    operationName: "queryArtistOverview",
    variables: {
      uri: `spotify:artist:${params.id}`,
      locale: "",
      includePrerelease: true,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          "bc0107feab9595387a22ebed6c944c9cf72c81b2f72a3d26ac055e4465173a1f",
      },
    },
  };
}

export function createSpotifySearchAllParams(params: any) {
  return {
    operationName: "searchDesktop",
    variables: {
      searchTerm: params.query,
      offset: params?.offSet,
      limit: params.limit,
      numberOfTopResults: params.topResults,
      includeAudiobooks: true,
      includeArtistHasConcertsField: false,
      includePreReleases: true,
      includeLocalConcertsField: false,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          "bd8eb4cb57ae6deeac1a7d2ebe8487b65d52e0b69387a2b51590c2471f5fd57e",
      },
    },
  };
}

export function createParamsFromURL(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const queryString = url.split("?")[1];

  if (queryString) {
    const pairs = queryString.split("&");
    pairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      if (key && value !== undefined) {
        params[key] = decodeURIComponent(value);
      }
    });
  }

  return params;
}
