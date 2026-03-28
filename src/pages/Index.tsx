import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { relationships, occasions, ageGroups, type QuizMode } from "@/lib/quiz-data";

const Index = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [age, setAge] = useState("");
  const [mode, setMode] = useState<QuizMode>("quick");

  const canProceed = name.trim() && relationship && occasion && budget && age;

  const handleSubmit = () => {
    if (!canProceed) return;
    const params = new URLSearchParams({ name: name.trim(), relationship, occasion, budget, age, mode });
    navigate(`/quiz?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-unwrap-purple-soft/40 blur-3xl" />
        <div className="absolute top-1/2 -left-48 w-80 h-80 rounded-full bg-unwrap-purple-soft/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-unwrap-purple-soft/20 blur-2xl rotate-12" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-[60%_40%_30%_70%/50%_60%_40%_50%] bg-accent/5 blur-2xl -rotate-12" />
      </div>

      <Navigation />

      <main className="max-w-md mx-auto px-6 pt-10 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-display italic text-muted-foreground mb-3 text-lg tracking-wide">
            Because every great gift starts with understanding
          </p>
          <h1 className="text-4xl md:text-[42px] font-display font-bold text-foreground leading-tight">
            Who are you gifting today?
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-primary">Their name</Label>
            <Input
              id="name"
              placeholder="e.g. Priya"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-card border-[1.5px] border-border rounded-2xl focus:border-unwrap-purple-vivid focus:shadow-purple-glow focus:ring-0 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-primary">Your relationship</Label>
            <Select value={relationship} onValueChange={setRelationship}>
              <SelectTrigger className="h-12 bg-card border-[1.5px] border-border rounded-2xl focus:border-unwrap-purple-vivid focus:shadow-purple-glow">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {relationships.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-primary">Occasion</Label>
            <Select value={occasion} onValueChange={setOccasion}>
              <SelectTrigger className="h-12 bg-card border-[1.5px] border-border rounded-2xl focus:border-unwrap-purple-vivid focus:shadow-purple-glow">
                <SelectValue placeholder="Select occasion" />
              </SelectTrigger>
              <SelectContent>
                {occasions.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-xs font-semibold uppercase tracking-wider text-primary">Budget (₹)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="e.g. 1000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="h-12 bg-card border-[1.5px] border-border rounded-2xl focus:border-unwrap-purple-vivid focus:shadow-purple-glow focus:ring-0 transition-all duration-200"
            />
          </div>

          {/* Mode Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-primary">How deep should we go?</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode("quick")}
                className={`p-4 rounded-2xl border-[1.5px] text-left transition-all duration-300 ${
                  mode === "quick"
                    ? "border-transparent gradient-purple text-primary-foreground shadow-card"
                    : "border-primary/30 bg-card text-foreground hover:border-primary/60"
                }`}
              >
                <span className={`text-sm font-semibold ${mode === "quick" ? "text-white" : "text-foreground"}`}>⚡ Quick</span>
                <p className={`text-xs mt-1 ${mode === "quick" ? "text-white/70" : "text-muted-foreground"}`}>6 questions · ~3 mins</p>
                <p className={`text-xs ${mode === "quick" ? "text-white/60" : "text-muted-foreground"}`}>For casual occasions</p>
              </button>

              <button
                type="button"
                onClick={() => setMode("deep")}
                className={`p-4 rounded-2xl border-[1.5px] text-left transition-all duration-300 ${
                  mode === "deep"
                    ? "border-transparent gradient-purple text-primary-foreground shadow-card"
                    : "border-primary/30 bg-card text-foreground hover:border-primary/60"
                }`}
              >
                <span className={`text-sm font-semibold ${mode === "deep" ? "text-white" : "text-foreground"}`}>🔮 Deep dive</span>
                <p className={`text-xs mt-1 ${mode === "deep" ? "text-white/70" : "text-muted-foreground"}`}>15 questions · ~8 mins</p>
                <p className={`text-xs ${mode === "deep" ? "text-white/60" : "text-muted-foreground"}`}>For people who matter most</p>
              </button>
            </div>
          </div>

          <motion.button
            onClick={handleSubmit}
            disabled={!canProceed}
            whileHover={canProceed ? { scale: 1.02 } : {}}
            whileTap={canProceed ? { scale: 0.98 } : {}}
            className="w-full h-14 text-[17px] font-semibold rounded-full mt-4 relative overflow-hidden gradient-purple text-white shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-shimmer"
          >
            Let's figure this out →
          </motion.button>

          <p className="text-center text-[13px] text-muted-foreground mt-3">
            {mode === "quick" ? "Takes about 3 minutes." : "Takes about 8 minutes."} No sign up needed.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
