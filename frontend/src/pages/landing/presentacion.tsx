import { useEffect, useState } from "react";
import heroAnimation from "../../assets/hero_a1.webm";
import bgFooter from "../../assets/footer_bg.avif";
import { Link } from "react-router-dom";

function Encabezado() {
    const [scrolled, setScrolled] = useState(false);
    const [menuMovil, setmenuMovil] = useState(false);
    const linkClass = "relative pb-2 hover:text-cyan-500 dark:hover:text-cyan-400 after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-cyan-500 after:origin-center after:scale-x-0 after:transition hover:after:scale-x-100";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const cerrarMenu = () => setmenuMovil(false);
        if (menuMovil) {
            window.addEventListener("scroll", cerrarMenu);
            return () => window.removeEventListener("scroll", cerrarMenu);
        }
    }, [menuMovil]);

    const cerrarLink = () => {
        if (menuMovil) setmenuMovil(false);
    };

    return (        
        <header className={`w-full hover:display transition-all duration-300 ${scrolled ? 'fixed top-0 z-50 bg-white/80 dark:bg-black/60 backdrop-blur-md py-2' : 'py-4'}`}>
            <div className={"container mx-auto px-0 md:px-4 flex items-center justify-between text-black dark:text-white"}>
                <a href="#" className={"flex items-center gap-2 font-semibold hover:-translate-y-1 hover:transform"}>
                    <span className={"text-cyan-500 text-xl"}>*_*</span>
                    <span className="tracking-widest">ACADWRITE</span>
                </a>
                <nav className={"hidden md:flex md:items-center md:gap-6 tracking-wide"}>
                    <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-4 md:p-0">
                        <li> <a href="#descripcion" className={linkClass} onClick={cerrarLink}> Descripción </a> </li>
                        <li> <a href="#equipo" className={linkClass} onClick={cerrarLink}> Equipo </a> </li>
                        <li> <a href="#testimonios" className={linkClass}  onClick={cerrarLink}> Testimonios </a> </li>

                        <div className="flex flex-col md:flex-row gap-3 md:ml-6">
                            <Link to="/login"
                                className="px-6 py-3 border border-sky-500 rounded-lg text-center hover:bg-cyan-400 hover:text-white"
                                onClick={cerrarLink} >
                                Acceder
                            </Link>
                            <Link to="/register-student"
                                className="px-6 py-3 bg-sky-500 text-white rounded-lg text-center font-medium hover:bg-cyan-400"
                                onClick={cerrarLink} >
                                Registrarse
                            </Link>
                        </div>
                    </ul>
                </nav>

                <button
                    className="md:hidden text-3xl text-gray-800 dark:text-white focus:outline-none"
                    onClick={() => setmenuMovil(!menuMovil)}
                    aria-label={menuMovil ? "Cerrar menú" : "Abrir menú"}
                >
                    ☰
                </button>
            </div>
            {menuMovil && (
                <nav className="md:hidden flex flex-col w-full text-black dark:text-white bg-white dark:bg-black border-t border-black/10 dark:border-white/10">            
                    <ul className="flex flex-col w-full gap-0">
                        {["descripcion", "equipo", "testimonios"].map((id) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    onClick={cerrarLink}
                                    className="block py-4 text-center border-b border-black/10 dark:border-white/10"
                                >
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col gap-2 w-full px-6 py-4 text-center">
                        <Link to="/login" className="w-full py-3 border border-sky-500 rounded-lg" onClick={cerrarLink}>
                            Acceder
                        </Link>
                        <Link to="/register-student" className="w-full py-3 bg-sky-500 text-white rounded-lg" onClick={cerrarLink}>
                            Registrarse
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}

function Hero() {
    return (
        <section className="px-4 max-w-6xl mx-auto pt-16 flex flex-col md:flex-row">
            <div className="flex-1 text-center md:text-left text-slate-600 dark:text-slate-300">
                <span className="font-bold tracking-[0.3em] text-md">STACK MERN</span>

                <h1 className="my-10 text-gray-700 dark:text-white text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight font-sans">
                    REVISOR <br />
                    AUTOMÁTICO <br />
                    DE ESCRITURA <br />
                    ACADÉMICA
                </h1>

                <p className="mt-4 max-w-xl">
                    Mejora la calidad de tus documentos académicos con tecnología de última generación.
                    Análisis profundo, sugerencias inteligentes y resultados profesionales.
                </p>

                <div className="flex mb-9 place-content-center">
                    <a href="https://acadwrite-holamundo.onrender.com/" target="_blank" rel="noopener noreferrer"
                        className="relative my-10 inline-grid place-content-center w-20 h-20 rotate-45 border-2 border-cyan-500 
                            hover:bg-green-500 hover:border-none hover:text-white hover:outline hover:outline-1 hover:outline-fuchsia-400 hover:outline-offset-8 transition"
                    >
                        <span className="-rotate-45 font-bold">DEMO</span>
                    </a>
                </div>
            </div>

            <div className="hidden md:flex flex-1 justify-center items-start">
                <video
                    className="w-[85%] max-w-[450px] aspect-square object-contain mix-blend-multiply invert hue-rotate-[170deg]
                        dark:mix-blend-screen dark:filter-none relative z-10" autoPlay muted loop playsInline
                >
                    <source src={heroAnimation} type="video/webm" />
                </video>
            </div>
        </section>
    );
}

function Funcionalidades() {
    return (
        <section className="relative bg-[#0a0a0a] dark:bg-black overflow-hidden px-[clamp(1rem,4vw,6rem)] py-[clamp(2rem,3vw,4rem)]">
            <div>
                <h2 className="mx-auto mb-6 text-center text-white font-bold text-2xl md:text-3xl lg:text-4xl">
                    ¿Cómo Funciona?
                </h2>
                <p className="font-normal mx-auto mb-6 max-w-2xl text-white leading-relaxed">
                    Suba su documento académico, seleccione el análisis que necesita y nuestro sistema procesará el texto en
                    segundos.
                    Recibe un informe completo con correcciones gramaticales, sugerencias de mejora y recomendaciones de
                    estilo académico.
                </p>
                <p className="font-normal text-sm mx-auto mb-0 max-w-2xl text-gray-400 text-base italic leading-relaxed">
                    Todo el proceso está diseñado para ser intuitivo, rápido y respetuoso con tu tiempo como estudiante.
                </p>
            </div>
        </section>
    );
}

function Flujo() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-600 text-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">Nuestro Proceso en 4 Pasos</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {[
              { id: "01", title: "Carga del Documento", desc: "Sube un archivo PDF, DOCX o TXT." },
              { id: "02", title: "Procesamiento IA", desc: "Análisis automático del texto académico." },
              { id: "03", title: "Automatización n8n", desc: "Flujo optimizado para corrections." },
              { id: "04", title: "Informe Final", desc: "Recibe sugerencias precisas y aplicables." },
            ].map((c) => (
              <div
                key={c.id}
                className="bg-white/90 dark:bg-[#111226] text-slate-900 dark:text-slate-200 rounded-xl p-6 shadow-md hover:-translate-y-2 transition"
              >
                <span className="text-3xl font-extrabold text-cyan-500">{c.id}</span>
                <h3 className="mt-2 font-semibold">{c.title}</h3>
                <p className="font-normal mt-3 text-slate-600 dark:text-slate-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

function Footer() {
  return (
    <footer
      className="w-full bg-repeat bg-left-top py-16 font-normal"
      style={{ backgroundImage: `url(${bgFooter})` }}
    >
      <div
        className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6"
      >
        <div className="col-span-full">
          <a href="#" className="
              flex gap-2 text-white text-xl font-bold
              transition-transform duration-300
              hover:translate-x-1.5"
          >
            <span className="text-cyan-500 text-2xl">*_*</span>
            A C A D W R I T E
          </a>

          <p className="mt-4 text-white/70 leading-relaxed max-w-lg">
            Plataforma inteligente de revisión académica impulsada por IA.
            Mejoramos la calidad de tus documentos con análisis profundo y
            sugerencias profesionales en segundos.
          </p>

          <div className="flex gap-4 mt-6">
            <a href="https://github.com/dpalominoj" target="_blank"  rel="noopener" className="
                w-10 aspect-square rounded-full flex items-center justify-center
                text-white transition-all duration-300
                hover:bg-cyan-400 hover:text-black hover:-translate-y-1"
            >
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 0 0-2.53 15.6c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.88-1.16-.88-1.16-.72-.5.05-.49.05-.49.8.06 1.23.84 1.23.84.7 1.23 1.83.88 2.28.67a1.7 1.7 0 0 1 .51-1.06C4.9 10.4 3 9.77 3 6.97c0-.88.31-1.6.82-2.17-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.57.82 1.29.82 2.17 0 2.82-1.9 3.42-3.7 3.6.29.25.55.73.55 1.49v2.21c0 .21.14.46.55.38A8 8 0 0 0 8 0z" />
              </svg>
            </a>

            <a href="https://www.youtube.com/" target="_blank" rel="noopener" className="
                w-10 aspect-square rounded-full flex items-center justify-center
                text-white transition-all duration-300
                hover:bg-cyan-400 hover:text-black hover:-translate-y-1"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">                
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.8 15.3V8.7l6.2 3.3-6.2 3.3z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-cyan-300 tracking-wider text-sm mb-6 font-semibold">
            PLATAFORMA
          </h3>

          <ul className="space-y-3">
            {[
              ["Características", "#descripcion"],
              ["Cómo funciona", "#flujo"],
              ["Docs", "#api"],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  className="
                    text-white/80 inline-block relative
                    transition-all duration-300
                    hover:text-cyan-400 hover:translate-x-1.5
                    before:absolute before:bottom-[-2px] before:left-0
                    before:h-[1px] before:w-0 before:bg-cyan-400
                    before:transition-all before:duration-300
                    hover:before:w-full
                  "
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-cyan-300 tracking-wider text-sm mb-6 font-semibold">
            CONTACTO
          </h3>

          <ul className="space-y-4 text-white/80 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-cyan-400 font-bold">- </span>
              contacto@acadwrite.com
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-400 font-bold">- </span>
              Huancayo, Perú
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-400 font-bold">- </span>
              Lun - Vie: 9:00 - 18:00
            </li>
          </ul>
        </div>

        <div className="col-span-full pt-8 border-t border-white/10 flex flex-wrap justify-between items-center text-white/70 text-sm">
          <p>
            © 2025 <span className="text-cyan-400 font-semibold">AcadWrite</span>.
            Todos los derechos reservados.
          </p>

          <div className="flex gap-8 mt-4 md:mt-0">
            <a className="text-white/50 hover:text-cyan-400 transition-colors" href="#">
              Política
            </a>
            <a className="text-white/50 hover:text-cyan-400 transition-colors" href="#">
              Términos
            </a>
            <a className="text-white/50 hover:text-cyan-400 transition-colors" href="#">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Componente principal de la página de presentación
export default function Presentacion() {
  return (
    <div className="min-h-screen w-full font-sans font-semibold bg-slate-50 dark:bg-fondo1 bg-dot-light dark:bg-dot-dark bg-repeat bg-dot">        
      <Encabezado />

      <main className="flex-1">
        <Hero />
        <Funcionalidades />
        <Flujo />
      </main>

      <Footer />
    </div>
  );
}
