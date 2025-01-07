import React from 'react';

interface CSVLinkProps {
  data: any[];
  headers?: { label: string; key: string }[];
  filename?: string;
  className?: string;
  children?: React.ReactNode;
}

export const CSVLink: React.FC<CSVLinkProps> = ({
  data,
  headers,
  filename = 'download.csv',
  className,
  children
}) => {
  const processRow = (row: any) => {
    const processCell = (cell: any) => {
      if (cell === null || cell === undefined) return '';
      return typeof cell === 'string' && cell.includes(',') 
        ? `"${cell}"` 
        : String(cell);
    };

    if (headers) {
      return headers.map(header => processCell(row[header.key])).join(',');
    }
    return Object.values(row).map(processCell).join(',');
  };

  const processData = () => {
    let csv = '';
    
    // Add headers
    if (headers) {
      csv += headers.map(header => header.label).join(',') + '\\n';
    } else if (data.length > 0) {
      csv += Object.keys(data[0]).join(',') + '\\n';
    }

    // Add rows
    csv += data.map(processRow).join('\\n');
    
    return csv;
  };

  const download = (e: React.MouseEvent) => {
    e.preventDefault();
    const csv = processData();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <a 
      href="#" 
      onClick={download}
      className={className}
    >
      {children}
    </a>
  );
};
