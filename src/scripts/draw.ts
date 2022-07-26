import { SLOTS_OPTIONS } from '../config';

interface draw {
  drawResult(bid: number): number;
}

class Draw implements draw {
  private SLOTS_OPTIONS: string[] = SLOTS_OPTIONS;

  private getRandomOptionIndex = (): number => Math.floor(Math.random() * this.SLOTS_OPTIONS.length);

  private drawColumnResult = (slotID: number): number => {
    const columnSlots = document.querySelectorAll<HTMLElement>(`#slot-${slotID} .game__slots-item`);
    let optionIndex: number = this.getRandomOptionIndex();

    if (columnSlots) {
      for (let i = 0; i < columnSlots.length; i++) {
        columnSlots[i].innerHTML = this.SLOTS_OPTIONS[optionIndex];
        if (optionIndex + 1 >= this.SLOTS_OPTIONS.length) {
          optionIndex = 0;
        } else optionIndex++;
        if (i === columnSlots.length - 1) return optionIndex;
      }
    }
    throw new Error('An error occurred');
  };

  private checkResult = (drawedResults: number[]): number => {
    const mostFrequentResult: number[] = drawedResults
      .sort()
      .filter((o, i) => o !== undefined && drawedResults[i + 1] !== undefined && o === drawedResults[i + 1]);

    const result = drawedResults.filter(drawedResult => drawedResult === mostFrequentResult[0]).length || 1;
    return result;
  };

  drawResult = (bid: number): number => {
    const columnsResults: number[] = [this.drawColumnResult(1), this.drawColumnResult(2), this.drawColumnResult(3)];
    const result: number = this.checkResult(columnsResults);

    if (result === 2) return bid * 2;
    if (result === 3) return bid * 3;
    return Math.abs(bid) * -1;
  };
}

export default Draw;
