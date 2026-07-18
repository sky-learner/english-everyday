/* ============ ตัวช่วยทั่วไป ============ */
var Util = (function () {

  function esc(text) {
    var div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
  }

  function escAttr(text) {
    return String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;');
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* หยิบโจทย์ n ข้อ เน้นระดับของผู้เล่นเป็นหลัก ปนง่ายกว่าและยากกว่าเล็กน้อย */
  function pickByLevel(items, n, playerLevel, weightFn) {
    var maxLevel = Math.min(3, playerLevel + 1);
    var pool = items.filter(function (it) { return it.level <= maxLevel; });
    var picked = [];

    while (picked.length < n && pool.length) {
      var weights = pool.map(function (it) {
        var w;
        if (it.level === playerLevel) w = 6;
        else if (it.level === playerLevel - 1) w = 3;
        else if (it.level === playerLevel + 1) w = 2;
        else w = 1;
        if (weightFn) w *= weightFn(it);
        return w;
      });
      var total = 0;
      for (var i = 0; i < weights.length; i++) total += weights[i];
      var r = Math.random() * total;
      var idx = 0;
      while (idx < weights.length - 1 && r > weights[idx]) { r -= weights[idx]; idx++; }
      picked.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return shuffle(picked);
  }

  return { esc: esc, escAttr: escAttr, shuffle: shuffle, pickByLevel: pickByLevel };
})();

/* ============ ตัวควบคุมหลักของเกม ============ */
var App = (function () {

  var PLAYER_LEVELS = {
    1: { icon: '🌱', name: 'Beginner (เริ่มต้น)', short: 'เริ่มต้น', desc: 'ศัพท์พื้นฐาน ประโยคสั้น เสียงอ่านช้า — ปูพื้นให้แน่น' },
    2: { icon: '🌿', name: 'Intermediate (กลาง)', short: 'กลาง', desc: 'ประโยคยาวขึ้น แกรมมาร์หลากหลาย เสียงอ่านเกือบปกติ' },
    3: { icon: '🌳', name: 'Advanced (ก้าวหน้า)', short: 'ก้าวหน้า', desc: 'สำนวนจริง ประโยคซับซ้อน เสียงอ่านความเร็วธรรมชาติ' }
  };

  var ACHIEVEMENTS = [
    { id: 'first_steps',    icon: '🐣', name: 'ก้าวแรก',                desc: 'ตอบถูกข้อแรกของคุณ' },
    { id: 'placement_done', icon: '🎯', name: 'รู้จักตัวเอง',           desc: 'ทำแบบทดสอบวัดระดับสำเร็จ' },
    { id: 'conv_first',     icon: '☕', name: 'เปิดบทสนทนา',            desc: 'จบสถานการณ์แรก' },
    { id: 'conv_all',       icon: '🌟', name: 'นักพูดตัวจริง',          desc: 'จบครบทั้ง ' + 10 + ' สถานการณ์' },
    { id: 'vocab_50',       icon: '🧠', name: 'คลังศัพท์กำลังโต',       desc: 'ตอบคำศัพท์ถูก 50 ครั้ง' },
    { id: 'vocab_100',      icon: '📚', name: 'พจนานุกรมเดินได้',       desc: 'ตอบคำศัพท์ถูก 100 ครั้ง' },
    { id: 'fill_50',        icon: '✏️', name: 'เซียนแกรมมาร์',          desc: 'เติมคำถูก 50 ข้อ' },
    { id: 'listen_50',      icon: '🎧', name: 'หูทอง',                  desc: 'ฟัง-พิมพ์ถูก 50 ประโยค' },
    { id: 'daily_first',    icon: '🔥', name: 'วันแรกก็ทำได้',          desc: 'ทำภารกิจรายวันสำเร็จครั้งแรก' },
    { id: 'daily_7',        icon: '🏆', name: 'เจ็ดวันแห่งความมุ่งมั่น', desc: 'ทำภารกิจรายวันสำเร็จครบ 7 วัน' },
    { id: 'level_5',        icon: '⭐', name: 'ครึ่งทางสู่ความเก่ง',    desc: 'ไปถึงเลเวล 5' },
    { id: 'level_10',       icon: '👑', name: 'ตำนานนักเรียนภาษา',      desc: 'ไปถึงเลเวล 10' }
  ];

  function init() {
    var s = Store.state();
    if (!s.placementDone) {
      Placement.start();
    } else {
      showHome();
    }
  }

  function showScreen(html) {
    document.getElementById('screen').innerHTML = html;
    window.scrollTo(0, 0);
  }

  function updateTopbar() {
    var info = Store.levelInfo();
    document.getElementById('topbar').classList.remove('hidden');
    document.getElementById('level-chip').textContent = 'Lv.' + info.level + ' ' + Store.levelTitle(info.level);
    document.getElementById('xp-fill').style.width = info.pct + '%';
    document.getElementById('xp-text').textContent = info.intoLevel + '/' + info.needed + ' XP';
  }

  /* ---------- หน้าหลัก ---------- */
  function greeting() {
    var h = new Date().getHours();
    if (h < 12) return 'Good morning! ☀️';
    if (h < 17) return 'Good afternoon! 🌤️';
    return 'Good evening! 🌙';
  }

  function showHome() {
    updateTopbar();
    var s = Store.state();
    var lv = PLAYER_LEVELS[s.playerLevel || 1];

    var html =
      '<div class="hero">' +
        '<h1>' + greeting() + '</h1>' +
        '<p>ฝึกภาษาอังกฤษวันละนิด เก่งขึ้นทุกวันแน่นอน</p>' +
        '<span class="player-level-badge">' + lv.icon + ' ระดับ: ' + lv.name + '</span>' +
      '</div>' +
      Daily.renderCard() +
      '<div class="section-label">เลือกโหมดฝึก</div>' +
      '<div class="mode-grid">' +
        modeCard('ConversationMode.renderList()', '🗣️', 'บทสนทนาสถานการณ์จริง', 'สั่งกาแฟ ถามทาง เช็คอินโรงแรม ฯลฯ') +
        modeCard('FlashcardsMode.renderHome()', '🧠', 'คำศัพท์ประจำวัน', 'แฟลชการ์ด + ควิซ ทบทวนคำที่พลาดบ่อย') +
        modeCard('FillBlankMode.start()', '✏️', 'เติมคำในประโยค', 'แกรมมาร์ที่คนไทยพลาดบ่อย พร้อมเฉลยไทย') +
        modeCard('ListeningMode.start()', '🎧', 'ฟัง-พิมพ์ตามเสียง', 'ฝึกหูกับเสียงเจ้าของภาษา ปรับช้าได้') +
      '</div>' +
      '<div class="btn-row">' +
        '<button class="btn btn-ghost btn-block" onclick="App.showProfile()">👤 โปรไฟล์ · สถิติ · ความสำเร็จ</button>' +
      '</div>';

    showScreen(html);
  }

  function modeCard(fn, icon, name, desc) {
    return '<button class="mode-card" onclick="' + fn + '">' +
      '<span class="mode-icon">' + icon + '</span>' +
      '<span class="mode-name">' + name + '</span>' +
      '<div class="mode-desc">' + desc + '</div>' +
    '</button>';
  }

  /* ---------- XP / toast ---------- */
  function gainXP(amount) {
    var res = Store.addXP(amount);
    toast('+' + amount + ' XP', 'xp');
    updateTopbar();
    if (res.leveledUp) {
      toast('🎉 เลเวลอัป! Lv.' + res.newLevel + ' ' + Store.levelTitle(res.newLevel), 'achievement');
      if (res.newLevel >= 5) unlockAchievement('level_5');
      if (res.newLevel >= 10) unlockAchievement('level_10');
    }
  }

  function toast(msg, cls) {
    var area = document.getElementById('toast-area');
    var el = document.createElement('div');
    el.className = 'toast' + (cls ? ' ' + cls : '');
    el.textContent = msg;
    area.appendChild(el);
    setTimeout(function () { el.classList.add('fade-out'); }, 1800);
    setTimeout(function () { el.remove(); }, 2400);
  }

  /* ---------- สถิติ / achievements ---------- */
  function recordAnswer(correct) {
    var s = Store.state();
    s.stats.totalAnswered++;
    if (correct) {
      s.stats.totalCorrect++;
      unlockAchievement('first_steps');
    }
    Store.save();
  }

  function unlockAchievement(id) {
    var s = Store.state();
    if (s.achievements[id]) return;
    var def = null;
    for (var i = 0; i < ACHIEVEMENTS.length; i++) if (ACHIEVEMENTS[i].id === id) def = ACHIEVEMENTS[i];
    if (!def) return;
    s.achievements[id] = Store.todayStr();
    Store.save();
    toast('🏅 ปลดล็อก: ' + def.name, 'achievement');
  }

  function checkStatAchievements() {
    var st = Store.state().stats;
    if (st.vocabCorrect >= 50) unlockAchievement('vocab_50');
    if (st.vocabCorrect >= 100) unlockAchievement('vocab_100');
    if (st.fillCorrect >= 50) unlockAchievement('fill_50');
    if (st.listenCorrect >= 50) unlockAchievement('listen_50');
  }

  function reportDaily(type, amount) {
    Daily.report(type, amount);
  }

  /* ---------- สรุปผลรอบเกม (ใช้ร่วมกันหลายโหมด) ---------- */
  function roundResult(opts) {
    var pctScore = opts.correct / opts.total;
    var stars = pctScore >= 0.9 ? '⭐⭐⭐' : pctScore >= 0.6 ? '⭐⭐' : pctScore >= 0.3 ? '⭐' : '💪';
    var msg = pctScore >= 0.9 ? 'ยอดเยี่ยมมาก!' : pctScore >= 0.6 ? 'ทำได้ดีเลย!' : 'ฝึกต่ออีกนิด เดี๋ยวก็เก่ง!';

    return '<div class="card"><div class="round-result">' +
      '<div class="stars">' + stars + '</div>' +
      '<div class="score-big">' + opts.correct + '/' + opts.total + '</div>' +
      '<div class="score-sub">' + msg + '</div>' +
    '</div>' +
    levelUpSuggestion(opts.perfect) +
    '<div class="btn-row">' +
      '<button class="btn btn-primary" style="flex:1" onclick="' + opts.retryFn + '">' + opts.retryLabel + '</button>' +
      '<button class="btn btn-plain" onclick="' + opts.backFn + '">กลับ</button>' +
    '</div></div>';
  }

  /* ชวนขยับระดับเมื่อเล่นได้เพอร์เฟกต์ */
  function levelUpSuggestion(perfect) {
    var s = Store.state();
    if (!perfect || (s.playerLevel || 1) >= 3) return '';
    var next = PLAYER_LEVELS[s.playerLevel + 1];
    return '<div class="feedback good" style="text-align:center">เพอร์เฟกต์! รอบนี้ง่ายไปไหม? ' +
      '<div class="btn-row" style="justify-content:center">' +
      '<button class="btn btn-ghost btn-small" onclick="App.bumpLevel()">ขยับไประดับ ' + next.icon + ' ' + next.short + '</button>' +
      '</div></div>';
  }

  function bumpLevel() {
    var s = Store.state();
    if (s.playerLevel < 3) {
      s.playerLevel++;
      Store.save();
      toast('📈 ขยับเป็นระดับ ' + PLAYER_LEVELS[s.playerLevel].name + ' แล้ว!', 'achievement');
      showHome();
    }
  }

  function setLevel(lv) {
    var s = Store.state();
    s.playerLevel = lv;
    Store.save();
    toast('ตั้งระดับเป็น ' + PLAYER_LEVELS[lv].name, 'achievement');
    showProfile();
  }

  /* ---------- โปรไฟล์ ---------- */
  function showProfile() {
    var s = Store.state();
    var info = Store.levelInfo();
    var wordsLearned = Object.keys(s.stats.wordStats).filter(function (w) { return s.stats.wordStats[w].r > 0; }).length;
    var accuracy = s.stats.totalAnswered ? Math.round(s.stats.totalCorrect / s.stats.totalAnswered * 100) : 0;
    var lv = PLAYER_LEVELS[s.playerLevel || 1];

    var html = '<h1 class="page-title">👤 โปรไฟล์ของคุณ</h1>' +
      '<p class="page-sub">Lv.' + info.level + ' ' + Store.levelTitle(info.level) + ' · ระดับเนื้อหา: ' + lv.icon + ' ' + lv.short + '</p>' +

      '<div class="card"><div class="section-label" style="margin-top:0">สถิติรวม</div>' +
      '<div class="stat-grid">' +
        statBox(s.xp, 'XP สะสม') +
        statBox(accuracy + '%', 'ความแม่นยำ') +
        statBox(s.daily.completedDates.length, 'วันที่ทำภารกิจครบ') +
        statBox(wordsLearned, 'ศัพท์ที่ตอบถูกแล้ว') +
        statBox(Object.keys(s.stats.convCompleted).length + '/' + DATA_CONVERSATIONS.length, 'บทสนทนาที่จบ') +
        statBox(s.stats.listenCorrect, 'ประโยคที่ฟังถูก') +
      '</div></div>';

    if (s.placementScores) {
      html += '<div class="card"><div class="section-label" style="margin-top:0">ผลวัดระดับล่าสุด</div>' +
        skillRow('🧠 คำศัพท์', s.placementScores.vocab) +
        skillRow('✏️ แกรมมาร์', s.placementScores.grammar) +
        skillRow('🎧 การฟัง', s.placementScores.listening) +
        '<div class="btn-row"><button class="btn btn-ghost btn-small" onclick="Placement.start()">🎯 ทำแบบทดสอบวัดระดับใหม่</button></div>' +
      '</div>';
    }

    html += '<div class="card"><div class="section-label" style="margin-top:0">ระดับความยากของเนื้อหา</div>' +
      '<div class="level-select-row">';
    [1, 2, 3].forEach(function (l) {
      var p = PLAYER_LEVELS[l];
      html += '<button class="level-option' + ((s.playerLevel || 1) === l ? ' active' : '') + '" onclick="App.setLevel(' + l + ')">' +
        '<div class="lv-icon">' + p.icon + '</div>' +
        '<div class="lv-name">' + p.short + '</div>' +
        '<div class="lv-desc">' + p.desc + '</div>' +
      '</button>';
    });
    html += '</div></div>';

    html += '<div class="card"><div class="section-label" style="margin-top:0">🏅 ความสำเร็จ (' +
      Object.keys(s.achievements).length + '/' + ACHIEVEMENTS.length + ')</div>' +
      '<div class="ach-grid">';
    ACHIEVEMENTS.forEach(function (a) {
      var unlocked = !!s.achievements[a.id];
      html += '<div class="ach-item' + (unlocked ? ' unlocked' : '') + '">' +
        '<div class="ach-icon">' + a.icon + '</div>' +
        '<div class="ach-name">' + a.name + '</div>' +
        '<div class="ach-desc">' + a.desc + '</div>' +
      '</div>';
    });
    html += '</div></div>';

    html += '<div class="btn-row">' +
      '<button class="btn btn-primary" style="flex:1" onclick="App.showHome()">← กลับหน้าหลัก</button>' +
      '<button class="btn btn-plain btn-small" onclick="App.confirmReset()">🗑️ ล้างข้อมูลทั้งหมด</button>' +
    '</div>';

    showScreen(html);
  }

  function statBox(num, label) {
    return '<div class="stat-box"><div class="stat-num">' + num + '</div><div class="stat-label">' + label + '</div></div>';
  }

  function skillRow(name, v) {
    return '<div class="skill-row">' +
      '<div class="skill-name">' + name + '</div>' +
      '<div class="skill-bar"><div class="skill-fill" style="width:' + v + '%"></div></div>' +
      '<div class="skill-pct">' + v + '%</div>' +
    '</div>';
  }

  function confirmReset() {
    if (confirm('ล้างความคืบหน้าทั้งหมด (XP, ความสำเร็จ, สถิติ) แล้วเริ่มใหม่ตั้งแต่วัดระดับ?')) {
      Store.reset();
      location.reload();
    }
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    PLAYER_LEVELS: PLAYER_LEVELS,
    ACHIEVEMENTS: ACHIEVEMENTS,
    showScreen: showScreen,
    showHome: showHome,
    showProfile: showProfile,
    updateTopbar: updateTopbar,
    gainXP: gainXP,
    toast: toast,
    recordAnswer: recordAnswer,
    unlockAchievement: unlockAchievement,
    checkStatAchievements: checkStatAchievements,
    reportDaily: reportDaily,
    roundResult: roundResult,
    levelUpSuggestion: levelUpSuggestion,
    bumpLevel: bumpLevel,
    setLevel: setLevel,
    confirmReset: confirmReset
  };
})();
