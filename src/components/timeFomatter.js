export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    // add 5 hours to now
    now.setHours(now.getHours() + 5);
  
    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
  
    if (secondsAgo < 60) {
      return 'Just now';
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (daysAgo < 30) {
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
}