/**
 * Chicken Fusion Simulator - Game Logic & Physics Engine
 * 9x9 Grid (81 cells), Custom Themed Chicken Sprites, Drag-Drop,
 * Bundle Purchasing, Auto-Fusion, Overflow Refund, Particles & Audio FX.
 */

// ============================================================================
// CHICKEN DEFINITIONS & TIERS
// ============================================================================
const CHICKEN_TIERS = [
  {
    level: 1,
    name: "Dirt Chicken",
    income: 1,
    color: "#8d6e63",
    desc: "A humble chick covered in nutrient-rich garden soil with a tiny leaf sprout.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Dirt Body -->
        <circle cx="50" cy="56" r="32" fill="#8d6e63" stroke="#5d4037" stroke-width="3"/>
        <ellipse cx="44" cy="50" rx="14" ry="10" fill="#a1887f"/>
        <!-- Mud Splatters -->
        <circle cx="36" cy="62" r="4" fill="#4e342e"/>
        <circle cx="60" cy="66" r="5" fill="#4e342e"/>
        <!-- Eyes -->
        <circle cx="62" cy="46" r="5" fill="#212121"/>
        <circle cx="64" cy="44" r="1.8" fill="#ffffff"/>
        <!-- Beak -->
        <polygon points="72,48 85,53 72,58" fill="#ffb300" stroke="#f57f17" stroke-width="1.5"/>
        <!-- Comb Sprout -->
        <path d="M 50,26 C 45,15 35,16 48,23 C 54,12 65,14 53,26 Z" fill="#66bb6a" stroke="#2e7d32" stroke-width="2"/>
        <!-- Feet -->
        <path d="M 40,88 L 40,94 M 40,94 L 34,96 M 40,94 L 46,96" stroke="#ffb300" stroke-width="3" stroke-linecap="round"/>
        <path d="M 58,88 L 58,94 M 58,94 L 52,96 M 58,94 L 64,96" stroke="#ffb300" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    level: 2,
    name: "Eggshell Chicken",
    income: 3,
    color: "#f5ebe0",
    desc: "Wears its cracked newborn eggshell proudly as a sturdy knight helmet.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Body -->
        <circle cx="50" cy="56" r="30" fill="#fff176" stroke="#fbc02d" stroke-width="3"/>
        <!-- Eggshell Helmet -->
        <path d="M 28,44 C 28,20 72,20 72,44 L 66,38 L 58,45 L 50,38 L 42,46 L 36,38 Z" fill="#f5ebe0" stroke="#d5bdaf" stroke-width="2.5"/>
        <!-- Eye -->
        <circle cx="62" cy="52" r="5" fill="#212121"/>
        <circle cx="64" cy="50" r="1.8" fill="#ffffff"/>
        <!-- Beak -->
        <polygon points="72,54 84,59 72,64" fill="#ff9800"/>
        <!-- Wing -->
        <ellipse cx="40" cy="60" rx="10" ry="7" fill="#ffee58" stroke="#fbc02d" stroke-width="2"/>
        <!-- Feet -->
        <path d="M 42,86 L 42,94 M 58,86 L 58,94" stroke="#ff9800" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    level: 3,
    name: "Cool Chicken",
    income: 8,
    color: "#00b4d8",
    desc: "Rocking sleek shaded sunglasses and a backwards cap with maximum swag.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Body -->
        <circle cx="50" cy="56" r="31" fill="#fff59d" stroke="#fbc02d" stroke-width="3"/>
        <!-- Backwards Red Cap -->
        <path d="M 30,34 Q 50,18 70,34 L 78,37 L 24,37 Z" fill="#e63946"/>
        <polygon points="24,37 14,35 20,40" fill="#b71c1c"/>
        <!-- Sunglasses -->
        <rect x="42" y="44" width="34" height="13" rx="4" fill="#111" stroke="#000" stroke-width="2"/>
        <line x1="44" y1="46" x2="56" y2="55" stroke="#00f5d4" stroke-width="2"/>
        <line x1="62" y1="46" x2="72" y2="55" stroke="#00f5d4" stroke-width="2"/>
        <!-- Smirk Beak -->
        <polygon points="74,56 86,59 74,65" fill="#fb8500"/>
        <!-- Gold Chain -->
        <path d="M 40,70 Q 52,82 66,70" stroke="#ffd166" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Feet -->
        <path d="M 42,87 L 42,95 M 58,87 L 58,95" stroke="#fb8500" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    level: 4,
    name: "Punk Rooster",
    income: 22,
    color: "#ff0054",
    desc: "An anarchic rebel with an electric-pink mohawk and spiked leather collar.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Mohawk -->
        <polygon points="40,24 46,4 52,22 58,2 66,24 72,12 75,30" fill="#ff0054" stroke="#9e0032" stroke-width="2"/>
        <!-- Body -->
        <circle cx="50" cy="58" r="30" fill="#f8f9fa" stroke="#343a40" stroke-width="3"/>
        <!-- Piercing Eye -->
        <circle cx="63" cy="50" r="6" fill="#111"/>
        <circle cx="65" cy="49" r="2" fill="#ff0054"/>
        <circle cx="66" cy="48" r="1" fill="#fff"/>
        <!-- Beak -->
        <polygon points="73,52 86,57 73,63" fill="#ffb703"/>
        <!-- Spiked Collar -->
        <rect x="36" y="68" width="34" height="8" rx="2" fill="#212529"/>
        <polygon points="41,68 43,62 45,68" fill="#adb5bd"/>
        <polygon points="51,68 53,60 55,68" fill="#adb5bd"/>
        <polygon points="61,68 63,62 65,68" fill="#adb5bd"/>
        <!-- Feet -->
        <path d="M 42,88 L 42,95 M 58,88 L 58,95" stroke="#ffb703" stroke-width="3"/>
      </svg>
    `
  },
  {
    level: 5,
    name: "Golden Chicken",
    income: 60,
    color: "#ffd700",
    desc: "Forged from pure 24-karat gold with a royal diamond-studded crown.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff3b0"/>
            <stop offset="50%" stop-color="#ffd700"/>
            <stop offset="100%" stop-color="#cc8a00"/>
          </linearGradient>
        </defs>
        <!-- Crown -->
        <polygon points="38,28 42,12 50,22 58,12 62,28" fill="#ffb703" stroke="#cc8a00" stroke-width="2"/>
        <circle cx="50" cy="18" r="2.5" fill="#00f5d4"/>
        <!-- Body -->
        <circle cx="50" cy="56" r="31" fill="url(#goldGrad)" stroke="#cc8a00" stroke-width="3"/>
        <ellipse cx="42" cy="52" rx="14" ry="9" fill="#ffffff" opacity="0.35"/>
        <!-- Eye -->
        <circle cx="63" cy="48" r="5" fill="#212121"/>
        <circle cx="65" cy="46" r="1.8" fill="#ffffff"/>
        <!-- Golden Beak -->
        <polygon points="73,50 86,55 73,61" fill="#fb8500" stroke="#cc8a00" stroke-width="1.5"/>
        <!-- Wing with Glint -->
        <path d="M 36,55 Q 46,75 56,58" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        <!-- Feet -->
        <path d="M 42,87 L 42,95 M 58,87 L 58,95" stroke="#cc8a00" stroke-width="3"/>
      </svg>
    `
  },
  {
    level: 6,
    name: "Skeleton Chicken",
    income: 165,
    color: "#e0e1dd",
    desc: "Risen from the crypt! Glowing cyan eyes and bare bone ribcage structure.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Skull/Body -->
        <circle cx="50" cy="56" r="30" fill="#e0e1dd" stroke="#415a77" stroke-width="3"/>
        <!-- Ribs -->
        <path d="M 38,58 L 52,58 M 38,65 L 50,65 M 40,72 L 48,72" stroke="#1b263b" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Eye Socket Glowing Cyan -->
        <circle cx="64" cy="47" r="7" fill="#0d1b2a"/>
        <circle cx="64" cy="47" r="3.5" fill="#00f5d4"/>
        <circle cx="64" cy="47" r="1.5" fill="#ffffff"/>
        <!-- Bone Beak -->
        <polygon points="73,50 85,55 73,60" fill="#778da9" stroke="#1b263b" stroke-width="1.5"/>
        <!-- Horn Spikes -->
        <polygon points="46,26 49,16 52,26" fill="#e0e1dd" stroke="#415a77" stroke-width="1.5"/>
        <!-- Skeletal Feet -->
        <path d="M 42,86 L 42,95 M 36,96 L 46,96 M 58,86 L 58,95 M 52,96 L 62,96" stroke="#415a77" stroke-width="2.5"/>
      </svg>
    `
  },
  {
    level: 7,
    name: "Inferno Chicken",
    income: 450,
    color: "#ff3e00",
    desc: "Conjured in the core of an active volcano, shedding burning embers and flames.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <defs>
          <radialGradient id="lavaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffea00"/>
            <stop offset="60%" stop-color="#ff3e00"/>
            <stop offset="100%" stop-color="#7a0000"/>
          </radialGradient>
        </defs>
        <!-- Fire Crest -->
        <path d="M 44,28 Q 50,8 56,22 Q 65,4 66,26 Z" fill="#ffea00" stroke="#ff3e00" stroke-width="2"/>
        <!-- Magma Body -->
        <circle cx="50" cy="56" r="31" fill="url(#lavaGlow)" stroke="#380000" stroke-width="3"/>
        <!-- Flame Crack Lines -->
        <path d="M 40,48 Q 48,58 38,68 M 52,48 Q 58,62 48,74" stroke="#ffea00" stroke-width="2.5" fill="none"/>
        <!-- Fire Eye -->
        <circle cx="64" cy="46" r="5.5" fill="#fff"/>
        <circle cx="65" cy="46" r="2.5" fill="#ff0055"/>
        <!-- Obsidian Beak -->
        <polygon points="74,48 88,54 74,60" fill="#240046"/>
        <!-- Feet -->
        <path d="M 42,87 L 42,95 M 58,87 L 58,95" stroke="#ff3e00" stroke-width="3"/>
      </svg>
    `
  },
  {
    level: 8,
    name: "Cyber Mecha Chicken",
    income: 1250,
    color: "#00f0ff",
    desc: "Reinforced with titanium plating, hydraulic talons, and a laser scanning visor.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Titanium Body -->
        <rect x="22" y="28" width="56" height="54" rx="18" fill="#2b2d42" stroke="#8d99ae" stroke-width="3"/>
        <line x1="50" y1="28" x2="50" y2="82" stroke="#1f2233" stroke-width="2"/>
        <!-- Cyber Visor -->
        <rect x="42" y="42" width="34" height="11" rx="4" fill="#000" stroke="#00f0ff" stroke-width="2"/>
        <line x1="46" y1="47.5" x2="72" y2="47.5" stroke="#00f0ff" stroke-width="4"/>
        <!-- Laser Beak -->
        <polygon points="78,44 88,48 78,52" fill="#ffd166"/>
        <!-- Antenna -->
        <line x1="38" y1="28" x2="32" y2="12" stroke="#8d99ae" stroke-width="2.5"/>
        <circle cx="31" cy="11" r="3.5" fill="#ff0055"/>
        <!-- Jet Thruster Feet -->
        <rect x="36" y="82" width="10" height="8" rx="2" fill="#48cae4"/>
        <rect x="54" y="82" width="10" height="8" rx="2" fill="#48cae4"/>
        <polygon points="38,90 41,96 44,90" fill="#00f0ff"/>
        <polygon points="56,90 59,96 62,90" fill="#00f0ff"/>
      </svg>
    `
  },
  {
    level: 9,
    name: "Void Cosmic Chicken",
    income: 3500,
    color: "#7209b7",
    desc: "Harnesses gravitational pull and antimatter nebulae within its astral body.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <defs>
          <radialGradient id="voidGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#4cc9f0"/>
            <stop offset="45%" stop-color="#7209b7"/>
            <stop offset="100%" stop-color="#03071e"/>
          </radialGradient>
        </defs>
        <!-- Orbital Cosmic Ring -->
        <ellipse cx="50" cy="58" rx="44" ry="12" fill="none" stroke="#4cc9f0" stroke-width="2" stroke-dasharray="8 4" transform="rotate(-15 50 58)"/>
        <!-- Void Sphere Body -->
        <circle cx="50" cy="56" r="31" fill="url(#voidGrad)" stroke="#4cc9f0" stroke-width="2.5"/>
        <!-- Stardust Dots -->
        <circle cx="38" cy="46" r="1.5" fill="#fff"/>
        <circle cx="48" cy="66" r="2" fill="#f72585"/>
        <circle cx="58" cy="60" r="1" fill="#fff"/>
        <!-- Star Eye -->
        <circle cx="64" cy="48" r="6" fill="#f72585"/>
        <circle cx="64" cy="48" r="2" fill="#ffffff"/>
        <!-- Crystal Beak -->
        <polygon points="74,48 88,53 74,58" fill="#4cc9f0"/>
        <!-- Floating Astral Feet -->
        <circle cx="42" cy="90" r="3.5" fill="#7209b7"/>
        <circle cx="58" cy="90" r="3.5" fill="#7209b7"/>
      </svg>
    `
  },
  {
    level: 10,
    name: "Celestial God Chicken",
    income: 10000,
    color: "#f39c12",
    desc: "A supreme deity in the poultry pantheon. Radiates holy halos and eternal light.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Divine Halo -->
        <ellipse cx="50" cy="18" rx="26" ry="7" fill="none" stroke="#ffd700" stroke-width="3" filter="drop-shadow(0 0 6px #ffe600)"/>
        <!-- Angelic Wing Left -->
        <path d="M 24,54 C 10,40 12,20 28,34 C 18,34 20,50 30,58 Z" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5"/>
        <!-- Body -->
        <circle cx="50" cy="56" r="30" fill="#fffdfa" stroke="#ffd700" stroke-width="3.5"/>
        <!-- Holy Radiance Core -->
        <circle cx="46" cy="56" r="14" fill="#fff3b0" opacity="0.6"/>
        <!-- Enlightened Eye -->
        <circle cx="63" cy="47" r="5" fill="#f39c12"/>
        <circle cx="64" cy="46" r="2" fill="#fff"/>
        <!-- Golden Holy Beak -->
        <polygon points="73,48 86,53 73,58" fill="#ffb703" stroke="#d48806" stroke-width="1.5"/>
        <!-- Royal Crest -->
        <path d="M 44,26 Q 50,14 56,26 Z" fill="#ffd700"/>
        <!-- Golden Feet -->
        <path d="M 42,86 L 42,94 M 58,86 L 58,94" stroke="#d48806" stroke-width="3"/>
      </svg>
    `
  },
  {
    level: 11,
    name: "Quantum Paradox Chicken",
    income: 30000,
    color: "#3a0ca3",
    desc: "Simultaneously exists in multiple dimensions; lays eggs before being born.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Multiverse Glitch Echo -->
        <circle cx="44" cy="52" r="28" fill="#4361ee" opacity="0.4"/>
        <circle cx="56" cy="60" r="28" fill="#f72585" opacity="0.4"/>
        <!-- Main Quantum Body -->
        <circle cx="50" cy="56" r="29" fill="#3a0ca3" stroke="#4cc9f0" stroke-width="2.5" stroke-dasharray="6 3"/>
        <!-- Core Particle Ring -->
        <circle cx="50" cy="56" r="16" fill="none" stroke="#7209b7" stroke-width="3"/>
        <!-- Quantum Eye -->
        <circle cx="64" cy="48" r="6" fill="#4cc9f0"/>
        <circle cx="64" cy="48" r="2" fill="#fff"/>
        <polygon points="74,50 86,54 74,58" fill="#f72585"/>
        <path d="M 42,85 L 42,94 M 58,85 L 58,94" stroke="#4cc9f0" stroke-width="3"/>
      </svg>
    `
  },
  {
    level: 12,
    name: "Phoenix Overlord",
    income: 90000,
    color: "#e63946",
    desc: "Reborn infinitely from incandescent solar ashes with supreme feathered crests.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Solar Feather Flares -->
        <path d="M 20,40 Q 30,10 50,22 Q 70,10 80,40 Q 65,30 50,38 Q 35,30 20,40 Z" fill="#ff0054" stroke="#ffb703" stroke-width="1.5"/>
        <!-- Fiery Body -->
        <circle cx="50" cy="58" r="30" fill="#e63946" stroke="#ffb703" stroke-width="3"/>
        <circle cx="46" cy="58" r="18" fill="#ffb703" opacity="0.5"/>
        <circle cx="64" cy="50" r="5" fill="#111"/>
        <circle cx="65" cy="49" r="2" fill="#fff"/>
        <polygon points="74,52 89,57 74,62" fill="#ffb703" stroke="#d00000" stroke-width="1.5"/>
        <path d="M 42,88 L 42,96 M 58,88 L 58,96" stroke="#ffb703" stroke-width="3.5"/>
      </svg>
    `
  },
  {
    level: 13,
    name: "Plasma Dragon Chicken",
    income: 270000,
    color: "#06d6a0",
    desc: "A winged draconic rooster breathing pure ionized electric emerald plasma.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Dragon Horns & Spikes -->
        <polygon points="34,22 28,4 40,16" fill="#06d6a0" stroke="#048a66" stroke-width="2"/>
        <polygon points="54,20 62,2 58,16" fill="#06d6a0" stroke="#048a66" stroke-width="2"/>
        <polygon points="26,38 12,28 24,48" fill="#118ab2" stroke="#048a66" stroke-width="1.5"/>
        <!-- Scaled Body -->
        <circle cx="50" cy="58" r="30" fill="#073b4c" stroke="#06d6a0" stroke-width="3"/>
        <ellipse cx="44" cy="58" rx="14" ry="18" fill="#06d6a0" opacity="0.3"/>
        <!-- Slit Reptilian Eye -->
        <circle cx="64" cy="49" r="6" fill="#ffd166"/>
        <ellipse cx="64" cy="49" rx="1.5" ry="5" fill="#000"/>
        <!-- Horned Beak -->
        <polygon points="73,50 88,54 73,61" fill="#ffd166" stroke="#e09f3e" stroke-width="1.5"/>
        <circle cx="82" cy="54" r="2.5" fill="#06d6a0"/>
        <!-- Dragon Talons -->
        <path d="M 40,88 L 40,96 M 34,97 L 46,97 M 58,88 L 58,96 M 52,97 L 64,97" stroke="#06d6a0" stroke-width="3"/>
      </svg>
    `
  },
  {
    level: 14,
    name: "Dark Matter Chicken",
    income: 800000,
    color: "#1d3557",
    desc: "A singularity compressed into poultry form, absorbing light and bending physics.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Event Horizon Accretion Disk -->
        <ellipse cx="50" cy="58" rx="46" ry="16" fill="none" stroke="#ff007f" stroke-width="3" stroke-dasharray="10 4" transform="rotate(25 50 58)"/>
        <ellipse cx="50" cy="58" rx="40" ry="12" fill="none" stroke="#00f5d4" stroke-width="2" transform="rotate(25 50 58)"/>
        <!-- Black Hole Core -->
        <circle cx="50" cy="58" r="29" fill="#000000" stroke="#f72585" stroke-width="3"/>
        <!-- Gravitational Lens Glow -->
        <circle cx="48" cy="56" r="16" fill="#240046" opacity="0.8"/>
        <!-- Void Eye -->
        <circle cx="64" cy="48" r="5" fill="#00f5d4"/>
        <circle cx="64" cy="48" r="2" fill="#fff"/>
        <polygon points="74,50 86,54 74,58" fill="#7209b7"/>
        <circle cx="42" cy="90" r="4" fill="#f72585"/>
        <circle cx="58" cy="90" r="4" fill="#00f5d4"/>
      </svg>
    `
  },
  {
    level: 15,
    name: "Time-Warping Chrono Rooster",
    income: 2500000,
    color: "#e0aaff",
    desc: "Manipulates the fourth dimension with gear-driven clockwork feathers.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Roman Numeral Clock Dial Ring -->
        <circle cx="50" cy="56" r="38" fill="none" stroke="#c77dff" stroke-width="2" stroke-dasharray="4 6"/>
        <!-- Clock Hands Comb -->
        <line x1="50" y1="28" x2="50" y2="10" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="28" x2="68" y2="24" stroke="#ffd166" stroke-width="2" stroke-linecap="round"/>
        <circle cx="50" cy="28" r="3" fill="#fff"/>
        <!-- Gear Body -->
        <circle cx="50" cy="58" r="30" fill="#3c096c" stroke="#9d4edd" stroke-width="3"/>
        <!-- Hourglass mark -->
        <polygon points="40,50 48,50 40,66 48,66" fill="#e0aaff" opacity="0.5"/>
        <!-- Glowing Eye -->
        <circle cx="64" cy="48" r="6" fill="#ffd166"/>
        <circle cx="64" cy="48" r="2" fill="#fff"/>
        <polygon points="73,50 87,55 73,60" fill="#ffd166" stroke="#9d4edd" stroke-width="1.5"/>
        <!-- Feet -->
        <path d="M 42,88 L 42,96 M 58,88 L 58,96" stroke="#c77dff" stroke-width="3.5"/>
      </svg>
    `
  },
  {
    level: 16,
    name: "Multiverse Supreme Clucker",
    income: 7500000,
    color: "#f72585",
    desc: "The absolute nexus of all poultry across infinity. Infinite value generator.",
    renderSvg: () => `
      <svg viewBox="0 0 100 100">
        <!-- Hyperdimensional Crowns -->
        <polygon points="32,24 38,6 46,18 54,4 62,18 70,6 76,24" fill="#ffd700" stroke="#f72585" stroke-width="2"/>
        <!-- Rainbow Aura -->
        <circle cx="50" cy="58" r="36" fill="none" stroke="#4cc9f0" stroke-width="2" opacity="0.7"/>
        <circle cx="50" cy="58" r="33" fill="none" stroke="#f72585" stroke-width="2" opacity="0.8"/>
        <!-- Supreme Iridescent Body -->
        <circle cx="50" cy="58" r="30" fill="#240046" stroke="#ffd700" stroke-width="3"/>
        <circle cx="45" cy="56" r="16" fill="#f72585" opacity="0.6"/>
        <!-- Omnipresent Eye -->
        <circle cx="64" cy="48" r="6" fill="#fff"/>
        <circle cx="64" cy="48" r="3" fill="#7209b7"/>
        <circle cx="65" cy="47" r="1.5" fill="#00f5d4"/>
        <polygon points="74,50 90,55 74,60" fill="#ffd700" stroke="#f72585" stroke-width="2"/>
        <path d="M 42,88 L 42,97 M 36,98 L 48,98 M 58,88 L 58,97 M 52,98 L 64,98" stroke="#ffd700" stroke-width="3"/>
      </svg>
    `
  }
];

