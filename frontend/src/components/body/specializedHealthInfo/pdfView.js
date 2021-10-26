import React, { useState } from "react";
import "../../../static/Styling/spViewFiles.css";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfView(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  
  return (
    <div className="mainPdf">
      <Document
      className='react-pdf__Page__canvas'
      // onItemClick={}
        file={`http://localhost:5000/${props.getFilePath}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
  
    </div>
  );
}
