"use client";

import React, { useEffect, useState } from "react";

type ContributionResponse = {
  username: string;
  contributionsLastYear: number;
  source: string;
};

export const GithubContributionCount: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadContributionCount = async () => {
      try {
        const response = await fetch("/api/github/contributions", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load GitHub contributions.");
        }

        const data = (await response.json()) as ContributionResponse;

        if (!mounted) return;

        setCount(data.contributionsLastYear);
        setError(null);
      } catch (fetchError) {
        if (!mounted) return;

        setError(fetchError instanceof Error ? fetchError.message : "Failed to load contribution count.");
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadContributionCount();
    const refreshTimer = window.setInterval(loadContributionCount, 15 * 60 * 1000);

    return () => {
      mounted = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  return (
    <div className="grid grid-cols-12 gap-1">
      <span className="col-span-4 text-mint/70 font-semibold">GitHub:</span>
      <span className="col-span-8 text-terminal-bright">
        {isLoading ? (
          "Syncing live contribution count..."
        ) : error ? (
          <span className="text-amber">{error}</span>
        ) : (
          <span className="text-cyan font-bold">{count} contributions in the last year</span>
        )}
      </span>
    </div>
  );
};
