export function replaceURLs(str) {
    const urlRegex = /(\b(https?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]))/ig;
    const parts = str.split(urlRegex);
  
    return parts.map((part, i) => 
      urlRegex.test(part) ? <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a> : part
    );
  }