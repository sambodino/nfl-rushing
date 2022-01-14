import data from './data.json'

function randomChars(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const newPlayer = () => {
  const randomChance = Math.random()
  return {
    Player: `${randomChars(6)} ${randomChars(10)}`,
    Team: randomChars(3),
    Pos: randomChance > 0.66 ? 'RB' : randomChance > 0.33 ? 'QB' : 'WR',
    Att: Math.floor(Math.random() * 1000),
    'Att/G': Math.floor(Math.random() * (10 * 100 - 1 * 100) + 1 * 100) / (1*100),
    Yds: Math.floor(Math.random() * 1000),
    Avg: Math.floor(Math.random() * (10 * 100 - 1 * 100) + 1 * 100) / (1*100),
    'Yds/G': Math.floor(Math.random() * (10 * 100 - 1 * 100) + 1 * 100) / (1*100),
    TD: Math.floor(Math.random() * 10),
    Lng: Math.floor(Math.random() * 100),
    '1st': Math.floor(Math.random() * 50),
    '1st%': Math.floor(Math.random() * (10 * 100 - 1 * 100) + 1 * 100) / (1*100),
    '20+': Math.floor(Math.random() * 10),
    '40+': Math.floor(Math.random() * 5),
    FUM: Math.floor(Math.random() * 5),
  }
}

export default function getData(size) {
  const arr = [...data];
  if (size) {
    for(let i=0; i<size; i++) {
      arr.push(newPlayer())
    }
  }
  return arr
}
