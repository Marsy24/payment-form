import { z } from 'zod';
import { FieldSchema } from '../Field/types';

export const FieldsSchema = z.object({
    front: z.array(FieldSchema),
    back: z.array(FieldSchema)
})

export type TFields = z.infer<typeof FieldsSchema>

export type FCPanels = (Fields: TFields) => HTMLElement[]