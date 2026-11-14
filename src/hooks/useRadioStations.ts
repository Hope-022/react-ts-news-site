import { useQuery } from "@tanstack/react-query";
import { getRadioStations } from "../data/source";

export function useRadioStations(query: string) {
  return useQuery({
    queryKey: ["radioStations", query],
    queryFn: () => getRadioStations(query),
  });
}