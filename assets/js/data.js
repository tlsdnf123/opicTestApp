const STORAGE_KEY = "malang-opic-state-v1";

const questions = [
  { topic: "자기소개", level: "IM", text: "자기소개를 해주세요. 하는 일, 성격, 요즘 자주 하는 일을 연결해서 말해보세요." },
  { topic: "집", level: "IM", text: "당신의 방이나 집에서 가장 편한 공간을 설명해주세요. 그곳에서 보통 무엇을 하나요?" },
  { topic: "동네", level: "IM", text: "당신이 사는 동네를 소개해주세요. 자주 가는 장소와 그 이유를 말해보세요." },
  { topic: "루틴", level: "IM", text: "평일 하루 일과를 순서대로 말해주세요. 가장 바쁜 시간과 쉬는 시간을 포함해보세요." },
  { topic: "음식", level: "IM", text: "좋아하는 음식을 하나 고르고, 언제 주로 먹는지와 왜 좋아하는지 말해보세요." },
  { topic: "취미", level: "IM", text: "요즘 즐기는 취미를 소개해주세요. 처음 시작한 계기와 자주 하는 방식을 말해보세요." },
  { topic: "음악", level: "IH", text: "요즘 자주 듣는 음악을 소개하고, 그 음악을 들으면 어떤 기분이 드는지 설명해보세요." },
  { topic: "영화", level: "IH", text: "최근 본 영화나 드라마에 대해 말해주세요. 기억에 남는 장면과 그 이유를 포함해보세요." },
  { topic: "여행", level: "IH", text: "기억에 남는 여행 경험을 말해주세요. 장소, 함께 간 사람, 인상 깊었던 일을 넣어보세요." },
  { topic: "쇼핑", level: "IH", text: "최근에 산 물건 하나를 소개해주세요. 사기 전 기대와 실제 사용 후 느낌을 비교해보세요." },
  { topic: "건강", level: "IH", text: "건강을 위해 하고 있는 습관을 말해주세요. 시작한 이유와 달라진 점을 함께 말해보세요." },
  { topic: "친구", level: "IH", text: "친한 친구 한 명을 소개해주세요. 어떤 사람이고, 최근에 함께 한 일을 말해보세요." },
  { topic: "비교", level: "AL", text: "예전의 여가 생활과 지금의 여가 생활을 비교해보세요. 달라진 이유까지 설명해보세요." },
  { topic: "돌발", level: "AL", text: "약속 시간에 늦었던 경험을 말해주세요. 무슨 일이 있었고 어떻게 해결했나요?" },
  { topic: "문제해결", level: "AL", text: "여행이나 외출 중 예상치 못한 문제가 생긴 경험을 말해주세요. 대응 과정과 결과를 포함해보세요." },
  { topic: "변화", level: "AL", text: "최근 몇 년 사이 당신의 생활 습관이 어떻게 변했는지 말해주세요. 변화의 원인도 설명해보세요." },
  { topic: "의견", level: "AL", text: "혼자 공부하는 것과 함께 공부하는 것 중 어느 쪽이 더 잘 맞나요? 이유와 경험을 들어 말해보세요." },
  { topic: "기술", level: "AL", text: "스마트폰이나 앱이 당신의 공부 방식에 준 영향을 말해주세요. 장점과 단점을 함께 말해보세요." },
];

