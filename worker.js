// ============================================================
// Truth or Dare Telegram Bot — Cloudflare Workers (single file)
// Сгенерировано для деплоя через dash.cloudflare.com
// ============================================================

// content.js — тексты интерфейса + генератор 250+ вопросов и действий на 3 языках

// ---------- Наполнители (используются в шаблонах) ----------
const FILLERS = {
  ru: [
    'игроку слева от тебя', 'самому младшему в игре', 'самому старшему в игре',
    'тому, кто последний писал в чат', 'организатору игры', 'первому, кто согласился играть',
    'самому молчаливому игроку', 'тому, кого ты знаешь дольше всех', 'последнему, кто выбрал действие',
    'тому, кто сегодня меньше всех писал в чат', 'случайному игроку по твоему выбору', 'своему соседу по переписке'
  ],
  en: [
    'the player to your left', 'the youngest player here', 'the oldest player here',
    'whoever spoke last in the chat', 'the person who started this game', 'the first person who agreed to play',
    'the quietest player', 'the player you have known the longest', 'whoever picked Dare last',
    "whoever's said the least today", 'a random player of your choice', 'your neighbor in the chat'
  ],
  az: [
    'sənin solundakı oyunçuya', 'otaqdakı ən gənc oyunçuya', 'otaqdakı ən yaşlı oyunçuya',
    'söhbətdə sonuncu yazana', 'oyunu başladan şəxsə', 'oynamağa ilk razı olana',
    'ən sakit oyunçuya', 'ən uzun tanıdığın oyunçuya', 'son dəfə "Hərəkət" seçənə',
    'bu gün az yazana', 'seçdiyin təsadüfi oyunçuya', 'söhbətdəki qonşuna'
  ]
};

// ---------- Шаблоны "Правда" ----------
const TRUTH_TEMPLATES = {
  ru: [
    'Как ты относишься к {F}?', 'Что бы ты хотел сказать {F}, если бы не боялся?',
    'Какой совет ты бы дал {F}?', 'Доверяешь ли ты {F}? Почему?',
    'Какой искренний комплимент ты бы сделал {F}?', 'Что тебя раздражает в {F}?',
    'Какую тайну ты мог бы доверить {F}?', 'Что смешного ты можешь рассказать {F}?',
    'Какое первое впечатление у тебя было о {F}?', 'Задай неудобный вопрос {F} прямо сейчас.',
    'Что ты никогда не говорил {F}, но хотел бы?', 'Какую помощь ты бы оказал {F}, если бы мог?',
    'Что общего у тебя с {F}?', 'Какую черту характера ты бы хотел позаимствовать у {F}?',
    'Признайся, завидовал ли ты когда-нибудь {F}?', 'Какой подарок ты бы выбрал для {F}?',
    'Что бы ты пожелал {F} на день рождения?', 'Какую шутку про себя ты готов рассказать {F}?',
    'Расскажи {F} о своём самом неловком моменте.', 'Что бы ты изменил в своей дружбе с {F}?'
  ],
  en: [
    'How do you really feel about {F}?', "What would you tell {F} if you weren't afraid?",
    'What advice would you give {F}?', 'Do you trust {F}? Why or why not?',
    'What honest compliment would you give {F}?', 'What annoys you about {F}?',
    'What secret could you trust {F} with?', "What's the funniest thing you could tell {F}?",
    'What was your first impression of {F}?', 'Ask {F} an awkward question right now.',
    "What have you never told {F} but wanted to?", 'How would you help {F} if you could?',
    'What do you have in common with {F}?', 'What trait would you like to borrow from {F}?',
    'Have you ever been jealous of {F}?', 'What gift would you pick for {F}?',
    'What would you wish {F} for their birthday?', 'What joke about yourself are you willing to tell {F}?',
    'Tell {F} about your most awkward moment.', 'What would you change about your friendship with {F}?'
  ],
  az: [
    '{F} haqqında həqiqətən nə düşünürsən?', 'Qorxmasaydın, {F} nə deyərdin?',
    '{F} hansı məsləhəti verərdin?', '{F} güvənirsənmi? Niyə?',
    '{F} hansı səmimi kompliment edərdin?', '{F} səni nə əsəbləşdirir?',
    'Hansı sirri {F} etibar edə bilərsən?', '{F} deyə biləcəyin ən gülməli şey nədir?',
    '{F} haqqında ilk təəssüratın nə idi?', 'İndi {F} narahat bir sual ver.',
    '{F} heç vaxt demədiyin amma demək istədiyin nə var?', 'Bacarsan {F} necə kömək edərdin?',
    'Səninlə {F} arasında ortaq nə var?', '{F} hansı xüsusiyyəti götürmək istərdin?',
    'Heç {F} qısqanmısan?', '{F} üçün hansı hədiyyəni seçərdin?',
    '{F} ad gününə nə arzu edərdin?', '{F} özün haqqında hansı zarafatı danışa bilərsən?',
    '{F} ən utancverici anını danış.', '{F} ilə dostluğunda nəyi dəyişərdin?', '{F} sənə görə ən çox nəyi ilə seçilir?'
  ]
};

// ---------- Шаблоны "Действие" ----------
const DARE_TEMPLATES = {
  ru: [
    'Сделай искренний комплимент {F}.', 'Напиши смешное сообщение {F} прямо сейчас.',
    'Отправь голосовое сообщение с небольшим признанием {F}.', 'Придумай смешное прозвище для {F}.',
    'Спой одну строчку любимой песни, посвятив её {F}.', 'Расскажи анекдот специально для {F}.',
    'Опиши {F} тремя словами вслух.', 'Изобрази походку {F}.',
    'Напиши короткое стихотворение, посвящённое {F}.', 'Пришли смешной эмодзи-портрет {F}.',
    'Признайся {F} в чём-то незначительном, но правдивом.', 'Пожелай удачи {F} необычным способом.',
    'Сделай голосовое приветствие специально для {F}.', 'Придумай тост в честь {F}.',
    'Напиши хайку, посвящённое {F}.', 'Изобрази бурную радость, обращаясь к {F}.',
    'Расскажи, что бы ты подарил {F} на Новый год.', 'Сделай доброе дело для {F} в течение следующих 10 минут.',
    'Напиши {F} комплимент КАПСОМ.', 'Пришли {F} мем, который напоминает тебе о нём/ней.'
  ],
  en: [
    'Give {F} a genuine compliment right now.', 'Send {F} a funny message this instant.',
    'Send a voice message confessing something small to {F}.', 'Invent a funny nickname for {F}.',
    'Sing one line of a song dedicated to {F}.', 'Tell a joke specifically for {F}.',
    'Describe {F} out loud in three words.', 'Imitate the way {F} walks.',
    'Write a short poem dedicated to {F}.', 'Send an emoji-portrait of {F}.',
    'Confess something small but true to {F}.', 'Wish {F} good luck in a weird way.',
    'Record a voice greeting just for {F}.', 'Make up a toast in honor of {F}.',
    'Write a haiku dedicated to {F}.', 'Act out pure joy while addressing {F}.',
    "Say what you'd get {F} as a New Year's gift.", 'Do something kind for {F} in the next 10 minutes.',
    'Send {F} a compliment IN ALL CAPS.', 'Send {F} a meme that reminds you of them.'
  ],
  az: [
    '{F} indi səmimi kompliment et.', '{F} dərhal gülməli mesaj yaz.',
    '{F} kiçik bir etirafını səsli mesajla göndər.', '{F} üçün gülməli ləqəb uydur.',
    'Bir mahnının bir sətrini {F} həsr edərək oxu.', '{F} üçün xüsusi zarafat danış.',
    '{F} üç sözlə səsli təsvir et.', '{F} yeriyişini təqlid et.',
    '{F} həsr olunmuş qısa şeir yaz.', '{F} emoji-portretini göndər.',
    '{F} kiçik amma doğru bir etiraf et.', '{F} qəribə şəkildə uğur arzula.',
    'Yalnız {F} üçün səsli salamlama yaz.', '{F} şərəfinə tost uydur.',
    '{F} həsr olunmuş haiku yaz.', '{F} müraciət edərək sevinci canlandır.',
    '{F} Yeni il hədiyyəsi kimi nə alacağını de.', 'Növbəti 10 dəqiqədə {F} üçün yaxşı bir iş gör.',
    '{F} BÖYÜK HƏRFLƏRLƏ kompliment yaz.', '{F} onu xatırladan bir mem göndər.'
  ]
};

