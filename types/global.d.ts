import { ButtonProps } from "@kickstartds/base/lib/button/typing";
import { SectionProps } from "@kickstartds/base/lib/section/typing";
import { BlogPost } from "@kickstartds/ds-agency-premium/blog-post";
import { ComponentType } from "react";
import { SectionStoryblok } from "./components-schema";

// Flatten entity
type FlattenObject<TValue> = CollapseEntries<
  CreateObjectEntries<TValue, TValue>
>;

type Entry = { key: string; value: unknown };
type EmptyEntry<TValue> = { key: ""; value: TValue };
type ExcludedTypes = Date | Set<unknown> | Map<unknown, unknown>;
type ArrayEncoder = `[${bigint}]`;

type EscapeArrayKey<TKey extends string> =
  TKey extends `${infer TKeyBefore}.${ArrayEncoder}${infer TKeyAfter}`
    ? EscapeArrayKey<`${TKeyBefore}${ArrayEncoder}${TKeyAfter}`>
    : TKey;

// Transforms entries to one flattened type
type CollapseEntries<TEntry extends Entry> = {
  [E in TEntry as EscapeArrayKey<E["key"]>]: E["value"];
};

// Transforms array type to object
type CreateArrayEntry<TValue, TValueInitial> = OmitItself<
  TValue extends unknown[] ? { [k: ArrayEncoder]: TValue[number] } : TValue,
  TValueInitial
>;

// Omit the type that references itself
type OmitItself<TValue, TValueInitial> = TValue extends TValueInitial
  ? EmptyEntry<TValue>
  : OmitExcludedTypes<TValue, TValueInitial>;

// Omit the type that is listed in ExcludedTypes union
type OmitExcludedTypes<TValue, TValueInitial> = TValue extends ExcludedTypes
  ? EmptyEntry<TValue>
  : CreateObjectEntries<TValue, TValueInitial>;

type CreateObjectEntries<TValue, TValueInitial> = TValue extends object
  ? {
      // Checks that Key is of type string
      [TKey in keyof TValue]-?: TKey extends string
        ? // Nested key can be an object, run recursively to the bottom
          CreateArrayEntry<
            TValue[TKey],
            TValueInitial
          > extends infer TNestedValue
          ? TNestedValue extends Entry
            ? TNestedValue["key"] extends ""
              ? {
                  key: TKey;
                  value: TNestedValue["value"];
                }
              :
                  | {
                      key: `${TKey}.${TNestedValue["key"]}`;
                      value: TNestedValue["value"];
                    }
                  | {
                      key: TKey;
                      value: TValue[TKey];
                    }
            : never
          : never
        : never;
    }[keyof TValue] // Builds entry for each key
  : EmptyEntry<TValue>;

type Test = {
  map: Map<string, string>;
  str: string;
  array: { timestamp: Date }[];
  nested: { optionalStr?: string; unknown: unknown };
  set: Set<string>;
  record: Record<string, number>;
};

type FlattenedTest = FlattenObject<SectionProps>;
// ^?

type Foo = {
  tmdb:
    | number
    | {
        title: {
          original: string;
          german?: string;
        };
        productionCompanies?: {
          id?: number;
          logoPath?: string;
        }[];
        releaseDate?: string;
      };
  rating: { ch: number; rt: number } | { total: number };
  dateSeen: Date;
  mm: boolean;
};

type FlattenedFoo = FlattenObject<BlogPostProp>;

type Flat = {
  foo: number;
  bar_nested1: string;
  bar_nested2: number[];
  bar_nested3_dn: number[];
  bar_nested3_dn2: string[];
};

type Unflatten<T> = {} & {
  [Property in keyof T as Exclude<
    Property,
    `${string}_${string}`
  >]: T[Property];
} & {
  [Property in keyof T as ParentOf<Property>]: Id<
    Unflatten<{
      [ChildProperty in ChildOf<Property>]: T[`${ParentOf<Property>}_${ChildProperty}` &
        keyof T];
    }>
  >;
};

type ParentOf<T> = T extends `${infer Parent}_${string}` ? Parent : never;
type ChildOf<T> = T extends `${string}_${infer Child}` ? Child : never;

type Id<T> = {} & {
  [P in keyof T]: T[P];
};

type Y = Unflatten<SectionStoryblok>;

type _ks = {
  radio: {
    on: (topic: string, cb: (topic: string, payload: any) => void) => string;
    once: (topic: string, cb: (topic: string, payload: any) => void) => void;
    off: (token: string) => void;
    emit: (topic: string, payload: any) => boolean;
  };
};

export declare global {
  interface Window {
    _ks: _ks;
  }
}