const dailyPhrases = [
  {
    phrase: "It was totally worth it.",
    meaning: "완전 그럴 가치가 있었어요.",
    example: "I was tired, but the trip was totally worth it.",
  },
  {
    phrase: "I usually go for something simple.",
    meaning: "저는 보통 간단한 걸 선택해요.",
    example: "When I eat alone, I usually go for something simple.",
  },
  {
    phrase: "That is my go-to place.",
    meaning: "거기는 제가 자주 가는 단골 장소예요.",
    example: "There is a small cafe near my home, and that is my go-to place.",
  },
  {
    phrase: "I was in the middle of something.",
    meaning: "제가 뭔가를 한창 하고 있던 중이었어요.",
    example: "I missed the call because I was in the middle of something.",
  },
  {
    phrase: "It depends on my mood.",
    meaning: "그때그때 기분에 따라 달라요.",
    example: "I sometimes watch movies, but it depends on my mood.",
  },
  {
    phrase: "I ended up liking it more than I expected.",
    meaning: "생각보다 더 마음에 들게 됐어요.",
    example: "I tried yoga once, and I ended up liking it more than I expected.",
  },
  {
    phrase: "I needed a change of pace.",
    meaning: "분위기 전환이 필요했어요.",
    example: "I went for a walk because I needed a change of pace.",
  },
  {
    phrase: "It helped me clear my head.",
    meaning: "머리를 식히는 데 도움이 됐어요.",
    example: "Listening to music helped me clear my head.",
  },
  {
    phrase: "I am not really into that.",
    meaning: "저는 그걸 그렇게 좋아하진 않아요.",
    example: "I am not really into loud places, so I prefer quiet cafes.",
  },
  {
    phrase: "I try to make time for it.",
    meaning: "그걸 하려고 시간을 내려고 해요.",
    example: "I am busy, but I try to make time for exercise.",
  },
  {
    phrase: "It did not go as planned.",
    meaning: "계획대로 되진 않았어요.",
    example: "My trip did not go as planned because it rained all day.",
  },
  {
    phrase: "I learned that the hard way.",
    meaning: "힘들게 겪고 나서야 알게 됐어요.",
    example: "I forgot my charger on a trip, and I learned that the hard way.",
  },
  {
    phrase: "I would say it is pretty convenient.",
    meaning: "꽤 편리하다고 말할 수 있어요.",
    example: "The subway near my home is pretty convenient.",
  },
  {
    phrase: "It is a small thing, but it matters.",
    meaning: "작은 일이지만 중요해요.",
    example: "Having a quiet desk is a small thing, but it matters.",
  },
  {
    phrase: "I got used to it pretty quickly.",
    meaning: "꽤 빨리 익숙해졌어요.",
    example: "At first, online classes felt strange, but I got used to it pretty quickly.",
  },
];

const rubricCriteria = [
  { value: "length", label: "40초 이상 이어서 말했다", points: 1, tip: "답변 끝에 한 문장만 더 붙여서 40초를 넘겨보세요." },
  { value: "structure", label: "시작-이유-마무리 흐름이 있다", points: 1, tip: "첫 문장은 결론, 두 번째는 이유, 마지막은 느낌으로 정리해보세요." },
  { value: "detail", label: "개인 경험이나 구체적인 장면을 넣었다", points: 1, tip: "언제, 어디서, 누구와 있었는지 하나만 추가해보세요." },
  { value: "tense", label: "과거 또는 미래 시제를 사용했다", points: 1, tip: "I went, I watched, I will try 같은 시제 표현을 하나 넣어보세요." },
  { value: "connectors", label: "because, so, actually 같은 연결어를 썼다", points: 1, tip: "because, so, also 중 하나로 문장 사이를 연결해보세요." },
  { value: "problem", label: "문제 상황이나 해결 과정을 설명했다", points: 1, tip: "문제-대응-결과 순서로 한 문장씩 말해보세요." },
];

const coachPrompts = {
  length: [
    "마지막에 '그 경험이 왜 기억에 남았는지' 한 문장 더 붙여볼까요?",
    "답변 끝에 요즘 생각이나 느낌을 한 문장 추가해보세요.",
  ],
  structure: [
    "첫 문장은 결론, 다음 문장은 이유, 마지막은 느낌으로 정리해볼까요?",
    "답변을 시작-이유-예시-마무리 순서로 다시 배치해보세요.",
  ],
  detail: [
    "언제, 어디서, 누구와 있었던 일인지 하나만 더 넣어보세요.",
    "장면이 보이게 장소나 상황을 구체적으로 말해보세요.",
  ],
  tense: [
    "과거에 있었던 일을 한 문장 추가해보세요.",
    "예전과 지금이 어떻게 달라졌는지 비교해보세요.",
  ],
  connectors: [
    "because, so, actually 중 하나로 문장 사이를 연결해보세요.",
    "For example으로 개인 경험을 시작해보세요.",
  ],
  problem: [
    "문제-대응-결과를 한 문장씩 넣어보세요.",
    "예상과 다르게 된 일을 말하고, 어떻게 해결했는지 붙여보세요.",
  ],
  complete: [
    "좋아요. 이제 같은 답변을 더 자연스럽게 말하는 연습을 해보세요.",
    "체크 기준은 충분해요. 다음엔 감정 표현을 더 풍부하게 넣어봐요.",
  ],
};