// ---------- Авторские (самостоятельные) вопросы/действия ----------
const TRUTH_STANDALONE = {
  ru: [
    'Какой твой самый большой страх?', 'Расскажи о самом неловком моменте в твоей жизни.',
    'Какая твоя самая нелепая привычка?', 'Если бы ты мог изменить одну вещь в своей внешности, что бы это было?',
    'Какой самый странный сон тебе снился?', 'Кем ты хотел стать в детстве?',
    'Какая твоя самая большая ложь, в которую все поверили?', 'Что ты сделал бы, если бы стал невидимым на один день?',
    'Какое твоё самое большое достижение, которым ты гордишься?', 'Какой фильм заставил тебя плакать?',
    'Что ты никогда не пробовал, но очень хочешь?', 'Какая твоя вредная привычка, от которой ты хочешь избавиться?',
    'Расскажи о самом странном подарке, который ты получал.', 'Что тебя пугает больше всего в будущем?',
    'Какую суперспособность ты бы выбрал и почему?', 'Расскажи о своём самом безумном поступке.',
    'Какая твоя любимая еда, о которой немного стыдно признаться?', 'Что бы ты сделал, если бы выиграл миллион?',
    'Какое твоё самое большое разочарование?', 'Расскажи смешную историю из школы.',
    'Какая песня тебе стыдно нравится больше всего?', 'Если бы ты мог прожить один день заново, какой бы выбрал?',
    'Какая твоя главная слабость?', 'Расскажи о самой глупой ссоре, в которой ты участвовал.',
    'Какое твоё самое странное увлечение?', 'Что бы ты изменил в своём характере?',
    'Расскажи о самом неудачном свидании или встрече.', 'Какой твой секрет, которым ты готов поделиться прямо сейчас?',
    'Если бы у тебя был один день без последствий, что бы ты сделал?', 'Какая твоя самая большая мечта?',
    'Расскажи о моменте, когда тебе было очень стыдно.', 'Какое животное лучше всего описывает твой характер?',
    'Каким ты видишь себя через 10 лет?', 'Расскажи о самом странном совпадении в твоей жизни.',
    'Какая черта в людях раздражает тебя больше всего?'
  ],
  en: [
    'What is your biggest fear?', 'Tell us about the most awkward moment of your life.',
    'What is your silliest habit?', 'If you could change one thing about your appearance, what would it be?',
    'What is the strangest dream you have ever had?', 'What did you want to be when you grew up?',
    'What is the biggest lie you told that everyone believed?', 'What would you do if you turned invisible for a day?',
    'What achievement are you most proud of?', 'What movie made you cry?',
    "What's something you've never tried but really want to?", 'What bad habit do you wish you could drop?',
    'Tell us about the strangest gift you ever received.', 'What scares you most about the future?',
    'What superpower would you choose and why?', 'Tell us about the craziest thing you have ever done.',
    "What's your favorite food that you're a little embarrassed to admit?", 'What would you do if you won a million dollars?',
    'What is your biggest disappointment?', 'Tell a funny story from your school days.',
    "What's a song you're embarrassed to admit you love?", 'If you could relive one day, which would it be?',
    'What is your biggest weakness?', 'Tell us about the silliest argument you have ever had.',
    'What is your strangest hobby?', 'What would you change about your personality?',
    'Tell us about your most disastrous date or meeting.', "What's a secret you're willing to share right now?",
    'If you had one consequence-free day, what would you do?', 'What is your biggest dream?',
    'Tell us about a moment you felt truly embarrassed.', 'Which animal best describes your personality?',
    'Where do you see yourself in 10 years?', 'Tell us about the strangest coincidence in your life.',
    'What trait in people annoys you the most?'
  ],
  az: [
    'Ən böyük qorxun nədir?', 'Həyatının ən utancverici anını danış.',
    'Ən gülünc vərdişin nədir?', 'Görünüşündə bir şeyi dəyişə bilsəydin, nə olardı?',
    'Ən qəribə yuxu nə idi?', 'Uşaqkən kim olmaq istəyirdin?',
    'Hamının inandığı ən böyük yalanın nə idi?', 'Bir günlüyə görünməz olsaydın nə edərdin?',
    'Ən qürur duyduğun nailiyyətin nədir?', 'Səni ağladan film hansıdır?',
    'Heç sınamadığın amma çox istədiyin şey nədir?', 'Hansı pis vərdişindən qurtulmaq istərdin?',
    'Ən qəribə hədiyyəni danış.', 'Gələcəkdə səni ən çox nə qorxudur?',
    'Hansı super gücü seçərdin və niyə?', 'Ən dəli hərəkətini danış.',
    'Etiraf etməyə utandığın sevimli yeməyin nədir?', 'Milyon qazansan nə edərdin?',
    'Ən böyük məyusluğun nədir?', 'Məktəbdən gülməli bir hadisə danış.',
    'Sevdiyini etiraf etməyə utandığın mahnı hansıdır?', 'Bir günü təkrar yaşaya bilsəydin, hansını seçərdin?',
    'Ən böyük zəifliyin nədir?', 'Ən axmaq mübahisəni danış.',
    'Ən qəribə hobbin nədir?', 'Xarakterində nəyi dəyişərdin?',
    'Ən uğursuz görüşünü danış.', 'İndi bölüşməyə hazır olduğun sirrin nədir?',
    'Nəticəsiz bir günün olsaydı nə edərdin?', 'Ən böyük arzun nədir?',
    'Həqiqətən utandığın bir anı danış.', 'Xarakterini hansı heyvan təsvir edir?',
    '10 ildən sonra özünü harada görürsən?', 'Həyatındakı ən qəribə təsadüfü danış.',
    'İnsanlarda səni ən çox əsəbləşdirən xüsusiyyət nədir?'
  ]
};

