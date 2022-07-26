import { INITIAL_BID } from '../config';

class Bid {
  private BID_INPUT: HTMLInputElement | null = document.querySelector('#bid');
  private DECREMENET_BID_BUTTON: HTMLElement | null = document.querySelector('#decrement-bid');
  private INCREMENET_BID_BUTTON: HTMLElement | null = document.querySelector('#increment-bid');

  private _CURRENT_BID: number = INITIAL_BID;

  constructor() {
    this.BID_INPUT?.addEventListener('input', e => this.handleBidInputChange(e));
    this.DECREMENET_BID_BUTTON?.addEventListener('click', this.decrementBid);
    this.INCREMENET_BID_BUTTON?.addEventListener('click', this.incrementBid);
  }

  get CURRENT_BID() {
    return this._CURRENT_BID;
  }

  private set CURRENT_BID(value: number) {
    if (value >= 0) this._CURRENT_BID = value;
  }

  private setBidInputValue = (value: number): void => {
    if (this.BID_INPUT) this.BID_INPUT.value = value.toString();
  };

  private handleBidInputChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const value = Number(target.value);

    if (value > 0) {
      this.CURRENT_BID = Number(target.value);
    } else if (value < 0) {
      this.CURRENT_BID = 1;
      this.setBidInputValue(1);
    } else this.CURRENT_BID = 0;
  };

  private decrementBid = (): void => {
    this.CURRENT_BID = --this.CURRENT_BID;
    this.setBidInputValue(this.CURRENT_BID);
  };

  private incrementBid = (): void => {
    this.CURRENT_BID = ++this.CURRENT_BID;
    this.setBidInputValue(this.CURRENT_BID);
  };

  public init = (): void => {
    this.CURRENT_BID = INITIAL_BID;
    this.setBidInputValue(INITIAL_BID);
  };
}

export default Bid;
