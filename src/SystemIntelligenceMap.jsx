"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  BrainCircuit,
  CloudCog,
  Code2,
  Database,
  Gauge,
  Globe2,
  Workflow,
  Terminal,
  Settings,
  Search,
  User,
  LayoutGrid,
  Layers,
  CheckCircle2,
  Zap
} from "lucide-react";

// Generate a random mock log message
const mockLogEvents = [
  "Gateway routed: GET /api/v1/experience (200 OK)",
  "Gateway routed: POST /api/v1/auth (201 Created)",
  "Gateway routed: GET /api/v1/dashboard (200 OK)",
  "Data core cache hit: 94.2% (memcached)",
  "AI Runtime: query context retrieval initialized",
  "AI Runtime: routing response generated in 18ms",
  "Ops Automation: queue check clean (0 pending)",
  "Delivery Layer: health check success (all endpoints green)",
  "Data core sync: PostgreSQL replication completed",
  "Security audit: token verification successful",
  "Memory compaction: 14.8MB freed",
  "Gateway routed: GET /api/v1/analytics (200 OK)"
];

export default function SystemIntelligenceMap() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredNode, setHoveredNode] = useState(null);
  const [logs, setLogs] = useState([
    "System initialized.",
    "Data core sync online.",
    "AI Runtime pipeline ready."
  ]);
  const [sparklinePoints, setSparklinePoints] = useState([]);
  const [activeUsers, setActiveUsers] = useState(1420);
  const [avgLatency, setAvgLatency] = useState(42);
  const logIntervalRef = useRef(null);
  const metricIntervalRef = useRef(null);

  // Handle active logs stream
  useEffect(() => {
    logIntervalRef.current = setInterval(() => {
      const newLog = mockLogEvents[Math.floor(Math.random() * mockLogEvents.length)];
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs((prev) => [`[${timestamp}] ${newLog}`, ...prev.slice(0, 4)]);
    }, 3800);

    return () => clearInterval(logIntervalRef.current);
  }, []);

  // Handle live metrics fluctuations
  useEffect(() => {
    metricIntervalRef.current = setInterval(() => {
      setActiveUsers((prev) => Math.max(1300, Math.min(1600, prev + Math.floor(Math.random() * 21) - 10)));
      setAvgLatency((prev) => Math.max(38, Math.min(48, prev + Math.floor(Math.random() * 5) - 2)));
    }, 2500);

    return () => clearInterval(metricIntervalRef.current);
  }, []);

  // Handle live sparkline updates
  useEffect(() => {
    // Generate initial values
    const initialPoints = Array.from({ length: 15 }, () => 40 + Math.floor(Math.random() * 15));
    setSparklinePoints(initialPoints);

    const graphInterval = setInterval(() => {
      setSparklinePoints((prev) => {
        const nextPoints = [...prev.slice(1)];
        nextPoints.push(38 + Math.floor(Math.random() * 20));
        return nextPoints;
      });
    }, 1000);

    return () => clearInterval(graphInterval);
  }, []);

  // Convert sparkline points array into SVG path data
  const getSparklinePath = () => {
    if (sparklinePoints.length === 0) return "";
    const width = 120;
    const height = 30;
    const step = width / (sparklinePoints.length - 1);

    // Map points (between 25 and 70) to SVG viewbox coordinates (y values from height down to 0)
    const pointsString = sparklinePoints
      .map((p, i) => {
        const x = i * step;
        const y = height - ((p - 25) / (70 - 25)) * height;
        return `${x},${y}`;
      })
      .join(" ");

    return `M ${pointsString}`;
  };

  const nodes = [
    {
      id: "web",
      label: "Experience Layer",
      subtext: `${activeUsers} active sessions`,
      Icon: Globe2,
      x: 15,
      y: 20,
      tech: "Next.js / Cloudflare",
      status: "optimal"
    },
    {
      id: "api",
      label: "Core APIs",
      subtext: "840 req/sec avg",
      Icon: Code2,
      x: 52,
      y: 16,
      tech: "Go / GraphQL",
      status: "optimal"
    },
    {
      id: "agent",
      label: "AI Runtime",
      subtext: "inference: 18ms",
      Icon: BrainCircuit,
      x: 82,
      y: 35,
      tech: "Python / PyTorch",
      status: "active"
    },
    {
      id: "data",
      label: "Data Core",
      subtext: "99.999% cache hit",
      Icon: Database,
      x: 24,
      y: 65,
      tech: "PostgreSQL / Redis",
      status: "optimal"
    },
    {
      id: "automation",
      label: "Ops Automation",
      subtext: "reliability check green",
      Icon: Workflow,
      x: 58,
      y: 68,
      tech: "Node / Queues",
      status: "optimal"
    },
    {
      id: "deployment",
      label: "Delivery Layer",
      subtext: "v2.4.1 online",
      Icon: CloudCog,
      x: 85,
      y: 78,
      tech: "Kubernetes / CI-CD",
      status: "optimal"
    }
  ];

  return (
    <div className="system-dashboard-mockup" aria-label="Darshonic System Intelligence Dashboard">
      {/* Mock Window Top Bar */}
      <div className="mock-window-header">
        <div className="window-controls">
          <span className="dot dot-close" />
          <span className="dot dot-minimize" />
          <span className="dot dot-maximize" />
        </div>
        <div className="window-breadcrumbs">
          <span>Systems</span>
          <span className="separator">/</span>
          <span>Production</span>
          <span className="separator">/</span>
          <span className="active-breadcrumb">System Intelligence Map</span>
        </div>
        <div className="window-search">
          <Search size={12} />
          <input type="text" placeholder="Search systems..." disabled />
        </div>
        <div className="window-profile">
          <User size={13} />
        </div>
      </div>

      {/* Main Inner Layout */}
      <div className="mock-window-content">
        {/* Left Toolbar */}
        <aside className="mock-sidebar">
          <div className="sidebar-group">
            <button
              onClick={() => setActiveTab("overview")}
              className={`sidebar-btn ${activeTab === "overview" ? "active" : ""}`}
              title="System Overview"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`sidebar-btn ${activeTab === "logs" ? "active" : ""}`}
              title="System Log Streams"
            >
              <Terminal size={18} />
            </button>
            <button
              onClick={() => setActiveTab("health")}
              className={`sidebar-btn ${activeTab === "health" ? "active" : ""}`}
              title="Infrastructure Health"
            >
              <Activity size={18} />
            </button>
          </div>
          <div className="sidebar-footer">
            <button className="sidebar-btn" title="Settings">
              <Settings size={18} />
            </button>
          </div>
        </aside>

        {/* Central Visualization Canvas */}
        <main className="dashboard-canvas">
          {/* Subtle Grid Backdrop */}
          <div className="canvas-grid-backdrop" />

          {/* SVG Animated Connection Wires */}
          <svg className="canvas-svg-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(24, 183, 164, 0.15)" />
                <stop offset="50%" stopColor="rgba(24, 183, 164, 0.85)" />
                <stop offset="100%" stopColor="rgba(24, 183, 164, 0.15)" />
              </linearGradient>
              <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(183, 243, 107, 0.1)" />
                <stop offset="50%" stopColor="rgba(183, 243, 107, 0.85)" />
                <stop offset="100%" stopColor="rgba(183, 243, 107, 0.1)" />
              </linearGradient>
            </defs>

            {/* Connection Lines (Grid Orthogonal Path style) */}
            {/* Experience Layer to Core API */}
            <path className="wire wire-static" d="M 28 26 L 52 26" />
            <path className="wire wire-animated wire-teal" d="M 28 26 L 52 26" />

            {/* Core API to AI Runtime */}
            <path className="wire wire-static" d="M 64 26 L 74 26 L 74 38 L 82 38" />
            <path className="wire wire-animated wire-green" d="M 64 26 L 74 26 L 74 38 L 82 38" strokeDasharray="6, 12" />

            {/* Experience Layer to Data Core */}
            <path className="wire wire-static" d="M 20 30 L 20 48 L 30 48 L 30 65" />
            <path className="wire wire-animated wire-teal" d="M 20 30 L 20 48 L 30 48 L 30 65" />

            {/* Data Core to Core API */}
            <path className="wire wire-static" d="M 36 68 L 44 68 L 44 48 L 56 48 L 56 26" />
            <path className="wire wire-animated wire-teal" d="M 36 68 L 44 68 L 44 48 L 56 48 L 56 26" strokeDasharray="8, 10" />

            {/* AI Runtime to Ops Automation */}
            <path className="wire wire-static" d="M 85 46 L 72 46 L 72 68 L 68 68" />
            <path className="wire wire-animated wire-green" d="M 85 46 L 72 46 L 72 68 L 68 68" />

            {/* Data Core to Ops Automation */}
            <path className="wire wire-static" d="M 36 71 L 58 71" />
            <path className="wire wire-animated wire-teal" d="M 36 71 L 58 71" />

            {/* Ops Automation to Delivery Layer */}
            <path className="wire wire-static" d="M 66 76 L 66 84 L 85 84" />
            <path className="wire wire-animated wire-green" d="M 66 76 L 66 84 L 85 84" strokeDasharray="5, 15" />
          </svg>

          {/* Interactive HTML Card Nodes */}
          <div className="nodes-container">
            {nodes.map((node) => {
              const { Icon } = node;
              const isHovered = hoveredNode === node.id;

              return (
                <div
                  key={node.id}
                  className={`node-card node-${node.id} ${isHovered ? "hovered" : ""} status-${node.status}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="node-icon-wrapper">
                    <Icon size={16} />
                    <span className="status-ping" />
                  </div>
                  <div className="node-info">
                    <span className="node-title">{node.label}</span>
                    <span className="node-meta">{node.subtext}</span>
                  </div>

                  {/* Glassmorphic Tooltip on Hover */}
                  {isHovered && (
                    <div className="node-tooltip">
                      <div className="tooltip-header">
                        <strong>Node Specs</strong>
                        <span className="badge">Active</span>
                      </div>
                      <div className="tooltip-body">
                        <div className="tooltip-row">
                          <span>Stack:</span>
                          <strong>{node.tech}</strong>
                        </div>
                        <div className="tooltip-row">
                          <span>Health:</span>
                          <strong className="text-green">Optimal</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sparkline & Overall Stats overlay widget (Bottom-Left) */}
          <div className="canvas-widget stats-widget">
            <div className="widget-header">
              <Activity size={14} className="text-teal" />
              <span>Global Response Latency</span>
            </div>
            <div className="widget-body">
              <div className="metric-row">
                <span className="metric-num">{avgLatency}ms</span>
                <span className="metric-status">Edge Avg</span>
              </div>
              <div className="sparkline-wrapper">
                <svg width="120" height="30" viewBox="0 0 120 30" preserveAspectRatio="none">
                  <path
                    d={getSparklinePath()}
                    fill="none"
                    stroke="#18b7a4"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Live Terminal Log panel (Bottom-Right) */}
          <div className="canvas-widget terminal-widget">
            <div className="widget-header">
              <Terminal size={14} className="text-green" />
              <span>Live System Log Streams</span>
              <span className="active-dot" />
            </div>
            <div className="terminal-body font-mono">
              {logs.map((log, index) => (
                <div key={index} className={`log-line ${index === 0 ? "new-log" : ""}`}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Quick System Summary Overlay */}
          <div className="canvas-summary-header">
            <div className="summary-title-row">
              <Zap size={15} className="text-green" />
              <h2>System Intelligence Map</h2>
            </div>
            <p>Interactive graph showing multi-zone routing and execution nodes</p>
          </div>
        </main>
      </div>
    </div>
  );
}
