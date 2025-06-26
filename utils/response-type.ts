export type ExtractData<T> = T extends { success: true; data: infer D } ? D : never;

