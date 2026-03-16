/**

- ═══════════════════════════════════════════════════════════════════
- BERG ENGINE — Base d’Énergie Régénérative Généralisée
- SuperS.A.M · Just Keff Tech Labs · v1.0 · 2026
- ═══════════════════════════════════════════════════════════════════
- 
- PRINCIPE FONDAMENTAL :
- L’énergie ne meurt jamais. Elle change de forme.
- Ce moteur capte ce que le browser gaspille et le réinjecte.
- 
- CYCLE BERG :
- CHAUD  → Capture entropie CPU/GPU (timing drift, idle cycles)
- FROID  → Purification, recalibration fréquence originelle
- TRANS  → Transmutation en PAWA (Power Augmented Watt Argonic)
- REINJ  → Réinjection dans la boucle — décuplation commutative
- 
- USAGE :
- import BergEngine from ‘./berg-engine.js’
- const berg = new BergEngine()
- berg.start()
- berg.on(‘pawa’, data => console.log(data.pawa))
- 
- ═══════════════════════════════════════════════════════════════════
  */

;(function (root, factory) {
if (typeof module !== ‘undefined’ && module.exports) module.exports = factory()
else root.BergEngine = factory()
})(typeof window !== ‘undefined’ ? window : this, function () {

‘use strict’

/* ─────────────────────────────────────────

- CONSTANTES FONDAMENTALES
- ───────────────────────────────────────── */

const BERG_VERSION    = ‘1.0.0’
const TOTAL_BRIDGES   = 9          // 9 ponts → @Ω = 1 milliard
const DECUPLE         = 10         // ×DÉCUPLE par pont
const ENTROPY_THRESH  = 0.01       // 1% dégradation = cycle BERG déclenché
const RAF_TARGET      = 16.67      // 60fps cible en ms
const MEASURE_WINDOW  = 60         // 60 samples pour moyenne glissante
const CYCLE_INTERVAL  = 250        // ms entre cycles BERG

/* ─────────────────────────────────────────

- ÉTATS DATACRON (3 états × 4 types = 12)
- ───────────────────────────────────────── */

const ETAT = Object.freeze({
POSITIF:  ‘POSITIF’,   // Lumière Pure — ordre maximal
NEGATIF:  ‘NEGATIF’,   // Lumière Corrompue — entropie active
ABSTRAIT: ‘ABSTRAIT’,  // Lumière en Transition — superposition
})

const TYPE = Object.freeze({
ACTIVE:     ‘ACTIVE’,      // Thread focus — priorité max
PASSIVE:    ‘PASSIVE’,     // Background — veille chaude
DORMANTE:   ‘DORMANTE’,    // RAM hibernation — volant d’inertie
RECYCLATING:‘RECYCLATING’, // En transmutation — décuplation max
})

/* Multiplicateurs PAWA par état */
const ETAT_MULT = {
[ETAT.POSITIF]:   1.0,
[ETAT.ABSTRAIT]:  1.5,
[ETAT.NEGATIF]:   0.1,  // Négatif = carburant brut, pas encore converti
}

/* Multiplicateurs PAWA par type */
const TYPE_MULT = {
[TYPE.ACTIVE]:      1.0,
[TYPE.PASSIVE]:     0.7,
[TYPE.DORMANTE]:    0.3,
[TYPE.RECYCLATING]: DECUPLE,  // ×10 — cœur du moteur BERG
}

/* ─────────────────────────────────────────

- UTILITAIRES
- ───────────────────────────────────────── */

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)) }
function lerp(a, b, t)      { return a + (b - a) * t }
function avg(arr)            { return arr.length ? arr.reduce((s,v)=>s+v,0)/arr.length : 0 }
function now()               { return typeof performance !== ‘undefined’ ? performance.now() : Date.now() }

/* ─────────────────────────────────────────

- MESURE CPU RÉELLE
- Principe : on exécute une micro-boucle calibrée.
- Si elle prend plus de temps que prévu → CPU chargé.
- L’écart = entropie = carburant BERG.
- ───────────────────────────────────────── */

