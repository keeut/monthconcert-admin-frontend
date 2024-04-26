import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";
import { Link } from "react-router-dom";

const MENU_LINKS = {
  Artists: "/artists",
  "Popup Stores": "/popup-stores",
};
const concerts: { title: string; href: string; description: string }[] = [
  {
    title: "콘서트 확정시키기",
    href: "/concerts/confirm",
    description: "비확정된 콘서트들을 하나씩 살펴보며 삭제하거나 수정하고 확정시킨다.",
  },
  {
    title: "콘서트 목록 보기",
    href: "/concerts",
    description: "전체 콘서드들을 테이블로 확인한다.",
  },
];
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavigationMenu className="p-2">
        <NavigationMenuList className=" gap-5">
          <NavigationMenuItem className=" font-extrabold">MONTH CONCERT</NavigationMenuItem>

          {Object.entries(MENU_LINKS).map(([label, href]) => (
            <NavigationMenuItem key={label}>
              <Link to={href}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{label}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Concerts</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {concerts.map((concert) => (
                  <ListItem key={concert.title} title={concert.title} href={concert.href}>
                    {concert.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator />
      <br />
      {children}
    </div>
  );
};

export default Layout;

const ListItem = forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
