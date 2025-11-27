import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAdminContent } from '@/hooks/useAdminContent';

const HeroSection = () => {
  const {
    toast
  } = useToast();
  const { content, isLoading } = useAdminContent();
  const [heroContent, setHeroContent] = useState(content.heroSection);

  // Actualizar el contenido local cuando cambia el contenido global
  useEffect(() => {
    setHeroContent(content.heroSection);
  }, [content]);

  if (isLoading) {
    return <div className="min-h-screen bg-black" />;
  }

  const handleHablemosClick = () => {
    toast({
      title: "🚧 Esta función aún no está implementada",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo mensaje. 🚀"
    });
  };

  return <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0" style={{
      backgroundImage: `url('${
        typeof window !== 'undefined' && window.innerWidth < 768
          ? heroContent.backgroundImageMobile
          : heroContent.backgroundImageDesktop
      }')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
        {/* Dark overlay to ensure text readability if needed, adjusted for the specific image style */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
          
          {/* Left Column - Empty to let the image subject shine */}
          <div className="hidden lg:block"></div>

          {/* Right Column - Content */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          ease: "easeOut"
        }} className="flex flex-col justify-center items-center sm:items-start lg:items-center text-white p-4 sm:p-6 md:p-8 lg:p-16 gap-4 sm:gap-6 md:gap-8">
            {/* Logo Image */}
            <motion.div initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3,
            duration: 0.6
          }} className="w-full flex justify-center sm:justify-start lg:justify-center">
              <img src={heroContent.logoImage} alt="Sergio Bello Logo" className="h-16 sm:h-24 md:h-28 lg:h-32 object-contain" />
            </motion.div>

            {/* Description */}
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5,
            duration: 0.6
          }} className="font-poppins font-thin text-base sm:text-lg md:text-2xl lg:text-[30px] leading-relaxed text-white/90 text-center sm:text-left lg:text-center max-w-xs sm:max-w-md w-full">{heroContent.description}</motion.p>

            {/* Button */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.7,
            duration: 0.4
          }} className="w-full flex justify-center sm:justify-start lg:justify-center">
              <Button onClick={handleHablemosClick} variant="outline" className="font-poppins font-extralight text-xs sm:text-sm md:text-base lg:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest rounded-none">
                {heroContent.buttonText}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};

export default HeroSection;