const DARE_STANDALONE = {
  ru: [
    'Спой куплет любой песни вслух (или голосовым).', 'Изобрази своего любимого персонажа мультфильма.',
    'Расскажи анекдот как можно смешнее.', 'Напиши в чат самое нелепое описание себя.',
    'Говори следующие 3 сообщения только рифмами.', 'Опиши словами походку робота.',
    'Придумай и расскажи короткую сказку за 30 секунд.', 'Скажи алфавит наоборот как можно быстрее.',
    'Изобрази эмоцию удивления в голосовом сообщении.', 'Напиши сообщение, используя только эмодзи, чтобы остальные угадали смысл.',
    'Расскажи скороговорку три раза подряд.', 'Изобрази диктора новостей и зачитай последнее сообщение в чате.',
    'Придумай себе новое смешное имя и представься им.', 'Спой алфавит на мотив любой песни.',
    'Опиши свой день, используя только странные слова.', 'Расскажи, подражая голосу мультяшного персонажа, что ты ел на завтрак.',
    'Изобрази статую на 20 секунд.', 'Напиши мини-стих о сегодняшней погоде.',
    'Придумай рекламный слоган для своей жизни.', 'Расскажи самую смешную шутку, которую знаешь.',
    'Изобрази походку супергероя.', 'Спой строчку песни в стиле оперы.',
    'Придумай новое приветствие и используй его следующие 5 минут в чате.', 'Опиши себя тремя эмодзи без слов.',
    'Расскажи короткую историю, начинающуюся с последней буквы твоего имени.', 'Изобрази интервью со звездой, отвечая на свои же вопросы.',
    'Напиши хвалебную оду своему любимому блюду.', 'Придумай танцевальное движение и опиши его словами.',
    'Расскажи, как бы ты объяснил интернет человеку из прошлого века.', 'Изобрази диктора спортивного канала, комментируя обычный день.',
    'Спой любимую песню по слогам задом наперёд.', 'Придумай прозвище для каждого участника игры.',
    'Расскажи анекдот про животных.', 'Изобрази робота, который учится говорить.',
    'Напиши короткий рэп о сегодняшнем дне.'
  ],
  en: [
    'Sing a verse of any song out loud (or as a voice message).', 'Impersonate your favorite cartoon character.',
    'Tell a joke as funny as you can.', 'Post the most ridiculous description of yourself in the chat.',
    'Speak only in rhymes for your next 3 messages.', 'Describe a robot walking, in words.',
    'Make up and tell a short story in 30 seconds.', 'Say the alphabet backwards as fast as you can.',
    'Act out pure surprise in a voice message.', 'Send a message using only emojis for others to decode.',
    'Say a tongue-twister three times in a row.', 'Impersonate a news anchor reading the last chat message.',
    'Invent a funny new name and introduce yourself with it.', 'Sing the alphabet to the tune of any song.',
    'Describe your day using only weird words.', "Impersonate a cartoon voice describing what you ate for breakfast.",
    'Freeze like a statue for 20 seconds.', "Write a mini-poem about today's weather.",
    'Come up with an advertising slogan for your life.', 'Tell the funniest joke you know.',
    'Imitate a superhero walk.', 'Sing a line of a song in an opera style.',
    'Invent a new greeting and use it for the next 5 minutes in chat.', 'Describe yourself with three emojis, no words.',
    'Tell a short story starting with the last letter of your name.', 'Interview yourself like a celebrity, answering your own questions.',
    'Write a praise ode to your favorite dish.', 'Invent a dance move and describe it in words.',
    'Explain the internet to someone from a century ago.', 'Impersonate a sports commentator narrating an ordinary day.',
    'Sing your favorite song backwards, syllable by syllable.', 'Invent a nickname for every player in the game.',
    'Tell a joke about animals.', 'Impersonate a robot learning to talk.',
    "Write a short rap about today."
  ],
  az: [
    'Hər hansı bir mahnının bir kupletini səsli oxu.', 'Sevimli cizgi film qəhrəmanını canlandır.',
    'Mümkün qədər gülməli bir zarafat danış.', 'Özün haqqında ən gülünc təsviri söhbətə yaz.',
    'Növbəti 3 mesajını yalnız qafiyəli yaz.', 'Robotun yerişini sözlərlə təsvir et.',
    '30 saniyəyə qısa bir nağıl uydur və danış.', 'Əlifbanı tərsinə mümkün qədər sürətli de.',
    'Səsli mesajda təəccüb emosiyasını canlandır.', 'Yalnız emojilərlə mesaj yaz, digərləri mənasını tapsın.',
    'Bir dil bükücünü ard-arda üç dəfə de.', 'Xəbər aparıcısı kimi son mesajı oxu.',
    'Özünə gülməli yeni ad uydur və onunla təqdim ol.', 'Əlifbanı hər hansı mahnının motivi ilə oxu.',
    'Günün haqqında yalnız qəribə sözlərlə danış.', 'Cizgi film səsi ilə səhər yeməyində nə yediyini danış.',
    '20 saniyə heykəl kimi don.', 'Bugünkü hava haqqında mini şeir yaz.',
    'Həyatın üçün reklam şüarı uydur.', 'Bildiyin ən gülməli zarafatı danış.',
    'Supergəhrəmanın yerişini təqlid et.', 'Bir mahnının sətrini opera tərzində oxu.',
    'Yeni bir salamlama uydur və 5 dəqiqə söhbətdə istifadə et.', 'Özünü sözsüz, üç emoji ilə təsvir et.',
    'Adının son hərfi ilə başlayan qısa hekayə danış.', 'Ulduz kimi özünlə müsahibə et.',
    'Sevimli yeməyinə həsr olunmuş tərif yaz.', 'Rəqs hərəkəti uydur və sözlərlə təsvir et.',
    'İnterneti keçmiş əsrdən olan birinə izah et.', 'İdman şərhçisi kimi adi günü şərh et.',
    'Sevimli mahnını hecalarla tərsinə oxu.', 'Oyundakı hər iştirakçı üçün ləqəb uydur.',
    'Heyvanlar haqqında zarafat danış.', 'Danışmağı öyrənən robotu canlandır.',
    'Bugünkü gün haqqında qısa rep yaz.'
  ]
};

// ---------- Сборка финального списка (250+) ----------
function buildList(standalone, templates, fillers) {
  const out = [...standalone];
  for (const t of templates) {
    for (const f of fillers) {
      out.push(t.replace('{F}', f));
    }
  }
  return out;
}

const TRUTHS = {
  ru: buildList(TRUTH_STANDALONE.ru, TRUTH_TEMPLATES.ru, FILLERS.ru),
  en: buildList(TRUTH_STANDALONE.en, TRUTH_TEMPLATES.en, FILLERS.en),
  az: buildList(TRUTH_STANDALONE.az, TRUTH_TEMPLATES.az, FILLERS.az)
};

const DARES = {
  ru: buildList(DARE_STANDALONE.ru, DARE_TEMPLATES.ru, FILLERS.ru),
  en: buildList(DARE_STANDALONE.en, DARE_TEMPLATES.en, FILLERS.en),
  az: buildList(DARE_STANDALONE.az, DARE_TEMPLATES.az, FILLERS.az)
};



// i18n.js — интерфейсные тексты бота на трёх языках

