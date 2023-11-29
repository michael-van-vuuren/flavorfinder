import pluralize from 'pluralize'

const irregular = 
    [
        'milk',
        'celery',
        'quinoa',
        'octopus',
        'corn',
        'broccoli',
        'garlic',
        'tea',
        'coffee',
        'chicken',
        'winter squash',
        'acorn squash',
        'butternut squash',
        'chocolate',
        'cumin',
        'celery',
        'wild celery',
        'beer',
    ]

irregular.forEach(x => {
    pluralize.addIrregularRule(x, x)
})

export default function pluralizeIngredient(name, amount) {
    return pluralize(name, amount)
}