// ═══════════════════════════════════════════════════════════
//  ZOMBIE ENGLISH SURVIVAL — script.js (5 Levels / Flat 80 EXP)
// ═══════════════════════════════════════════════════════════

// ── SOUND ENGINE (Web Audio API — no external files) ────────
const SFX = (() => {
    let ctx = null;

    function getCtx() {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        return ctx;
    }

    function play(fn) {
        try { fn(getCtx()); } catch(e) {}
    }

    function correct() {
        play(ctx => {
            const t = ctx.currentTime;
            [523.25, 659.25, 783.99].forEach((freq, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.type = 'sine';
                o.frequency.setValueAtTime(freq, t + i * 0.08);
                g.gain.setValueAtTime(0, t + i * 0.08);
                g.gain.linearRampToValueAtTime(0.18, t + i * 0.08 + 0.02);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.25);
                o.start(t + i * 0.08);
                o.stop(t + i * 0.08 + 0.3);
            });
        });
    }

    function wrong() {
        play(ctx => {
            const t = ctx.currentTime;
            [110, 116.54].forEach(freq => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.type = 'sawtooth';
                o.frequency.setValueAtTime(freq, t);
                g.gain.setValueAtTime(0.15, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
                o.start(t); o.stop(t + 0.5);
            });
        });
    }

    function hit() {
        play(ctx => {
            const t = ctx.currentTime;
            const bufSize = ctx.sampleRate * 0.12;
            const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);
            const src = ctx.createBufferSource();
            src.buffer = buf;
            const g = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, t);
            src.connect(filter); filter.connect(g); g.connect(ctx.destination);
            g.gain.setValueAtTime(0.35, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
            src.start(t); src.stop(t + 0.2);

            const o = ctx.createOscillator();
            const og = ctx.createGain();
            o.connect(og); og.connect(ctx.destination);
            o.type = 'sine';
            o.frequency.setValueAtTime(120, t);
            o.frequency.exponentialRampToValueAtTime(40, t + 0.1);
            og.gain.setValueAtTime(0.3, t);
            og.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
            o.start(t); o.stop(t + 0.2);
        });
    }

    function playerHurt() {
        play(ctx => {
            const t = ctx.currentTime;
            const bufSize = ctx.sampleRate * 0.2;
            const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);
            const src = ctx.createBufferSource();
            src.buffer = buf;
            const g = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(400, t);
            filter.Q.value = 2;
            src.connect(filter); filter.connect(g); g.connect(ctx.destination);
            g.gain.setValueAtTime(0.25, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
            src.start(t); src.stop(t + 0.25);

            const o = ctx.createOscillator();
            const og = ctx.createGain();
            o.connect(og); og.connect(ctx.destination);
            o.type = 'square';
            o.frequency.setValueAtTime(200, t);
            o.frequency.exponentialRampToValueAtTime(80, t + 0.18);
            og.gain.setValueAtTime(0.12, t);
            og.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
            o.start(t); o.stop(t + 0.22);
        });
    }

    function defeat() {
        play(ctx => {
            const t = ctx.currentTime;
            const melody = [392, 523.25, 659.25, 783.99, 1046.5];
            melody.forEach((freq, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.type = i === melody.length - 1 ? 'sine' : 'triangle';
                o.frequency.setValueAtTime(freq, t + i * 0.1);
                g.gain.setValueAtTime(0, t + i * 0.1);
                g.gain.linearRampToValueAtTime(0.2, t + i * 0.1 + 0.03);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + (i === melody.length - 1 ? 0.5 : 0.18));
                o.start(t + i * 0.1);
                o.stop(t + i * 0.1 + 0.6);
            });
        });
    }

    function levelUp() {
        play(ctx => {
            const t = ctx.currentTime;
            const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
            notes.forEach((freq, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.type = 'sine';
                o.frequency.setValueAtTime(freq, t + i * 0.07);
                g.gain.setValueAtTime(0, t + i * 0.07);
                g.gain.linearRampToValueAtTime(0.22, t + i * 0.07 + 0.02);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.35);
                o.start(t + i * 0.07);
                o.stop(t + i * 0.07 + 0.35);
            });
        });
    }

    function coin() {
        play(ctx => {
            const t = ctx.currentTime;
            [1318.5, 1760].forEach((freq, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.type = 'sine';
                o.frequency.setValueAtTime(freq, t + i * 0.06);
                g.gain.setValueAtTime(0.15, t + i * 0.06);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.2);
                o.start(t + i * 0.06);
                o.stop(t + i * 0.06 + 0.25);
            });
        });
    }

    function gameOver() {
        play(ctx => {
            const t = ctx.currentTime;
            const notes = [220, 185, 155.56, 130.81];
            notes.forEach((freq, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.type = 'sawtooth';
                o.frequency.setValueAtTime(freq, t + i * 0.22);
                g.gain.setValueAtTime(0.18, t + i * 0.22);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.22 + 0.35);
                o.start(t + i * 0.22);
                o.stop(t + i * 0.22 + 0.4);
            });
        });
    }

    function win() {
        play(ctx => {
            const t = ctx.currentTime;
            const arp = [261.63, 329.63, 392, 523.25];
            arp.forEach((freq, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.type = 'triangle';
                o.frequency.setValueAtTime(freq, t + i * 0.09);
                g.gain.setValueAtTime(0, t + i * 0.09);
                g.gain.linearRampToValueAtTime(0.18, t + i * 0.09 + 0.04);
                g.gain.setValueAtTime(0.18, t + 0.5);
                g.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
                o.start(t + i * 0.09);
                o.stop(t + 1.3);
            });
        });
    }

    function click() {
        play(ctx => {
            const t = ctx.currentTime;
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.type = 'sine';
            o.frequency.setValueAtTime(600, t);
            o.frequency.exponentialRampToValueAtTime(400, t + 0.04);
            g.gain.setValueAtTime(0.1, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
            o.start(t); o.stop(t + 0.06);
        });
    }

    return { correct, wrong, hit, playerHurt, defeat, levelUp, coin, gameOver, win, click };
})();

