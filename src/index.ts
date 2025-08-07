// Main entry point for the image content analyzer package
export { 
  analyzeImageFast, 
  analyzeImagesBatch,
  type ImageAnalysisDetail,
  type ExplicitContentAnalysis 
} from './combinedImageAnalysis';

export { 
  analyzeImageForExplicitContent,
  type ImageAnalysisResult 
} from './skinDetection';

export { 
  analyzeImageText,
  analyzeMultipleImageTexts,
  type TextAnalysisResult 
} from './tesseractDetection';

// Default export for convenience
import { analyzeImageFast, analyzeImagesBatch } from './combinedImageAnalysis';

export default {
  analyzeImageFast,
  analyzeImagesBatch
};