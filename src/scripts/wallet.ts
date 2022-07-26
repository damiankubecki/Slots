import Messages from './messages';
import { INITIAL_MONEY } from '../config';

class Wallet {
  private WALLET_ELEMENT: HTMLElement | null = document.querySelector('#wallet-money');
  private SET_MONEY_INPUT: HTMLInputElement | null = document.querySelector('#wallet-input');
  private SET_MONEY_BUTTON: HTMLElement | null = document.querySelector('#wallet-setBtn');
  private QUICK_MONEY_BUTTONS = [...document.querySelectorAll('.quick-money')] as HTMLElement[];

  private _MONEY = INITIAL_MONEY;

  constructor() {
    this.SET_MONEY_BUTTON?.addEventListener('click', this.handleSettingMoney);
    this.QUICK_MONEY_BUTTONS?.forEach(button =>
      button.addEventListener('click', () => this.setQuickMoney(Number(button.dataset.value)))
    );
  }

  public get MONEY() {
    return this._MONEY;
  }
  
  private set MONEY(quantity: number) {
    this._MONEY = quantity;
    this.setWalletState(quantity);
  }

  private setWalletState = (value: number): void => {
    if (this.WALLET_ELEMENT) this.WALLET_ELEMENT.innerHTML = `$${value}`;
  };

  private setQuickMoney = (value: number): void => {
    if (this.SET_MONEY_INPUT) this.SET_MONEY_INPUT.value = value.toString();
  };

  private handleSettingMoney = (): void => {
    if (!this.SET_MONEY_INPUT) throw new Error('Cannot find input');

    const valueToSet = Number(this.SET_MONEY_INPUT.value);
    let messageText: string;

    if (valueToSet > 0) {
      this.MONEY = valueToSet;
      messageText = `Success. Now you have $${valueToSet} in your wallet`;
    } else messageText = 'Input correct value';

    Messages.new({ text: messageText, type: 'neutral' });
    this.SET_MONEY_INPUT.value = '';
  };

  public addMoney = (quantity: number): void => {
    this.MONEY = this.MONEY + quantity;
  };

  public init = (): void => {
    this.MONEY = INITIAL_MONEY;
    this.setWalletState(INITIAL_MONEY);
  };
}

export default Wallet;
