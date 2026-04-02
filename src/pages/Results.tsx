import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Scissors, Sparkles, Lightbulb, Mail, Share2, Check } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Confetti from "@/components/Confetti";
import type { GiftResult, QuizMode } from "@/lib/quiz-data";

const stripeColors = ["#7C3AED", "#F59E0B", "#10B981", "#FF6B6B"];
const stripeTextColors = ["text-unwrap-purple-vivid", "text-unwrap-amber", "text-unwrap-mint", "text-unwrap-coral"];

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<GiftResult | null>(null);
  const [name, setName] = useState("");
  const [mode, setMode] = useState<QuizMode>("quick");
  const [openTerritory, setOpenTerritory] = useState<number>(0);
  const [feedbackScore, setFeedbackScore] = useState<number | null>(null);

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
    { label: "Heartfelt", color: "bg-unwrap-purple-soft text-primary", text: result.cardNotes.heartfelt },
    { label: "Funny & warm", color: "bg-amber-50 text-amber-700", text: result.cardNotes.funny },
    { label: "Simple & sincere", color: "bg-emerald-50 text-emerald-700", text: result.cardNotes.simple },
    ...(result.cardNotes.playful ? [{ label: "Inside joke", color: "bg-rose-50 text-rose-700", text: result.cardNotes.playful }] : []),
  ];

  const toggleTerritory = (idx: number) => {
    setOpenTerritory(openTerritory === idx ? -1 : idx);
  };

  return (
    <div className="min-h-screen bg-background">
      <Confetti />
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Portrait */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="gradient-purple rounded-3xl p-8 sm:p-10 relative overflow-hidden">

            <p className="font-display italic text-white/60 text-sm uppercase tracking-[0.1em] mb-4">
              Here's what I see in {name}
            </p>
            <p className="font-display text-white text-lg sm:text-xl leading-relaxed">
              {result.portrait}
            </p>
          </div>
        </motion.section>

        {/* Territories as Accordion */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="font-display font-bold text-foreground text-xl mb-5">
            {result.territories.length === 4 ? "Four" : "Three"} directions to explore
          </h2>
          <div className="space-y-3">
            {result.territories.map((territory, idx) => {
              const isOpen = openTerritory === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="bg-card rounded-[20px] shadow-card overflow-hidden"
                >
                  <div className="flex">
                    <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: stripeColors[idx % 4] }} />
                    <div className="flex-1">
                      {/* Accordion Header */}
                      <button
                        onClick={() => toggleTerritory(idx)}
                        className="w-full text-left p-5 sm:p-6 flex items-center gap-3"
                      >
                        <span className="text-2xl">{territory.emoji}</span>
                        <div className="flex-1">
                          <h3 className={`font-display font-bold text-lg ${stripeTextColors[idx % 4]}`}>
                            {territory.name}
                          </h3>
                          <p className="text-sm italic text-muted-foreground mt-0.5 line-clamp-1">{territory.description}</p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                      </button>

                      {/* Accordion Content */}
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 space-y-5">
                          {/* Gift ideas */}
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Gift ideas</p>
                            <ul className="space-y-2">
                              {territory.giftIdeas.map((idea, i) => (
                                <li key={i} className="text-[15px] font-medium text-foreground flex items-start gap-2.5">
                                  <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: stripeColors[idx % 4] }} />
                                  {idea}
                                </li>
                              ))}
                            </ul>
                          </div>


                          {/* DIY */}
                          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                            <p className="text-sm text-foreground">
                              <span className="font-semibold inline-flex items-center gap-1"><Scissors className="w-3.5 h-3.5" /> Make it yourself: </span>
                              {territory.diyOption}
                            </p>
                          </div>

                          {/* Customization */}
                          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-100">
                            <p className="text-sm text-foreground">
                              <span className="font-semibold inline-flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Personalise it: </span>
                              {territory.customization}
                            </p>
                          </div>

                          {/* Links */}
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Find it here</p>
                            <div className="flex flex-wrap gap-2">
                              {territory.links.map((link, i) => (
                                <a
                                  key={i}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[13px] px-4 py-2 rounded-full bg-card border border-border font-medium text-foreground hover:border-unwrap-purple-vivid hover:text-primary transition-all duration-200"
                                >
                                  {link.label} ↗
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Surprise Note */}
        {result.surpriseNote && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mb-10"
          >
            <div className="p-5 rounded-xl bg-unwrap-purple-soft border border-unwrap-purple-vivid/10">
              <p className="text-sm text-foreground italic flex items-start gap-2"><Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5 text-unwrap-purple-vivid" /> {result.surpriseNote}</p>
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
          <div className="rounded-[20px] bg-unwrap-purple-soft/50 p-6 sm:p-7">
            <h2 className="font-display font-bold text-xl text-primary mb-5 flex items-center gap-2">
              <Mail className="w-5 h-5" /> What to write in the card
            </h2>
            <div className="space-y-3">
              {cardNoteEntries.map((note, idx) => (
                <div key={idx} className="bg-card rounded-2xl p-5 shadow-sm">
                  <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3 ${note.color}`}>
                    {note.label}
                  </span>
                  <p className="font-display italic text-base text-foreground leading-relaxed">
                    <span className="text-primary/30 text-2xl font-serif leading-none">"</span>
                    {note.text}
                    <span className="text-primary/30 text-2xl font-serif leading-none">"</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Feedback Row */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-10"
        >
          <div className="rounded-[20px] bg-card p-6 shadow-card text-center">
            <p className="font-display font-semibold text-foreground text-base mb-4">
              Was this specific to {name}?
            </p>
            <div className="flex justify-center gap-3 sm:gap-4 mb-2">
              {[
                { emoji: "😐", score: 1 },
                { emoji: "😑", score: 2 },
                { emoji: "🤔", score: 3 },
                { emoji: "😊", score: 4 },
                { emoji: "🎯", score: 5 },
              ].map(({ emoji, score }) => (
                <button
                  key={score}
                  onClick={() => {
                    setFeedbackScore(score);
                    console.log(`[Unwrap Feedback] Session score: ${score}`);
                  }}
                  className={`text-2xl p-2 rounded-xl transition-all duration-200 ${
                    feedbackScore === score
                      ? "scale-125 border-2 border-primary bg-unwrap-purple-soft"
                      : "hover:scale-110 border-2 border-transparent"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="flex justify-between px-2 mb-3">
              <span className="text-[11px] text-muted-foreground">Too generic</span>
              <span className="text-[11px] text-muted-foreground">Perfectly specific</span>
            </div>
            {feedbackScore !== null && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground italic"
              >
                Thanks — this helps Unwrap get better
              </motion.p>
            )}
          </div>
        </motion.section>

        {/* Share & CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={async () => {
              const directionNames = result.territories.map(t => t.name);
              const shareText = `I used Unwrap to figure out what to gift ${name} 🎁\n\nHere's what it suggested:\n${directionNames.map(d => `→ ${d}`).join("\n")}\n\nFind your gift direction: ${window.location.origin}`;
              if (navigator.share) {
                try {
                  await navigator.share({ title: "Unwrap", text: shareText });
                } catch {}
              } else {
                await navigator.clipboard.writeText(shareText);
                toast.success("Copied to clipboard!", { duration: 2000 });
              }
            }}
            className="w-full max-w-xs px-8 py-3 rounded-full gradient-purple text-white font-semibold flex items-center justify-center gap-2 shadow-md"
          >
            <Share2 className="w-4 h-4" /> Share with a friend
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sessionStorage.removeItem("unwrap-result");
              sessionStorage.removeItem("unwrap-name");
              sessionStorage.removeItem("unwrap-mode");
              navigate("/start");
            }}
            className="px-8 py-3 rounded-full border-[1.5px] border-primary text-primary font-semibold hover:gradient-purple hover:text-white hover:border-transparent transition-all duration-300"
          >
            Start over for someone else
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Results;
