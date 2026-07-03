import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(import.meta.dirname, '..')
const svgPath = resolve(root, 'public/og-source.svg')
const outPath = resolve(root, 'public/og-image.png')

const svg = readFileSync(svgPath)
await sharp(svg, { density: 144 })
  .resize(1200, 630)
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(outPath)

console.log('Generated public/og-image.png')