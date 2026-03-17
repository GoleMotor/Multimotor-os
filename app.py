# ═══════════════════════════════════════════════════════════════

# GOLEMOTOR — Flask Backend

# Just Keff Tech Labs · 2026 · SuperS.A.M System

# PythonAnywhere : usalemveritas.pythonanywhere.com

# ═══════════════════════════════════════════════════════════════

from flask import Flask, render_template, jsonify, request, session
from datetime import datetime
import json, os, time, hashlib, uuid

app = Flask(**name**)
app.secret_key = os.environ.get(‘SAM_SECRET’, ‘golemotor-berg-pawa-2026-keff’)

# ── IN-MEMORY STORE (remplacer par SQLite en prod) ───────────────

USERS_DB = {}          # { email: { password_hash, plan, created_at, pawa_total } }
LEADERBOARD = []       # [ { name, pawa, plan, rank } ]
LIVE_CONNECTIONS = {}  # { session_id: { user, connected_at, pawa_delta } }

PLANS = {
‘freemium’: {‘motors’: 10, ‘price’: 0,   ‘label’: ‘Freemium’},
‘weekly’:   {‘motors’: 20, ‘price’: 5,   ‘label’: ‘Weekly — $5/week’},
‘monthly’:  {‘motors’: 25, ‘price’: 25,  ‘label’: ‘Pro — $25/month’},
‘annual’:   {‘motors’: 25, ‘price’: 150, ‘label’: ‘Annual — $150/year’},
‘forever’:  {‘motors’: 25, ‘price’: 550, ‘label’: ‘Forever — $550 one-time’},
}

# ── HELPERS ──────────────────────────────────────────────────────

def hash_pw(pw):
return hashlib.sha256(pw.encode()).hexdigest()

def get_user():
return USERS_DB.get(session.get(‘user_email’))

def berg_pawa_tick():
“”“Simule un tick BERG — retourne PAWA calculé”””
t = time.time()
base = 42.0 + (t % 100) * 0.3
noise = (hash(str(int(t))) % 20) * 0.1
return round(base + noise, 2)

# ── ROUTES PRINCIPALES ───────────────────────────────────────────

@app.route(’/’)
def index():
user = get_user()
plan = user[‘plan’] if user else ‘freemium’
motors_unlocked = PLANS[plan][‘motors’]
return render_template(‘index.html’,
user=user,
plan=plan,
motors_unlocked=motors_unlocked,
year=datetime.now().year
)

# ── API : AUTH ────────────────────────────────────────────────────

@app.route(’/api/register’, methods=[‘POST’])
def register():
data = request.get_json()
email = data.get(‘email’, ‘’).lower().strip()
pw    = data.get(‘password’, ‘’)
name  = data.get(‘name’, ‘GolePilot’)

```
if not email or not pw:
    return jsonify({'ok': False, 'msg': 'Email and password required'}), 400
if email in USERS_DB:
    return jsonify({'ok': False, 'msg': 'Email already registered'}), 409

USERS_DB[email] = {
    'email':      email,
    'name':       name,
    'password':   hash_pw(pw),
    'plan':       'freemium',
    'created_at': datetime.now().isoformat(),
    'pawa_total': 0.0,
    'sessions':   0,
}
session['user_email'] = email
return jsonify({'ok': True, 'msg': 'Welcome to GoleMotor', 'plan': 'freemium'})
```

@app.route(’/api/login’, methods=[‘POST’])
def login():
data  = request.get_json()
email = data.get(‘email’, ‘’).lower().strip()
pw    = data.get(‘password’, ‘’)

```
user = USERS_DB.get(email)
if not user or user['password'] != hash_pw(pw):
    return jsonify({'ok': False, 'msg': 'Invalid credentials'}), 401

session['user_email'] = email
user['sessions'] = user.get('sessions', 0) + 1
return jsonify({
    'ok':    True,
    'name':  user['name'],
    'plan':  user['plan'],
    'pawa':  user['pawa_total'],
    'motors': PLANS[user['plan']]['motors']
})
```

