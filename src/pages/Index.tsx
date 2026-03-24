import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { relationships, occasions } from "@/lib/quiz-data";

const Index = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");

  const canProceed = name.trim() && relationship && occasion && budget;

  const handleSubmit = () => {
    if (!canProceed) return;
    const params = new URLSearchParams({ name: name.trim(), relationship, occasion, budget });
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

          <Button
            onClick={handleSubmit}
            disabled={!canProceed}
            className="w-full h-12 text-base font-semibold rounded-lg mt-4"
          >
            Let's figure this out →
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-3">
            Takes about 5 minutes. No sign up needed.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
