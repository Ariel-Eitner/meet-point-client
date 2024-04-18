export const todayStr = new Date().toISOString().replace(/T.*$/, "");
export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export function capitalizeText(text: string) {
  let lowerCaseText = text.toLowerCase();
  let capitalizedText = lowerCaseText.replace(
    /(^\w{1})|(\.\s*\w{1})/g,
    (match) => match.toUpperCase()
  );

  return capitalizedText;
}

//para nombres
export function capitalizeWords(text: string) {
  let lowerCaseText = text.toLowerCase();
  let capitalizedText = lowerCaseText.replace(/\b(\w)/g, (match) =>
    match.toUpperCase()
  );

  return capitalizedText;
}