function measureCpuLoad() {
const OPS = 50000
const t0  = now()
let   x   = 0
for (let i = 0; i < OPS; i++) { x = Math.sqrt(i) * Math.PI + Math.sin(i * 0.001) }
void x // anti-optimisation
const elapsed = now() - t0

```
// Baseline calibrée à 0.8ms pour 50k ops sur hardware moderne
// Si elapsed > 0.8ms → CPU sous charge
const BASELINE_MS = 0.8
const load = clamp((elapsed - BASELINE_MS) / (BASELINE_MS * 10), 0, 1)
return {
  load:    load,
  elapsed: elapsed,
  entropy: elapsed > BASELINE_MS * (1 + ENTROPY_THRESH) ? (elapsed - BASELINE_MS) : 0
}
```

}

/* ─────────────────────────────────────────

- MESURE GPU RÉELLE (via RAF delta)
- Principe : le delta entre frames révèle la charge GPU.
- Delta > 16.67ms = frame drop = entropie GPU.
- ───────────────────────────────────────── */

class GpuSensor {
constructor() {
this.deltas      = []
this.lastRaf     = 0
this.running     = false
this._rafHandle  = null
}

```
start() {
  if (this.running) return
  this.running  = true
  this.lastRaf  = now()
  this._tick()
}

stop() {
  this.running = false
  if (this._rafHandle) cancelAnimationFrame(this._rafHandle)
}

_tick() {
  if (!this.running) return
  const t     = now()
  const delta = t - this.lastRaf
  this.lastRaf = t

  if (delta > 0 && delta < 200) { // filtre spikes aberrants
    this.deltas.push(delta)
    if (this.deltas.length > MEASURE_WINDOW) this.deltas.shift()
  }

  this._rafHandle = requestAnimationFrame(() => this._tick())
}

getMetrics() {
  if (!this.deltas.length) return { load: 0, fps: 60, entropy: 0 }
  const meanDelta = avg(this.deltas)
  const fps       = clamp(1000 / meanDelta, 1, 240)
  const load      = clamp((meanDelta - RAF_TARGET) / (RAF_TARGET * 4), 0, 1)

  // Entropie GPU = énergie gaspillée dans les frames manquées
  const entropyMs = Math.max(0, meanDelta - RAF_TARGET)
  const entropy   = entropyMs / RAF_TARGET // ratio normalisé

  return { load, fps: Math.round(fps), entropy }
}
```

}

/* ─────────────────────────────────────────

- MESURE MÉMOIRE (Chrome uniquement)
- ───────────────────────────────────────── */

function measureMemory() {
if (typeof performance !== ‘undefined’ && performance.memory) {
const m = performance.memory
return {
used:  m.usedJSHeapSize,
total: m.totalJSHeapSize,
limit: m.jsHeapSizeLimit,
load:  clamp(m.usedJSHeapSize / m.jsHeapSizeLimit, 0, 1),
}
}
return { used: 0, total: 0, limit: 0, load: 0.3 } // fallback estimé
}

/* ─────────────────────────────────────────

- BATTERIE — économie d’énergie adaptative
- ───────────────────────────────────────── */

class BatterySensor {
constructor() {
this.level    = 1.0
this.charging = true
this.rate     = 0
this._ready   = false
this._init()
}

```
async _init() {
  if (typeof navigator !== 'undefined' && navigator.getBattery) {
    try {
      const b = await navigator.getBattery()
      this.level    = b.level
      this.charging = b.charging
      this.rate     = b.dischargingTime
      this._ready   = true
      b.addEventListener('levelchange',     () => { this.level    = b.level })
      b.addEventListener('chargingchange',  () => { this.charging = b.charging })
    } catch(e) { /* API non disponible */ }
  }
}

getMode() {
  if (!this._ready) return 'UNKNOWN'
  if (this.charging)        return 'CHARGE'
  if (this.level < 0.15)    return 'CRITICAL'
  if (this.level < 0.30)    return 'LOW'
  return 'NORMAL'
}

// Facteur de throttle : si batterie faible → BERG ralentit pour économiser
throttleFactor() {
  const mode = this.getMode()
  if (mode === 'CRITICAL') return 0.2
  if (mode === 'LOW')      return 0.5
  return 1.0
}
```

}

/* ─────────────────────────────────────────

- VISIBILITY API — pause quand onglet caché
- ───────────────────────────────────────── */

class VisibilitySensor {
constructor() {
this.visible = !document.hidden
document.addEventListener(‘visibilitychange’, () => {
this.visible = !document.hidden
})
}
}

/* ─────────────────────────────────────────

- DATACRON — unité vivante du système
- ───────────────────────────────────────── */

