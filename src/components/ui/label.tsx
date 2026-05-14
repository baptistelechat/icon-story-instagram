import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) => (
  <LabelPrimitive.Root
    className={cn(
      "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
      className,
    )}
    {...props}
  />
);

export { Label };
