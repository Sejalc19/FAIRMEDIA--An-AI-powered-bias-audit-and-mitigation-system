"""
Fairness Engine Service
Calculates fairness metrics and generates mitigation recommendations.
"""

from typing import List, Dict
from schemas.ai_schema import BiasScores
from schemas.fairness_schema import FairnessResult, MitigationWeights
import logging

logger = logging.getLogger(__name__)


class FairnessEngineService:
    """
    Fairness engine for calculating risk levels and generating recommendations.
    
    This service takes bias scores from the AI service and:
    1. Calculates risk levels
    2. Generates fairness scores
    3. Provides mitigation weights for content re-ranking
    4. Suggests actionable recommendations
    """
    
    def __init__(self):
        # Risk thresholds
        self.risk_thresholds = {
            'low': 0.3,
            'medium': 0.6,
            'high': 0.8
        }
        
        # Recommendation templates
        self.recommendations_db = {
            'gender_bias': [
                "Use gender-neutral language (e.g., 'they/them' instead of 'he/she')",
                "Replace gendered job titles with neutral alternatives",
                "Ensure balanced representation of all genders in examples",
                "Review pronouns for unnecessary gender assumptions"
            ],
            'stereotype': [
                "Replace stereotypical terms with skills-based language",
                "Avoid age-related assumptions about capabilities",
                "Use specific, measurable criteria instead of vague cultural terms",
                "Remove jargon that may exclude diverse candidates"
            ],
            'exclusionary': [
                "Remove educational institution tier references",
                "Focus on skills and experience rather than credentials",
                "Broaden language to include self-taught and alternative paths",
                "Replace 'culture fit' with specific behavioral competencies"
            ],
            'general': [
                "Conduct a diversity review of all content",
                "Include diverse perspectives in content creation",
                "Test content with diverse focus groups",
                "Implement regular bias audits"
            ]
        }
        
        logger.info("⚖️ Fairness Engine Service initialized")
    
    def calculate(
        self,
        bias_scores: BiasScores,
        content: str,
        highlighted_spans: List = None
    ) -> FairnessResult:
        """
        Calculate fairness metrics and generate recommendations.
        
        Args:
            bias_scores: Bias scores from AI service
            content: Original text content
            highlighted_spans: Optional list of highlighted bias spans
            
        Returns:
            FairnessResult with risk level, fairness score, and recommendations
        """
        logger.info(f"⚖️ Calculating fairness metrics (overall_bias={bias_scores.overall:.2f})")
        
        # Determine risk level
        risk_level = self._calculate_risk_level(bias_scores.overall)
        
        # Calculate fairness score (inverse of bias)
        fairness_score = self._calculate_fairness_score(bias_scores)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(bias_scores, highlighted_spans)
        
        # Calculate mitigation weights
        mitigation_weights = self._calculate_mitigation_weights(bias_scores.overall, risk_level)
        
        # Calculate detailed metrics
        detailed_metrics = {
            'gender_fairness': self._score_to_percentage(1.0 - bias_scores.gender_bias),
            'stereotype_fairness': self._score_to_percentage(1.0 - bias_scores.stereotype),
            'language_fairness': self._score_to_percentage(1.0 - bias_scores.language_dominance),
            'inclusion_index': self._calculate_inclusion_index(bias_scores),
            'semantic_neutrality': self._calculate_semantic_neutrality(bias_scores)
        }
        
        result = FairnessResult(
            risk_level=risk_level,
            fairness_score=fairness_score,
            recommendations=recommendations,
            mitigation_weights=mitigation_weights,
            detailed_metrics=detailed_metrics,
            engine_version="fairness-engine-v1.0.0"
        )
        
        logger.info(f"✅ Fairness calculation complete: risk={risk_level}, score={fairness_score:.2f}")
        
        return result
    
    def _calculate_risk_level(self, overall_bias: float) -> str:
        """Determine risk level based on overall bias score."""
        if overall_bias < self.risk_thresholds['low']:
            return 'low'
        elif overall_bias < self.risk_thresholds['medium']:
            return 'medium'
        elif overall_bias < self.risk_thresholds['high']:
            return 'high'
        else:
            return 'critical'
    
    def _calculate_fairness_score(self, bias_scores: BiasScores) -> float:
        """
        Calculate overall fairness score.
        
        Fairness score is a weighted combination of individual fairness metrics.
        Higher score = more fair (less biased)
        """
        # Weighted average of fairness (inverse of bias)
        fairness = (
            (1.0 - bias_scores.gender_bias) * 0.35 +
            (1.0 - bias_scores.stereotype) * 0.35 +
            (1.0 - bias_scores.language_dominance) * 0.30
        )
        
        return round(fairness, 3)
    
    def _generate_recommendations(
        self,
        bias_scores: BiasScores,
        highlighted_spans: List = None
    ) -> List[str]:
        """Generate actionable recommendations based on bias scores."""
        recommendations = []
        
        # Gender bias recommendations
        if bias_scores.gender_bias > 0.3:
            recommendations.extend(self.recommendations_db['gender_bias'][:2])
        
        # Stereotype recommendations
        if bias_scores.stereotype > 0.3:
            recommendations.extend(self.recommendations_db['stereotype'][:2])
        
        # Exclusionary language recommendations
        if bias_scores.language_dominance > 0.3:
            recommendations.extend(self.recommendations_db['exclusionary'][:2])
        
        # General recommendations if overall bias is high
        if bias_scores.overall > 0.6:
            recommendations.extend(self.recommendations_db['general'][:1])
        
        # Ensure we have at least 3 recommendations
        if len(recommendations) < 3:
            recommendations.extend(self.recommendations_db['general'][:3 - len(recommendations)])
        
        # Limit to top 6 recommendations
        return recommendations[:6]
    
    def _calculate_mitigation_weights(self, overall_bias: float, risk_level: str) -> MitigationWeights:
        """
        Calculate content re-ranking weights for bias mitigation.
        
        Higher bias = lower weight (content is de-prioritized in rankings)
        """
        original_weight = 1.0
        
        # Calculate adjustment factor based on bias level
        if risk_level == 'low':
            adjustment_factor = overall_bias * 0.2
        elif risk_level == 'medium':
            adjustment_factor = overall_bias * 0.4
        elif risk_level == 'high':
            adjustment_factor = overall_bias * 0.6
        else:  # critical
            adjustment_factor = overall_bias * 0.8
        
        # Ensure minimum weight of 0.1 (never completely suppress content)
        adjusted_weight = max(0.1, original_weight - adjustment_factor)
        
        # Generate rationale
        rationale = self._generate_weight_rationale(overall_bias, risk_level, adjustment_factor)
        
        return MitigationWeights(
            original_weight=original_weight,
            adjusted_weight=round(adjusted_weight, 2),
            adjustment_factor=round(adjustment_factor, 2),
            rationale=rationale
        )
    
    def _generate_weight_rationale(self, bias: float, risk: str, adjustment: float) -> str:
        """Generate human-readable rationale for weight adjustment."""
        if risk == 'low':
            return f"Minimal adjustment ({adjustment:.0%}) due to low bias level (score: {bias:.2f})"
        elif risk == 'medium':
            return f"Moderate adjustment ({adjustment:.0%}) applied due to medium bias level (score: {bias:.2f})"
        elif risk == 'high':
            return f"Significant adjustment ({adjustment:.0%}) applied due to high bias level (score: {bias:.2f})"
        else:
            return f"Critical adjustment ({adjustment:.0%}) applied due to critical bias level (score: {bias:.2f})"
    
    def _calculate_inclusion_index(self, bias_scores: BiasScores) -> float:
        """
        Calculate inclusion index (0-100).
        
        Measures how inclusive the content is across all dimensions.
        """
        # Average of all fairness scores
        avg_fairness = (
            (1.0 - bias_scores.gender_bias) +
            (1.0 - bias_scores.stereotype) +
            (1.0 - bias_scores.language_dominance)
        ) / 3.0
        
        # Boost score if all dimensions are relatively fair
        if all([
            bias_scores.gender_bias < 0.4,
            bias_scores.stereotype < 0.4,
            bias_scores.language_dominance < 0.4
        ]):
            avg_fairness = min(1.0, avg_fairness * 1.1)
        
        return self._score_to_percentage(avg_fairness)
    
    def _calculate_semantic_neutrality(self, bias_scores: BiasScores) -> float:
        """
        Calculate semantic neutrality (0-100).
        
        Measures how neutral the language is (absence of loaded terms).
        """
        # Weighted combination emphasizing stereotype and language
        neutrality = (
            (1.0 - bias_scores.gender_bias) * 0.25 +
            (1.0 - bias_scores.stereotype) * 0.40 +
            (1.0 - bias_scores.language_dominance) * 0.35
        )
        
        return self._score_to_percentage(neutrality)
    
    def _score_to_percentage(self, score: float) -> float:
        """Convert 0-1 score to 0-100 percentage."""
        return round(score * 100, 1)
