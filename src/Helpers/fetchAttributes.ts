interface AttributesInterface {
  key: string;
  value: string;
}

export function fetchPlaylistAttributes(attributes: AttributesInterface[]) {
  const HEADER_IMAGE_URL: string = `header_image_url_desktop`;

  const filter = attributes?.filter(
    (attribute) => attribute?.key === HEADER_IMAGE_URL
  );
  return filter[0]?.value;
}
