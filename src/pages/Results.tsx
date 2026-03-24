import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import type { GiftResult } from "@/lib/quiz-data";

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<GiftResult | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("unwrap-result");
    const storedName = sessionStorage.getItem("unwrap-name");
    if (!stored || !storedName) {
      navigate("/");
      return;
    }
    setResult(JSON.parse(stored));
    setName(storedName);
  }, [navigate]);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-2xl mx-auto px-6 pt-8 pb-20">
        {/* Portrait */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-sm font-medium text-muted-foreground mb-2">
            Here's what I know about {name}
          </h2>
          <div className="p-6 rounded-xl bg-secondary border border-border">
            <p className="text-foreground leading-relaxed text-[15px]">
              {result.portrait}
            </p>
          </div>
        </motion.section>

        {/* Territories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            Three directions to explore
          </h2>
          <div className="space-y-4">
            {result.territories.map((territory, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.15 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{territory.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-primary text-base">{territory.name}</h3>
                    <p className="text-sm text-muted-foreground">{territory.description}</p>
                  </div>
                </div>

                <div className="ml-9 space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Gift ideas</p>
                    <ul className="space-y-1.5">
                      {territory.giftIdeas.map((idea, i) => (
                        <li key={i} className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-accent mt-0.5">•</span>
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Make it yourself</p>
                    <p className="text-sm text-foreground">{territory.diyOption}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Customise it</p>
                    <p className="text-sm text-foreground">{territory.customization}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Find it here</p>
                    <div className="flex flex-wrap gap-2">
                      {territory.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-full bg-secondary text-primary font-medium hover:bg-unwrap-purple-soft transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Card Notes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            What to write in the card
          </h2>
          <div className="space-y-3">
            {[
              { label: "Heartfelt", text: result.cardNotes.heartfelt },
              { label: "Funny & warm", text: result.cardNotes.funny },
              { label: "Simple & sincere", text: result.cardNotes.simple },
            ].map((note, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-card border border-border">
                <p className="text-xs font-medium text-accent mb-1.5">{note.label}</p>
                <p className="text-sm text-foreground leading-relaxed italic">"{note.text}"</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button
            onClick={() => {
              sessionStorage.removeItem("unwrap-result");
              sessionStorage.removeItem("unwrap-name");
              navigate("/");
            }}
            variant="outline"
            className="px-8 h-11"
          >
            Start over for someone else
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Results;
