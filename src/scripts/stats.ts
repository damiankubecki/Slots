import { game, stats } from './types/types';

class Stats {
  private GAMES_SPAN: HTMLElement | null = document.querySelector('#stats-games');
  private PROFIT_SPAN: HTMLElement | null = document.querySelector('#stats-profit');
  private WIN_RATE_SPAN: HTMLElement | null = document.querySelector('#stats-winRate');
  private WINNINGS_SUM_SPAN: HTMLElement | null = document.querySelector('#stats-winningsSum');
  private LOST_SUM_SPAN: HTMLElement | null = document.querySelector('#stats-lostSum');

  private GAMES_HISTORY: game[] = [];

  private getGamesSum = (): string => {
    const totalGames = this.GAMES_HISTORY.length;
    return totalGames.toString();
  };

  private getProfit = (): string => {
    const profit = this.GAMES_HISTORY.reduce((previous, current) => previous + current.prize, 0);
    return `$${profit}`;
  };

  private getWinRate = (): string => {
    const totalGames = this.GAMES_HISTORY.length;
    const wins = this.GAMES_HISTORY.filter(game => game.isWin).length;
    const winRate: number = wins / totalGames;
    return `${(winRate * 100).toFixed()}% (${wins}/${totalGames})`;
  };

  private getWinningsSum = (): string => {
    const winGames = this.GAMES_HISTORY.filter(game => game.isWin);
    const winSum = winGames.reduce((previous, current) => previous + current.prize, 0);
    return `$${winSum}`;
  };

  private getLostSum = (): string => {
    const lostGames = this.GAMES_HISTORY.filter(game => !game.isWin);
    const lostSum = lostGames.reduce((previous, current) => previous + current.prize, 0);
    return `$${lostSum * -1}`;
  };

  private getStats = (): stats => {
    const result: stats = {
      totalGames: this.getGamesSum(),
      profit: this.getProfit(),
      winRate: this.getWinRate(),
      winningsSum: this.getWinningsSum(),
      lostSum: this.getLostSum(),
    };

    return result;
  };

  private updateSpans = (stats: stats): void => {
    if (this.GAMES_SPAN) this.GAMES_SPAN.innerHTML = stats.totalGames;
    if (this.PROFIT_SPAN) this.PROFIT_SPAN.innerHTML = stats.profit;
    if (this.WIN_RATE_SPAN) this.WIN_RATE_SPAN.innerHTML = stats.winRate;
    if (this.WINNINGS_SUM_SPAN) this.WINNINGS_SUM_SPAN.innerHTML = stats.winningsSum;
    if (this.LOST_SUM_SPAN) this.LOST_SUM_SPAN.innerHTML = stats.lostSum;
  };

  public addGame = (game: game): void => {
    this.GAMES_HISTORY.push(game);
    const gameStats = this.getStats();
    this.updateSpans(gameStats);
  };

  public init = (): void => {
    this.GAMES_HISTORY = [];
    this.updateSpans({ totalGames: '0', profit: '$0', winRate: '0% (0/0)', winningsSum: '$0', lostSum: '$0' });
  };
}

export default Stats;
