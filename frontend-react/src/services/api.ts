import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface AnalyzeRequest {
  content: string
  language?: string
  metadata?: {
    source?: string
    author?: string
    tags?: string[]
    url?: string
    timestamp?: string
  }
}

export interface BiasScores {
  gender_bias: number
  stereotype: number
  language_dominance: number
  overall: number
}

export interface HighlightedSpan {
  span: [number, number]
  text: string
  bias_type: string
  severity: 'low' | 'medium' | 'high'
  contribution_score?: number
}

export interface AIAnalysisResult {
  bias_scores: BiasScores
  explanations: Record<string, string>
  highlighted_text: HighlightedSpan[]
  language_detected: string
  confidence: number
  model_version?: string
}

export interface MitigationWeights {
  original_weight: number
  adjusted_weight: number
  adjustment_factor: number
  rationale?: string
}

export interface FairnessResult {
  risk_level: string
  fairness_score: number
  recommendations: string[]
  mitigation_weights: MitigationWeights
  detailed_metrics?: Record<string, number>
  engine_version?: string
}

export interface AnalyzeResponse {
  analysis_id: string
  timestamp: string
  bias_detection: AIAnalysisResult
  fairness_metrics: FairnessResult
  storage_location: string
  status: string
  processing_time_ms?: number
}

export const api = {
  // Health check
  async checkHealth(): Promise<boolean> {
    try {
      const response = await apiClient.get('/health')
      return response.status === 200
    } catch (error) {
      console.error('Health check failed:', error)
      return false
    }
  },

  // Analyze content
  async analyzeContent(request: AnalyzeRequest): Promise<AnalyzeResponse> {
    try {
      const response = await apiClient.post<AnalyzeResponse>('/api/v1/analyze', request)
      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.detail || 'Analysis failed')
      } else if (error.request) {
        throw new Error('Cannot connect to backend. Is the server running?')
      } else {
        throw new Error('Unexpected error: ' + error.message)
      }
    }
  },

  // Get stored analysis
  async getAnalysis(analysisId: string): Promise<AnalyzeResponse> {
    try {
      const response = await apiClient.get<AnalyzeResponse>(`/api/v1/analysis/${analysisId}`)
      return response.data
    } catch (error: any) {
      throw new Error('Failed to retrieve analysis: ' + (error.response?.data?.detail || error.message))
    }
  },
}

export default api
