export const relationships = [
  "Best friend",
  "Partner",
  "Parent",
  "Sibling",
  "Relative",
  "Colleague",
  "Other",
];

export const ageGroups = [
  "Under 18",
  "18 to 25",
  "26 to 35",
  "36 to 50",
  "51 to 65",
  "Above 65",
];

export const occasions = [
  "Birthday",
  "Anniversary",
  "Farewell",
  "Festival",
  "Just because",
  "Other",
];

export type QuizMode = "quick" | "deep";
export type Pronoun = "she" | "he" | "they";

export interface QuizQuestion {
  id: number;
  question: (name: string) => string;
  options: { label: string; value: string }[];
  deepOnly?: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: (name) => `On a free Sunday with no plans, ${name} most likely...`,
    options: [
      { label: "Is out meeting people, probably at a café or event", value: "social" },
      { label: "Is home with one close friend, deep in conversation", value: "intimate" },
      { label: "Is alone doing something creative or absorbing", value: "solitary" },
      { label: "Is running errands or ticking off their to do list", value: "practical" },
    ],
  },
  {
    id: 16,
    question: (name) => `How would you describe where things stand between you and ${name} right now?`,
    options: [
      { label: "We're in a really close chapter, talk often, know each other deeply", value: "close" },
      { label: "We're warm but a bit distant lately, life got busy", value: "distant" },
      { label: "This relationship is still growing, we're getting to know each other", value: "growing" },
      { label: "It's a specific context: work, family, or a defined role", value: "contextual" },
    ],
  },
  {
    id: 2,
    question: (name) => `How does ${name} usually feel about receiving gifts?`,
    options: [
      { label: "Gets genuinely excited and emotional about them", value: "expressive" },
      { label: "Appreciates the thought more than the thing itself", value: "thoughtful" },
      { label: "Prefers useful things they'll actually use", value: "practical" },
      { label: "Feels a little awkward — doesn't love the attention", value: "reserved" },
    ],
  },
  {
    id: 3,
    question: (_name) => "Their living space probably feels like...",
    options: [
      { label: "Curated and intentional — everything has a place", value: "curated" },
      { label: "Warm and cozy — lived-in, full of personal things", value: "cozy" },
      { label: "Minimal and calm — nothing unnecessary", value: "minimal" },
      { label: "Creative chaos — stuff everywhere but it all means something", value: "creative" },
    ],
  },
  {
    id: 4,
    question: (name) => `Right now, ${name}'s life feels...`,
    options: [
      { label: "Like a new chapter: something big just started or changed", value: "new-chapter" },
      { label: "Busy and full: lots happening, not much breathing room", value: "busy" },
      { label: "Settled and steady: comfortable with where things are", value: "settled" },
      { label: "A bit in between, figuring out what comes next", value: "transitional" },
    ],
  },
  {
    id: 5,
    question: (name) => `What would make ${name} happiest one month after receiving a gift?`,
    options: [
      { label: "Using it every day and thinking of you", value: "daily-use" },
      { label: "The memory of a great experience you shared", value: "experience" },
      { label: "Knowing you truly understood something about them", value: "understood" },
      { label: "Being surprised by something they'd never buy themselves", value: "surprise" },
    ],
  },
  {
    id: 6,
    deepOnly: true,
    question: (name) => `Which of these sounds most like ${name}?`,
    options: [
      { label: "The friend who remembers everyone's birthdays and small details", value: "attentive" },
      { label: "The one who's always discovering new things — books, places, ideas", value: "explorer" },
      { label: "The person who's deeply invested in a few specific passions", value: "passionate" },
      { label: "The one who's hard to buy for because they buy what they want", value: "self-sufficient" },
    ],
  },
  // Deep mode questions (Q7–Q15)
  {
    id: 7,
    deepOnly: true,
    question: (name) => `How does ${name} most feel appreciated?`,
    options: [
      { label: "When someone remembers something small they mentioned once", value: "memory" },
      { label: "When someone gives them real, uninterrupted time and attention", value: "time" },
      { label: "When someone does something practical to make their life easier", value: "acts" },
      { label: "When someone gives something that shows genuine thought", value: "gifts" },
    ],
  },
  {
    id: 8,
    deepOnly: true,
    question: (name) => `${name} would probably never spend money on themselves for...`,
    options: [
      { label: "Something purely for relaxation, always feels too indulgent", value: "relaxation" },
      { label: "Something expensive for their hobby, hard to justify", value: "hobby" },
      { label: "Something decorative or aesthetic, seems unnecessary", value: "decorative" },
      { label: "An experience, prefers saving for practical things", value: "experience" },
    ],
  },
  {
    id: 9,
    deepOnly: true,
    question: (name) => `A year from now, which gift would ${name} value more?`,
    options: [
      { label: "A handwritten letter about what they mean to you", value: "letter" },
      { label: "Something useful they'd mentioned wanting", value: "useful" },
      { label: "An experience you did together — the memory is the gift", value: "shared-experience" },
      { label: "Something that genuinely surprised them", value: "surprise" },
    ],
  },
  {
    id: 10,
    deepOnly: true,
    question: (name) => `How does ${name} treat themselves?`,
    options: [
      { label: "Rarely, always putting others or work first", value: "rarely" },
      { label: "Intentionally, has rituals and routines they protect", value: "intentional" },
      { label: "Occasionally, only when they feel they've earned it", value: "occasionally" },
      { label: "Freely, no guilt, enjoys life's small pleasures", value: "freely" },
    ],
  },
  {
    id: 11,
    deepOnly: true,
    question: (name) => `When ${name} gets into something, they...`,
    options: [
      { label: "Go completely deep: obsess, research, become the expert", value: "deep-diver" },
      { label: "Explore it casually then move on to the next thing", value: "explorer" },
      { label: "Want to share it with everyone immediately", value: "sharer" },
      { label: "Keep it private, it's their personal thing", value: "private" },
    ],
  },
  {
    id: 12,
    deepOnly: true,
    question: (name) => `In a group setting, ${name} is usually...`,
    options: [
      { label: "The one who brings everyone together, hosts and connects", value: "connector" },
      { label: "Having one deep conversation in the corner", value: "deep-talker" },
      { label: "Present but quietly slips away when energy runs low", value: "quiet-exit" },
      { label: "The observer, speaks only when it truly counts", value: "observer" },
    ],
  },
  {
    id: 13,
    deepOnly: true,
    question: (name) => `Your relationship with ${name} is mostly...`,
    options: [
      { label: "Deep and emotionally honest, you talk about real things", value: "deep" },
      { label: "Warm and easy, comfortable, lots of laughs", value: "warm" },
      { label: "Fun and playful, inside jokes and running gags", value: "playful" },
      { label: "Caring and respectful, genuine fondness, still growing", value: "caring" },
    ],
  },
  {
    id: 14,
    deepOnly: true,
    question: (name) => `What does ${name} tend to hold onto?`,
    options: [
      { label: "Objects: sentimental, keeps everything meaningful", value: "objects" },
      { label: "Memories: experiences matter more than possessions", value: "memories" },
      { label: "People: what matters is who they were with", value: "people" },
      { label: "Nothing really, travels light, doesn't attach to things", value: "nothing" },
    ],
  },
  {
    id: 15,
    deepOnly: true,
    question: (name) => `How does ${name} feel about surprises?`,
    options: [
      { label: "Loves them, the more unexpected the better", value: "loves" },
      { label: "Likes them if they're thoughtful, not random for random's sake", value: "thoughtful" },
      { label: "Prefers knowing what's coming, surprises make them anxious", value: "anxious" },
      { label: "Depends entirely on who it's from", value: "depends" },
    ],
  },
];

export function getQuestionsForMode(mode: QuizMode): QuizQuestion[] {
  if (mode === "quick") return quizQuestions.filter((q) => !q.deepOnly);
  return quizQuestions;
}

export interface GiftFormData {
  name: string;
  relationship: string;
  occasion: string;
  budget: string;
  mode: QuizMode;
}

export interface GiftTerritory {
  emoji: string;
  name: string;
  description: string;
  giftIdeas: string[];
  
  diyOption: string;
  customization: string;
  links: { label: string; url: string }[];
}

export interface GiftResult {
  portrait: string;
  territories: GiftTerritory[];
  cardNotes: {
    heartfelt: string;
    funny: string;
    simple: string;
    playful?: string;
  };
  
  surpriseNote?: string;
}
