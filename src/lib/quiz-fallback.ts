import type { GiftResult, QuizMode } from "./quiz-data";

export function generateFallback(
  name: string,
  relationship: string,
  occasion: string,
  budget: string,
  answers: string[],
  mode: QuizMode
): GiftResult {
  const isDeep = mode === "deep";

  const portrait = isDeep
    ? `${name} sounds like someone who values authenticity and meaning in the things around them. Based on what you've shared, they appreciate thoughtfulness over extravagance: the kind of person who notices the small details and remembers the stories behind objects. Right now, they seem to be in a season of reflection, where the right gift could feel like a quiet act of recognition. ${name} is the kind of person who doesn't ask for much, which makes it all the more meaningful when someone takes the time to really see them. This ${occasion.toLowerCase()} feels like a chance to show ${name} you truly understand who they are.`
    : `${name} sounds like someone who values authenticity and meaning in the things around them. Based on what you've shared, they appreciate thoughtfulness over extravagance: the kind of person who notices the small details and remembers the stories behind objects. This ${occasion.toLowerCase()} feels like a chance to show them you truly see who they are.`;

  const baseTerritories = [
    {
      emoji: "🌿",
      name: "Something that grows with them",
      description: `A gift that evolves and deepens over time, just like your ${relationship.toLowerCase()} bond`,
      giftIdeas: [
        "A rare houseplant they wouldn't pick up casually",
        "A beautifully bound journal with a personal note on the first page",
        "A subscription to something they'd love but never buy themselves",
        ...(isDeep ? ["A terrarium kit they can build and nurture"] : []),
      ],
      trendingIdea: isDeep ? "Trending right now: Custom star map print of a date meaningful to them" : undefined,
      diyOption: "Propagate a cutting from a plant you own, pot it in something handmade, attach a note about what it means",
      customization: "Add a hand-painted clay tag with their name",
      links: [
        { label: "Ugaoo", url: "https://www.ugaoo.com" },
        { label: "Etsy - Handmade", url: "https://www.etsy.com/search?q=handmade+planter" },
        { label: "Uncommon Goods", url: "https://www.uncommongoods.com" },
        ...(isDeep ? [{ label: "Chumbak", url: "https://www.chumbak.com" }] : []),
      ],
    },
    {
      emoji: "✨",
      name: "Something for their inner world",
      description: "A gift that speaks to who they are when nobody's watching",
      giftIdeas: [
        "A beautifully illustrated book on a topic they quietly love",
        "A premium candle or incense set that matches their aesthetic",
        "A curated playlist turned into a custom vinyl or cassette",
        ...(isDeep ? ["A wellness hamper with aromatherapy and journaling supplies"] : []),
      ],
      trendingIdea: isDeep ? "Trending right now: Personalised Spotify plaque of your shared favourite song" : undefined,
      diyOption: "Create a hand-lettered quote from their favourite book or song, framed simply",
      customization: "Include a small card explaining why you chose this specific item",
      links: [
        { label: "Jaypore", url: "https://www.jaypore.com" },
        { label: "Kama Ayurveda", url: "https://www.kamaayurveda.com" },
        { label: "Etsy - Personalised", url: "https://www.etsy.com/search?q=personalised+gift" },
        ...(isDeep ? [{ label: "Nykaa", url: "https://www.nykaa.com" }] : []),
      ],
    },
    {
      emoji: "🎯",
      name: "Something they'd never expect",
      description: `The kind of gift that makes ${name} pause and say "how did you know?"`,
      giftIdeas: [
        "A workshop or class in something they've mentioned wanting to try",
        "A custom illustration or portrait by a local artist",
        "A curated experience box tailored to their interests",
        ...(isDeep ? ["A Masterclass subscription in a topic they're curious about"] : []),
      ],
      trendingIdea: isDeep ? "Trending right now: Custom digital portrait in a style they love" : undefined,
      diyOption: "Plan a surprise day built around 3-4 of their favourite small pleasures",
      customization: "Add a personal itinerary card for the experience with inside jokes",
      links: [
        { label: "Uncommon Goods", url: "https://www.uncommongoods.com" },
        { label: "Etsy - Custom Art", url: "https://www.etsy.com/search?q=custom+portrait" },
        { label: "Jaypore", url: "https://www.jaypore.com" },
        ...(isDeep ? [{ label: "The Label Life", url: "https://www.thelabellife.com" }] : []),
      ],
    },
  ];

  if (isDeep) {
    baseTerritories.push({
      emoji: "🧘",
      name: "Something to slow them down",
      description: `For the part of ${name} that forgets to pause`,
      giftIdeas: [
        "A premium skincare set they'd never splurge on themselves",
        "A beautiful silk robe or loungewear piece",
        "An artisan tea or coffee collection with a handwritten tasting guide",
        "A guided journal designed for self-reflection",
      ],
      trendingIdea: "Trending right now: Luxury aromatherapy diffuser with curated essential oil blends",
      diyOption: "Create a 'permission to rest' voucher book with specific relaxation activities you'll facilitate",
      customization: "Pair it with a handwritten note about why they deserve to slow down",
      links: [
        { label: "Kama Ayurveda", url: "https://www.kamaayurveda.com" },
        { label: "Nykaa Luxe", url: "https://www.nykaa.com/luxe" },
        { label: "The Label Life", url: "https://www.thelabellife.com" },
        { label: "Etsy - Wellness", url: "https://www.etsy.com/search?q=wellness+gift+set" },
      ],
    });
  }

  const cardNotes: GiftResult["cardNotes"] = {
    heartfelt: isDeep
      ? `${name}, I spent real time thinking about what would feel right for you — not just nice, but right. You're someone who gives so much of yourself to others, and I wanted this to be a reminder that someone sees you just as clearly. This is my way of saying I value you, exactly as you are.`
      : `${name}, I spent time thinking about what would feel right for you — not just nice, but right. This is my way of saying I see you, I value you, and I'm glad you're in my life.`,
    funny: `I went through a whole personality quiz about you to pick this. So if you don't like it, it's technically your own fault. Happy ${occasion.toLowerCase()}! 😄`,
    simple: `For you, ${name}. Because you deserve something as thoughtful as you are.`,
  };

  if (isDeep) {
    cardNotes.playful = `Remember that time we [inside joke reference]? This gift is basically the physical manifestation of that energy. You're welcome. 😏`;
  }

  const result: GiftResult = {
    portrait,
    territories: baseTerritories,
    cardNotes,
  };

  result.trendingPicks = [
    { item: "Custom star map or coordinates print", reason: "they value meaning in objects" },
    { item: "Masterclass or Skillshare subscription", reason: "they love diving deep into new interests" },
    { item: "Artisan candle or fragrance set", reason: "they appreciate the finer details" },
  ];

  return result;
}
