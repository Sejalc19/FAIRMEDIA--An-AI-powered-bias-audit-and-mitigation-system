interface RecommendationCardProps {
  text: string
}

export default function RecommendationCard({ text }: RecommendationCardProps) {
  // Extract bold text if present
  const parts = text.split(/(\*\*.*?\*\*|".*?")/)
  
  return (
    <li className="flex items-start gap-4 p-4 bg-white/60 rounded-2xl border border-emerald-100/50">
      <span className="material-symbols-outlined text-emerald-500 mt-0.5">
        check_circle
      </span>
      <p className="text-sm font-medium text-slate-700">
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <span key={index} className="font-bold">{part.slice(2, -2)}</span>
          } else if (part.startsWith('"') && part.endsWith('"')) {
            return <span key={index} className="font-bold">{part}</span>
          }
          return <span key={index}>{part}</span>
        })}
      </p>
    </li>
  )
}
