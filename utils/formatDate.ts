export const formatDate = (timestamp: any) => {
  if (!timestamp?.seconds) return "";
  return new Date(timestamp.seconds * 1000).toLocaleString();
};