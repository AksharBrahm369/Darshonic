"use client";

import React, { useState, useEffect, useRef, RefObject } from "react";
import { ChevronRight, Menu, X } from "lucide-react";

// Types and Interfaces
interface Stage {
  label: string;
  title: string;
  desc: string;
  color: string;
  glow: string;
}

interface StageCanvasProps {
  stageIndex: number;
  isActive: boolean;
  isCompleted: boolean;
  progress: number;
}

// Stage configuration data
const stages: Stage[] = [
  {
    label: "01 / DISCOVER",
    title: "Vision",
    desc: "We map your problem space, define architecture, and chart the exact path forward.",
    color: "#7F77DD", // lavender
    glow: "rgba(127, 119, 221, 0.15)"
  },
  {
    label: "02 / DESIGN",
    title: "Blueprint",
    desc: "Wireframes, system design, and UI that communicates before a line of code is written.",
    color: "#534AB7", // primary purple
    glow: "rgba(83, 74, 183, 0.15)"
  },
  {
    label: "03 / BUILD",
    title: "Engineer",
    desc: "Full-stack development, SaaS architecture, AI integration — shipped with precision.",
    color: "#1D9E75", // teal/emerald
    glow: "rgba(29, 158, 117, 0.15)"
  },
  {
    label: "04 / SCALE",
    title: "Grow",
    desc: "Cloud infrastructure, performance tuning, and global deployment that compounds.",
    color: "#1D9E75", // teal/emerald
    glow: "rgba(29, 158, 117, 0.15)"
  }
];

const servicesPills = ["Full-Stack Dev", "SaaS Products", "AI Consultancy", "Web Development"];

