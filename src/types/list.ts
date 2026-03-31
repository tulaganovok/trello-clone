import type { Card, List } from '#/generated/prisma/client'

export interface ListWithCards extends List {
  cards: Card[]
}
