interface House {
    id?: number;
    name: string;
    state: string;
    city: string;
    garden: string;
    street: string;
    number: number | null;
    cep: string;
    isPrimary?: boolean;
}