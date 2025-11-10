import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join, resolve } from 'path'
import { getPool } from '../utils/db'

const envPath = resolve(__dirname, '../../../.env')
console.log('Loading .env from:', envPath)
const result = dotenv.config({ path: envPath })
if (result.error) {
  console.error('Error loading .env:', result.error)
} else {
  console.log('✅ .env loaded successfully')
  console.log('POSTGRES_USER:', process.env.POSTGRES_USER ? 'set' : 'not set')
  console.log('POSTGRES_DB:', process.env.POSTGRES_DB ? 'set' : 'not set')
}

const runMigration = async () => {
  try {
    const pool = getPool()
    const migrationSQL = readFileSync(
      join(__dirname, '..', 'migrations', '001_create_reactions_table.sql'),
      'utf-8'
    )

    await pool.query(migrationSQL)
    console.log('✅ Migration completed successfully')
    await pool.end()
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
