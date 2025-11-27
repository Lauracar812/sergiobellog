import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminContent } from '@/hooks/useAdminContent';

export default function AboutSection() {
  const { content } = useAdminContent();
  const [aboutData, setAboutData] = useState(content?.aboutSection || {
    title: 'Sobre mí',
    biography: `Autor bestseller del New York Times e internacional. Autor mexicano de ficción y no ficción | Defensor de la inclusión de personas con discapacidad | Líder de opinión en desarrollo personal.

Sergio Andrés Bello Guerra es un destacado autor, académico y defensor de la inclusión en México, reconocido por una voz poderosa que combina experiencia personal y solidez profesional. Originario de Oaxaca, es padre de dos hijos con discapacidad, una realidad que ha marcado profundamente su visión del mundo y ha inspirado gran parte de su obra literaria, tanto de ficción como de no ficción.

Sus escritos exploran temas como la resiliencia, el empoderamiento y el potencial humano. Con una formación académica multidisciplinaria —Licenciatura en Ingeniería de Sistemas Informáticos, Doctorado en Ciencias Políticas y Maestría en Escritura Creativa— Sergio aporta a sus libros una mezcla única de rigor intelectual, sensibilidad humana y claridad emocional.

Su experiencia en el servicio público, donde ha trabajado en iniciativas relacionadas con comunidades indígenas, transparencia gubernamental y desarrollo económico, complementa su misión como escritor: empoderar a las personas para superar la adversidad, reconocer su fortaleza interior y expandir sus capacidades más allá de los límites autoimpuestos.

Los libros, artículos y ensayos de Sergio no solo inspiran: funcionan como una guía práctica para quienes buscan crecimiento personal, inclusión social y un propósito renovado. Tanto si lees sus reflexiones profundas sobre desarrollo humano como sus historias de ficción con sensibilidad social, su voz transmite autenticidad, esperanza y compromiso real con la transformación.`,
    authorImage: null,
  });

  // Actualizar los datos cuando cambia el contenido
  useEffect(() => {
    if (content?.aboutSection) {
      setAboutData(content.aboutSection);
    }
  }, [content]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 border-b-0" style={{ backgroundColor: '#EAEAEA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título centrado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 style={{ fontSize: '30px' }} className="font-bold text-gray-800 mb-4">
            {aboutData.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Contenido en dos columnas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch"
        >
          {/* Columna izquierda: Biografía */}
          <motion.div 
            variants={itemVariants} 
            className="space-y-6"
            style={{ 
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              textAlign: 'left',
            }}
          >
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData.biography }}
            />
          </motion.div>

          {/* Columna derecha: Imagen del autor */}
          <motion.div variants={itemVariants} className="flex justify-center items-center">
            {aboutData.authorImage ? (
              <div 
                style={{ 
                  width: '400px', 
                  height: '600px',
                  boxShadow: '12px 12px 0px rgba(128, 128, 128, 0.3)'
                }} 
                className="rounded-lg overflow-hidden"
              >
                <img
                  src={aboutData.authorImage}
                  alt="Sergio Bello"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div 
                style={{ 
                  width: '400px', 
                  height: '600px',
                  boxShadow: '12px 12px 0px rgba(128, 128, 128, 0.3)'
                }} 
                className="bg-gray-300 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400"
              >
                <div className="text-center">
                  <p className="text-4xl mb-2">📷</p>
                  <p className="text-gray-600 text-sm">Imagen del autor</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
