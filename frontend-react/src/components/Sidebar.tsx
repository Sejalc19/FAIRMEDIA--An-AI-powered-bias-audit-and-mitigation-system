interface SidebarProps {
  currentPage: string
  onNavigate: (page: 'dashboard' | 'bias-analysis' | 'fairness-metrics') => void
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
    { id: 'bias-analysis', icon: 'analytics', label: 'Bias Analysis' },
    { id: 'fairness-metrics', icon: 'balance', label: 'Fairness Metrics' },
  ]

  const systemItems = [
    { id: 'history', icon: 'history', label: 'Audit History' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ]

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
      {/* Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="size-10 bg-[#2563eb] rounded-xl flex items-center justify-center text-white">
          <span className="material-symbols-outlined">gavel</span>
        </div>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-800">
          FAIRMEDIA
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-1">
        <div className="pb-4 pt-2">
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Main Menu
          </p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                currentPage === item.id
                  ? 'bg-blue-50 text-[#2563eb]'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className={`text-sm ${currentPage === item.id ? 'font-bold' : 'font-semibold'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="pt-6">
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            System
          </p>
          {systemItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Export Button */}
      <div className="p-6 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white py-3.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-200">
          <span className="material-symbols-outlined text-lg">download</span>
          Export Report
        </button>
      </div>
    </aside>
  )
}
