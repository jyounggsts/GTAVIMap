import { cpSync, rmSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const docs = resolve(root, 'docs')

if (!existsSync(dist)) {
  console.error('Run vite build first (dist/ missing).')
  process.exit(1)
}

rmSync(docs, { recursive: true, force: true })
cpSync(dist, docs, { recursive: true })
console.log('Synced dist/ -> docs/')