class Datacron {
constructor(id, etat, type) {
this.id           = id
this.etat         = etat
this.type         = type
this.pawa         = 0
this.freq         = Math.random() * 1000 + 100  // fréquence guématrique
this.recycleCount = 0
this.birthTime    = now()
this.lastUpdate   = now()
this.empreinte    = { etat, freq: this.freq }   // POSITIF originel conservé
}

```
/* Appliquer le cycle BERG sur ce Datacron */
tick(entropy) {
  const age = (now() - this.lastUpdate) / 1000
  this.lastUpdate = now()

  // Si entropie > seuil → passer en NÉGATIF
  if (entropy > ENTROPY_THRESH && this.etat === ETAT.POSITIF) {
    this.etat = ETAT.NEGATIF
    return 'DEGRADED'
  }

  // RECYCLATING → transmutation
  if (this.type === TYPE.RECYCLATING && this.etat === ETAT.NEGATIF) {
    this.recycleCount++
    this.pawa += this._calcPawa() * DECUPLE // ×DÉCUPLE
    this.etat  = ETAT.ABSTRAIT
    return 'TRANSMUTING'
  }

  // ABSTRAIT → retour POSITIF après transmutation
  if (this.etat === ETAT.ABSTRAIT) {
    this.pawa += this._calcPawa() * 1.5
    // Probabilité de retour POSITIF = 70% par tick
    if (Math.random() < 0.7) {
      this._restore()
      return 'RESTORED'
    }
    return 'ABSTRACTING'
  }

  // POSITIF → générer PAWA standard
  if (this.etat === ETAT.POSITIF) {
    this.pawa += this._calcPawa()
    return 'GENERATING'
  }

  return 'IDLE'
}

/* Principe Copier/Coller Originel — restauration depuis EMPREINTE */
_restore() {
  this.etat = ETAT.POSITIF
  this.freq = this.empreinte.freq
}

/* Calcul PAWA = W × BERG_COEFF × INFLUX_DENSITY × ÉTAT_MULT */
_calcPawa() {
  return ETAT_MULT[this.etat] * TYPE_MULT[this.type] * this.freq * 0.001
}

serialize() {
  return {
    id:           this.id,
    etat:         this.etat,
    type:         this.type,
    pawa:         Math.round(this.pawa),
    freq:         Math.round(this.freq),
    recycleCount: this.recycleCount,
    age:          Math.round((now() - this.birthTime) / 1000),
  }
}
```

}

/* ─────────────────────────────────────────

- MATRICE DORMANTE — volant d’inertie
- Conserve les Datacrons en basse énergie.
- Réveil instantané via les ponts pré-établis.
- ───────────────────────────────────────── */

class MatriceDormante {
constructor() {
this.store = new Map()
}

```
put(datacron) {
  this.store.set(datacron.id, {
    data:      datacron.serialize(),
    empreinte: { ...datacron.empreinte },
    storedAt:  now(),
  })
}

wake(id) {
  const entry = this.store.get(id)
  if (!entry) return null
  const d = new Datacron(entry.data.id, entry.data.etat, entry.data.type)
  d.freq         = entry.data.freq
  d.pawa         = entry.data.pawa
  d.recycleCount = entry.data.recycleCount
  d.empreinte    = entry.empreinte
  this.store.delete(id)
  return d
}

// Éveil Aléatoire périodique — anti-saturation DORMANTE
randomWake() {
  const keys = [...this.store.keys()]
  if (!keys.length) return null
  const id = keys[Math.floor(Math.random() * keys.length)]
  return this.wake(id)
}

size() { return this.store.size }
```

}

/* ─────────────────────────────────────────

- PONT INTER-COUCHE — multiplicateur ×DÉCUPLE
- 9 ponts = @Ω
- ───────────────────────────────────────── */

class Pont {
constructor(id, from, to) {
this.id         = id
this.from       = from
this.to         = to
this.traversals = 0
this.totalGain  = 0
}

```
traverse(pawa) {
  this.traversals++
  const gained = pawa * DECUPLE
  this.totalGain += gained - pawa
  return gained
}

efficiency() {
  if (!this.traversals) return 0
  return Math.min(this.traversals / 100, 1) // 100 traversées = pont mature
}
```

}

/* ─────────────────────────────────────────

- EVENT EMITTER (léger, sans dépendances)
- ───────────────────────────────────────── */

