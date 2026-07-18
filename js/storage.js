/* ============ ระบบบันทึกความคืบหน้า (localStorage) ============ */
var Store = (function () {
  var KEY = 'english_everyday_save_v1';

  var defaults = {
    xp: 0,
    playerLevel: 0,          // 0 = ยังไม่วัดระดับ, 1-3 = ระดับความยาก
    placementDone: false,
    placementScores: null,   // {vocab: %, grammar: %, listening: %}
    achievements: {},        // id -> วันที่ปลดล็อก
    daily: {
      date: '',              // YYYY-MM-DD ของภารกิจชุดปัจจุบัน
      progress: {},          // taskId -> จำนวนที่ทำแล้ว
      bonusGiven: false,
      completedDates: []     // วันที่ทำ daily สำเร็จทั้งหมด
    },
    stats: {
      convCompleted: {},     // scenarioId -> true
      vocabCorrect: 0,
      fillCorrect: 0,
      listenCorrect: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      bestStreakInRound: 0,
      wordStats: {}          // คำศัพท์ -> {r: ตอบถูก, w: ตอบผิด}
    }
  };

  var state = load();

  function deepMerge(base, extra) {
    var out = JSON.parse(JSON.stringify(base));
    if (!extra || typeof extra !== 'object') return out;
    Object.keys(extra).forEach(function (k) {
      if (out[k] && typeof out[k] === 'object' && !Array.isArray(out[k]) &&
          extra[k] && typeof extra[k] === 'object' && !Array.isArray(extra[k])) {
        out[k] = deepMerge(out[k], extra[k]);
      } else {
        out[k] = extra[k];
      }
    });
    return out;
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(defaults));
      return deepMerge(defaults, JSON.parse(raw));
    } catch (e) {
      return JSON.parse(JSON.stringify(defaults));
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* พื้นที่เต็ม/โหมดส่วนตัว — เล่นต่อได้แต่ไม่บันทึก */ }
  }

  function todayStr() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  /* ---- XP / เลเวล ---- */
  // เลเวล n ต้องการ XP สะสม: 0, 100, 250, 450, 700, 1000, ... (+50 เพิ่มทีละขั้น)
  function xpNeededFor(level) {
    var total = 0;
    for (var i = 1; i < level; i++) total += 100 + (i - 1) * 50;
    return total;
  }

  function levelInfo() {
    var lv = 1;
    while (state.xp >= xpNeededFor(lv + 1)) lv++;
    var cur = xpNeededFor(lv);
    var next = xpNeededFor(lv + 1);
    return {
      level: lv,
      xp: state.xp,
      intoLevel: state.xp - cur,
      needed: next - cur,
      pct: Math.min(100, Math.round((state.xp - cur) / (next - cur) * 100))
    };
  }

  var LEVEL_TITLES = [
    'Newbie', 'Tourist', 'Traveler', 'Explorer', 'Local',
    'Insider', 'Storyteller', 'Fluent', 'Pro', 'Native-like'
  ];
  function levelTitle(lv) {
    return LEVEL_TITLES[Math.min(lv - 1, LEVEL_TITLES.length - 1)];
  }

  function addXP(amount) {
    var before = levelInfo().level;
    state.xp += amount;
    save();
    var after = levelInfo().level;
    return { gained: amount, leveledUp: after > before, newLevel: after };
  }

  /* ---- สถิติคำศัพท์ (สำหรับทบทวนคำที่ผิดบ่อย) ---- */
  function recordWord(word, correct) {
    var ws = state.stats.wordStats;
    if (!ws[word]) ws[word] = { r: 0, w: 0 };
    if (correct) ws[word].r++; else ws[word].w++;
    save();
  }

  function reset() {
    state = JSON.parse(JSON.stringify(defaults));
    save();
  }

  return {
    state: function () { return state; },
    save: save,
    todayStr: todayStr,
    levelInfo: levelInfo,
    levelTitle: levelTitle,
    addXP: addXP,
    recordWord: recordWord,
    reset: reset
  };
})();
