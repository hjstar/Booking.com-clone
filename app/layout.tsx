import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from '@/components/Home/Navbar/Nav'
import Footer from "@/components/Home/Footer/Footer";



const font=Poppins({
  weight:['100','200','300'],
  subsets:["latin"]
})

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

export const metadata: Metadata = {
  title: "Booking.com",
  description: "best place to do your bookings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <Nav/>
        {children}
        <Footer/>
        
      </body>
    </html>
  );
}
