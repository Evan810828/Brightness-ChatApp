export function replaceURLs(str) {
    const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
    return str.replace(regex, '<a href="$1" target="_blank">$1</a>');
}
  