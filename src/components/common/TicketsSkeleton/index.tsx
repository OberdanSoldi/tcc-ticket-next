import React from "react";

import style from "./style.module.scss";
import LogoUnsaturated from "@/../public/logo-unsaturated.png";
import Image from "next/image";

const TicketsSkeleton: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Image
        className={style.logo}
        src={LogoUnsaturated}
        alt="Logo"
        width={250}
        height={250}
      />
    </div>
  );
};

export { TicketsSkeleton };
