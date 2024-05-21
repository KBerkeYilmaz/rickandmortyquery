import { LucideLinkedin, LucideGithub, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export function LinkBtnGroup() {
  return (
    <div className="flex gap-2 mt-auto">
      {/* <Button variant="outline" size="icon" asChild>
        <a
          href="mailto:kberkeyilmaz@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail className="h-4 w-4" />
        </a>
      </Button> */}

      <Button variant="outline" size="icon" asChild>
        <a
          href={"https://www.linkedin.com/in/kutalmis-berke-yilmaz/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LucideLinkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a
          href="https://github.com/KBerkeYilmaz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LucideGithub className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a
          href="https://www.teamrandom.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={"/svg/red-question-mark-svgrepo-com.svg"}
            width={20}
            height={20}
            alt="teamrandom"
          />
        </a>
      </Button>
    </div>
  );
}
