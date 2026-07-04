import {
  Activity,
  BrainCircuit,
  CloudCog,
  Code2,
  Database,
  Gauge,
  Globe2,
  Workflow
} from "lucide-react";

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 500;

const nodes = [
  {
    id: "web",
    label: "Dashboards & UIs",
    subtext: "React / SaaS Frontend",
    Icon: Globe2,
    x: 48,
    y: 105,
    width: 190,
    height: 78,
    tone: "teal"
  },
  {
    id: "api",
    label: "API Gateways",
    subtext: "REST / GraphQL / RPC",
    Icon: Code2,
    x: 260,
    y: 82,
    width: 180,
    height: 78,
    tone: "teal"
  },
  {
    id: "agent",
    label: "AI Agents",
    subtext: "Cognitive Workflow Layer",
    Icon: BrainCircuit,
    x: 440,
    y: 180,
    width: 180,
    height: 78,
    tone: "green"
  },
  {
    id: "data",
    label: "Databases / Vector",
    subtext: "SQL / PgVector / Cache",
    Icon: Database,
    x: 130,
    y: 285,
    width: 195,
    height: 78,
    tone: "teal"
  },
  {
    id: "automation",
    label: "Automation Flows",
    subtext: "Message Queues / Tasks",
    Icon: Workflow,
    x: 345,
    y: 305,
    width: 190,
    height: 78,
    tone: "green"
  },
  {
    id: "deployment",
    label: "Deployment Layer",
    subtext: "CI/CD / Edge Runtime",
    Icon: CloudCog,
    x: 445,
    y: 403,
    width: 175,
    height: 78,
    tone: "teal"
  }
];

const metrics = [
  {
    id: "load",
    label: "System Load",
    value: "42ms",
    subtext: "edge response",
    Icon: Activity,
    x: 36,
    y: 390,
    width: 150,
    height: 92
  },
  {
    id: "flow",
    label: "Automation Flow",
    value: "18 active",
    subtext: "monitored tasks",
    Icon: Gauge,
    x: 460,
    y: 52,
    width: 170,
    height: 100
  }
];

function toPercent(value, dimension) {
  return `${(value / dimension) * 100}%`;
}

function mapStyle(item, index) {
  return {
    left: toPercent(item.x, CANVAS_WIDTH),
    top: toPercent(item.y, CANVAS_HEIGHT),
    width: toPercent(item.width, CANVAS_WIDTH),
    height: toPercent(item.height, CANVAS_HEIGHT),
    "--delay": `${index * 80}ms`
  };
}

export default function SystemIntelligenceMap() {
  return (
    <section className="system-intelligence-map" aria-label="Darshonic system intelligence map">
      <span className="system-map-frame" aria-hidden="true" />
      <div className="system-map-title">DARSHONIC / SYSTEM INTELLIGENCE MAP</div>

      <svg
        className="system-map-lines"
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          id="sim-path-web-api"
          className="system-map-path system-map-path-teal"
          d="M238 144 C246 120 250 116 260 121"
        />
        <path
          id="sim-path-api-agent"
          className="system-map-path system-map-path-steel"
          d="M440 121 C462 143 468 160 455 180"
        />
        <path
          id="sim-path-web-data"
          className="system-map-path system-map-path-steel"
          d="M143 183 C160 222 176 258 228 285"
        />
        <path
          id="sim-path-data-auto"
          className="system-map-path system-map-path-teal"
          d="M325 324 C334 316 338 337 345 344"
        />
        <path
          id="sim-path-agent-auto"
          className="system-map-path system-map-path-steel"
          d="M530 258 C510 281 486 296 440 305"
        />
        <path
          id="sim-path-auto-deploy"
          className="system-map-path system-map-path-teal"
          d="M520 383 C532 398 500 397 470 403"
        />

        <circle className="system-map-pulse system-map-pulse-teal" r="4">
          <animateMotion dur="9s" repeatCount="indefinite">
            <mpath href="#sim-path-web-data" />
          </animateMotion>
        </circle>
        <circle className="system-map-pulse system-map-pulse-green" r="3.5">
          <animateMotion dur="11s" begin="1.4s" repeatCount="indefinite">
            <mpath href="#sim-path-agent-auto" />
          </animateMotion>
        </circle>
      </svg>

      <div className="system-map-card-layer">
        {nodes.map((node, index) => {
          const { Icon } = node;

          return (
            <article
              className={`system-map-card system-map-node system-map-node-${node.id} system-map-tone-${node.tone}`}
              key={node.id}
              style={mapStyle(node, index)}
            >
              <Icon className="system-map-icon" size={20} strokeWidth={1.9} aria-hidden="true" />
              <div className="system-map-copy">
                <strong>{node.label}</strong>
                <span>{node.subtext}</span>
              </div>
            </article>
          );
        })}

        {metrics.map((metric, index) => {
          const { Icon } = metric;

          return (
            <aside
              className={`system-map-card system-map-metric system-map-metric-${metric.id}`}
              key={metric.id}
              style={mapStyle(metric, nodes.length + index)}
            >
              <div className="system-map-metric-label">
                <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                <span>{metric.label}</span>
              </div>
              <strong>{metric.value}</strong>
              <small>{metric.subtext}</small>
            </aside>
          );
        })}
      </div>

      <div className="system-map-signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