@app.route(’/api/logout’, methods=[‘POST’])
def logout():
session.clear()
return jsonify({‘ok’: True})

# ── API : BERG / PAWA ────────────────────────────────────────────

@app.route(’/api/berg/tick’)
def berg_tick():
“”“Retourne un tick BERG — appelé toutes les secondes par le dashboard”””
user  = get_user()
pawa  = berg_pawa_tick()
berg  = round(pawa * 0.01, 4)   # 1% BERG-ratio
loop  = round(pawa * 0.99, 4)   # 99% boucle infinie

```
if user:
    user['pawa_total'] = round(user.get('pawa_total', 0) + pawa * 0.001, 4)

live_count = len(LIVE_CONNECTIONS)

return jsonify({
    'pawa':        pawa,
    'berg_ratio':  berg,
    'loop_inject': loop,
    'cpu_v':       round(30 + (time.time() % 70), 1),
    'gpu_v':       round(20 + (time.time() % 75), 1),
    'live_users':  live_count,
    'loop':        'CPU→CPUv→GPUv→GPU→CPU ∞',
    'timestamp':   time.time()
})
```

@app.route(’/api/berg/boost’, methods=[‘POST’])
def berg_boost():
user  = get_user()
plan  = user[‘plan’] if user else ‘freemium’
multi = 10 if plan in [‘monthly’,‘annual’,‘forever’] else 3
pawa  = round(berg_pawa_tick() * multi, 2)
return jsonify({‘ok’: True, ‘pawa’: pawa, ‘multiplier’: multi, ‘mode’: ‘BOOST’})

@app.route(’/api/berg/eco’, methods=[‘POST’])
def berg_eco():
pawa = round(berg_pawa_tick() * 0.2, 2)
return jsonify({‘ok’: True, ‘pawa’: pawa, ‘multiplier’: 0.2, ‘mode’: ‘ECO’})

# ── API : LEADERBOARD ────────────────────────────────────────────

