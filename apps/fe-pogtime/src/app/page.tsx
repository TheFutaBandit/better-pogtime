import MainPage from "@/components/landing/main-page";
import Navbar from "@/components/landing/navbar";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--pogtime-dark)' }}>
        <MainPage />
    </div>
  );
}
