import { Pool } from 'pg'
import dotenv from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(__dirname, '../../../.env')
dotenv.config({ path: envPath })

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  DATABASE_URL,
} = process.env

let pool: Pool | null = null

export const getPool = (): Pool => {
  if (!pool) {
    if (DATABASE_URL) {
      pool = new Pool({
        connectionString: DATABASE_URL,
      })
    } else {
      if (
        !POSTGRES_USER ||
        !POSTGRES_PASSWORD ||
        !POSTGRES_DB ||
        !POSTGRES_PORT
      ) {
        throw new Error(
          'Database configuration missing. Please set DATABASE_URL or POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT environment variables'
        )
      }

      pool = new Pool({
        user: POSTGRES_USER,
        host: 'localhost',
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
        port: Number(POSTGRES_PORT),
      })
    }
  }
  return pool
}

export const query = async (text: string, params?: any[]) => {
  const pool = getPool()
  return pool.query(text, params)
}

export const closePool = async () => {
  if (pool) {
    await pool.end()
    pool = null
  }
}
