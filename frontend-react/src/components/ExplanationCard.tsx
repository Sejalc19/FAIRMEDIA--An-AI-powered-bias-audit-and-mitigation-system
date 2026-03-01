interface ExplanationCardProps {
  type: string
  title: string
  description: string
  color: 'amber' | 'rose' | 'blue'
}

export default function ExplanationCard({
  type,
  title,
  description,
  color,
}: ExplanationCardProps) {
  const colorClasses = {
    amber: {
      badge: 'text-amber-500 bg-amber-50',
    },
    rose: {
      badge: 'text-rose-500 bg-rose-50',
    },
    blue: {
      badge: 'text-blue-500 bg-blue-50',
    },
  }

  const colors = colorClasses[color]

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all group cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-[10px] font-black ${colors.badge} px-2 py-0.5 rounded uppercase`}
        >
          {type}
        </span>
        <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-500 transition-colors">
          info
        </span>
      </div>
      <h5 className="text-sm font-bold text-slate-800 mb-2">{title}</h5>
      <p className="text-xs leading-relaxed text-slate-500">{description}</p>
    </div>
  )
}
