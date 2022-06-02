import { AsyncTaskQueue } from "./AsyncTaskQueue";

export class SoundDispatcher {
  private asyncTaskQueue = new AsyncTaskQueue();

  playSound(id: string): Promise<void> {
    const audio = new Audio(`/assets/sounds/${id}.mp3`);
    return this.asyncTaskQueue.push(() => audio.play());
  }
}