// Helper to retrieve tier object safely with doubled level-to-level progression differences
function getTier(lvl) {
  let tierData;
  if (lvl <= CHICKEN_TIERS.length) {
    tierData = CHICKEN_TIERS[lvl - 1];
  } else {
    // Algorithmic tier generator for endless progression
    const baseTiers = CHICKEN_TIERS.length;
    const surplus = lvl - baseTiers;
    const last = CHICKEN_TIERS[baseTiers - 1];
    tierData = {
      level: lvl,
      name: `Omega Tier ${lvl} Titan`,
      income: Math.floor(last.income * Math.pow(4.2, surplus)),
      color: "#ff007f",
      desc: `An unfathomable entity beyond mortal comprehension (Tier ${lvl}).`,
      renderSvg: last.renderSvg
    };
  }

  // Base tier 1 income with current 5x economy multiplier
  const baseT1 = Math.max(1, Math.round(CHICKEN_TIERS[0].income * 7.5)); // 8/s
  
  // Calculate scaled income where the delta between consecutive levels is doubled:
  // Step difference: Δ_k = 2 * (base_k - base_{k-1}) * 7.5
  let calculatedIncome = baseT1;
  for (let k = 2; k <= lvl; k++) {
    const prevBase = k - 1 <= CHICKEN_TIERS.length ? CHICKEN_TIERS[k - 2].income : CHICKEN_TIERS[CHICKEN_TIERS.length - 1].income * Math.pow(3.1, (k - 1) - CHICKEN_TIERS.length);
    const currBase = k <= CHICKEN_TIERS.length ? CHICKEN_TIERS[k - 1].income : CHICKEN_TIERS[CHICKEN_TIERS.length - 1].income * Math.pow(3.1, k - CHICKEN_TIERS.length);
    const baseDelta = Math.max(1, (currBase - prevBase) * 7.5);
    // Double the difference between levels:
    calculatedIncome += Math.round(baseDelta * 2);
  }

  return {
    ...tierData,
    income: calculatedIncome * 4
  };
}

