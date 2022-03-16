export interface Usuario{
    ID: number,
    Nombre: string,
    Apellidos: string,
    Nick: string,
    Email: string,
    Contraseña: string
}

export interface LoginResponse{
    success: boolean
    user: User
    token: string
}

export interface User {
    name: string
    avatar: string
    level: number
    points: number
    achievements: any[]
    _id: string
    type: string
    user: string
    email: string
}