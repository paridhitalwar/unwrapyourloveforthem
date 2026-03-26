import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-card/95 backdrop-blur shadow-card" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-primary text-2xl tracking-tight">
            🎁 Unwrap
          </span>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("how-it-works")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              How it works
            </button>
            <button
              onClick={() => navigate("/start")}
              className="text-sm font-semibold px-5 py-2.5 rounded-full gradient-purple text-white hover:shadow-purple-glow transition-shadow"
            >
              Try it free
            </button>
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 text-foreground">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-card flex flex-col items-center justify-center gap-8 animate-fade-in">
          <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5 p-2 text-foreground">
            <X className="w-7 h-7" />
          </button>
          <button onClick={() => scrollTo("how-it-works")} className="text-xl font-medium text-foreground">How it works</button>
          <button onClick={() => { setMenuOpen(false); navigate("/start"); }} className="text-xl font-semibold gradient-purple text-white px-8 py-3 rounded-full">
            Try it free
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-5 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center relative z-10 max-w-md md:max-w-2xl"
        >
          <span className="inline-block text-[13px] font-semibold px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 mb-6">
            ✨ AI-powered gifting companion
          </span>

          <h1 className="font-display font-bold text-[56px] md:text-[96px] leading-[0.95] tracking-[-0.02em] mb-3 bg-gradient-to-br from-primary to-unwrap-purple-vivid bg-clip-text text-transparent">
            Unwrap
          </h1>

          <p className="font-display italic text-lg md:text-[24px] text-muted-foreground mb-8 leading-snug">
            Because every great gift starts<br className="md:hidden" /> with understanding.
          </p>

          <div className="flex flex-col items-center gap-3 mb-5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/start")}
              className="w-full max-w-xs px-10 py-4 rounded-full gradient-purple text-white font-semibold text-[17px] shadow-lg hover:shadow-xl transition-shadow btn-shimmer relative overflow-hidden"
            >
              Start gifting →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("how-it-works")}
              className="w-full max-w-xs px-9 py-[14px] rounded-full border-2 border-primary text-primary font-semibold text-[17px] hover:bg-secondary transition-colors"
            >
              See how it works ↓
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 text-muted-foreground"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-card py-8 border-y border-border">
        <div className="max-w-md md:max-w-3xl mx-auto px-5 flex items-center justify-around">
          {[
            { num: "$15B", label: "WASTED GIFTS" },
            { num: "82%", label: "IMPERSONAL" },
            { num: "4h+", label: "TIME SPENT" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="font-display font-bold text-2xl md:text-3xl text-foreground">{stat.num}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE CURATOR'S METHOD */}
      <section id="how-it-works" className="py-16 md:py-24 px-5">
        <div className="max-w-md md:max-w-2xl mx-auto">
          <h2 className="font-display font-bold italic text-3xl md:text-[40px] text-foreground text-center mb-12 md:mb-16 leading-tight">
            The Curator's Method
          </h2>

          <div className="space-y-8 md:space-y-10">
            {[
              {
                num: "01",
                emoji: "💬",
                title: "Share the Persona",
                body: "Tell us about their quirks, hidden interests, and the small things that make them smile.",
              },
              {
                num: "02",
                emoji: "🧠",
                title: "Deep Intelligence",
                body: "Our AI analyzes thousands of niche artisans and curated experiences to find the \"soul match.\"",
              },
              {
                num: "03",
                emoji: "🎁",
                title: "The Perfect Reveal",
                body: "Receive a curated list of 3 high-intent options, ready to be gifted with a personal touch.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                className="flex gap-5 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-unwrap-purple-soft flex items-center justify-center text-2xl">
                  {step.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-unwrap-purple-vivid uppercase tracking-wider mb-1">Step {step.num}</p>
                  <h3 className="font-display font-bold text-xl text-foreground mb-1">{step.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GIFTING IS HARD */}
      <section className="py-14 md:py-20 bg-secondary px-5">
        <div className="max-w-md md:max-w-2xl mx-auto">
          <h2 className="font-display font-bold italic text-3xl md:text-[38px] text-foreground text-center mb-3 leading-tight">
            Gifting is hard.
          </h2>
          <p className="text-center text-muted-foreground mb-10 text-base">We've all been there...</p>

          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { emoji: "😰", label: "LAST MINUTE PANIC" },
              { emoji: "😬", label: 'GENERIC "STUFF"' },
              { emoji: "😶", label: "THE AWKWARD SMILE" },
              { emoji: "😩", label: "DUST GATHERERS" },
            ].map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-5 text-center shadow-sm border border-border"
              >
                <p className="text-3xl mb-2">{pain.emoji}</p>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{pain.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UNWRAP FIXES THIS */}
      <section className="py-14 md:py-20 px-5">
        <div className="max-w-md md:max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-purple rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
              Unwrap fixes this.
            </h2>
            <p className="text-white/70 text-[15px] md:text-base leading-relaxed mb-6 max-w-md mx-auto">
              Transition from "checking a box" to "making a memory."
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/start")}
              className="px-8 py-3.5 rounded-full bg-white text-primary font-semibold text-[15px] shadow-lg hover:shadow-xl transition-shadow"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground py-10 px-5">
        <div className="max-w-md md:max-w-2xl mx-auto text-center">
          <span className="font-display font-bold text-white text-xl">🎁 Unwrap</span>
          <div className="flex items-center justify-center gap-6 mt-4 text-white/50 text-xs">
            <span>PRIVACY</span>
            <span>TERMS</span>
            <span>CONTACT CURATOR</span>
          </div>
          <p className="text-white/30 text-xs mt-4">BUILT AS A CONCEPT MVP</p>
          <p className="text-white/20 text-[10px] mt-1">© 2026 Unwrap — NextLeap PM Fellowship</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