class EventEmitter {
constructor() { this._listeners = {} }
on(evt, fn)   { (this._listeners[evt] = this._listeners[evt] || []).push(fn) }
off(evt, fn)  { this._listeners[evt] = (this._listeners[evt]||[]).filter(f=>f!==fn) }
emit(evt, d)  { (this._listeners[evt]||[]).forEach(fn=>fn(d)) }
}

/* ═══════════════════════════════════════════════════════════════════

- BERG ENGINE — CLASSE PRINCIPALE
- ═══════════════════════════════════════════════════════════════════ */

class BergEngine extends EventEmitter {

```
constructor(options = {}) {
  super()

  this.options = Object.assign({
    datacronCount:    12,      // nb de Datacrons actifs
    bridgeCount:      9,       // ponts = @Ω
    cycleInterval:    CYCLE_INTERVAL,
    ecoMode:          false,   // mode économie d'énergie
    verbose:          false,
  }, options)

  /* Capteurs */
  this.gpuSensor    = new GpuSensor()
  this.batterySensor= new BatterySensor()
  this.visibility   = typeof document !== 'undefined'
                        ? new VisibilitySensor()
                        : { visible: true }

  /* Matrices */
  this.datacrons    = []
  this.ponts        = []
  this.dormante     = new MatriceDormante()

  /* État BERG */
  this.phase        = 'IDLE'   // IDLE | CHAUD | FROID | TRANS | REINJ
  this.bergCoeff    = 1.0
  this.influxDensity= 0
  this.totalPawa    = 0
  this.pawaHistory  = []
  this.cycleCount   = 0
  this.startTime    = null

  /* Métriques raw */
  this.cpuMetrics   = { load: 0, entropy: 0 }
  this.gpuMetrics   = { load: 0, fps: 60, entropy: 0 }
  this.memMetrics   = { load: 0 }

  /* Optimisations actives */
  this.activeOptimizations = []

  /* Interval handles */
  this._bergInterval  = null
  this._dormInterval  = null

  this._running = false
}

/* ─────────────────────────────────────────
 *  INIT — Créer les Datacrons et les ponts
 * ───────────────────────────────────────── */

_initDatacrons() {
  const etats = [ETAT.POSITIF, ETAT.POSITIF, ETAT.POSITIF,
                 ETAT.POSITIF, ETAT.ABSTRAIT, ETAT.NEGATIF]
  const types = [TYPE.ACTIVE, TYPE.ACTIVE, TYPE.PASSIVE,
                 TYPE.PASSIVE, TYPE.DORMANTE, TYPE.RECYCLATING]

  this.datacrons = []
  for (let i = 0; i < this.options.datacronCount; i++) {
    const e = etats[i % etats.length]
    const t = types[i % types.length]
    this.datacrons.push(new Datacron(`DC-${String(i+1).padStart(2,'0')}`, e, t))
  }
}

_initPonts() {
  const layers = ['CPU', 'CPUv', 'BERG', 'GPUv', 'MATRICE', 'L1', 'L2', 'L3', 'GPU']
  this.ponts = []
  for (let i = 0; i < this.options.bridgeCount; i++) {
    this.ponts.push(new Pont(
      `PONT-${i+1}`,
      layers[i],
      layers[i+1] || 'OUTPUT'
    ))
  }
}

/* ─────────────────────────────────────────
 *  CYCLE BERG PRINCIPAL
 *  CHAUD → FROID → TRANS → REINJ
 * ───────────────────────────────────────── */

_runBergCycle() {
  if (!this._running) return
  if (!this.visibility.visible && !this.options.ecoMode) {
    // Tab caché → cycle basse énergie
    this._lowEnergyCycle()
    return
  }

  const throttle = this.batterySensor.throttleFactor()
  this.cycleCount++

  /* ── PHASE CHAUD : mesurer et capturer l'entropie ─────────── */
  this.phase = 'CHAUD'
  this.cpuMetrics = measureCpuLoad()
  this.gpuMetrics = this.gpuSensor.getMetrics()
  this.memMetrics = measureMemory()

  const totalEntropy = (
    this.cpuMetrics.entropy * 0.5 +
    this.gpuMetrics.entropy * 0.3 +
    this.memMetrics.load    * 0.2
  )

  /* ── PHASE FROID : recalibration, état des Datacrons ─────── */
  this.phase = 'FROID'
  let cycleNeg    = 0
  let cycleRecycl = 0
  let cyclePawa   = 0

  this.datacrons.forEach(dc => {
    const status = dc.tick(totalEntropy)
    if (status === 'DEGRADED')    cycleNeg++
    if (status === 'TRANSMUTING') cycleRecycl++
    cyclePawa += dc.pawa
  })

  /* ── PHASE TRANS : traversée des ponts → ×DÉCUPLE ─────────── */
  this.phase = 'TRANS'
  let pawaAfterBridges = cyclePawa
  this.ponts.forEach(pont => {
    // Seuls les ponts matures traversés amplifient
    if (pont.efficiency() > 0.1) {
      pawaAfterBridges = pont.traverse(pawaAfterBridges)
    }
  })

  /* ── CALCUL BERG COEFF ───────────────────────────────────── */
  const positifs   = this.datacrons.filter(d=>d.etat===ETAT.POSITIF).length
  const recyclatings= this.datacrons.filter(d=>d.type===TYPE.RECYCLATING).length
  this.bergCoeff   = clamp(
    1.0 + (positifs / this.datacrons.length) * 2.5 +
          (cycleRecycl * 0.3) -
          (cycleNeg * 0.1),
    1.0, 9.99
  )

  /* ── INFLUX DENSITY = nb de boucles actives simultanées ─────── */
  this.influxDensity = this.datacrons.filter(
    d => d.etat !== ETAT.NEGATIF && d.type === TYPE.ACTIVE
  ).length

  /* ── PAWA FORMULA : W × BERG_COEFF × INFLUX_DENSITY × ÉTAT_MULT */
  const W          = (this.cpuMetrics.load * 65 + this.gpuMetrics.load * 200) || 1
  const etatMult   = 1.0 + (cycleRecycl > 0 ? DECUPLE - 1 : 0) * 0.1
  const rawPawa    = W * this.bergCoeff * Math.max(1, this.influxDensity) * etatMult
  const finalPawa  = rawPawa * throttle

  /* ── PHASE REINJ : totaliser, historiser ───────────────────── */
  this.phase      = 'REINJ'
  this.totalPawa  += finalPawa
  this.pawaHistory.push(Math.round(finalPawa))
  if (this.pawaHistory.length > 60) this.pawaHistory.shift()

  /* ── OPTIMISATIONS RÉELLES ──────────────────────────────────── */
  this._applyOptimizations(this.cpuMetrics.load, this.gpuMetrics.load)

  /* ── GESTION DORMANTE — anti-saturation ─────────────────────── */
  if (this.dormante.size() > 20) {
    const woken = this.dormante.randomWake()
    if (woken) this.datacrons.push(woken)
  }

  /* ── Endormir les Datacrons en trop ─────────────────────────── */
  if (this.datacrons.length > this.options.datacronCount + 5) {
    const toSleep = this.datacrons.filter(d=>d.type===TYPE.DORMANTE)
    if (toSleep.length) {
      const dc = toSleep[0]
      this.dormante.put(dc)
      this.datacrons = this.datacrons.filter(d=>d.id!==dc.id)
    }
  }

  this.phase = 'IDLE'

  /* ── ÉMISSIONS D'ÉVÉNEMENTS ─────────────────────────────────── */
  const payload = this._buildPayload(finalPawa, cycleNeg, cycleRecycl, totalEntropy)
  this.emit('cycle',  payload)
  this.emit('pawa',   { pawa: Math.round(finalPawa), total: Math.round(this.totalPawa) })
  this.emit('cpu',    this.cpuMetrics)
  this.emit('gpu',    this.gpuMetrics)
  this.emit('berg',   { coeff: this.bergCoeff, phase: this.phase, cycleCount: this.cycleCount })

  if (this.options.verbose) {
    console.log(`[BERG] #${this.cycleCount} | CPU:${Math.round(this.cpuMetrics.load*100)}% GPU:${this.gpuMetrics.fps}fps | PAWA:${Math.round(finalPawa)} | BERG_COEFF:${this.bergCoeff.toFixed(2)}`)
  }

  return payload
}