// ── ZOMBIE TYPES ────────────────────────────────────────────
const ZOMBIE_TYPES = [
    { name: "WALKER",  emoji: "🧟",  color: "#7CFC00", hp: 60,  reward: 25, exp: 20, dmg: 12 },
    { name: "RUNNER",  emoji: "🏃",  color: "#FF6B35", hp: 80,  reward: 40, exp: 30, dmg: 18 },
    { name: "BRUTE",   emoji: "💀",  color: "#FF3366", hp: 120, reward: 60, exp: 50, dmg: 25 },
    { name: "WITCH",   emoji: "🧙",  color: "#9B59B6", hp: 100, reward: 65, exp: 45, dmg: 22 },
    { name: "TANK",    emoji: "🦕",  color: "#E74C3C", hp: 200, reward: 100, exp: 80, dmg: 35 },
];

// ── ENGLISH QUESTIONS — TIERED BY DIFFICULTY ────────────────
const QUESTIONS = {
    easy: [
        { type: "VOCABULARY", q: "What is a synonym for 'Quick'?", a: ["Fast", "Slow", "Large", "Heavy"], correct: 0 },
        { type: "VOCABULARY", q: "Choose a synonym for 'Brave':", a: ["Cowardly", "Courageous", "Afraid", "Weak"], correct: 1 },
        { type: "VOCABULARY", q: "Which word means 'extremely tired'?", a: ["Elated", "Vigorous", "Exhausted", "Energized"], correct: 2 },
        { type: "VOCABULARY", q: "What does the word 'Gloomy' mean?", a: ["Bright and cheerful", "Dark and dreary", "Colorful", "Very calm"], correct: 1 },
        { type: "VOCABULARY", q: "Choose the antonym of 'Ancient':", a: ["Old", "Modern", "Historic", "Aged"], correct: 1 },
        { type: "VOCABULARY", q: "What does 'Huge' mean?", a: ["Very small", "Very large", "Very fast", "Very cold"], correct: 1 },
        { type: "VOCABULARY", q: "Which word means 'to look at carefully'?", a: ["Ignore", "Observe", "Forget", "Destroy"], correct: 1 },
        { type: "GRAMMAR", q: "The correct past tense of 'run' is:", a: ["Runned", "Ranned", "Run", "Ran"], correct: 3 },
        { type: "GRAMMAR", q: "Choose the correct form: 'He ___ sleeping.'", a: ["are", "is", "am", "be"], correct: 1 },
        { type: "GRAMMAR", q: "Which word is an Adjective?", a: ["Run", "Beautiful", "Eat", "Quickly"], correct: 1 },
        { type: "GRAMMAR", q: "What is the plural of 'cat'?", a: ["Cates", "Cats", "Catz", "Cat"], correct: 1 },
        { type: "GRAMMAR", q: "Choose the correct sentence:", a: ["I is happy.", "I am happy.", "I are happy.", "I be happy."], correct: 1 },
        { type: "COMPREHENSION", q: "What does the idiom 'the coast is clear' mean?", a: ["There's a beach nearby", "There is no danger", "The weather is cloudy", "Run now"], correct: 1 },
        { type: "COMPREHENSION", q: "'She opened the door and walked in.' What did she do SECOND?", a: ["Walked in", "Opened the door", "Knocked", "Ran away"], correct: 0 },
        { type: "COMPREHENSION", q: "If someone is 'exhausted', they are:", a: ["Very hungry", "Very tired", "Very happy", "Very angry"], correct: 1 },
    ],
    medium: [
        { type: "VOCABULARY", q: "What does the word 'Resilient' mean?", a: ["Bouncing back from hardship", "Easily broken", "Extremely hard", "Completely gone"], correct: 0 },
        { type: "VOCABULARY", q: "What does the word 'Cunning' mean?", a: ["Very strong", "Sly and clever", "Completely honest", "Very slow"], correct: 1 },
        { type: "VOCABULARY", q: "What does the word 'Ferocious' mean?", a: ["Gentle", "Timid", "Extremely fierce", "Peaceful"], correct: 2 },
        { type: "VOCABULARY", q: "What does the word 'Ominous' mean?", a: ["Pleasant", "Threatening / a bad omen", "Harmless", "Bright"], correct: 1 },
        { type: "VOCABULARY", q: "Which word means 'to move quickly'?", a: ["Trudge", "Saunter", "Dash", "Crawl"], correct: 2 },
        { type: "VOCABULARY", q: "What does 'Eloquent' mean?", a: ["Clumsy with words", "Well-spoken and persuasive", "Loud and rude", "Silent"], correct: 1 },
        { type: "VOCABULARY", q: "What does 'Scarce' mean?", a: ["Plentiful", "In short supply", "Frightening", "Useless"], correct: 1 },
        { type: "GRAMMAR", q: "Choose the correct sentence:", a: ["She don't like zombies.", "She doesn't likes zombies.", "She doesn't like zombies.", "She not like zombies."], correct: 2 },
        { type: "GRAMMAR", q: "Choose the correct form: 'There ___ three zombies.'", a: ["is", "are", "am", "be"], correct: 1 },
        { type: "GRAMMAR", q: "The correct plural form of 'Wolf' is:", a: ["Wolfs", "Wolfes", "Wolves", "Wolve"], correct: 2 },
        { type: "GRAMMAR", q: "Complete the sentence: 'I ___ to the store yesterday.'", a: ["Go", "Gone", "Went", "Going"], correct: 2 },
        { type: "GRAMMAR", q: "Choose the sentence that uses articles correctly:", a: ["She is a honest person.", "She is an honest person.", "She is the honest person.", "She is honest person."], correct: 1 },
        { type: "GRAMMAR", q: "Which sentence is in the Present Perfect tense?", a: ["She runs every day.", "She ran yesterday.", "She has run before.", "She will run tomorrow."], correct: 2 },
        { type: "COMPREHENSION", q: "'The survivor barricaded the door before the horde arrived.' What did the survivor do FIRST?", a: ["Fled the area", "Barricaded the door", "Fought the horde", "Called for help"], correct: 1 },
        { type: "COMPREHENSION", q: "If something is described as 'crucial', it means:", a: ["Unimportant", "Slightly useful", "Extremely important", "Dangerous"], correct: 2 },
        { type: "COMPREHENSION", q: "'Despite the chaos, she remained calm.' She was:", a: ["Panicking", "Confused", "Calm", "Angry"], correct: 2 },
        { type: "COMPREHENSION", q: "What does 'burning the midnight oil' mean?", a: ["Starting a fire at night", "Working late into the night", "Wasting energy", "Cooking dinner late"], correct: 1 },
    ],
    hard: [
        { type: "VOCABULARY", q: "What does 'Ephemeral' mean?", a: ["Lasting forever", "Lasting for only a short time", "Extremely powerful", "Deeply mysterious"], correct: 1 },
        { type: "VOCABULARY", q: "What does 'Perfidious' mean?", a: ["Loyal and trustworthy", "Deceitful and untrustworthy", "Extremely brave", "Highly intelligent"], correct: 1 },
        { type: "VOCABULARY", q: "Choose the best synonym for 'Ubiquitous':", a: ["Rare", "Present everywhere", "Invisible", "Ancient"], correct: 1 },
        { type: "VOCABULARY", q: "What does 'Laconic' mean?", a: ["Using very few words", "Speaking at great length", "Full of emotion", "Deeply philosophical"], correct: 0 },
        { type: "VOCABULARY", q: "What does 'Nefarious' mean?", a: ["Heroic", "Wicked and criminal", "Mysterious", "Extremely talented"], correct: 1 },
        { type: "VOCABULARY", q: "What does 'Sycophant' mean?", a: ["A harsh critic", "A flattering yes-man", "A brave warrior", "A wise elder"], correct: 1 },
        { type: "GRAMMAR", q: "Choose the correct conditional: 'If I ___ you, I would leave now.'", a: ["am", "was", "were", "be"], correct: 2 },
        { type: "GRAMMAR", q: "Which sentence uses the subjunctive mood correctly?", a: ["I suggest that he goes.", "I suggest that he go.", "I suggest that he gone.", "I suggest that he is going."], correct: 1 },
        { type: "GRAMMAR", q: "Identify the correct passive voice: 'The zombies ___ by the survivors.'", a: ["defeated", "were defeated", "have defeat", "are defeat"], correct: 1 },
        { type: "GRAMMAR", q: "Which sentence contains a dangling modifier?", a: ["Running fast, he escaped.", "Running fast, the exit was found.", "He ran fast to escape.", "He found the exit by running fast."], correct: 1 },
        { type: "GRAMMAR", q: "Choose the correct reported speech: She said, 'I will survive.'", a: ["She said she will survive.", "She said she would survive.", "She said she is surviving.", "She said she survived."], correct: 1 },
        { type: "COMPREHENSION", q: "'The policy was a double-edged sword.' This means the policy:", a: ["Was very sharp", "Had both benefits and drawbacks", "Was completely useless", "Was extremely dangerous"], correct: 1 },
        { type: "COMPREHENSION", q: "'He was the black sheep of the group.' This means he was:", a: ["The most dangerous member", "The most different or troublesome one", "The leader of the group", "The most talented member"], correct: 1 },
        { type: "COMPREHENSION", q: "A text that presents two sides of an argument is best described as:", a: ["Persuasive", "Narrative", "Balanced / Discursive", "Descriptive"], correct: 2 },
        { type: "COMPREHENSION", q: "'The author implies that survival depends on wit, not strength.' The word 'implies' means:", a: ["States directly", "Suggests indirectly", "Denies completely", "Proves scientifically"], correct: 1 },
    ],
};

