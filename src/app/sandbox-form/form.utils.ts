import { FormControl, FormGroup } from '@angular/forms';
import { z } from 'zod';

type Primitive = string | number | symbol | boolean;

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

type MappedC<A, B> = {
  [K in keyof A & keyof B]: A[K] extends B[K] ? never : K;
};

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
export type RequiredKeys<T> = Exclude<
  KeysOfType<T, Exclude<T[keyof T], undefined>>,
  undefined
>;
export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

type OptionalMapped<T extends Record<any, any>> = {
  [K in RequiredKeys<T>]: 'Required';
} & {
  [K in OptionalKeys<T>]?: 'Optional';
};

type StrictMappedControl<T> = T extends Primitive ? FormControl<T> 
  : T extends Date ? FormControl<Date>
  : T extends any[] ? FormControl<T>
  : T extends Record<any, any> ? FormGroup<
      {
        [K in RequiredKeys<T>]: StrictMappedControl<T[K]>;
      } & {
        [K in OptionalKeys<T>]?: StrictMappedControl<T[K]>;
      }
    >
  : FormControl<T>;


type ZodPrimitive = z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodDate | z.ZodSymbol;


type ZodMappedControl<T extends z.Schema> = 
T extends ZodPrimitive ? FormControl<z.infer<T>>
  : T extends z.ZodArray<infer TItem> ? FormControl<z.infer<T>>
  : T extends z.ZodObject<infer TShape> ? FormGroup<{
    [K in keyof TShape]: ZodMappedControl<T['shape'][K]>;
  }>
  : FormControl<z.infer<T>>;



export function buildForm<T extends z.Schema>(schema: T): ZodMappedControl<T> {
  return null as unknown as any;
}

//! TESTS
const s = z.object({
  name: z.string().nullable(),
  age: z.number(),
  dateRange: z.array(z.date()).min(2).max(2),
  createAt: z.date()
});

type User = z.infer<typeof s>;
//    ^?

const f = buildForm(s);
//    ^?