@app.route(’/api/leaderboard’)
def leaderboard():
board = []
for i, (email, u) in enumerate(
sorted(USERS_DB.items(), key=lambda x: x[1].get(‘pawa_total’, 0), reverse=True)[:10]
):
board.append({
‘rank’:  i + 1,
‘name’:  u[‘name’],
‘pawa’:  round(u.get(‘pawa_total’, 0), 2),
‘plan’:  u[‘plan’],
‘badge’: ‘🥇’ if i==0 else ‘🥈’ if i==1 else ‘🥉’ if i==2 else f’#{i+1}’
})
# Remplir avec démo si vide
if not board:
board = [
{‘rank’:1,‘name’:‘BERG_MAX’,    ‘pawa’:99842.5, ‘plan’:‘forever’, ‘badge’:‘🥇’},
{‘rank’:2,‘name’:‘ALISCIA_∞’,   ‘pawa’:87231.0, ‘plan’:‘annual’,  ‘badge’:‘🥈’},
{‘rank’:3,‘name’:‘SUPERSAM_A’,  ‘pawa’:72109.3, ‘plan’:‘monthly’, ‘badge’:‘🥉’},
{‘rank’:4,‘name’:‘PAWA_PILOT’,  ‘pawa’:54320.1, ‘plan’:‘monthly’, ‘badge’:’#4’},
{‘rank’:5,‘name’:‘OMEGA_USER’,  ‘pawa’:41887.6, ‘plan’:‘weekly’,  ‘badge’:’#5’},
]
return jsonify({‘ok’: True, ‘board’: board})

# ── API : LIVE CONNECT (Motor #25 — VNET CARD) ──────────────────

@app.route(’/api/vnet/connect’, methods=[‘POST’])
def vnet_connect():
“”“Motor #25 — Enregistre une connexion live (GoleCRON network)”””
sid = str(uuid.uuid4())[:8]
user = get_user()
LIVE_CONNECTIONS[sid] = {
‘user’:         user[‘name’] if user else ‘Anonymous’,
‘plan’:         user[‘plan’] if user else ‘freemium’,
‘connected_at’: time.time(),
‘cpuv_loop’:    0,
‘gpuv_loop’:    0,
‘pawa_delta’:   0.0,
‘state’:        ‘ACTIF’
}
return jsonify({‘ok’: True, ‘session_id’: sid, ‘live_count’: len(LIVE_CONNECTIONS)})

@app.route(’/api/vnet/pulse’, methods=[‘POST’])
def vnet_pulse():
“”“Motor #25 — CPUv→GPUv→CPUv→GPUv tick (appelé toutes les 500ms)”””
data = request.get_json()
sid  = data.get(‘session_id’)
conn = LIVE_CONNECTIONS.get(sid)
if not conn:
return jsonify({‘ok’: False, ‘msg’: ‘Session not found’}), 404

```
conn['cpuv_loop'] += 1
conn['gpuv_loop'] += 1
delta = round(0.5 + (conn['cpuv_loop'] % 10) * 0.1, 3)
conn['pawa_delta'] = round(conn.get('pawa_delta', 0) + delta, 3)

return jsonify({
    'ok':         True,
    'cpuv_loop':  conn['cpuv_loop'],
    'gpuv_loop':  conn['gpuv_loop'],
    'pawa_delta': conn['pawa_delta'],
    'live_count': len(LIVE_CONNECTIONS),
    'vnet_loop':  'CPUv→GPUv→CPUv→GPUv ∞'
})
```

@app.route(’/api/vnet/disconnect’, methods=[‘POST’])
def vnet_disconnect():
data = request.get_json()
sid  = data.get(‘session_id’)
conn = LIVE_CONNECTIONS.pop(sid, None)
return jsonify({‘ok’: True, ‘final_pawa’: conn[‘pawa_delta’] if conn else 0})

@app.route(’/api/vnet/status’)
def vnet_status():
“”“Etat de toutes les connexions live — vue réseau Motor #25”””
connections = []
for sid, c in list(LIVE_CONNECTIONS.items()):
age = round(time.time() - c[‘connected_at’], 0)
state = ‘ZOMBIE’ if age > 120 else ‘DORMANT’ if age > 30 else ‘ACTIF’
connections.append({
‘sid’:        sid,
‘user’:       c[‘user’],
‘state’:      state,
‘age_sec’:    age,
‘cpuv_loops’: c[‘cpuv_loop’],
‘pawa’:       c[‘pawa_delta’]
})
return jsonify({‘ok’: True, ‘connections’: connections, ‘total’: len(connections)})

# ── API : SUBSCRIPTION ───────────────────────────────────────────

@app.route(’/api/subscribe’, methods=[‘POST’])
def subscribe():
data = request.get_json()
plan = data.get(‘plan’)
user = get_user()
if not user:
return jsonify({‘ok’: False, ‘msg’: ‘Login required’}), 401
if plan not in PLANS:
return jsonify({‘ok’: False, ‘msg’: ‘Invalid plan’}), 400
user[‘plan’] = plan
return jsonify({
‘ok’:      True,
‘plan’:    plan,
‘motors’:  PLANS[plan][‘motors’],
‘msg’:     f”Plan activated: {PLANS[plan][‘label’]}”
})

@app.route(’/api/plans’)
def get_plans():
return jsonify({‘ok’: True, ‘plans’: PLANS})

# ── HEALTH CHECK ─────────────────────────────────────────────────

@app.route(’/health’)
def health():
return jsonify({
‘status’:    ‘ACTIF’,
‘system’:    ‘GoleMotor · SuperS.A.M’,
‘version’:   ‘1.0.0’,
‘users’:     len(USERS_DB),
‘live’:      len(LIVE_CONNECTIONS),
‘timestamp’: datetime.now().isoformat()
})

# ── RUN ──────────────────────────────────────────────────────────

if **name** == ‘**main**’:
app.run(debug=True, host=‘0.0.0.0’, port=5000)