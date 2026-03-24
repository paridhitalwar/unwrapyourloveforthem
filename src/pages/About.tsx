import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Heart, MessageCircle, Gift } from "lucide-react";

const steps = [
  { icon: Heart, title: "Tell us about the person", desc: "Share their name, your relationship, and the occasion" },
  { icon: MessageCircle, title: "Answer 6 questions about who they are", desc: "Quick, thoughtful prompts to help us understand them" },
  { icon: Gift, title: "Get a personalised gift direction", desc: "Not a product list — a thinking partner for your gift" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-lg mx-auto px-6 pt-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-primary mb-4">What is Unwrap?</h1>
          <p className="text-foreground leading-relaxed mb-2">
            Unwrap helps you think before you search. It's not a gift shop. It's a thinking partner.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-10">
            Great gifts don't start with a product catalogue — they start with understanding the person. 
            Unwrap asks the right questions so you feel confident in your direction before you ever open a shopping tab.
          </p>

          <h2 className="text-lg font-semibold text-primary mb-6">How it works</h2>
          <div className="space-y-6 mb-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.15 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Built as a concept MVP for a product design project
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default About;
