export const MISSING_URL = 0,
    INVALID_URL = 1,
    CODE_EXECUTION = 2,
    BROWSER_OPENS_DIRECTLY = 3,
    BROWSER_LAUNCHES = 4,
    FAILED_TO_OPEN = 5;

export function classifyUrl(urlString) {
  let parsedUrl;
  
  try {
    parsedUrl = new URL(urlString);
  } catch (err) {
    return INVALID_URL;
  }

  const protocol = parsedUrl.protocol.toLowerCase();

  if (protocol === 'javascript:') {
    return CODE_EXECUTION;
  }

  if (['http:', 'https:', 'about:', 'blob:', 'data:', 'file:'].includes(protocol)) {
    return BROWSER_OPENS_DIRECTLY;
  }

  return BROWSER_LAUNCHES;
}
export const errorLink = (err) => `link-builder.html#err=${err}`;
export function openLink(url) {
    try {
        window.location.replace(url);
    } catch (e) {
        window.location.replace( errorLink(FAILED_TO_OPEN) );
    }
}
