import { NamespaceKey } from './namespaces';

export const NAMESPACE_QUESTIONS: Record<NamespaceKey, string[]> = {
    dogs: [
        "What are the best dog breeds for families?",
        "How do I potty train a puppy?",
        "What human foods are toxic to dogs?",
        "How much exercise does my dog need?"
    ],
    cats: [
        "Why does my cat knead blankets?",
        "How do I introduce a new cat to my home?",
        "What are the signs of a happy cat?",
        "How often should I take my cat to the vet?"
    ],
    fish: [
        "How do I cycle a new aquarium?",
        "What fish can live together in a community tank?",
        "How often should I change the water?",
        "What are the signs of common fish diseases?"
    ],
    birds: [
        "How do I teach my bird to talk?",
        "What is a healthy diet for a parakeet?",
        "How big should my bird's cage be?",
        "Why is my bird pulling out its feathers?"
    ],
    hamsters: [
        "Can hamsters live together?",
        "What fresh foods can hamsters eat?",
        "Why is my hamster biting the cage bars?",
        "How often should I clean the hamster cage?"
    ],
    rabbits: [
        "How do I litter train a rabbit?",
        "What vegetables are safe for rabbits?",
        "Do rabbits need a companion?",
        "Why is my rabbit thumping its foot?"
    ],
    guinea_pigs: [
        "What is the importance of Vitamin C for guinea pigs?",
        "Do guinea pigs need a friend?",
        "What kind of bedding is best for guinea pigs?",
        "How do I pick up a guinea pig correctly?"
    ],
    ferrets: [
        "Do ferrets need to be vaccinated?",
        "How do I ferret-proof my home?",
        "What should I feed my ferret?",
        "Do ferrets sleep a lot?"
    ],
    reptiles: [
        "What UV light does my bearded dragon need?",
        "How do I maintain humidity in a terrarium?",
        "What do geckos eat?",
        "How can I tell if my snake is shedding?"
    ],
    chinchillas: [
        "Why do chinchillas need dust baths?",
        "What is the ideal temperature for a chinchilla?",
        "Can chinchillas eat fresh fruit?",
        "How do I bond with my chinchilla?"
    ],
    rats: [
        "How social are pet rats?",
        "What toys are best for rats?",
        "How long do pet rats usually live?",
        "Can I train my rat to do tricks?"
    ],

    gerbils: [
        "Can gerbils live alone?",
        "Do gerbils need a sand bath?",
        "What is the best cage for a gerbil?",
        "How do I tame a gerbil?"
    ],
    sugar_gliders: [
        "What is a proper diet for sugar gliders?",
        "Do sugar gliders need a pouch?",
        "How do I bond with my sugar glider?",
        "Are sugar gliders nocturnal?"
    ],
    prairie_dogs: [
        "What do prairie dogs eat in captivity?",
        "Do prairie dogs hibernate?",
        "How much space does a prairie dog need?",
        "Are prairie dogs affectionate pets?"
    ],
    bees: [
        "How do I start beekeeping?",
        "What flowers are best for bees?",
        "How do I protect my hive from pests?",
        "What equipment do I need for a beehive?"
    ],
    horses: [
        "How often should a horse's hooves be trimmed?",
        "What are the signs of colic in horses?",
        "How much hay does a horse need daily?",
        "How do I groom a horse properly?"
    ],
    chicken_and_ducks: [
        "How many nesting boxes do I need for my chickens?",
        "Can chickens and ducks live together?",
        "What should I feed laying hens?",
        "Do ducks need a pond?"
    ],
    pigs: [
        "Can pigs be house trained?",
        "What do potbellied pigs eat?",
        "Do pigs shed their skin?",
        "How do I keep my pig entertained?"
    ]
};

// Remove the placeholder 'mice' key and fix the object structure before saving
delete (NAMESPACE_QUESTIONS as any).mice;
