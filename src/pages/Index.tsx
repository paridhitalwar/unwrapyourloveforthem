import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { relationships, occasions, type QuizMode } from "@/lib/quiz-data";

const Index = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [mode, setMode] = useState<QuizMode>("quick");

  const canProceed = name.trim() && relationship && occasion && budget;

  const handleSubmit = () => {
    if (!canProceed) return;
    const params = new URLSearchParams({ name: name.trim(), relationship, occasion, budget, mode });
    navigate(`/quiz?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-md mx-auto px-6 pt-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm text-muted-foreground mb-3">
            Because every great gift starts with understanding
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
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
            <Label htmlFor="name" className="text-sm font-medium text-foreground">Their name</Label>
            <Input
              id="name"
              placeholder="e.g. Priya"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-card border-border rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Your relationship with them</Label>
            <Select value={relationship} onValueChange={setRelationship}>
              <SelectTrigger className="h-12 bg-card border-border rounded-lg">
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
            <Label className="text-sm font-medium text-foreground">What's the occasion?</Label>
            <Select value={occasion} onValueChange={setOccasion}>
              <SelectTrigger className="h-12 bg-card border-border rounded-lg">
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
            <Label htmlFor="budget" className="text-sm font-medium text-foreground">Your budget (₹)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="e.g. 1000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="h-12 bg-card border-border rounded-lg"
            />
          </div>

          {/* Mode Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">How deep should we go?</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode("quick")}
                className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                  mode === "quick"
                    ? "border-primary bg-secondary ring-1 ring-primary"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    mode === "quick" ? "border-primary" : "border-muted-foreground"
                  }`}>
                    {mode === "quick" && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <span className="text-sm font-semibold text-foreground">Quick</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">6 questions · ~3 mins</p>
                <p className="text-xs text-muted-foreground ml-6">For casual occasions</p>
              </button>

              <button
                type="button"
                onClick={() => setMode("deep")}
                className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                  mode === "deep"
                    ? "border-primary bg-secondary ring-1 ring-primary"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    mode === "deep" ? "border-primary" : "border-muted-foreground"
                  }`}>
                    {mode === "deep" && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <span className="text-sm font-semibold text-foreground">Deep dive</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">15 questions · ~8 mins</p>
                <p className="text-xs text-muted-foreground ml-6">For people who matter most</p>
              </button>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canProceed}
            className="w-full h-12 text-base font-semibold rounded-lg mt-4"
          >
            Let's figure this out →
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-3">
            {mode === "quick" ? "Takes about 3 minutes." : "Takes about 8 minutes."} No sign up needed.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