const ratingBands = [
  { min: 0, label: "IM1 연습", next: "짧아도 괜찮으니 이유 한 문장을 붙여보세요." },
  { min: 2, label: "IM2 느낌", next: "경험 예시를 하나 넣으면 답변이 더 살아나요." },
  { min: 3, label: "IM3 느낌", next: "문장을 단락처럼 이어 말하면 IH에 가까워져요." },
  { min: 4, label: "IH 도전", next: "과거 경험과 감정 표현을 더 구체적으로 말해보세요." },
  { min: 5, label: "IH 안정권 연습", next: "돌발 상황에서 문제-대응-결과 구조를 연습해보세요." },
  { min: 6, label: "AL 도전", next: "비교, 변화, 문제 해결을 길게 설명하는 연습을 이어가세요." },
];

const rewards = [
  { id: "mug", icon: "컵", title: "카페 머그컵", requirement: "카페 도착", unlock: (state) => state.steps >= 4 },
  { id: "shoes", icon: "운동화", title: "공원 운동화", requirement: "공원 도착", unlock: (state) => state.steps >= 8 },
  { id: "ticket", icon: "티켓", title: "역 티켓", requirement: "지하철역 도착", unlock: (state) => state.steps >= 12 },
  { id: "carrier", icon: "캐리어", title: "공항 캐리어", requirement: "공항 도착", unlock: (state) => state.steps >= 16 },
  { id: "camera", icon: "카메라", title: "여행지 카메라", requirement: "여행지 도착", unlock: (state) => state.steps >= 20 },
  { id: "badge", icon: "배지", title: "시험장 배지", requirement: "시험장 도착", unlock: (state) => state.steps >= 24 },
];

const companionMissions = [
  {
    id: "quokka",
    animal: "quokka",
    treat: "leaf",
    footprint: "round-paw",
  },
  {
    id: "rabbit",
    animal: "rabbit",
    treat: "carrot",
    footprint: "long-paw",
  },
  {
    id: "cat",
    animal: "cat",
    treat: "fish",
    footprint: "soft-paw",
  },
];

const journeyStops = [
  { name: "집 앞", topic: "자기소개, 집, 동네", step: 0, scene: "home" },
  { name: "카페", topic: "음식, 친구, 취미", step: 4, scene: "cafe" },
  { name: "공원", topic: "건강, 루틴", step: 8, scene: "park" },
  { name: "지하철역", topic: "교통, 약속, 돌발", step: 12, scene: "station" },
  { name: "공항", topic: "여행 준비, 예약", step: 16, scene: "airport" },
  { name: "여행지", topic: "경험, 비교, 변화", step: 20, scene: "trip" },
  { name: "시험장", topic: "종합 모의 답변", step: 24, scene: "test" },
];

const evolutions = [
  {
    id: "seed",
    stage: 1,
    name: "말랑 씨앗몬",
    requirement: "시작 단계",
    unlock: () => true,
  },
  {
    id: "sprout",
    stage: 2,
    name: "새싹 말랑몬",
    requirement: "답변 3개 완료",
    unlock: (state) => state.totalAnswers >= 3,
  },
  {
    id: "spark",
    stage: 3,
    name: "반짝 스피치몬",
    requirement: "레벨 4 또는 답변 7개",
    unlock: (state) => state.level >= 4 || state.totalAnswers >= 7,
  },
  {
    id: "dragon",
    stage: 4,
    name: "오픽 드래곤",
    requirement: "답변 15개 + 3일 연속",
    unlock: (state) => state.totalAnswers >= 15 && state.streak >= 3,
  },
];

const defaultState = {
  petName: "쿼랑이",
  level: 1,
  xp: 0,
  streak: 0,
  totalAnswers: 0,
  steps: 0,
  lastPracticeDate: "",
  currentQuestionIndex: 0,
  dailyPlanDate: "",
  dailyQuestionIndexes: [],
  companionDate: "",
  companionId: "",
  targetLevel: "IH",
  history: [],
};