// Custom Canvas Hook for Stage Rendering
function useStageCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  stageIndex: number,
  isActive: boolean,
  progress: number,
  isCompleted: boolean
) {
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    // Device Pixel Ratio scaling for high-resolution displays
    const dpr = window.devicePixelRatio || 1;
    const width = cv.offsetWidth;
    const height = cv.offsetHeight;

    cv.width = width * dpr;
    cv.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    // Set alpha based on status
    const alpha = isActive ? Math.min(1, progress * 2.0) : (isCompleted ? 0.35 : 0.12);
    ctx.globalAlpha = alpha;

    if (stageIndex === 0) {
      // STAGE 1: Discover - Eye Drawing
      const cx = width / 2;
      const cy = height / 2 - 2;
      const rx = width * 0.28;
      const ry = height * 0.20;

      ctx.lineWidth = 1.8;
      ctx.strokeStyle = "#7F77DD";

      // Top Eyelid
      ctx.beginPath();
      ctx.moveTo(cx - rx, cy);
      ctx.bezierCurveTo(cx - rx / 2, cy - ry, cx + rx / 2, cy - ry, cx + rx, cy);
      ctx.stroke();

      // Bottom Eyelid
      ctx.beginPath();
      ctx.moveTo(cx - rx, cy);
      ctx.bezierCurveTo(cx - rx / 2, cy + ry, cx + rx / 2, cy + ry, cx + rx, cy);
      ctx.stroke();

      // Iris
      const irisRadius = ry * 0.85;
      ctx.beginPath();
      ctx.arc(cx, cy, irisRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Pupil with Radial Gradient Glow
      const pupilRadius = irisRadius * 0.45;
      const grad = ctx.createRadialGradient(cx, cy, 1, cx, cy, pupilRadius);
      grad.addColorStop(0, "#7F77DD");
      grad.addColorStop(1, "#26215C");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, pupilRadius, 0, Math.PI * 2);
      ctx.fill();

      // Moving Scanning line
      if (isActive) {
        const scanX = cx - rx + (rx * 2) * progress;
        const scanGrad = ctx.createLinearGradient(scanX, cy - ry, scanX, cy + ry);
        scanGrad.addColorStop(0, "rgba(127, 119, 221, 0.05)");
        scanGrad.addColorStop(0.5, "rgba(127, 119, 221, 0.8)");
        scanGrad.addColorStop(1, "rgba(127, 119, 221, 0.05)");

        ctx.strokeStyle = scanGrad;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(scanX, cy - ry - 4);
        ctx.lineTo(scanX, cy + ry + 4);
        ctx.stroke();
      }
    } else if (stageIndex === 1) {
      // STAGE 2: Design - Wireframe Mockup Drawing
      const pad = 12;
      const boxW = width - pad * 2;
      const boxH = height - pad * 2;
      const xs = pad;
      const ys = pad;

      ctx.strokeStyle = "#534AB7";
      ctx.lineWidth = 1.5;

      // 1. Outer Box
      if (progress >= 0.0) {
        ctx.strokeRect(xs, ys, boxW, boxH);
      }

      // 2. Header Bar
      if (progress >= 0.18) {
        const headerH = 10;
        ctx.fillStyle = "rgba(83, 74, 183, 0.15)";
        ctx.fillRect(xs, ys, boxW, headerH);

        // Header controls (3 dots)
        ctx.fillStyle = "#534AB7";
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(xs + 5 + i * 4.5, ys + 5, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Hero Block (Cross box on left)
      if (progress >= 0.36) {
        const heroW = boxW * 0.44;
        const heroH = boxH - 18;
        ctx.strokeRect(xs + 5, ys + 13, heroW, heroH);

        ctx.beginPath();
        ctx.moveTo(xs + 5, ys + 13);
        ctx.lineTo(xs + 5 + heroW, ys + 13 + heroH);
        ctx.moveTo(xs + 5 + heroW, ys + 13);
        ctx.lineTo(xs + 5, ys + 13 + heroH);
        ctx.strokeStyle = "rgba(83, 74, 183, 0.24)";
        ctx.stroke();
        ctx.strokeStyle = "#534AB7";
      }

      // 4. Two columns (Cards on right)
      if (progress >= 0.54) {
        const colX = xs + boxW * 0.53;
        const colW = boxW * 0.42;
        const colH = (boxH - 22) / 2;

        ctx.strokeRect(colX, ys + 13, colW, colH);
        ctx.strokeRect(colX, ys + 17 + colH, colW, colH);
      }

      // 5. Lines representing text blocks
      if (progress >= 0.72) {
        const lx = xs + boxW * 0.58;
        const lw = boxW * 0.28;
        ctx.fillStyle = "rgba(127, 119, 221, 0.4)";
        ctx.fillRect(lx, ys + 18, lw, 1.8);
        ctx.fillRect(lx, ys + 22, lw * 0.6, 1.8);
      }

      // 6. Action Button
      if (progress >= 0.88) {
        const bx = xs + boxW * 0.58;
        const by = ys + 30;
        const bw = boxW * 0.28;
        const bh = 5;

        ctx.fillStyle = "#534AB7";
        ctx.fillRect(bx, by, bw, bh);
      }
    } else if (stageIndex === 2) {
      // STAGE 3: Build - Code Typing Simulation
      const lines = [
        { text: "const app = darshonic.init()", color: "#1D9E75" },
        { text: "  .fullStack({ react: true })", color: "#7F77DD" },
        { text: '  .ai({ model: "gpt-4o" })', color: "#534AB7" },
        { text: "  .saas({ billing: true })", color: "#7F77DD" },
        { text: "  .deploy({ edge: 'global' })", color: "#1D9E75" },
        { text: "", color: "#1D9E75" },
        { text: "// ✓ Built by Darshonic", color: "rgba(29, 158, 117, 0.5)" }
      ];

      const totalChars = lines.reduce((acc, l) => acc + l.text.length, 0);
      const typedLimit = Math.min(totalChars, Math.floor(progress * totalChars * 1.12));

      ctx.font = `${width / 22}px monospace, Courier New, monospace`;
      ctx.textBaseline = "top";

      let currentCounter = 0;
      let lineY = 12;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (currentCounter >= typedLimit) break;

        const leftCount = typedLimit - currentCounter;
        const textToDraw = line.text.substring(0, leftCount);

        ctx.fillStyle = line.color;
        ctx.fillText(textToDraw, 12, lineY);

        // Blinking cursor
        if (leftCount < line.text.length || (i === lines.length - 1 && currentCounter + line.text.length === typedLimit)) {
          if (isActive && Math.floor(Date.now() / 360) % 2 === 0) {
            const textWidth = ctx.measureText(textToDraw).width;
            ctx.fillStyle = "#1D9E75";
            ctx.fillRect(12 + textWidth + 1, lineY, 2.2, width / 20);
          }
        }

        currentCounter += line.text.length;
        lineY += width / 13.5;
      }
    } else if (stageIndex === 3) {
      // STAGE 4: Scale - Bar Chart Growth
      const padding = 14;
      const chartW = width - padding * 2;
      const chartH = height - padding * 2.2;
      const cx = width / 2;

      const bars = [
        { q: "Q1", h: 0.25 },
        { q: "Q2", h: 0.42 },
        { q: "Q3", h: 0.61 },
        { q: "Q4", h: 0.88 }
      ];

      const barSpacing = chartW / 4;
      const barW = Math.min(16, barSpacing * 0.38);

      // Baseline
      ctx.strokeStyle = "rgba(29, 158, 117, 0.2)";
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(padding, height - 16);
      ctx.lineTo(width - padding, height - 16);
      ctx.stroke();

      // Draw bars
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i];
        const growthFactor = Math.min(1.0, Math.max(0.0, progress * 1.5 - i * 0.15));
        const finalBarH = chartH * bar.h * growthFactor;

        const bx = padding + i * barSpacing + (barSpacing - barW) / 2;
        const by = height - 16 - finalBarH;

        if (finalBarH > 0) {
          // Linear Gradient top to bottom
          const grad = ctx.createLinearGradient(bx, by, bx, height - 16);
          grad.addColorStop(0, "#1D9E75");
          grad.addColorStop(1, "rgba(29, 158, 117, 0.05)");

          ctx.fillStyle = grad;
          ctx.fillRect(bx, by, barW, finalBarH);

          // Top Glow dot
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(bx + barW / 2, by, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Q Labels
        ctx.fillStyle = "rgba(200, 200, 230, 0.6)";
        ctx.font = "8px monospace, Courier New";
        ctx.textAlign = "center";
        ctx.fillText(bar.q, bx + barW / 2, height - 8);
      }

      // Draw top glow metrics indicator
      if (progress >= 0.7) {
        const textAlpha = Math.min(1, (progress - 0.7) / 0.22);
        ctx.fillStyle = `rgba(29, 158, 117, ${textAlpha})`;
        ctx.font = "bold 12.5px monospace, Courier New";
        ctx.textAlign = "center";
        ctx.fillText("↑ 4.2×", cx, 18);
      }
    }
  }, [stageIndex, isActive, progress, isCompleted]);
}

