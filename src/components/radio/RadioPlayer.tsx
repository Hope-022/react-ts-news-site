import { useState } from "react";
import type { RadioStation } from "../../types/radioStation";

interface RadioPlayerProps {
  station: RadioStation;
  onClose: () => void;
}

export function RadioPlayer({ station, onClose }: RadioPlayerProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      role="region"
      aria-label="Radio player"
      className="fixed inset-x-0 bottom-0 border-t border-green-700 bg-green-900 px-4 py-3 text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase text-lime-300">Now playing</p>
          <p className="font-semibold">
            {station.name} · {station.frequency} FM
          </p>
        </div>
        <audio
          key={station.id}
          controls
          autoPlay
          src={station.streamUrl}
          onError={() => setHasError(true)}
          onPlaying={() => setHasError(false)}
          className="h-10"
        />
        <button type="button" onClick={onClose} className="text-sm underline">
          Close
        </button>
      </div>
    {hasError && (
  <p role="alert" className="mx-auto mt-2 max-w-6xl text-sm text-red-200">
    Sorry, this station isn't available right now. Please try again later or
    pick another station.
  </p>
)}
    </div>
  );
}