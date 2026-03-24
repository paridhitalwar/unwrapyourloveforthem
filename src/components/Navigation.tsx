import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
      <Link to="/" className="text-2xl font-bold text-primary tracking-tight">
        Unwrap
      </Link>
      <Link
        to="/about"
        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        How it works
      </Link>
    </nav>
  );
};

export default Navigation;
