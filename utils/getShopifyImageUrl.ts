const getSizedImageUrl = function (src: any, size:number | string) {
  if (size === null) {
    return src;
  }

  if (size === 'master') {
    return removeProtocol(src);
  }

  const match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

  if (match) {
    const prefix = src.split(match[0]);
    const suffix = match[0];

    return removeProtocol(`${prefix[0]}_${size}${suffix}`);
  } else {
    // Non-Shopify / unsizeable source (local static file, SVG, data URI, absolute URL):
    // pass through unchanged rather than returning `null` so the srcset stays valid.
    return removeProtocol(src);
  }
}

const removeProtocol = function (path: any) {
  return path.replace(/http(s)?:/, '');
}

const getShopifyImageUrl = function (url: any, size: number | string) {
  return getSizedImageUrl(url, size);
}

export default getShopifyImageUrl
