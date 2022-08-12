let floors;
let elevatorsPosition = [];
let cycle = "up";
const calls = [];
const destinations = [];

const generateEnv = (elevatorsAmount, floorsAmount) => {
  elevators = new Array(elevatorsAmount).fill(0);
  //  for (let index = 0; index < elevatorsAmount; index++) {
  //    elevatorsPosition.push(0);
  //  }

  floors = floorsAmount;
};

const up = (from) => {
  if (
    !calls.some((item) => item.direction === "up" && item.from === from) &&
    from <= floors
  ) {
    calls.push({ direction: "up", from });
  }
};

const down = (from) => {
  if (
    !calls.some((item) => item.direction === "down" && item.from === from) &&
    from >= 0
  ) {
    calls.push({ direction: "down", from });
  }
};

const ticks = () => {
  elevatorsPosition.map((currenFloor, i) => {
    if (cycle === "up") {
      calls.sort((a, b) => {
        if (a.direction === "up" && b.direction !== "up") return -1;
        if (a.direction !== "up" && b.direction !== "down") return 1;
        if (a.from < b.from) return -1;
        if (a.from > b.from) return 1;
        return 0;
      });
    } else {
      calls.sort((a, b) => {
        if (a.direction === "up" && b.direction !== "up") return 1;
        if (a.direction !== "up" && b.direction !== "down") return -1;
        if (a.from < b.from) return 1;
        if (a.from > b.from) return -1;
        return 0;
      });
    }

    if (destinations.includes(currenFloor)) {
      destinations.shift();
    }

    if (currenFloor < calls[0]?.from) {
      elevatorsPosition[i] = currenFloor + 1;
    } else {
      cycle = "down";
    }
    if (currenFloor > calls[0]?.from) {
      elevatorsPosition[i] = currenFloor - 1;
    } else {
      cycle = "up";
    }

    console.log(elevatorsPosition);
    console.log(calls);
    console.log(destinations);
  });
};

const intervalID = setInterval(ticks, 1000);

generateEnv(1, 6);
up(3);
up(4);
down(3);
down(5);
up(6);
