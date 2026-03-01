interface DonutChartProps {
  percentage: number
  label: string
  color: string
}

export default function DonutChart({ percentage, label, color }: DonutChartProps) {
  const circumference = 2 * Math.PI * 70
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="20"
        />
        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke={color}
          strokeWidth="20"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-slate-800">
          {Math.round(percentage)}
          <span className="text-xl text-slate-400 font-bold">%</span>
        </span>
        <span className="text-[10px] font-bold uppercase" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  )
}
