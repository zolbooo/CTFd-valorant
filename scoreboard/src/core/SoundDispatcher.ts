export function playSound(id: string) {
  const audio = new Audio(`/assets/sounds/${id}.mp3`);
  return audio.play();
}
