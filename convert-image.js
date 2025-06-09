import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertToWebP() {
  try {
    const inputPath = path.join(__dirname, 'public', 'images', 'alexprofile.png');
    const outputPath = path.join(__dirname, 'public', 'images', 'alexprofile.webp');
    
    // Verificar que el archivo de entrada existe
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Archivo no encontrado: ${inputPath}`);
    }
    
    console.log('📂 Procesando imagen...');
    console.log(`📁 Input: ${inputPath}`);
    
    const result = await sharp(inputPath)
      .resize(400, 400, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);
    
    console.log('✅ Imagen convertida exitosamente:');
    console.log(`📁 Output: ${outputPath}`);
    console.log(`🎯 Tamaño: ${result.width}x${result.height}px`);
    console.log(`📊 Tamaño archivo: ${Math.round(result.size / 1024)}KB`);
    
  } catch (error) {
    console.error('❌ Error al convertir la imagen:', error.message);
    console.error('Stack:', error.stack);
  }
}

convertToWebP();
