// WRACKLINE HEAT — screenshot staging. Each shot is a real render of the live
// game with state arranged deterministically (seed 7): no compositing, no edits.
import { setDialogue } from './hud.js';

export function stageShot(G, name) {
  const S = G.S;
  document.querySelectorAll('.panel').forEach(p => { if (p.id !== 'hud-prompt' && p.id !== 'hud-banner') p.style.display = ''; });
  document.getElementById('start-screen').style.display = 'none';
  if (name === 'chase') stageChase(G, S);
  else if (name === 'gunfight') stageGunfight(G, S);
  else if (name === 'start') stageStart(G, S);
  else if (name === 'night') stageNight(G, S);
}
function baseState(S, money, wanted) {
  S.money = money; S.health = 92; S.armor = 64; S.crew = 78;
  S.radio = { name: 'SURFLINE 102.5 FM', track: 'The Wrackline — “Low Water”' };
  S.abilities.forEach(a => { a.until = 0; });
  // set wanted through the real path so dispatch units exist, then place them
  window.__game.setWanted(wanted);
}
function stageChase(G, S) {
  G.applyMood('golden');
  baseState(S, 48260, 4);
  S.inSight = true;
  S.driving = true; S.vehicleName = 'Albacore GT'; S.vehicleCond = 96; S.speed = 43; // ≈ 96 MPH
  S.mission = { ch: 2, chapterName: 'HIGH WATER RISING', name: 'High Water', objective: 'Outrun DUNLIN-1 down Moonpool Boulevard', index: 9, stage: 1, stageCount: 4, stageFrac: 0.3, timeLeft: 214 };
  const hero = G.heroCar; hero.group.position.set(2.4, 0, 196); hero.heading = Math.PI; hero.group.rotation.y = Math.PI;
  G.playerPos.set(2.4, 0, 196); S.playerHeading = Math.PI;
  G.placePolice(0, 6.2, 201, Math.PI - 0.15);
  G.placePolice(1, -3.6, 200, Math.PI + 0.12);
  G.placePolice(2, -2.5, 184, Math.PI);
  G.placeTraffic(0, -4.2, 140, 0);
  G.placeTraffic(1, 4.4, 120, Math.PI);
  G.placeTraffic(2, -4.4, 262, 0);
  // DUNLIN-1 ahead on the sea side, WHOLE inside the frame; cone lands on the hero car
  G.heli.position.set(-7, 12.5, 168); G.heli.rotation.set(0.06, Math.PI * 0.78, 0.04);
  G.playerPerson.group.visible = false;
  G.setSpotlight(1); G.placeCone(-6.5, 11.3, 167, 2.4, 196);
  G.stagePeds(190, 9);
  S.camOverride = { pos: [6.0, 2.6, 207], look: [-1.5, 1.1, 146] };
  setDialogue('Tomas Rey', 'WHEELMAN · “KEELHAUL”', 'DUNLIN-1 has us lit. Keep the sea on your left and do not slow down.', '#7a4a26', '#17110a');
}
function stageGunfight(G, S) {
  G.applyMood('dusk');
  baseState(S, 31540, 3);
  S.driving = false; S.speed = 0; S.vehicleName = 'On Foot';
  S.radio = { name: 'GLASSHULL 94.9', track: 'Neon Cannery — “Salt in the Wiring”' };
  S.mission = { ch: 1, chapterName: 'THE BRINEWORK', name: 'Glass Water', objective: 'Clear the Gullmarket toll crew', index: 4, stage: 0, stageCount: 3, stageFrac: 0.5, timeLeft: 176 };
  S.inSight = true;
  G.playerPerson.group.visible = true;
  G.playerPerson.group.position.set(-3.2, 0, 40);
  G.playerPos.set(-3.2, 0, 40); S.playerHeading = 0.5;
  const cover = G.traffic[3]; cover.group.position.set(-0.6, 0, 36.5); cover.group.rotation.y = Math.PI / 2 - 0.15;
  const cover2 = G.traffic[4]; cover2.group.position.set(7, 0, 28); cover2.group.rotation.y = Math.PI / 2 + 0.1;
  G.placeEnemies([[5.6, 30], [8.2, 26], [4.4, 24], [10.5, 32]]);
  G.placePolice(0, -4.6, 62, Math.PI); G.placePolice(1, 5.8, 66, Math.PI);
  G.heli.position.set(-14, 20, 12); G.heli.rotation.y = Math.PI * 0.7;
  G.setSpotlight(0.4); G.placeCone(-13.5, 18.8, 13, -3.2, 40);
  G.stagePeds(34, 5);
  const V = G.V3;
  G.spawnTracer(new V(-2.4, 1.35, 39.6), new V(5.2, 1.25, 30.4), 0xffd98a, 999);
  G.spawnTracer(new V(-2.4, 1.42, 39.8), new V(5.2, 1.3, 30.6), 0xffe9b8, 999);
  G.spawnTracer(new V(5.4, 1.3, 30), new V(-2.8, 1.2, 39.2), 0xff9a7a, 999);
  G.spawnFlash(new V(-1.9, 1.38, 39.4), 2.4, 0xffc478, 999);
  G.spawnFlash(new V(5, 1.32, 30.4), 1.9, 0xffc478, 999);
  S.camOverride = { pos: [-7.6, 1.9, 47.5], look: [4, 1.2, 27] };
  setDialogue('Ines Halvorsen', 'LOOKOUT · “GLASS EYE”', 'Four on the toll crew, two cars for cover. Drop them clean, Cass.', '#31556e', '#0a1218');
}
function stageStart(G, S) {
  G.applyMood('golden');
  document.querySelectorAll('.panel').forEach(p => { p.style.display = 'none'; });
  document.getElementById('start-screen').style.display = 'flex';
  G.heroCar.group.position.set(3.4, 0, 232); G.heroCar.heading = Math.PI; G.heroCar.group.rotation.y = Math.PI;
  G.placeTraffic(0, -4.2, 170, 0); G.placeTraffic(1, 4.4, 290, Math.PI);
  G.stagePeds(210, 8);
  G.heli.position.set(-26, 22, 120); G.heli.rotation.y = Math.PI * 0.8;
  G.setSpotlight(0);
  S.camOverride = { pos: [12, 9, 266], look: [8, 1.5, 196] }; // ronde 4: vista reframed so the z=236 cross-street mouth + facade gap read in the mid-ground (hero car already stages at the intersection, z=232)
  G.playerPos.set(3.4, 0, 232);
}
function stageNight(G, S) {
  G.applyMood('night');
  baseState(S, 51230, 1);
  S.driving = true; S.vehicleName = 'Albacore GT'; S.vehicleCond = 100; S.speed = 15.2; // ≈ 34 MPH
  S.radio = { name: 'BEACON NIGHTS 88.3', track: 'Mira & The Herons — “High Water”' };
  S.mission = { ch: 2, chapterName: 'HIGH WATER RISING', name: 'Neon Ballast', objective: 'Deliver the ballast case to Beacon Quarter', index: 7, stage: 1, stageCount: 3, stageFrac: 0.4, timeLeft: 268 };
  const hero = G.heroCar; hero.group.position.set(2.6, 0, 262); hero.heading = Math.PI; hero.group.rotation.y = Math.PI;
  G.playerPos.set(2.6, 0, 262); S.playerHeading = Math.PI;
  G.placePolice(0, 3.1, 290, Math.PI);
  G.placeTraffic(0, -4.2, 190, 0); G.placeTraffic(1, 4.2, 170, Math.PI); G.placeTraffic(2, -4.4, 306, 0);
  G.heli.position.set(-20, 26, 200); G.heli.rotation.y = Math.PI * 0.75;
  G.playerPerson.group.visible = false;
  G.setSpotlight(0);
  G.stagePeds(250, 7);
  const V = G.V3;
  G.spawnFlash(new V(1.5, 0.72, 264.4), 0.55, 0xff2a22, 999);
  G.spawnFlash(new V(3.7, 0.72, 264.4), 0.55, 0xff2a22, 999);
  S.camOverride = null;
  setDialogue('Mira Solano', 'FIXER · “THE LEDGER”', 'Drops are lit across the bay tonight. Neon means money, Cassian.', '#5e3a6e', '#120a18');
}
