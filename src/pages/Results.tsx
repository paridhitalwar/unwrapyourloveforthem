import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Confetti from "@/components/Confetti";
import type { GiftResult, QuizMode } from "@/lib/quiz-data";

const stripeColors = ["bg-unwrap-purple-vivid", "bg-unwrap-amber", "bg-unwrap-mint", "bg-unwrap-coral"];
const stripeTextColors = ["text-unwrap-purple-vivid", "text-unwrap-amber", "text-unwrap-mint", "text-unwrap-coral"];

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<GiftResult | null>(null);
  const [name, setName] = useState("");
  const [mode, setMode] = useState<QuizMode>("quick");
  const [openTerritory, setOpenTerritory] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const stored = sessionStorage.getItem("unwrap-result");
    const storedName = sessionStorage.getItem("unwrap-name");
    const storedMode = sessionStorage.getItem("unwrap-mode") as QuizMode | null;
    if (!stored || !storedName) {
      navigate("/start");
      return;
    }
    setResult(JSON.parse(stored));
    setName(storedName);
    if (storedMode) setMode(storedMode);
  }, [navigate]);

  if (!result) return null;

  const cardNoteEntries = [
    { label: "HEARTFELT", color: "bg-unwrap-purple-soft text-primary", text: result.cardNotes.heartfelt },
    { label: "WARM/FUNNY", color: "bg-amber-50 text-amber-700", text: result.cardNotes.funny },
    { label: "SHORT/SINCERE", color: "bg-emerald-50 text-emerald-700", text: result.cardNotes.simple },
    ...(result.cardNotes.playful ? [{ label: "PLAYFUL (INSIDE JOKE)", color: "bg-rose-50 text-rose-700", text: result.cardNotes.playful }] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Confetti />
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 pb-20">
        {/* Portrait */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="rounded-3xl p-7 sm:p-10 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(var(--unwrap-purple)) 0%, hsl(var(--unwrap-purple-vivid)) 100%)" }}>
            {/* Decorative sparkles */}
            <div className="absolute top-6 right-6 text-white/20 text-2xl">✦</div>
            <div className="absolute bottom-6 right-10 text-white/15 text-lg">✦</div>

            <h2 className="font-display font-bold text-white text-2xl sm:text-[28px] leading-tight mb-4">
              Here's what I see<br />in {name}
            </h2>
            <p className="font-display italic text-white/85 text-[15px] sm:text-[17px] leading-[1.75]">
              {result.portrait}
            </p>
          </div>
        </motion.section>

        {/* Territories — Accordion */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 space-y-3"
        >
          {result.territories.map((territory, idx) => {
            const isOpen = openTerritory === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
              >
                {/* Header — always visible */}
                <button
                  onClick={() => setOpenTerritory(isOpen ? -1 : idx)}
                  className="w-full flex items-center gap-3 p-5 text-left"
                >
                  <div className={`w-1.5 h-10 rounded-full flex-shrink-0 ${stripeColors[idx % 4]}`} />
                  <span className="text-2xl flex-shrink-0">{territory.emoji}</span>
                  <h3 className={`font-display font-bold text-lg flex-1 ${stripeTextColors[idx % 4]}`}>
                    {territory.name}
                  </h3>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Content — collapsible */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-4">
                        <p className="text-sm italic text-muted-foreground">{territory.description}</p>

                        {/* Gift ideas */}
                        {territory.giftIdeas.map((idea, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="font-medium text-[15px] text-foreground flex-1">{idea}</span>
                            {i === 0 && territory.trendingIdea && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold whitespace-nowrap">
                                🌿 TRENDING
                              </span>
                            )}
                          </div>
                        ))}

                        {/* DIY */}
                        {territory.diyOption && (
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">DIY Choice</p>
                            <p className="text-sm text-foreground">{territory.diyOption}</p>
                          </div>
                        )}

                        {/* Customization */}
                        {territory.customization && (
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Personalisation</p>
                            <p className="text-sm text-foreground">{territory.customization}</p>
                          </div>
                        )}

                        {/* Shopping links */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {territory.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[12px] px-3.5 py-1.5 rounded-full bg-muted text-foreground font-medium hover:bg-unwrap-purple-soft hover:text-primary transition-all duration-200"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Trending Picks */}
        {result.trendingPicks && result.trendingPicks.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <span>📈</span> Trending for someone like {name}
            </h2>
            <div className="space-y-3">
              {result.trendingPicks.map((pick, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-card rounded-2xl p-4 border border-border">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-lg flex-shrink-0">🌿</div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{pick.item}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pick.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Surprise Note */}
        {result.surpriseNote && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mb-8"
          >
            <div className="p-5 rounded-xl bg-unwrap-purple-soft border border-unwrap-purple-vivid/10">
              <p className="text-sm text-foreground italic">💡 {result.surpriseNote}</p>
            </div>
          </motion.section>
        )}

        {/* Card Notes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <span>❤️</span> What to write in the card
          </h2>
          <div className="space-y-3">
            {cardNoteEntries.map((note, idx) => (
              <div key={idx} className="bg-card rounded-2xl p-5 border border-border">
                <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider ${note.color}`}>
                  {note.label}
                </span>
                <p className="font-display italic text-[15px] text-foreground leading-relaxed">
                  "{note.text}"
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Start over */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sessionStorage.removeItem("unwrap-result");
              sessionStorage.removeItem("unwrap-name");
              sessionStorage.removeItem("unwrap-mode");
              navigate("/start");
            }}
            className="w-full max-w-sm px-8 py-3.5 rounded-full border-[1.5px] border-primary text-primary font-semibold hover:gradient-purple hover:text-white hover:border-transparent transition-all duration-300"
          >
            Start over for someone else
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Results;
