import { z } from "zod";

const envSchema = z.object({
	VITE_BASE_URL: z.string().url().min(3, "Precisa informar uma url válida!!")
});

export const env = envSchema.parse(import.meta.env);