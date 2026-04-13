/**
 * Simple CSV export utility
 */
export function exportToCsv<T extends Record<string, unknown>>(
  filename: string,
  data: T[],
  headers?: { key: keyof T; label: string }[]
) {
  if (data.length === 0) return;

  const actualHeaders = headers || Object.keys(data[0]).map(k => ({ key: k, label: k }));
  
  const csvContent = [
    actualHeaders.map(h => `"${String(h.label).replace(/"/g, '""')}"`).join(','),
    ...data.map(row => 
      actualHeaders.map(h => {
        const value = row[h.key];
        const stringValue = value === null || value === undefined ? '' : String(value);
        return `"${stringValue.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
