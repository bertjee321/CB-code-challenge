/* * * * * * * * * * * * * * * * * * *
 *  Created by: Bert Kruiter         *
 *  Centraal Beheer code challenge,  *
 *  job application @ Achmea         *
 * * * * * * * * * * * * * * * * * * */

import VehicleForm from "./components/VehicleForm";

const DUMMY_VEHICLE_DATA = [
  {
    vehicle: {
      type: "Auto",
      subtypes: [
        "Hatchback",
        "Sedan",
        "Station",
        "Cabriolet",
        "Coupé",
        "Multi Purpose Vehicle (MVP)",
        "Terreinauto",
      ],
    },
  },
  {
    vehicle: {
      type: "Motor",
      subtypes: [
        "All-road",
        "Naked",
        "Enduro",
        "Race",
        "Toermotor",
        "Chopper",
        "Zijspan",
      ],
    },
  },
  {
    vehicle: {
      type: "Scooter",
      subtypes: [],
    },
  },
];

function App() {
  return (
    <div className="main">
      <VehicleForm data={DUMMY_VEHICLE_DATA} />
    </div>
  );
}

export default App;