// ── CUSTOM TARGET TIERS BASED ON LEVEL ──────────────────────
function getTierPool() {
    const lvl = state.level;
    if (lvl === 1) return QUESTIONS.easy;
    if (lvl === 2 || lvl === 3) return QUESTIONS.medium;
    return QUESTIONS.hard; 
}

function getTierLabel() {
    const lvl = state.level;
    if (lvl === 1) return '🟢 EASY';
    if (lvl === 2 || lvl === 3) return '🟡 MEDIUM';
    return '🔴 HARD';
}

// ── GAME STATE ──────────────────────────────────────────────
const EXP_PER_LEVEL  = 80;  // Flat 80 EXP per level
const BASE_MAX_HP    = 100;
const BASE_DAMAGE    = 25;
const MAX_LEVEL      = 5; 

let state = {};
let usedQuestions = new Set();
let currentTier = 'easy'; 
let currentQuestion = null;
let answerLocked = false;

function initState() {
    state = {
        level:       1,
        score:       0,
        exp:         0,
        coins:       0,
        playerHP:    BASE_MAX_HP,
        playerMaxHP: BASE_MAX_HP,
        damage:      BASE_DAMAGE,
        shield:      0,
        streak:      0,
        zombie:      null,
        zombieHP:    0,
        zombieMaxHP: 0,
    };
}

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}
function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Log entries handler
function addLog(msg) {
    const container = document.getElementById('log-entries');
    if (!container) return;
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = msg;
    container.insertBefore(entry, container.firstChild);
    while (container.children.length > 6) {
        container.removeChild(container.lastChild);
    }
}

