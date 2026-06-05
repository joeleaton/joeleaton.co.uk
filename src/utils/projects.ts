/**
 * Returns the effective date to use when sorting projects.
 *
 * If the project's `year` field is older than the year of its `publishedDate`
 * (i.e. it's a historical project that was only recently added to the site),
 * we sort by the actual project year so old work doesn't bubble to the top.
 * Otherwise we use the precise `publishedDate` for same-year ordering.
 */
export function projectSortDate(data: { year: number; publishedDate: Date }): Date {
  if (data.year < data.publishedDate.getFullYear()) {
    return new Date(data.year, 0, 1);
  }
  return data.publishedDate;
}

export function sortProjects<T extends { data: { year: number; publishedDate: Date } }>(
  projects: T[]
): T[] {
  return [...projects].sort(
    (a, b) => projectSortDate(b.data).getTime() - projectSortDate(a.data).getTime()
  );
}
