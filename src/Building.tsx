import React, { useState } from "react";
import { Button } from "react-bootstrap";
import useInterval from "react-useinterval";

export default function Building({
  banks,
  floors,
}: {
  banks: number;
  floors: number;
}) {
  const [calls, setCalls] = useState<{ direction: string; from: number }[][]>(
    Array.from({ length: banks }, () => [])
  );
  const [elevatorsPosition, setElevatorsPosition] = useState<number[]>(
    new Array(banks).fill(0)
  );
  const [cycle, setCycle] = useState<string[]>(new Array(banks).fill("idle"));

  const floorMap = Array.from(Array(floors).keys()).reverse();
  const bankMap = Array.from(Array(banks).keys());

  const up = (from: number) => {
    const callsCopy: { direction: string; from: number }[][] = JSON.parse(
      JSON.stringify(calls)
    );

    if (
      !callsCopy
        .flat()
        .some((item) => item.direction === "up" && item.from === from) &&
      from <= floors &&
      !elevatorsPosition.some((floor) => floor === from)
    ) {
      const closestElevator = () => {
        let curr = elevatorsPosition[0],
          diff = Math.abs(from - curr);
        let index = 0;
        elevatorsPosition.forEach((elevator, i) => {
          let newdiff = Math.abs(from - elevator);
          if (newdiff < diff) {
            diff = newdiff;
            curr = elevator;
            index = i;
          }
        });

        return index;
      };

      const elevatorTarget =
        cycle[closestElevator()] === "idle"
          ? closestElevator()
          : callsCopy.findIndex(
              (call, i) =>
                call.length === 0 ||
                call.some(
                  (item) =>
                    item.direction === "up" &&
                    (item.from < from || elevatorsPosition[i] < from)
                ) ||
                call.some(
                  (item) =>
                    item.direction === "up" &&
                    item.from > from &&
                    elevatorsPosition[i] < from
                )
            );

      if (elevatorTarget >= 0) {
        callsCopy[elevatorTarget].push({ direction: "up", from });
        setCalls(callsCopy);
      }
    }
  };

  const down = (from: number) => {
    const callsCopy: { direction: string; from: number }[][] = JSON.parse(
      JSON.stringify(calls)
    );
    if (
      !callsCopy
        .flat()
        .some((item) => item.direction === "down" && item.from === from) &&
      from >= 0 &&
      !elevatorsPosition.some((floor) => floor === from)
    ) {
      const elevatorTarget = callsCopy.findIndex(
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
              elevatorsPosition[i] > from
          )
      );

      if (elevatorTarget >= 0) {
        callsCopy[elevatorTarget].push({ direction: "down", from });
        setCalls(callsCopy);
      }
    }
  };

  const ticks = () => {
    const callsCopy: { direction: string; from: number }[][] = JSON.parse(
      JSON.stringify(calls)
    );
    const cycleCopy: string[] = JSON.parse(JSON.stringify(cycle));
    const elevatorsPositionCopy: number[] = JSON.parse(
      JSON.stringify(elevatorsPosition)
    );

    elevatorsPositionCopy.forEach((currenFloor, i) => {
      if (callsCopy[i].length > 0) {
        if (cycleCopy[i] === "idle") {
          cycleCopy[i] = callsCopy[i].sort((a, b) => {
            if (Math.abs(a.from - currenFloor) < Math.abs(b.from - currenFloor))
              return -1;
            if (Math.abs(a.from) > Math.abs(b.from)) return 1;
            return 0;
          })[0].direction;
        }
        if (cycleCopy[i] === "up" && callsCopy[i][0].direction === "up") {
          callsCopy[i].sort((a, b) => {
            if (a.direction === "up" && b.direction !== "up") return -1;
            if (a.direction !== "up" && b.direction !== "down") return 1;
            if (a.from < b.from) return -1;
            if (a.from > b.from) return 1;
            return 0;
          });
        } else {
          callsCopy[i].sort((a, b) => {
            if (a.direction === "up" && b.direction !== "up") return 1;
            if (a.direction !== "up" && b.direction !== "down") return -1;
            if (a.from < b.from) return 1;
            if (a.from > b.from) return -1;
            return 0;
          });
        }

        if (callsCopy[i].length > 0) {
          if (cycleCopy[i] !== "idle" && currenFloor < callsCopy[i][0]?.from) {
            elevatorsPositionCopy[i] = currenFloor + 1;
          } else if (callsCopy[i][0]?.direction === "down") {
            cycleCopy[i] = "down";
          }

          if (cycleCopy[i] !== "idle" && currenFloor > callsCopy[i][0]?.from) {
            elevatorsPositionCopy[i] = currenFloor - 1;
          } else if (callsCopy[i][0]?.direction === "up") {
            cycleCopy[i] = "up";
          }
        }

        if (currenFloor === callsCopy[i][0]?.from) {
          callsCopy[i].shift();
        }

        if (callsCopy[i].length === 0) {
          cycleCopy[i] = "idle";
        }
      }
      setCalls(callsCopy);
      setElevatorsPosition(elevatorsPositionCopy);
      setCycle(cycleCopy);
    });
  };

  useInterval(ticks, 1000);

  return (
    <>
      <table className="table">
        <tbody>
          {floorMap.map((ix) => (
            <tr key={`floor-${ix}`}>
              {bankMap.map((iy) => (
                <td key={`bank-${iy}-${ix}`}>
                  Floor {ix}, Bank {iy},
                  {ix === elevatorsPosition[iy] ? "[]" : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: 25 }}>
          {floorMap.map((ix) => {
            return (
              <div
                key={`call-panel-${ix}`}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <p style={{ margin: 0, paddingRight: 10 }}>{ix}</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    style={{ marginBottom: 5 }}
                    onClick={up.bind(null, ix)}
                  >
                    ↑
                  </Button>
                  <Button onClick={down.bind(null, ix)}>↓</Button>
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{ display: "flex", backgroundColor: "red", marginLeft: 20 }}
        >
          {bankMap.map((ix) => (
            <div
              key={`panel-${ix}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingInline: 20,
              }}
            >
              <p style={{ marginBottom: 25 }}>Bank {ix}</p>

              {floorMap.map((iy) => {
                return (
                  <div key={`panel-${ix}-${iy}`}>
                    <Button
                      onClick={() => {
                        calls[ix].push({
                          direction: iy > elevatorsPosition[ix] ? "up" : "down",
                          from: iy,
                        });
                      }}
                      style={{ borderRadius: 20, marginBottom: 53 }}
                    >
                      {iy}
                    </Button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
