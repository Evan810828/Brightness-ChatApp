export function replaceURLs(inputString) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = inputString.split(urlRegex);
  
    return (
      <>
        {parts.map((part, index) =>
          urlRegex.test(part) ? (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {part}
            </a>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  }