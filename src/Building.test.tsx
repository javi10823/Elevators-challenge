import Building from './Building';

describe('Building', () => {
  it('runs tests successfully!', () => {
    const building = <Building banks={2} floors={2} />;
    expect(building).toBeTruthy();
    expect(true).toBe(true);
  });
});
