import { NextResponse } from "next/server";

const GITHUB_USERNAME = "shashanksuman0327-eng";
const CONTRIBUTIONS_REGEX = /(\d+)\s+contributions in the last year/i;

export const dynamic = "force-dynamic";

export async function GET() {
  const response = await fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions`, {
    headers: {
      "user-agent": "Mozilla/5.0",
      accept: "text/html,application/xhtml+xml",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Unable to load GitHub contributions." },
      { status: response.status }
    );
  }

  const html = await response.text();
  const match = html.match(CONTRIBUTIONS_REGEX);

  if (!match) {
    return NextResponse.json(
      { error: "Could not parse contribution count." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    username: GITHUB_USERNAME,
    contributionsLastYear: Number(match[1]),
    source: `https://github.com/users/${GITHUB_USERNAME}/contributions`,
  });
}
