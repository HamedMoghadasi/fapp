export function ConvertFeetToMeter(distance) {
  return `${(distance * 3.28084).toFixed(3)} m`;
}
export function ConvertMeterToFeet(distance) {
  return `${(distance / 3.28084).toFixed(3)} ft`;
}

export function ConvertFeetSquareToMeterSquare(distance) {
  return `${(distance * 10.7639).toFixed(3)} m<sup>2</sup>`;
}
export function ConvertMeterSquareToFeetSquare(distance) {
  return `${(distance / 10.7639).toFixed(3)} ft<sup>2</sup>`;
}

export function ConvertMileToKilometer(distance) {
  return `${(distance * 0.621371).toFixed(3)} km`;
}
export function ConvertKilometerToMile(distance) {
  return `${(distance / 0.621371).toFixed(3)} mile`;
}

export function ConvertMileSquareToKilometerSquare(distance) {
  return `${(distance * 0.386102).toFixed(3)} km<sup>2</sup>`;
}
export function ConvertKilometerSquareToMileSquare(distance) {
  return `${(distance / 0.386102).toFixed(3)} mile<sup>2</sup>`;
}
