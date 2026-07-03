import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(import.meta.dirname, '..')
const bgPath = resolve(root, 'public/og-background.png')
const overlayPath = resolve(root, 'public/og-overlay.svg')

// 2:1 ratio — X/Twitter summary_large_image preferred size
const WIDTH = 1200
const HEIGHT = 600

const background = await sharp(bgPath)
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
  .toBuffer()

const overlay = readFileSync(overlayPath)
const overlayResized = await sharp(overlay)
  .resize(WIDTH, HEIGHT)
  .png()
  .toBuffer()

const card = await sharp(background)
  .composite([{ input: overlayResized, top: 0, left: 0 }])
  .jpeg({ quality: 92, mozjpeg: true })
  .toBuffer()

const cardPath = resolve(root, 'public/social-card.jpg')
const pngPath = resolve(root, 'public/social-preview.png')

await sharp(card).toFile(cardPath)
await sharp(card).png({ compressionLevel: 9 }).toFile(pngPath)

console.log('Generated public/social-card.jpg (X/OG) and public/social-preview.png')