/* ============ ภารกิจรายวัน (Daily Challenge) ============
   สุ่มภารกิจ 3 อย่างจากวันที่ (seed เดิมตลอดวัน) ทำครบได้โบนัส XP
*/
var Daily = (function () {

  var BONUS_XP = 80;

  var TASK_TYPES = [
    { id: 'conv',   icon: '🗣️', ns: [1, 1, 2],   label: function (n) { return 'จบบทสนทนา ' + n + ' สถานการณ์'; } },
    { id: 'vocab',  icon: '🧠', ns: [8, 10, 12], label: function (n) { return 'ตอบควิซคำศัพท์ถูก ' + n + ' ข้อ'; } },
    { id: 'fill',   icon: '✏️', ns: [5, 6, 8],   label: function (n) { return 'เติมคำในประโยคถูก ' + n + ' ข้อ'; } },
    { id: 'listen', icon: '🎧', ns: [3, 4, 5],   label: function (n) { return 'ฟัง-พิมพ์ถูก ' + n + ' ประโยค'; } }
  ];

  /* RNG แบบมี seed — วันเดียวกันได้ภารกิจชุดเดิมเสมอ */
  function seededRng(seedStr) {
    var h = 1779033703;
    for (var i = 0; i < seedStr.length; i++) {
      h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    };
  }

  /* คืนภารกิจของวันนี้ (สร้างใหม่ถ้าเพิ่งข้ามวัน) */
  function getToday() {
    var s = Store.state();
    var today = Store.todayStr();

    if (s.daily.date !== today || !s.daily.tasks) {
      var rng = seededRng(today);
      var types = TASK_TYPES.slice();
      // สลับลำดับด้วย seed แล้วหยิบ 3 ประเภทแรก
      for (var i = types.length - 1; i > 0; i--) {
        var j = Math.floor(rng() * (i + 1));
        var tmp = types[i]; types[i] = types[j]; types[j] = tmp;
      }
      s.daily.date = today;
      s.daily.bonusGiven = false;
      s.daily.progress = {};
      s.daily.tasks = types.slice(0, 3).map(function (t) {
        var n = t.ns[Math.floor(rng() * t.ns.length)];
        return { id: t.id, icon: t.icon, n: n, label: t.label(n) };
      });
      Store.save();
    }
    return s.daily;
  }

  function isTaskDone(task) {
    var d = getToday();
    return (d.progress[task.id] || 0) >= task.n;
  }

  function allDone() {
    var d = getToday();
    return d.tasks.every(isTaskDone);
  }

  /* โหมดเกมรายงานความคืบหน้าเข้ามาที่นี่ */
  function report(type, amount) {
    var d = getToday();
    var task = d.tasks.filter(function (t) { return t.id === type; })[0];
    if (!task) return;

    d.progress[type] = Math.min(task.n, (d.progress[type] || 0) + amount);
    Store.save();

    if (allDone() && !d.bonusGiven) {
      d.bonusGiven = true;
      if (d.completedDates.indexOf(d.date) === -1) d.completedDates.push(d.date);
      Store.save();
      App.gainXP(BONUS_XP);
      App.toast('🔥 ภารกิจวันนี้ครบแล้ว! โบนัส +' + BONUS_XP + ' XP', 'achievement');
      App.unlockAchievement('daily_first');
      if (d.completedDates.length >= 7) App.unlockAchievement('daily_7');
    }
  }

  /* การ์ดภารกิจวันนี้ (แสดงบนหน้าหลัก) */
  function renderCard() {
    var d = getToday();
    var html = '<div class="card daily-card">' +
      '<div class="daily-head">' +
        '<div class="daily-title">📅 ภารกิจวันนี้</div>' +
        '<div class="daily-bonus">ทำครบรับ +' + BONUS_XP + ' XP</div>' +
      '</div>';

    d.tasks.forEach(function (t) {
      var done = isTaskDone(t);
      var prog = Math.min(t.n, d.progress[t.id] || 0);
      html += '<div class="daily-task">' +
        '<div class="daily-check' + (done ? ' done' : '') + '">' + (done ? '✓' : t.icon) + '</div>' +
        '<div class="daily-task-text">' + t.label + '</div>' +
        '<div class="daily-task-progress">' + prog + '/' + t.n + '</div>' +
      '</div>';
    });

    if (d.bonusGiven) {
      html += '<div class="daily-complete-banner">🎉 เก่งมาก! วันนี้ทำครบทุกภารกิจแล้ว กลับมาใหม่พรุ่งนี้นะ</div>';
    }
    html += '</div>';
    return html;
  }

  return {
    getToday: getToday,
    report: report,
    renderCard: renderCard,
    allDone: allDone
  };
})();
