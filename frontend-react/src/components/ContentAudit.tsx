export default function ContentAudit() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-8 py-5 border-b border-gray-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-500">article</span>
          Content Audit
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-[#f59e0b]"></div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Ageism
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-[#f43f5e]"></div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Socioeconomic
            </span>
          </div>
        </div>
      </div>

      <div className="p-10 leading-relaxed text-slate-700 text-lg">
        <p className="mb-6">
          In the competitive landscape of software engineering, we often find that{' '}
          <span
            className="highlight-yellow"
            title="Stereotype: Suggests older candidates lack agility"
          >
            older developers might struggle to keep up with the fast-paced agile
            environment
          </span>{' '}
          that modern startups demand.
        </p>

        <p className="mb-6">
          When searching for the next{' '}
          <span
            className="highlight-peach"
            title="Gendered Language: Assumptions in professional jargon"
          >
            "rockstar" candidate
          </span>
          , companies tend to prioritize{' '}
          <span
            className="highlight-peach"
            title="Exclusionary: Limits pool to university-educated individuals"
          >
            graduates from top-tier universities
          </span>
          , often overlooking the massive potential of self-taught veterans from
          diverse backgrounds.
        </p>

        <p>
          This approach ensures that the team remains{' '}
          <span
            className="highlight-yellow"
            title="Linguistic Bias: Vague positive framing for lack of diversity"
          >
            "culture fits"
          </span>
          , although it might inadvertently lead to an echo chamber of ideas.
        </p>
      </div>
    </div>
  )
}
