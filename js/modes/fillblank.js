/* ============ โหมดเติมคำในประโยค ============ */
var FillBlankMode = (function () {

  var ROUND_SIZE = 8;
  var round = null;   // {questions, idx, correct}

  function start() {
    var playerLevel = Store.state().playerLevel || 1;
    var questions = Util.pickByLevel(DATA_SENTENCES.fillBlank, ROUND_SIZE, playerLevel);
    round = { questions: questions, idx: 0, correct: 0 };
    render();
  }

  function render() {
    var q = round.questions[round.idx];
    var sentence = Util.esc(q.s).replace('___', '<span style="color:var(--primary);font-weight:800">______</span>');

    var html = '<div class="card">' +
      '<div class="quiz-progress">' +
        '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + (round.idx / round.questions.length * 100) + '%"></div></div>' +
        '<div class="quiz-progress-text">ข้อ ' + (round.idx + 1) + '/' + round.questions.length + '</div>' +
      '</div>' +
      '<div class="question-sub">✏️ เลือกคำที่ถูกต้องเติมลงในช่องว่าง</div>' +
      '<div class="question-big" style="font-size:1.25rem">' + sentence + '</div>' +
      '<div class="choices" id="fill-choices">';

    Util.shuffle(q.choices.slice()).forEach(function (c) {
      html += '<button class="choice" data-val="' + Util.escAttr(c) + '" onclick="FillBlankMode.answer(this)">' + Util.esc(c) + '</button>';
    });

    html += '</div><div id="fill-feedback"></div></div>';
    App.showScreen(html);
  }

  function answer(btn) {
    var q = round.questions[round.idx];
    var val = btn.getAttribute('data-val');
    var correct = val === q.a;
    var fb = document.getElementById('fill-feedback');

    document.querySelectorAll('#fill-choices .choice').forEach(function (b) {
      b.disabled = true;
      if (b.getAttribute('data-val') === q.a) b.classList.add('correct');
    });

    App.recordAnswer(correct);
    var fullSentence = q.s.replace('___', q.a);

    if (correct) {
      round.correct++;
      var s = Store.state();
      s.stats.fillCorrect++;
      Store.save();
      App.gainXP(10);
      App.reportDaily('fill', 1);
      App.checkStatAchievements();
      fb.innerHTML = '<div class="feedback good"><div class="feedback-title">ถูกต้อง! 🎉</div>' + Util.esc(q.why) + '</div>';
    } else {
      btn.classList.add('wrong');
      fb.innerHTML = '<div class="feedback bad"><div class="feedback-title">คำตอบคือ: ' + Util.esc(q.a) + '</div>' + Util.esc(q.why) + '</div>';
    }

    fb.innerHTML += '<div class="btn-row">' +
      '<button class="btn-speak" onclick="TTS.speak(' + Util.escAttr(JSON.stringify(fullSentence)) + ', {rate:' + TTS.rateForLevel(Store.state().playerLevel || 1) + '})">🔊 ฟังประโยคเต็ม</button>' +
      '<button class="btn btn-primary" style="flex:1" onclick="FillBlankMode.next()">' +
      (round.idx < round.questions.length - 1 ? 'ข้อถัดไป →' : 'ดูผลรอบนี้ 🏁') + '</button></div>';
  }

  function next() {
    round.idx++;
    if (round.idx < round.questions.length) render();
    else finish();
  }

  function finish() {
    var perfect = round.correct === round.questions.length;
    App.showScreen(App.roundResult({
      correct: round.correct,
      total: round.questions.length,
      perfect: perfect,
      retryLabel: 'เล่นอีกรอบ',
      retryFn: 'FillBlankMode.start()',
      backFn: 'App.showHome()'
    }));
  }

  return { start: start, answer: answer, next: next };
})();
