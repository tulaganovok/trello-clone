import { Button } from "#/components/ui/button";
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "#/components/ui/popover";
import { cn } from "#/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Features() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-full text-base font-normal hover:text-primary hover:bg-transparent group",
            open && "border-b-2 border-b-primary text-primary"
          )}
        >
          Features
          <ChevronDown className="-ml-1.5 mt-1 group-hover:text-primary" />
        </Button>
      </PopoverTrigger>



      <PopoverContent
        side="bottom"
        sideOffset={0}
        className="relative z-40 w-screen max-h-[calc(100vh-60px)] overflow-auto bg-white"
      >
        <PopoverTitle>Features</PopoverTitle>
        {/* Add your popover items here */}
      </PopoverContent>
    </Popover>
  )
}
