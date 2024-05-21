import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/theme-toggle";
import NavLinksMobile from "@/components/NavLinksMobile";
import NavLinks from "@/components/NavLinks";
import { LinkBtnGroup } from "@/components/LinkBtnGroup";
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-[90vh] max-h-screen w-[90vw] flex-col rounded-xl border-2 p-8 shadow-2xl dark:shadow-slate-900">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background pb-2">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <div className="flex w-52 gap-2">
              <Avatar>
                <AvatarImage src="/profilepic.webp" />
                <AvatarFallback>KB</AvatarFallback>
              </Avatar>
              <div>
                <h1>Kutalmış Berke Yılmaz</h1>
                <span className="text-pretty text-xs text-slate-400 ">
                  Software Developer
                </span>
              </div>
            </div>
            <NavLinks />
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <NavLinksMobile />
          </Sheet>
          <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="hidden lg:block">
              <LinkBtnGroup />
            </div>
            <ModeToggle />
          </div>
        </header>
        <main className="flex h-fit flex-1 flex-col gap-4 overflow-y-hidden pt-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
