import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircuitBoard,
  CloudCog,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Globe2,
  Layers3,
  LineChart,
  LockKeyhole,
  MonitorCog,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import SystemIntelligenceMap from "./SystemIntelligenceMap.jsx";
import "./styles.css";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.24 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
};

const services = [
  {
    icon: Globe2,
    label: "Web Platforms",
    title: "Conversion-ready websites with engineering depth",
    copy:
      "Fast, responsive business websites, dashboards, and web portals built with maintainable architecture and measurable user journeys.",
    points: ["Brand systems", "CMS-ready builds", "Analytics foundations"]
  },
  {
    icon: Code2,
    label: "Custom Software",
    title: "Internal systems that remove operational drag",
    copy:
      "Role-based tools, workflow apps, booking systems, admin panels, and integrated software tailored to the way your business runs.",
    points: ["Process mapping", "Secure data models", "API integrations"]
  },
  {
    icon: Bot,
    label: "AI Automation",
    title: "AI agents and automations for repeatable work",
    copy:
      "Automate intake, reporting, support, lead routing, research, and content operations with practical AI systems connected to your stack.",
    points: ["Agent workflows", "Human review loops", "Business safeguards"]
  },
  {
    icon: Rocket,
    label: "SaaS MVP",
    title: "Launchable SaaS products without brittle shortcuts",
    copy:
      "From prototype to production MVP: authentication, subscriptions, dashboards, data flows, and deployment pipelines.",
    points: ["Product scope", "MVP architecture", "Cloud deployment"]
  }
];

