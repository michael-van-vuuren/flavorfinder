import pluralize from 'pluralize'

const irregular = 
    [
        'milk',
        'celery',
        'quinoa',
        'octopus',
        'corn',
    ]

irregular.forEach(x => {
    pluralize.addIrregularRule(x, x)
})

export default function pluralizeIngredient(name, amount) {
    return pluralize(name, amount)
}