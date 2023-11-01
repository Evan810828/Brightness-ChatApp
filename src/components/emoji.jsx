import React from 'react';

export const EmojiPanel = (params) => {
  const emojis = ['😊', '😂', '🥺', '😍', '😒', '🙄', '😎', '🥳', '😏', '🤔'];

  const handleEmojiClick = (emoji) => {
    params.handleEmojiClick(emoji);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg">
      {emojis.map((emoji, index) => (
        <button
          key={index}
          className="px-2 py-1 text-xl rounded-md hover:bg-gray-200"
          onClick={() => handleEmojiClick(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPanel;