// ============================================================================
// GAME STATE MANAGEMENT
// ============================================================================
const GRID_SIZE = 9; // 9x9 = 81 cells
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const SAVE_KEY = "chicken_fusion_simulator_save_v1";

const state = {
  money: 50,
  baseChickenPrice: 10,
  chickenPurchasedCount: 0,
  cells: new Array(TOTAL_CELLS).fill(null), // null or { id, level }
  maxTierDiscovered: 1,
  totalFusions: 0,
  totalChickensSpawned: 0,
  totalMoneyEarned: 0,
  totalPets: 0,
  soundEnabled: true,
  lastSaveTime: Date.now()
};

// ID generator for chicken elements
let nextChickenId = 1;

// ============================================================================
// AUDIO SYNTHESIZER (Web Audio API)
// ============================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playPop(freq = 420) {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playFusion(level = 1) {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Deep Bass / Sub Kick for tactile physical punch
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(140 + Math.min(level * 5, 80), t);
    subOsc.frequency.exponentialRampToValueAtTime(30, t + 0.28);
    subGain.gain.setValueAtTime(0.4, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(t);
    subOsc.stop(t + 0.3);

    // 2. Rising Synth Whoosh / Zap
    const whooshOsc = this.ctx.createOscillator();
    const whooshGain = this.ctx.createGain();
    whooshOsc.type = "triangle";
    whooshOsc.frequency.setValueAtTime(220, t);
    whooshOsc.frequency.exponentialRampToValueAtTime(800 + Math.min(level * 60, 1200), t + 0.15);
    whooshGain.gain.setValueAtTime(0.12, t);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    whooshOsc.connect(whooshGain);
    whooshGain.connect(this.ctx.destination);
    whooshOsc.start(t);
    whooshOsc.stop(t + 0.2);

    // 3. Resonant Harmonic Chime Cascade
    const baseFreq = 330 + Math.min(level * 35, 550);
    const intervals = [1, 1.25, 1.5, 2, 2.5]; // Major triad with octaves

    intervals.forEach((ratio, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = t + 0.05 + idx * 0.035;
      const freq = baseFreq * ratio;

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.04, startTime + 0.35);

      gain.gain.setValueAtTime(0.16 / (idx * 0.4 + 1), startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.48);
    });

    // 4. Cosmic high shimmer on higher tiers (Level 4+)
    if (level >= 4) {
      const shimmerOsc = this.ctx.createOscillator();
      const shimmerGain = this.ctx.createGain();
      shimmerOsc.type = "sine";
      shimmerOsc.frequency.setValueAtTime(1600 + level * 70, t + 0.12);
      shimmerOsc.frequency.exponentialRampToValueAtTime(2800, t + 0.4);
      shimmerGain.gain.setValueAtTime(0.07, t + 0.12);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(this.ctx.destination);
      shimmerOsc.start(t + 0.12);
      shimmerOsc.stop(t + 0.5);
    }
  }

  playPurchase() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.06); // A5

    gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.18);
  }

  playCluck() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(240, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  playRefund() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(330, this.ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }
}

