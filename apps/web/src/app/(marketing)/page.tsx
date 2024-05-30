import Image from "next/image";
import { HeroSection } from "./hero-section";

export default function Home() {
  return (
    <main className="flex container min-h-screen flex-col pt-12">
      <HeroSection />
    </main>
  );
}
