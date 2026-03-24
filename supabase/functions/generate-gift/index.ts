import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, relationship, occasion, budget, questions, answerLabels } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a warm, insightful gift advisor. You write like a thoughtful friend — never like a chatbot or algorithm. 
Never use the words "algorithm", "AI", or "data". Never say "buy this". Use phrases like "consider this" or "explore this".
You must respond with valid JSON only. No markdown, no code blocks, just JSON.`;

    const userPrompt = `I'm choosing a gift for ${name}. Here's what I know:
- Relationship: ${relationship}
- Occasion: ${occasion}  
- Budget: ₹${budget}

Here are 6 questions I answered about ${name}:
${questions.map((q: string, i: number) => `Q: ${q}\nA: ${answerLabels[i]}`).join("\n\n")}

Based on this, generate a JSON object with this exact structure:
{
  "portrait": "A warm 3-4 sentence paragraph describing ${name}'s personality. Be specific, not generic. Reference their traits from the answers. Write like a perceptive friend, not a machine.",
  "territories": [
    {
      "emoji": "relevant emoji",
      "name": "Territory name (creative, evocative)",
      "description": "One line about why this direction fits ${name}",
      "giftIdeas": ["3 specific gift concepts (not product links) tailored to their personality and ₹${budget} budget"],
      "diyOption": "A make-it-yourself alternative",
      "customization": "How to personalise the gift",
      "links": [{"label": "Store name", "url": "real URL to a relevant store like etsy.com, ugaoo.com, jaypore.com, uncommongoods.com, or zazzle.com with a relevant search query"}]
    }
  ],
  "cardNotes": {
    "heartfelt": "2-3 sentences, deeply personal to ${name}",
    "funny": "1-2 sentences, warm humour referencing the ${occasion} or ${relationship} relationship",
    "simple": "1 sentence, sincere and direct"
  }
}

Generate exactly 3 territories. Each territory should have exactly 3 gift ideas and 3 links. Make all shopping links real working URLs with relevant search queries.`;

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
    
    // Strip markdown code blocks if present
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
