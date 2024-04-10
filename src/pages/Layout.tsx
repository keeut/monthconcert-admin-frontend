import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavigationMenu className="p-2">
        <NavigationMenuList className=" gap-5">
          <NavigationMenuItem className=" font-extrabold">MONTH CONCERT</NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/artists">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Artists</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/concerts">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Concerts</NavigationMenuLink>
            </Link>
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
