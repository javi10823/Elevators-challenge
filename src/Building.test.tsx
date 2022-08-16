import Building from "./Building";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Building", () => {
  it("runs tests successfully!", () => {
    const building = <Building banks={2} floors={2} initialFloor={0} />;
    expect(building).toBeTruthy();
  });
  it("have correct amount of elevators", () => {
    const checkbox = shallow(
      <Building banks={3} floors={6} initialFloor={0} />
    );
    expect(checkbox).toBeTruthy();
    expect(checkbox.text()).toContain("Bank 2");
  });
});
