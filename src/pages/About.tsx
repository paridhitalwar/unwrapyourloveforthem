import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Heart, MessageCircle, Gift } from "lucide-react";

const steps = [
  { icon: Heart, title: "Tell us about the person", desc: "Share their name, your relationship, and the occasion", color: "bg-rose-50 text-rose-500" },
  { icon: MessageCircle, title: "Answer questions about who they are", desc: "Quick, thoughtful prompts to help us understand them", color: "bg-unwrap-purple-soft text-primary" },
  { icon: Gift, title: "Get a personalised gift direction", desc: "Not a product list — a thinking partner for your gift", color: "bg-amber-50 text-amber-600" },
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
          <h1 className="font-display font-bold text-3xl text-primary mb-4">What is Unwrap?</h1>
          <p className="text-foreground leading-relaxed mb-2 text-base">
            Unwrap helps you think before you search. It's not a gift shop. It's a thinking partner.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-10">
            Great gifts don't start with a product catalogue — they start with understanding the person. 
            Unwrap asks the right questions so you feel confident in your direction before you ever open a shopping tab.
          </p>

          <h2 className="font-display font-semibold text-xl text-primary mb-6">How it works</h2>
          <div className="space-y-5 mb-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.15 }}
                className="flex items-start gap-4"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${step.color}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-[15px]">{step.title}</h3>
                  <p className="text-[13px] text-muted-foreground mt-0.5">{step.desc}</p>
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
