import Hero from "@/components/shared/main/sections/Hero";
import Features from "@/components/shared/main/sections/Features";
import Testimonials from "@/components/shared/main/sections/Testimonials";

export default function MainPage() {
  return (
    <main>
      <Hero />
      <Features id={"features"} />
      <Testimonials id={"testimonials"} />
    </main>
  );
}
