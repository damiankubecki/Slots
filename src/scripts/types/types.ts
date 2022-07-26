type messageTypes = 'negative' | 'neutral' | 'positive';
interface message {
  text: string;
  type: messageTypes;
}

interface game {
  bid: number;
  isWin: boolean;
  prize: number;
}

interface stats {
  totalGames: string;
  profit: string;
  winRate: string;
  winningsSum: string;
  lostSum: string;
}

export { message, game, stats };
