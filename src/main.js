import * as THREE from 'three';
import './styles.css';

const RARITIES = ['Corroded', 'Common', 'Rare', 'Epic', 'Legendary'];
const RARITY_COLORS = [0x667187, 0x8fc4ff, 0x7e7cff, 0xd660ff, 0xffbd59];
const RESOURCE_KEYS = ['scrap', 'tech', 'biomass', 'credits'];

const CONFIG = {
  worldWidth: 340,
  worldHeight: 540,
  runTargetMinutes: 5,
  runTargetMaxMinutes: 15,
  demonSpawnInterval: 300,
  extractionDuration: 7,
  cargoCapacity: 18,
  safeStorageCapacity: 6,
  playerSpeed: 38,
  cameraHeight: 84,
  moveStickRadius: 72,
  aimStickRadius: 72,
  aimZoneSize: 196,
  pickupRadius: 4.8,
  playerSpawnZ: 190,
  spawnSafeRadius: 92,
  introGraceDuration: 22,
  asteroidCount: 26,
  pointOfInterestCount: 12,
  enemyCounts: {
    pirate: 4,
    scavenger: 4,
    law: 3,
    carrion: 10
  }
};

const WEAPON_PRESETS = {
  beamLaser: {
    name: 'Beam Laser',
    color: 0xff4f9d,
    projectileSpeed: 0,
    fireInterval: 0.06,
    damage: 0.7,
    lifespan: 0.08,
    radius: 0.55,
    beam: true
  },
  rapidLaser: {
    name: 'Rapid Laser',
    color: 0xff89c6,
    projectileSpeed: 98,
    fireInterval: 0.09,
    damage: 1.35,
    lifespan: 1.15,
    radius: 0.24
  },
  machineGun: {
    name: 'Machine Gun',
    color: 0xffd387,
    projectileSpeed: 84,
    fireInterval: 0.14,
    damage: 1.8,
    lifespan: 1.2,
    radius: 0.28
  },
  heavyMachineGun: {
    name: 'Heavy Machine Gun',
    color: 0xffc56e,
    projectileSpeed: 76,
    fireInterval: 0.24,
    damage: 3.1,
    lifespan: 1.25,
    radius: 0.33
  },
  rocket: {
    name: 'Rocket',
    color: 0xff775d,
    projectileSpeed: 58,
    fireInterval: 0.5,
    damage: 5.4,
    lifespan: 1.65,
    radius: 0.45
  },
  missile: {
    name: 'Missile',
    color: 0x9dfffb,
    projectileSpeed: 48,
    fireInterval: 0.62,
    damage: 4.2,
    lifespan: 2.2,
    radius: 0.38,
    homingRadius: 48
  }
};

