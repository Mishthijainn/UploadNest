import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { Link } from "react-router-dom";

const Logo = (props: { url?: string }) => {
  return (
    <Link
      to={props.url || PROTECTED_ROUTES.OVERVIEW}
      className="flex items-center gap-2"
    >
      <div>
        <h1 className="relative flex select-none flex-row items-baseline font-bold text-2xl lg:text-3xl">
          <span className="sr-only">UploadNest</span>
          <span className="tracking-tight cursor-pointer">
            upload<span className="text-primary">nest</span>
          </span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
