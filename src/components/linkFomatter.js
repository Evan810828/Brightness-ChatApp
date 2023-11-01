export function replaceURLs(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {part}
          </a>
        );
      } else {
        return part;
      }
    });
  }
  