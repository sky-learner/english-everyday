/* ============ โหมดแฟลชการ์ด / ควิซคำศัพท์ ============ */
var FlashcardsMode = (function () {

  var QUIZ_SIZE = 10;
  var browse = null;   // {words, idx}
  var quiz = null;     // {questions, idx, correct}

  /* ---------- หน้าเลือก ---------- */
  function renderHome() {
    var html = '<h1 class="page-title">🧠 คำศัพท์ประจำวัน</h1>' +
      '<p class="page-sub">ท่องศัพท์ด้วยแฟลชการ์ด แล้วทดสอบตัวเองด้วยควิซ</p>' +
      '<div class="card" style="text-align:center">' +
        '<button class="btn btn-primary btn-block" onclick="FlashcardsMode.startQuiz()">🎮 เล่นควิซคำศัพท์ (' + QUIZ_SIZE + ' ข้อ)</button>' +
        '<p style="color:var(--ink-soft);font-size:.88rem;margin-top:8px">คำที่เคยตอบผิดจะวนกลับมาให้ฝึกบ่อยขึ้นอัตโนมัติ</p>' +
      '</div>' +
      '<div class="section-label">หรือท่องการ์ดตามหมวด</div>' +
      '<div class="cat-grid">';

    DATA_VOCAB.categories.forEach(function (cat) {
      var count = DATA_VOCAB.words.filter(function (w) { return w.cat === cat.id; }).length;
      html += '<button class="cat-card" onclick="FlashcardsMode.startBrowse(\'' + cat.id + '\')">' +
        '<div class="cat-icon">' + cat.icon + '</div>' +
        '<div class="cat-name">' + cat.name + '</div>' +
        '<div class="cat-count">' + count + ' คำ</div>' +
      '</button>';
    });

    html += '</div><div class="btn-row"><button class="btn btn-plain" onclick="App.showHome()">← กลับหน้าหลัก</button></div>';
    App.showScreen(html);
  }

  /* ---------- ท่องการ์ด ---------- */
  function startBrowse(catId) {
    var words = Util.shuffle(DATA_VOCAB.words.filter(function (w) { return w.cat === catId; }));
    browse = { words: words, idx: 0, catId: catId };
    renderCard();
  }

  function renderCard() {
    var w = browse.words[browse.idx];
    var cat = DATA_VOCAB.categories.filter(function (c) { return c.id === browse.catId; })[0];

    var html = '<div class="card">' +
      '<div class="quiz-progress">' +
        '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + ((browse.idx + 1) / browse.words.length * 100) + '%"></div></div>' +
        '<div class="quiz-progress-text">' + cat.icon + ' ' + (browse.idx + 1) + '/' + browse.words.length + '</div>' +
      '</div>' +
      '<div class="flashcard-stage">' +
        '<div class="flashcard" id="flashcard" onclick="this.classList.toggle(\'flipped\')">' +
          '<div class="face front">' +
            '<div class="word-en">' + Util.esc(w.en) + '</div>' +
            '<div class="word-phon">อ่านว่า: ' + Util.esc(w.phon) + '</div>' +
            '<div class="word-ex">"' + Util.esc(w.ex) + '"</div>' +
            '<span class="level-badge l' + w.level + '" style="margin-top:10px">' + App.PLAYER_LEVELS[w.level].short + '</span>' +
          '</div>' +
          '<div class="face back">' +
            '<div class="word-th">' + Util.esc(w.th) + '</div>' +
            '<div class="word-ex">"' + Util.esc(w.ex) + '"</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="flip-hint">แตะการ์ดเพื่อดูคำแปล</div>' +
      '<div class="btn-row" style="justify-content:center">' +
        '<button class="btn-speak" onclick="event.stopPropagation();FlashcardsMode.speakCard()">🔊 ฟังคำศัพท์</button>' +
        '<button class="btn-speak" onclick="event.stopPropagation();FlashcardsMode.speakExample()">🔊 ฟังประโยค</button>' +
      '</div>' +
      '<div class="btn-row">' +
        '<button class="btn btn-plain" onclick="FlashcardsMode.moveCard(-1)" ' + (browse.idx === 0 ? 'disabled' : '') + '>← ก่อนหน้า</button>' +
        (browse.idx < browse.words.length - 1
          ? '<button class="btn btn-primary" style="flex:1" onclick="FlashcardsMode.moveCard(1)">ถัดไป →</button>'
          : '<button class="btn btn-primary" style="flex:1" onclick="FlashcardsMode.renderHome()">จบหมวดนี้ ✅</button>') +
      '</div>' +
    '</div>';

    App.showScreen(html);
    TTS.speak(w.en, { rate: 0.95 });
  }

  function moveCard(dir) {
    browse.idx = Math.max(0, Math.min(browse.words.length - 1, browse.idx + dir));
    renderCard();
  }

  function speakCard() { TTS.speak(browse.words[browse.idx].en, { rate: 0.9 }); }
  function speakExample() { TTS.speak(browse.words[browse.idx].ex, { rate: TTS.rateForLevel(Store.state().playerLevel || 1) }); }

  /* ---------- ควิซ ---------- */
  function startQuiz() {
    var playerLevel = Store.state().playerLevel || 1;
    var wordStats = Store.state().stats.wordStats;

    var pool = Util.pickByLevel(DATA_VOCAB.words, QUIZ_SIZE, playerLevel, function (w) {
      var st = wordStats[w.en];
      return st ? 1 + st.w * 2 : 1;   // เคยตอบผิด → เจอบ่อยขึ้น
    });

    var questions = pool.map(function (w) {
      var enToTh = Math.random() < 0.5;
      // ตัวลวงจากหมวดเดียวกันก่อน ถ้าไม่พอค่อยดึงหมวดอื่น
      var sameCat = DATA_VOCAB.words.filter(function (x) { return x.cat === w.cat && x.en !== w.en; });
      var others = DATA_VOCAB.words.filter(function (x) { return x.cat !== w.cat; });
      var decoys = Util.shuffle(sameCat).slice(0, 3);
      if (decoys.length < 3) decoys = decoys.concat(Util.shuffle(others).slice(0, 3 - decoys.length));
      return {
        word: w,
        enToTh: enToTh,
        prompt: enToTh ? w.en : w.th,
        answer: enToTh ? w.th : w.en,
        choices: Util.shuffle(decoys.map(function (d) { return enToTh ? d.th : d.en; }).concat([enToTh ? w.th : w.en]))
      };
    });

    quiz = { questions: questions, idx: 0, correct: 0 };
    renderQuiz();
  }

  function renderQuiz() {
    var q = quiz.questions[quiz.idx];
    var html = '<div class="card">' +
      '<div class="quiz-progress">' +
        '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + (quiz.idx / quiz.questions.length * 100) + '%"></div></div>' +
        '<div class="quiz-progress-text">ข้อ ' + (quiz.idx + 1) + '/' + quiz.questions.length + '</div>' +
      '</div>' +
      '<div class="question-sub">' + (q.enToTh ? 'คำนี้แปลว่าอะไร?' : 'ข้อไหนคือภาษาอังกฤษของคำนี้?') + '</div>' +
      '<div class="question-big">' + Util.esc(q.prompt) +
        (q.enToTh ? ' <button class="btn-speak" onclick="TTS.speak(' + Util.escAttr(JSON.stringify(q.word.en)) + ')">🔊</button>' : '') +
      '</div>' +
      '<div class="choices" id="quiz-choices">';

    q.choices.forEach(function (c) {
      html += '<button class="choice" data-val="' + Util.escAttr(c) + '" onclick="FlashcardsMode.answerQuiz(this)">' + Util.esc(c) + '</button>';
    });

    html += '</div><div id="quiz-feedback"></div></div>';
    App.showScreen(html);
    if (q.enToTh) TTS.speak(q.word.en, { rate: 0.95 });
  }

  function answerQuiz(btn) {
    var q = quiz.questions[quiz.idx];
    var val = btn.getAttribute('data-val');
    var correct = val === q.answer;
    var fb = document.getElementById('quiz-feedback');

    document.querySelectorAll('#quiz-choices .choice').forEach(function (b) {
      b.disabled = true;
      if (b.getAttribute('data-val') === q.answer) b.classList.add('correct');
    });

    Store.recordWord(q.word.en, correct);
    App.recordAnswer(correct);

    if (correct) {
      quiz.correct++;
      var s = Store.state();
      s.stats.vocabCorrect++;
      Store.save();
      App.gainXP(8);
      App.reportDaily('vocab', 1);
      App.checkStatAchievements();
      fb.innerHTML = '<div class="feedback good"><div class="feedback-title">เยี่ยม! 🎉</div>"' +
        Util.esc(q.word.ex) + '"</div>';
    } else {
      btn.classList.add('wrong');
      fb.innerHTML = '<div class="feedback bad"><div class="feedback-title">คำตอบคือ: ' + Util.esc(q.answer) + '</div>' +
        Util.esc(q.word.en) + ' (' + Util.esc(q.word.phon) + ') = ' + Util.esc(q.word.th) + '</div>';
    }

    fb.innerHTML += '<div class="btn-row"><button class="btn btn-primary btn-block" onclick="FlashcardsMode.nextQuiz()">' +
      (quiz.idx < quiz.questions.length - 1 ? 'ข้อถัดไป →' : 'ดูผลรอบนี้ 🏁') + '</button></div>';
  }

  function nextQuiz() {
    quiz.idx++;
    if (quiz.idx < quiz.questions.length) renderQuiz();
    else finishQuiz();
  }

  function finishQuiz() {
    var perfect = quiz.correct === quiz.questions.length;
    App.showScreen(App.roundResult({
      correct: quiz.correct,
      total: quiz.questions.length,
      perfect: perfect,
      retryLabel: 'เล่นควิซอีกรอบ',
      retryFn: 'FlashcardsMode.startQuiz()',
      backFn: 'FlashcardsMode.renderHome()'
    }));
  }

  return {
    renderHome: renderHome,
    startBrowse: startBrowse,
    renderCard: renderCard,
    moveCard: moveCard,
    speakCard: speakCard,
    speakExample: speakExample,
    startQuiz: startQuiz,
    answerQuiz: answerQuiz,
    nextQuiz: nextQuiz
  };
})();
