let floors: number;
let elevatorsPosition: number[] = [];
let cycle: string[] = [];
let calls: { direction: string; from: number }[][] = [];

export const generateEnv = (elevatorsAmount: number, floorsAmount: number) => {
  elevatorsPosition = new Array(elevatorsAmount).fill(0);
  cycle = new Array(elevatorsAmount).fill("idle");

  calls = Array.from({ length: elevatorsAmount }, () => []);

  floors = floorsAmount;
};

export const up = (from: number) => {
  if (
    !calls
      .flat()
      .some((item) => item.direction === "up" && item.from === from) &&
    from <= floors
  ) {
    const elevatorTarget = calls.findIndex(
      (call, i) =>
        call.some(
          (item) =>
            item.direction === "up" &&
            (item.from < from || elevatorsPosition[i] < from)
        ) ||
        call.length === 0 ||
        call.some(
          (item) =>
            item.direction === "up" &&
            item.from > from &&
            elevatorsPosition[i] > from
        )
    );

    if (elevatorTarget >= 0) {
      calls[elevatorTarget].push({ direction: "up", from });
    }
  }
};

export const down = (from: number) => {
  if (
    !calls
      .flat()
      .some((item) => item.direction === "down" && item.from === from) &&
    from >= 0
  ) {
    const elevatorTarget = calls.findIndex(
      (call, i) =>
        call.some(
          (element) =>
            element.direction === "down" &&
            (element.from > from || elevatorsPosition[i] > from)
        ) ||
        call.length === 0 ||
        call.some(
          (element) =>
            element.direction === "down" &&
            element.from < from &&
            elevatorsPosition[i] < from
        )
    );

    if (elevatorTarget >= 0) {
      calls[elevatorTarget].push({ direction: "down", from });
    }
  }
};

const ticks = () => {
  elevatorsPosition.map((currenFloor, i) => {
    if (calls[i].length > 0) {
      if (cycle[i] === "idle") {
        cycle[i] = calls[i].sort((a, b) => {
          if (Math.abs(a.from - currenFloor) < Math.abs(b.from - currenFloor))
            return -1;
          if (Math.abs(a.from) > Math.abs(b.from)) return 1;
          return 0;
        })[0].direction;
      }

      if (cycle[i] === "up" && calls[i][0].direction === "up") {
        calls[i].sort((a, b) => {
          if (a.direction === "up" && b.direction !== "up") return -1;
          if (a.direction !== "up" && b.direction !== "down") return 1;
          if (a.from < b.from) return -1;
          if (a.from > b.from) return 1;
          return 0;
        });
      } else {
        calls[i].sort((a, b) => {
          if (a.direction === "up" && b.direction !== "up") return 1;
          if (a.direction !== "up" && b.direction !== "down") return -1;
          if (a.from < b.from) return 1;
          if (a.from > b.from) return -1;
          return 0;
        });
      }

      if (currenFloor === calls[i][0]?.from) {
        calls[i].shift();
      }

      if (calls[i].length === 0) {
        cycle[i] = "idle";
      } else {
        if (cycle[i] !== "idle" && currenFloor < calls[i][0]?.from) {
          elevatorsPosition[i] = currenFloor + 1;
        } else {
          cycle[i] = "down";
        }

        if (cycle[i] !== "idle" && currenFloor > calls[i][0]?.from) {
          elevatorsPosition[i] = currenFloor - 1;
        } else {
          cycle[i] = "up";
        }
      }
    }
  });
  console.log(cycle);
  console.log(elevatorsPosition);
  console.log(calls);
};

// const intervalID = setInterval(ticks, 1000);

// generateEnv(3, 26);

down(3);
down(0);
up(5);

down(4);

up(4);
up(3);

down(5);
down(23);
up(24);
up(0);

console.log(calls);