const I18N = {
  ru: {
    lang_name: 'Русский',
    welcome: 'Привет! Я бот «Правда или Действие» 🎲\nИспользуй /help чтобы увидеть все команды.',
    lang_set: (n) => `Язык переключён на: ${n}`,
    lang_usage: 'Использование: /lang ru | en | az',
    only_group: 'Эта команда работает только в группах.',
    lobby_opened: (name) => `🎲 ${name} открыл(а) лобби «Правда или Действие»!\nНажми кнопку ниже, чтобы присоединиться.`,
    join_button: '✅ Присоединиться',
    already_open: 'Лобби уже открыто. Нажми «Присоединиться», чтобы войти в игру.',
    joined: (n) => `${n} присоединился(-ась) к игре! Всего игроков: `,
    already_joined: 'Ты уже в игре.',
    no_lobby: 'Сейчас нет открытого лобби. Начни новое: /newgame',
    players_list: (list) => `👥 Игроки (${list.length}):\n` + list.map((p, i) => `${i + 1}. ${p}`).join('\n'),
    no_players: 'В игре пока нет игроков. Используй /join или кнопку в лобби.',
    need_more_players: 'Нужно как минимум 2 игрока, чтобы начать (или используй игру для одного в тестовых целях).',
    game_started: '🎬 Игра началась! Удачи всем!',
    game_ended: '🏁 Игра окончена. Спасибо за игру!',
    no_active_game: 'Сейчас нет активной игры.',
    turn_prompt: (mention) => `${mention}, твой ход!\nПравда или Действие?`,
    btn_truth: '🗣 Правда',
    btn_dare: '🔥 Действие',
    not_your_turn: 'Сейчас не твой ход!',
    truth_label: '🗣 ПРАВДА:',
    dare_label: '🔥 ДЕЙСТВИЕ:',
    next_button: '➡️ Следующий игрок',
    skip_only_current: 'Только текущий игрок (или овнер бота) может пропустить ход.',
    quick_truth: (n) => `🗣 ${n}, вот твоя правда:`,
    quick_dare: (n) => `🔥 ${n}, вот твоё действие:`,
    forced_reply_needed: 'Ответь этой командой на сообщение нужного игрока (Reply).',
    forced_set: (n, mode) => `🎯 Следующий ход принудительно достанется ${n}${mode ? ` (режим: ${mode === 'truth' ? 'Правда' : 'Действие'})` : ''}.`,
    owner_only: 'Эта команда доступна только овнерам бота.',
    creator_or_owner_only: 'Эта команда доступна только создателю группы или овнерам бота.',
    admin_only: 'Эта команда доступна только администраторам чата (или овнерам бота).',
    target_is_owner: 'Нельзя применить эту команду к овнеру бота.',
    need_reply: 'Ответь (Reply) на сообщение пользователя, к которому применяется команда.',
    banned: (n) => `🔨 ${n} забанен(а).`,
    kicked: (n) => `👢 ${n} исключён(а) из группы.`,
    muted: (n) => `🔇 ${n} заглушён(а).`,
    unmuted: (n) => `🔊 ${n} снова может писать.`,
    unbanned: (n) => `♻️ ${n} разбанен(а).`,
    warned: (n, count) => `⚠️ ${n} получил(а) предупреждение (${count}/3).`,
    warn_reset: (n) => `Предупреждения ${n} сброшены.`,
    auto_muted_warns: (n) => `🔇 ${n} автоматически заглушён(а) за 3 предупреждения.`,
    promoted: (n) => `⭐ ${n} назначен(а) администратором.`,
    demoted: (n) => `${n} больше не администратор.`,
    owner_added: (n) => `${n} добавлен(а) в список овнеров бота.`,
    owner_removed: (n) => `${n} удалён(а) из списка овнеров бота.`,
    api_error: 'Не получилось выполнить действие. Проверь, что у бота есть права администратора в этом чате.',
    help: [
      '🎲 *Правда или Действие — команды*',
      '',
      '*Игра:*',
      '/newgame — открыть лобби (сбор игроков)',
      '/join — присоединиться к игре',
      '/players — список игроков',
      '/begin — начать раунды',
      '/next или /skip — следующий игрок',
      '/truth — быстрый случайный вопрос (вне игры)',
      '/dare — быстрое случайное действие (вне игры)',
      '/endgame — закончить игру',
      '',
      '*Язык:*',
      '/lang ru | en | az — сменить язык чата',
      '',
      '*Модерация (для админов чата и овнеров бота):*',
      '/ban (ответом) — забанить',
      '/kick (ответом) — исключить (можно вернуться)',
      '/mute (ответом) — заглушить',
      '/unmute (ответом) — снять заглушение',
      '/unban (ответом) — разбанить',
      '/warn (ответом) — предупреждение (3 = автомут)',
      '/unwarn (ответом) — сбросить предупреждения',
      '',
      '*Только создатель группы или овнеры бота:*',
      '/promote (ответом) — сделать администратором',
      '/demote (ответом) — снять администратора',
      '',
      '*Только овнеры бота:*',
      '/target (ответом) [truth|dare] — принудительно назначить следующего игрока (и, опционально, тип задания)',
      '/addowner (ответом) — добавить овнера бота в этом чате',
      '/removeowner (ответом) — убрать овнера бота в этом чате',
      '',
      'ℹ️ /help — это сообщение'
    ].join('\n')
  },

  en: {
    lang_name: 'English',
    welcome: "Hi! I'm the Truth or Dare bot 🎲\nUse /help to see every command.",
    lang_set: (n) => `Language switched to: ${n}`,
    lang_usage: 'Usage: /lang ru | en | az',
    only_group: 'This command only works in groups.',
    lobby_opened: (name) => `🎲 ${name} opened a Truth or Dare lobby!\nTap the button below to join.`,
    join_button: '✅ Join',
    already_open: 'A lobby is already open. Tap "Join" to enter the game.',
    joined: (n) => `${n} joined the game! Total players: `,
    already_joined: "You're already in the game.",
    no_lobby: 'There is no open lobby right now. Start one: /newgame',
    players_list: (list) => `👥 Players (${list.length}):\n` + list.map((p, i) => `${i + 1}. ${p}`).join('\n'),
    no_players: 'No players yet. Use /join or the lobby button.',
    need_more_players: 'You need at least 2 players to start (or use it solo for testing).',
    game_started: '🎬 The game has started! Good luck everyone!',
    game_ended: '🏁 Game over. Thanks for playing!',
    no_active_game: 'There is no active game right now.',
    turn_prompt: (mention) => `${mention}, your turn!\nTruth or Dare?`,
    btn_truth: '🗣 Truth',
    btn_dare: '🔥 Dare',
    not_your_turn: "It's not your turn!",
    truth_label: '🗣 TRUTH:',
    dare_label: '🔥 DARE:',
    next_button: '➡️ Next player',
    skip_only_current: 'Only the current player (or a bot owner) can skip the turn.',
    quick_truth: (n) => `🗣 ${n}, here's your truth:`,
    quick_dare: (n) => `🔥 ${n}, here's your dare:`,
    forced_reply_needed: 'Reply to the target player\'s message with this command.',
    forced_set: (n, mode) => `🎯 The next turn will be forced onto ${n}${mode ? ` (mode: ${mode === 'truth' ? 'Truth' : 'Dare'})` : ''}.`,
    owner_only: 'This command is only available to bot owners.',
    creator_or_owner_only: 'This command is only available to the group creator or bot owners.',
    admin_only: 'This command is only available to chat admins (or bot owners).',
    target_is_owner: 'You cannot use this command on a bot owner.',
    need_reply: "Reply to the target user's message to use this command.",
    banned: (n) => `🔨 ${n} was banned.`,
    kicked: (n) => `👢 ${n} was kicked.`,
    muted: (n) => `🔇 ${n} was muted.`,
    unmuted: (n) => `🔊 ${n} can speak again.`,
    unbanned: (n) => `♻️ ${n} was unbanned.`,
    warned: (n, count) => `⚠️ ${n} received a warning (${count}/3).`,
    warn_reset: (n) => `Warnings for ${n} were reset.`,
    auto_muted_warns: (n) => `🔇 ${n} was auto-muted after 3 warnings.`,
    promoted: (n) => `⭐ ${n} is now an admin.`,
    demoted: (n) => `${n} is no longer an admin.`,
    owner_added: (n) => `${n} was added as a bot owner.`,
    owner_removed: (n) => `${n} was removed as a bot owner.`,
    api_error: "Couldn't complete that action. Make sure the bot is an admin in this chat.",
    help: [
      '🎲 *Truth or Dare — commands*',
      '',
      '*Game:*',
      '/newgame — open a lobby (gather players)',
      '/join — join the game',
      '/players — list players',
      '/begin — start the rounds',
      '/next or /skip — move to next player',
      '/truth — quick random truth (outside the game)',
      '/dare — quick random dare (outside the game)',
      '/endgame — end the game',
      '',
      '*Language:*',
      '/lang ru | en | az — change chat language',
      '',
      '*Moderation (chat admins & bot owners):*',
      '/ban (reply) — ban user',
      '/kick (reply) — kick user (can rejoin)',
      '/mute (reply) — mute user',
      '/unmute (reply) — unmute user',
      '/unban (reply) — unban user',
      '/warn (reply) — warn user (3 = auto-mute)',
      '/unwarn (reply) — reset warnings',
      '',
      '*Group creator or bot owners only:*',
      '/promote (reply) — make user an admin',
      '/demote (reply) — remove admin',
      '',
      '*Bot owners only:*',
      '/target (reply) [truth|dare] — force who goes next (and optionally which mode)',
      '/addowner (reply) — add a bot owner in this chat',
      '/removeowner (reply) — remove a bot owner in this chat',
      '',
      'ℹ️ /help — this message'
    ].join('\n')
  },

  az: {
    lang_name: 'Azərbaycan',
    welcome: 'Salam! Mən Həqiqət yoxsa Cəsarət botuyam 🎲\nBütün əmrlər üçün /help yaz.',
    lang_set: (n) => `Dil dəyişdirildi: ${n}`,
    lang_usage: 'İstifadə: /lang ru | en | az',
    only_group: 'Bu əmr yalnız qruplarda işləyir.',
    lobby_opened: (name) => `🎲 ${name} "Həqiqət yoxsa Cəsarət" lobisini açdı!\nQoşulmaq üçün aşağıdakı düyməyə bas.`,
    join_button: '✅ Qoşul',
    already_open: 'Lobi artıq açıqdır. Oyuna qoşulmaq üçün "Qoşul" düyməsinə bas.',
    joined: (n) => `${n} oyuna qoşuldu! Ümumi oyunçu sayı: `,
    already_joined: 'Sən artıq oyundasan.',
    no_lobby: 'Hazırda açıq lobi yoxdur. Yenisini başlat: /newgame',
    players_list: (list) => `👥 Oyunçular (${list.length}):\n` + list.map((p, i) => `${i + 1}. ${p}`).join('\n'),
    no_players: 'Hələ oyunçu yoxdur. /join və ya lobidəki düymədən istifadə et.',
    need_more_players: 'Başlamaq üçün ən azı 2 oyunçu lazımdır (test üçün tək də ola bilər).',
    game_started: '🎬 Oyun başladı! Hamıya uğurlar!',
    game_ended: '🏁 Oyun bitdi. Oynadığınız üçün təşəkkürlər!',
    no_active_game: 'Hazırda aktiv oyun yoxdur.',
    turn_prompt: (mention) => `${mention}, sənin növbəndir!\nHəqiqət yoxsa Cəsarət?`,
    btn_truth: '🗣 Həqiqət',
    btn_dare: '🔥 Cəsarət',
    not_your_turn: 'Bu sənin növbən deyil!',
    truth_label: '🗣 HƏQİQƏT:',
    dare_label: '🔥 CƏSARƏT:',
    next_button: '➡️ Növbəti oyunçu',
    skip_only_current: 'Yalnız cari oyunçu (və ya bot ovneri) növbəni keçə bilər.',
    quick_truth: (n) => `🗣 ${n}, sənin həqiqətin:`,
    quick_dare: (n) => `🔥 ${n}, sənin cəsarətin:`,
    forced_reply_needed: 'Hədəf oyunçunun mesajına bu əmrlə cavab (Reply) ver.',
    forced_set: (n, mode) => `🎯 Növbəti növbə məcburi olaraq ${n}-a düşəcək${mode ? ` (rejim: ${mode === 'truth' ? 'Həqiqət' : 'Cəsarət'})` : ''}.`,
    owner_only: 'Bu əmr yalnız bot ovnerlərinə açıqdır.',
    creator_or_owner_only: 'Bu əmr yalnız qrup yaradıcısına və ya bot ovnerlərinə açıqdır.',
    admin_only: 'Bu əmr yalnız çat adminlərinə (və ya bot ovnerlərinə) açıqdır.',
    target_is_owner: 'Bu əmri bot ovnerinə tətbiq edə bilməzsən.',
    need_reply: 'Bu əmr üçün istifadəçinin mesajına Reply et.',
    banned: (n) => `🔨 ${n} bloklandı.`,
    kicked: (n) => `👢 ${n} qrupdan çıxarıldı.`,
    muted: (n) => `🔇 ${n} susduruldu.`,
    unmuted: (n) => `🔊 ${n} yenidən yaza bilər.`,
    unbanned: (n) => `♻️ ${n}-in bloku götürüldü.`,
    warned: (n, count) => `⚠️ ${n} xəbərdarlıq aldı (${count}/3).`,
    warn_reset: (n) => `${n}-in xəbərdarlıqları sıfırlandı.`,
    auto_muted_warns: (n) => `🔇 ${n} 3 xəbərdarlıqdan sonra avtomatik susduruldu.`,
    promoted: (n) => `⭐ ${n} admin təyin edildi.`,
    demoted: (n) => `${n} artıq admin deyil.`,
    owner_added: (n) => `${n} bu çatda bot ovneri kimi əlavə edildi.`,
    owner_removed: (n) => `${n} bu çatda bot ovnerliyindən çıxarıldı.`,
    api_error: 'Əməliyyat baş tutmadı. Botun bu çatda admin olduğuna əmin ol.',
    help: [
      '🎲 *Həqiqət yoxsa Cəsarət — əmrlər*',
      '',
      '*Oyun:*',
      '/newgame — lobi aç (oyunçu topla)',
      '/join — oyuna qoşul',
      '/players — oyunçu siyahısı',
      '/begin — turları başlat',
      '/next və ya /skip — növbəti oyunçu',
      '/truth — sürətli təsadüfi həqiqət (oyundan kənar)',
      '/dare — sürətli təsadüfi cəsarət (oyundan kənar)',
      '/endgame — oyunu bitir',
      '',
      '*Dil:*',
      '/lang ru | en | az — çat dilini dəyiş',
      '',
      '*Moderasiya (çat adminləri və bot ovnerləri):*',
      '/ban (reply) — blokla',
      '/kick (reply) — çıxart (geri qoşula bilər)',
      '/mute (reply) — susdur',
      '/unmute (reply) — susdurmanı götür',
      '/unban (reply) — blokdan çıxar',
      '/warn (reply) — xəbərdarlıq (3 = avtomatik susdurma)',
      '/unwarn (reply) — xəbərdarlıqları sıfırla',
      '',
      '*Yalnız qrup yaradıcısı və ya bot ovnerləri:*',
      '/promote (reply) — admin təyin et',
      '/demote (reply) — admindən çıxar',
      '',
      '*Yalnız bot ovnerləri:*',
      '/target (reply) [truth|dare] — növbəti oyunçunu məcburi təyin et (istəyə görə rejim də)',
      '/addowner (reply) — bu çatda bot ovneri əlavə et',
      '/removeowner (reply) — bu çatda bot ovnerini sil',
      '',
      'ℹ️ /help — bu mesaj'
    ].join('\n')
  }
};