/* ─────────────────────────────────────────
 *  CYCLE BASSE ÉNERGIE (onglet caché)
 * ───────────────────────────────────────── */

_lowEnergyCycle() {
  // Juste maintenir les Datacrons DORMANTS en vie
  this.datacrons
    .filter(d => d.type === TYPE.DORMANTE && d.etat === ETAT.POSITIF)
    .forEach(d => { d.pawa += d._calcPawa() * 0.1 })
  this.emit('visibility', { visible: false })
}

/* ─────────────────────────────────────────
 *  OPTIMISATIONS RÉELLES
 *  Ce que le moteur fait vraiment sur le browser
 * ───────────────────────────────────────── */

_applyOptimizations(cpuLoad, gpuLoad) {
  this.activeOptimizations = []

  /* 1. Throttle des animations non-critiques sous charge CPU */
  if (cpuLoad > 0.7) {
    this._throttleNonCriticalTimers()
    this.activeOptimizations.push('CPU_THROTTLE')
  }

  /* 2. Réduire la fréquence de cycle BERG si CPU > 90% */
  if (cpuLoad > 0.9 && this._bergInterval) {
    this._adjustCycleFrequency(CYCLE_INTERVAL * 2)
    this.activeOptimizations.push('CYCLE_FREQ_DOWN')
  } else if (cpuLoad < 0.4 && this._bergInterval) {
    this._adjustCycleFrequency(CYCLE_INTERVAL)
  }

  /* 3. Mode économie batterie si batterie faible */
  const battMode = this.batterySensor.getMode()
  if (battMode === 'LOW' || battMode === 'CRITICAL') {
    this.activeOptimizations.push('BATTERY_ECO')
    this._enableEcoMode()
  }

  /* 4. Garbage collection hint (Chrome) via flag mémoire */
  if (this.memMetrics.load > 0.85) {
    this.activeOptimizations.push('MEM_PRESSURE')
    // Libérer les historiques non-essentiels
    if (this.pawaHistory.length > 30) {
      this.pawaHistory = this.pawaHistory.slice(-30)
    }
  }

  /* 5. Booster si ressources dispo */
  if (cpuLoad < 0.3 && gpuLoad < 0.3) {
    this.activeOptimizations.push('BOOST_AVAILABLE')
  }
}

