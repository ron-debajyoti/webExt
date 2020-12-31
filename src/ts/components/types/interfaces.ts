export interface Token {
    authStatus: boolean
    clientID: string | null
    accessToken: string | null
    expirationTime: number
    tokenTimestamp: number
}

export interface Devices {
    name: string | null
    id: string
}

export interface Endpoints {
    redirectUri: string
    responseType: string
    scope: string
}

export class Storage {
    static set(key: string, value: Token): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static get(key: string): Token {
        let result
        const value = localStorage.getItem(key) ?? undefined
        try {
            if (value === undefined) {
                result = {} as Token
            } else {
                result = JSON.parse(value)
            }
        } catch {
            result = {} as Token
        }
        return result
    }
}
