import { Sparkles, Scissors, Wind, Wrench, Zap, Paintbrush } from "lucide-react";

const ICONS = {
  sparkles: Sparkles,
  scissors: Scissors,
  wind: Wind,
  wrench: Wrench,
  zap: Zap,
  paintbrush: Paintbrush,
};

export default function ServiceIcon({ name, size = 22, className = "" }) {
  const Icon = ICONS[name] || Sparkles;
  return <Icon size={size} className={className} strokeWidth={1.75} />;
}