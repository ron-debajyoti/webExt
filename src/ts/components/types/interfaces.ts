export interface Token {
    clientID: string | null
    accessToken: string | null
    expirationTime: number
}

export interface Devices {
    name: string | null
    id: string
}

export interface Endpoints {
    redirectUri: string
    responseType: string
    scope: string
    accessToken: string | null
}

export class Storage {
    static set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static get(key: string) {
        let result
        const value = localStorage.getItem(key) ?? undefined
        try {
            if (value === undefined) {
                result = undefined
            } else {
                result = JSON.parse(value)
            }
        } catch {
            result = undefined
        }
        return result
    }
}
