export const relationships = [
  "Best friend",
  "Partner",
  "Parent",
  "Sibling",
  "Colleague",
  "Other",
];

export const occasions = [
  "Birthday",
  "Anniversary",
  "Farewell",
  "Festival",
  "Just because",
  "Other",
];

export interface QuizQuestion {
  id: number;
  question: (name: string) => string;
  options: { label: string; value: string }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: (name) => `On a free Sunday with no plans, ${name} most likely...`,
    options: [
      { label: "Is out meeting people, probably at a café or event", value: "social" },
      { label: "Is home with one close friend, deep in conversation", value: "intimate" },
      { label: "Is alone doing something creative or absorbing", value: "solitary" },
      { label: "Is running errands or ticking off their to-do list", value: "practical" },
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
      { label: "Like a new chapter — something big just started or changed", value: "new-chapter" },
      { label: "Busy and full — lots happening, not much breathing room", value: "busy" },
      { label: "Settled and steady — comfortable with where things are", value: "settled" },
      { label: "A bit in-between — figuring out what comes next", value: "transitional" },
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
    question: (name) => `Which of these sounds most like ${name}?`,
    options: [
      { label: "The friend who remembers everyone's birthdays and small details", value: "attentive" },
      { label: "The one who's always discovering new things — books, places, ideas", value: "explorer" },
      { label: "The person who's deeply invested in a few specific passions", value: "passionate" },
      { label: "The one who's hard to buy for because they buy what they want", value: "self-sufficient" },
    ],
  },
];

export interface GiftFormData {
  name: string;
  relationship: string;
  occasion: string;
  budget: string;
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
  };
}
