import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import { quizQuestions } from "@/lib/quiz-data";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "them";
  const relationship = searchParams.get("relationship") || "";
  const occasion = searchParams.get("occasion") || "";
  const budget = searchParams.get("budget") || "";

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Reading between the lines...");

  const question = quizQuestions[currentQ];

  const handleSelect = useCallback(async (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Last question — generate results
      setIsLoading(true);
      const loadingTexts = [
        "Reading between the lines...",
        "Understanding who they really are...",
        "Crafting something meaningful...",
      ];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % loadingTexts.length;
        setLoadingText(loadingTexts[i]);
      }, 1500);

      try {
        const { data, error } = await supabase.functions.invoke("generate-gift", {
          body: {
            name,
            relationship,
            occasion,
            budget,
            answers: newAnswers,
            questions: quizQuestions.map((q) => q.question(name)),
            answerLabels: newAnswers.map((a, idx) => {
              const q = quizQuestions[idx];
              return q.options.find((o) => o.value === a)?.label || a;
            }),
          },
        });

        clearInterval(interval);

        if (error) throw error;

        // Store result and navigate
        sessionStorage.setItem("unwrap-result", JSON.stringify(data));
        sessionStorage.setItem("unwrap-name", name);
        navigate("/results");
      } catch (err) {
        clearInterval(interval);
        console.error("Generation error:", err);
        toast.error("Something went wrong. Using thoughtful defaults instead.");
        
        // Fallback content
        const fallback = generateFallback(name, relationship, occasion, budget, newAnswers);
        sessionStorage.setItem("unwrap-result", JSON.stringify(fallback));
        sessionStorage.setItem("unwrap-name", name);
        navigate("/results");
      }
    }
  }, [currentQ, answers, name, relationship, occasion, budget, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-secondary flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              />
            </div>
            <h2 className="text-xl font-semibold text-primary mb-2">
              Generating your gift direction...
            </h2>
            <p className="text-muted-foreground animate-pulse-soft">{loadingText}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-lg mx-auto px-6 pt-8 pb-20">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Q{currentQ + 1} of {quizQuestions.length}</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-primary mb-6 leading-relaxed">
              {question.question(name)}
            </h2>

            <div className="space-y-3">
              {question.options.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelect(option.value)}
                  className="w-full text-left p-4 rounded-lg border border-border bg-card hover:border-primary hover:bg-secondary transition-all duration-200 text-sm leading-relaxed text-foreground"
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// Fallback if AI is unavailable
function generateFallback(name: string, relationship: string, occasion: string, budget: string, answers: string[]) {
  return {
    portrait: `${name} sounds like someone who values authenticity and meaning in the things around them. Based on what you've shared, they appreciate thoughtfulness over extravagance — the kind of person who notices the small details and remembers the stories behind objects. This ${occasion.toLowerCase()} feels like a chance to show them you truly see who they are.`,
    territories: [
      {
        emoji: "🌿",
        name: "Something that grows with them",
        description: `A gift that evolves and deepens over time, just like your ${relationship.toLowerCase()} bond`,
        giftIdeas: [
          "A rare houseplant they wouldn't pick up casually",
          "A beautifully bound journal with a personal note on the first page",
          "A subscription to something they'd love but never buy themselves",
        ],
        diyOption: "Propagate a cutting from a plant you own, pot it in something handmade, attach a note about what it means",
        customization: "Add a hand-painted clay tag or a custom bookmark with their name",
        links: [
          { label: "Ugaoo - Plants", url: "https://www.ugaoo.com" },
          { label: "Etsy - Handmade", url: "https://www.etsy.com/search?q=handmade+planter" },
          { label: "Uncommon Goods", url: "https://www.uncommongoods.com" },
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
        ],
        diyOption: "Create a hand-lettered quote from their favourite book or song, framed simply",
        customization: "Include a small card explaining why you chose this specific item",
        links: [
          { label: "Jaypore", url: "https://www.jaypore.com" },
          { label: "Etsy - Personalised", url: "https://www.etsy.com/search?q=personalised+gift" },
          { label: "Zazzle", url: "https://www.zazzle.com" },
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
        ],
        diyOption: "Plan a surprise day built around 3-4 of their favourite small pleasures",
        customization: "Add a personal itinerary card for the experience with inside jokes",
        links: [
          { label: "Uncommon Goods", url: "https://www.uncommongoods.com" },
          { label: "Etsy - Custom Art", url: "https://www.etsy.com/search?q=custom+portrait" },
          { label: "Jaypore - Artisan", url: "https://www.jaypore.com" },
        ],
      },
    ],
    cardNotes: {
      heartfelt: `${name}, I spent time thinking about what would feel right for you — not just nice, but right. This is my way of saying I see you, I value you, and I'm glad you're in my life.`,
      funny: `I went through a whole personality quiz about you to pick this. So if you don't like it, it's technically your own fault. Happy ${occasion.toLowerCase()}! 😄`,
      simple: `For you, ${name}. Because you deserve something as thoughtful as you are.`,
    },
  };
}

export default Quiz;