const sounds = new SoundEngine();

// ============================================================================
// PARTICLE ENGINE (Canvas Overlay)
// ============================================================================
class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.loop();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x, y, color = "#ffb703", count = 28, level = 1) {
    // 1. Expanding Shockwave Ring
    this.particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      radius: 5,
      maxRadius: 45 + Math.min(level * 6, 90),
      color: color,
      alpha: 0.9,
      life: 0,
      maxLife: 22,
      type: "shockwave"
    });

    // 2. Secondary White Glow Ring
    this.particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      radius: 2,
      maxRadius: 30 + Math.min(level * 4, 60),
      color: "#ffffff",
      alpha: 0.8,
      life: 0,
      maxLife: 16,
      type: "shockwave"
    });

    // 3. Radial Burst Particles: Feathers, Stars, Sparks, and Golden Embers
    const totalCount = count + Math.min(level * 3, 20);
    for (let i = 0; i < totalCount; i++) {
      const angle = (Math.PI * 2 * i) / totalCount + (Math.random() - 0.5) * 0.4;
      const speed = 2.5 + Math.random() * (6.5 + Math.min(level * 0.4, 4));
      
      const randType = Math.random();
      let pType = "spark";
      if (randType < 0.35) pType = "feather";
      else if (randType < 0.65) pType = "star";

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: (pType === "star" ? 4 : 3) + Math.random() * 5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        color: i % 3 === 0 ? "#ffffff" : (i % 3 === 1 ? color : "#ffd166"),
        alpha: 1,
        life: 0,
        maxLife: 28 + Math.random() * 24,
        type: pType
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;

      if (p.type === "shockwave") {
        p.radius += (p.maxRadius - p.radius) * 0.18;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.life >= p.maxLife) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = p.color;
        this.ctx.lineWidth = Math.max(1, 4 * (1 - p.life / p.maxLife));
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.stroke();
        this.ctx.restore();
        continue;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.14; // gravity
      p.vx *= 0.96;
      p.rotation = (p.rotation || 0) + (p.rotSpeed || 0.05);
      p.alpha = 1 - p.life / p.maxLife;

      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.fillStyle = p.color;

      if (p.type === "feather") {
        // Oblong floating feather with spine
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size * 2, p.size * 0.75, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = "rgba(255,255,255,0.4)";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(-p.size * 1.5, 0);
        this.ctx.lineTo(p.size * 1.5, 0);
        this.ctx.stroke();
      } else if (p.type === "star") {
        // 4-point sparkle star
        const s = p.size;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -s * 1.8);
        this.ctx.quadraticCurveTo(0, 0, s * 1.8, 0);
        this.ctx.quadraticCurveTo(0, 0, 0, s * 1.8);
        this.ctx.quadraticCurveTo(0, 0, -s * 1.8, 0);
        this.ctx.quadraticCurveTo(0, 0, 0, -s * 1.8);
        this.ctx.fill();
      } else {
        // Circular ember spark with glow
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

let fx;

// ============================================================================
// CORE ECONOMY CALCULATIONS
// ============================================================================
// Single chicken price escalates with purchases (discounted by an additional 50%)
function getSingleChickenPrice(purchasedCount = state.chickenPurchasedCount) {
  const fullPrice = state.baseChickenPrice * Math.pow(1.08, purchasedCount);
  // Lower chicken prices by 50% again:
  return Math.max(1, Math.floor(fullPrice * 0.25));
}

// Calculate bundle price accurately across sequential purchases
function getBundlePrice(count) {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += getSingleChickenPrice(state.chickenPurchasedCount + i);
  }
  return total;
}

