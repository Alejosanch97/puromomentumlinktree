import { useState, useEffect } from "react";
import "../Styles/home.css";

const LINKS = [
	{ label: "Sitio Web", sublabel: "puromomentum.com", url: "https://puromomentum.com/", code: "00:01" },
	{
		label: "WhatsApp",
		sublabel: "Hablemos de tu marca",
		url: "https://api.whatsapp.com/send/?phone=573105523011&text=Hola%21+Me+gustar%C3%ADa+obtener+m%C3%A1s+informaci%C3%B3n+sobre+Puro+Momentum.&type=phone_number&app_absent=0",
		code: "00:02",
	},
	{ label: "Instagram", sublabel: "@puromomentum", url: "https://www.instagram.com/puromomentum/", code: "00:03" },
	{ label: "YouTube", sublabel: "Nuestros proyectos", url: "https://www.youtube.com/@PuroMomentum", code: "00:04" },
];

const SOCIALS = [
	{ label: "IG", url: "https://www.instagram.com/puromomentum/" },
	{ label: "YT", url: "https://www.youtube.com/@PuroMomentum" },
	{ label: "WA", url: "https://api.whatsapp.com/send/?phone=573105523011&text=Hola%21+Me+gustar%C3%ADa+obtener+m%C3%A1s+informaci%C3%B3n+sobre+Puro+Momentum.&type=phone_number&app_absent=0" },
];

export const Home = () => {
	const [mounted, setMounted] = useState(false);
	const [tc, setTc] = useState(0);

	useEffect(() => setMounted(true), []);

	// Timecode en vivo (mm:ss:ff) — la sensación de "momentum"
	useEffect(() => {
		const id = setInterval(() => setTc((t) => t + 1), 42); // ~24fps
		return () => clearInterval(id);
	}, []);

	const fmt = (frames) => {
		const totalSec = Math.floor(frames / 24);
		const ff = String(frames % 24).padStart(2, "0");
		const ss = String(totalSec % 60).padStart(2, "0");
		const mm = String(Math.floor(totalSec / 60) % 60).padStart(2, "0");
		return `${mm}:${ss}:${ff}`;
	};

	const onMove = (e) => {
		const t = e.currentTarget;
		const r = t.getBoundingClientRect();
		const p = ((e.clientX - r.left) / r.width) * 100;
		t.style.setProperty("--scrub", `${Math.max(4, Math.min(100, p))}%`);
	};

	return (
		<div className={`pm-wrap ${mounted ? "pm-ready" : ""}`}>
			<div className="pm-grain" />
			<div className="pm-sweep" />

			{/* Marquee de fondo */}
			<div className="pm-marquee" aria-hidden="true">
				<div className="pm-marquee-row">
					<span>PURO MOMENTUM — PRODUCCIÓN AUDIOVISUAL — </span>
					<span>PURO MOMENTUM — PRODUCCIÓN AUDIOVISUAL — </span>
				</div>
				<div className="pm-marquee-row rev">
					<span>MARCAS CON PROPÓSITO — EN MOVIMIENTO — </span>
					<span>MARCAS CON PROPÓSITO — EN MOVIMIENTO — </span>
				</div>
			</div>

			<main className="pm-card">
				<header className="pm-head">
					<div className="pm-mark">
						<svg viewBox="0 0 48 48" className="pm-target" fill="none">
							<circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2.5" />
							<circle cx="24" cy="24" r="12.5" stroke="currentColor" strokeWidth="2.5" />
							<circle cx="24" cy="24" r="4.5" fill="currentColor" />
						</svg>
						<h1 className="pm-word">
							PURO<br />
							<span>MOMENTUM</span>
						</h1>
					</div>
					<p className="pm-tag">
						<span className="pm-rec"><i /> REC</span>
						Producción audiovisual estratégica · Bogotá, CO
					</p>
				</header>

				<nav className="pm-tracks">
					{LINKS.map((l, i) => (
						<a
							key={l.label}
							href={l.url}
							target="_blank"
							rel="noopener noreferrer"
							className="pm-track"
							onMouseMove={onMove}
							style={{ "--d": `${i * 0.08 + 0.3}s` }}
						>
							<span className="pm-fill" />
							<span className="pm-code">{l.code}</span>
							<span className="pm-play">
								<svg viewBox="0 0 24 24" width="14" height="14"><path d="M6 4l14 8-14 8V4z" fill="currentColor" /></svg>
							</span>
							<span className="pm-text">
								<strong>{l.label}</strong>
								<small>{l.sublabel}</small>
							</span>
							<span className="pm-arrow">
								<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
									<path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</span>
						</a>
					))}
				</nav>

				<div className="pm-socials">
					{SOCIALS.map((s, i) => (
						<a
							key={s.label}
							href={s.url}
							target="_blank"
							rel="noopener noreferrer"
							className="pm-social"
							style={{ "--d": `${i * 0.1 + 0.7}s` }}
						>
							{s.label}
						</a>
					))}
				</div>

				<footer className="pm-foot">
					<span className="pm-tcode">{fmt(tc)}</span>
					<span>© {new Date().getFullYear()} · PURO MOMENTUM</span>
				</footer>
			</main>
		</div>
	);
};

export default Home;