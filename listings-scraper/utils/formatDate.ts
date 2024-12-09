export function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const now = new Date();

  //@ts-ignore
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    // Less than 1 minute ago
    return `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    // Less than 1 hour ago
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    // Less than 1 day ago
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    // Less than 1 month ago
    return `${diffInDays} days ago`;
  } else {
    // More than 1 month ago
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
