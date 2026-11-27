// Real SLY Elevators project photography + supporting Unsplash imagery.
import elevator1 from "@/assets/elevator-1.jpeg";
import elevator2 from "@/assets/elevator-2.jpeg";
import elevator3 from "@/assets/elevator-3.jpeg";
import elevatorMachine from "@/assets/elevator-machine.jpeg";
import glass1 from "@/assets/glass-1.jpeg";
import glass2 from "@/assets/glass-2.jpeg";
import glass3 from "@/assets/glass-3.webp";
import solar1 from "@/assets/solar-1.jpeg";
import solar2 from "@/assets/solar-2.webp";
import solar3 from "@/assets/solar-3.jpeg";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  // Hero / general
  heroBuilding: u("photo-1545324418-cc1a3fa10c00"),
  skyscraper: u("photo-1486325212027-8081e485255e"),
  skyline: u("photo-1480714378408-67cf0d13bc1b"),
  engineer: u("photo-1581094794329-c8112a89af12"),
  blueprint: u("photo-1487958449943-2429e8be8625"),
  hotel: u("photo-1566073771259-6a8506099945"),

  // Elevators — real SLY work
  elevatorInterior: elevator1,
  elevatorPanoramic: elevator2,
  elevatorPanel: elevator1,
  elevatorShaft: elevatorMachine,
  smartElevator: elevator2,
  elevatorCabin: elevator3,
  elevatorMachineRoom: elevatorMachine,

  // Glass — real SLY work
  glassOffice: glass1,
  glassPartition: glass2,
  glassMeeting: glass1,
  glassFrameless: glass3,
  glassShowroom: glass3,

  // Solar — real SLY work
  solarRoof: solar1,
  solarPanels: solar2,
  solarHome: solar1,
  solarFarm: solar3,
  solarInstall: solar2,
};
