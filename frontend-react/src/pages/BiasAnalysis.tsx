import { useState } from 'react'
import DonutChart from '../components/DonutChart'
import ContentAudit from '../components/ContentAudit'
import BiasCard from '../components/BiasCard'
import RecommendationCard from '../components/RecommendationCard'
import ExplanationCard from '../components/ExplanationCard'

export default function BiasAnalysis() {
  const [analysisData] = useState({
    overallScore: 32,
    riskLevel: 'medium',
    genderBias: 12,
    stereotypes: 48,
    linguistic: 92,
    recommendations: [
      'Replace "rockstar" with inclusive skills-based language.',
      'Remove university tier references to broaden the candidate pool.',
      'Audit "culture fit" criteria for specific soft skills.',
      'Add explicit statement encouraging all age groups to apply.',
    ],
    explanations: [
      {
        type: 'Age Bias',
        title: 'Capability Stereotyping',
        description:
          'The phrasing links age with an inability to adapt to fast-paced environments, which reinforces ageist stereotypes in tech hiring.',
        color: 'amber',
      },
      {
        type: 'Elitism',
        title: 'Educational Exclusion',
        description:
          'Focusing on "top-tier" institutions creates a socioeconomic barrier that systemically excludes qualified diverse talent.',
        color: 'rose',
      },
    ],
  })

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return '#22c55e'
      case 'medium':
        return '#f59e0b'
      case 'high':
        return '#f43f5e'
      default:
        return '#64748b'
    }
  }

  const getBiasLevel = (score: number) => {
    if (score < 30) return 'Low'
    if (score < 60) return 'Medium'
    return 'High'
  }

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Analysis Results
            </h1>
            <span className="px-4 py-1 rounded-full bg-amber-50 text-[#f59e0b] text-xs font-extrabold uppercase border border-amber-100 tracking-wider">
              Moderate Risk
            </span>
          </div>
          <p className="text-slate-500 max-w-2xl font-medium">
            Detailed findings for the article{' '}
            <span className="text-slate-800">"Tech Hiring Trends 2024"</span>. Review
            the identified biases and recommended corrections below.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-gray-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
            Re-scan
          </button>
          <button className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            Share Results
          </button>
        </div>
      </div>

      {/* Bias Scores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Overall Score */}
        <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Overall Bias Score
          </h3>
          <DonutChart
            percentage={analysisData.overallScore}
            label={analysisData.riskLevel}
            color={getRiskColor(analysisData.riskLevel)}
          />
          <p className="text-sm text-slate-500 px-4">
            This content has a moderate probability of biased interpretation in
            professional contexts.
          </p>
        </div>

        {/* Individual Bias Scores */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <BiasCard
            icon="person_search"
            title="Gender Bias"
            level={getBiasLevel(analysisData.genderBias)}
            percentage={analysisData.genderBias}
            color="emerald"
          />
          <BiasCard
            icon="group"
            title="Stereotypes"
            level={getBiasLevel(analysisData.stereotypes)}
            percentage={analysisData.stereotypes}
            color="amber"
          />
          <BiasCard
            icon="translate"
            title="Linguistic"
            level={`${analysisData.linguistic}%`}
            percentage={analysisData.linguistic}
            color="emerald"
          />
        </div>
      </div>

      {/* Content Audit and Explanations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column - Content Audit */}
        <div className="lg:col-span-2 space-y-8">
          <ContentAudit />

          {/* Recommendations */}
          <div className="bg-emerald-50 rounded-3xl border border-emerald-100 p-8">
            <div className="flex items-center gap-3 text-emerald-800 font-bold mb-6">
              <span className="material-symbols-outlined">auto_awesome</span>
              <h4 className="text-lg">Improvement Recommendations</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisData.recommendations.map((rec, index) => (
                <RecommendationCard key={index} text={rec} />
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - AI Explanations */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">
            AI Explanations
          </h3>

          {analysisData.explanations.map((exp, index) => (
            <ExplanationCard
              key={index}
              type={exp.type}
              title={exp.title}
              description={exp.description}
              color={exp.color}
            />
          ))}

          {/* Detailed Metrics */}
          <div className="bg-slate-900 rounded-3xl p-8 space-y-6">
            <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em]">
              Detailed Metrics
            </h4>
            <div className="space-y-5">
              <MetricBar label="Inclusion Index" value={74} />
              <MetricBar label="Semantic Neutrality" value={42} />
            </div>
            <button className="w-full text-center text-xs font-bold text-slate-400 hover:text-white transition-colors">
              View Methodology →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold text-slate-300">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