function calculateIncomePerSecond() {
  let income = 0;
  for (let i = 0; i < TOTAL_CELLS; i++) {
    const item = state.cells[i];
    if (item) {
      income += getTier(item.level).income;
    }
  }
  return income;
}

function formatNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
  return Math.floor(num).toLocaleString();
}

// ============================================================================
// DOM ELEMENTS & EVENT BINDINGS
// ============================================================================
let gridContainer;
let moneyDisplay;
let incomeDisplay;
let maxTierDisplay;
let capacityText;
let capacityFill;
let fusableTag;
let toastContainer;

// Sell mode state
let isSellMode = false;
let selectedForSell = new Set(); // Set of cell indices

// Drag and drop state
let draggedCellIndex = null;

function initDom() {
  gridContainer = document.getElementById("gridContainer");
  moneyDisplay = document.getElementById("moneyDisplay");
  incomeDisplay = document.getElementById("incomeDisplay");
  maxTierDisplay = document.getElementById("maxTierDisplay");
  capacityText = document.getElementById("capacityText");
  capacityFill = document.getElementById("capacityFill");
  fusableTag = document.getElementById("fusableTag");
  toastContainer = document.getElementById("toastContainer");

  const canvas = document.getElementById("fxCanvas");
  fx = new ParticleEngine(canvas);

  buildGrid();
  attachShopEvents();
  attachModalEvents();

  document.getElementById("btnFuseAll").addEventListener("click", () => {
    fuseAllChickens();
  });

  document.getElementById("btnSellMode").addEventListener("click", () => {
    handleSellButtonClick();
  });

  document.getElementById("btnCancelSell").addEventListener("click", () => {
    cancelSellMode();
  });

  document.getElementById("btnSound").addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    document.getElementById("btnSound").textContent = state.soundEnabled ? "🔊" : "🔇";
    showToast(state.soundEnabled ? "Sound Effects ON" : "Sound Muted", "🔊");
  });

  // Global shortcut keys
  window.addEventListener("keydown", (e) => {
    if (e.key === "1") buyChickenBundle(1);
    if (e.key === "5") buyChickenBundle(5);
    if (e.key === "f" || e.key === "F") fuseAllChickens();
    if (e.key === "s" || e.key === "S") handleSellButtonClick();
    if (e.key === "c" || e.key === "C") toggleCodexModal(true);
    if (e.key === "Escape" && isSellMode) cancelSellMode();
  });
}

// Build 81 Cell DOM Slots
function buildGrid() {
  gridContainer.innerHTML = "";
  for (let i = 0; i < TOTAL_CELLS; i++) {
    const cellEl = document.createElement("div");
    cellEl.className = "grid-cell";
    cellEl.dataset.index = i;

    // Drag-drop listeners on cells
    cellEl.addEventListener("dragover", onDragOver);
    cellEl.addEventListener("dragleave", onDragLeave);
    cellEl.addEventListener("drop", onDrop);

    gridContainer.appendChild(cellEl);
  }
}

// Render the 9x9 board state
function renderBoard() {
  const cells = gridContainer.children;
  let occupiedCount = 0;

  for (let i = 0; i < TOTAL_CELLS; i++) {
    const cellEl = cells[i];
    const item = state.cells[i];

    if (!item) {
      cellEl.innerHTML = "";
      cellEl.classList.remove("selected-for-sell");
      continue;
    }

    occupiedCount++;
    const tier = getTier(item.level);
    const isSelected = selectedForSell.has(i);

    if (isSelected) {
      cellEl.classList.add("selected-for-sell");
    } else {
      cellEl.classList.remove("selected-for-sell");
    }

    // If cell already has this chicken, keep it or re-render
    let chickenEl = cellEl.querySelector(".chicken-item");
    if (!chickenEl || chickenEl.dataset.level != item.level) {
      cellEl.innerHTML = `
        <div class="chicken-item ${isSelected ? "marked-for-sell" : ""}" draggable="${!isSellMode}" data-index="${i}" data-level="${item.level}" title="${tier.name} (Level ${item.level}) - Earns $${tier.income}/s">
          <span class="tier-tag">Lvl ${item.level}</span>
          ${isSelected ? '<div class="sell-badge-check">✓</div>' : ''}
          <div class="chicken-sprite-wrap">
            ${tier.renderSvg()}
          </div>
          <span class="rate-tag">+$${formatNumber(tier.income)}/s</span>
        </div>
      `;

      chickenEl = cellEl.querySelector(".chicken-item");
      attachChickenEvents(chickenEl, i);
    } else {
      // Update sell badge if already rendered
      let checkEl = chickenEl.querySelector(".sell-badge-check");
      if (isSelected && !checkEl) {
        chickenEl.insertAdjacentHTML("afterbegin", '<div class="sell-badge-check">✓</div>');
        chickenEl.classList.add("marked-for-sell");
      } else if (!isSelected && checkEl) {
        checkEl.remove();
        chickenEl.classList.remove("marked-for-sell");
      }
    }
  }

  // Update plot capacity UI
  capacityText.textContent = `${occupiedCount} / ${TOTAL_CELLS} Occupied`;
  const pct = Math.round((occupiedCount / TOTAL_CELLS) * 100);
  capacityFill.style.width = `${pct}%`;

  // Count fusable pairs
  const fuses = countPossibleFuses();
  fusableTag.textContent = `${fuses} Fusable Pair${fuses === 1 ? "" : "s"}`;
  fusableTag.style.borderColor = fuses > 0 ? "rgba(247, 37, 133, 0.6)" : "rgba(0, 210, 255, 0.3)";
  fusableTag.style.color = fuses > 0 ? "#ff007f" : "#00d2ff";

  updateUI();
}

// Attach events to individual chicken DOM elements
function attachChickenEvents(el, index) {
  el.addEventListener("dragstart", (e) => {
    if (isSellMode) {
      e.preventDefault();
      return;
    }
    draggedCellIndex = index;
    el.classList.add("dragging");
    e.dataTransfer.setData("text/plain", index);
    sounds.playPop(340);
  });

  el.addEventListener("dragend", () => {
    el.classList.remove("dragging");
    clearCellHighlights();
  });

  // Click chicken: If in Sell Mode, toggle selection; otherwise pet it!
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isSellMode) {
      toggleChickenSellSelection(index);
    } else {
      petChicken(index, el);
    }
  });
}

function clearCellHighlights() {
  const cells = gridContainer.children;
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("drag-over", "fuse-candidate");
  }
}

// ============================================================================
// DRAG & DROP FUSION HANDLERS
// ============================================================================
function onDragOver(e) {
  e.preventDefault();
  const targetIndex = parseInt(this.dataset.index, 10);
  if (draggedCellIndex === null) return;

  this.classList.add("drag-over");
}

function onDragLeave() {
  this.classList.remove("drag-over");
}

