export default function Header() {
  return (
    <header className="h-20 flex items-center justify-between px-10 bg-white/70 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400">Audits</span>
        <span className="material-symbols-outlined text-slate-300 text-sm">
          chevron_right
        </span>
        <span className="font-semibold text-slate-600">
          Tech Hiring Analysis #8842
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="size-9 rounded-full bg-slate-100 border border-gray-200 flex items-center justify-center overflow-hidden">
          <img
            alt="Profile"
            className="w-full h-full object-cover"
            src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff"
          />
        </div>
      </div>
    </header>
  )
}
