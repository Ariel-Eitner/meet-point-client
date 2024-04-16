export const todayStr = new Date().toISOString().replace(/T.*$/, "");
export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