function onDrop(e) {
  e.preventDefault();
  this.classList.remove("drag-over");
  if (draggedCellIndex === null) return;

  const sourceIndex = draggedCellIndex;
  const targetIndex = parseInt(this.dataset.index, 10);
  draggedCellIndex = null;

  if (sourceIndex === targetIndex) return;

  const sourceItem = state.cells[sourceIndex];
  const targetItem = state.cells[targetIndex];

  if (!sourceItem) return;

  // Case 1: Target is Empty -> Move chicken
  if (!targetItem) {
    state.cells[targetIndex] = sourceItem;
    state.cells[sourceIndex] = null;
    sounds.playPop(380);
    renderBoard();
    return;
  }

  // Case 2: Target has SAME LEVEL -> FUSION!
  if (sourceItem.level === targetItem.level) {
    executeFusion(sourceIndex, targetIndex);
    return;
  }

  // Case 3: Target has different level -> Swap positions
  state.cells[targetIndex] = sourceItem;
  state.cells[sourceIndex] = targetItem;
  sounds.playPop(320);
  renderBoard();
}

// Execute fusion between two matching cells
function executeFusion(sourceIndex, targetIndex) {
  const currentLevel = state.cells[targetIndex].level;
  const newLevel = currentLevel + 1;
  const tier = getTier(newLevel);

  const sourceCellEl = gridContainer.children[sourceIndex];
  const targetCellEl = gridContainer.children[targetIndex];

  // Optional: Physical flight animation if sourceCell exists
  if (sourceCellEl && targetCellEl) {
    const sRect = sourceCellEl.getBoundingClientRect();
    const tRect = targetCellEl.getBoundingClientRect();
    const dx = sRect.left - tRect.left;
    const dy = sRect.top - tRect.top;

    // Create a temporary ghost chicken slamming into target
    const ghost = document.createElement("div");
    ghost.className = "fusion-flying-ghost";
    ghost.style.setProperty("--fly-x", `${dx}px`);
    ghost.style.setProperty("--fly-y", `${dy}px`);
    ghost.innerHTML = `<div class="chicken-sprite-wrap">${getTier(currentLevel).renderSvg()}</div>`;
    targetCellEl.appendChild(ghost);
    setTimeout(() => ghost.remove(), 250);
  }

  // Remove source, upgrade target
  state.cells[sourceIndex] = null;
  state.cells[targetIndex] = {
    id: nextChickenId++,
    level: newLevel
  };

  state.totalFusions++;
  if (newLevel > state.maxTierDiscovered) {
    state.maxTierDiscovered = newLevel;
    showToast(`👑 UNLOCKED: ${tier.name}! (Tier ${newLevel})`, "🌟", "toast-fusion");
  }

  // Visual burst & sound FX
  targetCellEl.classList.remove("fusion-burst");
  void targetCellEl.offsetWidth; // trigger reflow
  targetCellEl.classList.add("fusion-burst");

  // Screen shake on high-impact fusions
  triggerScreenShake(newLevel);

  // Floating text indicating tier name
  spawnFusionFloatText(`+ ${tier.name}!`, targetCellEl, tier.color);

  // Particle explosion
  const rect = targetCellEl.getBoundingClientRect();
  fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, tier.color, 32, newLevel);

  sounds.playFusion(newLevel);
  renderBoard();
}

function triggerScreenShake(level = 1) {
  const board = document.getElementById("boardSection");
  if (!board) return;
  board.classList.remove("screen-shake", "screen-shake-heavy");
  void board.offsetWidth;
  if (level >= 6) {
    board.classList.add("screen-shake-heavy");
  } else {
    board.classList.add("screen-shake");
  }
  setTimeout(() => {
    board.classList.remove("screen-shake", "screen-shake-heavy");
  }, 450);
}

function spawnFusionFloatText(text, parentEl, color = "#ffd166") {
  const label = document.createElement("div");
  label.className = "fusion-floating-label";
  label.textContent = text;
  label.style.color = color;
  parentEl.appendChild(label);
  setTimeout(() => label.remove(), 1100);
}

// Petting bonus
function petChicken(index, el) {
  const item = state.cells[index];
  if (!item) return;

  el.classList.remove("petted");
  void el.offsetWidth;
  el.classList.add("petted");

  const tier = getTier(item.level);
  const bonus = Math.max(1, Math.round(tier.income * 0.25));
  state.money += bonus;
  state.totalMoneyEarned += bonus;
  state.totalPets++;

  sounds.playCluck();

  // Floating coin
  spawnFloatingText(`+$${bonus}`, el);
  updateUI();
}

function spawnFloatingText(text, parentEl) {
  const coin = document.createElement("div");
  coin.className = "floating-coin";
  coin.textContent = text;
  parentEl.appendChild(coin);

  setTimeout(() => {
    coin.remove();
  }, 900);
}

// ============================================================================
// SELL CHICKEN SYSTEM (25x Income per Second)
// ============================================================================
function handleSellButtonClick() {
  if (!isSellMode) {
    // Check if there are any chickens on the board
    const hasChickens = state.cells.some(c => c !== null);
    if (!hasChickens) {
      showToast("No chickens on the farm to sell!", "ℹ️");
      return;
    }
    // Enter sell mode
    isSellMode = true;
    selectedForSell.clear();
    gridContainer.classList.add("selling-mode");
    document.getElementById("btnSellMode").classList.add("active-sell");
    document.getElementById("sellBanner").classList.remove("hidden");
    updateSellUI();
    sounds.playPop(480);
    showToast("Sell Mode Active: Click the chickens you want to sell!", "🏷️");
  } else {
    // If in sell mode:
    if (selectedForSell.size === 0) {
      // If nothing selected, exit sell mode
      cancelSellMode();
      showToast("Exited Sell Mode (No chickens selected)", "ℹ️");
    } else {
      // Execute the sale!
      executeSellSelected();
    }
  }
}

function toggleChickenSellSelection(index) {
  const item = state.cells[index];
  if (!item) return;

  if (selectedForSell.has(index)) {
    selectedForSell.delete(index);
    sounds.playPop(300);
  } else {
    selectedForSell.add(index);
    sounds.playPop(520);
  }

  updateSellUI();
  renderBoard();
}

function updateSellUI() {
  const count = selectedForSell.size;
  let totalSellValue = 0;

  selectedForSell.forEach(idx => {
    const item = state.cells[idx];
    if (item) {
      const tier = getTier(item.level);
      totalSellValue += tier.income * 50;
    }
  });

  const sellBtnTitle = document.getElementById("sellBtnTitle");
  const sellBtnSub = document.getElementById("sellBtnSub");
  const sellSelectedCount = document.getElementById("sellSelectedCount");
  const sellEstimatedValue = document.getElementById("sellEstimatedValue");

  if (isSellMode) {
    if (count === 0) {
      sellBtnTitle.textContent = "DONE / CANCEL";
      sellBtnSub.textContent = "Click chickens to select";
    } else {
      sellBtnTitle.textContent = `CONFIRM SELL (${count})`;
      sellBtnSub.textContent = `Earn +$${formatNumber(totalSellValue)}`;
    }
    sellSelectedCount.textContent = `${count} chicken${count === 1 ? "" : "s"} selected`;
    sellEstimatedValue.textContent = `+$${formatNumber(totalSellValue)}`;
  } else {
    sellBtnTitle.textContent = "SELL CHICKENS";
    sellBtnSub.textContent = "50x Income • Click to start";
  }
}

function executeSellSelected() {
  let totalEarned = 0;
  let soldCount = 0;

  selectedForSell.forEach(idx => {
    const item = state.cells[idx];
    if (item) {
      const tier = getTier(item.level);
      const sellPrice = tier.income * 50;
      totalEarned += sellPrice;
      soldCount++;

      // Particle effect at cell
      const cellEl = gridContainer.children[idx];
      const rect = cellEl.getBoundingClientRect();
      fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, "#10b981", 16);

      state.cells[idx] = null;
    }
  });

  state.money += totalEarned;
  state.totalMoneyEarned += totalEarned;

  sounds.playPurchase();
  showToast(`Sold ${soldCount} chicken${soldCount === 1 ? "" : "s"} for +$${formatNumber(totalEarned)}! (50x income)`, "💰", "toast-refund");

  cancelSellMode();
}

