export interface User {
  id?: string
  username: string | null
  role: 'admin' | 'creator' | null
  userToken: string | null
  email?: string
  profile?: string
}
