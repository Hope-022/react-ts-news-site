import type { RadioStation } from "../../types/radioStation";

interface StationCardProps {
  station: RadioStation;
  isPlaying: boolean;
  onPlay: (station: RadioStation) => void;
}

export function StationCard({ station, isPlaying, onPlay }: StationCardProps) {
  const canPlay = Boolean(station.streamUrl);

  return (
    <article className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4">
      <div>
        <h3 className="font-semibold">{station.name}</h3>
        <p className="text-sm text-gray-600">
          {station.frequency} FM · {station.city}, {station.state}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onPlay(station)}
        disabled={!canPlay}
        aria-label={`Listen to ${station.name}`}
        className="shrink-0 rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-gray-900 disabled:bg-gray-200 disabled:text-gray-500"
      >
        {isPlaying ? "Playing" : canPlay ? "Listen" : "Unavailable"}
      </button>
    </article>
  );
}