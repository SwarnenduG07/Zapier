import Hero from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
import { NavBar } from "@/components/NavBar";

export default function Home() {
  return (
    <div className="pb-48">
       <NavBar/>
       <Hero />
       <HeroVideo />
    </div>
  );
}
