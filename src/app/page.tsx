import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-100 dark:bg-gray-950">
      <Navbar />  
      <Main />
      <Footer />
    </div>
  );
}