// ==================== НАСТРОЙКИ ОВНЕРОВ ====================
// Овнеры бота "по умолчанию" — жёстко заданы по запросу.
// Можно добавить ещё через /addowner (ответом на сообщение), это добавит
// пользователя в список овнеров ЭТОГО чата (хранится в KV).
const DEFAULT_OWNERS = ['soltex1k', 'ganjinski_32', 'asshhirranni'];

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

function norm(u) {
  return (u || '').replace(/^@/, '').toLowerCase();
}

function mentionOf(user) {
  const name = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username || 'Player';
  // HTML mention — работает даже если у пользователя нет username
  return `<a href="tg://user?id=${user.id}">${escapeHtml(name)}</a>`;
}

function nameOf(user) {
  return [user.first_name, user.last_name].filter(Boolean).join(' ') || (user.username ? '@' + user.username : String(user.id));
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ==================== TELEGRAM API ====================

async function tg(env, method, params) {
  const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = { ok: false, description: 'bad response' };
  }
  return data;
}

async function sendMessage(env, chatId, text, extra = {}) {
  return tg(env, 'sendMessage', { chat_id: chatId, text, parse_mode: 'HTML', ...extra });
}

async function editMessage(env, chatId, messageId, text, extra = {}) {
  return tg(env, 'editMessageText', { chat_id: chatId, message_id: messageId, text, parse_mode: 'HTML', ...extra });
}