const visionOptions = {
  Website: {
    icon: Globe2,
    recommended: "Enterprise website and conversion platform",
    timeline: "2-4 weeks",
    deliverables: [
      "Strategic sitemap and content structure",
      "High-performance React website",
      "Lead capture, analytics, and SEO foundations",
      "Admin-ready content sections"
    ],
    technologies: ["React", "Vite", "Headless CMS", "Analytics", "Cloudflare"],
    outcome:
      "A credible digital presence that clearly explains your offer, builds trust, and turns interested visitors into qualified enquiries.",
    cta: "Plan website system"
  },
  "Custom Software": {
    icon: MonitorCog,
    recommended: "Custom operations platform",
    timeline: "4-10 weeks",
    deliverables: [
      "Workflow and role mapping",
      "Secure database design",
      "Admin dashboards and user portals",
      "API integrations and automation hooks"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST APIs", "AWS"],
    outcome:
      "A business system that reduces manual coordination, centralizes information, and gives teams a clearer operating rhythm.",
    cta: "Map software workflow"
  },
  "AI Automation": {
    icon: BrainCircuit,
    recommended: "AI workflow automation layer",
    timeline: "2-6 weeks",
    deliverables: [
      "Automation opportunity audit",
      "Prompted agent flows with guardrails",
      "CRM, email, document, or dashboard integrations",
      "Monitoring and handoff logic"
    ],
    technologies: ["OpenAI API", "LangGraph", "Zapier", "Vector DB", "Node.js"],
    outcome:
      "Faster repetitive work, more consistent decisions, and AI support that remains accountable to your existing business process.",
    cta: "Design AI workflow"
  },
  "SaaS MVP": {
    icon: Blocks,
    recommended: "Production-oriented SaaS MVP",
    timeline: "6-12 weeks",
    deliverables: [
      "Core product scope and roadmap",
      "Authentication and subscription logic",
      "Customer dashboard and admin panel",
      "Deployment pipeline and release checklist"
    ],
    technologies: ["React", "Next.js", "Supabase", "Stripe", "Vercel"],
    outcome:
      "A launchable product foundation that can reach real users, collect feedback, and scale without needing an immediate rebuild.",
    cta: "Scope MVP launch"
  },
  "Maintenance & Scaling": {
    icon: ServerCog,
    recommended: "Reliability and scale partnership",
    timeline: "Monthly",
    deliverables: [
      "Performance and security audit",
      "Bug fixes and feature iterations",
      "Monitoring, backups, and deployment support",
      "Roadmap planning and technical advisory"
    ],
    technologies: ["CI/CD", "Observability", "Cloud Hosting", "Security", "Databases"],
    outcome:
      "A more reliable system, fewer surprises, and a technical partner who keeps the platform improving after launch.",
    cta: "Review current system"
  }
};

const caseStudies = [
  {
    type: "AI Automation",
    title: "Inquiry intake engine for a service business",
    metric: "62%",
    label: "less manual triage",
    copy:
      "Built a structured lead intake workflow with AI classification, CRM routing, and management visibility."
  },
  {
    type: "SaaS MVP",
    title: "Subscription dashboard for a founder-led product",
    metric: "8 weeks",
    label: "to launch",
    copy:
      "Delivered authenticated user dashboards, Stripe plans, admin controls, and a deployment-ready product base."
  },
  {
    type: "Custom Software",
    title: "Operations portal for distributed teams",
    metric: "3.4x",
    label: "faster reporting",
    copy:
      "Unified task status, document flows, user permissions, and reporting into a single operational workspace."
  }
];

const processSteps = [
  {
    icon: GitBranch,
    title: "Discover",
    copy: "We map the business process, technical constraints, user roles, and the decision points that matter."
  },
  {
    icon: CircuitBoard,
    title: "Architect",
    copy: "We translate the roadmap into system modules, integrations, data models, and delivery milestones."
  },
  {
    icon: CloudCog,
    title: "Build",
    copy: "We ship clean interfaces, secure backends, automation flows, and deployment foundations in focused cycles."
  },
  {
    icon: Gauge,
    title: "Improve",
    copy: "We monitor performance, refine workflows, and keep the system aligned with business growth."
  }
];

function SectionLabel({ children, dark = false }) {
  return (
    <div className={`section-label ${dark ? "section-label-dark" : ""}`}>
      <span />
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", icon: Icon = ArrowRight }) {
  return (
    <a className={`button button-${variant}`} href="#contact">
      {children}
      {Icon ? <Icon size={18} strokeWidth={1.9} /> : null}
    </a>
  );
}

function ArchitectureVisual() {
  const nodes = [
    { id: "web", label: "Web Apps", meta: "React / CMS", x: 10, y: 21, icon: Globe2 },
    { id: "api", label: "API Layer", meta: "REST / Webhooks", x: 39, y: 18, icon: Code2 },
    { id: "agent", label: "AI Agents", meta: "Reason + Act", x: 67, y: 27, icon: BrainCircuit },
    { id: "data", label: "Data Core", meta: "SQL / Vector", x: 22, y: 57, icon: Database },
    { id: "auto", label: "Automation", meta: "Queues / Tasks", x: 53, y: 61, icon: Workflow },
    { id: "deploy", label: "Deployment", meta: "Cloud / CI", x: 77, y: 66, icon: CloudCog }
  ];

  return (
    <div className="architecture-shell" aria-label="System intelligence architecture visual">
      <div className="grid-motion grid-motion-one" />
      <div className="grid-motion grid-motion-two" />
      <svg className="architecture-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className="line line-primary" d="M19 28 C30 18, 31 20, 39 25" />
        <path className="line line-secondary" d="M48 26 C57 18, 62 22, 67 32" />
        <path className="line line-primary" d="M26 59 C34 49, 43 51, 53 63" />
        <path className="line line-secondary" d="M61 63 C68 59, 71 61, 77 70" />
        <path className="line line-muted" d="M39 27 C35 39, 31 47, 25 58" />
        <path className="line line-muted" d="M68 36 C61 45, 57 53, 54 64" />
      </svg>
      {nodes.map((node, index) => {
        const Icon = node.icon;
        return (
          <motion.div
            className={`architecture-node architecture-node-${node.id}`}
            key={node.id}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.08, duration: 0.45 }}
          >
            <Icon size={18} strokeWidth={1.8} />
            <div>
              <strong>{node.label}</strong>
              <span>{node.meta}</span>
            </div>
          </motion.div>
        );
      })}
      <div className="architecture-panel panel-left">
        <span>System load</span>
        <strong>42ms</strong>
        <small>edge response</small>
      </div>
      <div className="architecture-panel panel-right">
        <span>Automation flow</span>
        <strong>18 active</strong>
        <small>monitored tasks</small>
      </div>
      <div className="signal-stack" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero" id="home">
      <nav className="nav">
        <a className="brand" href="#home" aria-label="Darshonic home">
          <span className="brand-mark">D</span>
          <span>Darshonic</span>
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#vision-map">Vision Map</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-action" href="#contact">
          Start Project
          <ChevronRight size={16} />
        </a>
      </nav>

      <div className="hero-grid">
        <motion.div className="hero-copy" {...fadeUp}>
          <SectionLabel dark>Darshonic Enterprise Grid</SectionLabel>
          <h1>Intelligent software systems for businesses built to scale.</h1>
          <p>
            Darshonic builds websites, custom software, AI automation, SaaS platforms, and digital systems
            that help companies operate with clarity and speed.
          </p>
          <div className="hero-actions">
            <Button>Build a system</Button>
            <Button variant="secondary" icon={LineChart}>
              View capabilities
            </Button>
          </div>
          <div className="hero-proof" aria-label="Company capabilities">
            <div>
              <strong>5</strong>
              <span>Core solution tracks</span>
            </div>
            <div>
              <strong>AI + SaaS</strong>
              <span>From workflow to product</span>
            </div>
            <div>
              <strong>Scale-ready</strong>
              <span>Built for reliable growth</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="hero-visual-wrap"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <SystemIntelligenceMap />
        </motion.div>
      </div>
    </header>
  );
}

