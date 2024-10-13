type Data = {
    Id: string;
    Name: string;
    Score: number;
    Time: number;
    Unit: number;
}
export default function compareByScoreAndTime(a: Data, b: Data) {
    if (a.Score > b.Score) {
      return -1;
    }
    if (a.Score < b.Score) {
      return 1;
    }
    return a.Time - b.Time;
  }
  