async function answerCallback(env, callbackQueryId, text, showAlert = false) {
  return tg(env, 'answerCallbackQuery', { callback_query_id: callbackQueryId, text, show_alert: showAlert });
}

async function getChatMember(env, chatId, userId) {
  const res = await tg(env, 'getChatMember', { chat_id: chatId, user_id: userId });
  return res.ok ? res.result : null;
}

// ==================== KV: СОСТОЯНИЕ ЧАТА ====================

function defaultState() {
  return {
    lang: 'ru',
    lobbyOpen: false,
    players: [], // { id, name }
    lastMessageId: null,
    current: null, // { id, name }
    lastPlayerId: null,
    forced: null, // { id, name, mode }
    warns: {}, // userId -> count
    extraOwners: [], // usernames (без @), добавленные через /addowner в этом чате
    usedTruth: [],
    usedDare: []
  };
}

async function getState(env, chatId) {
  const raw = await env.GAME_KV.get(`chat:${chatId}`);
  if (!raw) return defaultState();
  try {
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed };
  } catch (e) {
    return defaultState();
  }
}

async function saveState(env, chatId, state) {
  await env.GAME_KV.put(`chat:${chatId}`, JSON.stringify(state));
}

function t(state) {
  return I18N[state.lang] || I18N.ru;
}

// ==================== ОВНЕРЫ / ПРАВА ====================

function isBotOwner(username, state) {
  const u = norm(username);
  if (!u) return false;
  return DEFAULT_OWNERS.includes(u) || (state.extraOwners || []).includes(u);
}

async function isChatAdmin(env, chatId, userId) {
  const member = await getChatMember(env, chatId, userId);
  if (!member) return false;
  return member.status === 'administrator' || member.status === 'creator';
}

async function isCreator(env, chatId, userId) {
  const member = await getChatMember(env, chatId, userId);
  return !!member && member.status === 'creator';
}

// ==================== КОНТЕНТ: ВЫБОР ВОПРОСА/ДЕЙСТВИЯ БЕЗ ПОВТОРОВ ====================

function drawContent(state, type) {
  const lang = state.lang;
  const pool = type === 'truth' ? TRUTHS[lang] : DARES[lang];
  const usedKey = type === 'truth' ? 'usedTruth' : 'usedDare';
  let used = state[usedKey] || [];
  if (used.length >= pool.length) used = []; // всё использовали — начинаем заново
  let idx;
  do {
    idx = Math.floor(Math.random() * pool.length);
  } while (used.includes(idx));
  used.push(idx);
  state[usedKey] = used;
  return pool[idx];
}

// ==================== ИГРОВАЯ ЛОГИКА ====================

async function startTurn(env, chatId, state) {
  let target;
  let forcedMode = null;

  if (state.forced && state.forced.id) {
    target = { id: state.forced.id, name: state.forced.name };
    forcedMode = state.forced.mode || null;
    state.forced = null;
  } else if (state.players.length > 0) {
    let candidates = state.players;
    if (candidates.length > 1 && state.lastPlayerId != null) {
      const filtered = candidates.filter((p) => p.id !== state.lastPlayerId);
      if (filtered.length > 0) candidates = filtered;
    }
    target = pickRandom(candidates);
  } else {
    await sendMessage(env, chatId, t(state).no_players);
    return;
  }

  state.current = target;
  state.lastPlayerId = target.id;
  await saveState(env, chatId, state);

  const mention = `<a href="tg://user?id=${target.id}">${escapeHtml(target.name)}</a>`;

  if (forcedMode === 'truth' || forcedMode === 'dare') {
    await revealChoice(env, chatId, state, forcedMode, null);
    return;
  }

  await sendMessage(env, chatId, t(state).turn_prompt(mention), {
    reply_markup: {
      inline_keyboard: [[
        { text: t(state).btn_truth, callback_data: 'choose:truth' },
        { text: t(state).btn_dare, callback_data: 'choose:dare' }
      ]]
    }
  });
}

async function revealChoice(env, chatId, state, mode, messageId) {
  const text = drawContent(state, mode);
  const label = mode === 'truth' ? t(state).truth_label : t(state).dare_label;
  const mention = state.current ? `<a href="tg://user?id=${state.current.id}">${escapeHtml(state.current.name)}</a>` : '';
  const body = `${mention}\n\n${label}\n${escapeHtml(text)}`;
  const kb = { inline_keyboard: [[{ text: t(state).next_button, callback_data: 'next' }]] };

  await saveState(env, chatId, state);

  if (messageId) {
    await editMessage(env, chatId, messageId, body, { reply_markup: kb });
  } else {
    await sendMessage(env, chatId, body, { reply_markup: kb });
  }
}

