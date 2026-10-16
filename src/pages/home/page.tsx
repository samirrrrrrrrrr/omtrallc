import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Nosotros from "./components/Nosotros";
import Productos from "./components/Productos";
import Galeria from "./components/Galeria";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import FloatingSocial from "./components/FloatingSocial";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <Nosotros />
      <Productos />
      <Galeria />
      <Contacto />
      <Footer />
      <FloatingSocial />
    </div>
  );
}
