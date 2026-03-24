import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import { quizQuestions, getQuestionsForMode, type QuizMode } from "@/lib/quiz-data";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generateFallback } from "@/lib/quiz-fallback";

const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "them";
  const relationship = searchParams.get("relationship") || "";
  const occasion = searchParams.get("occasion") || "";
  const budget = searchParams.get("budget") || "";
  const mode = (searchParams.get("mode") || "quick") as QuizMode;

  const activeQuestions = getQuestionsForMode(mode);
  const totalQuestions = activeQuestions.length;

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Reading between the lines...");

  const question = activeQuestions[currentQ];

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
        toast.error("Something went wrong. Using thoughtful defaults instead.");

        const fallback = generateFallback(name, relationship, occasion, budget, newAnswers, mode);
        sessionStorage.setItem("unwrap-result", JSON.stringify(fallback));
        sessionStorage.setItem("unwrap-name", name);
        sessionStorage.setItem("unwrap-mode", mode);
        navigate("/results");
      }
    }
  }, [currentQ, answers, name, relationship, occasion, budget, mode, navigate, activeQuestions, totalQuestions]);

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
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Q{currentQ + 1} of {totalQuestions}</span>
            <span className="capitalize">{mode} mode</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
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

export default Quiz;