// ==================== ОБРАБОТКА КОМАНД ====================

async function handleMessage(env, msg) {
  if (!msg.text || !msg.text.startsWith('/')) return;
  const chat = msg.chat;
  const chatId = chat.id;
  const isGroup = chat.type === 'group' || chat.type === 'supergroup';
  const from = msg.from;

  let [cmd, ...args] = msg.text.trim().split(/\s+/);
  cmd = cmd.split('@')[0].toLowerCase();

  const state = await getState(env, chatId);
  const T = t(state);

  // ---------- Универсальные ----------
  if (cmd === '/start' || cmd === '/help') {
    await sendMessage(env, chatId, cmd === '/start' ? T.welcome + '\n\n' + T.help : T.help);
    return;
  }

  if (cmd === '/lang') {
    const choice = (args[0] || '').toLowerCase();
    if (!['ru', 'en', 'az'].includes(choice)) {
      await sendMessage(env, chatId, T.lang_usage);
      return;
    }
    state.lang = choice;
    await saveState(env, chatId, state);
    await sendMessage(env, chatId, I18N[choice].lang_set(I18N[choice].lang_name));
    return;
  }

  if (!isGroup) {
    if (['/newgame', '/join', '/players', '/begin', '/next', '/skip', '/endgame', '/truth', '/dare',
      '/ban', '/kick', '/mute', '/unmute', '/unban', '/warn', '/unwarn', '/promote', '/demote',
      '/target', '/addowner', '/removeowner'].includes(cmd)) {
      await sendMessage(env, chatId, T.only_group);
      return;
    }
    return;
  }

  // ---------- Быстрые команды (без формальной игры) ----------
  if (cmd === '/truth') {
    const text = drawContent(state, 'truth');
    await saveState(env, chatId, state);
    await sendMessage(env, chatId, `${T.quick_truth(nameOf(from))}\n${escapeHtml(text)}`);
    return;
  }
  if (cmd === '/dare') {
    const text = drawContent(state, 'dare');
    await saveState(env, chatId, state);
    await sendMessage(env, chatId, `${T.quick_dare(nameOf(from))}\n${escapeHtml(text)}`);
    return;
  }

  // ---------- Игра ----------
  if (cmd === '/newgame') {
    state.lobbyOpen = true;
    state.players = [];
    state.current = null;
    state.lastPlayerId = null;
    state.forced = null;
    await saveState(env, chatId, state);
    const res = await sendMessage(env, chatId, T.lobby_opened(nameOf(from)), {
      reply_markup: { inline_keyboard: [[{ text: T.join_button, callback_data: 'join' }]] }
    });
    if (res.ok) {
      state.lastMessageId = res.result.message_id;
      await saveState(env, chatId, state);
    }
    return;
  }

  if (cmd === '/join') {
    if (!state.lobbyOpen) {
      await sendMessage(env, chatId, T.no_lobby);
      return;
    }
    if (state.players.find((p) => p.id === from.id)) {
      await sendMessage(env, chatId, T.already_joined);
      return;
    }
    state.players.push({ id: from.id, name: nameOf(from) });
    await saveState(env, chatId, state);
    await sendMessage(env, chatId, T.joined(nameOf(from)) + state.players.length);
    return;
  }

  if (cmd === '/players') {
    if (state.players.length === 0) {
      await sendMessage(env, chatId, T.no_players);
      return;
    }
    await sendMessage(env, chatId, T.players_list(state.players.map((p) => p.name)));
    return;
  }

  if (cmd === '/begin') {
    if (state.players.length < 1) {
      await sendMessage(env, chatId, T.no_players);
      return;
    }
    if (state.players.length < 2) {
      await sendMessage(env, chatId, T.need_more_players);
    }
    state.lobbyOpen = false;
    await saveState(env, chatId, state);
    await sendMessage(env, chatId, T.game_started);
    await startTurn(env, chatId, await getState(env, chatId));
    return;
  }

  if (cmd === '/next' || cmd === '/skip') {
    if (!state.current && !state.forced) {
      await sendMessage(env, chatId, T.no_active_game);
      return;
    }
    const owner = isBotOwner(from.username, state);
    const isCurrent = state.current && state.current.id === from.id;
    if (!owner && !isCurrent) {
      await sendMessage(env, chatId, T.skip_only_current);
      return;
    }
    await startTurn(env, chatId, state);
    return;
  }

  if (cmd === '/endgame') {
    const fresh = defaultState();
    fresh.lang = state.lang;
    fresh.extraOwners = state.extraOwners;
    fresh.warns = state.warns;
    await saveState(env, chatId, fresh);
    await sendMessage(env, chatId, T.game_ended);
    return;
  }

  // ---------- Овнеры бота ----------
  if (cmd === '/target') {
    if (!isBotOwner(from.username, state)) {
      await sendMessage(env, chatId, T.owner_only);
      return;
    }
    if (!msg.reply_to_message) {
      await sendMessage(env, chatId, T.forced_reply_needed);
      return;
    }
    const targetUser = msg.reply_to_message.from;
    const mode = (args[0] || '').toLowerCase();
    state.forced = {
      id: targetUser.id,
      name: nameOf(targetUser),
      mode: mode === 'truth' || mode === 'dare' ? mode : null
    };
    await saveState(env, chatId, state);
    await sendMessage(env, chatId, T.forced_set(nameOf(targetUser), state.forced.mode));
    return;
  }

  if (cmd === '/addowner' || cmd === '/removeowner') {
    if (!isBotOwner(from.username, state)) {
      await sendMessage(env, chatId, T.owner_only);
      return;
    }
    if (!msg.reply_to_message) {
      await sendMessage(env, chatId, T.forced_reply_needed);
      return;
    }
    const targetUser = msg.reply_to_message.from;
    const uname = norm(targetUser.username);
    if (!uname) {
      await sendMessage(env, chatId, T.need_reply);
      return;
    }
    state.extraOwners = state.extraOwners || [];
    if (cmd === '/addowner') {
      if (!state.extraOwners.includes(uname)) state.extraOwners.push(uname);
      await saveState(env, chatId, state);
      await sendMessage(env, chatId, T.owner_added(nameOf(targetUser)));
    } else {
      state.extraOwners = state.extraOwners.filter((u) => u !== uname);
      await saveState(env, chatId, state);
      await sendMessage(env, chatId, T.owner_removed(nameOf(targetUser)));
    }
    return;
  }

  // ---------- Модерация ----------
  const modCommands = ['/ban', '/kick', '/mute', '/unmute', '/unban', '/warn', '/unwarn'];
  if (modCommands.includes(cmd)) {
    const owner = isBotOwner(from.username, state);
    const admin = owner || (await isChatAdmin(env, chatId, from.id));
    if (!admin) {
      await sendMessage(env, chatId, T.admin_only);
      return;
    }
    if (!msg.reply_to_message) {
      await sendMessage(env, chatId, T.need_reply);
      return;
    }
    const targetUser = msg.reply_to_message.from;
    if (isBotOwner(targetUser.username, state)) {
      await sendMessage(env, chatId, T.target_is_owner);
      return;
    }

    if (cmd === '/ban') {
      const res = await tg(env, 'banChatMember', { chat_id: chatId, user_id: targetUser.id });
      await sendMessage(env, chatId, res.ok ? T.banned(nameOf(targetUser)) : T.api_error);
      return;
    }
    if (cmd === '/kick') {
      const res = await tg(env, 'banChatMember', { chat_id: chatId, user_id: targetUser.id });
      if (res.ok) await tg(env, 'unbanChatMember', { chat_id: chatId, user_id: targetUser.id, only_if_banned: true });
      await sendMessage(env, chatId, res.ok ? T.kicked(nameOf(targetUser)) : T.api_error);
      return;
    }
    if (cmd === '/unban') {
      const res = await tg(env, 'unbanChatMember', { chat_id: chatId, user_id: targetUser.id, only_if_banned: true });
      await sendMessage(env, chatId, res.ok ? T.unbanned(nameOf(targetUser)) : T.api_error);
      return;
    }
    if (cmd === '/mute') {
      const res = await tg(env, 'restrictChatMember', {
        chat_id: chatId,
        user_id: targetUser.id,
        permissions: {
          can_send_messages: false, can_send_audios: false, can_send_documents: false,
          can_send_photos: false, can_send_videos: false, can_send_video_notes: false,
          can_send_voice_notes: false, can_send_polls: false, can_send_other_messages: false,
          can_add_web_page_previews: false
        }
      });
      await sendMessage(env, chatId, res.ok ? T.muted(nameOf(targetUser)) : T.api_error);
      return;
    }
    if (cmd === '/unmute') {
      const res = await tg(env, 'restrictChatMember', {
        chat_id: chatId,
        user_id: targetUser.id,
        permissions: {
          can_send_messages: true, can_send_audios: true, can_send_documents: true,
          can_send_photos: true, can_send_videos: true, can_send_video_notes: true,
          can_send_voice_notes: true, can_send_polls: true, can_send_other_messages: true,
          can_add_web_page_previews: true
        }
      });
      await sendMessage(env, chatId, res.ok ? T.unmuted(nameOf(targetUser)) : T.api_error);
      return;
    }
    if (cmd === '/warn') {
      state.warns = state.warns || {};
      const key = String(targetUser.id);
      state.warns[key] = (state.warns[key] || 0) + 1;
      await saveState(env, chatId, state);
      await sendMessage(env, chatId, T.warned(nameOf(targetUser), state.warns[key]));
      if (state.warns[key] >= 3) {
        const res = await tg(env, 'restrictChatMember', {
          chat_id: chatId,
          user_id: targetUser.id,
          permissions: { can_send_messages: false }
        });
        state.warns[key] = 0;
        await saveState(env, chatId, state);
        if (res.ok) await sendMessage(env, chatId, T.auto_muted_warns(nameOf(targetUser)));
      }
      return;
    }
    if (cmd === '/unwarn') {
      state.warns = state.warns || {};
      state.warns[String(targetUser.id)] = 0;
      await saveState(env, chatId, state);
      await sendMessage(env, chatId, T.warn_reset(nameOf(targetUser)));
      return;
    }
  }

  // ---------- Промоут/демоут — только создатель группы или овнеры бота ----------
  if (cmd === '/promote' || cmd === '/demote') {
    const owner = isBotOwner(from.username, state);
    const creator = owner || (await isCreator(env, chatId, from.id));
    if (!creator) {
      await sendMessage(env, chatId, T.creator_or_owner_only);
      return;
    }
    if (!msg.reply_to_message) {
      await sendMessage(env, chatId, T.need_reply);
      return;
    }
    const targetUser = msg.reply_to_message.from;
    if (cmd === '/promote') {
      const res = await tg(env, 'promoteChatMember', {
        chat_id: chatId, user_id: targetUser.id,
        can_change_info: true, can_delete_messages: true, can_invite_users: true,
        can_restrict_members: true, can_pin_messages: true, can_promote_members: false,
        can_manage_chat: true, can_manage_video_chats: true
      });
      await sendMessage(env, chatId, res.ok ? T.promoted(nameOf(targetUser)) : T.api_error);
    } else {
      const res = await tg(env, 'promoteChatMember', {
        chat_id: chatId, user_id: targetUser.id,
        can_change_info: false, can_delete_messages: false, can_invite_users: false,
        can_restrict_members: false, can_pin_messages: false, can_promote_members: false,
        can_manage_chat: false, can_manage_video_chats: false
      });
      await sendMessage(env, chatId, res.ok ? T.demoted(nameOf(targetUser)) : T.api_error);
    }
    return;
  }
}

