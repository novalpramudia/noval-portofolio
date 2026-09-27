"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);

  const requireAuth = () => setLoginOpen(true);

  return (
    <>
      <Navbar onRequestLogin={requireAuth} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onRequireAuth={requireAuth} />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        reason="Sign in with Google to like or comment on a project."
      />
    </>
  );
}