import type { ChangeEvent, ReactNode } from "react";
import { StationCard } from "../components/radio/StationCard";
import { useRadio } from "../context/radioContext";
import { useRadioStations } from "../hooks/useRadioStations";
import { useUrlQuery } from "../hooks/useUrlQuery";

export function RadioPage() {
  const { text, query, setSearchText, isWaiting } = useUrlQuery();
  const { data: stations, isLoading, isError } = useRadioStations(query);
  const { current, play } = useRadio();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  let content: ReactNode;
  if (isWaiting || isLoading) {
    content = <p className="text-gray-500">Loading stations...</p>;
  } else if (isError || !stations) {
    content = <p className="text-red-600">Could not load stations.</p>;
  } else if (stations.length === 0) {
    content = (
      <p>
        No stations found for <strong>{query}</strong>.
      </p>
    );
  } else {
    content = (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stations.map((station) => (
          <StationCard
            key={station.id}
            station={station}
            isPlaying={current?.id === station.id}
            onPlay={play}
          />
        ))}
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold">Radio</h1>
      <p className="mt-1 text-gray-600">Find and listen to stations across Nigeria.</p>
      <input
        type="search"
        value={text}
        onChange={handleChange}
        placeholder="Search by name, frequency (e.g. 94.1) or state..."
        aria-label="Search stations"
        className="mt-4 w-full rounded-md border border-gray-300 px-4 py-3 text-base focus:border-green-800 focus:outline-none"
      />
      <div className="mt-6" aria-live="polite">
        {content}
      </div>
    </main>
  );
}