function spawnZombie() {
    const pool = ZOMBIE_TYPES.slice(0, Math.min(state.level, ZOMBIE_TYPES.length));
    const z    = getRandom(pool);
    const scale = 1 + (state.level - 1) * 0.3;
    const hp   = Math.round(z.hp * scale);

    state.zombie      = z;
    state.zombieHP    = hp;
    state.zombieMaxHP = hp;

    document.getElementById('zombie-character').textContent = z.emoji;
    document.getElementById('zombie-name').textContent      = z.name;

    setMessage(`⚠️ ${z.name} appeared! Answer correctly to attack!`);
    addLog(`A ${z.name} crawled out of the darkness!`);
    updateUI();
}

function nextQuestion() {
    answerLocked = false;

    const pool = getTierPool();
    const newTier = state.level === 1 ? 'easy' : (state.level <= 3 ? 'medium' : 'hard');

    if (newTier !== currentTier || usedQuestions.size >= pool.length) {
        usedQuestions.clear();
        currentTier = newTier;
    }

    let idx;
    do { idx = Math.floor(Math.random() * pool.length); }
    while (usedQuestions.has(idx));
    usedQuestions.add(idx);

    currentQuestion = pool[idx];

    document.getElementById('question-type').textContent = `${getTierLabel()} · ${currentQuestion.type}`;
    document.getElementById('question').textContent      = currentQuestion.q;

    const shuffled = shuffle(
        currentQuestion.a.map((text, i) => ({ text, originalIndex: i }))
    );

    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    shuffled.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.className = 'ans-btn';
        btn.innerHTML = `<span class="letter">${letters[i]}.</span>${ans.text}`;
        btn.dataset.originalIndex = ans.originalIndex;
        btn.addEventListener('click', () => handleAnswer(btn, ans.originalIndex));
        answersDiv.appendChild(btn);
    });
}

