import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { userService } from "@/services/user-service";
import { UserRole } from "@/domain/enums/UserRole";

import style from "./style.module.scss";
import LogoNoText from "@/../public/logo-no-text.svg";
import { ADMIN_NAVBAR_ITEMS, USER_NAVBAR_ITEMS } from "./constants";

const NavBar: React.FC = () => {
  const [userRole, setUserRole] = React.useState<UserRole>();

  React.useEffect(() => {
    userService.getUserRole().then((role) => {
      setUserRole(role);
    });
  }, []);

  const isUserAdmin = userRole === UserRole.ADMIN;

  const navbarItems = isUserAdmin ? ADMIN_NAVBAR_ITEMS : USER_NAVBAR_ITEMS;

  return (
    <>
      <AppBar position="static" className={style.appBar}>
        <Toolbar disableGutters className={style.navBar}>
          <Image src={LogoNoText} alt="Logo" width={75} height={75} />
          <Grid container gap={6} justifyContent={"center"}>
            {navbarItems.map((it, index) => (
              <Grid className={style.navItem} item key={index}>
                <Button className={style.navButton}>
                  <Link className={style.buttonLink} href={it.buttonLink}>
                    {it.buttonName}
                  </Link>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export { NavBar };
