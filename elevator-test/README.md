# Elevator Simulation

###

Thank you for participating!

This test is designed as a lightweight logic problem to get to know _you_ as a developer. There are no tricks, just the opportunity to demonstrate your abilities.

## Objective

Using react, hooks, state, and typescript, create a working elevator system, basic but representative UI, and unit/integration tests.

### Developer Expectations

- Comfortably implement from as a set of basic specs
- Think through solutions
- Handle reasonable ambiguity: as a consumer, think through user expectations not explicitly outlined. If there are implementation choices, use your best judgement.
- Make development tradeoffs: optimize for project delivery rather than implementation perfection

## Testing Process

Testing is timeboxed to 72 hours from start, though it is expected to take much less and can be completed at any point within that frame. Budget an hour upfront for project evaluation and estimation.

#### After test completion

- Developer will be given 30min to walk through the implementation with evaluator(s)
- If the code works: great! Tell us how you got there and what challenges you faced.
- If the code doesn't work: don't fret! Tell us where you focused your time, where the roadblocks are, and what you would need to get over the hump.

#### How you will be evaluated

- Communication: can you clearly articulate your vision, successes, and challenges?
- Language/framework usage: are the basics used correctly and are best practices in place
- Design rationale: are the mechanics of the app reasonable and functional
- Testability/maintainability: is it coded in way that could be built on by others
- Design tradeoffs: how was complexity minimized?

## Specifications

- Elevators are housed in elevator banks in a building
- A building has XXX floors and YYY elevator banks: configurable
  - Feel free to display floors in European style (0-indexed)
  - Floor 0 is the ground floor
  - Floor (XXX - 1) is the top floor
- There is a single elevator per elevator bank which can move independently from the rest
  - Elevators start simulation on the ground floor
- Each floor has a single set of calling controls-buttons (up/down)
  - Pressed buttons become disabled ("lit") until an elevator arrives at the floor
- Each elevator has its own set of floor controls-buttons

### Simulation

- The application should run in cycles (`ticks`), executing its logic every ZZZ second(s): configurable
- An elevator may "move" AAA floors per cycle: configurable

## Example Scenarios

Using an example 5-story building with 3 elevator banks (5x3)

- All elevators are stationary on floor 3
  - "up" button is pressed on the ground floor
  - "down" button is pressed on the top floor
  - `Output`: one elevator should start tracking up, another tracking down, and the last remains stationary. After two system `ticks`, the elevator should arrive at floor 5.
- All elevators are on the ground floor
  - Inside the first elevator, the top floor button is pushed
  - On the 3rd floor, the "up" button is pushed
  - `Output`: the first elevator should handle signals from 3rd and 5th floors. The second and third elevators should remain stationary

### Testing

For high-level validation, the system should be able to output part of its current state as a floor x elevator bank matrix, where the bank value is equal to the intended "destination".

- Repo is pre-wired to leverage `jest`: see `npm test` command below

Examples, using 5 floor, 3 bank systems
Note: the array/floor indexes are flipped to better match expected visuals

- Default output (all elevators on ground floor, stationary):

```
4 | - - -
3 | - - -
2 | - - -
1 | - - -
0 | 0 0 0
```

- Up button on top floor pressed

```
4 | - - -
3 | - - -
2 | - - -
1 | - - -
0 | 4 0 0
```

- After system `tick`

```
4 | - - -
3 | - - -
2 | - - -
1 | 4 - -
0 | - 0 0
```

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