// ==================== ОБРАБОТКА КНОПОК ====================

async function handleCallback(env, cq) {
  const chatId = cq.message.chat.id;
  const messageId = cq.message.message_id;
  const from = cq.from;
  const state = await getState(env, chatId);
  const T = t(state);
  const data = cq.data;

  if (data === 'join') {
    if (!state.lobbyOpen) {
      await answerCallback(env, cq.id, T.no_lobby, true);
      return;
    }
    if (state.players.find((p) => p.id === from.id)) {
      await answerCallback(env, cq.id, T.already_joined, true);
      return;
    }
    state.players.push({ id: from.id, name: nameOf(from) });
    await saveState(env, chatId, state);
    await answerCallback(env, cq.id, T.joined(nameOf(from)) + state.players.length);
    try {
      await editMessage(env, chatId, messageId,
        cq.message.text + `\n\n👥 ${state.players.length}: ` + state.players.map((p) => p.name).join(', '),
        { reply_markup: cq.message.reply_markup });
    } catch (e) {}
    return;
  }

  if (data === 'choose:truth' || data === 'choose:dare') {
    const mode = data.split(':')[1];
    const owner = isBotOwner(from.username, state);
    if (!state.current || (state.current.id !== from.id && !owner)) {
      await answerCallback(env, cq.id, T.not_your_turn, true);
      return;
    }
    await answerCallback(env, cq.id, '');
    await revealChoice(env, chatId, state, mode, messageId);
    return;
  }

  if (data === 'next') {
    const owner = isBotOwner(from.username, state);
    const isCurrent = state.current && state.current.id === from.id;
    if (!owner && !isCurrent) {
      await answerCallback(env, cq.id, T.skip_only_current, true);
      return;
    }
    await answerCallback(env, cq.id, '');
    await startTurn(env, chatId, state);
    return;
  }

  await answerCallback(env, cq.id, '');
}

// ==================== ГЛАВНЫЙ ОБРАБОТЧИК ====================

async function handleUpdate(update, env) {
  try {
    if (update.message) {
      await handleMessage(env, update.message);
    } else if (update.callback_query) {
      await handleCallback(env, update.callback_query);
    }
  } catch (err) {
    // тихо логируем — Cloudflare покажет в Real-time Logs
    console.error('handleUpdate error', err);
  }
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'GET') {
      return new Response('Truth or Dare bot is running ✅', { status: 200 });
    }
    if (request.method === 'POST') {
      let update;
      try {
        update = await request.json();
      } catch (e) {
        return new Response('bad request', { status: 400 });
      }
      // Обрабатываем апдейт СИНХРОННО (await, не waitUntil) — это гарантирует,
      // что состояние игры в KV не «гонится» между быстрыми апдейтами
      // (например, если игрок мгновенно жмёт кнопку после начала хода).
      await handleUpdate(update, env);
      return new Response('OK');
    }
    return new Response('Not found', { status: 404 });
  }
};
