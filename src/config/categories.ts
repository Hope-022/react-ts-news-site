export interface Category {
    slug: string;
    label: string;
    seasonal?: boolean;
}

export const CATEGORIES: Category[] = [
    {slug:"news" , label: "News" },
    {slug: "featured" , label: "Featured" },
    {slug: "metro-plus", label: "Metro Plus"},
    {slug: "sports", label: "Sports"},
    {slug: "healthwise", label: "Healthwise"},
    {slug: "editorial" , label: "Editorial" },
    {slug: "columns", label: "Columns" },
    {slug: "business", label: "Business" },
    {slug: "bbnaija", label: "BBNaija", seasonal: true },
    {slug: "entertainment", label: "Entertainment" },
    {slug: "continuation-from-print", label: "Continuation From Print" },
];

export const RADIO_LINK = {slug: "radio", label: "Radio"}; 
