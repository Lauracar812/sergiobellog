import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await auth.login(email, password);
      
      if (result.success) {
        toast({
          title: '✅ Login exitoso',
          description: `Bienvenido ${result.user?.email || 'administrador'}`
        });
        navigate('/admin/dashboard');
      } else {
        const errorMsg = result.error || 'Error al iniciar sesión';
        setErrorMessage(errorMsg);
        toast({
          title: '❌ Error',
          description: errorMsg
        });
        console.error('Login error:', errorMsg);
      }
    } catch (error) {
      const errorMsg = error.message || 'Error desconocido';
      setErrorMessage(errorMsg);
      toast({
        title: '❌ Error',
        description: errorMsg
      });
      console.error('Login exception:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/fba21a42a3efa38403e12e1c11d1b229.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 shadow-xl">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex justify-center mb-6"
            >
              <img
                src="https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/abded8c8564e182b7e4a4cba61d52acb.png"
                alt="Logo"
                className="h-16 object-contain"
              />
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-3xl font-bold text-white text-center mb-2"
            >
              Administrador
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-white/70 text-center mb-6 text-sm"
            >
              Inicia sesión para administrar la landing
            </motion.p>

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500 rounded-md p-3 mb-4"
              >
                <p className="text-red-200 text-sm">{errorMessage}</p>
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Email */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sergiobellog.com"
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#ECBE8F] to-[#BE9556] text-black font-bold py-3 rounded-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
              </Button>
            </motion.form>

            {/* Helper text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-white/50 text-xs text-center mt-6"
            >
              Usa tu correo de Supabase
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminLogin;
