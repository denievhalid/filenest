import { Button } from "@/components/ui/button.tsx";
import { Brand, LeftMenu } from "@/components/layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { QuoteInfo } from "@/features/Quote";

export const Sidebar = () => {
  return (
    <aside className="border-r border-[#f6f6f6] py-4 justify-between flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 px-4">
          <Brand />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Добавить
                <Plus />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[207px]">
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem value="top">
                  Создать папку
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="top">
                  Создать файл
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <LeftMenu />
      </div>
      <QuoteInfo />
    </aside>
  );
};
