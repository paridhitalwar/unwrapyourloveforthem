import { Link } from "react-router-dom";
import { Gift } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
      <Link to="/" className="flex items-center gap-1.5 text-2xl font-display font-bold text-primary tracking-tight">
        <Gift className="w-6 h-6" />
        <span>Unwrap</span>
      </Link>
    </nav>
  );
};

export default Navigation;
