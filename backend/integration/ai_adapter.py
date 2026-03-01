"""
Adapter for Member 2's AI Service.
Handles all communication with the AI bias detection service.
"""

import httpx
from typing import Optional
from schemas.ai_schema import AIAnalysisResult, BiasScores, HighlightedSpan
from backend.config import settings
from services.ai_engine.ai_service import AIBiasDetectionService
import logging

logger = logging.getLogger(__name__)


class AIAdapter:
    """
    Adapter for communicating with Member 2's AI Service.
    
    Uses the local AI service for bias detection.
    Can be switched to HTTP calls for microservice architecture.
    """
    
    def __init__(self):
        self.base_url = settings.AI_SERVICE_URL
        self.timeout = 30.0
        self.ai_service = AIBiasDetectionService()
        logger.info(f"🤖 AI Adapter initialized with local service")
    
    async def analyze_bias(
        self,
        content: str,
        analysis_id: str,
        language: Optional[str] = None
    ) -> AIAnalysisResult:
        """
        Call AI service to analyze bias in content.
        
        Args:
            content: Text to analyze
            analysis_id: Unique identifier for this analysis
            language: Optional language hint (ISO 639-1 code)
            
        Returns:
            AIAnalysisResult with bias scores and explanations
        """
        logger.info(f"🤖 AI Adapter: Analyzing content for {analysis_id}")
        
        try:
            # Use local AI service
            result = self.ai_service.analyze(
                content=content,
                language=language or 'en'
            )
            
            logger.info(
                f"✅ AI analysis completed for {analysis_id}: "
                f"overall_bias={result.bias_scores.overall:.2f}"
            )
            
            return result
            
        except Exception as e:
            logger.error(f"❌ AI service error for {analysis_id}: {e}")
            raise
    
    async def health_check(self) -> bool:
        """
        Check if AI service is healthy.
        
        Returns:
            True if service is healthy, False otherwise
        """
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(f"{self.base_url}/health")
                return response.status_code == 200
        except Exception as e:
            logger.warning(f"⚠️  AI service health check failed: {e}")
            return False
