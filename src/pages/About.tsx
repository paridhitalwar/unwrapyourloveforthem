import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

const steps = [
  {
    num: "01",
    emoji: "⚙️",
    title: "Tell us about the person",
    desc: "Share the subtle nuances that make them unique. No generic keywords, just their essence.",
  },
  {
    num: "02",
    emoji: "❓",
    title: "Answer 6-15 questions",
    desc: "Our AI curator asks intentional questions to narrow down the invisible threads of a perfect gift.",
  },
  {
    num: "03",
    emoji: "✨",
    title: "Get your gift direction",
    desc: 'Receive a curated strategy—not just products, but the "why" behind the suggestion.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-lg mx-auto px-6 pt-10 pb-20">
        {/* Hero headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-bold text-[32px] md:text-[40px] text-foreground leading-tight mb-4">
            Unwrap helps you think before you search.
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
            Gift-giving is an art form. Most search engines give you lists; we give you clarity.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8 mb-14">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.15 }}
              className="flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-unwrap-purple-soft flex items-center justify-center text-lg">
                {step.emoji}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-unwrap-purple-vivid mb-1">
                  Step {step.num}
                </p>
                <h3 className="font-bold text-foreground text-[17px] mb-1">{step.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-3xl p-8 text-center border border-border shadow-sm mb-8"
        >
          <p className="font-display italic text-xl md:text-2xl text-foreground leading-snug mb-6">
            "It's not a gift shop. It's a thinking partner."
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Built as a concept MVP for a product design project
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default About;
