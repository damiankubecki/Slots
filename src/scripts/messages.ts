import { message } from './types/types';

class Messages {
  private static PANEL: HTMLElement | null = document.querySelector('#messages-panel');
  private static MESSAGES: message[] = [];

  public static new(message: message): void {
    this.MESSAGES.unshift(message);
    if (this.MESSAGES.length > 23) this.MESSAGES.length = 23;

    if (this.PANEL) this.PANEL.innerHTML = '';
    for (let i = 0; i < this.MESSAGES.length; i++) {
      const message = document.createElement('p');
      message.classList.add(this.MESSAGES[i].type);
      message.innerHTML = this.MESSAGES[i].text;
      this.PANEL?.appendChild(message);
    }
  }

  public static clear(): void {
    this.MESSAGES = [];
    if (this.PANEL) this.PANEL.innerHTML = '';
  }
}

export default Messages;
