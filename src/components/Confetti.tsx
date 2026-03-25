import { useEffect, useState } from "react";

const colors = ["#7C3AED", "#F59E0B", "#FF6B6B", "#10B981", "#3B82F6", "#EC4899"];

interface Piece {
  id: number;
  left: string;
  color: string;
  delay: string;
  size: number;
}

const Confetti = () => {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const generated: Piece[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 0.8}s`,
      size: 6 + Math.random() * 6,
    }));
    setPieces(generated);
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            backgroundColor: p.color,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </>
  );
};

export default Confetti;
