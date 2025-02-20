import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Seat } from "@flight/index";

interface Props {
  seat: Seat;
  selected: boolean;
  onClick: () => void;
}

export function SeatButton({ seat, selected, onClick }: Props) {
  return (
    <Button
      variant={selected ? "default" : "outline"}
      className={cn("h-12 w-12 rounded-lg", !seat.is_available && "pointer-events-none cursor-not-allowed bg-gray-100 text-gray-300 opacity-50")}
      disabled={!seat.is_available}
      onClick={onClick}
    >
      {seat.seat_number}
    </Button>
  );
}
