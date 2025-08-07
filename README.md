# Image Content Analyzer

A comprehensive Node.js library for analyzing images to detect explicit content using advanced skin detection algorithms and OCR text analysis.

## Features

- **Skin Detection**: Advanced RGB, normalized RGB, and HSV classifiers for detecting skin tones
- **OCR Text Analysis**: Extract and analyze text from images using Tesseract.js
- **Batch Processing**: Efficiently analyze multiple images with concurrent processing
- **Caching**: Built-in caching system to improve performance and reduce redundant analysis
- **TypeScript Support**: Full TypeScript definitions included
- **Performance Optimized**: Smart analysis that skips OCR when skin detection confidence is high

## Installation

```bash
npm install image-content-analyzer
```

## Quick Start

```typescript
import { analyzeImageFast, analyzeImagesBatch } from 'image-content-analyzer';

// Analyze a single image
const result = await analyzeImageFast('https://example.com/image.jpg');
console.log(result.isExplicit); // boolean
console.log(result.confidence); // 0-1
console.log(result.skinPercentage); // percentage of skin detected

// Analyze multiple images
const batchResult = await analyzeImagesBatch([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
]);
console.log(batchResult.hasExplicitContent);
```

## API Reference

### `analyzeImageFast(imageUrl: string): Promise<ImageAnalysisDetail>`

Analyzes a single image for explicit content using both skin detection and OCR.

**Parameters:**
- `imageUrl`: URL of the image to analyze

**Returns:** Promise resolving to `ImageAnalysisDetail`

```typescript
interface ImageAnalysisDetail {
  url: string;
  isExplicit: boolean;
  skinPercentage: number;
  confidence: number;
  textAnalysis: TextAnalysisResult;
}
```

### `analyzeImagesBatch(imageUrls: string[]): Promise<ExplicitContentAnalysis>`

Analyzes multiple images in batches with optimized concurrent processing.

**Parameters:**
- `imageUrls`: Array of image URLs to analyze

**Returns:** Promise resolving to `ExplicitContentAnalysis`

```typescript
interface ExplicitContentAnalysis {
  hasExplicitContent: boolean;
  confidence: number;
  details: ImageAnalysisDetail[];
  hasExplicitText: boolean;
  textConfidence: number;
  detectedCategories: string[];
}
```

### Individual Analysis Functions

#### `analyzeImageForExplicitContent(imageUrl: string): Promise<ImageAnalysisResult>`

Performs only skin detection analysis.

#### `analyzeImageText(imageUrl: string): Promise<TextAnalysisResult>`

Performs only OCR text analysis.

## Configuration

The library uses intelligent defaults but you can customize behavior:

- **Cache TTL**: Results are cached for 5 minutes by default
- **OCR Timeout**: OCR analysis times out after 3 seconds
- **Batch Size**: Processes 2 images concurrently in batch mode
- **Confidence Thresholds**: Configurable thresholds for different analysis types

## Examples

### Basic Usage

```typescript
import analyzer from 'image-content-analyzer';

// Using default export
const result = await analyzer.analyzeImageFast('https://example.com/image.jpg');

if (result.isExplicit) {
  console.log(`Image is explicit with ${result.confidence * 100}% confidence`);
  console.log(`Skin percentage: ${result.skinPercentage}%`);
  
  if (result.textAnalysis.hasExplicitText) {
    console.log('Detected explicit text categories:', result.textAnalysis.categories);
  }
}
```

### Batch Processing

```typescript
import { analyzeImagesBatch } from 'image-content-analyzer';

const imageUrls = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
];

const results = await analyzeImagesBatch(imageUrls);

console.log(`Found ${results.details.filter(d => d.isExplicit).length} explicit images`);
console.log('Detected categories:', results.detectedCategories);

// Process individual results
results.details.forEach((detail, index) => {
  console.log(`Image ${index + 1}: ${detail.isExplicit ? 'EXPLICIT' : 'SAFE'}`);
});
```

### Individual Analysis Components

```typescript
import { 
  analyzeImageForExplicitContent, 
  analyzeImageText 
} from 'image-content-analyzer';

// Only skin detection
const skinResult = await analyzeImageForExplicitContent('https://example.com/image.jpg');
console.log('Skin analysis:', skinResult);

// Only text analysis
const textResult = await analyzeImageText('https://example.com/image.jpg');
console.log('Text analysis:', textResult);
```

## Detection Categories

The text analysis component detects content in these categories:

- **Nudity**: nude, naked, topless, etc.
- **Sexual**: sexual content, adult themes, etc.
- **Pornography**: explicit pornographic content
- **Violence**: violent content and threats
- **Gore**: graphic violent content

## Performance

- **Skin Detection**: ~100-200ms per image
- **OCR Analysis**: ~1-3 seconds per image (with timeout)
- **Caching**: Results cached for 5 minutes to improve performance
- **Batch Processing**: Concurrent processing with configurable limits

## Requirements

- Node.js >= 16.0.0
- Images must be accessible via HTTP/HTTPS URLs
- Supported image formats: JPEG, PNG, WebP, GIF, TIFF

## Dependencies

- `sharp`: High-performance image processing
- `tesseract.js`: OCR text extraction

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

## Support

For issues and questions, please use the GitHub Issues page.