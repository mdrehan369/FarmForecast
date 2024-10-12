export enum Role {
    ADMIN = 'ADMIN',
    STAFF = 'STAFF',
    OFFICER = 'OFFICER',
}

export interface IJwtPayload {
    id: number
    role: Role
}