function handleAnswer(clickedBtn, originalIndex) {
    if (answerLocked) return;
    answerLocked = true;

    const correct = originalIndex === currentQuestion.correct;

    document.querySelectorAll('.ans-btn').forEach(btn => {
        btn.disabled = true;
        if (parseInt(btn.dataset.originalIndex) === currentQuestion.correct) {
            btn.classList.add('correct');
        }
    });
    if (!correct) clickedBtn.classList.add('wrong');

    if (correct) {
        state.streak++;
        const comboBonus = state.streak >= 3 ? 1.5 : 1;
        const dmgDealt   = Math.round(state.damage * comboBonus);
        state.zombieHP   = Math.max(0, state.zombieHP - dmgDealt);
        state.score     += 10 * state.level;
        state.coins     += 5;

        const comboText = state.streak >= 3 ? ` 🔥 COMBO x${state.streak}!` : '';
        setMessage(`✅ Correct! You deal ${dmgDealt} damage!${comboText}`);
        addLog(`✅ Correct answer! Dealt ${dmgDealt} damage to ${state.zombie.name}.`);

        SFX.correct();
        animateZombie('shake');
        setTimeout(() => SFX.hit(), 80);
        updateStreak();

        if (state.zombieHP <= 0) {
            state.coins += state.zombie.reward;
            state.exp   += state.zombie.exp;
            state.score += state.zombie.reward * state.level;
            addLog(`💀 ${state.zombie.name} defeated! +${state.zombie.reward} coins, +${state.zombie.exp} EXP`);
            setMessage(`💀 ${state.zombie.name} defeated! +${state.zombie.reward} 🪙`);

            setTimeout(() => SFX.defeat(), 100);
            checkLevelUp();
            updateUI();

            if (state.level > MAX_LEVEL) {
                setTimeout(showWinScreen, 1000);
            } else {
                setTimeout(() => { spawnZombie(); nextQuestion(); state.streak = 0; updateStreak(); }, 1300);
            }
            return;
        }
    } else {
        state.streak = 0;
        updateStreak();
        const dmgTaken = Math.max(1, state.zombie.dmg - state.shield);
        state.playerHP = Math.max(0, state.playerHP - dmgTaken);

        setMessage(`❌ Wrong! ${state.zombie.name} attacks you! -${dmgTaken} HP`);
        addLog(`❌ Wrong answer! You took ${dmgTaken} damage from ${state.zombie.name}.`);

        SFX.wrong();
        setTimeout(() => SFX.playerHurt(), 120);
        animatePlayer();

        if (state.playerHP <= 0) {
            updateUI();
            setTimeout(showDeadScreen, 900);
            return;
        }
    }

    updateUI();
    setTimeout(nextQuestion, 1000);
}

