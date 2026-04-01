import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import { getQuestionsForMode, type QuizMode } from "@/lib/quiz-data";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generateFallback } from "@/lib/quiz-fallback";

const optionEmojis: Record<number, string[]> = {
  1: ["☕", "💬", "🎨", "✅"],
  16: ["❤️", "🌤️", "🌱", "🏷️"],
  2: ["🤩", "💭", "🔧", "😊"],
  3: ["✨", "🏡", "🧘", "🎭"],
  4: ["🌱", "⚡", "🏖️", "🔄"],
  5: ["💎", "🎪", "🫶", "🎁"],
  6: ["🎂", "🧭", "🔥", "🛍️"],
  7: ["🧠", "⏰", "🤝", "💝"],
  8: ["🧖", "🎯", "🖼️", "✈️"],
  9: ["💌", "📦", "🎭", "😮"],
  10: ["💪", "🕯️", "🏆", "🌸"],
  11: ["📚", "🦋", "📢", "🤫"],
  12: ["🎊", "🗣️", "🚪", "👀"],
  13: ["❤️", "😄", "😜", "🤗"],
  14: ["📿", "🌅", "👥", "🎒"],
  15: ["🎉", "🤔", "😰", "🤷"],
};

const GiftBoxAnimation = () => (
  <div className="relative w-32 h-32 mx-auto mb-8">
    {/* Glow */}
    <div className="absolute inset-0 rounded-2xl bg-unwrap-amber/20 gift-box-glow" />
    {/* Box base */}
    <div className="absolute bottom-4 left-4 right-4 h-16 rounded-xl bg-unwrap-amber/80 border-2 border-white/30" />
    {/* Box lid */}
    <div className="absolute bottom-16 left-2 right-2 h-8 rounded-xl bg-unwrap-amber border-2 border-white/30 gift-box-lid" />
    {/* Ribbon vertical */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-20 bg-white/60 rounded-sm" />
    {/* Ribbon horizontal */}
    <div className="absolute bottom-12 left-4 right-4 h-4 bg-white/60 rounded-sm" />
    {/* Ribbon bow left */}
    <div className="absolute bottom-[72px] left-[calc(50%-20px)] w-5 h-5 rounded-full border-2 border-white/60 bg-transparent gift-box-ribbon-left origin-right" />
    {/* Ribbon bow right */}
    <div className="absolute bottom-[72px] left-[calc(50%+4px)] w-5 h-5 rounded-full border-2 border-white/60 bg-transparent gift-box-ribbon-right origin-left" />
  </div>
);

const LoadingScreen = ({ mode, loadingText }: { mode: QuizMode; loadingText: string }) => {
  const cyclingTexts = [
    "Thinking about who they are...",
    "Connecting the patterns...",
    "Almost ready...",
  ];

  return (
    <div className="min-h-screen gradient-purple flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <GiftBoxAnimation />

        <h2 className="font-display italic text-white text-[28px] mb-3">
          {loadingText}
        </h2>

        {mode === "deep" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/60 text-base mb-8"
          >
            15 answers. One person. Let's find what fits.
          </motion.p>
        )}

        <div className="h-6 mt-6">
          {cyclingTexts.map((text, idx) => (
            <motion.p
              key={text}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [8, 0, 0, -8],
              }}
              transition={{
                duration: 3,
                delay: idx * 3,
                repeat: Infinity,
                repeatDelay: (cyclingTexts.length - 1) * 3,
              }}
              className="text-white/50 text-sm absolute left-0 right-0"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "them";
  const relationship = searchParams.get("relationship") || "";
  const occasion = searchParams.get("occasion") || "";
  const budget = searchParams.get("budget") || "";
  const age = searchParams.get("age") || "";
  const mode = (searchParams.get("mode") || "quick") as QuizMode;

  const activeQuestions = getQuestionsForMode(mode);
  const totalQuestions = activeQuestions.length;

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Reading between the lines...");

  const question = activeQuestions[currentQ];
  const questionId = question.id;

  const handleSelect = useCallback(async (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQ < totalQuestions - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setIsLoading(true);
      const loadingTexts = mode === "deep"
        ? [
            "Reading between the lines...",
            "15 answers. One person. Let's find what fits.",
            "Understanding who they really are...",
            "Crafting something meaningful...",
          ]
        : [
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
            age,
            mode,
            answers: newAnswers,
            questions: activeQuestions.map((q) => q.question(name)),
            answerLabels: newAnswers.map((a, idx) => {
              const q = activeQuestions[idx];
              return q.options.find((o) => o.value === a)?.label || a;
            }),
          },
        });

        clearInterval(interval);
        if (error) throw error;

        sessionStorage.setItem("unwrap-result", JSON.stringify(data));
        sessionStorage.setItem("unwrap-name", name);
        sessionStorage.setItem("unwrap-mode", mode);
        navigate("/results");
      } catch (err) {
        clearInterval(interval);
        console.error("Generation error:", err);
        toast.error("We're still thinking... using thoughtful defaults instead 🎁");

        const fallback = generateFallback(name, relationship, occasion, budget, newAnswers, mode);
        sessionStorage.setItem("unwrap-result", JSON.stringify(fallback));
        sessionStorage.setItem("unwrap-name", name);
        sessionStorage.setItem("unwrap-mode", mode);
        navigate("/results");
      }
    }
  }, [currentQ, answers, name, relationship, occasion, budget, age, mode, navigate, activeQuestions, totalQuestions]);

  if (isLoading) {
    return <LoadingScreen mode={mode} loadingText={loadingText} />;
  }

  const emojis = optionEmojis[questionId] || ["•", "•", "•", "•"];

  // Render name in purple within the question text
  const questionText = question.question(name);
  const parts = questionText.split(name);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-lg mx-auto px-6 pt-8 pb-20">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-[13px] text-muted-foreground mb-2">
            <span className="font-medium">Q{currentQ + 1} of {totalQuestions}</span>
            <span className="capitalize">{mode} mode</span>
          </div>
          <div className="w-full h-1.5 bg-unwrap-purple-soft rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full gradient-progress"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="font-display font-bold text-foreground text-[26px] mb-8 leading-snug text-center">
              {parts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < parts.length - 1 && <span className="text-primary">{name}</span>}
                </span>
              ))}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <motion.button
                  key={option.value}
                  whileHover={{ y: -2, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(option.value)}
                  className="w-full text-left p-5 rounded-2xl border-[1.5px] border-border bg-card hover:border-unwrap-purple-vivid hover:bg-unwrap-purple-soft/30 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{emojis[idx]}</span>
                    <span className="text-[15px] font-medium text-foreground leading-relaxed group-hover:text-primary transition-colors">
                      {option.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Quiz;
