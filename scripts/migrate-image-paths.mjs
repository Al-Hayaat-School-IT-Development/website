/**
 * One-off: rewrite /images/... references after public/images reorganization.
 * Run: node scripts/migrate-image-paths.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const replacements = [
  // Longest / most specific first
  ['/images/MUN03197-3241-p-1080.png', '/images/home/MUN03197-3241-p-1080.png'],
  ['/images/MUN03197-3241-p-800.png', '/images/home/MUN03197-3241-p-800.png'],
  ['/images/MUN03197-3241-p-500.png', '/images/home/MUN03197-3241-p-500.png'],
  ['/images/MUN03197-3241.png', '/images/home/MUN03197-3241.png'],
  ['/images/MUN03216-1-p-800.png', '/images/home/classroom-whiteboard-student-p-800.png'],
  ['/images/MUN03216-1-p-500.png', '/images/home/classroom-whiteboard-student-p-500.png'],
  ['/images/MUN03216-1.png', '/images/home/classroom-whiteboard-student.png'],
  ['/images/home/MUN03216-1-p-800.png', '/images/home/classroom-whiteboard-student-p-800.png'],
  ['/images/home/MUN03216-1-p-500.png', '/images/home/classroom-whiteboard-student-p-500.png'],
  ['/images/home/MUN03216-1.png', '/images/home/classroom-whiteboard-student.png'],
  ['/images/glitter-bg-p-1600.png', '/images/shared/backgrounds/glitter-bg-p-1600.png'],
  ['/images/glitter-bg-p-1080.png', '/images/shared/backgrounds/glitter-bg-p-1080.png'],
  ['/images/glitter-bg-p-2000.png', '/images/shared/backgrounds/glitter-bg-p-2000.png'],
  ['/images/glitter-bg-p-2600.png', '/images/shared/backgrounds/glitter-bg-p-2600.png'],
  ['/images/glitter-bg-p-800.png', '/images/shared/backgrounds/glitter-bg-p-800.png'],
  ['/images/glitter-bg-p-500.png', '/images/shared/backgrounds/glitter-bg-p-500.png'],
  ['/images/dashlines-p-2600.png', '/images/shared/backgrounds/dashlines-p-2600.png'],
  ['/images/dashlines-p-2000.png', '/images/shared/backgrounds/dashlines-p-2000.png'],
  ['/images/dashlines-p-1600.png', '/images/shared/backgrounds/dashlines-p-1600.png'],
  ['/images/dashlines-p-1080.png', '/images/shared/backgrounds/dashlines-p-1080.png'],
  ['/images/dashlines-p-800.png', '/images/shared/backgrounds/dashlines-p-800.png'],
  ['/images/dashlines-p-500.png', '/images/shared/backgrounds/dashlines-p-500.png'],
  ['/images/cta-bg-p-2600.png', '/images/shared/backgrounds/cta-bg-p-2600.png'],
  ['/images/cta-bg-p-2000.png', '/images/shared/backgrounds/cta-bg-p-2000.png'],
  ['/images/cta-bg-p-1600.png', '/images/shared/backgrounds/cta-bg-p-1600.png'],
  ['/images/cta-bg-p-1080.png', '/images/shared/backgrounds/cta-bg-p-1080.png'],
  ['/images/cta-bg-p-800.png', '/images/shared/backgrounds/cta-bg-p-800.png'],
  ['/images/cta-bg-p-500.png', '/images/shared/backgrounds/cta-bg-p-500.png'],
  ['/images/Frame-1362791640.webp', '/images/overlays/Frame-1362791640.webp'],
  ['/images/Frame-1362791621.webp', '/images/overlays/Frame-1362791621.webp'],
  ['/images/Frame-1362791622.webp', '/images/overlays/Frame-1362791622.webp'],
  ['/images/circle-light-orange.webp', '/images/shared/decor/circle-light-orange.webp'],
  ['/images/circle-light-green.webp', '/images/shared/decor/circle-light-green.webp'],
  ['/images/decor-about-1.webp', '/images/shared/decor/decor-about-1.webp'],
  ['/images/decor-about-2.webp', '/images/shared/decor/decor-about-2.webp'],
  ['/images/glitter-bg.webp', '/images/shared/backgrounds/glitter-bg.webp'],
  ['/images/dashlines.webp', '/images/shared/backgrounds/dashlines.webp'],
  ['/images/Polygon-46.svg', '/images/shared/ui/Polygon-46.svg'],
  ['/images/list-check.svg', '/images/shared/ui/list-check.svg'],
  ['/images/islam-written.webp', '/images/home/islam-written.webp'],
  ['/images/support-mission.webp', '/images/home/support-mission.webp'],
  ['/images/Logo-332x92-2.svg', '/images/home/Logo-332x92-2.svg'],
  ['/images/cropped-Selm-21-95x57-1.webp', '/images/home/cropped-Selm-21-95x57-1.webp'],
  ['/images/Group-7-2-1.webp', '/images/home/Group-7-2-1.webp'],
  ['/images/Framedots.webp', '/images/shared/decor/Framedots.webp'],
  ['/images/cta-bg.webp', '/images/shared/backgrounds/cta-bg.webp'],
  ['/images/master-card.webp', '/images/payments/master-card.webp'],
  ['/images/apple-pay.webp', '/images/payments/apple-pay.webp'],
  ['/images/banner-p-800.png', '/images/admissions/banner-p-800.png'],
  ['/images/banner-p-500.png', '/images/admissions/banner-p-500.png'],
  ['/images/banner.png', '/images/admissions/banner.png'],
  ['/images/vector-1.webp', '/images/home/why/vector-1.webp'],
  ['/images/vector-2.webp', '/images/home/why/vector-2.webp'],
  ['/images/vector-3.webp', '/images/home/why/vector-3.webp'],
  ['/images/vector-4.webp', '/images/home/why/vector-4.webp'],
  ['/images/MUN03200-1-p-800.png', '/images/photos/MUN03200-1-p-800.png'],
  ['/images/MUN03200-1-p-500.png', '/images/photos/MUN03200-1-p-500.png'],
  ['/images/MUN03349-1-p-800.png', '/images/photos/MUN03349-1-p-800.png'],
  ['/images/MUN03349-1-p-500.png', '/images/photos/MUN03349-1-p-500.png'],
  ['/images/MUN03448-1-p-800.png', '/images/photos/MUN03448-1-p-800.png'],
  ['/images/MUN03448-1-p-500.png', '/images/photos/MUN03448-1-p-500.png'],
  ['/images/MUN03541-1-p-800.png', '/images/photos/MUN03541-1-p-800.png'],
  ['/images/MUN03541-1-p-500.png', '/images/photos/MUN03541-1-p-500.png'],
  ['/images/MUN03667-p-800.png', '/images/photos/MUN03667-p-800.png'],
  ['/images/MUN03667-p-500.png', '/images/photos/MUN03667-p-500.png'],
  ['/images/MUN03627-p-800.png', '/images/photos/MUN03627-p-800.png'],
  ['/images/MUN03627-p-500.png', '/images/photos/MUN03627-p-500.png'],
  ['/images/MUN03267-1-p-800.png', '/images/photos/MUN03267-1-p-800.png'],
  ['/images/MUN03267-1-p-500.png', '/images/photos/MUN03267-1-p-500.png'],
  ['/images/MUN03284-1-p-800.png', '/images/photos/curriculum/carousel/04-p-800.png'],
  ['/images/MUN03284-1-p-500.png', '/images/photos/curriculum/carousel/04-p-500.png'],
  ['/images/photos/MUN03284-1-p-800.png', '/images/photos/curriculum/carousel/04-p-800.png'],
  ['/images/photos/MUN03284-1-p-500.png', '/images/photos/curriculum/carousel/04-p-500.png'],
  ['/images/MUN03242-1-p-800.png', '/images/photos/MUN03242-1-p-800.png'],
  ['/images/MUN03242-1-p-500.png', '/images/photos/MUN03242-1-p-500.png'],
  ['/images/MUN03244-132-p-500.png', '/images/photos/MUN03244-132-p-500.png'],
  ['/images/MUN03249-p-800.png', '/images/photos/MUN03249-p-800.png'],
  ['/images/MUN03249-p-500.png', '/images/photos/MUN03249-p-500.png'],
  ['/images/MUN03197-21-p-800.png', '/images/photos/MUN03197-21-p-800.png'],
  ['/images/MUN03197-21-p-500.png', '/images/photos/MUN03197-21-p-500.png'],
  ['/images/MUN03651-143-p-800.png', '/images/photos/MUN03651-143-p-800.png'],
  ['/images/MUN03651-143-p-500.png', '/images/photos/MUN03651-143-p-500.png'],
  ['/images/MUN03200-1.png', '/images/photos/MUN03200-1.png'],
  ['/images/MUN03349-1.png', '/images/photos/MUN03349-1.png'],
  ['/images/MUN03448-1.png', '/images/photos/MUN03448-1.png'],
  ['/images/MUN03541-1.png', '/images/photos/MUN03541-1.png'],
  ['/images/MUN03667.png', '/images/photos/MUN03667.png'],
  ['/images/MUN03627.png', '/images/photos/MUN03627.png'],
  ['/images/MUN03267-1.png', '/images/photos/MUN03267-1.png'],
  ['/images/MUN03284-1.png', '/images/photos/curriculum/carousel/04.png'],
  ['/images/photos/MUN03284-1.png', '/images/photos/curriculum/carousel/04.png'],
  ['/images/MUN03242-1.png', '/images/photos/MUN03242-1.png'],
  ['/images/MUN03244-132.png', '/images/photos/MUN03244-132.png'],
  ['/images/MUN03249.png', '/images/photos/MUN03249.png'],
  ['/images/MUN03197-21.png', '/images/photos/MUN03197-21.png'],
  ['/images/MUN03651-321.png', '/images/photos/MUN03651-321.png'],
  ['/images/MTZTGvDsHFY_1.webp', '/images/photos/MTZTGvDsHFY_1.webp'],
  ['/images/MuslimWomanHijabIcon.png', '/images/photos/MuslimWomanHijabIcon.png'],
  ['/images/Board-Picture-1_1.webp', '/images/photos/Board-Picture-1_1.webp'],
  ['/images/dotted.png', '/images/shared/decor/dotted.png'],
  ['/images/bullet.png', '/images/shared/ui/bullet.png'],
  ['/images/file.png', '/images/shared/ui/file.png'],
  ['/images/pdf.png', '/images/shared/ui/pdf.png'],
  ['/images/visa.webp', '/images/payments/visa.webp'],
  ['/images/paypal.webp', '/images/payments/paypal.webp'],
  ['/images/g-pay.webp', '/images/payments/g-pay.webp'],
  ['/images/shop.webp', '/images/payments/shop.webp'],
  ['/images/am-ex.webp', '/images/payments/am-ex.webp'],
  ['/images/klarna.webp', '/images/payments/klarna.webp'],
  ['/images/code.webp', '/images/payments/code.webp'],
];

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.next') continue;
      walk(p, acc);
    } else if (/\.(tsx|ts|json|css)$/.test(name)) {
      acc.push(p);
    }
  }
  return acc;
}

const srcDir = path.join(root, 'src');
const files = walk(srcDir);
let total = 0;
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  const orig = text;
  for (const [from, to] of replacements) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
    }
  }
  if (text !== orig) {
    fs.writeFileSync(file, text);
    total++;
    console.log('updated', path.relative(root, file));
  }
}
console.log('files touched:', total);
