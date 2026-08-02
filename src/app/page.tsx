"use client";

import { useState } from "react";
import GlassNav from "@/components/navigation/GlassNav";
import SocialLink from "@/components/navigation/SocialLink";
import StatusBadge from "@/components/core/StatusBadge";
import MagneticButton from "@/components/core/MagneticButton";
import Button from "@/components/core/Button";
import Tag from "@/components/core/Tag";
import StatCounter from "@/components/core/StatCounter";
import Marquee from "@/components/motion/Marquee";
import ParallaxScene from "@/components/motion/ParallaxScene";
import HeroCanvas from "@/components/motion/HeroCanvas";
import SectionHeading from "@/components/surfaces/SectionHeading";
import ProjectCard from "@/components/surfaces/ProjectCard";
import ProjectVisual from "@/components/surfaces/ProjectVisual";
import BentoCard from "@/components/surfaces/BentoCard";
import GlassPanel from "@/components/surfaces/GlassPanel";
import Input from "@/components/forms/Input";
import TextArea from "@/components/forms/TextArea";
import { labelText } from "@/lib/textStyles";

const NAV_LINKS = ["Work", "Services", "Process", "Pricing", "Contact"];

const PROJECTS = [
  { title: "Halo Configurator", client: "Nord Audio", year: "2026", tags: ["WebGL", "R3F", "Configurator"], visual: "halo" as const },
  { title: "Atlas Terminal", client: "Kessler Freight", year: "2025", tags: ["Web App", "Data Viz"], visual: "terminal" as const },
  { title: "Liquid Index", client: "Fold Type Foundry", year: "2025", tags: ["Motion UI", "Next.js"], visual: "liquid" as const },
  { title: "Prism Launch", client: "Aster Labs", year: "2024", tags: ["Three.js", "Campaign"], visual: "prism" as const },
];

const PROCESS_STEPS = [
  {
    step: "STEP 01",
    title: "Scene",
    body: "Reference board, blockout in Blender, a clickable frame-budget spreadsheet. You approve the look before a line of shader is written.",
    week: "WEEK 1",
  },
  {
    step: "STEP 02",
    title: "Build",
    body: "Geometry decimated and Draco-packed, materials authored, the canvas wired into a real Next.js route. Deployed to a preview URL on day three.",
    week: "WEEK 2–3",
  },
  {
    step: "STEP 03",
    title: "Polish",
    body: "Motion pass, reduced-motion fallbacks, device matrix from an iPhone 12 up. Anything under 60fps gets cut or simplified, not shipped.",
    week: "WEEK 4",
  },
  {
    step: "STEP 04",
    title: "Handover",
    body: "Typed TSX, a component README, and a 45-minute recorded walkthrough for your team. Two weeks of bug cover included.",
    week: "WEEK 5",
  },
];

const wrap = { width: "min(100% - 48px, 1320px)", margin: "0 auto" } as const;

