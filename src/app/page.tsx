import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
import Background from "@/components/Background";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-100 dark:bg-gray-950">
      <Background />
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}
