import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(import.meta.dirname, '..')
const bgPath = resolve(root, 'public/og-background.jpg')
const overlayPath = resolve(root, 'public/og-overlay.svg')
const outPath = resolve(root, 'public/og-image.png')

const WIDTH = 1200
const HEIGHT = 630

const background = await sharp(bgPath)
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
  .toBuffer()

const overlay = readFileSync(overlayPath)

await sharp(background)
  .composite([{ input: overlay, top: 0, left: 0 }])
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(outPath)

console.log('Generated public/og-image.png')