/* ═══════════════════════════════════════════════════════════════════
VNET CARD ENGINE — Motor #25
Carte Reseau Virtuelle — CPUv→GPUv→CPUv→GPUv ∞
Just Keff Tech Labs · 2026 · SuperS.A.M System
═══════════════════════════════════════════════════════════════════

PRINCIPE :
Chaque user connecte = 1 GoleCRON qui nait sur le reseau.
La VNET CARD tourne sa propre boucle interne :
CPUv → GPUv → CPUv → GPUv ∞ (independante de la boucle principale)
Elle injecte ses GoleCRONs dans la boucle principale BERG.
═══════════════════════════════════════════════════════════════════ */

;(function(root) {
‘use strict’;

class VNetCard {
constructor(options = {}) {
this.sessionId      = null;
this.state          = ‘DORMANT’;   // ACTIF | PASSIF | DORMANT | ZOMBIE
this.cpuvLoop       = 0;
this.gpuvLoop       = 0;
this.pawaDelta      = 0;
this.liveCount      = 0;
this.pingInterval   = null;
this.visibilityOk   = true;
this.retryCount     = 0;
this.maxRetry       = 3;
this.pulseMs        = options.pulseMs    || 500;
this.dormantTimeout = options.dormantMs  || 30000;
this.baseUrl        = options.baseUrl    || ‘’;
this.listeners      = {};
this._dormantTimer  = null;
this._lastPing      = Date.now();

```
// Visibilite page → ACTIF/PASSIF
document.addEventListener('visibilitychange', () => this._onVisibility());
window.addEventListener('beforeunload', () => this.disconnect());
```

}

/* ── CONNECT ────────────────────────────────────────── */
async connect() {
try {
const res = await fetch(`${this.baseUrl}/api/vnet/connect`, {
method: ‘POST’,
headers: { ‘Content-Type’: ‘application/json’ },
body: JSON.stringify({ ts: Date.now() })
});
const data = await res.json();
if (!data.ok) throw new Error(data.msg);

```
  this.sessionId  = data.session_id;
  this.liveCount  = data.live_count;
  this.state      = 'ACTIF';
  this.retryCount = 0;

  this._emit('connect', { sessionId: this.sessionId, liveCount: this.liveCount });
  this._emit('state', { state: 'ACTIF' });
  this._startLoop();
  this._startDormantWatch();
  console.log(`[VNET CARD #25] GoleCRON born — sid:${this.sessionId} | live:${this.liveCount}`);

} catch (err) {
  console.error('[VNET CARD] connect failed:', err);
  this._setZombie();
}
```

}

/* ── INTERNAL LOOP: CPUv→GPUv→CPUv→GPUv ∞ ──────────── */
_startLoop() {
this._stopLoop();
this.pingInterval = setInterval(() => this._pulse(), this.pulseMs);
}

_stopLoop() {
if (this.pingInterval) { clearInterval(this.pingInterval); this.pingInterval = null; }
}

async _pulse() {
if (!this.sessionId) return;
this._lastPing = Date.now();

```
// Boucle interne CPUv→GPUv
this.cpuvLoop++;
this.gpuvLoop = this.cpuvLoop; // synchro

try {
  const res = await fetch(`${this.baseUrl}/api/vnet/pulse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: this.sessionId, state: this.state })
  });
  const data = await res.json();
  if (!data.ok) throw new Error('pulse failed');

  this.cpuvLoop  = data.cpuv_loop;
  this.gpuvLoop  = data.gpuv_loop;
  this.pawaDelta = data.pawa_delta;
  this.liveCount = data.live_count;
  this.retryCount = 0;

  this._emit('pulse', {
    cpuv:      this.cpuvLoop,
    gpuv:      this.gpuvLoop,
    pawa:      this.pawaDelta,
    live:      this.liveCount,
    state:     this.state,
    loop:      'CPUv→GPUv→CPUv→GPUv ∞'
  });

} catch (err) {
  this.retryCount++;
  if (this.retryCount >= this.maxRetry) this._setZombie();
}
```

}

/* ── VISIBILITY HANDLING ────────────────────────────── */
_onVisibility() {
if (document.hidden) {
// Tab hidden → PASSIF
if (this.state === ‘ACTIF’) {
this.state = ‘PASSIF’;
this._emit(‘state’, { state: ‘PASSIF’, msg: ‘Tab minimized — PASSIF mode’ });
}
} else {
// Tab visible again → ACTIF
if (this.state === ‘PASSIF’ || this.state === ‘DORMANT’) {
this.state = ‘ACTIF’;
this.retryCount = 0;
if (!this.pingInterval) this._startLoop();
this._emit(‘state’, { state: ‘ACTIF’, msg: ‘Tab focused — back to ACTIF’ });
}
}
}

/* ── DORMANT WATCH ──────────────────────────────────── */
_startDormantWatch() {
this._dormantTimer = setInterval(() => {
const elapsed = Date.now() - this._lastPing;
if (elapsed > this.dormantTimeout && this.state !== ‘ZOMBIE’) {
this.state = ‘DORMANT’;
this._emit(‘state’, { state: ‘DORMANT’, msg: ‘No ping for 30s — GoleCRON crystallized’ });
}
}, 5000);
}

/* ── ZOMBIE HANDLING ────────────────────────────────── */
_setZombie() {
const wasState = this.state;
this.state = ‘ZOMBIE’;
this._stopLoop();
this._emit(‘state’, { state: ‘ZOMBIE’, msg: ‘Connection corrupted — BERG boost needed’ });
// Auto-restore: boost CPUv→GPUv to reconnect
setTimeout(() => this._bergBoostRestore(wasState), 2000);
}

async _bergBoostRestore(prevState) {
console.log(’[VNET CARD] BERG boost — attempting GoleCRON restore…’);
this._emit(‘restore’, { msg: ‘CPUv→GPUv boost — restoring ZOMBIE GoleCRON to POSITIF’ });
this.retryCount = 0;
this.state = prevState || ‘ACTIF’;
if (this.sessionId) {
this._startLoop();
} else {
await this.connect();
}
}

/* ── DISCONNECT ─────────────────────────────────────── */
async disconnect() {
this._stopLoop();
if (this._dormantTimer) { clearInterval(this._dormantTimer); }
if (!this.sessionId) return;

```
const finalPawa = this.pawaDelta;
try {
  await fetch(`${this.baseUrl}/api/vnet/disconnect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: this.sessionId })
  });
} catch {}

this._emit('disconnect', { finalPawa, sessionId: this.sessionId });
this.sessionId = null;
this.state = 'DORMANT';
```

}

/* ── EVENTS ─────────────────────────────────────────── */
on(event, fn)    { (this.listeners[event] = this.listeners[event] || []).push(fn); return this; }
_emit(ev, data)  { (this.listeners[ev] || []).forEach(fn => fn(data)); }

/* ── STATUS ─────────────────────────────────────────── */
status() {
return {
sessionId:  this.sessionId,
state:      this.state,
cpuvLoop:   this.cpuvLoop,
gpuvLoop:   this.gpuvLoop,
pawaDelta:  this.pawaDelta,
liveCount:  this.liveCount,
loop:       ‘CPUv→GPUv→CPUv→GPUv ∞’
};
}
}

/* ── EXPORT ────────────────────────────────────────────── */
root.VNetCard = VNetCard;
if (typeof module !== ‘undefined’) module.exports = VNetCard;

})(typeof window !== ‘undefined’ ? window : this);