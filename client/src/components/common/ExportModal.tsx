import { useState } from 'react';

interface ExportModalProps {
  speechContent: string;
  speechTitle: string;
  speechMeta?: {
    occasion: string;
    wordCount: number;
    estimatedDuration: string;
  };
  onClose: () => void;
}

type ExportFormat = 'pdf' | 'text' | 'cue-cards' | 'docx';

const ExportModal: React.FC<ExportModalProps> = ({ 
  speechContent, 
  speechTitle, 
  speechMeta,
  onClose 
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [fontSize, setFontSize] = useState(12);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: 'pdf' as ExportFormat,
      name: 'PDF Document',
      description: 'Professional format for printing and sharing',
      icon: '📄',
      features: ['High-quality formatting', 'Print-ready', 'Universal compatibility']
    },
    {
      id: 'text' as ExportFormat,
      name: 'Plain Text',
      description: 'Simple text file for easy copying',
      icon: '📝',
      features: ['Lightweight', 'Easy to edit', 'Universal format']
    },
    {
      id: 'cue-cards' as ExportFormat,
      name: 'Cue Cards',
      description: 'Split into cards for easy practice',
      icon: '🗂️',
      features: ['Practice-friendly', 'Key points highlighted', 'Portable format']
    },
    {
      id: 'docx' as ExportFormat,
      name: 'Word Document',
      description: 'Editable format for further customization',
      icon: '📘',
      features: ['Fully editable', 'Rich formatting', 'Microsoft Word compatible']
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      switch (selectedFormat) {
        case 'pdf':
          await exportToPDF();
          break;
        case 'text':
          await exportToText();
          break;
        case 'cue-cards':
          await exportToCueCards();
          break;
        case 'docx':
          await exportToDocx();
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async () => {
    // For now, we'll create a simple HTML version that can be printed as PDF
    const htmlContent = generateHTMLContent();
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Trigger print dialog
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const exportToText = async () => {
    const textContent = generateTextContent();
    const blob = new Blob([textContent], { type: 'text/plain' });
    downloadFile(blob, `${speechTitle}.txt`);
  };

  const exportToCueCards = async () => {
    const cueCardsContent = generateCueCardsHTML();
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(cueCardsContent);
      printWindow.document.close();
      
      // Trigger print dialog
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const exportToDocx = async () => {
    // For demonstration, we'll export as RTF which is compatible with Word
    const rtfContent = generateRTFContent();
    const blob = new Blob([rtfContent], { type: 'application/rtf' });
    downloadFile(blob, `${speechTitle}.rtf`);
  };

  const generateHTMLContent = () => {
    const metadata = includeMetadata && speechMeta ? `
      <div style="margin-bottom: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
        <h3 style="margin: 0 0 1rem 0; color: #495057;">Speech Details</h3>
        <p><strong>Occasion:</strong> ${speechMeta.occasion}</p>
        <p><strong>Word Count:</strong> ${speechMeta.wordCount} words</p>
        <p><strong>Estimated Duration:</strong> ${speechMeta.estimatedDuration}</p>
      </div>
    ` : '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${speechTitle}</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: ${fontSize}pt;
            line-height: ${lineSpacing};
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
          }
          h1 { 
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 0.5rem;
            margin-bottom: 2rem;
          }
          p { margin-bottom: 1rem; }
          @media print {
            body { margin: 0; padding: 1rem; }
          }
        </style>
      </head>
      <body>
        <h1>${speechTitle}</h1>
        ${metadata}
        <div>${speechContent.replace(/\n/g, '</p><p>')}</div>
      </body>
      </html>
    `;
  };

  const generateTextContent = () => {
    let content = `${speechTitle}\n${'='.repeat(speechTitle.length)}\n\n`;
    
    if (includeMetadata && speechMeta) {
      content += `Speech Details:\n`;
      content += `- Occasion: ${speechMeta.occasion}\n`;
      content += `- Word Count: ${speechMeta.wordCount} words\n`;
      content += `- Estimated Duration: ${speechMeta.estimatedDuration}\n\n`;
      content += `${'='.repeat(50)}\n\n`;
    }
    
    content += speechContent;
    content += `\n\n---\nGenerated by writeaspeech.org`;
    
    return content;
  };

  const generateCueCardsHTML = () => {
    const sentences = speechContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
    // const cardsPerPage = 4; // Future use for pagination
    const cards = [];
    
    for (let i = 0; i < sentences.length; i += 2) {
      const cardContent = sentences.slice(i, i + 2).join('. ').trim() + '.';
      cards.push(cardContent);
    }

    const cardHTML = cards.map((card, index) => `
      <div class="cue-card">
        <div class="card-number">${index + 1}</div>
        <div class="card-content">${card}</div>
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${speechTitle} - Cue Cards</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 1rem;
          }
          .page-title {
            text-align: center;
            margin-bottom: 2rem;
            font-size: 1.5rem;
            color: #2c3e50;
          }
          .cue-cards-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .cue-card {
            border: 2px solid #3498db;
            border-radius: 8px;
            padding: 1rem;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            page-break-inside: avoid;
            background: white;
          }
          .card-number {
            background: #3498db;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }
          .card-content {
            font-size: 14pt;
            line-height: 1.4;
            flex: 1;
          }
          @media print {
            body { padding: 0.5rem; }
            .cue-card { 
              min-height: 100px;
              margin-bottom: 0.5rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="page-title">${speechTitle} - Practice Cue Cards</div>
        <div class="cue-cards-container">
          ${cardHTML}
        </div>
      </body>
      </html>
    `;
  };

  const generateRTFContent = () => {
    const rtfText = speechContent.replace(/\n/g, '\\par ');
    return `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}
\\f0\\fs24 
{\\b ${speechTitle}}\\par\\par
${rtfText}\\par\\par
---\\par
Generated by writeaspeech.org
}`;
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFormatIcon = (format: ExportFormat) => {
    const formatData = exportFormats.find(f => f.id === format);
    return formatData?.icon || '📄';
  };

  return (
    <div className="export-overlay">
      <div className="export-container">
        <div className="export-header">
          <h2>📤 Export Speech</h2>
          <p className="speech-title">"{speechTitle}"</p>
          <button 
            className="btn btn-secondary btn-small"
            onClick={onClose}
          >
            ✕ Close
          </button>
        </div>

        <div className="export-content">
          <div className="format-selection">
            <h3>Choose Export Format</h3>
            <div className="format-grid">
              {exportFormats.map((format) => (
                <div
                  key={format.id}
                  className={`format-card ${selectedFormat === format.id ? 'selected' : ''}`}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <div className="format-icon">{format.icon}</div>
                  <h4>{format.name}</h4>
                  <p>{format.description}</p>
                  <ul className="format-features">
                    {format.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="export-options">
            <h3>Export Options</h3>
            
            <div className="option-group">
              <label>
                <input
                  type="checkbox"
                  checked={includeMetadata}
                  onChange={(e) => setIncludeMetadata(e.target.checked)}
                />
                Include speech metadata (occasion, word count, duration)
              </label>
            </div>

            {(selectedFormat === 'pdf' || selectedFormat === 'docx') && (
              <>
                <div className="option-group">
                  <label>
                    Font Size: {fontSize}pt
                    <input
                      type="range"
                      min="10"
                      max="18"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="option-slider"
                    />
                  </label>
                </div>

                <div className="option-group">
                  <label>
                    Line Spacing: {lineSpacing}x
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={lineSpacing}
                      onChange={(e) => setLineSpacing(Number(e.target.value))}
                      className="option-slider"
                    />
                  </label>
                </div>
              </>
            )}
          </div>

          <div className="export-preview">
            <h3>Preview</h3>
            <div className="preview-box">
              <div className="preview-header">
                <span className="preview-format">{getFormatIcon(selectedFormat)} {exportFormats.find(f => f.id === selectedFormat)?.name}</span>
                <span className="preview-size">{Math.round(speechContent.length / 1024)}KB (estimated)</span>
              </div>
              <div className="preview-content">
                <h4>{speechTitle}</h4>
                {includeMetadata && speechMeta && (
                  <div className="preview-metadata">
                    <p><strong>Occasion:</strong> {speechMeta.occasion}</p>
                    <p><strong>Word Count:</strong> {speechMeta.wordCount} words</p>
                  </div>
                )}
                <div className="preview-text">
                  {speechContent.substring(0, 200)}...
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="export-footer">
          <div className="export-info">
            <p>💡 <strong>Tip:</strong> For best results, use PDF for professional presentation or cue cards for practice sessions.</p>
          </div>
          
          <div className="export-actions">
            <button 
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            
            <button 
              className="btn btn-primary btn-large"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? '⏳ Exporting...' : `📤 Export as ${exportFormats.find(f => f.id === selectedFormat)?.name}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