function cancelSellMode() {
  isSellMode = false;
  selectedForSell.clear();
  gridContainer.classList.remove("selling-mode");
  document.getElementById("btnSellMode").classList.remove("active-sell");
  document.getElementById("sellBanner").classList.add("hidden");
  updateSellUI();
  renderBoard();
}

// ============================================================================
// SHOP & BUNDLE PURCHASES WITH AUTO-FUSION & REFUND
// ============================================================================
function attachShopEvents() {
  const buttons = [
    { id: "buy1Btn", count: 1 },
    { id: "buy5Btn", count: 5 },
    { id: "buy10Btn", count: 10 },
    { id: "buy20Btn", count: 20 }
  ];

  buttons.forEach(({ id, count }) => {
    document.getElementById(id).addEventListener("click", () => {
      buyChickenBundle(count);
    });
  });
}

function buyChickenBundle(count) {
  const cost = getBundlePrice(count);

  if (state.money < cost) {
    showToast("Not enough coins!", "❌");
    return;
  }

  // Deduct purchase price upfront
  state.money -= cost;
  state.chickenPurchasedCount += count;
  sounds.playPurchase();

  deliverChickenBundle(count);
  renderBoard();
}

/**
 * Deliver chickens to the board:
 * - Fill empty slots.
 * - If board becomes full, auto-fuse matching pairs to free up slots!
 * - If board is full and no fuses remain, refund remaining chickens at:
 *   Remaining Count * Current Single Price.
 */
function deliverChickenBundle(count) {
  let delivered = 0;
  let remaining = count;
  let autoFusionsDone = 0;

  while (remaining > 0) {
    // 1. Find an empty slot
    const emptyIndex = state.cells.findIndex((c) => c === null);

    if (emptyIndex !== -1) {
      // Place chicken (Level 1)
      state.cells[emptyIndex] = {
        id: nextChickenId++,
        level: 1
      };
      state.totalChickensSpawned++;
      delivered++;
      remaining--;
    } else {
      // 2. Board is FULL -> Look for an auto-fuse pair!
      const fusePair = findFirstFusablePair();

      if (fusePair) {
        // Perform auto-fusion to free 1 cell
        executeFusion(fusePair.index1, fusePair.index2);
        autoFusionsDone++;
        // Continue loop to place the remaining chicken in the newly freed slot
      } else {
        // 3. DEADLOCK: Board is 100% full AND no possible fuses exist!
        // User requirement: Refund the rest of the chickens (remaining * current single price)
        const currentSinglePrice = getSingleChickenPrice();
        const refundTotal = remaining * currentSinglePrice;

        state.money += refundTotal;
        sounds.playRefund();

        showToast(
          `Board Full & No Fuses! Refunded ${remaining} chicken${remaining > 1 ? "s" : ""} for $${formatNumber(refundTotal)}!`,
          "💰",
          "toast-refund"
        );
        break;
      }
    }
  }

  if (autoFusionsDone > 0) {
    showToast(`Delivered bundle & triggered ${autoFusionsDone} Auto-Fusions!`, "⚡");
  }
}

// Find first pair of cells with identical level
function findFirstFusablePair() {
  const levelMap = new Map(); // level -> index

  for (let i = 0; i < TOTAL_CELLS; i++) {
    const item = state.cells[i];
    if (item) {
      if (levelMap.has(item.level)) {
        return {
          index1: levelMap.get(item.level),
          index2: i,
          level: item.level
        };
      } else {
        levelMap.set(item.level, i);
      }
    }
  }
  return null;
}

// Count how many matching pairs can be merged right now
function countPossibleFuses() {
  const counts = {};
  for (let i = 0; i < TOTAL_CELLS; i++) {
    const item = state.cells[i];
    if (item) {
      counts[item.level] = (counts[item.level] || 0) + 1;
    }
  }
  let totalPairs = 0;
  for (const lvl in counts) {
    totalPairs += Math.floor(counts[lvl] / 2);
  }
  return totalPairs;
}

// ============================================================================
// "FUSE ALL" ACTION BUTTON
// ============================================================================
function fuseAllChickens() {
  let pair = findFirstFusablePair();
  let count = 0;

  if (!pair) {
    showToast("No matching chicken pairs to fuse right now!", "ℹ️");
    return;
  }

  // Cascade fuses iteratively
  while (pair) {
    executeFusion(pair.index1, pair.index2);
    count++;
    pair = findFirstFusablePair();
  }

  showToast(`Mega Fuse! Combined ${count} pairs across the farm!`, "💥", "toast-fusion");
  renderBoard();
}

// ============================================================================
// GAME LOOP & PASSIVE INCOME
// ============================================================================
let lastTickTime = performance.now();

function gameLoop(currentTime) {
  const deltaMs = currentTime - lastTickTime;

  if (deltaMs >= 1000) {
    const seconds = deltaMs / 1000;
    const income = calculateIncomePerSecond() * seconds;

    if (income > 0) {
      state.money += income;
      state.totalMoneyEarned += income;
      updateUI();
    }

    lastTickTime = currentTime;
  }

  requestAnimationFrame(gameLoop);
}

// Update Top HUD and Button Labels
function updateUI() {
  moneyDisplay.textContent = `$${formatNumber(state.money)}`;
  const currentIncome = calculateIncomePerSecond();
  incomeDisplay.textContent = `+$${formatNumber(currentIncome)}/s`;
  maxTierDisplay.textContent = `Lvl ${state.maxTierDiscovered}`;

  // Update shop prices
  const p1 = getBundlePrice(1);
  const p5 = getBundlePrice(5);
  const p10 = getBundlePrice(10);
  const p20 = getBundlePrice(20);

  document.getElementById("price1Display").textContent = `$${formatNumber(p1)}`;
  document.getElementById("price5Display").textContent = `$${formatNumber(p5)}`;
  document.getElementById("price10Display").textContent = `$${formatNumber(p10)}`;
  document.getElementById("price20Display").textContent = `$${formatNumber(p20)}`;

  document.getElementById("buy1Btn").disabled = state.money < p1;
  document.getElementById("buy5Btn").disabled = state.money < p5;
  document.getElementById("buy10Btn").disabled = state.money < p10;
  document.getElementById("buy20Btn").disabled = state.money < p20;
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================
function showToast(message, icon = "🐔", extraClass = "") {
  const toast = document.createElement("div");
  toast.className = `toast ${extraClass}`;
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${message}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ============================================================================
// MODALS (CODEX, STATS, OFFLINE PROGRESS)
// ============================================================================
function attachModalEvents() {
  // Save Code
  document.getElementById("btnSaveCode").addEventListener("click", () => toggleSaveCodeModal(true));
  document.getElementById("closeSaveCodeBtn").addEventListener("click", () => toggleSaveCodeModal(false));
  document.getElementById("btnGenerateSaveCode").addEventListener("click", copySaveCodeToClipboard);
  document.getElementById("btnImportSaveCode").addEventListener("click", importSaveCodeFromTextarea);

  // Codex
  document.getElementById("btnCodex").addEventListener("click", () => toggleCodexModal(true));
  document.getElementById("closeCodexBtn").addEventListener("click", () => toggleCodexModal(false));

  // Stats
  document.getElementById("btnStats").addEventListener("click", () => toggleStatsModal(true));
  document.getElementById("closeStatsBtn").addEventListener("click", () => toggleStatsModal(false));

  // Reset
  document.getElementById("btnHardReset").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all chicken progress?")) {
      localStorage.removeItem(SAVE_KEY);
      location.reload();
    }
  });

  // Offline Collect
  document.getElementById("btnClaimOffline").addEventListener("click", () => {
    document.getElementById("offlineModal").classList.add("hidden");
    sounds.playPurchase();
  });
}

