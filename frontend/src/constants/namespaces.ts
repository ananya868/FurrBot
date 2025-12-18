export const NAMESPACES = {
    chinchillas: "Chinchillas",
    hamsters: "Hamsters",
    prairie_dogs: "Prairie Dogs",
    guinea_pigs: "Guinea Pigs",
    birds: "Birds",
    rats: "Rats",
    bees: "Bees",
    horses: "Horses",
    reptiles: "Reptiles",
    chicken_and_ducks: "Chicken & Ducks",
    cats: "Cats",
    dogs: "Dogs",
    pigs: "Pigs",
    fish: "Fish",
    ferrets: "Ferrets",
    gerbils: "Gerbils",
    rabbits: "Rabbits",
    sugar_gliders: "Sugar Gliders",
} as const;

export type NamespaceKey = keyof typeof NAMESPACES;

export const NAMESPACE_OPTIONS = Object.entries(NAMESPACES).map(([key, label]) => ({
    value: key as NamespaceKey,
    label,
}));
