/*
  https://rae-api.com/docs/api-reference/
*/

type WordEntryResponse = {
  ok: boolean,
  data: WordEntry,
}

type WordOnlyResponse = {
  ok: boolean,
  data: {
    word: string,
  },
}

type WordEntry = {
  word: string,
  meanings: Meaning[],
}

type Meaning = {
  origin: Origin,
  senses: Definition[],
  conjugations: Conjugations,
}

type Origin = {
  raw: string,
  type: string,
  voice: string,
  text: string,
}

type Definition = {
  raw: string,
  meaning_number: number,
  category: string,
  verb_category: string,
  gender: string,
  article: Article,
  usage: string,
  description: string,
  synonyms: string[],
  antonyms: string[],
}

type Article = {
  category: string,
  gender: string,
}

type Conjugations = {
  non_personal: ConjugationNonPersonal,
  indicative: ConjugationIndicative,
  subjunctive: ConjugationSubjunctive,
  imperative: ConjugationImperative,
}

type ConjugationNonPersonal = {
  infinitive: string,
  participle: string,
  gerund: string,
  compound_infinitive: string,
  compound_gerund: string,
}

type ConjugationIndicative = {
  present: Conjugation,
  present_perfect: Conjugation,
  imperfect: Conjugation,
  past_perfect: Conjugation,
  preterite: Conjugation,
  past_anterior: Conjugation,
  future: Conjugation,
  future_perfect: Conjugation,
  conditional: Conjugation,
  conditional_perfect: Conjugation,
}

type ConjugationSubjunctive = {
  present: Conjugation,
  present_perfect: Conjugation,
  imperfect: Conjugation,
  past_perfect: Conjugation,
  future: Conjugation,
  future_perfect: Conjugation,
}

type ConjugationImperative = {
  singular_second_person: string,
  singular_formal_second_person: string,
  plural_second_person: string,
  plural_formal_second_person: string,
}

type Conjugation = {
  singular_first_person: string,
  singular_second_person: string,
  singular_formal_second_person: string,
  singular_third_person: string,
  plural_first_person: string,
  plural_second_person: string,
  plural_formal_second_person: string,
  plural_third_person: string,
}

type ErrorResponse = {
  ok: boolean,
  error: string,
  suggestions: string[],
}

type SearchResponse = {
  items: SearchResult[],
}

type SearchResult = {
  doc: SearchDoc,
  hits: number,
}

type SearchDoc = {
  raw: string,
  id: string,
}

type WordsParams = {
  palabra: string;
}

type RandomParams = {
  min_length: number,
  max_length: number,
}

export type { WordEntryResponse, WordOnlyResponse, WordEntry, Meaning, Origin, Definition, Article, Conjugations, ConjugationNonPersonal, ConjugationIndicative, ConjugationSubjunctive, ConjugationImperative, Conjugation, ErrorResponse, SearchResponse, SearchResult, SearchDoc, WordsParams, RandomParams }
