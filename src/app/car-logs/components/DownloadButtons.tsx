'use client';

import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function DownloadButtons() {
  const handleDownload = (format: 'csv' | 'pdf') => {
    // TODO: Implement download functionality
    console.log(`Downloading ${format} file`);
  };

  return (
    <div className="space-x-2">
      <Button onClick={() => handleDownload('csv')} variant="outline">
        <Download className="h-4 w-4 mr-2" />
        CSV
      </Button>
      <Button onClick={() => handleDownload('pdf')} variant="outline">
        <Download className="h-4 w-4 mr-2" />
        PDF
      </Button>
    </div>
  );
}

      