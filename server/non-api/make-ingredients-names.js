import fs from 'fs'

fs.readFile('../resources/ingredients-verbose.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the input file:', err)
        return
    }

    const ingredients = JSON.parse(data)
    const names = ingredients.map(ingredient => ingredient.name).join('\n')

    fs.writeFile('../resources/ingredients-names.txt', names, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the output file:', err)
            return
        }

        console.log('Names have been written to ../resources/ingredients-names.txt')
    })
})
