/* ============ แบบทดสอบวัดระดับ (Placement Test) ============ */
var Placement = (function () {

  /* ข้อสอบ 15 ข้อ: คำศัพท์ 6, แกรมมาร์ 6, ฟัง 3 — เรียงง่ายไปยาก
     แต้มต่อข้อ = level ของข้อนั้น (เต็ม 30 แต้ม) */
  var QUESTIONS = [
    /* ---- คำศัพท์ ---- */
    { type: 'vocab', level: 1, q: '"tired" แปลว่าอะไร?', choices: ['เหนื่อย', 'หิว', 'ง่วง', 'โกรธ'], a: 'เหนื่อย' },
    { type: 'vocab', level: 1, q: '"cheap" แปลว่าอะไร?', choices: ['ถูก (ราคา)', 'แพง', 'สวย', 'เก่า'], a: 'ถูก (ราคา)' },
    { type: 'vocab', level: 2, q: '"appointment" แปลว่าอะไร?', choices: ['นัดหมาย', 'ใบสมัคร', 'อุปกรณ์', 'ความคิดเห็น'], a: 'นัดหมาย' },
    { type: 'vocab', level: 2, q: 'คำไหนแปลว่า "ใบเสร็จ"?', choices: ['receipt', 'recipe', 'reception', 'record'], a: 'receipt' },
    { type: 'vocab', level: 3, q: '"refund" แปลว่าอะไร?', choices: ['การคืนเงิน', 'ส่วนลด', 'เงินมัดจำ', 'ภาษี'], a: 'การคืนเงิน' },
    { type: 'vocab', level: 3, q: 'คำไหนแปลว่า "เลื่อนออกไป (นัด/งาน)"?', choices: ['postpone', 'propose', 'purchase', 'pretend'], a: 'postpone' },
    /* ---- แกรมมาร์ ---- */
    { type: 'grammar', level: 1, q: 'She ___ a teacher.', choices: ['is', 'are', 'am', 'be'], a: 'is' },
    { type: 'grammar', level: 1, q: 'I ___ coffee every morning.', choices: ['drink', 'drinks', 'drinking', 'drank'], a: 'drink' },
    { type: 'grammar', level: 2, q: 'We ___ to Phuket last year.', choices: ['went', 'go', 'gone', 'going'], a: 'went' },
    { type: 'grammar', level: 2, q: "There isn't ___ sugar left.", choices: ['much', 'many', 'a few', 'lots'], a: 'much' },
    { type: 'grammar', level: 3, q: 'If I ___ you, I would take the job.', choices: ['were', 'am', 'be', 'will be'], a: 'were' },
    { type: 'grammar', level: 3, q: 'The report ___ by tomorrow.', choices: ['will be finished', 'will finish', 'finishes', 'is finishing'], a: 'will be finished' },
    /* ---- ฟัง ---- */
    { type: 'listening', level: 1, tts: 'How are you today?', q: 'กดฟังเสียง แล้วเลือกประโยคที่ได้ยิน',
      choices: ['How are you today?', 'How old are you today?', 'Who are you today?'], a: 'How are you today?' },
    { type: 'listening', level: 2, tts: 'The train leaves at nine thirty.', q: 'กดฟังเสียง แล้วเลือกประโยคที่ได้ยิน',
      choices: ['The train leaves at nine thirty.', 'The train leaves at nine thirteen.', 'The plane leaves at nine thirty.'], a: 'The train leaves at nine thirty.' },
    { type: 'listening', level: 3, tts: 'I would have called you if I had known.', q: 'กดฟังเสียง แล้วเลือกประโยคที่ได้ยิน',
      choices: ['I would have called you if I had known.', 'I would call you if I had gone.', 'I have called you and I had known.'], a: 'I would have called you if I had known.' }
  ];

  var idx = 0;
  var answers = [];   // {correct, level, type}

  function start() {
    idx = 0;
    answers = [];
    renderIntro();
  }

  function renderIntro() {
    App.showScreen(
      '<div class="card placement-intro">' +
        '<div class="big-icon">🎯</div>' +
        '<h1>วัดระดับกันก่อน!</h1>' +
        '<p>ตอบคำถามสั้น ๆ 15 ข้อ (ประมาณ 3-5 นาที) เพื่อให้เกมเลือกระดับความยากที่เหมาะกับคุณที่สุด</p>' +
        '<p>มีทั้งคำศัพท์ แกรมมาร์ และการฟัง — ไม่ต้องเครียด ตอบเท่าที่รู้ ข้อไหนไม่แน่ใจให้เดาได้เลย</p>' +
        '<div class="btn-row" style="justify-content:center">' +
          '<button class="btn btn-primary" onclick="Placement.renderQuestion()">เริ่มทำแบบทดสอบ 🚀</button>' +
        '</div>' +
      '</div>'
    );
  }

  function renderQuestion() {
    var q = QUESTIONS[idx];
    var typeLabel = { vocab: '🧠 คำศัพท์', grammar: '✏️ แกรมมาร์', listening: '🎧 การฟัง' }[q.type];

    var html = '<div class="card">' +
      '<div class="quiz-progress">' +
        '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + (idx / QUESTIONS.length * 100) + '%"></div></div>' +
        '<div class="quiz-progress-text">ข้อ ' + (idx + 1) + '/' + QUESTIONS.length + '</div>' +
      '</div>' +
      '<div class="question-sub">' + typeLabel + '</div>';

    if (q.type === 'listening') {
      html += '<div class="listen-stage">' +
        '<button class="big-play" onclick="Placement.playAudio()" title="กดฟังเสียง">🔊</button>' +
        '<div class="flip-hint">กดฟังซ้ำได้ไม่จำกัด</div>' +
      '</div>' +
      '<div class="question-sub" style="margin-top:10px">' + q.q + '</div>';
    } else {
      html += '<div class="question-big">' + Util.esc(q.q) + '</div>';
    }

    html += '<div class="choices">';
    var shuffled = Util.shuffle(q.choices.slice());
    shuffled.forEach(function (c) {
      html += '<button class="choice" onclick="Placement.answer(this)" data-val="' + Util.escAttr(c) + '">' + Util.esc(c) + '</button>';
    });
    html += '</div></div>';

    App.showScreen(html);
    if (q.type === 'listening') {
      setTimeout(function () { playAudio(); }, 400);
    }
  }

  function playAudio() {
    var q = QUESTIONS[idx];
    if (q.tts) TTS.speak(q.tts, { rate: q.level >= 3 ? 1 : 0.9 });
  }

  function answer(btn) {
    var q = QUESTIONS[idx];
    var val = btn.getAttribute('data-val');
    answers.push({ correct: val === q.a, level: q.level, type: q.type });
    TTS.stop();
    idx++;
    if (idx < QUESTIONS.length) {
      renderQuestion();
    } else {
      finish();
    }
  }

  function finish() {
    // คะแนนถ่วงน้ำหนักตามระดับข้อ
    var score = 0, max = 0;
    var byType = {};
    answers.forEach(function (a) {
      max += a.level;
      if (a.correct) score += a.level;
      if (!byType[a.type]) byType[a.type] = { correct: 0, total: 0 };
      byType[a.type].total++;
      if (a.correct) byType[a.type].correct++;
    });

    var level = score <= 10 ? 1 : (score <= 21 ? 2 : 3);

    var s = Store.state();
    s.playerLevel = level;
    s.placementDone = true;
    s.placementScores = {
      vocab: pct(byType.vocab),
      grammar: pct(byType.grammar),
      listening: pct(byType.listening)
    };
    Store.save();
    App.unlockAchievement('placement_done');
    renderResult(level, s.placementScores);
  }

  function pct(t) {
    return t && t.total ? Math.round(t.correct / t.total * 100) : 0;
  }

  function renderResult(level, scores) {
    var info = App.PLAYER_LEVELS[level];
    var skills = [
      { name: '🧠 คำศัพท์', v: scores.vocab },
      { name: '✏️ แกรมมาร์', v: scores.grammar },
      { name: '🎧 การฟัง', v: scores.listening }
    ];
    var weakest = skills.slice().sort(function (a, b) { return a.v - b.v; })[0];
    var strongest = skills.slice().sort(function (a, b) { return b.v - a.v; })[0];

    var tip;
    if (strongest.v === weakest.v) {
      tip = 'ทักษะแต่ละด้านสมดุลกันดี เล่นสลับหลาย ๆ โหมดได้เลย!';
    } else {
      tip = 'จุดแข็งของคุณคือ ' + strongest.name + ' ส่วน ' + weakest.name + ' ยังฝึกเพิ่มได้อีก — เกมจะช่วยเน้นให้เอง';
    }

    var html = '<div class="card">' +
      '<div class="result-level">' +
        '<div class="level-icon">' + info.icon + '</div>' +
        '<div class="level-name">' + info.name + '</div>' +
        '<div class="level-desc">' + info.desc + '</div>' +
      '</div>' +
      '<div class="section-label">ผลแต่ละทักษะ</div>';

    skills.forEach(function (sk) {
      html += '<div class="skill-row">' +
        '<div class="skill-name">' + sk.name + '</div>' +
        '<div class="skill-bar"><div class="skill-fill" style="width:' + sk.v + '%"></div></div>' +
        '<div class="skill-pct">' + sk.v + '%</div>' +
      '</div>';
    });

    html += '<div class="feedback good" style="margin-top:16px">' + tip + '</div>' +
      '<div class="btn-row" style="justify-content:center">' +
        '<button class="btn btn-primary btn-block" onclick="App.showHome()">เริ่มผจญภัยกันเลย! 🎮</button>' +
      '</div>' +
    '</div>';

    App.showScreen(html);
  }

  return {
    start: start,
    renderQuestion: renderQuestion,
    playAudio: playAudio,
    answer: answer
  };
})();
