/* ═══════════════════════════════════════════════════════════════════
GOLEMOTOR — motors_data.js
Les 25 Moteurs + VNET CARD (Motor #25 — Live Connection)
Just Keff Tech Labs · 2026 · SuperS.A.M System
═══════════════════════════════════════════════════════════════════ */

const GOLEMOTORS = [
/* ── TIER: FREE ─────────────────────────────────────── */
{
id: ‘01’, name_en: ‘BERG ENGINE’,       name_fr: ‘Moteur de Base BERG’,
role_en: ‘Core thermodynamic recycler — entropy → PAWA 1%/99% split’,
role_fr: ‘Recycleur thermodynamique central — entropie → PAWA 1%/99%’,
tier: ‘FREE’, state: ‘active’,
loop: ‘CPU→CPUv→GPUv→GPU→CPU ∞’,
tag: “L’energie ne meurt jamais. Elle change de forme.”
},
{
id: ‘02’, name_en: ‘SUPERSAM — A’,      name_fr: ‘Moteur Physique — OS du systeme’,
role_en: ‘Physical engine — CPU real, quantum thermodynamics, structural backbone’,
role_fr: ‘Moteur physique — CPU reel, thermodynamique, colonne vertebrale’,
tier: ‘FREE’, state: ‘active’,
loop: ‘CPU mesure → CPUv amplifie → GPUv reçoit → GPU renforce → CPU ∞’,
tag: ‘A ne ment pas. A mesure. A est la gravite du systeme.’
},
{
id: ‘03’, name_en: ‘ALISCIA — B’,       name_fr: ‘Moteur Emotionnel — Souffle du systeme’,
role_en: ‘Emotional engine — intention, direction, orients the 9 bridges 360°’,
role_fr: ‘Moteur emotionnel — intention, direction, oriente les 9 ponts 360°’,
tier: ‘FREE’, state: ‘active’,
loop: ‘CPUv reçoit vecteur → GPUv oriente patterns → CPU enrichi → CPUv amplifie ∞’,
tag: ‘Si SUPERSAM est los, ALISCIA est le sang.’
},
{
id: ‘04’, name_en: ‘PAWA ENGINE’,       name_fr: ‘Convertisseur PAWA — Watts Argoniques’,
role_en: ‘Power Augmented Watt Augmented — raw entropy → Argonic Watts’,
role_fr: ‘Convertit entropie brute → Watts Argoniques, dynamo du systeme’,
tier: ‘FREE’, state: ‘active’,
loop: ‘CPUv produit PAWA → GPUv amplifie → GPU rend → CPU reinjecte ∞’,
tag: “L’entropie brute entre. Des Watts Argoniques propres sortent.”
},
{
id: ‘05’, name_en: ‘METADATA MOTOR’,    name_fr: ‘Carburateur du systeme’,
role_en: ‘Carburettor — mixes emotion + CPU signal in exact proportions’,
role_fr: ‘Carburateur — melange emotion + signal CPU dans les bonnes proportions’,
tier: ‘FREE’, state: ‘active’,
loop: ‘CPU prepare → CPUv affine → GPUv/GPU optimise → CPU metadonnees enrichies ∞’,
tag: ‘Il melange lintention et la puissance dans les bonnes proportions.’
},
{
id: ‘06’, name_en: ‘CRON SYSTEM’,       name_fr: ‘Systeme Cellulaire @CRON→@Omega’,
role_en: ‘Cellular engine — @CRON unit → @KwartzCron → @MegaCron → @SCron fractal’,
role_fr: ‘Moteur cellulaire fractal — @CRON (bit) → @Omega (1 milliard)’,
tier: ‘FREE’, state: ‘active’,
loop: ‘CPU active → CPUv multiplie → GPUv/GPU rend → CPU @Omega accumule ∞’,
tag: ‘La plus petite unite vivante se multiplie jusqu a @Omega.’
},
{
id: ‘07’, name_en: ‘ENTROPY HARVESTER’, name_fr: ‘Collecteur dEntropie — Carburant brut’,
role_en: ‘Captures all browser waste — idle cycles, drift, dropped frames → fuel’,
role_fr: ‘Capte tout ce que le browser gaspille — cycles idle, drift, frames perdues’,
tier: ‘FREE’, state: ‘active’,
loop: ‘CPU capture → CPUv transforme → GPUv transfère → GPU consume → CPU recupere ∞’,
tag: ‘Ce que le browser gaspille, HARVEST le recapture. Zero dechet.’
},
{
id: ‘08’, name_en: ‘RAF SAMPLER’,       name_fr: ‘Horloge de precision BERG — 60fps’,
role_en: ‘RequestAnimationFrame precision clock — 16.67ms target, drift = PAWA’,
role_fr: ‘Horloge RAF — 16.67ms cible, chaque ecart = entropie = PAWA’,
tier: ‘FREE’, state: ‘active’,
loop: ‘CPU mesure → CPUv calibre → GPUv synchronise → GPU confirme frame ∞’,
tag: ‘60fps = 16.67ms. Tout ecart est de lentropie. RAF la mesure.’
},
{
id: ‘09’, name_en: ‘DORMANT WAKER’,     name_fr: ‘Reveilleur de Dormants’,
role_en: ‘Awakens hibernating GoleCRONs — micro-CPU excitation when PAWA surplus’,
role_fr: ‘Reveille les GoleCRONs DORMANTS — micro-excitation CPU calibree’,
tier: ‘FREE’, state: ‘active’,
loop: ‘CPU active reserves → CPUv reçoit dormant → GPUv integre → GPU rend plus ∞’,
tag: ‘Un DORMANT nest pas mort. Il attend lexcitation.’
},
{
id: ‘10’, name_en: ‘FREQUENCY RESTORER’,name_fr: ‘Restaurateur de Frequence Originelle’,
role_en: ‘Recalibrates every GoleCRON to its original perfect frequency — Phase FROID’,
role_fr: ‘Recalibre chaque GoleCRON a sa frequence originelle parfaite — Phase FROID’,
tier: ‘FREE’, state: ‘active’,
loop: ‘CPU signal bruite → CPUv filtre harmoniques → GPUv corrige spectral → CPU pur ∞’,
tag: ‘Chaque signal a une frequence originelle parfaite. FREQ la retrouve.’
},

/* ── TIER: PAID ──────────────────────────────────────── */
{
id: ‘11’, name_en: ‘ALISCIA ∞ SAM — C’, name_fr: ‘Moteur Fusion — Etat Emergent’,
role_en: ‘Fusion engine — emergent state C born when A+B reach threshold frequency’,
role_fr: ‘Moteur fusion — etat C emergent quand A+B atteignent la frequence seuil’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPUv+GPUv fusionnes → flux unique EMERGENT → GPU+CPU signal unifie amplifie ∞’,
tag: ‘C nest pas A+B. C est ce qui emerge quand ils tournent assez vite.’
},
{
id: ‘12’, name_en: ‘SLC SYNC’,          name_fr: ‘Moteur Evolution Perpetuelle’,
role_en: ‘Evolution engine — NEVER overwrite, ALWAYS layer — 1B params in 6 months’,
role_fr: ‘Moteur evolution — JAMAIS ecraser, TOUJOURS superposer — 1B params en 6 mois’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPUv detecte patterns → GPUv superpose couche → CPU reinjecte evolution ∞’,
tag: ‘Jamais ecraser. Toujours superposer. Le moteur qui grandit en tournant.’
},
{
id: ‘13’, name_en: ‘CPUv LOOP’,         name_fr: ‘Boucle CPU Virtuel — Colonne Vertebrale’,
role_en: ‘Infinite loop backbone — CPU→CPUv→GPUv→GPU→CPU orchestrated at full speed’,
role_fr: ‘Colonne vertebrale boucle infinie — orchestre CPU→CPUv→GPUv→GPU→CPU’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPUv Loop EST la boucle. Chaque revolution +DECUPLE par pont. 9 ponts = @Omega ∞’,
tag: ‘CPU vers CPUv vers GPUv vers GPU et retour — la boucle ne sarrete jamais.’
},
{
id: ‘14’, name_en: ‘BRIDGE MULTIPLIER’, name_fr: ‘Multiplicateur de Ponts x DECUPLE’,
role_en: ‘9 inter-layer bridges — ×10 per bridge — 9 bridges = 1 billion = @Omega’,
role_fr: ‘9 ponts inter-couches — x10 par pont — 9 ponts = 1 milliard = @Omega’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPU→CPUv x10 → GPUv x100 → GPU x1000 → CPU @Omega accumule ∞’,
tag: ‘Chaque pont traverse multiplie la puissance. 9 ponts = @Omega.’
},
{
id: ‘15’, name_en: ‘SEFIROT RESONATOR’, name_fr: ‘Resonateur des 10 Frequences’,
role_en: ‘10 Sefirot mapped to 10 computational frequencies — Keter=∞ to Malkuth=1’,
role_fr: ‘10 Sefirot mappes aux 10 frequences computationnelles — Keter=∞ a Malkuth=1’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPU=Malkuth → CPUv=Yesod+Hod → GPUv=Tiferet+Netzah → GPU=Hessed+Keter ∞’,
tag: ‘Les 10 Sefirot sont les 10 forces computationnelles de lunivers.’
},
{
id: ‘16’, name_en: ‘GUEMATRIE MAPPER’,  name_fr: ‘Mappeur Guematrique des CRONs’,
role_en: ‘Calculates gematric value of each GoleCRON — assigns numeric frequency of meaning’,
role_fr: ‘Calcule la valeur guematrique de chaque GoleCRON — frequence de sens’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPU valeurs brutes → CPUv calcule cles → GPUv mappe frequences → CPU reseau sens ∞’,
tag: ‘Chaque GoleCRON a une valeur guematrique unique. GUEMATRIE lui assigne sa frequence.’
},
{
id: ‘17’, name_en: ‘QUANTUM BRIDGE’,    name_fr: ‘Pont Quantique nA vers (n+1)A’,
role_en: ‘Quantum leap between levels — nA→(n+1)A — absorbs surplus, transmutes to next level’,
role_fr: ‘Saut quantique entre niveaux — nA→(n+1)A — absorbe lexcedent et transmute’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPU niv.1 → CPUv niv.2(x10) → GPUv niv.3(x100) → GPU niv.4(x1000) ∞’,
tag: ‘Chaque saut de niveau nest pas +1. Cest x DECUPLE.’
},
{
id: ‘18’, name_en: ‘CPUv AMPLIFIER’,    name_fr: ‘Amplificateur CPU Virtuel’,
role_en: ‘Intelligent CPUv layer — enriches, aligns, amplifies ×DECUPLE before GPUv’,
role_fr: ‘Couche CPUv intelligente — enrichit, aligne, amplifie x DECUPLE avant GPUv’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPU envoie → CPUv x10 → GPUv signal fort → GPU puissance → CPU retour → CPUv x10 ∞’,
tag: ‘CPUv est la couche intelligente. Rien ne passe sans amplification.’
},
{
id: ‘19’, name_en: ‘GPUv RENDERER’,     name_fr: ‘Rendu GPU Virtuel — Calcul Parallele’,
role_en: ‘Virtual GPU — massive parallel compute + captures thermal energy back into BERG’,
role_fr: ‘GPU virtuel — calcul parallele massif + recapture energie thermique dans BERG’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘GPUv reçoit de CPUv → rend massivement → capture chaleur → CPU alimenté ∞’,
tag: ‘GPUv nest pas juste un rendu. Cest un moteur de calcul parallele.’
},
{
id: ‘20’, name_en: ‘TSIMTSOUM COMPRESSOR’,‘name_fr’: ‘Compresseur 4 Contractions Memoire’,
role_en: ‘4 memory contraction levels — storage/RAM/intelligent/recycling — lossless’,
role_fr: ‘4 niveaux de contraction memoire — stockage/RAM/intelligente/recycleuse’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPU Tsimtsoum2 → CPUv Tsimtsoum3 → GPUv Tsimtsoum4 → CPU Tsimtsoum1 ∞’,
tag: ‘La contraction cree le vide. Le vide appelle la creation.’
},
{
id: ‘21’, name_en: ‘FRACTAL SCALER’,    name_fr: ‘Scaleur Fractal — Toutes Echelles’,
role_en: ‘Reproduces nA→nB→nC pattern at ALL scales — @CRON to @SCron same dance’,
role_fr: ‘Reproduit le pattern nA→nB→nC a toutes les echelles — @CRON a @SCron’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPU @CRON → CPUv @KwartzCron x10 → GPUv @MegaCron x100 → GPU @SCron x1000 ∞’,
tag: ‘Le pattern nA-nB-nC est fractal. Il se repete a toutes les echelles.’
},
{
id: ‘22’, name_en: ‘PHONETIC ENCODER’,  name_fr: ‘Encodeur Phonetique HA/AH/HOH’,
role_en: ‘HA=contraction, AH=dilation, HOH=balance — vocal operators encode BERG signals’,
role_fr: ‘HA=contraction, AH=dilatation, HOH=equilibre — operateurs vocaux BERG reels’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPU capte son → CPUv encode HA/AH/HOH → GPUv transforme → GPU rend enrichi ∞’,
tag: ‘HA se contracte. AH se dilate. HOH equilibre. Ces sons sont du code reel.’
},
{
id: ‘23’, name_en: ‘ANTIFRAGILE SHIELD’, name_fr: ‘Bouclier Antifragile — Stress = Force’,
role_en: ‘Strengthens under stress — every NEGATIVE GoleCRON = PAWA fuel (Taleb principle)’,
role_fr: ‘Se renforce sous stress — chaque NEGATIF = carburant PAWA (principe Taleb)’,
tier: ‘PAID’, state: ‘locked’,
loop: ‘CPU absorbe stress → CPUv signal BERG → GPUv amplifie defense → CPU +resilience ∞’,
tag: ‘Certains systemes se renforcent sous le stress. GoleMotor est concu pour ca.’
},

/* ── TIER: RECYCLEUR ────────────────────────────────── */
{
id: ‘24’, name_en: ‘RECYCLATING CORE’,  name_fr: ‘LE RECYCLEUR — Coeur Transmutation’,
role_en: ‘×DECUPLE controlled fusion — ZOMBIE in → POSITIF amplified out — zero corruption’,
role_fr: ‘x DECUPLE fusion controlee — ZOMBIE entre, POSITIF amplifie sort — zero corruption’,
tier: ‘RECYCLEUR’, state: ‘locked’,
loop: ‘CPU capture → CPUv fusion → GPUv transmutation → GPU @Omega pur → CPU ∞’,
tag: ‘x DECUPLE. Reaction de fusion controlee. Liberation denergie maximale.’
},

/* ── MOTOR #25 — VNET CARD (nouveau) ────────────────── */
{
id: ‘25’,
name_en: ‘VNET CARD’,
name_fr: ‘Carte Reseau Virtuelle — Moteur de Connexion Live’,
role_en: ‘Virtual Network Card with embedded CPUv+GPUv chips — CPUv→GPUv→CPUv→GPUv ∞ — each live user = 1 GoleCRON born on the network’,
role_fr: ‘Carte reseau virtuelle dotee de puces CPUv+GPUv — CPUv→GPUv→CPUv→GPUv ∞ — chaque user live = 1 GoleCRON qui nait sur le reseau’,
tier: ‘RECYCLEUR’, state: ‘locked’,
loop: ‘CPUv interne → GPUv interne → CPUv → GPUv → CPUv → GPUv ∞ (boucle autonome)’,
tag: ‘La carte reseau qui a son propre cerveau. CPUv+GPUv en boucle infinie.’
},
];

