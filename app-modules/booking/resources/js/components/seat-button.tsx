import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Seat } from "@flight/index";

interface Props {
  seat: Seat;
  selected: boolean;
  onClick: () => void;
  occupied: boolean;
}

export function SeatButton({ seat, selected, onClick, occupied }: Props) {
  return (
    <Button
      variant={selected ? "default" : "outline"}
      className={cn(
        "size-12 rounded-lg",
        !seat.is_available && "cursor-not-allowed opacity-50",
        occupied && "bg-gray-100 text-gray-300 pointer-events-none"
      )}
      disabled={!seat.is_available}
      onClick={onClick}
    >
      {seat.seat_number}
      
    </Button>
  );
}
