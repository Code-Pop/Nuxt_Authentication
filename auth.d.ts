declare module '#auth-utils' {
  interface User {
    username: string
  }

  interface UserSession {
    user: User
    userId: string
    token: string
  }
}

export {}
