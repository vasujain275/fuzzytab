function isValidURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol (optional)
      "((([a-zA-Z0-9$-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+)(:[0-9]+)?@)?" + // username:password@ (optional)
      "((\\[(IPv6:[0-9a-fA-F:.]+|[0-9a-fA-F:.]+)\\])|" + // IPv6 (optional)
      "(([a-zA-Z0-9$-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+\\.)*" + // subdomain (optional)
      "(([a-zA-Z0-9$-_.+!*'(),;:&=]|%[0-9a-fA-F]{2}){2,}))" + // domain
      "(:[0-9]+)?" + // port (optional)
      "(\\/(([a-zA-Z0-9$-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*\\/?)*)?" + // path (optional)
      "(\\?(([a-zA-Z0-9$-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})+=[a-zA-Z0-9$-_.+!*'(),;:@&=]*(&([a-zA-Z0-9$-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})+=[a-zA-Z0-9$-_.+!*'(),;:@&=]*)*)?)?" + // query string (optional)
      "(#(([a-zA-Z0-9$-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*))?$",
  ); // fragment (optional)
  return pattern.test(str);
}

function makeBrowsableURL(url) {
  if (!isValidURL(url)) {
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

export { isValidURL, makeBrowsableURL };