const SHIP_ARCHETYPES = {
  player: {
    label: 'Scavenger Cutter',
    faction: 'player',
    baseSpeed: CONFIG.playerSpeed,
    maxShield: 24,
    maxHull: 32,
    detection: 90,
    damageMultiplier: 1.15,
    incomingDamageMultiplier: 0.9,
    weapons: ['rapidLaser', 'machineGun'],
    componentLayout: [
      { type: 'engine', offset: [0, 0.5, 2.4], hp: 8, size: [1.4, 0.8, 1.5], color: 0x5ee0ff },
      { type: 'shield', offset: [0, 1.2, 0], hp: 10, size: [2.2, 0.55, 2.2], color: 0x8dbbff },
      { type: 'reactor', offset: [0, 1.05, -0.2], hp: 8, size: [1.2, 0.8, 1.2], color: 0xff8e5a },
      { type: 'weapon', offset: [-1.25, 0.8, -2.25], hp: 6, size: [0.7, 0.6, 1.6], color: 0xff78a6, weaponKey: 'rapidLaser' },
      { type: 'weapon', offset: [1.25, 0.8, -2.25], hp: 6, size: [0.7, 0.6, 1.6], color: 0xff78a6, weaponKey: 'machineGun' }
    ]
  },
  pirate: {
    label: 'Pirate Ripper',
    faction: 'pirate',
    baseSpeed: 23,
    maxShield: 8,
    maxHull: 13,
    detection: 95,
    damageMultiplier: 0.78,
    incomingDamageMultiplier: 1.08,
    weapons: ['machineGun', 'rocket'],
    componentLayout: [
      { type: 'engine', offset: [0, 0.45, 2.2], hp: 7, size: [1.3, 0.75, 1.3], color: 0xff6f5a },
      { type: 'shield', offset: [0, 1.1, 0.1], hp: 8, size: [1.8, 0.45, 1.8], color: 0xff8d8d },
      { type: 'reactor', offset: [0, 1.0, -0.05], hp: 6, size: [1.1, 0.7, 1.1], color: 0xffb164 },
      { type: 'weapon', offset: [-1.1, 0.8, -2.1], hp: 5, size: [0.55, 0.5, 1.4], color: 0xffb36e, weaponKey: 'machineGun' },
      { type: 'weapon', offset: [1.1, 0.8, -2.1], hp: 5, size: [0.55, 0.5, 1.4], color: 0xffb36e, weaponKey: 'rocket' }
    ]
  },
  scavenger: {
    label: 'Scavenger Needle',
    faction: 'scavenger',
    baseSpeed: 20,
    maxShield: 7,
    maxHull: 12,
    detection: 80,
    damageMultiplier: 0.72,
    incomingDamageMultiplier: 1.1,
    weapons: ['rapidLaser'],
    componentLayout: [
      { type: 'engine', offset: [0, 0.45, 2.1], hp: 6, size: [1.15, 0.7, 1.3], color: 0xaee46e },
      { type: 'shield', offset: [0, 1.0, 0.2], hp: 7, size: [1.6, 0.4, 1.6], color: 0x6ed9a5 },
      { type: 'reactor', offset: [0, 1.0, 0], hp: 6, size: [1.0, 0.7, 1.0], color: 0xe5ff7e },
      { type: 'weapon', offset: [0, 0.8, -2.1], hp: 4, size: [0.6, 0.55, 1.55], color: 0xbaff7d, weaponKey: 'rapidLaser' }
    ]
  },
  law: {
    label: 'Patrol Lantern',
    faction: 'law',
    baseSpeed: 18,
    maxShield: 12,
    maxHull: 17,
    detection: 110,
    damageMultiplier: 0.84,
    incomingDamageMultiplier: 1.06,
    weapons: ['rapidLaser', 'beamLaser'],
    componentLayout: [
      { type: 'engine', offset: [0, 0.45, 2.35], hp: 8, size: [1.4, 0.8, 1.4], color: 0x74c9ff },
      { type: 'shield', offset: [0, 1.15, 0], hp: 9, size: [2.0, 0.5, 2.0], color: 0xa6d6ff },
      { type: 'reactor', offset: [0, 1.05, -0.15], hp: 7, size: [1.15, 0.72, 1.15], color: 0xffd18b },
      { type: 'weapon', offset: [-1.0, 0.84, -2.2], hp: 5, size: [0.55, 0.5, 1.4], color: 0x79dbff, weaponKey: 'beamLaser' },
      { type: 'weapon', offset: [1.0, 0.84, -2.2], hp: 5, size: [0.55, 0.5, 1.4], color: 0x79dbff, weaponKey: 'rapidLaser' }
    ]
  },
  carrion: {
    label: 'Carrion',
    faction: 'carrion',
    baseSpeed: 0,
    maxShield: 0,
    maxHull: 18,
    detection: 0,
    damageMultiplier: 0,
    incomingDamageMultiplier: 1.15,
    weapons: [],
    componentLayout: [
      { type: 'engine', offset: [0, 0.3, 2.2], hp: 5, size: [1.25, 0.65, 1.45], color: 0x566072 },
      { type: 'reactor', offset: [0, 0.85, 0], hp: 6, size: [1.2, 0.7, 1.2], color: 0x88746b },
      { type: 'weapon', offset: [-1.0, 0.65, -2.0], hp: 4, size: [0.55, 0.45, 1.3], color: 0x6a6078, weaponKey: null },
      { type: 'weapon', offset: [1.0, 0.65, -2.0], hp: 4, size: [0.55, 0.45, 1.3], color: 0x6a6078, weaponKey: null }
    ]
  }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function createSeededChoice(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function worldPos2(vec3) {
  return new THREE.Vector2(vec3.x, vec3.z);
}

function distanceXZ(a, b) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.hypot(dx, dz);
}

function disposeMaterial(material) {
  if (!material) {
    return;
  }

  if (Array.isArray(material)) {
    for (const entry of material) {
      disposeMaterial(entry);
    }
    return;
  }

  for (const value of Object.values(material)) {
    if (value?.isTexture) {
      value.dispose();
    }
  }

  material.dispose();
}

function disposeObject3D(object) {
  if (!object) {
    return;
  }

  object.traverse((child) => {
    if (!child.isMesh && !child.isPoints && !child.isLine) {
      return;
    }

    child.geometry?.dispose();
    disposeMaterial(child.material);
  });
}

class InputManager {
  constructor(game) {
    this.game = game;
    this.keys = new Set();
    this.mouse = { x: 0, y: 0, down: false };
    this.moveTouch = null;
    this.aimTouch = null;
    this.moveVector = new THREE.Vector2();
    this.aimVector = new THREE.Vector2();
    this.aimActive = false;
    this.pointerMap = new Map();
    this.bind();
  }

  bind() {
    window.addEventListener('keydown', (event) => {
      this.keys.add(event.code);
      if (event.code === 'Space') {
        event.preventDefault();
      }
    });

    window.addEventListener('keyup', (event) => {
      this.keys.delete(event.code);
    });

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    });

    window.addEventListener('mousedown', (event) => {
      if (event.button === 0 || event.button === 2) {
        this.mouse.down = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.mouse.down = false;
    });

    window.addEventListener('contextmenu', (event) => event.preventDefault());

    window.addEventListener('pointerdown', (event) => this.onPointerDown(event), {
      passive: false
    });
    window.addEventListener('pointermove', (event) => this.onPointerMove(event), {
      passive: false
    });
    window.addEventListener('pointerup', (event) => this.onPointerEnd(event), {
      passive: false
    });
    window.addEventListener('pointercancel', (event) => this.onPointerEnd(event), {
      passive: false
    });
  }

  getAimPadCenter() {
    const rect = this.game.aimPad.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  isInAimZone(clientX, clientY) {
    const rect = this.game.aimPad.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }

  onPointerDown(event) {
    if (event.pointerType !== 'touch') {
      return;
    }

    event.preventDefault();
    const pointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY
    };
    this.pointerMap.set(event.pointerId, pointer);

    if (!this.aimTouch && this.isInAimZone(event.clientX, event.clientY)) {
      this.aimTouch = { id: event.pointerId };
      this.updateAimTouch(event.clientX, event.clientY);
      return;
    }

    if (!this.moveTouch) {
      this.moveTouch = {
        id: event.pointerId,
        originX: event.clientX,
        originY: event.clientY,
        x: event.clientX,
        y: event.clientY
      };
      this.game.showMovementIndicator(event.clientX, event.clientY, event.clientX, event.clientY);
    }
  }

  onPointerMove(event) {
    if (event.pointerType !== 'touch') {
      return;
    }

    event.preventDefault();
    const stored = this.pointerMap.get(event.pointerId);
    if (stored) {
      stored.x = event.clientX;
      stored.y = event.clientY;
    }

    if (this.moveTouch && this.moveTouch.id === event.pointerId) {
      this.moveTouch.x = event.clientX;
      this.moveTouch.y = event.clientY;
      const dx = event.clientX - this.moveTouch.originX;
      const dy = event.clientY - this.moveTouch.originY;
      const length = Math.hypot(dx, dy);
      const clamped = Math.min(length, CONFIG.moveStickRadius);
      if (length > 0) {
        this.moveVector.set((dx / length) * (clamped / CONFIG.moveStickRadius), (dy / length) * (clamped / CONFIG.moveStickRadius));
      }
      this.game.showMovementIndicator(
        this.moveTouch.originX,
        this.moveTouch.originY,
        this.moveTouch.originX + clamp(dx, -CONFIG.moveStickRadius, CONFIG.moveStickRadius),
        this.moveTouch.originY + clamp(dy, -CONFIG.moveStickRadius, CONFIG.moveStickRadius)
      );
    }

    if (this.aimTouch && this.aimTouch.id === event.pointerId) {
      this.updateAimTouch(event.clientX, event.clientY);
    }
  }

  onPointerEnd(event) {
    if (event.pointerType !== 'touch') {
      return;
    }

    event.preventDefault();
    this.pointerMap.delete(event.pointerId);

    if (this.moveTouch && this.moveTouch.id === event.pointerId) {
      this.moveTouch = null;
      this.moveVector.set(0, 0);
      this.game.hideMovementIndicator();
    }

    if (this.aimTouch && this.aimTouch.id === event.pointerId) {
      this.aimTouch = null;
      this.aimVector.set(0, 0);
      this.aimActive = false;
      this.game.hideAimKnob();
    }
  }

  updateAimTouch(clientX, clientY) {
    const center = this.getAimPadCenter();
    const dx = clientX - center.x;
    const dy = clientY - center.y;
    const length = Math.hypot(dx, dy);
    const clamped = Math.min(length, CONFIG.aimStickRadius);
    if (length > 0) {
      this.aimVector.set((dx / length) * (clamped / CONFIG.aimStickRadius), (dy / length) * (clamped / CONFIG.aimStickRadius));
    } else {
      this.aimVector.set(0, 0);
    }
    this.aimActive = length > 8;
    this.game.showAimKnob(center.x + clamp(dx, -CONFIG.aimStickRadius, CONFIG.aimStickRadius), center.y + clamp(dy, -CONFIG.aimStickRadius, CONFIG.aimStickRadius));
  }

  getMoveVector() {
    const vector = this.moveVector.clone();
    const keyboard = new THREE.Vector2(
      (this.keys.has('KeyD') || this.keys.has('ArrowRight') ? 1 : 0) - (this.keys.has('KeyA') || this.keys.has('ArrowLeft') ? 1 : 0),
      (this.keys.has('KeyS') || this.keys.has('ArrowDown') ? 1 : 0) - (this.keys.has('KeyW') || this.keys.has('ArrowUp') ? 1 : 0)
    );

    if (keyboard.lengthSq() > 0) {
      keyboard.normalize();
      vector.copy(keyboard);
    }

    const pad = navigator.getGamepads?.()[0];
    if (pad) {
      const moveX = pad.axes[0] || 0;
      const moveY = pad.axes[1] || 0;
      if (Math.hypot(moveX, moveY) > 0.2) {
        vector.set(moveX, moveY);
      }
    }

    return vector;
  }

  getAimState(projectPlayerToScreen) {
    const vector = new THREE.Vector2();
    let firing = false;

    if (this.aimActive && this.aimVector.lengthSq() > 0.02) {
      vector.copy(this.aimVector);
      firing = true;
    }

    const pad = navigator.getGamepads?.()[0];
    if (pad) {
      const aimX = pad.axes[2] || 0;
      const aimY = pad.axes[3] || 0;
      if (Math.hypot(aimX, aimY) > 0.2) {
        vector.set(aimX, aimY);
        firing = true;
      }
    }

    if (this.mouse.down) {
      const playerScreen = projectPlayerToScreen();
      const dx = this.mouse.x - playerScreen.x;
      const dy = this.mouse.y - playerScreen.y;
      if (Math.hypot(dx, dy) > 4) {
        const length = Math.hypot(dx, dy);
        vector.set(dx / length, dy / length);
        firing = true;
      }
    }

    return { vector, firing };
  }
}

