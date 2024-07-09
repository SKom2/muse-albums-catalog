
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUBABASE_URL || 'http://localhost:3000'
const supabaseKey = process.env.SUPABASE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;