/* ============ ตัวช่วยอ่านออกเสียงภาษาอังกฤษ (Web Speech API) ============ */
var TTS = (function () {
  var voice = null;
  var ready = false;

  function pickVoice() {
    if (!window.speechSynthesis) return;
    var voices = speechSynthesis.getVoices();
    if (!voices.length) return;
    // เลือกเสียงอังกฤษ: เอา en-US ก่อน ตามด้วย en-GB แล้วค่อยเสียง en อื่น ๆ
    voice =
      voices.find(function (v) { return v.lang === 'en-US' && /female|zira|aria|jenny/i.test(v.name); }) ||
      voices.find(function (v) { return v.lang === 'en-US'; }) ||
      voices.find(function (v) { return v.lang === 'en-GB'; }) ||
      voices.find(function (v) { return v.lang && v.lang.indexOf('en') === 0; }) ||
      null;
    ready = true;
  }

  if (window.speechSynthesis) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }

  function available() {
    return !!window.speechSynthesis;
  }

  // rate: 1 = ปกติ, 0.7 = ช้า
  function speak(text, opts) {
    if (!available()) return;
    opts = opts || {};
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    if (!ready) pickVoice();
    if (voice) u.voice = voice;
    u.lang = 'en-US';
    u.rate = opts.rate || 1;
    u.pitch = 1;
    if (opts.onend) u.onend = opts.onend;
    speechSynthesis.speak(u);
  }

  function stop() {
    if (available()) speechSynthesis.cancel();
  }

  // ความเร็วอ่านตามระดับผู้เล่น (1=เริ่มต้น อ่านช้า, 3=ก้าวหน้า อ่านปกติ)
  function rateForLevel(playerLevel) {
    if (playerLevel <= 1) return 0.85;
    if (playerLevel === 2) return 0.95;
    return 1.0;
  }

  return { speak: speak, stop: stop, available: available, rateForLevel: rateForLevel };
})();