function checkLevelUp() {
    const expNeeded = EXP_PER_LEVEL; // FIX: Target EXP flat 80 di semua level
    if (state.exp >= expNeeded) {
        state.exp   -= expNeeded;
        state.level += 1;
        SFX.levelUp();
        
        if (state.level <= MAX_LEVEL) {
            addLog(`⬆️ LEVEL UP! You are now Level ${state.level}!`);
            if (state.level === 2) addLog(`🟡 Difficulty increased to MEDIUM! Questions get harder.`);
            if (state.level === 4) addLog(`🔴 Difficulty increased to HARD! Brace yourself!`);
        }
    }
}

function buyUpgrade(type) {
    const costs = { damage: 50, health: 50, heal: 80, shield: 100 };
    const cost  = costs[type];
    if (!cost || state.coins < cost) {
        addLog(`🚫 Not enough coins for this upgrade!`);
        return;
    }
    state.coins -= cost;
    SFX.coin();
    if (type === 'damage') {
        state.damage += 15;
        addLog(`🔪 Weapon sharpened! +15 Attack (Total: ${state.damage})`);
    }
    if (type === 'health') {
        state.playerMaxHP += 30;
        state.playerHP    += 30;
        addLog(`💉 Max HP increased! +30 HP (Total: ${state.playerMaxHP})`);
    }
    if (type === 'heal') {
        state.playerHP = state.playerMaxHP;
        addLog(`❤️ HP fully restored! (${state.playerMaxHP}/${state.playerMaxHP})`);
    }
    if (type === 'shield') {
        state.shield += 5;
        addLog(`🛡️ Armor equipped! Reduces ${state.shield} incoming damage.`);
    }
    updateUI();
}