// StageCanvas Component
function StageCanvas({ stageIndex, isActive, isCompleted, progress }: StageCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useStageCanvas(ref, stageIndex, isActive, progress, isCompleted);

  return (
    <canvas
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        display: "block"
      }}
    />
  );
}

// Connector Component
interface ConnectorProps {
  progress: number;
}

function Connector({ progress }: ConnectorProps) {
  const isLit = progress > 0.9;
  return (
    <div
      className="connector-line-wrapper"
      style={{
        position: "relative",
        width: "40px",
        height: "12px",
        flexShrink: 0,
        marginTop: "-32px",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* Background Track */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(83, 74, 183, 0.2)"
        }}
      />

      {/* Glowing Progress Fill */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: `${progress * 100}%`,
          height: "1px",
          background: "linear-gradient(90deg, #534AB7, #1D9E75)",
          boxShadow: isLit ? "0 0 6px #1D9E75" : "none",
          transition: "width 0.05s linear"
        }}
      />

      {/* Arrow Head */}
      <div
        style={{
          position: "absolute",
          right: 0,
          width: 0,
          height: 0,
          borderTop: "3.5px solid transparent",
          borderBottom: "3.5px solid transparent",
          borderLeft: `5px solid ${isLit ? "#1D9E75" : "rgba(83, 74, 183, 0.2)"}`,
          transform: "translateX(100%)",
          transition: "border-left-color 0.15s ease"
        }}
      />
    </div>
  );
}

