import { Check, ZoomIn } from "lucide-react";
import { type workType } from "@/lib/types/workType";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type WorkCardProps = React.ComponentProps<typeof Card> & {
  work: workType;
};

export function WorkCard({ className, work, ...props }: WorkCardProps) {
  return (
    <Card className={cn("min-w-full max-w-md flex flex-col", className)} {...props}>
      <CardHeader>
        <CardTitle>{work.name}</CardTitle>
        <CardDescription>{work.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <div className="flex gap-8">
          {work.links &&
            Object.entries(work.links).map(([key, value], index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <div className="space-y-1">
                  <a
                    className="cursor-pointer text-sm font-medium leading-none hover:text-blue-500 "
                    target="_blank"
                    rel="noopener noreferrer"
                    href={value}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <ZoomIn className="mr-2 h-4 w-4" /> Inspect
        </Button>
      </CardFooter>
    </Card>
  );
}
