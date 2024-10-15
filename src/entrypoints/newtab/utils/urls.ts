import validUrl from "valid-url";

function makeBrowsableURL(url: string): string | null {
  if (validUrl.isUri(url)) {
    return null;
  }

  // Check if the URL starts with a protocol
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  // Check if the URL is an IP address
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipPattern.test(url)) {
    return `http://${url}`;
  }

  // Otherwise, assume it's a domain name
  return `http://${url}`;
}

export { makeBrowsableURL };
