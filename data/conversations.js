/* ============ บทสนทนาสถานการณ์จริง 10 สถานการณ์ ============
   แต่ละ step: npc = ประโยคที่คู่สนทนาพูด, th = คำแปล,
   choices = 3 ตัวเลือก (ตัวถูกมี correct: true, ตัวผิดมี why = เหตุผลภาษาไทย)
*/
var DATA_CONVERSATIONS = [

  /* ========== 1. สั่งกาแฟ (ระดับ 1) ========== */
  {
    id: 'coffee', title: 'สั่งกาแฟที่คาเฟ่', icon: '☕', level: 1, npcName: 'Barista',
    intro: 'เช้าวันจันทร์ คุณแวะร้านกาแฟก่อนไปทำงาน พนักงานยิ้มต้อนรับ',
    steps: [
      {
        npc: 'Good morning! What can I get for you today?',
        th: 'อรุณสวัสดิ์ค่ะ วันนี้รับอะไรดีคะ',
        choices: [
          { en: 'Can I get an iced latte, please?', th: 'ขอลาเต้เย็นแก้วหนึ่งครับ/ค่ะ', correct: true },
          { en: 'Give me coffee now.', th: 'เอากาแฟมาเดี๋ยวนี้', why: 'ฟังดูเหมือนออกคำสั่ง ไม่สุภาพ — ควรใช้ Can I get... please? เวลาสั่งของ' },
          { en: 'I am an iced latte.', th: 'ฉันคือลาเต้เย็น', why: 'I am = ฉันเป็น... ประโยคนี้เลยแปลว่า "ฉันคือลาเต้" ต้องใช้ Can I get... เพื่อขอสั่ง' }
        ]
      },
      {
        npc: 'Sure! What size would you like — small, medium, or large?',
        th: 'ได้เลยค่ะ รับขนาดไหนดีคะ เล็ก กลาง หรือใหญ่',
        choices: [
          { en: 'A medium one, please.', th: 'ขอขนาดกลางครับ/ค่ะ', correct: true },
          { en: 'Yes, I like size.', th: 'ใช่ ฉันชอบขนาด', why: 'คำถามให้เลือกขนาด ต้องตอบว่าเอาขนาดไหน ไม่ใช่ตอบ Yes/No' },
          { en: 'Medium is my friend.', th: 'ไซซ์กลางคือเพื่อนฉัน', why: 'ความหมายเพี้ยน — แค่บอกขนาดที่ต้องการ: A medium one, please.' }
        ]
      },
      {
        npc: 'Would you like anything else? Our croissants are fresh.',
        th: 'รับอะไรเพิ่มไหมคะ ครัวซองต์เพิ่งอบเสร็จเลยนะคะ',
        choices: [
          { en: "Sounds good. I'll take one croissant, too.", th: 'น่ากินเลย งั้นขอครัวซองต์ชิ้นหนึ่งด้วย', correct: true },
          { en: 'No, you eat it.', th: 'ไม่ คุณกินสิ', why: 'เสียมารยาท — ถ้าไม่รับเพิ่มพูดว่า No, thank you. ก็พอ' },
          { en: 'Anything is else.', th: '(เรียงคำผิด)', why: 'เรียงคำไม่เป็นประโยค — ตอบรับง่าย ๆ ว่า I\'ll take one... หรือปฏิเสธว่า No, thank you.' }
        ]
      },
      {
        npc: 'For here or to go?',
        th: 'ทานที่ร้านหรือรับกลับบ้านคะ',
        choices: [
          { en: 'To go, please. I\'m heading to work.', th: 'รับกลับครับ/ค่ะ กำลังจะไปทำงานพอดี', correct: true },
          { en: 'I go for here to go.', th: '(สับสน)', why: 'ตอบสั้น ๆ ได้เลยว่า For here (ทานที่ร้าน) หรือ To go (รับกลับ) อย่างใดอย่างหนึ่ง' },
          { en: 'Yes.', th: 'ใช่', why: 'คำถามให้เลือกอย่างใดอย่างหนึ่ง (or) ตอบ Yes เฉย ๆ ไม่ได้ ต้องเลือกว่า For here หรือ To go' }
        ]
      },
      {
        npc: 'That will be 95 baht. How would you like to pay?',
        th: 'ทั้งหมด 95 บาทค่ะ ชำระเงินแบบไหนดีคะ',
        choices: [
          { en: "I'll pay by card, please.", th: 'จ่ายด้วยบัตรครับ/ค่ะ', correct: true },
          { en: 'I pay you tomorrow.', th: 'ฉันจ่ายคุณพรุ่งนี้', why: 'ร้านกาแฟต้องจ่ายตอนนี้เลย — บอกวิธีจ่าย เช่น by card (บัตร) หรือ in cash (เงินสด)' },
          { en: 'How much are you?', th: 'คุณราคาเท่าไหร่', why: 'ประโยคนี้กลายเป็นถามราคา "ตัวพนักงาน" — เขาบอกราคาแล้ว แค่บอกวิธีจ่ายก็พอ' }
        ]
      },
      {
        npc: 'Here is your iced latte and croissant. Have a great day!',
        th: 'นี่ค่ะ ลาเต้เย็นกับครัวซองต์ ขอให้เป็นวันที่ดีนะคะ',
        choices: [
          { en: 'Thank you! You too.', th: 'ขอบคุณครับ/ค่ะ เช่นกันนะครับ/คะ', correct: true },
          { en: 'Me great day also you.', th: '(เรียงคำผิด)', why: 'อวยพรกลับสั้น ๆ ว่า You too. (คุณก็เช่นกัน) เป็นธรรมชาติที่สุด' },
          { en: 'Goodbye forever.', th: 'ลาก่อนตลอดกาล', why: 'ฟังดูเหมือนจะไม่กลับมาอีกเลย 😅 — แค่ Thank you! You too. ก็พอ' }
        ]
      }
    ],
    keyPhrases: [
      { en: 'Can I get ..., please?', th: 'ขอ... หน่อยครับ/ค่ะ (ใช้สั่งอาหาร-เครื่องดื่ม)' },
      { en: 'For here or to go?', th: 'ทานที่ร้านหรือรับกลับ' },
      { en: "I'll pay by card / in cash.", th: 'จ่ายด้วยบัตร / เงินสด' },
      { en: 'Have a great day! — You too.', th: 'ขอให้เป็นวันที่ดี — เช่นกันครับ/ค่ะ' }
    ]
  },

  /* ========== 2. สั่งอาหารที่ร้านอาหาร (ระดับ 1) ========== */
  {
    id: 'restaurant', title: 'มื้อค่ำที่ร้านอาหาร', icon: '🍽️', level: 1, npcName: 'Waiter',
    intro: 'คุณไปทานมื้อค่ำที่ร้านอาหารกับเพื่อน พนักงานเดินเข้ามาต้อนรับ',
    steps: [
      {
        npc: 'Good evening! A table for how many?',
        th: 'สวัสดีตอนเย็นครับ กี่ท่านครับ',
        choices: [
          { en: 'A table for two, please.', th: 'โต๊ะสำหรับสองคนครับ/ค่ะ', correct: true },
          { en: 'We are many people two.', th: '(เรียงคำผิด)', why: 'บอกจำนวนคนง่าย ๆ ว่า A table for two หรือ Two, please.' },
          { en: 'How many are you?', th: 'พวกคุณกี่คน', why: 'พนักงานถามเรา ไม่ใช่ให้เราถามกลับ — ตอบจำนวนคนที่มา' }
        ]
      },
      {
        npc: 'Right this way. Here are your menus. Can I get you something to drink first?',
        th: 'เชิญทางนี้ครับ นี่เมนูครับ รับเครื่องดื่มอะไรก่อนไหมครับ',
        choices: [
          { en: 'Two glasses of water, please.', th: 'ขอน้ำเปล่าสองแก้วครับ/ค่ะ', correct: true },
          { en: 'Drink is good idea you.', th: '(สับสน)', why: 'บอกเครื่องดื่มที่ต้องการตรง ๆ เช่น Two glasses of water, please.' },
          { en: 'I drink you later.', th: '(ความหมายเพี้ยน)', why: 'ประโยคนี้ฟังดูแปลกมาก — บอกสิ่งที่อยากดื่ม เช่น Water, please.' }
        ]
      },
      {
        npc: 'Are you ready to order, or do you need a few more minutes?',
        th: 'พร้อมสั่งหรือยังครับ หรือขอเวลาดูเมนูอีกสักครู่',
        choices: [
          { en: 'Could we have a few more minutes, please?', th: 'ขอเวลาอีกสักครู่ได้ไหมครับ/คะ', correct: true },
          { en: 'You wait me.', th: 'คุณรอฉัน', why: 'ฟังดูเป็นคำสั่ง — ใช้ Could we have a few more minutes? สุภาพกว่ามาก' },
          { en: 'Order is ready to me.', th: '(เรียงคำผิด)', why: 'ถ้าพร้อมสั่งพูดว่า Yes, we\'re ready. ถ้ายังไม่พร้อมขอเวลาว่า A few more minutes, please.' }
        ]
      },
      {
        npc: 'No problem! ... And now, what would you like to have?',
        th: 'ได้ครับ ... เอาล่ะครับ รับอะไรดีครับ',
        choices: [
          { en: "I'd like the fried rice, and she'll have the noodle soup.", th: 'ขอข้าวผัด ส่วนเธอรับก๋วยเตี๋ยวน้ำครับ/ค่ะ', correct: true },
          { en: 'I eat all menu.', th: 'ฉันกินทั้งเมนู', why: 'แปลว่าจะสั่งทุกอย่างในร้าน! ใช้ I\'d like + ชื่ออาหาร เพื่อสั่งทีละจาน' },
          { en: 'Food me hungry fast.', th: '(เรียงคำผิด)', why: 'โครงสร้างสั่งอาหารคือ I\'d like... หรือ I\'ll have... ตามด้วยชื่ออาหาร' }
        ]
      },
      {
        npc: 'Excellent choice! Would you like it spicy or not spicy?',
        th: 'เลือกได้เยี่ยมครับ รับเผ็ดหรือไม่เผ็ดครับ',
        choices: [
          { en: 'Just a little spicy, please.', th: 'เผ็ดนิดเดียวพอครับ/ค่ะ', correct: true },
          { en: 'Spicy is my body.', th: '(ความหมายเพี้ยน)', why: 'บอกระดับความเผ็ดที่ต้องการ เช่น Very spicy / A little spicy / Not spicy' },
          { en: 'No, I am not spicy.', th: 'ไม่ ฉันไม่เผ็ด', why: 'I am not spicy = "ตัวฉัน" ไม่เผ็ด 😅 ควรพูดถึงอาหาร เช่น Not spicy, please.' }
        ]
      },
      {
        npc: 'Here you are. Enjoy your meal! ... How was everything?',
        th: 'อาหารมาแล้วครับ ทานให้อร่อยนะครับ ... เป็นอย่างไรบ้างครับ',
        choices: [
          { en: 'Everything was delicious. Can we have the bill, please?', th: 'อร่อยทุกอย่างเลย ขอบิลด้วยครับ/ค่ะ', correct: true },
          { en: 'Bill me to home.', th: '(สับสน)', why: 'ขอเช็คบิลพูดว่า Can we have the bill, please? หรือ Check, please.' },
          { en: 'I finish you.', th: '(ความหมายเพี้ยน)', why: 'ฟังดูน่ากลัว 😅 — ชมอาหารว่า It was delicious แล้วขอบิลว่า The bill, please.' }
        ]
      }
    ],
    keyPhrases: [
      { en: 'A table for two, please.', th: 'ขอโต๊ะสำหรับสองคน' },
      { en: "I'd like ... / I'll have ...", th: 'ขอสั่ง... (ใช้สั่งอาหาร)' },
      { en: 'Could we have a few more minutes?', th: 'ขอเวลาดูเมนูอีกสักครู่' },
      { en: 'Can we have the bill, please?', th: 'ขอเช็คบิลหน่อยครับ/ค่ะ' }
    ]
  },

  /* ========== 3. ถามทาง (ระดับ 1) ========== */
  {
    id: 'directions', title: 'หลงทางกลางเมือง', icon: '🗺️', level: 1, npcName: 'Local',
    intro: 'คุณหาสถานีรถไฟฟ้าไม่เจอ เลยตัดสินใจถามคนที่เดินผ่านมา',
    steps: [
      {
        npc: '(คุณเข้าไปทักคนแปลกหน้าอย่างสุภาพ)',
        th: 'จะเริ่มถามทางอย่างไรดี',
        choices: [
          { en: 'Excuse me, could you help me for a second?', th: 'ขอโทษนะครับ/คะ รบกวนสักครู่ได้ไหม', correct: true },
          { en: 'Hey you! Stop!', th: 'เฮ้ย! หยุดเดี๋ยวนี้!', why: 'เสียมารยาทมาก — เริ่มด้วย Excuse me เสมอเวลาขอความช่วยเหลือจากคนแปลกหน้า' },
          { en: 'You. Question. Now.', th: '(ห้วนเกินไป)', why: 'พูดเป็นคำ ๆ ฟังดูคุกคาม — ใช้ประโยคเต็ม Excuse me, could you...?' }
        ]
      },
      {
        npc: 'Of course! What do you need?',
        th: 'ได้สิครับ มีอะไรให้ช่วยครับ',
        choices: [
          { en: 'How do I get to the nearest BTS station?', th: 'ไปสถานีบีทีเอสที่ใกล้ที่สุดยังไงครับ/คะ', correct: true },
          { en: 'Where am I go station?', th: '(ผิดแกรมมาร์)', why: 'โครงสร้างถามทางคือ How do I get to...? หรือ Where is...?' },
          { en: 'Station give me please.', th: 'เอาสถานีมาให้ฉัน', why: 'ฟังดูเหมือนขอ "ตัวสถานี" เป็นของ — ใช้ How do I get to...? เพื่อถามทาง' }
        ]
      },
      {
        npc: 'Go straight for two blocks, then turn left at the bank.',
        th: 'เดินตรงไปสองช่วงตึก แล้วเลี้ยวซ้ายตรงธนาคาร',
        choices: [
          { en: 'Sorry, could you say that again more slowly?', th: 'ขอโทษครับ/ค่ะ พูดอีกครั้งช้า ๆ ได้ไหม', correct: true },
          { en: 'What? Speak Thai!', th: 'อะไรนะ พูดไทยสิ!', why: 'เรากำลังฝึกภาษาอังกฤษอยู่นะ 😄 ถ้าฟังไม่ทันใช้ Could you say that again more slowly?' },
          { en: 'Again you talk slow me.', th: '(เรียงคำผิด)', why: 'ประโยคขอให้พูดซ้ำที่ถูกคือ Could you say that again, please?' }
        ]
      },
      {
        npc: 'Sure — go straight, two blocks, then left at the big green bank. You will see the station.',
        th: 'ได้ครับ ตรงไปสองช่วงตึก เลี้ยวซ้ายตรงธนาคารสีเขียวใหญ่ ๆ แล้วจะเห็นสถานีเลย',
        choices: [
          { en: 'Got it. Is it far from here?', th: 'เข้าใจแล้วครับ/ค่ะ ไกลจากตรงนี้ไหม', correct: true },
          { en: 'Far is it me?', th: '(เรียงคำผิด)', why: 'ถามระยะทางว่า Is it far from here? (ไกลไหม)' },
          { en: 'I see you at station.', th: 'เจอกันที่สถานีนะ', why: 'เขาแค่บอกทาง ไม่ได้จะไปด้วย 😅 — ถามต่อว่าไกลไหม: Is it far?' }
        ]
      },
      {
        npc: 'Not far at all — about a five-minute walk.',
        th: 'ไม่ไกลเลย เดินประมาณห้านาที',
        choices: [
          { en: 'Perfect. Thank you so much for your help!', th: 'เยี่ยมเลย ขอบคุณมาก ๆ ครับ/ค่ะ', correct: true },
          { en: 'Five minutes is a lie.', th: 'ห้านาทีนี่โกหกแน่ ๆ', why: 'เขาอุตส่าห์ช่วย อย่าหาว่าเขาโกหก 😅 — ขอบคุณว่า Thank you so much!' },
          { en: 'OK bye you walk good.', th: '(เรียงคำผิด)', why: 'ปิดบทสนทนาสุภาพ ๆ ว่า Thank you so much for your help!' }
        ]
      }
    ],
    keyPhrases: [
      { en: 'Excuse me, could you help me?', th: 'ขอโทษนะครับ/คะ ช่วยหน่อยได้ไหม' },
      { en: 'How do I get to ...?', th: 'ไป... ยังไงครับ/คะ' },
      { en: 'Could you say that again more slowly?', th: 'พูดอีกครั้งช้า ๆ ได้ไหม' },
      { en: 'Is it far from here?', th: 'ไกลจากที่นี่ไหม' }
    ]
  },

  /* ========== 4. นั่งแท็กซี่ (ระดับ 1) ========== */
  {
    id: 'taxi', title: 'เรียกแท็กซี่', icon: '🚕', level: 1, npcName: 'Driver',
    intro: 'คุณรีบไปประชุมที่โรงแรมใจกลางเมือง แท็กซี่จอดรับพอดี',
    steps: [
      {
        npc: 'Hello! Where to?',
        th: 'สวัสดีครับ ไปไหนครับ',
        choices: [
          { en: 'To the Grand Palace Hotel, please.', th: 'ไปโรงแรมแกรนด์พาเลซครับ/ค่ะ', correct: true },
          { en: 'I go to there.', th: 'ฉันไปที่นั่น', why: 'คนขับไม่รู้ว่า "ที่นั่น" คือที่ไหน — บอกชื่อสถานที่ชัด ๆ: To..., please.' },
          { en: 'You drive good?', th: 'คุณขับดีหรือเปล่า', why: 'ยังไม่ได้บอกจุดหมายเลย — บอกก่อนว่าจะไปไหน' }
        ]
      },
      {
        npc: 'Sure. Do you want to take the highway? It is faster but there is a toll.',
        th: 'ได้ครับ ขึ้นทางด่วนไหมครับ เร็วกว่าแต่มีค่าทางด่วน',
        choices: [
          { en: "Yes, let's take the highway. I'm in a hurry.", th: 'ครับ/ค่ะ ขึ้นทางด่วนเลย กำลังรีบพอดี', correct: true },
          { en: 'Highway is you pay.', th: 'ทางด่วนคุณจ่ายนะ', why: 'ปกติผู้โดยสารเป็นคนจ่ายค่าทางด่วน 😄 ตอบรับว่า Yes, let\'s take the highway.' },
          { en: 'I hurry you fast fast.', th: '(เรียงคำผิด)', why: 'บอกว่ารีบใช้ I\'m in a hurry. เป็นสำนวนมาตรฐาน' }
        ]
      },
      {
        npc: 'No problem. Could you put on your seatbelt, please?',
        th: 'ได้ครับ รบกวนคาดเข็มขัดนิรภัยด้วยนะครับ',
        choices: [
          { en: 'Oh, sure. Thanks for the reminder.', th: 'อ๋อ ได้เลยครับ/ค่ะ ขอบคุณที่เตือน', correct: true },
          { en: 'Seatbelt is not my style.', th: 'เข็มขัดนิรภัยไม่ใช่สไตล์ฉัน', why: 'อันตรายและผิดกฎหมาย! ตอบรับว่า Sure แล้วคาดเข็มขัด' },
          { en: 'You belt yourself.', th: 'คุณคาดของคุณเองสิ', why: 'เขาเตือนด้วยความหวังดี — ตอบว่า Oh, sure. แล้วทำตาม' }
        ]
      },
      {
        npc: 'Traffic is quite heavy today. It might take about thirty minutes.',
        th: 'วันนี้รถติดมากเลยครับ อาจใช้เวลาราวสามสิบนาที',
        choices: [
          { en: "That's fine. Better safe than sorry.", th: 'ไม่เป็นไรครับ/ค่ะ ช้าแต่ปลอดภัยดีกว่า', correct: true },
          { en: 'Thirty minutes I die.', th: 'สามสิบนาทีฉันตายพอดี', why: 'โอเวอร์ไปหน่อย 😅 — ตอบรับสุภาพว่า That\'s fine. หรือ No problem.' },
          { en: 'Drive on the sky.', th: 'ขับบนฟ้าเลย', why: 'แท็กซี่บินไม่ได้นะ — สำนวนที่ใช้ได้คือ That\'s fine, no rush. (ไม่รีบ)' }
        ]
      },
      {
        npc: 'Here we are — the Grand Palace Hotel. That will be 180 baht.',
        th: 'ถึงแล้วครับ โรงแรมแกรนด์พาเลซ ทั้งหมด 180 บาทครับ',
        choices: [
          { en: 'Here is 200. Keep the change!', th: 'นี่ 200 ครับ/ค่ะ ไม่ต้องทอน', correct: true },
          { en: 'Money is in my heart.', th: 'เงินอยู่ในใจฉัน', why: 'คนขับรับเงินในใจไม่ได้ 😄 — จ่ายเงินแล้วอาจพูดว่า Keep the change. (ไม่ต้องทอน)' },
          { en: 'I pay next time see you.', th: 'ไว้จ่ายคราวหน้านะ', why: 'ต้องจ่ายตอนนี้เลย — Here is 200. Keep the change! เป็นประโยคที่ใช้จริงบ่อยมาก' }
        ]
      }
    ],
    keyPhrases: [
      { en: 'To ..., please.', th: 'ไป... ครับ/ค่ะ (บอกจุดหมาย)' },
      { en: "I'm in a hurry.", th: 'ฉันกำลังรีบ' },
      { en: 'How long will it take?', th: 'ใช้เวลานานแค่ไหน' },
      { en: 'Keep the change.', th: 'ไม่ต้องทอนครับ/ค่ะ' }
    ]
  },

  /* ========== 5. ซื้อเสื้อผ้า (ระดับ 2) ========== */
  {
    id: 'shopping', title: 'ซื้อเสื้อที่ห้าง', icon: '🛍️', level: 2, npcName: 'Shop Assistant',
    intro: 'คุณเห็นเสื้อเชิ้ตสวยถูกใจในร้านเสื้อผ้า พนักงานเดินเข้ามาพอดี',
    steps: [
      {
        npc: 'Hi there! Are you looking for anything in particular?',
        th: 'สวัสดีค่ะ กำลังมองหาอะไรเป็นพิเศษไหมคะ',
        choices: [
          { en: "Yes, I'm interested in this shirt. Do you have it in blue?", th: 'ค่ะ/ครับ สนใจเสื้อตัวนี้ มีสีน้ำเงินไหม', correct: true },
          { en: 'I look you particular.', th: '(เรียงคำผิด)', why: 'โครงสร้างที่ใช้ได้: I\'m looking for... (กำลังหา...) หรือ I\'m interested in... (สนใจ...)' },
          { en: 'No talk. Only walk.', th: 'ไม่คุย เดินอย่างเดียว', why: 'ถ้าแค่ดูเฉย ๆ พูดสุภาพ ๆ ว่า I\'m just looking, thanks. (ขอดูก่อนนะคะ/ครับ)' }
        ]
      },
      {
        npc: 'We do! Here is the blue one. What size do you wear?',
        th: 'มีค่ะ นี่สีน้ำเงินค่ะ ปกติใส่ไซซ์อะไรคะ',
        choices: [
          { en: 'Usually a medium, but it depends on the brand.', th: 'ปกติไซซ์ M แต่ก็แล้วแต่แบรนด์', correct: true },
          { en: 'Size of my body is body size.', th: '(วนไปวนมา)', why: 'บอกไซซ์ตรง ๆ เช่น A medium, please. หรือ I usually wear a medium.' },
          { en: 'You guess me.', th: 'คุณทายสิ', why: 'ให้พนักงานเดาไซซ์เราคงลำบาก 😄 — บอกไซซ์ที่ใส่ประจำไปเลย' }
        ]
      },
      {
        npc: 'Here is a medium. The fitting room is right over there.',
        th: 'นี่ไซซ์ M ค่ะ ห้องลองอยู่ตรงนั้นเลยค่ะ',
        choices: [
          { en: 'Thanks! I\'ll try it on.', th: 'ขอบคุณค่ะ/ครับ ขอลองหน่อยนะ', correct: true },
          { en: 'I wear here now.', th: 'ฉันจะเปลี่ยนตรงนี้เลย', why: 'ต้องลองในห้องลองเสื้อ (fitting room) — พูดว่า I\'ll try it on. (ขอลองใส่)' },
          { en: 'Room is fitting me?', th: '(สับสน)', why: 'สำนวนที่ถูกคือ try on = ลองใส่เสื้อผ้า เช่น I\'ll try it on.' }
        ]
      },
      {
        npc: 'How does it fit?',
        th: 'เป็นอย่างไรบ้างคะ พอดีไหม',
        choices: [
          { en: "It's a bit tight. Could I try a large instead?", th: 'มันคับไปนิดหนึ่ง ขอลองไซซ์ L แทนได้ไหม', correct: true },
          { en: 'The shirt eats my body.', th: 'เสื้อกินตัวฉัน', why: 'บรรยายว่าคับใช้ It\'s a bit tight. (คับไปนิด) หรือ It\'s too small.' },
          { en: 'Fit is not fitting the fit.', th: '(วนไปวนมา)', why: 'ตอบเรื่องความพอดี เช่น It fits well. (พอดี) / It\'s a bit tight. (คับไปนิด)' }
        ]
      },
      {
        npc: 'Of course! ... The large looks great on you. It is also 20% off today.',
        th: 'ได้ค่ะ ... ไซซ์ L ใส่แล้วดูดีมากเลยค่ะ วันนี้ลด 20% ด้วยนะคะ',
        choices: [
          { en: "Great timing! I'll take it.", th: 'จังหวะดีจริง ๆ งั้นเอาตัวนี้ล่ะ', correct: true },
          { en: 'You take it for me free.', th: 'งั้นคุณจ่ายให้ฟรีเลยสิ', why: 'ส่วนลด 20% ไม่ใช่ฟรี 😄 — ตกลงซื้อพูดว่า I\'ll take it.' },
          { en: 'Twenty percent is my percent.', th: '(ความหมายเพี้ยน)', why: 'ประโยคตกลงซื้อที่ใช้จริงคือ I\'ll take it. (เอาตัวนี้แหละ)' }
        ]
      },
      {
        npc: 'Would you like to pay by cash or card? And do you need the receipt?',
        th: 'ชำระเงินสดหรือบัตรดีคะ แล้วรับใบเสร็จไหมคะ',
        choices: [
          { en: 'By card, and yes, I\'d like the receipt, please.', th: 'บัตรค่ะ/ครับ และขอใบเสร็จด้วย', correct: true },
          { en: 'Cash card both no.', th: 'เงินสดบัตรไม่เอาทั้งคู่', why: 'ต้องเลือกวิธีจ่ายอย่างหนึ่ง: By cash หรือ By card' },
          { en: 'Receipt eat I can?', th: '(เรียงคำผิด)', why: 'ใบเสร็จเอาไว้เก็บ ไม่ใช่กิน 😅 — I\'d like the receipt, please. = ขอใบเสร็จด้วย' }
        ]
      }
    ],
    keyPhrases: [
      { en: 'Do you have this in (blue / a medium)?', th: 'มีตัวนี้สี.../ไซซ์... ไหม' },
      { en: 'Can I try it on?', th: 'ขอลองใส่ได้ไหม' },
      { en: "It's a bit tight / loose.", th: 'มันคับ/หลวมไปนิด' },
      { en: "I'll take it.", th: 'เอาตัวนี้แหละ (ตกลงซื้อ)' }
    ]
  },

  /* ========== 6. เช็คอินโรงแรม (ระดับ 2) ========== */
  {
    id: 'hotel', title: 'เช็คอินโรงแรม', icon: '🏨', level: 2, npcName: 'Receptionist',
    intro: 'คุณเดินทางมาถึงโรงแรมที่จองไว้ พนักงานต้อนรับรอให้บริการอยู่',
    steps: [
      {
        npc: 'Good afternoon, welcome to the Riverside Hotel. How may I help you?',
        th: 'สวัสดีค่ะ ยินดีต้อนรับสู่โรงแรมริเวอร์ไซด์ มีอะไรให้ช่วยไหมคะ',
        choices: [
          { en: 'Hi, I have a reservation under the name Somchai.', th: 'สวัสดีครับ ผมจองห้องไว้ในชื่อสมชายครับ', correct: true },
          { en: 'I sleep here tonight, OK?', th: 'ฉันจะนอนที่นี่คืนนี้ โอเคนะ', why: 'บอกว่าจองไว้แล้วด้วยประโยค I have a reservation under the name... เป็นทางการกว่า' },
          { en: 'Room me give fast.', th: '(เรียงคำผิด)', why: 'เริ่มด้วยการแจ้งว่าจองห้องไว้: I have a reservation under the name...' }
        ]
      },
      {
        npc: 'Let me check... Yes, a deluxe room for two nights. May I see your passport, please?',
        th: 'ขอตรวจสอบสักครู่นะคะ... พบแล้วค่ะ ห้องดีลักซ์สองคืน ขอดูหนังสือเดินทางหน่อยค่ะ',
        choices: [
          { en: 'Sure, here you go.', th: 'ได้ครับ นี่ครับ', correct: true },
          { en: 'Why? You police?', th: 'ทำไม คุณเป็นตำรวจเหรอ', why: 'โรงแรมขอดูพาสปอร์ตเป็นเรื่องปกติ — ยื่นให้พร้อมพูดว่า Here you go.' },
          { en: 'Passport is my secret.', th: 'พาสปอร์ตคือความลับของฉัน', why: 'เช็คอินโรงแรมต้องแสดงเอกสาร — Here you go. = นี่ครับ/ค่ะ (ตอนยื่นของให้)' }
        ]
      },
      {
        npc: 'Thank you. Breakfast is served from 6 to 10 a.m. on the second floor.',
        th: 'ขอบคุณค่ะ อาหารเช้าเสิร์ฟ 6 ถึง 10 โมงเช้าที่ชั้นสองนะคะ',
        choices: [
          { en: 'Good to know. Is Wi-Fi included in the room?', th: 'ดีเลยครับ แล้วห้องมีไวไฟให้ไหมครับ', correct: true },
          { en: 'Breakfast come to my bed.', th: 'ให้อาหารเช้ามาหาที่เตียงเลย', why: 'ถ้าอยากได้รูมเซอร์วิสต้องถามว่า Do you have room service? — ประโยคนี้เหมือนสั่งให้อาหารเดินมาเอง 😄' },
          { en: 'Six to ten is too many hour.', th: '(ผิดแกรมมาร์)', why: 'hours ต้องเติม s และความหมายก็แปลก — ตอบรับแล้วถามข้อมูลเพิ่ม เช่น Is Wi-Fi included?' }
        ]
      },
      {
        npc: 'Yes, free Wi-Fi throughout the hotel. Here is your key card — room 507 on the fifth floor.',
        th: 'มีค่ะ ไวไฟฟรีทั่วโรงแรม นี่คีย์การ์ดค่ะ ห้อง 507 ชั้นห้า',
        choices: [
          { en: 'Thank you. What time is check-out?', th: 'ขอบคุณครับ เช็คเอาท์กี่โมงครับ', correct: true },
          { en: 'I never check out. I live here.', th: 'ฉันไม่เช็คเอาท์ ฉันจะอยู่ที่นี่เลย', why: 'จองไว้แค่สองคืนนะ 😅 — ถามเวลาเช็คเอาท์: What time is check-out?' },
          { en: 'Five-oh-seven is my lucky.', th: '(ผิดแกรมมาร์)', why: 'ต้องเป็น my lucky number — และควรถามข้อมูลสำคัญอย่างเวลาเช็คเอาท์' }
        ]
      },
      {
        npc: 'Check-out is at noon. Would you like help with your luggage?',
        th: 'เช็คเอาท์เที่ยงวันค่ะ ให้พนักงานช่วยยกกระเป๋าไหมคะ',
        choices: [
          { en: "That's very kind, but I can manage. Thanks!", th: 'ขอบคุณมากครับ แต่ผมยกเองไหว', correct: true },
          { en: 'You carry me too.', th: 'อุ้มฉันขึ้นไปด้วยเลย', why: 'พนักงานช่วยยกกระเป๋า ไม่ได้ช่วยอุ้มแขก 😄 — ปฏิเสธสุภาพ: I can manage, thanks.' },
          { en: 'Luggage is heavy you problem.', th: '(เรียงคำผิด)', why: 'ถ้าอยากให้ช่วยพูดว่า Yes, please. ถ้าไม่ต้องการ: I can manage, thanks.' }
        ]
      }
    ],
    keyPhrases: [
      { en: 'I have a reservation under the name ...', th: 'จองไว้ในชื่อ...' },
      { en: 'Is Wi-Fi included?', th: 'มีไวไฟรวมอยู่ด้วยไหม' },
      { en: 'What time is check-out?', th: 'เช็คเอาท์กี่โมง' },
      { en: 'I can manage, thanks.', th: 'ฉันจัดการเองไหว ขอบคุณ (ปฏิเสธสุภาพ)' }
    ]
  },

  /* ========== 7. ที่สนามบิน (ระดับ 2) ========== */
  {
    id: 'airport', title: 'เช็คอินที่สนามบิน', icon: '✈️', level: 2, npcName: 'Airline Staff',
    intro: 'คุณกำลังจะบินไปสิงคโปร์ ถึงเคาน์เตอร์เช็คอินของสายการบินแล้ว',
    steps: [
      {
        npc: 'Good morning. May I see your passport and booking confirmation?',
        th: 'สวัสดีค่ะ ขอดูหนังสือเดินทางและใบยืนยันการจองค่ะ',
        choices: [
          { en: 'Good morning. Here they are.', th: 'สวัสดีครับ นี่ครับ', correct: true },
          { en: 'You find it yourself.', th: 'คุณหาเองสิ', why: 'เอกสารอยู่กับเรา พนักงานหาเองไม่ได้ — ยื่นให้พร้อมพูด Here they are.' },
          { en: 'Passport is here am I.', th: '(เรียงคำผิด)', why: 'ยื่นของหลายชิ้นพูดว่า Here they are. (ชิ้นเดียวใช้ Here it is.)' }
        ]
      },
      {
        npc: 'Thank you. Would you like a window seat or an aisle seat?',
        th: 'ขอบคุณค่ะ รับที่นั่งริมหน้าต่างหรือริมทางเดินดีคะ',
        choices: [
          { en: 'A window seat, please. I love the view.', th: 'ริมหน้าต่างครับ ชอบดูวิว', correct: true },
          { en: 'I sit on the wing.', th: 'ฉันจะนั่งบนปีกเครื่องบิน', why: 'นั่งบนปีกไม่ได้แน่นอน 😄 — เลือก window seat (ริมหน้าต่าง) หรือ aisle seat (ริมทางเดิน)' },
          { en: 'Seat is seat. Whatever seat.', th: '(ห้วนเกินไป)', why: 'ถ้าไม่มีที่นั่งที่ชอบเป็นพิเศษ พูดสุภาพ ๆ ว่า Either is fine. (แบบไหนก็ได้)' }
        ]
      },
      {
        npc: 'Are you checking in any bags today?',
        th: 'วันนี้มีกระเป๋าโหลดใต้เครื่องไหมคะ',
        choices: [
          { en: 'Yes, just this one suitcase.', th: 'ครับ กระเป๋าใบนี้ใบเดียว', correct: true },
          { en: 'My bag is my body.', th: 'กระเป๋าคือร่างกายฉัน', why: 'บอกจำนวนกระเป๋าที่จะโหลด เช่น Just this one. หรือ No, only carry-on. (มีแค่ถือขึ้นเครื่อง)' },
          { en: 'Check my bag in the sky.', th: '(สับสน)', why: 'check in a bag = โหลดกระเป๋าใต้เครื่อง ตอบว่า Yes, just this one.' }
        ]
      },
      {
        npc: 'Your bag is slightly overweight — 24 kilos. The limit is 23.',
        th: 'กระเป๋าน้ำหนักเกินเล็กน้อยค่ะ 24 กิโล เกณฑ์คือ 23 กิโล',
        choices: [
          { en: 'Oh! Let me take something out and put it in my carry-on.', th: 'อุ๊ย งั้นขอเอาของออกไปใส่กระเป๋าถือแทน', correct: true },
          { en: 'One kilo is nothing. You sleep one eye.', th: 'กิโลเดียวเอง หลับตาข้างหนึ่งสิ', why: '"หลับตาข้างหนึ่ง" เป็นสำนวนไทย ภาษาอังกฤษไม่ใช้แบบนี้ — ทางแก้คือย้ายของไปกระเป๋าถือ' },
          { en: 'The scale is lying to you.', th: 'ตาชั่งโกหกคุณอยู่', why: 'โทษตาชั่งไม่ช่วยอะไร 😅 — เสนอทางแก้: Let me take something out.' }
        ]
      },
      {
        npc: 'Perfect, 22.8 kilos now. Here is your boarding pass. Boarding starts at 10:30 at gate D4.',
        th: 'เรียบร้อยค่ะ 22.8 กิโล นี่บัตรขึ้นเครื่องค่ะ เริ่มขึ้นเครื่อง 10:30 ที่ประตู D4',
        choices: [
          { en: 'Thank you. Which way is the security check?', th: 'ขอบคุณครับ จุดตรวจความปลอดภัยไปทางไหนครับ', correct: true },
          { en: 'D4 is far? I no walk.', th: '(ผิดแกรมมาร์)', why: 'ถามทางที่ถูก: Which way is...? หรือ How do I get to gate D4?' },
          { en: 'I board now immediately first.', th: 'ฉันจะขึ้นเครื่องเดี๋ยวนี้เลยคนแรก', why: 'ต้องผ่านจุดตรวจความปลอดภัย (security check) ก่อนเสมอ — ถามทางไปจุดตรวจก่อน' }
        ]
      }
    ],
    keyPhrases: [
      { en: 'A window seat / an aisle seat, please.', th: 'ขอที่นั่งริมหน้าต่าง / ริมทางเดิน' },
      { en: 'Are you checking in any bags?', th: 'มีกระเป๋าโหลดใต้เครื่องไหม' },
      { en: 'Here is your boarding pass.', th: 'นี่บัตรขึ้นเครื่องของคุณ' },
      { en: 'Which way is the security check?', th: 'จุดตรวจความปลอดภัยไปทางไหน' }
    ]
  },

  /* ========== 8. ไปหาหมอ (ระดับ 2) ========== */
  {
    id: 'doctor', title: 'ไปหาหมอ', icon: '🩺', level: 2, npcName: 'Doctor',
    intro: 'คุณรู้สึกไม่สบายมาสองสามวัน เลยตัดสินใจไปคลินิก',
    steps: [
      {
        npc: 'Hello, please have a seat. What seems to be the problem?',
        th: 'สวัสดีครับ เชิญนั่งครับ เป็นอะไรมาครับ',
        choices: [
          { en: "I've had a sore throat and a cough for three days.", th: 'เจ็บคอและไอมาสามวันแล้วครับ/ค่ะ', correct: true },
          { en: 'Problem is my life.', th: 'ปัญหาคือชีวิตฉัน', why: 'หมอถามอาการป่วย — บอกอาการ เช่น I have a sore throat. (เจ็บคอ)' },
          { en: 'You tell me. You doctor.', th: 'คุณบอกฉันสิ คุณเป็นหมอ', why: 'หมอต้องรู้อาการจากเราก่อนถึงจะวินิจฉัยได้ — เล่าอาการที่เป็น' }
        ]
      },
      {
        npc: 'I see. Do you have a fever as well?',
        th: 'เข้าใจแล้วครับ มีไข้ด้วยไหมครับ',
        choices: [
          { en: 'A slight fever last night, around 37.8.', th: 'มีไข้ต่ำ ๆ เมื่อคืน ประมาณ 37.8 องศา', correct: true },
          { en: 'Fever? What is fever? I am fever.', th: '(สับสน)', why: 'fever = ไข้ — ตอบว่ามีหรือไม่มี เช่น Yes, a slight fever. / No, no fever.' },
          { en: 'My body is hot because I am hot.', th: 'ตัวฉันร้อนเพราะฉันฮอต', why: 'hot ในความหมายนี้กำกวม 😄 — บอกว่ามีไข้ใช้ I have a fever.' }
        ]
      },
      {
        npc: 'Any allergies to medication that I should know about?',
        th: 'มีประวัติแพ้ยาอะไรไหมครับ',
        choices: [
          { en: "I'm allergic to penicillin.", th: 'แพ้ยาเพนิซิลลินครับ/ค่ะ', correct: true },
          { en: 'I allergy everything in the world.', th: '(ผิดแกรมมาร์)', why: 'allergy เป็นคำนาม — ประโยคที่ถูกคือ I\'m allergic to... (ฉันแพ้...)' },
          { en: 'Medicine never wins against me.', th: 'ยาไม่เคยชนะฉัน', why: 'หมอถามเรื่องแพ้ยาซึ่งสำคัญมาก — ตอบตรง ๆ ว่าแพ้อะไร หรือ No allergies. (ไม่แพ้)' }
        ]
      },
      {
        npc: 'Noted. It looks like a mild throat infection. I will prescribe some antibiotics.',
        th: 'รับทราบครับ ดูเหมือนคออักเสบเล็กน้อย หมอจะจ่ายยาปฏิชีวนะให้นะครับ',
        choices: [
          { en: 'How often should I take them?', th: 'ต้องกินยาบ่อยแค่ไหนครับ/คะ', correct: true },
          { en: 'Antibiotics are my enemy troops.', th: '(ความหมายเพี้ยน)', why: 'คำถามสำคัญตอนรับยา: How often should I take them? (กินบ่อยแค่ไหน)' },
          { en: 'I eat all now, finish fast.', th: 'กินหมดตอนนี้เลย จะได้หายไว', why: 'อันตรายมาก! ยาต้องกินตามหมอสั่ง — ถามวิธีกิน: How often should I take them?' }
        ]
      },
      {
        npc: 'Twice a day after meals, for five days. And get plenty of rest.',
        th: 'วันละสองครั้งหลังอาหาร ห้าวันนะครับ แล้วก็พักผ่อนเยอะ ๆ',
        choices: [
          { en: 'Understood. Should I come back if it doesn\'t improve?', th: 'เข้าใจแล้วครับ ถ้าไม่ดีขึ้นควรกลับมาอีกไหม', correct: true },
          { en: 'Rest is for weak people.', th: 'การพักผ่อนมีไว้สำหรับคนอ่อนแอ', why: 'หมอแนะนำให้พัก ควรรับฟัง — ถามต่อว่าถ้าไม่ดีขึ้นควรทำอย่างไร' },
          { en: 'Five days no eat, only medicine.', th: 'ห้าวันไม่กินข้าว กินแต่ยา', why: 'หมอบอกกิน "หลังอาหาร" แปลว่าต้องกินข้าวด้วย! ฟังคำสั่งยาให้ดี' }
        ]
      }
    ],
    keyPhrases: [
      { en: "I've had (a sore throat) for (three days).", th: 'มีอาการ... มา ... วันแล้ว' },
      { en: "I'm allergic to ...", th: 'ฉันแพ้...' },
      { en: 'How often should I take them?', th: 'กินยาบ่อยแค่ไหน' },
      { en: 'Get plenty of rest.', th: 'พักผ่อนเยอะ ๆ' }
    ]
  },

  /* ========== 9. ที่ธนาคาร (ระดับ 3) ========== */
  {
    id: 'bank', title: 'เปิดบัญชีธนาคาร', icon: '🏦', level: 3, npcName: 'Bank Officer',
    intro: 'คุณต้องการเปิดบัญชีออมทรัพย์ที่ธนาคาร พนักงานเรียกคิวของคุณ',
    steps: [
      {
        npc: 'Good morning. What can I do for you today?',
        th: 'สวัสดีค่ะ วันนี้ให้ช่วยอะไรดีคะ',
        choices: [
          { en: "I'd like to open a savings account, please.", th: 'ต้องการเปิดบัญชีออมทรัพย์ครับ/ค่ะ', correct: true },
          { en: 'I want to keep my money inside your building.', th: 'อยากเก็บเงินไว้ในตึกของคุณ', why: 'ความหมายพอเดาได้แต่ไม่เป็นธรรมชาติ — ใช้ I\'d like to open a savings account.' },
          { en: 'Money sleep here, can or not?', th: '(ไม่เป็นประโยคมาตรฐาน)', why: 'สำนวนที่ถูก: I\'d like to open an account. — "can or not" เป็นสำนวนที่ไม่ใช้ในภาษาอังกฤษมาตรฐาน' }
        ]
      },
      {
        npc: 'Certainly. Could I see some identification? A passport or ID card will do.',
        th: 'ได้ค่ะ ขอดูเอกสารยืนยันตัวตนหน่อยค่ะ พาสปอร์ตหรือบัตรประชาชนก็ได้',
        choices: [
          { en: 'Here is my ID card. Do you need anything else?', th: 'นี่บัตรประชาชนครับ ต้องใช้อะไรอีกไหม', correct: true },
          { en: 'My face is my ID.', th: 'หน้าฉันนี่แหละคือบัตรประชาชน', why: 'ธนาคารต้องใช้เอกสารจริง — ยื่นบัตรพร้อมถามว่าต้องใช้อะไรเพิ่ม' },
          { en: 'Identification of what is why?', th: '(สับสน)', why: 'ยื่นเอกสารพร้อมพูด Here is my ID card. แล้วถามต่อว่า Do you need anything else?' }
        ]
      },
      {
        npc: 'Thank you. Would you also like to apply for mobile banking? There is no annual fee.',
        th: 'ขอบคุณค่ะ สนใจสมัครโมบายแบงก์กิ้งด้วยไหมคะ ไม่มีค่าธรรมเนียมรายปี',
        choices: [
          { en: 'That sounds convenient. What documents do I need for that?', th: 'สะดวกดีนะครับ ต้องใช้เอกสารอะไรเพิ่มไหม', correct: true },
          { en: 'No fee? What is the catch?', th: 'ฟรีเหรอ มีเงื่อนไขแอบแฝงอะไรหรือเปล่า', why: 'จริง ๆ ประโยคนี้ใช้ได้ในบางบริบท แต่กับพนักงานธนาคารฟังดูไม่ไว้ใจเกินไป — ถามรายละเอียดสุภาพ ๆ ดีกว่า' },
          { en: 'Mobile is banking my phone yes.', th: '(เรียงคำผิด)', why: 'ตอบรับและถามข้อมูลเพิ่ม: That sounds convenient. What do I need?' }
        ]
      },
      {
        npc: 'Just this form and your signature. How much would you like to deposit initially?',
        th: 'แค่กรอกฟอร์มนี้และเซ็นชื่อค่ะ ฝากเงินเริ่มต้นเท่าไหร่ดีคะ',
        choices: [
          { en: "I'll start with 2,000 baht.", th: 'เริ่มที่ 2,000 บาทครับ/ค่ะ', correct: true },
          { en: 'Deposit my dream, one million.', th: 'ฝากความฝันหนึ่งล้าน', why: 'บอกจำนวนเงินจริงที่จะฝาก: I\'ll start with... / I\'d like to deposit...' },
          { en: 'You choose for me my money.', th: 'คุณเลือกให้ฉันเลยเงินของฉัน', why: 'จำนวนเงินฝากเราต้องตัดสินใจเอง — บอกตัวเลขที่ต้องการ' }
        ]
      },
      {
        npc: 'All done! Here is your passbook, and the app details have been sent to your phone.',
        th: 'เรียบร้อยค่ะ นี่สมุดบัญชี ส่วนรายละเอียดแอปส่งไปที่มือถือแล้วนะคะ',
        choices: [
          { en: 'Wonderful. You\'ve been very helpful — thank you!', th: 'เยี่ยมเลยครับ คุณช่วยได้เยอะมาก ขอบคุณครับ', correct: true },
          { en: 'Book of pass is mine now.', th: '(เรียงคำผิด)', why: 'passbook = สมุดบัญชี — ปิดท้ายด้วยคำขอบคุณ: You\'ve been very helpful.' },
          { en: 'If my money disappears, I know you.', th: 'ถ้าเงินหาย ฉันรู้นะว่าคุณเป็นใคร', why: 'ฟังดูเป็นการข่มขู่ 😅 — จบบทสนทนาด้วยการขอบคุณดีกว่า' }
        ]
      }
    ],
    keyPhrases: [
      { en: "I'd like to open a savings account.", th: 'ต้องการเปิดบัญชีออมทรัพย์' },
      { en: 'Could I see some identification?', th: 'ขอดูเอกสารยืนยันตัวตน' },
      { en: "I'd like to deposit / withdraw ...", th: 'ต้องการฝาก / ถอนเงิน...' },
      { en: "You've been very helpful.", th: 'คุณช่วยได้เยอะมาก (คำชมสุภาพ)' }
    ]
  },

  /* ========== 10. คุยเล่นกับเพื่อนใหม่ (ระดับ 3) ========== */
  {
    id: 'smalltalk', title: 'ผูกมิตรกับเพื่อนใหม่', icon: '💬', level: 3, npcName: 'Alex',
    intro: 'ในงานสัมมนา คุณนั่งข้างชาวต่างชาติชื่ออเล็กซ์ เขาหันมาทักทาย',
    steps: [
      {
        npc: "Hi! I don't think we've met. I'm Alex, from the marketing team.",
        th: 'สวัสดีครับ เราคงยังไม่เคยเจอกัน ผมอเล็กซ์ จากทีมการตลาด',
        choices: [
          { en: "Nice to meet you, Alex. I'm Fah — I work in design.", th: 'ยินดีที่ได้รู้จักครับ/ค่ะ ฉันฟ้า ทำงานฝ่ายออกแบบ', correct: true },
          { en: 'Yes, we never meet. Goodbye.', th: 'ใช่ เราไม่เคยเจอกัน ลาก่อน', why: 'เขากำลังชวนคุย อย่าเพิ่งรีบจบ 😅 — แนะนำตัวกลับ: Nice to meet you, I\'m...' },
          { en: 'I know you already from my dream.', th: 'ฉันรู้จักคุณแล้วจากในฝัน', why: 'ฟังดูหลอนไปนิด 😄 — ตอบมาตรฐาน: Nice to meet you + แนะนำตัวเอง' }
        ]
      },
      {
        npc: 'Design! That must be creative work. How long have you been with the company?',
        th: 'ฝ่ายออกแบบ! งานคงต้องใช้ความคิดสร้างสรรค์แน่ ๆ ทำงานที่นี่มานานหรือยังครับ',
        choices: [
          { en: "It's been about three years now. Time flies!", th: 'ก็ราวสามปีแล้ว เวลาผ่านไปเร็วจริง ๆ', correct: true },
          { en: 'Long time no see.', th: 'ไม่ได้เจอกันนานเลย', why: 'Long time no see ใช้ทักคนที่ "เคยรู้จัก" แต่ไม่ได้เจอกันนาน — คำถามนี้ต้องตอบระยะเวลาทำงาน' },
          { en: 'Company is with me three years be.', th: '(เรียงคำผิด)', why: 'ตอบระยะเวลา: It\'s been three years. หรือ About three years.' }
        ]
      },
      {
        npc: 'Three years, nice! By the way, what did you think of the morning session?',
        th: 'สามปีเลย เยี่ยม! ว่าแต่ช่วงสัมมนาเมื่อเช้าเป็นอย่างไรบ้างครับ',
        choices: [
          { en: 'Honestly, it was a bit long, but the last speaker was brilliant.', th: 'บอกตรง ๆ ว่ายาวไปหน่อย แต่วิทยากรคนสุดท้ายเก่งมาก', correct: true },
          { en: 'I sleep with my eyes open.', th: 'ฉันหลับทั้งที่ลืมตา', why: 'ถ้าจะบอกว่าน่าเบื่อ พูดเนียน ๆ ว่า It was a bit long. สุภาพและเป็นธรรมชาติกว่า' },
          { en: 'Session is session. Next question.', th: '(ห้วนเกินไป)', why: 'small talk ต้องแลกเปลี่ยนความเห็นบ้าง — ลองแชร์มุมมองสั้น ๆ พร้อมเหตุผล' }
        ]
      },
      {
        npc: 'Ha! Agreed. Hey, a few of us are grabbing dinner after this. Want to join?',
        th: 'ฮ่า เห็นด้วยเลย เออนี่ พวกเราสองสามคนจะไปกินมื้อค่ำกันต่อ ไปด้วยกันไหม',
        choices: [
          { en: "I'd love to! Where are you guys thinking of going?", th: 'ไปสิ! ว่าจะไปกินที่ไหนกันเหรอ', correct: true },
          { en: 'Who pays? If you pay, I go.', th: 'ใครจ่าย ถ้าคุณจ่ายฉันไป', why: 'ถามตรงเกินไปจนเสียมารยาท — ตอบรับก่อน: I\'d love to! แล้วค่อยถามรายละเอียด' },
          { en: 'Join what? I hear nothing.', th: 'ไปไหน ฉันไม่ได้ยินอะไรเลย', why: 'ถ้าฟังไม่ทันจริง ๆ ใช้ Sorry, could you say that again? สุภาพกว่า' }
        ]
      },
      {
        npc: "There's a great Japanese place around the corner. Let's exchange numbers so I can send you the details.",
        th: 'มีร้านญี่ปุ่นอร่อยอยู่ใกล้ ๆ นี่เอง แลกเบอร์กันไว้เดี๋ยวผมส่งรายละเอียดให้',
        choices: [
          { en: 'Sure thing! Here, let me give you my number.', th: 'ได้เลย! นี่ เดี๋ยวให้เบอร์ฉันนะ', correct: true },
          { en: 'My number is secret national.', th: '(เรียงคำผิด)', why: 'ต้องเป็น national secret (ความลับระดับชาติ) — แต่บริบทนี้ตอบรับดีกว่า: Sure, let me give you my number.' },
          { en: 'You give first. I decide later.', th: 'คุณให้ก่อน ฉันค่อยตัดสินใจ', why: 'ฟังดูเล่นตัวเกินไปกับเพื่อนใหม่ที่หวังดี — ตอบรับอย่างเป็นมิตร: Sure thing!' }
        ]
      },
      {
        npc: 'Awesome. See you at seven then — really nice talking to you!',
        th: 'เยี่ยมเลย งั้นเจอกันหนึ่งทุ่มนะ ดีใจที่ได้คุยด้วยจริง ๆ',
        choices: [
          { en: 'Likewise! Looking forward to it.', th: 'เช่นกันครับ/ค่ะ รอเจอกันเลยนะ', correct: true },
          { en: 'Seven o\'clock maybe I come maybe not.', th: 'หนึ่งทุ่มอาจจะไปหรือไม่ไปก็ได้', why: 'ตอบรับนัดแล้วควรยืนยันชัดเจน — Looking forward to it. = ตั้งตารอเลย' },
          { en: 'Talking is finish now.', th: '(ผิดแกรมมาร์)', why: 'จบบทสนทนาอบอุ่น ๆ ว่า Likewise! (เช่นกัน) — ใช้ตอบคำชมหรือคำอวยพรแบบเดียวกัน' }
        ]
      }
    ],
    keyPhrases: [
      { en: "I don't think we've met. I'm ...", th: 'เราคงยังไม่เคยเจอกัน ฉันชื่อ... (เปิดบทสนทนา)' },
      { en: 'How long have you been ...?', th: 'คุณ...มานานแค่ไหนแล้ว' },
      { en: "I'd love to!", th: 'อยากไปมาก! (ตอบรับคำชวน)' },
      { en: 'Likewise!', th: 'เช่นกันครับ/ค่ะ' }
    ]
  }
];
