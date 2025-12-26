import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
