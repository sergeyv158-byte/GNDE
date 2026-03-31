import { useState, useEffect } from "react";

export default function GuidedNDEWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [frequency, setFrequency] = useState(60);
  const plateVelocity = 3200;
  const wavelength = plateVelocity / (frequency * 1000);

  const [waveOffset, setWaveOffset] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWaveOffset((v) => v + 2);
    }, 40);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 4);
    }, 2500);

    return () => clearInterval(id);
  }, []);

  const features = [
    {
      title: "Long-Range Guided Wave Screening",
      text: "Inspect large areas of structures such as tanks, pipelines, and anchor systems from a limited number of probe positions.",
    },
    {
      title: "Magnetostrictive Transducer Technology",
      text: "Robust MST sensors capable of generating SH0 and torsional guided waves for industrial corrosion detection.",
    },
    {
      title: "Engineering-Driven Deployment",
      text: "From feasibility analysis to field implementation and data interpretation support.",
    },
  ];

  const caseStudies = [
    {
      title: "Tank Floor Corrosion Screening",
      text: "SH0 guided wave arrays used to screen large tank bottom areas without taking tanks out of service.",
      url: "/case-tank-floor-corrosion",
    },
    {
      title: "Buried Monopole Inspection",
      text: "Guided wave sensors deployed to detect corrosion in buried sections of transmission poles.",
      url: "/case-buried-monopole-inspection",
    },
    {
      title: "Anchor Rod Evaluation",
      text: "Directional guided wave probes used for rapid screening of anchor rod corrosion.",
      url: "/case-anchor-rod-evaluation",
    },
    {
      title: "Long-Range Pipe Inspection",
      text: "Magnetostrictive guided waves used for long-range screening of pipelines to identify corrosion and defects tens of meters from the probe location.",
      url: "/case-long-range-pipe-inspection",
    },
    {
      title: "Detection of Corrosion Under Pipe Supports",
      text: "Guided wave inspection used to detect corrosion hidden beneath pipe supports where conventional inspection methods are limited.",
      url: "/case-corrosion-under-pipe-support",
    },
    {
      title: "Steel Cable Inspection",
      text: "Guided wave and magnetostrictive sensing used to detect corrosion, broken wires, and cross-section loss in structural steel cables and tendons.",
      url: "/case-steel-cable-inspection",
    },
    {
      title: "Heat Exchanger Tube Inspection",
      text: "Guided wave techniques used for rapid screening of heat exchanger tubing to identify corrosion, erosion, and wall loss over long sections of tube.",
      url: "/case-heat-exchanger-tube-inspection",
    },
    {
      title: "Boiler Tube Inspection",
      text: "Ultrasonic guided waves applied to boiler tubes to detect corrosion, erosion, and cracking in power generation and industrial boilers.",
      url: "/case-boiler-tube-inspection",
    },
    {
      title: "Structural Health Monitoring of Pipes",
      text: "Permanent guided wave sensor installations used for continuous structural health monitoring of pipelines and process piping.",
      url: "/case-pipe-shm",
    },
    {
      title: "Structural Health Monitoring of Pressure Vessels",
      text: "Guided wave sensor networks deployed for long-term monitoring of pressure vessels to detect corrosion growth and structural degradation.",
      url: "/case-vessel-shm",
    },
    {
      title: "SHM of High-Temperature Structures",
      text: "Guided wave sensors designed for continuous structural health monitoring of pipes, vessels, and components operating at elevated temperatures in power plants and industrial processes.",
      url: "/case-high-temperature-shm",
    },
  ];

  return (
    <div className="min-h-screen text-slate-100 relative overflow-hidden bg-gradient-to-b from-[#04063a] via-[#04063a] to-[#01021a]">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#04063a]/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-4">
              <svg
                viewBox="0 0 520 160"
                preserveAspectRatio="xMinYMid meet"
                className="h-12 w-auto shrink-0 overflow-visible"
                aria-label="Guided NDE logo"
                role="img"
              >
                <g
                  fill="none"
                  stroke="#e1733a"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(0,-2) scale(1,1.6)"
                >
                  <path d="M12 60 L34 60 C40 60 43 54 47 45 C52 34 57 34 61 45 C66 60 70 82 76 82 C83 82 87 30 93 14 C98 2 106 2 112 14 C118 28 122 108 129 108 C137 108 141 24 148 12 C153 2 160 2 166 12 C173 23 177 72 184 72 L286 72" />
                  <path d="M286 72 C293 72 294 58 301 58 C308 58 309 82 316 82 C323 82 324 72 331 72" />
                  <line x1="331" y1="72" x2="364" y2="72" />
                </g>

                {[0, 1, 2, 3].map((i) => {
                  const t = (Math.sin(waveOffset * 0.03 + i * 0.8) + 1) / 2;
                  const x = 184 + t * 150;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={72} r="4" fill="#22d3ee" opacity="0.9" />
                      <circle cx={x} cy={72} r="9" fill="#22d3ee" opacity="0.14" />
                    </g>
                  );
                })}

                {[0, 1].map((i) => {
                  const t = (Math.sin(waveOffset * 0.03 + i * 1.5) + 1) / 2;
                  const x = 286 + t * 45;
                  const y = 72 - Math.sin(t * Math.PI) * 14;
                  return (
                    <circle
                      key={`bump-${i}`}
                      cx={x}
                      cy={y}
                      r="3.2"
                      fill="#22d3ee"
                      opacity="0.8"
                    />
                  );
                })}

                <text
                  x="150"
                  y="168"
                  fontFamily="Arial, Helvetica, sans-serif"
                  fontSize="38"
                  fill="white"
                  fontWeight="700"
                  letterSpacing="0.5"
                >
                  Guided NDE
                </text>
              </svg>
            </a>

            <nav className="hidden md:flex gap-6 text-base lg:text-lg text-slate-200 font-medium">
              <a href="/#technology">Technology</a>
              <a href="/#products">Products</a>
              <a href="/#applications">Applications</a>
              <a href="/#case">Case Studies</a>
              <a href="/#tools">Engineering Tools</a>
              <a href="/#contact">Contact</a>
            </nav>

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-base bg-[#04063a]/95">
              <a href="/#technology">Technology</a>
              <a href="/#products">Products</a>
              <a href="/#applications">Applications</a>
              <a href="/#case">Case Studies</a>
              <a href="/#tools">Engineering Tools</a>
              <a href="/#contact">Contact</a>
            </div>
          )}
        </header>

        <section className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl lg:text-6xl font-semibold leading-tight">
              Magnetostrictive Sensors for Guided Wave NDT
            </h1>

            <p className="mt-6 text-slate-300 max-w-xl">
              Corrosion detection and corrosion mapping in hard to access areas using long, medium and short range guided waves.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="border border-white/20 px-5 py-3 rounded-xl">
                Learn Technology
              </button>

              <button className="bg-cyan-400 text-black px-5 py-3 rounded-xl">
                Request Consultation
              </button>
            </div>
          </div>

          <div className="relative h-[420px] flex items-center justify-end">
            {(() => {
              const images = [
                "/mst-field-setup.webp",
                "/heat-exchanger-inspection.webp",
                "/mst-probe-close.webp",
                "/pipeline-long-range.webp",
              ];

              return (
                <div className="relative w-[420px] h-[300px] max-w-full">
                  {images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Field inspection setup"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, 420px"
                      className={`absolute inset-0 w-full h-full object-cover rounded-lg border border-white/10 shadow-lg transition-opacity duration-700 ${
                        i === currentImage ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}

                  <div className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-1 rounded">
                    Field Inspection Setup
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        <section id="technology" className="py-20 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-semibold">Magnetostrictive Transducer Technology</h2>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {features.map((f) => {
                const pageLinks = {
                  "Long-Range Guided Wave Screening": "/long-range-guided-wave-screening",
                  "Magnetostrictive Transducer Technology": "/magnetostrictive-transducers",
                  "Engineering-Driven Deployment": "/guided-wave-field-deployment",
                };

                return (
                  <a
                    key={f.title}
                    href={pageLinks[f.title]}
                    className="border border-white/10 rounded-xl p-6 bg-white/5 hover:bg-white/10 transition block"
                  >
                    <h3 className="font-medium">{f.title}</h3>
                    <p className="text-sm text-slate-400 mt-2">{f.text}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#04063a]/25">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-semibold mb-8">MST Probe Concept</h2>

            <svg viewBox="0 0 600 200" className="w-full border border-white/10">
              <rect x="0" y="120" width="600" height="20" fill="#444" />
              <rect x="200" y="80" width="200" height="20" fill="#00ffff" />
              <rect x="180" y="60" width="20" height="60" fill="#888" />
              <rect x="400" y="60" width="20" height="60" fill="#888" />
              <text x="210" y="75" fontSize="12" fill="white">FeCo Strip</text>
              <text x="180" y="55" fontSize="12" fill="white">Magnets</text>
              <text x="10" y="150" fontSize="12" fill="white">Steel Plate</text>
            </svg>
          </div>
        </section>

        <section id="tools" className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold">Guided Wave Dispersion Explorer</h2>

            <div className="mt-8 border border-white/10 p-6 rounded-xl bg-white/5">
              <label className="text-sm">Frequency (kHz)</label>

              <input
                type="range"
                min="10"
                max="200"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full"
              />

              <div className="mt-4 text-sm">Frequency: {frequency} kHz</div>

              <div className="text-sm mt-2">
                Approx SH0 Wavelength: {wavelength.toFixed(3)} m
              </div>

              <div className="mt-8">
                <h3 className="text-sm mb-2">Frequency vs Group Velocity (Conceptual)</h3>

                <svg viewBox="0 0 500 250" className="w-full border border-white/10 bg-black">
                  <line x1="40" y1="210" x2="480" y2="210" stroke="white" />
                  <line x1="40" y1="20" x2="40" y2="210" stroke="white" />
                  <polyline
                    fill="none"
                    stroke="cyan"
                    strokeWidth="2"
                    points="40,120 120,120 200,120 280,120 360,120 440,120"
                  />
                  <polyline
                    fill="none"
                    stroke="orange"
                    strokeWidth="2"
                    points="40,200 120,170 200,150 280,140 360,135 440,132"
                  />
                  <text x="380" y="115" fontSize="12" fill="cyan">SH0</text>
                  <text x="380" y="140" fontSize="12" fill="orange">A0</text>
                  <text x="250" y="240" fontSize="12" fill="white">Frequency</text>
                  <text x="5" y="30" fontSize="12" fill="white">Velocity</text>
                </svg>
              </div>

              <div className="mt-10">
                <h3 className="text-sm mb-2">Mode Shape (SH0)</h3>

                <svg viewBox="0 0 500 120" className="w-full border border-white/10">
                  <rect x="0" y="40" width="500" height="40" fill="#444" />
                  {[...Array(12)].map((_, i) => {
                    const x = i * 40 + 20;
                    const offset = Math.sin(i + waveOffset * 0.1) * 10;

                    return (
                      <line
                        key={i}
                        x1={x}
                        y1={60 - offset}
                        x2={x}
                        y2={60 + offset}
                        stroke="cyan"
                        strokeWidth="2"
                      />
                    );
                  })}

                  <text x="10" y="20" fontSize="12" fill="white">Plate Thickness</text>
                </svg>

                <p className="text-xs text-slate-400 mt-2">
                  Simplified shear horizontal mode shape showing particle motion through thickness
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="case" className="py-20 bg-[#04063a]/25">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-semibold">Field Case Studies</h2>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {caseStudies.map((c) => (
                <a
                  key={c.title}
                  href={c.url}
                  className="border border-white/10 rounded-xl p-6 bg-white/5 hover:bg-white/10 transition block"
                >
                  <h3 className="font-medium">{c.title}</h3>
                  <p className="text-sm text-slate-400 mt-2">{c.text}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold">Contact</h2>

            <div className="grid gap-4 mt-8">
              <input className="bg-white/5 border border-white/10 p-3 rounded" placeholder="Name" />
              <input className="bg-white/5 border border-white/10 p-3 rounded" placeholder="Company" />
              <input className="bg-white/5 border border-white/10 p-3 rounded" placeholder="Email" />
              <textarea
                className="bg-white/5 border border-white/10 p-3 rounded"
                placeholder="Describe your inspection application"
              />
              <button className="bg-cyan-400 text-black px-5 py-3 rounded-xl mt-2">
                Send Inquiry
              </button>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-10 text-sm text-slate-400">
          <div className="mx-auto max-w-7xl px-6 flex justify-between flex-wrap gap-4">
            <div>
              <div className="text-white font-medium">Guided Wave NDT</div>
              <div>Magnetostrictive Guided Wave Inspection Systems</div>
            </div>

            <div className="flex gap-4">
              <span>Technology</span>
              <span>Products</span>
              <span>Applications</span>
              <span>Case Studies</span>
              <span>Engineering Tools</span>
              <span>Contact</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
