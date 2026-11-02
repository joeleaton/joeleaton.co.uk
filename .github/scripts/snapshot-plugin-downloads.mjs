// Records lifetime plugin download totals, because GitHub keeps no download history.
//
// A snapshot is only added when a total differs from the previous one, so a date with
// no entry means "unchanged since the last entry". A total of null means the repo has
// no releases to count, which is different from a release nobody has downloaded.
//
// Usage: node snapshot-plugin-downloads.mjs [output path]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const REPOS = ['joeleaton/orbit', 'joeleaton/tides', 'joeleaton/st-bartholomews', 'joeleaton/life'];
const OUTPUT = process.argv[2] || 'public/data/plugin-downloads.json';

async function fetchReleases(repo) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const releases = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`, { headers });
    // Throw rather than record a gap: a failed request must not look like "no releases".
    if (!res.ok) throw new Error(`GitHub API error ${res.status} for ${repo}`);
    const batch = await res.json();
    releases.push(...batch);
    if (batch.length < 100) return releases;
  }
}

async function fetchTotal(repo) {
  const releases = (await fetchReleases(repo)).filter(r => !r.draft);
  if (releases.length === 0) return null;
  return releases.reduce((sum, r) => sum + r.assets.reduce((s, a) => s + a.download_count, 0), 0);
}

const totals = await Promise.all(REPOS.map(fetchTotal));
const downloads = Object.fromEntries(REPOS.map((repo, i) => [repo.split('/')[1], totals[i]]));

const history = existsSync(OUTPUT) ? JSON.parse(readFileSync(OUTPUT, 'utf8')) : { snapshots: [] };
const last = history.snapshots.at(-1);

if (last && JSON.stringify(last.downloads) === JSON.stringify(downloads)) {
  console.log('No change since', last.date);
} else {
  const date = new Date().toISOString().slice(0, 10);
  // A second run on the same day updates that day rather than adding a duplicate date.
  if (last?.date === date) history.snapshots.pop();
  history.snapshots.push({ date, downloads });
  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(history, null, 2) + '\n');
  console.log('Recorded', date, downloads);
}
