import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { userService } from "@/services/user-service";
import { UserRole } from "@/domain/enums/UserRole";

import style from "./style.module.scss";
import LogoNoText from "@/../public/logo-no-text.svg";
import {
  ADMIN_NAVBAR_ITEMS,
  TECNICIAN_NAVBAR_ITEMS,
  USER_NAVBAR_ITEMS,
} from "./constants";
import ProfileAvatar from "../ProfileAvatar";

const NavBar: React.FC = () => {
  const [userRole, setUserRole] = React.useState<UserRole>();

  React.useEffect(() => {
    userService.getUserRole().then((role) => {
      setUserRole(role);
    });
  }, []);

  function handleNavbarOptions() {
    switch (userRole) {
      case UserRole.ADMIN:
        return ADMIN_NAVBAR_ITEMS;
      case UserRole.USER:
        return USER_NAVBAR_ITEMS;
      case UserRole.TECHNICIAN:
        return TECNICIAN_NAVBAR_ITEMS;
      default:
        return [];
    }
  }

  const navbarItems = handleNavbarOptions();
  // const navbarItems = [] as any;

  return (
    <>
      <AppBar position="static" className={style.appBar}>
        <Toolbar disableGutters className={style.navBar}>
          <Image src={LogoNoText} alt="Logo" width={75} height={75} />
          <Grid container gap={6} justifyContent={"center"}>
            {navbarItems.map((it: any, index: any) => (
              <Grid className={style.navItem} item key={index}>
                <Button className={style.navButton}>
                  <Link className={style.buttonLink} href={it.buttonLink}>
                    {it.buttonName}
                  </Link>
                </Button>
              </Grid>
            ))}
          </Grid>
          <ProfileAvatar />
        </Toolbar>
      </AppBar>
    </>
  );
};

export { NavBar };
