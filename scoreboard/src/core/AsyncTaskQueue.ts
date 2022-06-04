export class AsyncTaskQueue {
  private tasks: (() => Promise<void>)[] = [];

  // eslint-disable-next-line no-undef
  private _idle: NodeJS.Timeout | null = null;
  private processQueue() {
    if (this._idle !== null) {
      return;
    }
    this._idle = setTimeout(async () => {
      while (this.tasks.length > 0) {
        const task = this.tasks.shift()!;
        await task();
      }
      this.tasks = [];
      this._idle = null;
    });
  }

  push<R>(task: () => Promise<R>): Promise<R> {
    return new Promise((resolve, reject) => {
      this.tasks.push(() => task().then(resolve).catch(reject));
      this.processQueue();
    });
  }
}
