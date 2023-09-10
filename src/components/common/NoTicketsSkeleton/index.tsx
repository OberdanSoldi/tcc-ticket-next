import React from "react";

import style from "./style.module.scss";
import LogoUnsaturated from "@/../public/logo-unsaturated.png";
import Image from "next/image";

const NoTicketsSkeleton: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Image
        className={style.logo}
        src={LogoUnsaturated}
        alt="Logo"
        width={250}
        height={250}
      />
      <div className={style.noTicketsText}>Não há tickets pendentes...</div>
    </div>
  );
};

export { NoTicketsSkeleton };
