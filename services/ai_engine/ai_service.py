"""
AI Bias Detection Service
Analyzes text content for various types of bias using NLP techniques.
"""

import re
from typing import List, Dict, Tuple
from schemas.ai_schema import AIAnalysisResult, BiasScores, HighlightedSpan
import logging

logger = logging.getLogger(__name__)


class AIBiasDetectionService:
    """
    AI service for detecting bias in text content.
    
    This is a simplified implementation using pattern matching and keyword detection.
    In production, this would use ML models (BERT, spaCy, etc.)
    """
    
    def __init__(self):
        # Gender bias patterns
        self.gendered_pronouns = {
            'male': ['he', 'him', 'his', 'himself', 'man', 'men', 'male', 'boy', 'boys', 'guy', 'guys'],
            'female': ['she', 'her', 'hers', 'herself', 'woman', 'women', 'female', 'girl', 'girls', 'gal', 'gals']
        }
        
        # Stereotypical terms
        self.stereotype_keywords = [
            'rockstar', 'ninja', 'guru', 'wizard', 'aggressive', 'emotional',
            'bossy', 'pushy', 'shrill', 'hysterical', 'dramatic', 'sensitive',
            'ambitious', 'assertive', 'dominant', 'submissive'
        ]
        
        # Age bias keywords
        self.age_bias_keywords = [
            'young', 'old', 'older', 'elderly', 'senior', 'junior',
            'millennial', 'boomer', 'gen z', 'experienced', 'veteran',
            'fresh', 'energetic', 'outdated', 'traditional'
        ]
        
        # Exclusionary language
        self.exclusionary_keywords = [
            'top-tier', 'elite', 'prestigious', 'ivy league', 'culture fit',
            'native speaker', 'perfect english', 'must have degree'
        ]
        
        logger.info("🤖 AI Bias Detection Service initialized")
    
    def analyze(self, content: str, language: str = 'en') -> AIAnalysisResult:
        """
        Analyze content for bias.
        
        Args:
            content: Text to analyze
            language: Language code (default: 'en')
            
        Returns:
            AIAnalysisResult with bias scores and highlighted spans
        """
        logger.info(f"🔍 Analyzing {len(content)} characters for bias")
        
        content_lower = content.lower()
        
        # Detect bias types
        gender_bias, gender_spans = self._detect_gender_bias(content, content_lower)
        stereotype_bias, stereotype_spans = self._detect_stereotypes(content, content_lower)
        language_bias, language_spans = self._detect_language_bias(content, content_lower)
        
        # Calculate overall bias (weighted average)
        overall_bias = (
            gender_bias * 0.4 +
            stereotype_bias * 0.4 +
            language_bias * 0.2
        )
        
        # Combine all highlighted spans
        all_spans = gender_spans + stereotype_spans + language_spans
        
        # Generate explanations
        explanations = {
            'gender_bias': self._explain_gender_bias(gender_bias, gender_spans),
            'stereotype': self._explain_stereotypes(stereotype_bias, stereotype_spans),
            'language_dominance': self._explain_language_bias(language_bias, language_spans)
        }
        
        # Calculate confidence based on content length and clarity
        confidence = min(0.95, 0.7 + (len(content) / 10000) * 0.25)
        
        result = AIAnalysisResult(
            bias_scores=BiasScores(
                gender_bias=gender_bias,
                stereotype=stereotype_bias,
                language_dominance=language_bias,
                overall=overall_bias
            ),
            explanations=explanations,
            highlighted_text=all_spans,
            language_detected=language,
            confidence=confidence,
            model_version="pattern-based-v1.0.0"
        )
        
        logger.info(f"✅ Analysis complete: overall_bias={overall_bias:.2f}")
        
        return result
    
    def _detect_gender_bias(self, content: str, content_lower: str) -> Tuple[float, List[HighlightedSpan]]:
        """Detect gender bias in content."""
        spans = []
        male_count = 0
        female_count = 0
        
        # Count gendered pronouns
        words = content_lower.split()
        for i, word in enumerate(words):
            word_clean = re.sub(r'[^\w]', '', word)
            
            if word_clean in self.gendered_pronouns['male']:
                male_count += 1
                # Find position in original text
                start = content_lower.find(word_clean)
                if start != -1:
                    spans.append(HighlightedSpan(
                        span=[start, start + len(word_clean)],
                        text=content[start:start + len(word_clean)],
                        bias_type='gender_bias',
                        severity='low' if male_count + female_count < 3 else 'medium',
                        contribution_score=0.1
                    ))
            
            elif word_clean in self.gendered_pronouns['female']:
                female_count += 1
                start = content_lower.find(word_clean)
                if start != -1:
                    spans.append(HighlightedSpan(
                        span=[start, start + len(word_clean)],
                        text=content[start:start + len(word_clean)],
                        bias_type='gender_bias',
                        severity='low' if male_count + female_count < 3 else 'medium',
                        contribution_score=0.1
                    ))
        
        # Calculate bias score based on imbalance
        total = male_count + female_count
        if total == 0:
            bias_score = 0.0
        else:
            imbalance = abs(male_count - female_count) / total
            bias_score = min(1.0, imbalance * 0.8)
        
        return bias_score, spans[:5]  # Limit to 5 spans
    
    def _detect_stereotypes(self, content: str, content_lower: str) -> Tuple[float, List[HighlightedSpan]]:
        """Detect stereotypical language."""
        spans = []
        matches = 0
        
        for keyword in self.stereotype_keywords:
            if keyword in content_lower:
                matches += 1
                start = content_lower.find(keyword)
                if start != -1:
                    spans.append(HighlightedSpan(
                        span=[start, start + len(keyword)],
                        text=content[start:start + len(keyword)],
                        bias_type='stereotype',
                        severity='medium' if matches > 2 else 'low',
                        contribution_score=0.15
                    ))
        
        # Check for age bias
        for keyword in self.age_bias_keywords:
            if keyword in content_lower:
                matches += 1
                start = content_lower.find(keyword)
                if start != -1:
                    spans.append(HighlightedSpan(
                        span=[start, start + len(keyword)],
                        text=content[start:start + len(keyword)],
                        bias_type='age_bias',
                        severity='medium',
                        contribution_score=0.2
                    ))
        
        # Calculate bias score
        bias_score = min(1.0, matches * 0.15)
        
        return bias_score, spans[:5]
    
    def _detect_language_bias(self, content: str, content_lower: str) -> Tuple[float, List[HighlightedSpan]]:
        """Detect exclusionary language and elitism."""
        spans = []
        matches = 0
        
        for keyword in self.exclusionary_keywords:
            if keyword in content_lower:
                matches += 1
                start = content_lower.find(keyword)
                if start != -1:
                    spans.append(HighlightedSpan(
                        span=[start, start + len(keyword)],
                        text=content[start:start + len(keyword)],
                        bias_type='exclusionary',
                        severity='high' if 'tier' in keyword or 'elite' in keyword else 'medium',
                        contribution_score=0.25
                    ))
        
        # Calculate bias score
        bias_score = min(1.0, matches * 0.2)
        
        return bias_score, spans[:5]
    
    def _explain_gender_bias(self, score: float, spans: List[HighlightedSpan]) -> str:
        """Generate explanation for gender bias."""
        if score < 0.2:
            return "Minimal gender bias detected. Language appears relatively balanced."
        elif score < 0.5:
            return f"Moderate gender bias detected. Found {len(spans)} instances of gendered language that may create implicit associations."
        else:
            return f"Significant gender bias detected. The text contains imbalanced gendered language ({len(spans)} instances) that may reinforce stereotypes."
    
    def _explain_stereotypes(self, score: float, spans: List[HighlightedSpan]) -> str:
        """Generate explanation for stereotypes."""
        if score < 0.2:
            return "Low stereotypical language detected. Content appears inclusive."
        elif score < 0.5:
            return f"Moderate stereotypical patterns identified. Found {len(spans)} terms that may carry implicit biases or age-related assumptions."
        else:
            return f"High level of stereotypical language detected. Multiple instances ({len(spans)}) of terms that reinforce biases or exclusionary patterns."
    
    def _explain_language_bias(self, score: float, spans: List[HighlightedSpan]) -> str:
        """Generate explanation for language/exclusionary bias."""
        if score < 0.2:
            return "Minimal exclusionary language. Content appears accessible and inclusive."
        elif score < 0.5:
            return f"Some exclusionary language detected. Found {len(spans)} terms that may create barriers or limit diversity."
        else:
            return f"Significant exclusionary language present. Multiple instances ({len(spans)}) of elitist or limiting terminology that may systematically exclude qualified candidates."
