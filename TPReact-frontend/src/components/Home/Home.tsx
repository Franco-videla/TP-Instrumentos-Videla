import { useState } from 'react';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ["images/imagen1.jpg", "images/imagen2.jpg", "images/imagen3.jpg"]; // nombres de las imágenes

  const nextSlide = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  return (
    <div className="slider-container">
     <h2 style={{
         
          backgroundColor: "#c0bebe", // Fondo gris claro
          padding: "15px", // Espaciado interno
          borderRadius: "10px", // Bordes redondeados
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.5)", // Sombra sutil
          margin: "15px 0" // Margen superior e inferior
        }} className="title">Bienvenidos!</h2>
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              left: `${index * 100}%`,
              opacity: index === currentSlide ? 1 : 0, 
            }}
          >
            <img src={image} alt={`Instrumento ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>{''}</button>
      <button className="next" onClick={nextSlide}>{''}</button>
      <div className="descripcion-container" style={{ 
  backgroundColor: '#f0f0f0', 
  border: '2px solid #32a852', 
  borderRadius: '10px', 
  padding: '20px', 
  margin: '20px 0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Arial, sans-serif'
}}>
  <p className="descripcion">Bienvenido Music House, somos tu destino ideal para encontrar los más finos instrumentos musicales, equipos de sonido de última generación y accesorios. Nos dedicamos a brindarte una experiencia musical insuperable, con una extensa selección de productos de alta calidad y un servicio al cliente excepcional. ¡Sumérgete en nuestro catálogo y descubre tu pasión por la música con nosotros!</p>
</div>
    </div>
  );
};

export default Home;