class Ship {
  constructor(game, archetypeKey, position, options = {}) {
    this.game = game;
    this.archetypeKey = archetypeKey;
    this.archetype = SHIP_ARCHETYPES[archetypeKey];
    this.faction = this.archetype.faction;
    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.group.userData.ship = this;
    this.velocity = new THREE.Vector3();
    this.desiredVelocity = new THREE.Vector3();
    this.aimDirection = new THREE.Vector3(0, 0, -1);
    this.components = [];
    this.weaponCooldowns = new Map();
    this.dead = false;
    this.disposed = false;
    this.lastDamageTime = 0;
    this.kind = archetypeKey;
    this.target = null;
    this.disposition = Math.random();
    this.richness = options.richness ?? (archetypeKey === 'carrion' ? 1.3 : 1);
    this.maxShield = options.maxShield ?? this.archetype.maxShield;
    this.shield = this.maxShield;
    this.maxHull = options.maxHull ?? this.archetype.maxHull;
    this.hull = this.maxHull;
    this.speed = options.speed ?? this.archetype.baseSpeed;
    this.processingSpeed = options.processingSpeed ?? 1;
    this.powerBudget = options.powerBudget ?? (archetypeKey === 'player' ? 14 : 10);
    this.damageMultiplier = options.damageMultiplier ?? this.archetype.damageMultiplier ?? 1;
    this.incomingDamageMultiplier =
      options.incomingDamageMultiplier ?? this.archetype.incomingDamageMultiplier ?? 1;
    this.visualSeed = options.visualSeed ?? Math.floor(Math.random() * 1000);
    this.buildVisual();
    this.game.scene.add(this.group);
  }

  buildVisual() {
    const bodyColor = {
      player: 0x2d395c,
      pirate: 0x5b2b2b,
      scavenger: 0x2e5336,
      law: 0x334762,
      carrion: 0x30343e
    }[this.faction];

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(3.7, 1.2, 6.6),
      new THREE.MeshStandardMaterial({
        color: bodyColor,
        roughness: 0.7,
        metalness: 0.2
      })
    );
    body.castShadow = true;
    body.receiveShadow = true;
    this.group.add(body);
    this.bodyMesh = body;

    const spine = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 1.4, 4.8),
      new THREE.MeshStandardMaterial({
        color: bodyColor + 0x111111,
        roughness: 0.5,
        metalness: 0.4
      })
    );
    spine.position.set(0, 0.9, -0.3);
    this.group.add(spine);

    for (const [index, layout] of this.archetype.componentLayout.entries()) {
      const geometry = new THREE.BoxGeometry(...layout.size);
      const material = new THREE.MeshStandardMaterial({
        color: layout.color,
        emissive: layout.type === 'reactor' ? layout.color : 0x000000,
        emissiveIntensity: layout.type === 'reactor' ? 0.25 : 0
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...layout.offset);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.group.add(mesh);

      const component = {
        id: `${this.archetypeKey}-${index}-${Math.random().toString(36).slice(2, 7)}`,
        type: layout.type,
        mesh,
        maxHp: layout.hp,
        hp: layout.hp,
        weaponKey: layout.weaponKey ?? null,
        radius: Math.max(layout.size[0], layout.size[2]) * 0.48,
        destroyed: false
      };

      mesh.userData.component = component;
      this.components.push(component);
    }
  }

  getWeaponComponents() {
    return this.components.filter((component) => !component.destroyed && component.type === 'weapon' && component.weaponKey);
  }

  getFunctionalCount(type) {
    return this.components.filter((component) => !component.destroyed && component.type === type).length;
  }

  getForwardVector() {
    return new THREE.Vector3(Math.sin(this.group.rotation.y), 0, Math.cos(this.group.rotation.y)).multiplyScalar(-1);
  }

  getWorldPosition() {
    return this.group.position;
  }

  getEffectiveSpeed() {
    const engines = this.getFunctionalCount('engine');
    const engineFactor = clamp(engines / Math.max(1, this.components.filter((component) => component.type === 'engine').length), 0.3, 1);
    return this.speed * engineFactor;
  }

  takeDamage(component, amount, sourceFaction) {
    if (this.dead) {
      return;
    }

    this.lastDamageTime = this.game.elapsed;
    amount *= this.incomingDamageMultiplier;

    if (this.shield > 0 && this.getFunctionalCount('shield') > 0) {
      const absorbed = Math.min(this.shield, amount);
      this.shield -= absorbed;
      amount -= absorbed;
      this.game.spawnShieldFlash(this.group.position, sourceFaction === 'player');
      if (amount <= 0) {
        return;
      }
    }

    component.hp -= amount;
    this.hull = Math.max(0, this.hull - amount);

    if (component.hp <= 0 && !component.destroyed) {
      component.destroyed = true;
      component.mesh.visible = false;
      this.game.spawnDebrisBurst(component.mesh.getWorldPosition(new THREE.Vector3()), component.type);
      if (component.type === 'reactor') {
        this.destroy(sourceFaction === 'demon' ? 'demon' : 'reactor');
        return;
      }
    }

    if (this.hull <= 0) {
      this.destroy(sourceFaction === 'demon' ? 'demon' : 'combat');
    }
  }

  destroy(reason = 'combat') {
    if (this.dead) {
      return;
    }

    this.dead = true;
    this.game.spawnExplosion(this.group.position, reason === 'demon' ? 0x8b5cff : 0xff8855);

    if (reason === 'demon' && this.faction !== 'player' && this.kind !== 'carrion') {
      this.game.convertToCarrion(this);
    } else {
      this.game.spawnLootFromShip(this, reason);
    }

    if (this.faction === 'player') {
      this.game.endRun(false, `${this.archetype.label} lost in the void.`);
    }

    this.game.scene.remove(this.group);
    this.dispose();
  }

  updateShield(dt) {
    if (this.dead || this.maxShield <= 0 || this.getFunctionalCount('shield') <= 0) {
      return;
    }

    if (this.game.elapsed - this.lastDamageTime > 2.5) {
      this.shield = Math.min(this.maxShield, this.shield + dt * 2.6);
    }
  }

  dispose() {
    if (this.disposed) {
      return;
    }

    disposeObject3D(this.group);
    this.disposed = true;
  }
}

class Game {
  constructor() {
    this.app = document.getElementById('app');
    this.aimPad = document.querySelector('.aim-pad');
    this.aimKnob = document.getElementById('aim-knob');
    this.movementIndicator = document.getElementById('movement-indicator');
    this.hud = {
      hull: document.getElementById('hull-value'),
      hullBar: document.getElementById('hull-bar'),
      shield: document.getElementById('shield-value'),
      shieldBar: document.getElementById('shield-bar'),
      cargo: document.getElementById('cargo-value'),
      cargoBar: document.getElementById('cargo-bar'),
      safe: document.getElementById('safe-value'),
      safeBar: document.getElementById('safe-bar'),
      run: document.getElementById('run-value'),
      demon: document.getElementById('demon-value'),
      zone: document.getElementById('zone-value'),
      scrap: document.getElementById('scrap-value'),
      tech: document.getElementById('tech-value'),
      biomass: document.getElementById('biomass-value'),
      credits: document.getElementById('credits-value')
    };
    this.cargoPanel = document.getElementById('cargo-panel');
    this.cargoList = document.getElementById('cargo-list');
    this.extractStatus = document.getElementById('extract-status');
    this.messageLog = document.getElementById('message-log');
    this.runOverlay = document.getElementById('run-overlay');
    this.runOutcome = document.getElementById('run-outcome');
    this.runTitle = document.getElementById('run-title');
    this.runSummary = document.getElementById('run-summary');
    this.restartButton = document.getElementById('restart-button');
    this.secureButton = document.getElementById('secure-button');
    this.combineButton = document.getElementById('combine-button');
    this.processButton = document.getElementById('process-button');
    this.spawnDemonButton = document.getElementById('spawn-demon-button');

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x04070c);
    this.camera = new THREE.PerspectiveCamera(48, 1, 0.1, 800);
    this.camera.position.set(0, CONFIG.cameraHeight, 38);
    this.camera.lookAt(0, 0, 0);
    this.cameraPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.raycaster = new THREE.Raycaster();

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance'
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(1);
    this.app.prepend(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.elapsed = 0;
    this.ships = [];
    this.projectiles = [];
    this.effects = [];
    this.pickups = [];
    this.extractionZones = [];
    this.warpDemons = [];
    this.pointOfInterestMeshes = [];
    this.selectedCargoId = null;
    this.cargo = [];
    this.pendingResources = { scrap: 0, tech: 0, biomass: 0, credits: 0 };
    this.meta = {
      resources: { scrap: 0, tech: 0, biomass: 0, credits: 0 },
      stash: [],
      runCount: 0
    };
    this.runActive = false;
    this.runTime = 0;
    this.nextDemonAt = CONFIG.demonSpawnInterval;
    this.extractionTimer = 0;
    this.currentExtractionZone = null;
    this.wantedTimer = 0;

    this.input = new InputManager(this);
    this.setupWorld();
    this.bindUI();
    this.startRun();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.renderer.setAnimationLoop(() => this.tick());
  }