function updateUI() {
    const s = state;

    document.getElementById('level').textContent          = s.level;
    document.getElementById('score').textContent          = s.score;
    document.getElementById('coins').textContent          = s.coins;
    document.getElementById('exp').textContent            = s.exp;
    document.getElementById('exp-max').textContent        = EXP_PER_LEVEL; // FIX: Maksimal bar selalu 80
    document.getElementById('damage-display').textContent = s.damage;

    const expPct = clamp((s.exp / EXP_PER_LEVEL) * 100, 0, 100); // FIX: Bar kalkulasi berbasis flat 80
    document.getElementById('exp-bar').style.width = expPct + '%';

    const hpPct    = clamp((s.playerHP / s.playerMaxHP) * 100, 0, 100);
    const hpColor  = hpPct > 60 ? '#39FF14' : hpPct > 30 ? '#FFB700' : '#FF2D2D';
    const playerFill = document.getElementById('player-health');
    playerFill.style.width      = hpPct + '%';
    playerFill.style.background = hpColor;
    document.getElementById('player-hp').textContent     = Math.max(0, s.playerHP);
    document.getElementById('player-max-hp').textContent = s.playerMaxHP;

    const zHpPct = s.zombieMaxHP > 0
        ? clamp((s.zombieHP / s.zombieMaxHP) * 100, 0, 100)
        : 100;
    const zombieFill = document.getElementById('zombie-health');
    zombieFill.style.width      = zHpPct + '%';
    zombieFill.style.background = s.zombie ? s.zombie.color : '#7CFC00';
    document.getElementById('zombie-hp').textContent     = Math.max(0, s.zombieHP);
    document.getElementById('zombie-max-hp').textContent = s.zombieMaxHP;

    const costs = { damage: 50, health: 50, heal: 80, shield: 100 };
    document.querySelectorAll('.shop-btn').forEach(btn => {
        const match = btn.getAttribute('onclick').match(/'(\w+)'/);
        if (match) {
            const type = match[1];
            btn.disabled = s.coins < costs[type];
        }
    });
}

function updateStreak() {
    const badge = document.getElementById('streak-badge');
    if (!badge) return;
    if (state.streak >= 3) {
        badge.textContent = `🔥 COMBO x${state.streak}`;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function animateZombie(type) {
    const el = document.getElementById('zombie-character');
    el.classList.remove('shake', 'zombie-atk');
    void el.offsetWidth; 
    el.classList.add(type === 'shake' ? 'shake' : 'zombie-atk');
    setTimeout(() => el.classList.remove('shake', 'zombie-atk'), 500);
}

function animatePlayer() {
    const zombie  = document.getElementById('zombie-character');
    const player  = document.getElementById('player-char');

    zombie.classList.remove('zombie-atk');
    void zombie.offsetWidth;
    zombie.classList.add('zombie-atk');
    setTimeout(() => zombie.classList.remove('zombie-atk'), 600);

    if (player) {
        player.classList.remove('player-hit');
        void player.offsetWidth;
        player.classList.add('player-hit');
        setTimeout(() => player.classList.remove('player-hit'), 500);
    }
}

function setMessage(msg) {
    document.getElementById('battle-message').textContent = msg;
}

function showDeadScreen() {
    SFX.gameOver();
    document.getElementById('dead-stats').innerHTML =
        `Final Score: <strong>${state.score}</strong><br>
         Level Reached: <strong>${state.level}</strong><br>
         Coins Collected: <strong>${state.coins}</strong>`;
    showScreen('dead-screen');
}

function showWinScreen() {
    SFX.win();
    document.getElementById('win-stats').innerHTML =
        `Final Score: <strong>${state.score}</strong><br>
         Coins Collected: <strong>${state.coins}</strong><br>
         All zombies have been defeated! 🎉`;
    showScreen('win-screen');
}

function startGame() {
    initState();
    usedQuestions.clear();
    currentTier = 'easy';
    const entries = document.getElementById('log-entries');
    if (entries) entries.innerHTML = '';
    showScreen('game-screen');
    spawnZombie();
    nextQuestion();
    updateUI();
}

// ── EVENT LISTENERS ──────────────────────────────────────────
document.getElementById('start-btn').addEventListener('click', () => { SFX.click(); startGame(); });
document.getElementById('retry-btn').addEventListener('click', () => { SFX.click(); startGame(); });
document.getElementById('win-retry-btn').addEventListener('click', () => { SFX.click(); startGame(); });