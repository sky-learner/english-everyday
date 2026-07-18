/* ============ โหมดฟัง-พิมพ์ตามเสียง ============ */
var ListeningMode = (function () {

  var ROUND_SIZE = 5;
  var round = null;   // {items, idx, correct, hintUsed, retried, attempted}

  function start() {
    if (!TTS.available()) {
      App.showScreen('<div class="card placement-intro">' +
        '<div class="big-icon">🔇</div><h1>เบราว์เซอร์นี้ไม่รองรับเสียงอ่าน</h1>' +
        '<p>ลองเปิดเกมด้วย Microsoft Edge หรือ Google Chrome เพื่อเล่นโหมดฟังนะครับ</p>' +
        '<div class="btn-row" style="justify-content:center"><button class="btn btn-primary" onclick="App.showHome()">กลับหน้าหลัก</button></div></div>');
      return;
    }
    var playerLevel = Store.state().playerLevel || 1;
    var items = Util.pickByLevel(DATA_SENTENCES.listening, ROUND_SIZE, playerLevel);
    round = { items: items, idx: 0, correct: 0, hintUsed: false, retried: false, attempted: false };
    render();
  }

  function current() { return round.items[round.idx]; }

  function render() {
    round.hintUsed = false;
    round.retried = false;
    round.attempted = false;

    var html = '<div class="card">' +
      '<div class="quiz-progress">' +
        '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + (round.idx / round.items.length * 100) + '%"></div></div>' +
        '<div class="quiz-progress-text">ข้อ ' + (round.idx + 1) + '/' + round.items.length + '</div>' +
      '</div>' +
      '<div class="question-sub">🎧 ฟังประโยคแล้วพิมพ์สิ่งที่ได้ยิน</div>' +
      '<div class="listen-stage">' +
        '<button class="big-play" onclick="ListeningMode.play(1)" title="กดฟังเสียง">🔊</button>' +
        '<div class="listen-tools">' +
          '<button class="btn-speak" onclick="ListeningMode.play(0.65)">🐢 ฟังช้า ๆ</button>' +
          '<button class="btn-speak" onclick="ListeningMode.hint()" id="hint-btn">💡 คำใบ้ (คำแปลไทย)</button>' +
        '</div>' +
        '<div id="hint-area"></div>' +
        '<input type="text" class="listen-input" id="listen-input" placeholder="พิมพ์ประโยคที่ได้ยินตรงนี้..." ' +
          'autocomplete="off" autocapitalize="off" spellcheck="false" onkeydown="if(event.key===\'Enter\')ListeningMode.submit()">' +
      '</div>' +
      '<div id="listen-feedback"></div>' +
      '<div class="btn-row" id="listen-actions">' +
        '<button class="btn btn-primary btn-block" onclick="ListeningMode.submit()">ตรวจคำตอบ ✔️</button>' +
      '</div>' +
    '</div>';

    App.showScreen(html);
    setTimeout(function () {
      play(1);
      var inp = document.getElementById('listen-input');
      if (inp) inp.focus();
    }, 350);
  }

  function play(rateScale) {
    var baseRate = TTS.rateForLevel(Store.state().playerLevel || 1);
    TTS.speak(current().text, { rate: baseRate * rateScale });
  }

  function hint() {
    round.hintUsed = true;
    var area = document.getElementById('hint-area');
    var words = current().text.split(' ');
    area.innerHTML = '<div class="feedback good" style="text-align:left">' +
      '💡 ความหมาย: ' + Util.esc(current().th) + '<br>' +
      '📏 มีทั้งหมด ' + words.length + ' คำ ขึ้นต้นด้วย "' + Util.esc(words[0]) + ' ..."</div>';
    var btn = document.getElementById('hint-btn');
    if (btn) btn.disabled = true;
  }

  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/[^a-z0-9' ]/g, ' ')
      .replace(/'/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function submit() {
    var inp = document.getElementById('listen-input');
    var user = inp.value.trim();
    if (!user) { inp.focus(); return; }

    var expected = current().text;
    var isCorrect = normalize(user) === normalize(expected);
    var fb = document.getElementById('listen-feedback');
    var actions = document.getElementById('listen-actions');

    if (!round.attempted) {
      App.recordAnswer(isCorrect);
      round.attempted = true;
    }

    if (isCorrect) {
      round.correct++;
      var s = Store.state();
      s.stats.listenCorrect++;
      Store.save();
      var xp = (!round.hintUsed && !round.retried) ? 12 : 6;
      App.gainXP(xp);
      App.reportDaily('listen', 1);
      App.checkStatAchievements();

      inp.disabled = true;
      fb.innerHTML = '<div class="feedback good"><div class="feedback-title">หูทองมาก! 🎉</div>' +
        '<b>' + Util.esc(expected) + '</b><br>' + Util.esc(current().th) + '</div>';
      actions.innerHTML = '<button class="btn btn-primary btn-block" onclick="ListeningMode.next()">' +
        (round.idx < round.items.length - 1 ? 'ข้อถัดไป →' : 'ดูผลรอบนี้ 🏁') + '</button>';
    } else {
      round.retried = true;
      fb.innerHTML = '<div class="feedback bad"><div class="feedback-title">ยังไม่ตรงทั้งหมด — สีเขียวคือคำที่ถูกแล้ว</div>' +
        diffView(user, expected) + '</div>';
      actions.innerHTML =
        '<button class="btn btn-ghost" style="flex:1" onclick="ListeningMode.play(0.65)">🐢 ฟังอีกครั้ง</button>' +
        '<button class="btn btn-plain" style="flex:1" onclick="ListeningMode.reveal()">ดูเฉลย + ข้ามข้อนี้</button>' +
        '<button class="btn btn-primary btn-block" onclick="ListeningMode.submit()">ตรวจอีกครั้ง ✔️</button>';
      inp.focus();
    }
  }

  // แสดงคำของผู้เล่น: เขียว = ตรงตำแหน่ง, แดง = ยังไม่ตรง, ช่องว่าง = คำที่ยังขาด
  function diffView(user, expected) {
    var u = normalize(user).split(' ');
    var e = normalize(expected).split(' ');
    var uRaw = user.trim().split(/\s+/);
    var html = '<div class="diff-view">';
    var n = Math.max(u.length, e.length);
    for (var i = 0; i < n; i++) {
      if (i < u.length) {
        var ok = i < e.length && u[i] === e[i];
        html += '<span class="diff-word ' + (ok ? 'ok' : 'miss') + '">' + Util.esc(uRaw[i] || u[i]) + '</span>';
      } else {
        html += '<span class="diff-word expected">▁▁▁</span>';
      }
    }
    html += '</div>';
    return html;
  }

  function reveal() {
    var expected = current().text;
    var fb = document.getElementById('listen-feedback');
    var actions = document.getElementById('listen-actions');
    var inp = document.getElementById('listen-input');
    inp.disabled = true;

    fb.innerHTML = '<div class="feedback bad"><div class="feedback-title">เฉลย</div>' +
      '<b>' + Util.esc(expected) + '</b><br>' + Util.esc(current().th) +
      '<div style="margin-top:8px"><button class="btn-speak" onclick="ListeningMode.play(0.8)">🔊 ฟังพร้อมอ่านตาม</button></div></div>';
    actions.innerHTML = '<button class="btn btn-primary btn-block" onclick="ListeningMode.next()">' +
      (round.idx < round.items.length - 1 ? 'ข้อถัดไป →' : 'ดูผลรอบนี้ 🏁') + '</button>';
  }

  function next() {
    TTS.stop();
    round.idx++;
    if (round.idx < round.items.length) render();
    else finish();
  }

  function finish() {
    var perfect = round.correct === round.items.length;
    App.showScreen(App.roundResult({
      correct: round.correct,
      total: round.items.length,
      perfect: perfect,
      retryLabel: 'ฟังอีกรอบ',
      retryFn: 'ListeningMode.start()',
      backFn: 'App.showHome()'
    }));
  }

  return {
    start: start,
    play: play,
    hint: hint,
    submit: submit,
    reveal: reveal,
    next: next
  };
})();