function scrollToSection(label: string) {
  const el = document.querySelector(`[data-screen-label="${label}"]`);
  el?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [active, setActive] = useState("Work");
  const [sent, setSent] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "16px 0 0",
        background: "radial-gradient(120% 60% at 50% -10%,rgba(224,166,60,.12),transparent 60%),#050505",
        fontFamily: "var(--font-body)",
        overflowX: "hidden",
      }}
    >
      <GlassNav
        brand="GUHAN AEGIS"
        links={NAV_LINKS}
        active={active}
        status="Booking — Q1 2027"
        cta="Start a project"
        onNavigate={(l) => {
          setActive(l);
          scrollToSection(l);
        }}
        onCta={() => scrollToSection("Contact")}
      />

      {/* Hero */}
      <section
        data-screen-label="Hero"
        className="hero-section"
        style={{
          ...wrap,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: 48,
          paddingBottom: 32,
        }}
      >
        <div className="hero-grid">
          <div style={{ display: "grid", gap: 30, justifyItems: "start", animation: "ghRise 900ms cubic-bezier(.16,1,.3,1) both" }}>
            <span style={{ ...labelText, color: "var(--gold-400)", textTransform: "uppercase" }}>Guhan Aegis</span>
            <StatusBadge tone="live">Two build slots — Q1 2027</StatusBadge>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px,6.4vw,96px)",
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                color: "#fff",
              }}
            >
              Real-time 3D for product launches.
            </h1>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: "#A9A9B4", maxWidth: "50ch" }}>
              Guhan Aegis is a one-person studio building WebGL product scenes, configurators and launch sites.
              Draw calls budgeted, textures compressed to WebP, 60fps on a mid-range laptop — measured, not
              promised.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: -18, flexWrap: "wrap" }}>
              <MagneticButton variant="primary" size="lg" onClick={() => scrollToSection("Contact")}>
                Start a project
              </MagneticButton>
              <Button variant="ghost" size="lg">
                See the reel — 90s
              </Button>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 4 }}>
              <Tag size="sm">WebGL</Tag>
              <Tag size="sm">Configurators</Tag>
              <Tag size="sm">Motion UI</Tag>
              <Tag size="sm">Launch sites</Tag>
            </div>
          </div>
          <ParallaxScene className="hero-canvas" height="min(74vh, 620px)" depth={10}>
            <HeroCanvas />
          </ParallaxScene>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("Stats")}
          aria-label="Scroll to see more"
          style={{
            alignSelf: "center",
            marginTop: 40,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "grid",
            justifyItems: "center",
            gap: 10,
            padding: 8,
            color: "var(--text-faint)",
          }}
        >
          <span style={{ ...labelText, textTransform: "uppercase" }}>Scroll</span>
          <span
            aria-hidden="true"
            style={{
              width: 1,
              height: 28,
              background: "linear-gradient(180deg, var(--gold-400), transparent)",
              animation: "ghFloat 2.2s ease-in-out infinite",
            }}
          />
        </button>
      </section>

      {/* Stats */}
      <section
        data-screen-label="Stats"
        className="stats-grid"
        style={{
          ...wrap,
          margin: "96px auto 0",
          paddingTop: 64,
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <StatCounter value={46} suffix="+" label="Scenes shipped since 2019" />
        <StatCounter value={60} suffix="fps" label="Frame target, always" />
        <StatCounter value={2.4} suffix="mb" label="Median first-load payload" />
        <StatCounter value={48} suffix="h" label="Reply time on new briefs" />
      </section>

      <div style={{ marginTop: 88 }}>
        <Marquee items={["WebGL", "Configurators", "Motion UI", "React Three Fiber", "Launch Sites", "Shaders", "Real-time"]} speed={30} />
      </div>

      {/* Work */}
      <section data-screen-label="Work" style={{ ...wrap, paddingTop: 120 }}>
        <SectionHeading index="01" eyebrow="Selected work" title="Things we shipped." />
        <div className="work-grid">
          {PROJECTS.map(({ visual, ...p }) => (
            <ProjectCard key={p.title} {...p} visual={<ProjectVisual variant={visual} />} />
          ))}
        </div>
      </section>

      {/* Services */}
      <section data-screen-label="Services" style={{ ...wrap, paddingTop: 128 }}>
        <SectionHeading index="02" eyebrow="Capabilities" title="Four things, done properly." />
        <div className="services-grid">
          <BentoCard
            span={2}
            eyebrow="01"
            title="WebGL product scenes"
            body="R3F and Drei, geometry kept under 50k tris, Draco on every mesh, WebP textures. Suspense around the canvas with a real loading state."
          />
          <BentoCard
            span={2}
            accent
            eyebrow="02"
            title="Configurators"
            body="Material, colour and part swaps wired to your PIM. Deep-linkable state, server-rendered fallback for crawlers and email."
          />
          <BentoCard span={1} eyebrow="03" title="Motion UI" body="Spring choreography that never overshoots into noise." />
          <BentoCard
            span={2}
            eyebrow="04"
            title="Launch sites"
            body="Next.js App Router, streamed routes, CLS under 0.05 and LCP under 2.0s on 4G."
          />
          <BentoCard span={1} eyebrow="Stack" title="R3F · Framer Motion" body="Handed over as typed, modular TSX." />
        </div>
      </section>

      {/* Process */}
      <section data-screen-label="Process" style={{ ...wrap, paddingTop: 128 }}>
        <SectionHeading index="03" eyebrow="Process" title="Four weeks to first light." />
        <div style={{ display: "grid", gap: 0, borderTop: "1px solid rgba(255,255,255,.08)" }}>
          {PROCESS_STEPS.map((s) => (
            <div
              key={s.step}
              className="process-row"
              style={{
                borderBottom: "1px solid rgba(255,255,255,.08)",
                transition:
                  "background 320ms cubic-bezier(.16,1,.3,1), transform 320ms cubic-bezier(.16,1,.3,1), padding 320ms cubic-bezier(.16,1,.3,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.035)";
                e.currentTarget.style.transform = "translateX(10px)";
                e.currentTarget.style.paddingLeft = "20px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.paddingLeft = "12px";
              }}
            >
              <span style={{ ...labelText, color: "#E0A63C" }}>{s.step}</span>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 26,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}
              >
                {s.title}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#A9A9B4" }}>{s.body}</p>
              <span className="process-week" style={{ ...labelText, color: "#5A5A66", textAlign: "right" }}>
                {s.week}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section data-screen-label="Pricing" style={{ ...wrap, paddingTop: 128 }}>
        <SectionHeading index="04" eyebrow="Engagements" title="Three ways to work with us." />
        <div className="pricing-grid">
          {/* Single Scene */}
          <div
            style={{
              display: "grid",
              gap: 24,
              alignContent: "start",
              padding: 36,
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.035)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)",
              transition: "transform 420ms cubic-bezier(.16,1,.3,1), border-color 420ms ease, background 420ms ease, box-shadow 420ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.16)";
              e.currentTarget.style.background = "rgba(255,255,255,.06)";
              e.currentTarget.style.boxShadow = "0 40px 80px -32px rgba(0,0,0,.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
              e.currentTarget.style.background = "rgba(255,255,255,.035)";
              e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,.06)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span style={{ ...labelText, color: "#82828F" }}>SINGLE SCENE</span>
              <Tag size="sm">2 weeks</Tag>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(38px,3.4vw,52px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                }}
              >
                ₹2.5L
              </span>
              <span style={{ fontSize: 14, color: "#5A5A66" }}>fixed</span>
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#A9A9B4" }}>
              One hero scene dropped into your existing site. Good for a launch page or a trade-show loop.
            </p>
            <div style={{ display: "grid", gap: 10, fontSize: 14, lineHeight: 1.5, color: "#CFCFD6" }}>
              <span>One model, up to 25k tris, Draco-packed</span>
              <span>Cursor parallax and scroll choreography</span>
              <span>React or vanilla three.js handover</span>
              <span>One revision round</span>
            </div>
            <Button variant="secondary" size="md" full>
              Book a scene
            </Button>
          </div>

          {/* Full Launch Site */}
          <div
            style={{
              position: "relative",
              display: "grid",
              gap: 24,
              alignContent: "start",
              padding: 36,
              borderRadius: 24,
              border: "1px solid rgba(224,166,60,.45)",
              background: "radial-gradient(90% 70% at 50% 0%,rgba(224,166,60,.12),transparent 60%),rgba(255,255,255,.045)",
              boxShadow: "inset 0 0 0 1px rgba(224,166,60,.18),0 0 60px -20px rgba(224,166,60,.45)",
              transition: "transform 420ms cubic-bezier(.16,1,.3,1), box-shadow 420ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "inset 0 0 0 1px rgba(224,166,60,.3),0 0 90px -18px rgba(224,166,60,.6),0 40px 80px -32px rgba(0,0,0,.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(224,166,60,.18),0 0 60px -20px rgba(224,166,60,.45)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span style={{ ...labelText, color: "#EFC46A" }}>FULL LAUNCH SITE</span>
              <Tag size="sm" active>
                5 weeks
              </Tag>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(38px,3.4vw,52px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                }}
              >
                ₹9.5L
              </span>
              <span style={{ fontSize: 14, color: "#82828F" }}>fixed</span>
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#A9A9B4" }}>
              The whole launch: 3D, motion system, copy layout, build and deploy. Most brand teams start here.
            </p>
            <div style={{ display: "grid", gap: 10, fontSize: 14, lineHeight: 1.5, color: "#E9E9EE" }}>
              <span>Up to 8 sections, configurator optional</span>
              <span>Next.js App Router, typed TSX handover</span>
              <span>Motion system with reduced-motion parity</span>
              <span>Core Web Vitals signed off before launch</span>
              <span>Two weeks of post-launch cover</span>
            </div>
            <MagneticButton variant="primary" size="md" full onClick={() => scrollToSection("Contact")}>
              Start a project
            </MagneticButton>
          </div>

          {/* Embedded Retainer */}
          <div
            style={{
              display: "grid",
              gap: 24,
              alignContent: "start",
              padding: 36,
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.035)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)",
              transition: "transform 420ms cubic-bezier(.16,1,.3,1), border-color 420ms ease, background 420ms ease, box-shadow 420ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.16)";
              e.currentTarget.style.background = "rgba(255,255,255,.06)";
              e.currentTarget.style.boxShadow = "0 40px 80px -32px rgba(0,0,0,.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
              e.currentTarget.style.background = "rgba(255,255,255,.035)";
              e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,.06)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span style={{ ...labelText, color: "#82828F" }}>EMBEDDED RETAINER</span>
              <Tag size="sm">Monthly</Tag>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(38px,3.4vw,52px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                }}
              >
                ₹3.5L
              </span>
              <span style={{ fontSize: 14, color: "#5A5A66" }}>/ month</span>
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#A9A9B4" }}>
              Me, inside your team on a rolling basis. Three-month minimum, 30 days&apos; notice.
            </p>
            <div style={{ display: "grid", gap: 10, fontSize: 14, lineHeight: 1.5, color: "#CFCFD6" }}>
              <span>~25 hours a week of build time</span>
              <span>Your repo, your review process</span>
              <span>Weekly demo, shared Linear board</span>
              <span>Pause once per quarter, no fee</span>
            </div>
            <Button variant="secondary" size="md" full>
              Check availability
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section data-screen-label="Contact" style={{ ...wrap, padding: "128px 0 96px" }}>
        <GlassPanel glow padding="clamp(24px, 4vw, 96px)">
          <div className="contact-grid">
            <div style={{ display: "grid", gap: 32, alignContent: "start" }}>
              <SectionHeading index="05" eyebrow="Contact" title="Tell us what you're building." />
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#A9A9B4", maxWidth: "44ch" }}>
                I reply in 48 hours with a yes, a no, or a question. A ballpark budget is fine — it tells me which of
                the three engagements to quote.
              </p>
              <div>
                <SocialLink label="Email" handle="studio@guhanaegis.dev" />
                <SocialLink label="Instagram" handle="@guhanaegis" />
                <SocialLink label="LinkedIn" handle="/company/guhan-aegis" />
              </div>
            </div>
            <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
              <Input label="Name" placeholder="jane cooper" required />
              <Input label="Work email" type="email" placeholder="you@company.com" required />
              <TextArea label="Project brief" rows={4} placeholder="what are you launching, and when?" hint="A paragraph and a ballpark is plenty." />
              <Button variant="primary" size="lg" full onClick={() => setSent(true)}>
                {sent ? "Brief received — we reply in 48h" : "Send the brief"}
              </Button>
            </div>
          </div>
        </GlassPanel>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,.08)",
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: 11,
            lineHeight: 1.2,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5A5A66",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 14,
              lineHeight: 1,
              letterSpacing: "0.02em",
              color: "#E9E9EE",
            }}
          >
            GUHAN AEGIS
          </span>
          <span>Real-time 3D · Remote, GMT+5:30</span>
          <span>© 2026</span>
        </div>
      </section>
    </div>
  );
}