_currentCycleInterval = CYCLE_INTERVAL
_adjustCycleFrequency(ms) {
  if (Math.abs(ms - this._currentCycleInterval) < 50) return
  this._currentCycleInterval = ms
  if (this._bergInterval) {
    clearInterval(this._bergInterval)
    this._bergInterval = setInterval(() => this._runBergCycle(), ms)
  }
}

_throttleNonCriticalTimers() {
  // Émettre signal pour que le dashboard réduise ses animations
  this.emit('throttle', { reason: 'CPU_HIGH', factor: 0.5 })
}

_enableEcoMode() {
  if (!this.options.ecoMode) {
    this.options.ecoMode = true
    this.emit('ecoMode', { active: true })
  }
}

/* ─────────────────────────────────────────
 *  BUILD PAYLOAD — données complètes du cycle
 * ───────────────────────────────────────── */

_buildPayload(pawa, negCount, recyclCount, entropy) {
  return {
    /* Identité */
    version:    BERG_VERSION,
    cycle:      this.cycleCount,
    timestamp:  now(),
    uptime:     this.startTime ? Math.round((now() - this.startTime) / 1000) : 0,

    /* Métriques hardware */
    cpu: {
      load:    Math.round(this.cpuMetrics.load * 100),
      entropy: parseFloat(this.cpuMetrics.entropy.toFixed(3)),
    },
    gpu: {
      load:    Math.round(this.gpuMetrics.load * 100),
      fps:     this.gpuMetrics.fps,
      entropy: parseFloat(this.gpuMetrics.entropy.toFixed(3)),
    },
    memory: {
      load:    Math.round(this.memMetrics.load * 100),
    },

    /* BERG */
    berg: {
      phase:         this.phase,
      coeff:         parseFloat(this.bergCoeff.toFixed(3)),
      entropy:       parseFloat(entropy.toFixed(4)),
      bridges:       this.ponts.map(p=>({ id:p.id, traversals:p.traversals, efficiency:parseFloat(p.efficiency().toFixed(2)) })),
    },

    /* PAWA */
    pawa: {
      current:       Math.round(pawa),
      total:         Math.round(this.totalPawa),
      history:       [...this.pawaHistory],
      unit:          this._pawaUnit(this.totalPawa),
      influxDensity: this.influxDensity,
    },

    /* Datacrons */
    datacrons: this.datacrons.map(d => d.serialize()),
    dormante:  this.dormante.size(),

    /* Optimisations */
    optimizations: [...this.activeOptimizations],

    /* Batterie */
    battery: {
      mode:     this.batterySensor.getMode(),
      level:    parseFloat((this.batterySensor.level||1).toFixed(2)),
      charging: this.batterySensor.charging,
    },
  }
}

