import SideBar from "../components/SideBar";
import "./globals.css"; // Include your global CSS

export const metadata = {
    title: "Meeting Summarizer",
    description: "A tool to summarize meetings efficiently",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="flex h-screen">
                {/* Sidebar */}
                <SideBar />

                {/* Main Content */}
                <div className="flex-1 bg-gray-100 p-4">
                    {children}
                </div>
            </body>
        </html>
    );
}