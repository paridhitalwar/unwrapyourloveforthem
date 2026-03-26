import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

const steps = [
  {
    num: "01",
    icon: "⚙️",
    iconBg: "bg-unwrap-purple-soft",
    title: "Tell us about the person",
    desc: "Share the subtle nuances that make them unique. No generic keywords, just their essence.",
  },
  {
    num: "02",
    icon: "❓",
    iconBg: "bg-amber-50",
    title: "Answer 6–15 questions",
    desc: "Our AI curator asks intentional questions to narrow down the invisible threads of a perfect gift.",
  },
  {
    num: "03",
    icon: "✨",
    iconBg: "bg-unwrap-purple-soft",
    title: "Get your gift direction",
    desc: 'Receive a curated strategy, not just products, but the "why" behind the suggestion.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-lg mx-auto px-6 pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero heading */}
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4 leading-tight">
            Unwrap helps you think before you search.
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-12">
            Gift-giving is an art form. Most search engines give you lists; we give you clarity.
          </p>

          {/* Steps */}
          <div className="space-y-8 mb-14">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.15 }}
                className="flex items-start gap-5"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${step.iconBg}`}>
                  <span className="text-xl">{step.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-[0.12em] mb-1">
                    Step {step.num}
                  </p>
                  <h3 className="font-semibold text-foreground text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mb-10"
          >
            <p className="font-display italic text-xl md:text-2xl text-foreground leading-snug">
              "It's not a gift shop. It's a thinking partner."
            </p>
          </motion.div>

          <p className="text-xs text-muted-foreground text-center uppercase tracking-[0.12em]">
            Built as a concept MVP for a product design project
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default About;
