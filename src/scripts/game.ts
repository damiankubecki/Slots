import Wallet from './wallet';
import Bid from './bid';
import Draw from './draw';
import Messages from './messages';
import Stats from './stats';

interface game {
  WALLET: Wallet;
  BID: Bid;
  STATS: Stats;
  submitGame(): void;
  startNewGame(): void;
}

class Game extends Draw implements game {
  private BET_BUTTON: HTMLElement | null = document.querySelector('#bet-button');
  private RESTART_BUTTON: HTMLElement | null = document.querySelector('#restart-button');

  WALLET;
  BID;
  STATS;

  constructor() {
    super();
    this.WALLET = new Wallet();
    this.BID = new Bid();
    this.STATS = new Stats();
    this.startNewGame();

    this.BET_BUTTON?.addEventListener('click', this.submitGame);
    this.RESTART_BUTTON?.addEventListener('click', this.startNewGame);
  }

  submitGame = (): void => {
    const bid = this.BID.CURRENT_BID;
    const userMoney = this.WALLET.MONEY;

    if (bid > userMoney) return Messages.new({ text: 'Please check your wallet...', type: 'negative' });
    if (bid <= 0) return Messages.new({ text: 'Total bid must be over 0!', type: 'negative' });

    const prize = this.drawResult(bid);
    this.WALLET.addMoney(prize);

    if (prize > 0) {
      this.STATS.addGame({ bid, isWin: true, prize });
      Messages.new({ text: `You win. Prize: $${prize}`, type: 'positive' });
    } else {
      this.STATS.addGame({ bid, isWin: false, prize });
      Messages.new({ text: `You lose $${prize * -1}`, type: 'negative' });
    }
  };

  startNewGame = (): void => {
    this.BID.init();
    this.WALLET.init();
    this.STATS.init();

    Messages.clear();
    Messages.new({ text: `Welcome. You already have $${this.WALLET.MONEY}`, type: 'neutral' });
  };
}

export default Game;