// Main BuilderHero Component
export default function BuilderHero() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [stageProgress, setStageProgress] = useState<number>(0);
  const [connectorProgress, setConnectorProgress] = useState<number[]>([0, 0, 0]);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Automatically scroll/center the active stage card inside the container on mobile/tablet screens
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Only scroll if the container has scrollable content (mobile/tablet views)
    if (container.scrollWidth <= container.clientWidth) return;

    const cards = container.querySelectorAll(".stage-card-item");
    const activeCard = cards[activeStage] as HTMLElement;

    if (activeCard) {
      const containerWidth = container.clientWidth;
      const cardWidth = activeCard.clientWidth;
      const cardOffsetLeft = activeCard.offsetLeft;

      container.scrollTo({
        left: cardOffsetLeft - (containerWidth - cardWidth) / 2,
        behavior: "smooth"
      });
    }
  }, [activeStage]);

  const pillContainerRef = useRef<HTMLDivElement>(null);

  // Automatically scroll/center the active service pill inside the container on mobile screens
  useEffect(() => {
    const container = pillContainerRef.current;
    if (!container) return;

    // Only scroll if the container has scrollable content (mobile views)
    if (container.scrollWidth <= container.clientWidth) return;

    const pills = container.querySelectorAll(".service-pill-item");
    const activePill = pills[activeStage] as HTMLElement;

    if (activePill) {
      const containerWidth = container.clientWidth;
      const pillWidth = activePill.clientWidth;
      const pillOffsetLeft = activePill.offsetLeft;

      container.scrollTo({
        left: pillOffsetLeft - (containerWidth - pillWidth) / 2,
        behavior: "smooth"
      });
    }
  }, [activeStage]);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    const STAGE_DURATION = 2200; // 2200ms per stage

    const tick = (now: number) => {
      const elapsed = (now - startTime) % 8800; // 4 * 2200 = 8800 total cycle
      const currentStage = Math.floor(elapsed / STAGE_DURATION);
      const currentProgress = (elapsed % STAGE_DURATION) / STAGE_DURATION;

      // Update active stage and current frame progress
      setActiveStage(currentStage);
      setStageProgress(currentProgress);

      // Handle connector status updates
      const conn = [0, 1, 2].map((idx) => {
        if (currentStage > idx + 1) return 1.0;
        if (currentStage === idx + 1) return currentProgress;
        return 0.0;
      });
      setConnectorProgress(conn);

      // Track completed stages
      setCompletedStages((prev) => {
        if (currentStage === 0 && prev.includes(3)) {
          return [0];
        }
        const next = [...prev];
        for (let i = 0; i < currentStage; i++) {
          if (!next.includes(i)) next.push(i);
        }
        return next;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#05050e",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 80px 24px",
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      {/* Navigation Header */}
      <nav className="nav" style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
        <a className="brand" href="#home" aria-label="Darshonic home">
          <span className="brand-mark brand-mark-image">
            <img
              src="/logos/ChatGPT Image Jul 4, 2026, 01_03_13 PM.png"
              alt="Darshonic logo"
              className="brand-logo"
            />
          </span>
          <span>Darshonic</span>
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#vision-map">Vision Map</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-action nav-action-desktop" href="#contact">
          Start Project
          <ChevronRight size={16} />
        </a>
        
        {/* Hamburger Menu Toggle for Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-btn"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Fullscreen Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5, 5, 14, 0.97)",
            backdropFilter: "blur(18px)",
            zIndex: 90,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
            animation: "drawerFadeIn 0.22s ease-out"
          }}
        >
          <a
            href="#services"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ fontSize: "20px", color: "#ffffff", textDecoration: "none", fontWeight: 500, letterSpacing: "1px" }}
          >
            Services
          </a>
          <a
            href="#vision-map"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ fontSize: "20px", color: "#ffffff", textDecoration: "none", fontWeight: 500, letterSpacing: "1px" }}
          >
            Vision Map
          </a>
          <a
            href="#process"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ fontSize: "20px", color: "#ffffff", textDecoration: "none", fontWeight: 500, letterSpacing: "1px" }}
          >
            Process
          </a>
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ fontSize: "20px", color: "#ffffff", textDecoration: "none", fontWeight: 500, letterSpacing: "1px" }}
          >
            Contact
          </a>
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="nav-action"
            style={{ marginTop: "12px", minHeight: "40px", padding: "0 22px", fontSize: "0.95rem" }}
          >
            Start Project
            <ChevronRight size={16} />
          </a>
        </div>
      )}
      {/* Global Animation Stylesheet injection */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes drawerFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-btn {
          display: none !important;
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 8px;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 820px) {
          .mobile-menu-btn {
            display: inline-flex !important;
            position: relative;
            z-index: 100;
          }
          .nav-action-desktop {
            display: none !important;
          }
        }
        .stage-pulse-dot {
          animation: pulse 1.5s infinite;
        }
        .stage-row-scroll {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 1200px;
          margin: 44px auto;
          padding: 0 12px 12px;
          box-sizing: border-box;
          overflow-x: auto;
          scrollbar-width: none; /* Hide standard Firefox scrollbar */
          -webkit-overflow-scrolling: touch;
        }
        .stage-row-scroll::-webkit-scrollbar {
          display: none; /* Hide Chrome/Safari scrollbar */
        }
        .stage-card-item {
          width: 215px;
          min-width: 185px;
        }
        @media (max-width: 992px) {
          .stage-row-scroll {
            justify-content: flex-start;
          }
          .connector-line-wrapper {
            display: none !important;
          }
        }
        .service-pill-bar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Background grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(83, 74, 183, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(83, 74, 183, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          zIndex: 0
        }}
      />

      {/* Decorative ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(38, 21, 92, 0.35) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      {/* Header section (above cards) */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "680px",
          marginBottom: "24px"
        }}
      >
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "6px",
            color: "#7F77DD",
            fontWeight: 700,
            textTransform: "uppercase",
            opacity: 0.85,
            marginBottom: "16px"
          }}
        >
          Darshonic — How We Work
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 4.5vw, 46px)",
            fontWeight: 300,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            margin: "0 0 16px 0",
            lineHeight: 1.15
          }}
        >
          From vision to <span style={{ color: "#1D9E75", fontWeight: 600 }}>scale.</span>
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(127, 119, 221, 0.7)",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.6
          }}
        >
          Every Darshonic engagement follows the same precision process — from the first conversation to global deployment.
        </p>
      </div>

      {/* Stage Grid Container Row */}
      <div ref={scrollContainerRef} className="stage-row-scroll" style={{ position: "relative", zIndex: 1 }}>
        {stages.map((stage, index) => {
          const isActive = activeStage === index;
          const isCompleted = completedStages.includes(index);
          const isUpcoming = !isActive && !isCompleted;

          const currentOpacity = isActive ? 1.0 : (isCompleted ? 0.6 : 0.3);
          const currentBorder = isActive ? `1px solid ${stage.color}` : "1px solid rgba(83, 74, 183, 0.15)";
          const currentBackground = isActive ? stage.glow : "rgba(255, 255, 255, 0.02)";
          const currentShadow = isActive ? `0 0 24px ${stage.glow}` : "none";

          return (
            <React.Fragment key={stage.label}>
              {/* Individual Stage Card */}
              <div
                className="stage-card-item"
                style={{
                  borderRadius: "14px",
                  padding: "20px 16px",
                  border: currentBorder,
                  background: currentBackground,
                  boxShadow: currentShadow,
                  opacity: currentOpacity,
                  boxSizing: "border-box",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transition: "all 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  flexShrink: 0
                }}
              >
                {/* Active pulse status dot */}
                {isActive && (
                  <span
                    className="stage-pulse-dot"
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: stage.color,
                      boxShadow: `0 0 8px ${stage.color}`
                    }}
                  />
                )}

                {/* Monospace Stage Label */}
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    fontFamily: "monospace",
                    letterSpacing: "3px",
                    color: stage.color,
                    textTransform: "uppercase"
                  }}
                >
                  {stage.label}
                </div>

                {/* Graphic Canvas wrapper frame */}
                <div
                  style={{
                    width: "100%",
                    height: "110px",
                    background: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "8px",
                    border: "0.5px solid rgba(83, 74, 183, 0.1)",
                    overflow: "hidden"
                  }}
                >
                  <StageCanvas
                    stageIndex={index}
                    isActive={isActive}
                    isCompleted={isCompleted}
                    progress={stageProgress}
                  />
                </div>

                {/* Stage Title */}
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#ffffff",
                    letterSpacing: "-0.015em",
                    margin: 0
                  }}
                >
                  {stage.title}
                </h3>

                {/* Stage Description */}
                <p
                  style={{
                    fontSize: "11.5px",
                    color: "rgba(200, 200, 230, 0.6)",
                    lineHeight: 1.55,
                    margin: 0,
                    flexGrow: 1
                  }}
                >
                  {stage.desc}
                </p>

                {/* Bottom Card Progress Bar */}
                <div
                  style={{
                    width: "100%",
                    height: "2px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    position: "relative",
                    marginTop: "6px"
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: isActive ? `${stageProgress * 100}%` : (isCompleted ? "100%" : "0%"),
                      background: stage.color,
                      boxShadow: isActive ? `0 0 6px ${stage.color}` : "none",
                      transition: isActive ? "none" : "width 0.4s ease"
                    }}
                  />
                </div>
              </div>

              {/* Connector line between steps (excluding final stage card) */}
              {index < stages.length - 1 && (
                <Connector progress={connectorProgress[index]} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom Service Pill bar */}
      <div
        ref={pillContainerRef}
        className="service-pill-bar"
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          gap: "28px",
          padding: "13px 28px",
          border: "0.5px solid rgba(83, 74, 183, 0.2)",
          borderRadius: "40px",
          background: "rgba(83, 74, 183, 0.05)",
          marginTop: "12px",
          boxSizing: "border-box",
          maxWidth: "100%",
          overflowX: "auto"
        }}
      >
        {servicesPills.map((pill, index) => {
          const isActive = activeStage === index;
          return (
            <React.Fragment key={pill}>
              <span
                className="service-pill-item"
                style={{
                  fontSize: "10.5px",
                  color: isActive ? "#1D9E75" : "rgba(127, 119, 221, 0.7)",
                  textShadow: isActive ? "0 0 8px rgba(29, 158, 117, 0.3)" : "none",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "1px",
                  whiteSpace: "nowrap",
                  transition: "all 300ms ease"
                }}
              >
                {pill}
              </span>
              {index < servicesPills.length - 1 && (
                <span
                  style={{
                    color: "rgba(83, 74, 183, 0.3)",
                    fontSize: "10.5px",
                    userSelect: "none"
                  }}
                >
                  ·
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
