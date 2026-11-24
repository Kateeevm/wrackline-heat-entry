// WRACKLINE HEAT — mission data: 10 missions, 3 chapters, real stage types.
// Stage types: goto (reach on foot or in any vehicle), drive (reach while
// driving), clear (defeat n enemies spawned at the point), deliver (reach
// while driving — the car you are in is the delivery), escape (reach the
// hideout marker; arriving breaks police line of sight and clears wanted).
// Positions are on Moonpool Boulevard: x is across (sea is -x), z runs the
// length of the bay from Heron Point (+400) to Ferry Landing (-400).
export const CHAPTERS = ['LOW WATER', 'THE BRINEWORK', 'HIGH WATER RISING'];
const D = {
  tomas: ['Tomas Rey', 'WHEELMAN · “KEELHAUL”', '#7a4a26', '#17110a'],
  ines: ['Ines Halvorsen', 'LOOKOUT · “GLASS EYE”', '#31556e', '#0a1218'],
  mira: ['Mira Solano', 'FIXER · “THE LEDGER”', '#5e3a6e', '#120a18'],
  cass: ['Cassian Vale', 'THE BRINEWORK · LEAD', '#205a54', '#08140f'],
};
export const MISSIONS = [
  { ch: 0, name: 'First Catch', reward: 900, time: 300, stages: [
    { type: 'goto', x: -6.5, z: 168, text: 'Meet Tomas at Moonpool Pier', dlg: [...D.tomas, 'Pier’s quiet, Cass. Sea on your left, trouble on your right.'] },
    { type: 'drive', x: 3, z: 58, text: 'Drive Tomas to Gullmarket', dlg: [...D.tomas, 'Albacore’s warmed up. Keep her paint clean, eh?'] },
    { type: 'goto', x: 7.2, z: 44, text: 'Meet Mira outside the fish market', dlg: [...D.mira, 'You drive like the tide — in, out, gone. Good.'] },
  ] },
  { ch: 0, name: 'Cold Rooms', reward: 1400, time: 330, stages: [
    { type: 'goto', x: 7.2, z: -52, text: 'Reach the Cannery Steps cold rooms', dlg: [...D.ines, 'Three watchmen on the steps. Cameras are mine — the rest is yours.'] },
    { type: 'clear', x: 4, z: -66, n: 3, text: 'Clear the cannery watchmen', dlg: [...D.ines, 'Now. Quiet hands, loud exit.'] },
    { type: 'escape', x: -6, z: 30, text: 'Lose the heat at the promenade hideout', dlg: [...D.tomas, 'MBPD is rolling. Promenade hideout — go, go.'] },
  ] },
  { ch: 0, name: 'Harbour Paper', reward: 1800, time: 330, stages: [
    { type: 'drive', x: -4, z: -128, text: 'Collect the harbour ledger at the Marina', dlg: [...D.mira, 'A ledger, Cass. Paper that sinks companies. Bring it dry.'] },
    { type: 'clear', x: -2, z: -142, n: 3, text: 'Fight off the dock crew', dlg: [...D.ines, 'Dock crew incoming — they want that ledger back.'] },
    { type: 'deliver', x: 3, z: -30, text: 'Deliver the ledger to Mira at Cannery Steps', dlg: [...D.mira, 'Dry paper, warm money. The Brinework provides.'] },
  ] },
  { ch: 1, name: 'Salt Run', reward: 2400, time: 360, stages: [
    { type: 'goto', x: 7.2, z: -238, text: 'Pick up the Saltworks load', dlg: [...D.tomas, 'Salt sheds, midnight rules. Load fast, talk never.'] },
    { type: 'deliver', x: 3, z: 120, text: 'Run the load up the boulevard to Wrackline Strip', dlg: [...D.ines, 'Boulevard is lit tonight. Fast is safer than slow.'] },
    { type: 'escape', x: -6, z: 210, text: 'Break line of sight at Heron Point', dlg: [...D.tomas, 'DUNLIN-1 is up. Heron Point, under the light — move!'] },
  ] },
  { ch: 1, name: 'Glass Water', reward: 3000, time: 360, stages: [
    { type: 'clear', x: 2, z: -20, n: 4, text: 'Clear the Gullmarket toll crew', dlg: [...D.cass, 'Nobody tolls my bay. Clear them out.'] },
    { type: 'drive', x: -3, z: -190, text: 'Drive to Moonpool Marina', dlg: [...D.ines, 'Marina gate in four minutes. Water’s glass tonight.'] },
    { type: 'goto', x: -7, z: -204, text: 'Board the pier head at the Marina', dlg: [...D.mira, 'The buyer waits at the pier head. No names, no paper.'] },
  ] },
  { ch: 1, name: 'The Ledger Burns', reward: 3600, time: 390, stages: [
    { type: 'goto', x: 7.2, z: 262, text: 'Meet Ines in Beacon Quarter', dlg: [...D.ines, 'Beacon Quarter. I found who bought the harbour paper.'] },
    { type: 'clear', x: 3, z: 276, n: 4, text: 'Ambush — survive the Beacon Quarter hit', dlg: [...D.ines, 'It’s a set-up! Down, Cass — shoot your way out!'] },
    { type: 'deliver', x: 3, z: -52, text: 'Get the evidence to Cannery Steps', dlg: [...D.mira, 'Evidence burns or evidence pays. Tonight it pays.'] },
  ] },
  { ch: 2, name: 'Ferry Money', reward: 4400, time: 390, stages: [
    { type: 'drive', x: 3, z: -330, text: 'Drive to Ferry Landing', dlg: [...D.tomas, 'Last ferry carries more than passengers tonight.'] },
    { type: 'clear', x: 0, z: -348, n: 4, text: 'Take the ferry office from the port crew', dlg: [...D.cass, 'Ferry office is ours by sunrise. Take it.'] },
    { type: 'goto', x: 7.2, z: -318, text: 'Collect the ferry takings', dlg: [...D.mira, 'Count it twice, Cass. Ferry money is old money.'] },
  ] },
  { ch: 2, name: 'Neon Ballast', reward: 5200, time: 420, stages: [
    { type: 'goto', x: 7.2, z: 96, text: 'Meet the Gullmarket courier', dlg: [...D.ines, 'Courier’s nervous. Gullmarket, two minutes.'] },
    { type: 'deliver', x: -3, z: 262, text: 'Deliver the ballast case to Beacon Quarter', dlg: [...D.tomas, 'Case is heavy and humming. Drive like it matters.'] },
    { type: 'clear', x: 2, z: 282, n: 3, text: 'Hold Beacon Quarter until the deal closes', dlg: [...D.ines, 'Buyers brought friends. Hold the quarter!'] },
  ] },
  { ch: 2, name: 'Low Stand', reward: 6500, time: 420, stages: [
    { type: 'clear', x: 2, z: -238, n: 5, text: 'Break the Saltworks blockade', dlg: [...D.cass, 'They blockaded our sheds. Break it, all of it.'] },
    { type: 'drive', x: 3, z: 330, text: 'Drive the foreman to Heron Point', dlg: [...D.tomas, 'Foreman talks at Heron Point or nowhere. Go.'] },
    { type: 'escape', x: -6, z: 372, text: 'Vanish at the lighthouse service road', dlg: [...D.ines, 'Whole bay is watching. Lighthouse road — disappear.'] },
  ] },
  { ch: 2, name: 'High Water', reward: 9000, time: 480, stages: [
    { type: 'goto', x: -6.5, z: 168, text: 'Meet the whole crew at Moonpool Pier', dlg: [...D.mira, 'One last tide, Cass. Everyone’s in — pier, now.'] },
    { type: 'clear', x: 0, z: 150, n: 5, text: 'Hold the pier against the port crew', dlg: [...D.cass, 'They came for the bay itself. Hold this pier!'] },
    { type: 'deliver', x: 3, z: -330, text: 'Run the crew chest to Ferry Landing', dlg: [...D.tomas, 'Chest’s loaded. Boulevard’s ours — run it home!'] },
    { type: 'escape', x: -6, z: -372, text: 'End it at the Ferry Landing hideout', dlg: [...D.mira, 'High water covers every track. Finish it, Cassian.'] },
  ] },
];
