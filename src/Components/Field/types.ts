import { z } from 'zod'; 

export const FieldSchema = z.object({
    name: z.string(),
    autocomplete: z.string(),
    inputMode: z.string(),
    pattern: z.string(),
    type: z.string(),
    placeholder: z.string(),
    className: z.string(),
    id: z.string(),
    required: z.string(),
    maxLength: z.number()
});

export type TField = z.infer<typeof FieldSchema>

export type FCField = (data: TField, onblur: (e: Event) => void, onfocus: (e: Event) => void, oninput: (e: Event) => void) => HTMLElement