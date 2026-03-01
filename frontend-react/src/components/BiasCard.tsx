interface BiasCardProps {
  icon: string
  title: string
  level: string
  percentage: number
  color: 'emerald' | 'amber' | 'rose'
}

export default function BiasCard({ icon, title, level, percentage, color }: BiasCardProps) {
  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-[#22c55e]',
      bar: 'bg-[#22c55e]',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-[#f59e0b]',
      bar: 'bg-[#f59e0b]',
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-[#f43f5e]',
      bar: 'bg-[#f43f5e]',
    },
  }

  const colors = colorClasses[color]

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
      <div className={`size-10 ${colors.bg} rounded-xl flex items-center justify-center ${colors.text}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-500 mb-1">{title}</h4>
        <p className="text-2xl font-black text-slate-800">{level}</p>
      </div>
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div
          className={`${colors.bar} h-full transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
