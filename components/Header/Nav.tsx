import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./Header.module.css";

const Nav = (props:{className:string}) => {
  const { pathname } = useRouter();

  return (
    <div className={props.className}>
      <Link
        className={`${classes.link} ${
          pathname === "/" && `${classes.active} underline mt-1`
        }`}
        href="/"
      >
        Home
      </Link>

      <Link
        className={`${classes.link} ${
          pathname === "/acoustics" && `${classes.active} underline mt-1`
        }`}
        href="/acoustics"
      >
        Guitarras acústicas
      </Link>
      <Link
        className={`${classes.link} ${
          pathname === "/electrics" && `${classes.active} underline mt-1`
        }`}
        href="/electrics"
      >
        Guitarras eléctricas
      </Link>
      <Link
        className={`${classes.link} ${
          pathname === "/gadgets" && `${classes.active} underline mt-1`
        }`}
        href="/gadgets"
      >
        Accesorios
      </Link>
    </div>
  );
};
export default Nav;
