import { supabase } from '@/config/supabaseConfig';

const BUCKET_NAME = 'admin-uploads';

export const initializeStorage = async () => {
  try {
    console.log('🔄 Inicializando almacenamiento de Supabase...');

    // Verificar si el bucket existe
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);

    if (!bucketExists) {
      console.log('📦 Creando bucket:', BUCKET_NAME);
      const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true
      });

      if (error) {
        console.error('❌ Error al crear bucket:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Bucket creado:', data);
      return { success: true, message: 'Bucket creado' };
    } else {
      console.log('✅ Bucket ya existe:', BUCKET_NAME);
      return { success: true, message: 'Bucket ya existe' };
    }
  } catch (error) {
    console.error('❌ Error en inicialización:', error);
    return { success: false, error: error.message };
  }
};
