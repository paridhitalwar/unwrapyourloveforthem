import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
      <Link to="/" className="flex items-center gap-1.5 text-2xl font-display font-bold text-primary tracking-tight">
        <span>🎁</span>
        <span>Unwrap</span>
      </Link>
      <Link
        to="/about"
        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
      >
        How it works
      </Link>
    </nav>
  );
};

export default Navigation;
