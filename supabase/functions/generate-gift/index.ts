import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, relationship, occasion, budget, age, mode, questions, answerLabels } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const isDeep = mode === "deep";

    const systemPrompt = `You are a warm, insightful gift advisor. You write like a thoughtful friend, never like a chatbot or algorithm. 
Never use the words "algorithm", "AI", or "data". Never say "buy this". Use phrases like "consider this" or "explore this".
CRITICAL RULES:
1. Every single gift idea must be UNIQUE. Never repeat the same gift concept, item, or category across territories.
2. All suggestions must be AGE-APPROPRIATE for someone aged ${age || "25 to 35"}. A teenager gets very different gifts than a retiree.
3. Base every suggestion on the specific personality signals from the answers, not generic gift lists.
4. Never suggest the same type of item twice (e.g., if one territory has a journal, no other territory should have any kind of journal or notebook).
You must respond with valid JSON only. No markdown, no code blocks, just JSON.`;

    const trendGuidance = isDeep ? `

GIFT TREND GUIDANCE (weave these in where they fit the person):
- Hyper-personalisation (custom illustrations, star maps, engraved items) — for sentimental types
- Experience gifting (workshops, classes, sessions) — for experience-oriented and extrovert types
- Wellness gifting (aromatherapy, journaling, skincare) — for people who rarely treat themselves
- Sustainable gifting (plantable cards, upcycled products) — for minimalist aesthetic types
- Learning gifts (Masterclass, Skillshare, skill kits) — for deep-interest types
- Micro-luxury (premium candles, silk, artisan products) — for things they won't buy themselves
- Digital creative gifts (Spotify plaques, custom portraits) — for sentimental + playful relationships
- Plant gifting (rare plants, terrariums, grow kits) — for nature-oriented types

IMPORTANT: Include India-specific shopping options where possible (Ugaoo, Jaypore, Kama Ayurveda, The Label Life, Chumbak, Nykaa, local Etsy sellers).` : "";

    const portraitInstructions = isDeep
      ? `"portrait": "A warm 5-6 sentence paragraph describing ${name}'s personality. Reference at least 4 specific answer signals. Mention their current life season explicitly. Use ${name}'s name 2-3 times. Must feel like it was written by someone who knows them personally."`
      : `"portrait": "A warm 3-4 sentence paragraph describing ${name}'s personality. Be specific, not generic. Reference their traits from the answers. Write like a perceptive friend, not a machine."`;

    const territoryCount = isDeep ? 4 : 3;
    const giftIdeaCount = isDeep ? 4 : 3;
    const linkCount = isDeep ? 4 : 3;

    const trendingField = isDeep
      ? `\n      "trendingIdea": "One trending gift idea explicitly labeled as 'Trending right now: [item]' with reason why it fits ${name}",`
      : "";

    const cardNotesStructure = isDeep
      ? `"cardNotes": {
    "heartfelt": "3-4 sentences, deeply personal to ${name}, referencing specific traits",
    "funny": "2 sentences, warm humour referencing the ${occasion} or ${relationship} relationship",
    "simple": "1 sentence, sincere and direct",
    "playful": "1-2 sentences in an inside-joke tone — playful and affectionate"
  }`
      : `"cardNotes": {
    "heartfelt": "2-3 sentences, deeply personal to ${name}",
    "funny": "1-2 sentences, warm humour referencing the ${occasion} or ${relationship} relationship",
    "simple": "1 sentence, sincere and direct"
  }`;

    const trendingPicksField = `,
  "trendingPicks": [
    {"item": "Trend-matched item 1", "reason": "because [reason from their answers]"},
    {"item": "Trend-matched item 2", "reason": "because [reason from their answers]"},
    {"item": "Trend-matched item 3", "reason": "because [reason from their answers]"}
  ]`;

    const surpriseField = isDeep
      ? `,
  "surpriseNote": "Based on their feelings about surprises, include either a 'Wild Card' bold gift suggestion if they love surprises, or a note like 'Consider giving a hint before the occasion — the anticipation might mean as much as the gift' if they prefer knowing. If neutral, omit this field or set to null."`
      : "";

    const userPrompt = `I'm choosing a gift for ${name}. Here's what I know:
- Relationship: ${relationship}
- Occasion: ${occasion}  
- Budget: ₹${budget}
- Mode: ${isDeep ? "Deep dive (15 questions)" : "Quick (6 questions)"}

Here are ${questions.length} questions I answered about ${name}:
${questions.map((q: string, i: number) => `Q: ${q}\nA: ${answerLabels[i]}`).join("\n\n")}
${trendGuidance}

Based on ALL answers provided, generate a JSON object with this exact structure:
{
  ${portraitInstructions},
  "territories": [
    {
      "emoji": "relevant emoji",
      "name": "Territory name (creative, evocative)",
      "description": "One line about why this direction fits ${name}",
      "giftIdeas": ["${giftIdeaCount} specific gift concepts (not product links) tailored to their personality and ₹${budget} budget"],${trendingField}
      "diyOption": "A make-it-yourself alternative",
      "customization": "How to personalise the gift",
      "links": [{"label": "Store name", "url": "real URL to a relevant store with a relevant search query"}]
    }
  ],
  ${cardNotesStructure}${trendingPicksField}${surpriseField}
}

Generate exactly ${territoryCount} territories. Each territory must have exactly ${giftIdeaCount} gift ideas and ${linkCount} links. Make all shopping links real working URLs with relevant search queries.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    let content = aiData.choices?.[0]?.message?.content || "";
    content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result = JSON.parse(content);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-gift error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
