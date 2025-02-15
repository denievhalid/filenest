import { NavLink } from "react-router";
import { leftMenu } from "./constants.ts";
import { createElement } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Pages } from "@/components/Router/constants.ts";
import { Trash2 } from "lucide-react";
import { TrashClearDialog } from "@/features/Trash";

export const LeftMenu = () => (
  <ul>
    {leftMenu.map((item) => (
      <li key={item.path}>
        <NavLink
          className={({ isActive }) =>
            `${isActive && "bg-[#F6F7F9] text-primary"} items-center gap-4 h-10 flex px-4 text-sm text-[#1E1E1E] hover:no-underline hover:bg-[#F6F7F9] transition`
          }
          to={item.path}
        >
          {createElement(item.icon, {
            size: 18,
          })}
          {item.title}
        </NavLink>
      </li>
    ))}
    <li>
      <NavLink
        className={({ isActive }) =>
          `${isActive && "bg-[#F6F7F9] text-primary"} items-center justify-between h-10 flex px-4 text-sm text-[#1E1E1E] hover:no-underline hover:bg-[#F6F7F9] transition`
        }
        to={Pages.Trash}
      >
        <div className="flex items-center gap-4">
          <Trash2 size={18} />
          Корзина
        </div>
        {/*<TrashClearDialog*/}
        {/*  trigger={*/}
        {/*    <Button className="text-xs" variant="ghost">*/}
        {/*      Очистить*/}
        {/*    </Button>*/}
        {/*  }*/}
        {/*/>*/}
      </NavLink>
    </li>
  </ul>
);