function Services() {
  return (
    <section className="section section-light services-section" id="services">
      <div className="section-inner">
        <motion.div className="section-heading split-heading" {...fadeUp}>
          <div>
            <SectionLabel>Capabilities</SectionLabel>
            <h2>Software services shaped around business systems.</h2>
          </div>
          <p>
            Every project is treated as an operating layer: clear interfaces, reliable infrastructure,
            measurable outcomes, and maintainable code.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                className="service-card"
                key={service.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.06 }}
                whileHover={{ y: -5 }}
              >
                <div className="service-top">
                  <div className="icon-frame">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <span>{service.label}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={16} />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VisionMap() {
  const [selected, setSelected] = useState("AI Automation");
  const active = visionOptions[selected];
  const ActiveIcon = active.icon;

  const techCopy = useMemo(() => active.technologies.join(" / "), [active.technologies]);

  return (
    <section className="section vision-section" id="vision-map">
      <div className="section-inner">
        <motion.div className="section-heading centered-heading" {...fadeUp}>
          <SectionLabel dark>Darshonic Vision Map</SectionLabel>
          <h2>Choose the system your business needs next.</h2>
          <p>
            Select a priority and see the recommended delivery path, expected timeline, technical layer,
            and business outcome.
          </p>
        </motion.div>

        <motion.div className="vision-map" {...fadeUp}>
          <div className="vision-selector" role="tablist" aria-label="Solution selector">
            {Object.keys(visionOptions).map((option) => {
              const OptionIcon = visionOptions[option].icon;
              const isActive = selected === option;
              return (
                <button
                  className={isActive ? "vision-tab active" : "vision-tab"}
                  key={option}
                  type="button"
                  onClick={() => setSelected(option)}
                  role="tab"
                  aria-selected={isActive}
                >
                  <OptionIcon size={18} strokeWidth={1.8} />
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          <div className="vision-result">
            <div className="result-header">
              <div className="result-icon">
                <ActiveIcon size={28} strokeWidth={1.7} />
              </div>
              <div>
                <span>Recommended solution</span>
                <h3>{active.recommended}</h3>
              </div>
            </div>

            <div className="result-grid">
              <div className="result-block timeline-block">
                <span>Timeline</span>
                <strong>{active.timeline}</strong>
              </div>
              <div className="result-block">
                <span>Technologies</span>
                <strong>{techCopy}</strong>
              </div>
            </div>

            <div className="deliverables">
              <span>Deliverables</span>
              <ul>
                {active.deliverables.map((item) => (
                  <li key={item}>
                    <ShieldCheck size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="outcome-panel">
              <span>Business outcome</span>
              <p>{active.outcome}</p>
            </div>

            <Button icon={ArrowRight}>{active.cta}</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="section-inner">
        <motion.div className="section-heading split-heading" {...fadeUp}>
          <div>
            <SectionLabel dark>Operating Method</SectionLabel>
            <h2>Structured delivery from first conversation to live system.</h2>
          </div>
          <p>
            Darshonic works in transparent phases so founders, teams, and decision makers can see what
            is being built, why it matters, and where the system is heading.
          </p>
        </motion.div>

        <div className="process-grid">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                className="process-card"
                key={step.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.06 }}
              >
                <div className="process-index">0{index + 1}</div>
                <Icon size={24} strokeWidth={1.8} />
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section className="section section-light cases-section" id="case-studies">
      <div className="section-inner">
        <motion.div className="section-heading split-heading" {...fadeUp}>
          <div>
            <SectionLabel>Proof Patterns</SectionLabel>
            <h2>Built for the realities of modern digital operations.</h2>
          </div>
          <p>
            Example delivery patterns that show how Darshonic turns scattered processes into connected
            software, automation, and decision systems.
          </p>
        </motion.div>

        <div className="cases-layout">
          {caseStudies.map((study, index) => (
            <motion.article
              className="case-card"
              key={study.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <span className="case-type">{study.type}</span>
              <h3>{study.title}</h3>
              <div className="case-metric">
                <strong>{study.metric}</strong>
                <span>{study.label}</span>
              </div>
              <p>{study.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  const items = [
    { icon: LockKeyhole, label: "Secure foundations" },
    { icon: Database, label: "Structured data models" },
    { icon: Layers3, label: "Scalable architecture" },
    { icon: Sparkles, label: "Practical AI workflows" }
  ];

  return (
    <section className="trust-band" aria-label="Technical priorities">
      <div className="trust-inner">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div className="trust-item" key={item.label}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner contact-inner">
        <motion.div className="contact-copy" {...fadeUp}>
          <SectionLabel dark>Start With Clarity</SectionLabel>
          <h2>Bring Darshonic into your next software, AI, or scaling decision.</h2>
          <p>
            Share the business problem, the system you have now, and the result you want. Darshonic will
            help translate it into a practical build path.
          </p>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:hello@darshonic.com">
              hello@darshonic.com
              <ArrowRight size={18} strokeWidth={1.9} />
            </a>
            <a className="button button-secondary" href="tel:+910000000000">
              Book strategy call
              <ChevronRight size={18} strokeWidth={1.9} />
            </a>
          </div>
        </motion.div>
        <motion.div className="contact-system" {...fadeUp}>
          <div className="contact-row">
            <span>Discovery</span>
            <strong>Business workflow</strong>
          </div>
          <div className="contact-row">
            <span>Architecture</span>
            <strong>System map</strong>
          </div>
          <div className="contact-row">
            <span>Delivery</span>
            <strong>Build + deploy</strong>
          </div>
          <div className="contact-row">
            <span>Partnership</span>
            <strong>Maintain + scale</strong>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Hero />
      <Services />
      <VisionMap />
      <Process />
      <CaseStudies />
      <TrustBand />
      <ContactCta />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
