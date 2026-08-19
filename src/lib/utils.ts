export function formatDate(dateStr: string): string {
  if (!dateStr) return 'Present';
  const [year, month] = dateStr.split('-');
  if (!year) return dateStr;
  if (month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIdx = parseInt(month, 10) - 1;
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${months[monthIdx]} ${year}`;
    }
  }
  return year;
}

export function dateRange(start: string, end: string, current: boolean): string {
  const endDisplay = current ? 'Present' : formatDate(end);
  return `${formatDate(start)} — ${endDisplay}`;
}

export function genId(): string {
  return Math.random().toString(36).substring(2, 11);
}