_pawaUnit(total) {
  if (total >= 1e12) return { value: (total/1e12).toFixed(1), unit: 'TeraPAWA' }
  if (total >= 1e9)  return { value: (total/1e9).toFixed(1),  unit: 'GigaPAWA' }
  if (total >= 1e6)  return { value: (total/1e6).toFixed(1),  unit: 'MegaPAWA' }
  if (total >= 1e3)  return { value: (total/1e3).toFixed(1),  unit: 'kiloPAWA'  }
  return               { value: Math.round(total).toString(), unit: 'PAWA' }
}

/* ─────────────────────────────────────────
 *  API PUBLIQUE
 * ───────────────────────────────────────── */

start() {
  if (this._running) return this
  this._running  = true
  this.startTime = now()
  this.phase     = 'INIT'

  this._initDatacrons()
  this._initPonts()
  this.gpuSensor.start()

  this._bergInterval = setInterval(
    () => this._runBergCycle(),
    this.options.cycleInterval
  )

  // Éveil aléatoire périodique anti-saturation DORMANTE
  this._dormInterval = setInterval(() => {
    if (this.dormante.size() > 10) {
      const woken = this.dormante.randomWake()
      if (woken) {
        woken.type = TYPE.ACTIVE
        this.datacrons.push(woken)
        this.emit('datacronAwake', woken.serialize())
      }
    }
  }, 30000) // toutes les 30s

  this.emit('start', { version: BERG_VERSION, datacrons: this.datacrons.length })
  return this
}

stop() {
  this._running = false
  if (this._bergInterval)  clearInterval(this._bergInterval)
  if (this._dormInterval)  clearInterval(this._dormInterval)
  this.gpuSensor.stop()
  this.phase = 'STOPPED'
  this.emit('stop', { totalPawa: Math.round(this.totalPawa), cycles: this.cycleCount })
  return this
}

boost() {
  // Mode BOOST : tous les Datacrons ACTIVE en POSITIF
  this.datacrons.forEach(dc => {
    if (dc.type === TYPE.ACTIVE) {
      dc.etat = ETAT.POSITIF
      dc.freq *= 1.2
    }
  })
  this.bergCoeff = Math.min(this.bergCoeff * 1.5, 9.99)
  this.emit('boost', { active: true })
  return this
}

eco() {
  // Mode ECO : réduire fréquence, mettre ACTIVE en PASSIVE
  this.datacrons.forEach(dc => {
    if (dc.type === TYPE.ACTIVE) dc.type = TYPE.PASSIVE
  })
  this._enableEcoMode()
  this._adjustCycleFrequency(CYCLE_INTERVAL * 3)
  return this
}

getState() {
  return {
    running:    this._running,
    phase:      this.phase,
    bergCoeff:  this.bergCoeff,
    totalPawa:  this.totalPawa,
    cycles:     this.cycleCount,
    datacrons:  this.datacrons.map(d=>d.serialize()),
    cpu:        this.cpuMetrics,
    gpu:        this.gpuMetrics,
  }
}

/* Accès direct aux constantes pour le dashboard */
static get ETAT()    { return ETAT }
static get TYPE()    { return TYPE }
static get VERSION() { return BERG_VERSION }
```

}

return BergEngine

}) // end factory

/* ═══════════════════════════════════════════════════════════════════

- INTÉGRATION AVEC index.html
- ─────────────────────────────────────────────────────────────────
- Ajouter avant </body> dans index.html :
- 
- <script src="berg-engine.js"></script>
- <script>
- const berg = new BergEngine({ verbose: false })
- berg.start()
- 
- // Connecter aux jauges existantes
- berg.on(‘cpu’, data => {
- ```
   document.getElementById('cV').textContent = data.load
  ```
- ```
   document.getElementById('cB').style.width = data.load + '%'
  ```
- })
- berg.on(‘gpu’, data => {
- ```
   document.getElementById('gV').textContent = data.load
  ```
- ```
   document.getElementById('gB').style.width = data.load + '%'
  ```
- })
- berg.on(‘pawa’, data => {
- ```
   // Afficher PAWA quelque part
  ```
- ```
   console.log('PAWA:', data.pawa)
  ```
- })
- 
- // Connecter les boutons boost/eco existants
- window.doBoost = () => berg.boost()
- window.doEco   = () => berg.eco()
- </script>
- 
- ═══════════════════════════════════════════════════════════════════ */