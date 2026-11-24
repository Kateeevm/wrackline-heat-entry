// WRACKLINE HEAT — HUD: every panel is fed from real game state each frame.
const $ = id => document.getElementById(id);
const els = {};
['mchapter', 'mname', 'mobj', 'mstage', 'mtimer', 'stagefill', 'dispatch-list', 'v-health', 'v-armor', 'v-crew',
 'district-name', 'stars', 'wstatus', 'money', 'radio-name', 'radio-track', 'hud-abilities', 'speednum',
 'veh-name', 'veh-sub', 'condfill', 'hud-weapons', 'dlg-who', 'dlg-line', 'hud-prompt', 'prompt-text', 'hud-banner',
].forEach(id => { els[id] = $(id); });
const mm = $('minimap').getContext('2d');

export function setDialogue(who, role, line, skin, bg) {
  els['dlg-who'].innerHTML = `${who} <span>· ${role}</span>`;
  els['dlg-line'].textContent = line;
  const c = $('portrait').getContext('2d');
  c.fillStyle = bg; c.fillRect(0, 0, 104, 104);
  c.fillStyle = skin; c.beginPath(); c.arc(52, 42, 20, 0, 7); c.fill();
  c.fillRect(30, 62, 44, 34);
  c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(30, 62, 44, 8);
  c.fillStyle = '#10131a'; c.beginPath(); c.arc(45, 40, 3, 0, 7); c.arc(59, 40, 3, 0, 7); c.fill();
}
export function showPrompt(html, text) {
  els['hud-prompt'].style.display = html ? '' : 'none';
  if (text) els['prompt-text'].textContent = text;
}
export function showBanner(text, ms = 1600) {
  if (!text) { els['hud-banner'].style.display = 'none'; return; }
  els['hud-banner'].textContent = text; els['hud-banner'].style.display = '';
  if (ms > 0) setTimeout(() => { els['hud-banner'].style.display = 'none'; }, ms);
}
const fmtTime = s => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, '0')}:${String(Math.floor(Math.max(0, s) % 60)).padStart(2, '0')}`;
const TACTICS = [['chip-pursuit', 'PURSUIT'], ['chip-ram', 'RAMMING'], ['chip-spot', 'SPOTLIGHT'], ['chip-block', 'ROADBLOCK'], ['chip-hold', 'HOLD'], ['chip-air', 'AIR SUPPORT']];

export function updateHUD(G) {
  const S = G.S, M = S.mission;
  els.mchapter.textContent = M ? `CHAPTER ${['I', 'II', 'III'][M.ch]} · ${M.chapterName}` : 'FREE ROAM';
  els.mname.textContent = M ? M.name : 'Moonpool Bay';
  els.mobj.textContent = M ? M.objective : 'The bay is yours. Drive, earn, stay ahead of MBPD.';
  els.mstage.textContent = M ? `MISSION ${M.index + 1} / 10 · STAGE ${M.stage + 1}/${M.stageCount}` : 'ALL MISSIONS COMPLETE';
  els.mtimer.textContent = M ? fmtTime(M.timeLeft) : '--:--';
  els.stagefill.style.width = `${M ? Math.round(((M.stage + M.stageFrac) / M.stageCount) * 100) : 100}%`;
  // dispatch: real units, real distances, tactic from state
  let dh = '';
  if (!G.units.length) dh = '<div class="dunit">No units tasked<span class="dist">—</span></div>';
  for (const u of G.units) {
    const d = Math.round(Math.hypot(u.car.group.position.x - G.playerPos.x, u.car.group.position.z - G.playerPos.z));
    const t = TACTICS[u.tactic % TACTICS.length];
    dh += `<div class="dunit"><b>${u.name}</b><span class="chip ${t[0]}">${t[1]}</span><span class="dist">${d} m</span></div>`;
  }
  if (S.wanted >= 3) dh += `<div class="dunit"><b>DUNLIN-1</b><span class="chip chip-air">AIR SUPPORT</span><span class="dist">${Math.round(Math.hypot(G.heli.position.x - G.playerPos.x, G.heli.position.z - G.playerPos.z))} m</span></div>`;
  els['dispatch-list'].innerHTML = dh;
  els['v-health'].style.width = `${Math.max(0, S.health)}%`;
  els['v-armor'].style.width = `${Math.max(0, S.armor)}%`;
  els['v-crew'].style.width = `${Math.max(0, S.crew)}%`;
  els['district-name'].textContent = G.district.toUpperCase();
  els.stars.textContent = '★★★★★'.slice(0, S.wanted) + '☆☆☆☆☆'.slice(0, 5 - S.wanted);
  els.wstatus.textContent = S.wanted === 0 ? '● CLEAR — NO UNITS TASKED' : S.inSight ? '● IN SIGHT — MBPD CLOSING IN' : '● SEARCHING — BREAK LINE OF SIGHT';
  els.wstatus.style.color = S.wanted === 0 ? '#7fe08a' : '#ff9a7a';
  els.money.textContent = '$' + S.money.toLocaleString('en-US');
  els['radio-name'].textContent = S.radio.name;
  els['radio-track'].textContent = S.radio.track;
  els['hud-abilities'].innerHTML = S.abilities.map(a => {
    const cd = Math.max(0, (a.until - performance.now()) / 1000);
    return `<div class="ab"><span class="key">${a.key}</span><div class="aname">${a.name}</div><div class="acd ${cd > 0 ? 'cool' : ''}">${cd > 0 ? cd.toFixed(0) + 's' : 'READY'}</div></div>`;
  }).join('');
  const mph = Math.round(Math.abs(S.speed) * 2.237);
  els.speednum.innerHTML = `${S.driving ? mph : 0} <small>MPH</small>`;
  els['veh-name'].textContent = S.driving ? S.vehicleName : 'On Foot';
  els['veh-sub'].textContent = S.driving ? `CONDITION ${Math.round(S.vehicleCond)}% · ${S.speed > 0.5 ? 'DRIVING' : 'PARKED'}` : 'NO VEHICLE';
  els.condfill.style.width = `${S.driving ? Math.max(0, S.vehicleCond) : 0}%`;
  els['hud-weapons'].innerHTML = S.weapons.map((w, i) =>
    `<div class="wp ${i === S.selWeapon ? 'sel' : ''}"><span class="wico">${w.icon}</span>${w.name}<br><span class="wammo">${w.ammo}</span></div>`).join('');
  drawMinimap(G);
}
function drawMinimap(G) {
  const S = G.S, W = 376, H = 248;
  mm.fillStyle = '#12242e'; mm.fillRect(0, 0, W, H);
  const zc = G.playerPos.z;
  const px = wx => (wx + 42) / 128 * W;              // world x -42..86 (ronde 4: widened so the whole grid fits)
  const pz = wz => (wz - (zc - 165)) / 330 * H;      // player-centred z window ±165
  mm.fillStyle = '#1d4e5e'; mm.fillRect(0, 0, px(-14), H);                    // sea
  mm.fillStyle = '#c9b083'; mm.fillRect(px(-14), 0, px(-9) - px(-14), H);     // sand
  mm.fillStyle = '#3a3f45'; mm.fillRect(px(-6), 0, px(6) - px(-6), H);        // boulevard
  if (G.cityGrid) { // ronde 4: the real network — avenue bands + cross-street bands, same road colour
    mm.fillStyle = '#3a3f45';
    for (const ax of G.cityGrid.aves) mm.fillRect(px(ax - 5.5), 0, px(ax + 5.5) - px(ax - 5.5), H);
    for (const cz of G.cityGrid.cross) { const y0 = pz(cz - 5.5); if (y0 < H && pz(cz + 5.5) > 0) mm.fillRect(px(-6), y0, px(74) - px(-6), pz(cz + 5.5) - y0); }
  }
  mm.strokeStyle = '#ffb35c'; mm.beginPath(); mm.moveTo(px(0), 0); mm.lineTo(px(0), H); mm.stroke();
  if (S.wanted >= 3) { // search radius
    mm.strokeStyle = 'rgba(255,80,60,.8)'; mm.beginPath();
    mm.arc(px(G.playerPos.x), pz(G.playerPos.z), 26 / 880 * H + 14, 0, 7); mm.stroke();
  }
  const blip = (x, z, col, r = 4) => { mm.fillStyle = col; mm.beginPath(); mm.arc(px(x), pz(z), r, 0, 7); mm.fill(); };
  for (const c of G.traffic) blip(c.group.position.x, c.group.position.z, '#9fb4cc', 3);
  for (const e of G.enemies) if (e.hp > 0) blip(e.person.position.x, e.person.position.z, '#ff5040', 4);
  for (const u of G.units) blip(u.car.group.position.x, u.car.group.position.z, '#4da3ff', 4);
  if (S.wanted >= 3) blip(G.heli.position.x, G.heli.position.z, '#6ee7e0', 4);
  if (S.markerPos) blip(S.markerPos.x, S.markerPos.z, '#ffd34d', 6);
  // player arrow
  mm.save(); mm.translate(px(G.playerPos.x), pz(G.playerPos.z)); mm.rotate(-S.playerHeading);
  mm.fillStyle = '#fff'; mm.beginPath(); mm.moveTo(0, -8); mm.lineTo(5, 6); mm.lineTo(-5, 6); mm.closePath(); mm.fill(); mm.restore();
}
export function probeOverlaps() {
  const panels = [...document.querySelectorAll('.panel')].filter(p => p.offsetParent !== null || p.style.display !== 'none');
  const vis = panels.filter(p => { const r = p.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(p).display !== 'none'; });
  const out = [];
  for (let i = 0; i < vis.length; i++) for (let j = i + 1; j < vis.length; j++) {
    const a = vis[i].getBoundingClientRect(), b = vis[j].getBoundingClientRect();
    if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) out.push(`${vis[i].id}x${vis[j].id}`);
  }
  return out;
}
