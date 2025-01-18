export interface Deck {

    id: string,
    name: string,
    owner_id: string,
    last_updated: number,
}

export interface Card {
    id: string,
    deck_id: string,
    deck_pos: number,
    question: string,
    answer: string,
    last_updated: number,
}