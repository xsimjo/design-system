export function normalizeToDay(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isDateOutOfRange(date: Date, minDay: Date | null, maxDay: Date | null): boolean {
	if (minDay && date < minDay) return true;
	if (maxDay && date > maxDay) return true;
	return false;
}
