import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  href: string;
  showLabel?: boolean;
}

export const Logo = ({ href, showLabel }: LogoProps) => {
  return (
    <div className={"hidden items-center space-x-0.5 lg:flex"}>
      <Link href={href} className="font-bold flex items-center gap-2 text-lg">
        <div className="relative overflow-hidden w-12 h-12">
          {/* // TODO: Replace with real logo */}
          {/* <Image fill alt="Logo" src={"/logo_no_bg.png"} /> */}
        </div>
        {showLabel && <h3>Fairify</h3>}
      </Link>
    </div>
  );
};