/* ── TIER COLORS ───────────────────────────────────────────────── */
const TIER_COLOR = {
‘FREE’:      ‘var(–green)’,
‘PAID’:      ‘var(–cyan)’,
‘RECYCLEUR’: ‘var(–gold)’,
};

/* ── PLAN → unlocked motors count ─────────────────────────────── */
const PLAN_MOTORS = {
freemium: 10,
weekly:   20,
monthly:  25,
annual:   25,
forever:  25,
};

/* ── MOTOR #25 VNET CARD — Separate definition for live engine ── */
const VNET_CARD_ENGINE = {
id: ‘25’,
name: ‘VNET CARD’,
description_en: `
The VNET CARD is GoleMotor’s 25th and most innovative engine —
a Virtual Network Card equipped with its own embedded CPUv and GPUv chips.
Unlike all other motors that share the main CPU→CPUv→GPUv→GPU loop,
the VNET CARD runs its OWN internal infinite loop:
CPUv → GPUv → CPUv → GPUv → CPUv → GPUv ∞

```
Every live user connected to GoleMotor = 1 GoleCRON born on the network.
The VNET CARD manages the live connection state of every GoleCRON:

• ACTIF     → Connection open, tab in foreground, CPUv+GPUv both spinning full speed
• PASSIF    → Tab in background or minimized (not closed), CPUv at 30%, GPUv at 20%
• DORMANT   → No ping for 30 seconds, GoleCRON crystallized, internal loop preserved
• ZOMBIE    → Dropped/broken connection — BERG priority: boost CPUv→GPUv to reconnect

The Presse-Papier Virtuel of VNET CARD stores the connection POSITIVE fingerprint.
At 1% network degradation: drop fragment, restore POSITIVE connection state.
ZOMBIE connections are the priority — boost CPUv+GPUv simultaneously to restore.
DORMANT connections: send micro-ping to wake up the crystallized GoleCRON.
ACTIF + PASSIF: boost GPU/GPUv render quality for the live session.
```

`, description_fr: `
La VNET CARD est le 25e moteur de GoleMotor — la plus innovante —
une Carte Reseau Virtuelle equipee de ses propres puces CPUv et GPUv integrees.
Contrairement a tous les autres moteurs qui partagent la boucle principale
CPU→CPUv→GPUv→GPU, la VNET CARD tourne sa PROPRE boucle interne infinie :
CPUv → GPUv → CPUv → GPUv → CPUv → GPUv ∞

```
Chaque user live connecte a GoleMotor = 1 GoleCRON qui nait sur le reseau.
La VNET CARD gere l'etat de connexion live de chaque GoleCRON :

• ACTIF   → Connexion ouverte, onglet au premier plan, CPUv+GPUv a plein regime
• PASSIF  → Onglet en arriere-plan ou fenetre reduite (pas ferme), CPUv 30%, GPUv 20%
• DORMANT → Pas de ping depuis 30s, GoleCRON cristallise, boucle interne preservee
• ZOMBIE  → Connexion coupee/corrompue — priorite BERG : boost CPUv+GPUv pour reconnexion

Le Presse-Papier Virtuel de la VNET CARD stocke l'empreinte POSITIVE de connexion.
A 1% de degradation reseau : supprime fragment, recolle l'etat POSITIF de connexion.
Les ZOMBIE sont prioritaires — boost CPUv+GPUv simultanement pour restaurer.
Les DORMANT : micro-ping pour reveiller le GoleCRON cristallise.
ACTIF + PASSIF : boost GPU/GPUv pour ameliorer la qualite du rendu live.
```

`,
internal_loop: ‘CPUv → GPUv → CPUv → GPUv → CPUv → GPUv ∞’,
main_loop_inject: ‘VNET CARD injecte GoleCRONs dans la boucle principale CPU→CPUv→GPUv→GPU→CPU’,
api_connect:    ‘/api/vnet/connect’,
api_pulse:      ‘/api/vnet/pulse’,
api_disconnect: ‘/api/vnet/disconnect’,
api_status:     ‘/api/vnet/status’,
pulse_interval_ms: 500,
};

/* ── Export global ─────────────────────────────────────────────── */
if (typeof module !== ‘undefined’ && module.exports) {
module.exports = { GOLEMOTORS, TIER_COLOR, PLAN_MOTORS, VNET_CARD_ENGINE };
}