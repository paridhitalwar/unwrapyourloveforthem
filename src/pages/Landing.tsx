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
            <button onClick={() => scrollTo("why-unwrap")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Why Unwrap
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

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-card flex flex-col items-center justify-center gap-8 animate-fade-in">
          <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5 p-2 text-foreground">
            <X className="w-7 h-7" />
          </button>
          <button onClick={() => scrollTo("how-it-works")} className="text-xl font-medium text-foreground">How it works</button>
          <button onClick={() => scrollTo("why-unwrap")} className="text-xl font-medium text-foreground">Why Unwrap</button>
          <button onClick={() => { setMenuOpen(false); navigate("/start"); }} className="text-xl font-semibold gradient-purple text-white px-8 py-3 rounded-full">
            Try it free
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-5 pt-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-unwrap-purple-soft/50 blur-3xl" />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[10%] w-24 h-24 md:w-40 md:h-40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-unwrap-amber/20 opacity-30 rotate-12"
          />
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[25%] left-[8%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-unwrap-coral/15 opacity-30 -rotate-12"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] left-[15%] w-16 h-16 md:w-28 md:h-28 rounded-[60%_40%_30%_70%/50%_60%_40%_50%] bg-unwrap-purple-soft/40 opacity-30 rotate-45"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center relative z-10 max-w-2xl"
        >
          <span className="inline-block text-[13px] font-semibold px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 mb-6">
            ✨ AI-powered gifting companion
          </span>

          <h1 className="font-display font-bold text-[64px] md:text-[96px] leading-[0.95] tracking-[-0.02em] mb-3 bg-gradient-to-br from-primary to-unwrap-purple-vivid bg-clip-text text-transparent">
            Unwrap
          </h1>

          <p className="font-display italic text-xl md:text-[28px] text-muted-foreground mb-5">
            Because every great gift starts with understanding.
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[560px] mx-auto mb-8">
            Stop browsing. Start understanding.
            <br className="hidden md:block" />{" "}
            Unwrap helps you figure out the perfect gift for the people you love, before you search for it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/start")}
              className="w-full sm:w-auto px-10 py-4 rounded-full gradient-purple text-white font-semibold text-[17px] shadow-lg hover:shadow-xl transition-shadow btn-shimmer relative overflow-hidden"
            >
              Start gifting →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("how-it-works")}
              className="w-full sm:w-auto px-9 py-[14px] rounded-full border-2 border-primary text-primary font-semibold text-[17px] hover:bg-secondary transition-colors"
            >
              See how it works ↓
            </motion.button>
          </div>

          <p className="text-[13px] text-muted-foreground">
            No sign up needed · Free to use · Takes 5 minutes
          </p>
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
      <section className="gradient-purple py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 md:divide-x md:divide-white/20">
          {[
            { num: "$10.1B", label: "wasted on unwanted gifts yearly" },
            { num: "70%", label: "find gift cards impersonal" },
            { num: "2–4 hrs", label: "average time spent deciding one gift" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center px-8 md:px-12">
              <p className="font-display font-bold text-4xl md:text-5xl text-unwrap-amber mb-2">{stat.num}</p>
              <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
              {idx < 2 && <div className="md:hidden w-16 h-px bg-white/20 mx-auto mt-8" />}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 bg-card">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center mb-14">
            <p className="text-[13px] font-semibold text-unwrap-purple-vivid uppercase tracking-[0.15em] mb-3">
              How it works
            </p>
            <h2 className="font-display font-bold text-3xl md:text-[40px] text-foreground leading-tight">
              Three steps to a gift that<br className="hidden md:block" /> actually means something
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", numColor: "text-unwrap-purple-vivid", emoji: "💭", title: "Tell me about them", body: "Share who you're gifting, their name, your relationship, the occasion. That's all we need to start." },
              { num: "02", numColor: "text-unwrap-amber", emoji: "🧠", title: "Answer 6–15 questions", body: "We ask about their personality, life season, aesthetic, and what makes them tick. Not the occasion, the person." },
              { num: "03", numColor: "text-unwrap-coral", emoji: "🎁", title: "Get your gift direction", body: "Receive a personalised gift direction, not a product list. We tell you what kind of gift fits and why." },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-card border border-border rounded-3xl p-8 md:p-10 text-center hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
              >
                <span className={`font-display font-bold text-5xl ${card.numColor} opacity-30`}>{card.num}</span>
                <p className="text-5xl my-4">{card.emoji}</p>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">{card.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY UNWRAP */}
      <section id="why-unwrap" className="py-20 md:py-28 bg-secondary">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2 className="font-display font-bold italic text-3xl md:text-[42px] text-primary text-center mb-14 leading-tight">
            Gifting shouldn't feel like this.
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              {[
                "😰 You spend 3 hours on Amazon and still aren't sure",
                "😬 You text a mutual friend 'does she already have this?'",
                "😶 You buy a gift card. Again. And feel a bit bad about it.",
                "😩 You search 'gifts for someone who likes cooking' and get 47 generic listicles",
              ].map((pain, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-5 border-l-4 border-unwrap-coral text-foreground text-[15px] font-medium shadow-sm"
                >
                  {pain}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-[20px] border-l-[6px] border-primary p-8 md:p-10 shadow-card"
            >
              <h3 className="font-display font-bold text-2xl text-primary mb-4">Unwrap fixes this.</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                Most gifting tools help you find products.
                <br /><br />
                Unwrap helps you understand the person first.
                <br /><br />
                We ask the questions you'd ask a close friend who knows the recipient: personality, current life season, what they'd never buy themselves.
                <br /><br />
                Then we give you a gift direction that actually makes sense for THIS person, right now. Not a generic list.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/start")}
                className="px-8 py-3 rounded-full gradient-purple text-white font-semibold text-[15px] shadow-lg hover:shadow-xl transition-shadow"
              >
                Try it, it's free →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground py-10 px-5 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="font-display font-bold text-white text-xl">🎁 Unwrap</span>
            <p className="text-white/50 text-sm mt-1">Because every great gift starts with understanding</p>
          </div>
          <p className="text-white/40 text-xs">Built as a concept MVP · NextLeap PM Fellowship 2026</p>
        </div>
        <p className="text-white/30 text-xs text-center mt-6">No sign up. No marketplace. Just better gifting decisions.</p>
      </footer>
    </div>
  );
};

export default Landing;
