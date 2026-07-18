/* ============ โหมดบทสนทนาสถานการณ์จริง ============ */
var ConversationMode = (function () {

  var current = null;   // {scenario, stepIdx, transcript: [], firstTry, wrongTried: []}

  function renderList() {
    var s = Store.state();
    var playerLevel = s.playerLevel || 1;
    var done = s.stats.convCompleted;

    // เรียงให้ระดับของผู้เล่นขึ้นก่อน ตามด้วยง่ายกว่า แล้วค่อยยากกว่า
    var sorted = DATA_CONVERSATIONS.slice().sort(function (a, b) {
      function rank(x) {
        if (x.level === playerLevel) return 0;
        if (x.level < playerLevel) return 1;
        return 2;
      }
      return rank(a) - rank(b) || a.level - b.level;
    });

    var html = '<h1 class="page-title">🗣️ บทสนทนาสถานการณ์จริง</h1>' +
      '<p class="page-sub">เลือกสถานการณ์แล้วเล่นเป็นตัวละคร — แนะนำอันที่ตรงระดับคุณก่อน</p>' +
      '<div class="scenario-list">';

    sorted.forEach(function (sc) {
      var badge = '<span class="level-badge l' + sc.level + '">' + App.PLAYER_LEVELS[sc.level].short + '</span>';
      var recommended = sc.level === playerLevel ? ' ⭐ แนะนำ' : '';
      html += '<button class="scenario-item" onclick="ConversationMode.play(\'' + sc.id + '\')">' +
        '<span class="scenario-icon">' + sc.icon + '</span>' +
        '<span class="scenario-info">' +
          '<span class="scenario-title">' + sc.title + recommended + '</span><br>' +
          '<span class="scenario-meta">' + sc.steps.length + ' บทพูด</span>' +
        '</span>' +
        badge +
        (done[sc.id] ? '<span class="scenario-done">✅</span>' : '') +
      '</button>';
    });

    html += '</div>' +
      '<div class="btn-row"><button class="btn btn-plain" onclick="App.showHome()">← กลับหน้าหลัก</button></div>';
    App.showScreen(html);
  }

  function play(id) {
    var sc = DATA_CONVERSATIONS.filter(function (c) { return c.id === id; })[0];
    if (!sc) return;
    current = { scenario: sc, stepIdx: 0, transcript: [], firstTryCount: 0, triedWrong: {} };
    renderStep();
  }

  function renderStep() {
    var sc = current.scenario;
    var step = sc.steps[current.stepIdx];

    var html = '<div class="card">' +
      '<div class="quiz-progress">' +
        '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + (current.stepIdx / sc.steps.length * 100) + '%"></div></div>' +
        '<div class="quiz-progress-text">' + sc.icon + ' ' + sc.title + '</div>' +
      '</div>';

    if (current.stepIdx === 0) {
      html += '<div class="feedback good" style="margin-top:0">📖 ' + sc.intro + '</div>';
    }

    html += '<div class="chat-area">';
    // บทสนทนาที่ผ่านมา
    current.transcript.forEach(function (t) {
      html += npcBubble(sc, t.npc, t.npcTh, t.idx, true);
      html += '<div class="bubble player"><div class="en">' + Util.esc(t.player) + '</div></div>';
    });
    // ประโยคปัจจุบันของ NPC
    html += npcBubble(sc, step.npc, step.th, current.stepIdx, false);
    html += '</div>';

    html += '<div class="section-label">คุณจะตอบว่าอะไร?</div><div class="choices" id="conv-choices">';
    var order = Util.shuffle(step.choices.map(function (_, i) { return i; }));
    order.forEach(function (ci) {
      var c = step.choices[ci];
      html += '<button class="choice" onclick="ConversationMode.answer(' + ci + ', this)">' +
        Util.esc(c.en) +
        (c.th ? '<span class="choice-sub">' + Util.esc(c.th) + '</span>' : '') +
      '</button>';
    });
    html += '</div><div id="conv-feedback"></div></div>';

    App.showScreen(html);
    // อ่านประโยคของ NPC อัตโนมัติ
    TTS.speak(step.npc.replace(/\(.*?\)/g, ''), { rate: TTS.rateForLevel(Store.state().playerLevel || 1) });
  }

  function npcBubble(sc, text, th, idx, past) {
    var bubbleId = 'npc-th-' + idx + (past ? '-past' : '');
    return '<div class="bubble npc">' +
      '<div class="npc-name">' + sc.npcName + '</div>' +
      '<div class="en">' + Util.esc(text) + '</div>' +
      '<div class="th-hint hidden" id="' + bubbleId + '">' + Util.esc(th) + '</div>' +
      '<div class="bubble-tools">' +
        '<button class="bubble-tool" onclick="ConversationMode.speakLine(' + Util.escAttr(JSON.stringify(idx)) + ', ' + past + ')">🔊 ฟัง</button>' +
        '<button class="bubble-tool" onclick="document.getElementById(\'' + bubbleId + '\').classList.toggle(\'hidden\')">🇹🇭 คำแปล</button>' +
      '</div>' +
    '</div>';
  }

  function speakLine(idx, past) {
    var sc = current.scenario;
    var text = past ? current.transcript.filter(function (t) { return t.idx === idx; })[0].npc : sc.steps[current.stepIdx].npc;
    TTS.speak(text.replace(/\(.*?\)/g, ''), { rate: TTS.rateForLevel(Store.state().playerLevel || 1) });
  }

  function answer(choiceIdx, btn) {
    var sc = current.scenario;
    var step = sc.steps[current.stepIdx];
    var choice = step.choices[choiceIdx];
    var fb = document.getElementById('conv-feedback');

    if (choice.correct) {
      var firstTry = !current.triedWrong[current.stepIdx];
      if (firstTry) current.firstTryCount++;
      btn.classList.add('correct');
      App.recordAnswer(true);
      App.gainXP(firstTry ? 10 : 4);

      current.transcript.push({ idx: current.stepIdx, npc: step.npc, npcTh: step.th, player: choice.en });
      current.stepIdx++;

      // ปิดตัวเลือกทั้งหมดชั่วครู่ก่อนไปต่อ
      var all = document.querySelectorAll('#conv-choices .choice');
      all.forEach(function (b) { b.disabled = true; });
      fb.innerHTML = '<div class="feedback good"><div class="feedback-title">ถูกต้อง! 🎉</div>' +
        (choice.th ? Util.esc(choice.th) : '') + '</div>';

      setTimeout(function () {
        if (current.stepIdx < sc.steps.length) renderStep();
        else finish();
      }, 900);
    } else {
      current.triedWrong[current.stepIdx] = true;
      btn.classList.add('wrong');
      btn.disabled = true;
      App.recordAnswer(false);
      fb.innerHTML = '<div class="feedback bad"><div class="feedback-title">ยังไม่ใช่ ลองใหม่ได้เลย</div>' +
        Util.esc(choice.why || '') + '</div>';
    }
  }

  function finish() {
    var sc = current.scenario;
    var s = Store.state();
    var firstClear = !s.stats.convCompleted[sc.id];
    s.stats.convCompleted[sc.id] = true;
    Store.save();

    App.gainXP(25);
    App.reportDaily('conv', 1);
    App.unlockAchievement('conv_first');
    if (Object.keys(s.stats.convCompleted).length >= DATA_CONVERSATIONS.length) {
      App.unlockAchievement('conv_all');
    }

    var perfect = current.firstTryCount === sc.steps.length;
    var html = '<div class="card"><div class="round-result">' +
      '<div style="font-size:3rem">' + (perfect ? '🏆' : '🎉') + '</div>' +
      '<div class="score-big">' + current.firstTryCount + '/' + sc.steps.length + '</div>' +
      '<div class="score-sub">ตอบถูกตั้งแต่ครั้งแรก' + (perfect ? ' — สมบูรณ์แบบ!' : '') + '</div>' +
      (firstClear ? '<div class="score-sub" style="color:var(--green);font-weight:700;margin-top:4px">ผ่านสถานการณ์นี้ครั้งแรก! ✅</div>' : '') +
    '</div>' +
    '<div class="section-label">📌 ประโยคเด็ดจากบทนี้ — กดฟังแล้วพูดตามได้เลย</div>' +
    '<div class="key-phrases">';

    sc.keyPhrases.forEach(function (kp, i) {
      html += '<div class="key-phrase">' +
        '<div><div class="en">' + Util.esc(kp.en) + '</div><div class="th">' + Util.esc(kp.th) + '</div></div>' +
        '<button class="btn-speak" onclick="TTS.speak(' + Util.escAttr(JSON.stringify(kp.en.replace(/\.\.\./g, 'something'))) + ')">🔊</button>' +
      '</div>';
    });

    html += '</div>' + App.levelUpSuggestion(perfect) +
      '<div class="btn-row">' +
        '<button class="btn btn-primary" onclick="ConversationMode.renderList()">เลือกสถานการณ์อื่น</button>' +
        '<button class="btn btn-plain" onclick="App.showHome()">หน้าหลัก</button>' +
      '</div></div>';

    App.showScreen(html);
  }

  return {
    renderList: renderList,
    play: play,
    answer: answer,
    speakLine: speakLine
  };
})();
