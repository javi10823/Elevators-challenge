import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Building from "./Building";

// NOTE: env vars are always string, must be converted to number
const BANKS = process.env.BANKS || "3";
const FLOORS = process.env.FLOORS || "5";
const INITIAL_FLOOR_ELEVATOR = process.env.INITIAL_FLOOR_ELEVATOR || "0";

function App() {
  const initialFloor = parseInt(INITIAL_FLOOR_ELEVATOR, 10);
  const banks = parseInt(BANKS, 10);
  const floors = parseInt(FLOORS, 10);
  return <Building banks={banks} floors={floors} initialFloor={initialFloor} />;
}

export default App;
