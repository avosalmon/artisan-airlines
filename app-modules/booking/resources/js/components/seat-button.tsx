import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Seat } from "@flight/index";

interface Props {
  seat: Seat;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function SeatButton({ seat, selected, disabled, onClick }: Props) {
  return (
    <Button
      variant={selected ? "default" : "outline"}
      className={cn("h-12 w-12 rounded-lg", !seat.is_available && "cursor-not-allowed opacity-50")}
      disabled={disabled}
      onClick={onClick}
    >
      {seat.seat_number}
    </Button>
  );
}