function toggleSaveCodeModal(open) {
  const modal = document.getElementById("saveCodeModal");
  const textarea = document.getElementById("saveCodeTextarea");
  if (open) {
    textarea.value = generateSaveCode();
    modal.classList.remove("hidden");
    textarea.select();
  } else {
    modal.classList.add("hidden");
  }
}

// Generate an obfuscated Base64 save code with checksum
function generateSaveCode() {
  saveGame();
  const saveData = {
    money: state.money,
    chickenPurchasedCount: state.chickenPurchasedCount,
    cells: state.cells,
    maxTierDiscovered: state.maxTierDiscovered,
    totalFusions: state.totalFusions,
    totalChickensSpawned: state.totalChickensSpawned,
    totalMoneyEarned: state.totalMoneyEarned,
    totalPets: state.totalPets,
    soundEnabled: state.soundEnabled,
    ts: Date.now()
  };
  const jsonStr = JSON.stringify(saveData);
  const encoded = btoa(encodeURIComponent(jsonStr));
  return `CHICKEN_${encoded}`;
}

function copySaveCodeToClipboard() {
  const textarea = document.getElementById("saveCodeTextarea");
  const code = textarea.value.trim() || generateSaveCode();
  textarea.value = code;

  navigator.clipboard.writeText(code).then(() => {
    showToast("Save code copied to clipboard!", "📋");
  }).catch(() => {
    textarea.select();
    document.execCommand("copy");
    showToast("Save code copied!", "📋");
  });
  sounds.playPurchase();
}

function importSaveCodeFromTextarea() {
  const textarea = document.getElementById("saveCodeTextarea");
  const rawCode = textarea.value.trim();

  if (!rawCode) {
    showToast("Please paste a save code first!", "⚠️");
    return;
  }

  try {
    let base64Part = rawCode;
    if (rawCode.startsWith("CHICKEN_")) {
      base64Part = rawCode.substring("CHICKEN_".length);
    }
    const jsonStr = decodeURIComponent(atob(base64Part));
    const data = JSON.parse(jsonStr);

    if (typeof data.money !== "number" || !Array.isArray(data.cells)) {
      throw new Error("Invalid save structure");
    }

    state.money = Math.max(0, data.money);
    state.chickenPurchasedCount = data.chickenPurchasedCount || 0;
    state.cells = data.cells;
    state.maxTierDiscovered = Math.max(1, data.maxTierDiscovered || 1);
    state.totalFusions = data.totalFusions || 0;
    state.totalChickensSpawned = data.totalChickensSpawned || 0;
    state.totalMoneyEarned = data.totalMoneyEarned || data.money;
    state.totalPets = data.totalPets || 0;
    state.soundEnabled = data.soundEnabled !== undefined ? data.soundEnabled : true;

    saveGame();
    renderBoard();
    toggleSaveCodeModal(false);
    sounds.playFusion(state.maxTierDiscovered);
    showToast("Save code restored successfully!", "🎉", "toast-fusion");
  } catch (err) {
    console.error("Save code import failed:", err);
    showToast("Invalid save code! Please check and try again.", "❌");
    sounds.playRefund();
  }
}

function toggleCodexModal(open) {
  const modal = document.getElementById("codexModal");
  if (open) {
    renderCodex();
    modal.classList.remove("hidden");
  } else {
    modal.classList.add("hidden");
  }
}

function renderCodex() {
  const grid = document.getElementById("codexGrid");
  grid.innerHTML = "";

  CHICKEN_TIERS.forEach((rawTier) => {
    const tier = getTier(rawTier.level);
    const isUnlocked = tier.level <= state.maxTierDiscovered;
    const item = document.createElement("div");
    item.className = `codex-item ${isUnlocked ? "" : "locked"}`;

    item.innerHTML = `
      <div class="codex-sprite">
        ${isUnlocked ? tier.renderSvg() : "❓"}
      </div>
      <div class="codex-title">${isUnlocked ? tier.name : "Locked Tier " + tier.level}</div>
      <div class="codex-rate">${isUnlocked ? "+$" + formatNumber(tier.income) + "/s" : "Fuse to unlock"}</div>
    `;
    grid.appendChild(item);
  });
}

function toggleStatsModal(open) {
  const modal = document.getElementById("statsModal");
  if (open) {
    const list = document.getElementById("statsList");
    list.innerHTML = `
      <div class="stat-row"><span>Total Money Earned</span><span>$${formatNumber(state.totalMoneyEarned)}</span></div>
      <div class="stat-row"><span>Current Income Rate</span><span>+$${formatNumber(calculateIncomePerSecond())}/sec</span></div>
      <div class="stat-row"><span>Chickens Spawned</span><span>${state.totalChickensSpawned}</span></div>
      <div class="stat-row"><span>Total Fusions Executed</span><span>${state.totalFusions}</span></div>
      <div class="stat-row"><span>Highest Tier Unlocked</span><span>${getTier(state.maxTierDiscovered).name} (Lvl ${state.maxTierDiscovered})</span></div>
      <div class="stat-row"><span>Total Chicken Pets</span><span>${state.totalPets}</span></div>
      <div class="stat-row"><span>Single Chicken Price</span><span>$${formatNumber(getSingleChickenPrice())}</span></div>
    `;
    modal.classList.remove("hidden");
  } else {
    modal.classList.add("hidden");
  }
}

// ============================================================================
// AUTOSAVE & OFFLINE EARNINGS
// ============================================================================
function saveGame() {
  state.lastSaveTime = Date.now();
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state:", e);
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      state.money = data.money ?? 50;
      state.chickenPurchasedCount = data.chickenPurchasedCount ?? 0;
      state.cells = data.cells ?? new Array(TOTAL_CELLS).fill(null);
      state.maxTierDiscovered = data.maxTierDiscovered ?? 1;
      state.totalFusions = data.totalFusions ?? 0;
      state.totalChickensSpawned = data.totalChickensSpawned ?? 0;
      state.totalMoneyEarned = data.totalMoneyEarned ?? 0;
      state.totalPets = data.totalPets ?? 0;
      state.soundEnabled = data.soundEnabled ?? true;

      // Check offline earnings
      if (data.lastSaveTime) {
        const secondsAway = Math.min(
          86400 * 2, // 48 hr cap
          Math.max(0, (Date.now() - data.lastSaveTime) / 1000)
        );
        const rate = calculateIncomePerSecond();
        const offlineGains = Math.floor(rate * secondsAway);

        if (offlineGains > 10) {
          state.money += offlineGains;
          state.totalMoneyEarned += offlineGains;
          document.getElementById("offlineEarnedText").textContent = `+$${formatNumber(offlineGains)}`;
          document.getElementById("offlineModal").classList.remove("hidden");
        }
      }
    } else {
      // First time game initialization: Give 2 free Level 1 Dirt Chickens to start fusing!
      state.cells[39] = { id: nextChickenId++, level: 1 };
      state.cells[41] = { id: nextChickenId++, level: 1 };
    }
  } catch (e) {
    console.error("Error loading save:", e);
  }
}

// Save every 8 seconds & on beforeunload
setInterval(saveGame, 8000);
window.addEventListener("beforeunload", saveGame);

// ============================================================================
// INITIALIZATION
// ============================================================================
window.addEventListener("DOMContentLoaded", () => {
  initDom();
  loadGame();
  renderBoard();
  requestAnimationFrame(gameLoop);
});