  setupWorld() {
    const ambient = new THREE.AmbientLight(0x8d9fc8, 0.7);
    this.scene.add(ambient);

    const key = new THREE.DirectionalLight(0xcde4ff, 1.2);
    key.position.set(30, 80, 10);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0x7e58ff, 0.55);
    fill.position.set(-22, 35, -40);
    this.scene.add(fill);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(CONFIG.worldWidth + 80, CONFIG.worldHeight + 80, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0x080d14,
        roughness: 1,
        metalness: 0
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.6;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const grid = new THREE.GridHelper(CONFIG.worldWidth + 70, 18, 0x24304c, 0x151d2e);
    grid.position.y = -1.45;
    this.scene.add(grid);

    this.starField = this.createStarField();
    this.scene.add(this.starField);
  }

  createStarField() {
    const geometry = new THREE.BufferGeometry();
    const points = [];
    for (let i = 0; i < 1500; i += 1) {
      points.push(
        lerp(-CONFIG.worldWidth * 0.9, CONFIG.worldWidth * 0.9, Math.random()),
        lerp(18, 140, Math.random()),
        lerp(-CONFIG.worldHeight * 0.9, CONFIG.worldHeight * 0.9, Math.random())
      );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: 0xd8e6ff,
        size: 0.7,
        transparent: true,
        opacity: 0.75
      })
    );
  }

  getPatrolDirection(ship, radius = 1) {
    return new THREE.Vector3(
      Math.sin(this.elapsed * 0.22 + ship.visualSeed) * radius,
      0,
      Math.cos(this.elapsed * 0.26 + ship.visualSeed * 0.7) * radius
    ).normalize();
  }

  pickSpawnPosition({
    minPlayerDistance = 0,
    minCenterDistance = 0,
    maxCenterDistance = Infinity,
    xRange = 0.48,
    zRange = 0.48
  } = {}) {
    let fallback = new THREE.Vector3();

    for (let attempt = 0; attempt < 40; attempt += 1) {
      const candidate = new THREE.Vector3(
        lerp(-CONFIG.worldWidth * xRange, CONFIG.worldWidth * xRange, Math.random()),
        0,
        lerp(-CONFIG.worldHeight * zRange, CONFIG.worldHeight * zRange, Math.random())
      );
      const centerDistance = Math.hypot(candidate.x, candidate.z);
      const playerDistance = this.player ? distanceXZ(candidate, this.player.getWorldPosition()) : Infinity;

      fallback = candidate;
      if (
        centerDistance >= minCenterDistance &&
        centerDistance <= maxCenterDistance &&
        playerDistance >= minPlayerDistance
      ) {
        return candidate;
      }
    }

    return fallback;
  }

  bindUI() {
    this.secureButton.addEventListener('click', () => this.toggleSecureSelected());
    this.combineButton.addEventListener('click', () => this.combineSelectedCargo());
    this.processButton.addEventListener('click', () => this.processSelectedCargo());
    this.spawnDemonButton.addEventListener('click', () => this.spawnWarpDemon(true));
    this.restartButton.addEventListener('click', () => {
      this.runOverlay.classList.add('hidden');
      this.startRun();
    });
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    const internalWidth = Math.max(320, Math.floor(width * 0.42));
    const internalHeight = Math.max(568, Math.floor(height * 0.42));
    this.renderer.setSize(internalWidth, internalHeight, false);
    Object.assign(this.renderer.domElement.style, {
      width: `${width}px`,
      height: `${height}px`
    });
  }

  clearRunWorld() {
    for (const ship of this.ships) {
      this.scene.remove(ship.group);
      ship.dispose();
    }
    for (const projectile of this.projectiles) {
      this.scene.remove(projectile.mesh);
      disposeObject3D(projectile.mesh);
    }
    for (const effect of this.effects) {
      this.scene.remove(effect.mesh);
      disposeObject3D(effect.mesh);
    }
    for (const pickup of this.pickups) {
      this.scene.remove(pickup.mesh);
      disposeObject3D(pickup.mesh);
    }
    for (const zone of this.extractionZones) {
      this.scene.remove(zone.group);
      disposeObject3D(zone.group);
    }
    for (const demon of this.warpDemons) {
      this.scene.remove(demon.mesh);
      disposeObject3D(demon.mesh);
    }
    for (const mesh of this.pointOfInterestMeshes) {
      this.scene.remove(mesh);
      disposeObject3D(mesh);
    }
    this.ships = [];
    this.projectiles = [];
    this.effects = [];
    this.pickups = [];
    this.extractionZones = [];
    this.warpDemons = [];
    this.pointOfInterestMeshes = [];
  }

  startRun() {
    this.clearRunWorld();
    this.runActive = true;
    this.runTime = 0;
    this.nextDemonAt = CONFIG.demonSpawnInterval;
    this.extractionTimer = 0;
    this.currentExtractionZone = null;
    this.wantedTimer = 0;
    this.cargo = [];
    this.pendingResources = { scrap: 0, tech: 0, biomass: 0, credits: 0 };
    this.selectedCargoId = null;
    this.meta.runCount += 1;

    this.player = new Ship(this, 'player', new THREE.Vector3(0, 0, CONFIG.playerSpawnZ), {
      powerBudget: 14
    });
    this.ships.push(this.player);

    this.generateExtractionZones();
    this.generateSparseMap();
    this.showMessage('Run started. Explore, scavenge, and make the jump alive.');
    this.refreshCargoUI();
    this.refreshHUD();
  }

  generateExtractionZones() {
    const zones = [
      new THREE.Vector3(-CONFIG.worldWidth * 0.43, 0, -CONFIG.worldHeight * 0.38),
      new THREE.Vector3(CONFIG.worldWidth * 0.41, 0, CONFIG.worldHeight * 0.04),
      new THREE.Vector3(-CONFIG.worldWidth * 0.12, 0, CONFIG.worldHeight * 0.41)
    ];

    for (const position of zones) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(6.8, 0.42, 10, 48),
        new THREE.MeshStandardMaterial({
          color: 0x6cf8f5,
          emissive: 0x2a8f8b,
          emissiveIntensity: 0.9
        })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.copy(position);
      ring.position.y = -0.8;

      const pulse = new THREE.Mesh(
        new THREE.CircleGeometry(5.8, 28),
        new THREE.MeshBasicMaterial({
          color: 0x53ccc9,
          transparent: true,
          opacity: 0.16
        })
      );
      pulse.rotation.x = -Math.PI / 2;
      pulse.position.copy(position);
      pulse.position.y = -1.55;

      const label = { group: new THREE.Group(), position, radius: 7.2, ring, pulse };
      label.group.add(ring);
      label.group.add(pulse);
      this.scene.add(label.group);
      this.extractionZones.push(label);
    }
  }

  generateSparseMap() {
    const asteroidGeometry = new THREE.DodecahedronGeometry(1, 0);
    for (let i = 0; i < CONFIG.asteroidCount; i += 1) {
      const mesh = new THREE.Mesh(
        asteroidGeometry,
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x232e3d : 0x1a202b,
          roughness: 0.9,
          metalness: 0.08
        })
      );
      mesh.scale.setScalar(lerp(0.7, 3.8, Math.random()));
      mesh.position.set(
        lerp(-CONFIG.worldWidth * 0.48, CONFIG.worldWidth * 0.48, Math.random()),
        lerp(-0.8, 3, Math.random()),
        lerp(-CONFIG.worldHeight * 0.48, CONFIG.worldHeight * 0.48, Math.random())
      );
      mesh.rotation.set(Math.random(), Math.random(), Math.random());
      this.scene.add(mesh);
      this.pointOfInterestMeshes.push(mesh);
    }

    this.spawnStarterCarrionCluster();

    for (let i = 0; i < CONFIG.enemyCounts.carrion; i += 1) {
      const centerBias = 1 - i / CONFIG.enemyCounts.carrion;
      const ship = new Ship(
        this,
        'carrion',
        new THREE.Vector3(
          lerp(-CONFIG.worldWidth * 0.38 * centerBias, CONFIG.worldWidth * 0.38 * centerBias, Math.random()),
          0,
          lerp(-CONFIG.worldHeight * 0.34 * centerBias, CONFIG.worldHeight * 0.34 * centerBias, Math.random())
        ),
        {
          richness: 1.4 + Math.random() * 0.8,
          maxHull: 16 + Math.random() * 10
        }
      );
      ship.group.rotation.y = Math.random() * Math.PI * 2;
      this.ships.push(ship);
    }

    this.spawnFactionShips('pirate', CONFIG.enemyCounts.pirate);
    this.spawnFactionShips('scavenger', CONFIG.enemyCounts.scavenger);
    this.spawnFactionShips('law', CONFIG.enemyCounts.law);
  }

  spawnStarterCarrionCluster() {
    const anchor = this.player.getWorldPosition();
    for (let i = 0; i < 3; i += 1) {
      const angle = -Math.PI / 2 + (i - 1) * 0.45 + Math.random() * 0.2;
      const distance = 32 + Math.random() * 18;
      const ship = new Ship(
        this,
        'carrion',
        new THREE.Vector3(
          anchor.x + Math.cos(angle) * distance,
          0,
          clamp(anchor.z - Math.sin(angle) * distance, -CONFIG.worldHeight * 0.42, CONFIG.worldHeight * 0.42)
        ),
        {
          richness: 1.1 + Math.random() * 0.35,
          maxHull: 12 + Math.random() * 6
        }
      );
      ship.group.rotation.y = Math.random() * Math.PI * 2;
      this.ships.push(ship);
    }
  }

  spawnFactionShips(faction, count) {
    for (let i = 0; i < count; i += 1) {
      const spawnPosition = faction === 'pirate'
        ? this.pickSpawnPosition({
            minPlayerDistance: CONFIG.spawnSafeRadius + 46,
            minCenterDistance: 45,
            maxCenterDistance: 170,
            xRange: 0.42,
            zRange: 0.34
          })
        : faction === 'law'
          ? this.pickSpawnPosition({
              minPlayerDistance: CONFIG.spawnSafeRadius,
              minCenterDistance: 120,
              maxCenterDistance: 245,
              xRange: 0.46,
              zRange: 0.46
            })
          : this.pickSpawnPosition({
              minPlayerDistance: CONFIG.spawnSafeRadius,
              minCenterDistance: 70,
              maxCenterDistance: 210,
              xRange: 0.44,
              zRange: 0.42
            });
      const ship = new Ship(
        this,
        faction,
        spawnPosition
      );
      ship.group.rotation.y = Math.random() * Math.PI * 2;
      this.ships.push(ship);
    }
  }

  projectPlayerToScreen() {
    const vector = this.player.getWorldPosition().clone().project(this.camera);
    return {
      x: (vector.x * 0.5 + 0.5) * window.innerWidth,
      y: (-vector.y * 0.5 + 0.5) * window.innerHeight
    };
  }

  showMovementIndicator(originX, originY, knobX, knobY) {
    this.movementIndicator.classList.remove('hidden');
    this.movementIndicator.style.left = `${originX - 74}px`;
    this.movementIndicator.style.top = `${originY - 74}px`;
    const offsetX = clamp(knobX - originX, -CONFIG.moveStickRadius, CONFIG.moveStickRadius);
    const offsetY = clamp(knobY - originY, -CONFIG.moveStickRadius, CONFIG.moveStickRadius);
    this.movementIndicator.style.setProperty('--knob-x', `${offsetX}px`);
    this.movementIndicator.style.setProperty('--knob-y', `${offsetY}px`);
  }

  hideMovementIndicator() {
    this.movementIndicator.classList.add('hidden');
    this.movementIndicator.style.removeProperty('--knob-x');
    this.movementIndicator.style.removeProperty('--knob-y');
  }

  showAimKnob(clientX, clientY) {
    this.aimKnob.classList.remove('hidden');
    const rect = this.aimPad.getBoundingClientRect();
    this.aimKnob.style.left = `${clientX - rect.left - 28}px`;
    this.aimKnob.style.top = `${clientY - rect.top - 28}px`;
  }

  hideAimKnob() {
    this.aimKnob.classList.add('hidden');
  }

  spawnProjectile(ship, origin, direction, weaponPreset, component) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(weaponPreset.radius, 8, 8),
      new THREE.MeshBasicMaterial({
        color: weaponPreset.color
      })
    );
    mesh.position.copy(origin);
    this.scene.add(mesh);

    const projectile = {
      mesh,
      owner: ship,
      faction: ship.faction,
      weaponPreset,
      damage: weaponPreset.damage * ship.damageMultiplier,
      direction: direction.clone().normalize(),
      speed: weaponPreset.projectileSpeed,
      age: 0,
      component,
      homingRadius: weaponPreset.homingRadius ?? 0
    };
    this.projectiles.push(projectile);
  }

  updateProjectiles(dt) {
    const removal = new Set();
    for (const projectile of this.projectiles) {
      projectile.age += dt;
      const preset = projectile.weaponPreset;

      if (projectile.homingRadius > 0) {
        const target = this.findNearestShip(projectile.mesh.position, projectile.faction, projectile.homingRadius, projectile.owner);
        if (target) {
          const desired = target.getWorldPosition().clone().sub(projectile.mesh.position).setY(0).normalize();
          projectile.direction.lerp(desired, 0.08);
        }
      }

      if (!preset.beam) {
        projectile.mesh.position.add(projectile.direction.clone().multiplyScalar(projectile.speed * dt));
      } else {
        projectile.mesh.scale.set(1, 1, 1 + Math.sin(this.elapsed * 20) * 0.2);
      }

      let hit = false;
      for (const ship of this.ships) {
        if (ship.dead || ship === projectile.owner) {
          continue;
        }
        if (ship.faction === projectile.faction && projectile.faction !== 'law') {
          continue;
        }
        for (const component of ship.components) {
          if (component.destroyed) {
            continue;
          }
          const componentPos = component.mesh.getWorldPosition(new THREE.Vector3());
          if (distanceXZ(componentPos, projectile.mesh.position) < component.radius + preset.radius) {
            ship.takeDamage(component, projectile.damage ?? preset.damage, projectile.faction);
            if (projectile.owner === this.player) {
              this.registerPlayerAggression(ship);
            }
            removal.add(projectile);
            hit = true;
            break;
          }
        }
        if (hit) {
          break;
        }
      }

      if (
        projectile.age > preset.lifespan ||
        Math.abs(projectile.mesh.position.x) > CONFIG.worldWidth * 0.6 ||
        Math.abs(projectile.mesh.position.z) > CONFIG.worldHeight * 0.6
      ) {
        removal.add(projectile);
      }
    }

    for (const projectile of removal) {
      this.scene.remove(projectile.mesh);
      disposeObject3D(projectile.mesh);
      const index = this.projectiles.indexOf(projectile);
      if (index >= 0) {
        this.projectiles.splice(index, 1);
      }
    }
  }

  findNearestShip(position, sourceFaction, radius, ignoreShip = null) {
    let nearest = null;
    let nearestDistance = radius;
    for (const ship of this.ships) {
      if (ship.dead || ship === ignoreShip || ship.kind === 'carrion') {
        continue;
      }
      if (ship.faction === sourceFaction && sourceFaction !== 'law') {
        continue;
      }
      const dist = distanceXZ(ship.getWorldPosition(), position);
      if (dist < nearestDistance) {
        nearest = ship;
        nearestDistance = dist;
      }
    }
    return nearest;
  }

  registerPlayerAggression(targetShip) {
    if (targetShip.faction === 'law') {
      this.wantedTimer = Math.max(this.wantedTimer, 25);
      this.showMessage('Law enforcement marked you wanted.');
    }
    if (targetShip.kind === 'carrion') {
      const witnessingLaw = this.ships.some(
        (ship) => !ship.dead && ship.faction === 'law' && distanceXZ(ship.getWorldPosition(), this.player.getWorldPosition()) < 55
      );
      if (witnessingLaw) {
        this.wantedTimer = Math.max(this.wantedTimer, 16);
        this.showMessage('Law patrol witnesses illegal salvage.');
      }
    }
  }

  spawnLootFromShip(ship, reason) {
    if (ship.kind === 'player') {
      return;
    }

    const dropCount = ship.kind === 'carrion' ? 4 : 2;
    for (let index = 0; index < dropCount; index += 1) {
      const item = this.generateLootItem(ship, reason, index);
      this.spawnPickup(ship.getWorldPosition(), item);
    }
  }

  convertToCarrion(ship) {
    const replacement = new Ship(this, 'carrion', ship.getWorldPosition().clone(), {
      richness: 1.8
    });
    replacement.group.rotation.copy(ship.group.rotation);
    this.ships.push(replacement);
    this.showMessage('Warp Demon leaves behind fresh Carrion.');
  }

  generateLootItem(ship, reason, index) {
    const seed = Math.floor(Math.random() * 1000 + index * 7);
    const roll = Math.random();

    if (ship.kind === 'carrion' && roll < 0.45) {
      return {
        id: crypto.randomUUID(),
        category: 'component',
        label: `${createSeededChoice(['Shield', 'Engine', 'Scanner', 'Reactor', 'Hull'], seed)} Module`,
        rarityIndex: Math.floor(lerp(1, 3.6, Math.random())),
        safe: false,
        combineKey: `component-${seed % 5}`
      };
    }

    if (roll < 0.2) {
      return {
        id: crypto.randomUUID(),
        category: 'blueprint',
        label: `${createSeededChoice(['Reactor', 'Gunship Chassis', 'Cargo Bay', 'Shield Grid'], seed)} Blueprint`,
        rarityIndex: 1,
        safe: false,
        combineKey: null
      };
    }

    if (roll < 0.35) {
      return {
        id: crypto.randomUUID(),
        category: 'mod',
        label: createSeededChoice(['+1 Damage', '+30 RPM', '+5 Shield', '-1 Power Draw'], seed),
        rarityIndex: Math.floor(lerp(1, 4.2, Math.random())),
        safe: false,
        combineKey: null
      };
    }

    if (roll < 0.72) {
      const resourceKey = createSeededChoice(RESOURCE_KEYS, seed);
      return {
        id: crypto.randomUUID(),
        category: 'resource',
        resourceKey,
        amount: 8 + Math.floor(Math.random() * 18 * ship.richness),
        label: `${resourceKey[0].toUpperCase()}${resourceKey.slice(1)} Bundle`,
        rarityIndex: 0,
        safe: false,
        combineKey: null
      };
    }

    return {
      id: crypto.randomUUID(),
      category: 'component',
      label: `${createSeededChoice(['Laser Coupler', 'Missile Rack', 'Flux Engine', 'Rim Shield'], seed)} ${reason === 'demon' ? 'Relic' : 'Part'}`,
      rarityIndex: Math.floor(lerp(0, 4, Math.random())),
      safe: false,
      combineKey: `component-${seed % 4}`
    };
  }

  spawnPickup(position, item) {
    const color = {
      component: RARITY_COLORS[item.rarityIndex],
      resource: 0x8fffb6,
      blueprint: 0x7fffe3,
      mod: 0xffd36f
    }[item.category];

    const mesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(item.category === 'resource' ? 0.8 : 1.05, 0),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.28,
        roughness: 0.3,
        metalness: 0.6
      })
    );
    mesh.position.copy(position).add(
      new THREE.Vector3(lerp(-2.6, 2.6, Math.random()), 1.5, lerp(-2.6, 2.6, Math.random()))
    );
    this.scene.add(mesh);
    this.pickups.push({ mesh, item, bob: Math.random() * Math.PI * 2 });
  }

  spawnEffect(mesh, lifespan, update = null) {
    this.scene.add(mesh);
    this.effects.push({
      mesh,
      age: 0,
      lifespan,
      update
    });
  }

  updatePickups(dt) {
    const removal = [];
    for (const pickup of this.pickups) {
      pickup.bob += dt * 2.4;
      pickup.mesh.position.y = 1.5 + Math.sin(pickup.bob) * 0.55;
      pickup.mesh.rotation.y += dt;
      if (distanceXZ(pickup.mesh.position, this.player.getWorldPosition()) < CONFIG.pickupRadius) {
        if (this.cargo.length >= CONFIG.cargoCapacity) {
          this.showMessage('Cargo hold full. Head for extraction.');
          continue;
        }
        this.cargo.push(pickup.item);
        this.showMessage(`Collected ${pickup.item.label}.`);
        removal.push(pickup);
        this.refreshCargoUI();
      }
    }

    for (const pickup of removal) {
      this.scene.remove(pickup.mesh);
      disposeObject3D(pickup.mesh);
      const index = this.pickups.indexOf(pickup);
      if (index >= 0) {
        this.pickups.splice(index, 1);
      }
    }
  }

  spawnWarpDemon(debug = false) {
    const edge = Math.floor(Math.random() * 4);
    const position = new THREE.Vector3(
      edge === 0 ? -CONFIG.worldWidth * 0.52 : edge === 1 ? CONFIG.worldWidth * 0.52 : lerp(-CONFIG.worldWidth * 0.42, CONFIG.worldWidth * 0.42, Math.random()),
      2.5,
      edge === 2 ? -CONFIG.worldHeight * 0.52 : edge === 3 ? CONFIG.worldHeight * 0.52 : lerp(-CONFIG.worldHeight * 0.42, CONFIG.worldHeight * 0.42, Math.random())
    );
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.2, 1),
      new THREE.MeshStandardMaterial({
        color: 0x8d62ff,
        emissive: 0xa94cff,
        emissiveIntensity: 1.4,
        transparent: true,
        opacity: 0.9
      })
    );
    mesh.position.copy(position);
    mesh.castShadow = false;
    this.scene.add(mesh);
    this.warpDemons.push({
      mesh,
      speed: debug ? 28 : 18,
      target: null,
      age: 0
    });
    this.showMessage(debug ? 'Warp Demon forced into the sector.' : 'A Warp Demon breaches into local space.');
  }

  updateWarpDemons(dt) {
    for (const demon of this.warpDemons) {
      demon.age += dt;
      demon.mesh.rotation.x += dt * 1.3;
      demon.mesh.rotation.y += dt * 1.8;
      demon.mesh.scale.setScalar(1 + Math.sin(this.elapsed * 7 + demon.age) * 0.08);

      const target = this.ships
        .filter((ship) => !ship.dead && ship.kind !== 'carrion')
        .sort((a, b) => distanceXZ(a.getWorldPosition(), demon.mesh.position) - distanceXZ(b.getWorldPosition(), demon.mesh.position))[0];

      if (!target) {
        continue;
      }

      const direction = target.getWorldPosition().clone().sub(demon.mesh.position).setY(0).normalize();
      demon.mesh.position.add(direction.multiplyScalar(demon.speed * dt));

      if (distanceXZ(demon.mesh.position, target.getWorldPosition()) < 3.4) {
        target.destroy('demon');
      }
    }
  }

  updateShips(dt) {
    for (const ship of this.ships) {
      if (ship.dead) {
        continue;
      }
      ship.updateShield(dt);

      if (ship === this.player) {
        this.updatePlayerShip(dt);
      } else {
        this.updateAIShip(ship, dt);
      }

      ship.group.position.add(ship.velocity.clone().multiplyScalar(dt));
      ship.group.position.x = clamp(ship.group.position.x, -CONFIG.worldWidth * 0.5, CONFIG.worldWidth * 0.5);
      ship.group.position.z = clamp(ship.group.position.z, -CONFIG.worldHeight * 0.5, CONFIG.worldHeight * 0.5);

      if (ship.velocity.lengthSq() > 0.001) {
        const heading = Math.atan2(ship.velocity.x, ship.velocity.z);
        ship.group.rotation.y = heading + Math.PI;
      }

      this.tryShipFire(ship, dt);
    }

    this.ships = this.ships.filter((ship) => !ship.dead);
  }

  updatePlayerShip(dt) {
    const move = this.input.getMoveVector();
    const moveDirection = new THREE.Vector3(move.x, 0, move.y);
    if (moveDirection.lengthSq() > 0.001) {
      moveDirection.normalize();
      this.player.velocity.lerp(moveDirection.multiplyScalar(this.player.getEffectiveSpeed()), 0.18);
    } else {
      this.player.velocity.lerp(new THREE.Vector3(), 0.12);
    }

    const aimState = this.input.getAimState(() => this.projectPlayerToScreen());
    if (aimState.firing && aimState.vector.lengthSq() > 0.01) {
      this.player.aimDirection.set(aimState.vector.x, 0, aimState.vector.y).normalize();
      this.player.isFiring = true;
    } else {
      this.player.isFiring = false;
    }
  }

  updateAIShip(ship, dt) {
    const pos = ship.getWorldPosition();
    const playerDistance = distanceXZ(this.player.getWorldPosition(), pos);
    const introGraceActive = this.runTime < CONFIG.introGraceDuration;
    const playerDetected = playerDistance < ship.archetype.detection;
    let target = null;
    let desiredDirection = new THREE.Vector3();

    if (ship.faction === 'pirate') {
      const shouldPressPlayer =
        playerDetected &&
        (!introGraceActive || playerDistance < ship.archetype.detection * 0.55);

      if (shouldPressPlayer) {
        target = this.player;
        const toTarget = target.getWorldPosition().clone().sub(pos).setY(0);
        const distance = toTarget.length();
        desiredDirection.copy(toTarget.normalize());
        ship.isFiring = distance < 68;
        if (distance < 30) {
          desiredDirection.multiplyScalar(-0.2);
        }
      } else {
        desiredDirection.copy(this.getPatrolDirection(ship, 1));
        ship.isFiring = false;
      }
    } else if (ship.faction === 'scavenger') {
      const carrion = this.ships
        .filter((candidate) => candidate.kind === 'carrion' && !candidate.dead)
        .sort((a, b) => distanceXZ(a.getWorldPosition(), pos) - distanceXZ(b.getWorldPosition(), pos))[0];
      if (carrion) {
        const playerDistance = distanceXZ(this.player.getWorldPosition(), carrion.getWorldPosition());
        const shipDistance = distanceXZ(ship.getWorldPosition(), carrion.getWorldPosition());
        if (playerDistance < 24 && shipDistance < 24 && playerDetected) {
          if (ship.disposition > 0.55) {
            target = this.player;
            desiredDirection.copy(this.player.getWorldPosition().clone().sub(pos).setY(0).normalize());
            ship.isFiring = !introGraceActive;
          } else {
            desiredDirection.copy(pos.clone().sub(this.player.getWorldPosition()).setY(0).normalize());
            ship.isFiring = false;
          }
        } else {
          desiredDirection.copy(carrion.getWorldPosition().clone().sub(pos).setY(0).normalize());
          ship.isFiring = false;
        }
      } else {
        desiredDirection.copy(this.getPatrolDirection(ship, 1));
        ship.isFiring = false;
      }
    } else if (ship.faction === 'law') {
      if (this.wantedTimer > 0 && playerDistance < ship.archetype.detection) {
        target = this.player;
      } else {
        target = this.ships
          .filter(
            (candidate) =>
              candidate.faction === 'pirate' &&
              !candidate.dead &&
              distanceXZ(candidate.getWorldPosition(), pos) < ship.archetype.detection * 1.3
          )
          .sort((a, b) => distanceXZ(a.getWorldPosition(), pos) - distanceXZ(b.getWorldPosition(), pos))[0];
      }

      if (target) {
        desiredDirection.copy(target.getWorldPosition().clone().sub(pos).setY(0).normalize());
        ship.isFiring = distanceXZ(target.getWorldPosition(), pos) < 74;
      } else {
        desiredDirection.copy(this.getPatrolDirection(ship, 1));
        ship.isFiring = false;
      }
    }

    if (desiredDirection.lengthSq() > 0.001) {
      ship.velocity.lerp(desiredDirection.normalize().multiplyScalar(ship.getEffectiveSpeed()), 0.07);
      ship.aimDirection.copy(desiredDirection.normalize());
    } else {
      ship.velocity.lerp(new THREE.Vector3(), 0.05);
      ship.isFiring = false;
    }
  }

  tryShipFire(ship) {
    if (!ship.isFiring || ship.dead) {
      return;
    }

    for (const component of ship.getWeaponComponents()) {
      const preset = WEAPON_PRESETS[component.weaponKey];
      const cooldownKey = component.id;
      const lastFired = ship.weaponCooldowns.get(cooldownKey) ?? -Infinity;
      if (this.elapsed - lastFired < preset.fireInterval) {
        continue;
      }

      ship.weaponCooldowns.set(cooldownKey, this.elapsed);

      const origin = component.mesh.getWorldPosition(new THREE.Vector3());
      if (preset.beam) {
        for (let step = 1; step <= 18; step += 1) {
          const beamPos = origin.clone().add(ship.aimDirection.clone().multiplyScalar(step * 2.1));
          const beamMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.22, 6, 6),
            new THREE.MeshBasicMaterial({ color: preset.color })
          );
          beamMesh.position.copy(beamPos);
          this.scene.add(beamMesh);
          this.projectiles.push({
            mesh: beamMesh,
            owner: ship,
            faction: ship.faction,
            weaponPreset: preset,
            damage: preset.damage * ship.damageMultiplier,
            direction: ship.aimDirection.clone(),
            speed: 0,
            age: 0,
            component,
            homingRadius: 0
          });
        }
        continue;
      }

      this.spawnProjectile(ship, origin, ship.aimDirection, preset, component);
    }
  }

  updateExtraction(dt) {
    this.currentExtractionZone = this.extractionZones.find(
      (zone) => distanceXZ(zone.position, this.player.getWorldPosition()) < zone.radius
    );

    if (this.currentExtractionZone) {
      this.extractionTimer = clamp(this.extractionTimer + dt, 0, CONFIG.extractionDuration);
      this.cargoPanel.classList.remove('hidden');
      this.extractStatus.textContent = `Charging FTL ${this.extractionTimer.toFixed(1)} / ${CONFIG.extractionDuration.toFixed(1)}`;
      this.hud.zone.textContent = 'Extraction';
      if (this.extractionTimer >= CONFIG.extractionDuration) {
        this.completeExtraction();
      }
    } else {
      this.extractionTimer = Math.max(0, this.extractionTimer - dt * 0.35);
      this.extractStatus.textContent = 'Outside zone';
      this.hud.zone.textContent = 'Drift';
      this.cargoPanel.classList.add('hidden');
    }
  }

  completeExtraction() {
    const extractedItems = this.cargo.filter((item) => item.safe);
    const jettisoned = this.cargo.filter((item) => !item.safe);

    for (const key of RESOURCE_KEYS) {
      this.meta.resources[key] += this.pendingResources[key];
    }

    for (const item of extractedItems) {
      if (item.category === 'resource') {
        this.meta.resources[item.resourceKey] += item.amount;
      } else {
        this.meta.stash.push(item);
      }
    }

    this.endRun(
      true,
      `Extracted ${extractedItems.length} safe items, jettisoned ${jettisoned.length}, and banked processed resources.`
    );
  }

  endRun(success, summaryText) {
    if (!this.runActive) {
      return;
    }

    this.runActive = false;
    this.runOutcome.textContent = success ? 'Extraction Complete' : 'Hard Wipe';
    this.runTitle.textContent = success ? 'Jump Successful' : 'Ship Lost';
    this.runSummary.textContent = `${summaryText} Meta stash now holds ${this.meta.stash.length} items.`;
    this.runOverlay.classList.remove('hidden');
  }

  toggleSecureSelected() {
    const item = this.cargo.find((entry) => entry.id === this.selectedCargoId);
    if (!item) {
      this.showMessage('Select a cargo item first.');
      return;
    }

    const safeCount = this.cargo.filter((entry) => entry.safe).length;
    if (!item.safe && safeCount >= CONFIG.safeStorageCapacity) {
      this.showMessage('FTL-safe storage is full.');
      return;
    }

    item.safe = !item.safe;
    this.refreshCargoUI();
  }

  combineSelectedCargo() {
    const item = this.cargo.find((entry) => entry.id === this.selectedCargoId);
    if (!item || !item.combineKey) {
      this.showMessage('That item cannot be combined.');
      return;
    }

    if (item.rarityIndex >= RARITIES.length - 1) {
      this.showMessage('That item is already at peak rarity.');
      return;
    }

    const match = this.cargo.find(
      (entry) => entry.id !== item.id && entry.combineKey === item.combineKey && entry.rarityIndex === item.rarityIndex
    );
    if (!match) {
      this.showMessage('No matching duplicate found in the hold.');
      return;
    }

    const newItem = {
      ...item,
      id: crypto.randomUUID(),
      safe: false,
      rarityIndex: item.rarityIndex + 1
    };

    this.cargo = this.cargo.filter((entry) => entry.id !== item.id && entry.id !== match.id);
    this.cargo.push(newItem);
    this.selectedCargoId = newItem.id;
    this.showMessage(`${item.label} improved to ${RARITIES[newItem.rarityIndex]}.`);
    this.refreshCargoUI();
  }

  processSelectedCargo() {
    const item = this.cargo.find((entry) => entry.id === this.selectedCargoId);
    if (!item) {
      this.showMessage('Select a cargo item first.');
      return;
    }

    const yields = item.category === 'resource'
      ? { [item.resourceKey]: item.amount }
      : this.getProcessingYield(item);

    for (const key of RESOURCE_KEYS) {
      this.pendingResources[key] += yields[key] ?? 0;
    }

    this.cargo = this.cargo.filter((entry) => entry.id !== item.id);
    this.selectedCargoId = null;
    this.showMessage(`Processed ${item.label} into resources.`);
    this.refreshCargoUI();
  }

  getProcessingYield(item) {
    const rarityFactor = 1 + item.rarityIndex * 0.7;
    if (item.category === 'component') {
      return {
        scrap: Math.round(8 * rarityFactor),
        tech: Math.round(3 * rarityFactor),
        biomass: 0,
        credits: Math.round(2 * rarityFactor)
      };
    }

    if (item.category === 'blueprint') {
      return {
        scrap: 4,
        tech: 10,
        biomass: 0,
        credits: 14
      };
    }

    if (item.category === 'mod') {
      return {
        scrap: 6,
        tech: 4 + item.rarityIndex * 3,
        biomass: 0,
        credits: 3 + item.rarityIndex * 2
      };
    }

    return { scrap: 0, tech: 0, biomass: 0, credits: 0 };
  }

  refreshCargoUI() {
    const safeCount = this.cargo.filter((item) => item.safe).length;
    this.hud.cargo.textContent = `${this.cargo.length} / ${CONFIG.cargoCapacity}`;
    this.hud.safe.textContent = `${safeCount} / ${CONFIG.safeStorageCapacity}`;
    this.hud.cargoBar.style.width = `${(this.cargo.length / CONFIG.cargoCapacity) * 100}%`;
    this.hud.safeBar.style.width = `${(safeCount / CONFIG.safeStorageCapacity) * 100}%`;
    this.hud.scrap.textContent = `${this.meta.resources.scrap + this.pendingResources.scrap}`;
    this.hud.tech.textContent = `${this.meta.resources.tech + this.pendingResources.tech}`;
    this.hud.biomass.textContent = `${this.meta.resources.biomass + this.pendingResources.biomass}`;
    this.hud.credits.textContent = `${this.meta.resources.credits + this.pendingResources.credits}`;

    this.cargoList.innerHTML = '';
    for (const item of this.cargo) {
      const button = document.createElement('button');
      button.className = 'cargo-entry';
      if (item.id === this.selectedCargoId) {
        button.classList.add('selected');
      }
      if (item.safe) {
        button.classList.add('safe');
      }

      const rarity = RARITIES[item.rarityIndex] ?? 'Base';
      const suffix = item.category === 'resource' ? `${item.amount}` : rarity;
      button.innerHTML = `
        <div>
          <div>${item.label}</div>
          <div class="cargo-meta">
            <span>${item.category}</span>
            <span>${suffix}</span>
          </div>
        </div>
        <div class="cargo-meta">${item.safe ? 'SAFE' : 'LOOSE'}</div>
      `;
      button.addEventListener('click', () => {
        this.selectedCargoId = item.id;
        this.refreshCargoUI();
      });
      this.cargoList.appendChild(button);
    }
  }

  refreshHUD() {
    const hullPercent = Math.round((this.player.hull / this.player.maxHull) * 100);
    const shieldPercent = Math.round((this.player.shield / Math.max(1, this.player.maxShield)) * 100);
    this.hud.hull.textContent = `${hullPercent}%`;
    this.hud.shield.textContent = `${shieldPercent}%`;
    this.hud.hullBar.style.width = `${hullPercent}%`;
    this.hud.shieldBar.style.width = `${shieldPercent}%`;
    this.hud.run.textContent = formatTime(this.runTime);
    this.hud.demon.textContent = formatTime(Math.max(0, this.nextDemonAt - this.runTime));
  }

  showMessage(text) {
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = text;
    this.messageLog.prepend(message);
    while (this.messageLog.children.length > 4) {
      this.messageLog.removeChild(this.messageLog.lastChild);
    }
    setTimeout(() => message.remove(), 3200);
  }

  spawnExplosion(position, color) {
    for (let index = 0; index < 10; index += 1) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 10, 10),
        new THREE.MeshBasicMaterial({ color })
      );
      mesh.position.copy(position).add(
        new THREE.Vector3(lerp(-1.2, 1.2, Math.random()), lerp(0.6, 2.4, Math.random()), lerp(-1.2, 1.2, Math.random()))
      );
      this.spawnEffect(mesh, 0.35, (effect, effectDt) => {
        effect.mesh.position.y += effectDt * 6;
        effect.mesh.scale.multiplyScalar(1.02);
        effect.mesh.material.opacity = Math.max(0, 1 - effect.age / effect.lifespan);
      });
    }
  }

  spawnDebrisBurst(position, componentType) {
    const color = {
      engine: 0x5ee0ff,
      shield: 0x88aaff,
      reactor: 0xff8855,
      weapon: 0xffcc77
    }[componentType] ?? 0xffffff;
    this.spawnExplosion(position, color);
  }

  spawnShieldFlash(position) {
    const flash = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 10, 10),
      new THREE.MeshBasicMaterial({
        color: 0x9bd1ff,
        transparent: true,
        opacity: 0.24
      })
    );
    flash.position.copy(position);
    this.spawnEffect(flash, 0.16, (effect) => {
      effect.mesh.scale.multiplyScalar(1.12);
      effect.mesh.material.opacity = Math.max(0, 0.32 * (1 - effect.age / effect.lifespan));
    });
  }

  updateEffects(dt) {
    const expired = [];

    for (const effect of this.effects) {
      effect.age += dt;
      effect.update?.(effect, dt);
      if (effect.age >= effect.lifespan) {
        expired.push(effect);
      }
    }

    for (const effect of expired) {
      this.scene.remove(effect.mesh);
      disposeObject3D(effect.mesh);
      const index = this.effects.indexOf(effect);
      if (index >= 0) {
        this.effects.splice(index, 1);
      }
    }
  }

  updateCamera(dt) {
    const target = this.player.getWorldPosition();
    this.camera.position.x = lerp(this.camera.position.x, target.x, 0.09);
    this.camera.position.z = lerp(this.camera.position.z, target.z + 36, 0.09);
    this.camera.lookAt(target.x, 0, target.z - 16);
  }

  tick() {
    const dt = Math.min(this.clock.getDelta(), 0.033);
    this.elapsed += dt;

    if (this.runActive) {
      this.runTime += dt;
      this.wantedTimer = Math.max(0, this.wantedTimer - dt);

      if (this.runTime >= this.nextDemonAt) {
        this.spawnWarpDemon(false);
        this.nextDemonAt += CONFIG.demonSpawnInterval;
      }

      this.updateShips(dt);
      this.updateProjectiles(dt);
      this.updatePickups(dt);
      this.updateWarpDemons(dt);
      this.updateExtraction(dt);
      this.updateCamera(dt);
      this.refreshHUD();
    }

    this.updateEffects(dt);

    this.renderer.render(this.scene, this.camera);
  }
}

new Game();
