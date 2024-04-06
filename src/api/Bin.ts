import { z } from "zod"
import { validateResponse } from "../utils/validateResponse"

export const BINIssuerScheme = z.object({
    name: z.string(),
    phone: z.string(),
    website: z.string()
})

export const BINCountryScheme = z.object({
    alpha2: z.string(),
    alpha3: z.string(),
    capital: z.string(),
    currency: z.string(),
    currency_symbol: z.string(),
    flag: z.string(),
    idd: z.string(),
    language: z.string(),
    language_code: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    name: z.string(),
    native: z.string(),
    numeric: z.string(),
    region: z.string(),
    subregion: z.string()
})

export const BINScheme = z.object({
    brand: z.string(),
    country: BINCountryScheme,
    currency: z.string(),
    issuer: BINIssuerScheme,
    length: z.number(),
    level: z.string(),
    number: z.number(),
    scheme: z.string(),
    type: z.string(),
    valid: z.boolean()
})

export const BINCheckerResponseScheme = z.object({
    BIN: BINScheme,
    code: z.number(),
    success: z.boolean()
})

export type BINIssuer = z.infer<typeof BINIssuerScheme>
export type BINCountry= z.infer<typeof BINCountryScheme>
export type BIN = z.infer<typeof BINScheme>
export type BINChekerResponse = z.infer<typeof BINCheckerResponseScheme>

export const BINChecker = (bin: string): Promise<BINChekerResponse> => {
    return fetch(`https://bin-ip-checker.p.rapidapi.com/?bin=${bin}`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'a18424be71mshfef69d67a6390e0p15b1c6jsnfdc397e5573b',
            'X-RapidAPI-Host': 'bin-ip-checker.p.rapidapi.com'
        },
        body: JSON.stringify({ bin })
    })
        .then(validateResponse)
        .then(res => res.json())
        .then(data => BINCheckerResponseScheme.parse(data))
}