export default function Building({
  banks,
  floors
}: {
  banks: number,
  floors: number
}) {
  const floorMap = Array.from(Array(floors).keys()).reverse();
  const bankMap = Array.from(Array(banks).keys());

  return (
    <table className="table">
      <tbody>
        {floorMap.map(ix => {
          return (
            <tr key={`floor-${ix}`}>
              {bankMap.map(iy => (
                <td key={`bank-${iy}-${ix}`}>
                  Floor {ix}, Bank {iy}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}
