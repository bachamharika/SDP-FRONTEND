import { GlobalWorkerOptions } from 'pdfjs-dist';

// Set the worker source manually
GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js';
