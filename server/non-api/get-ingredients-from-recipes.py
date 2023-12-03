import json
import inflect
 
f1 = open('./../resources/recipe-to-ingredients.json')
f2 = open('./../resources/ingredients-with-images.json')
 
recipes_wikipedia = json.load(f1)
ingredients = json.load(f2)

def pluralize_word(word):
    return inflect.engine().plural(word)

def singularize_word(word):
  return inflect.engine().singular_noun(word)

# create list of ingredient names from ingredient json
ingredient_names = {}
for ingredient in ingredients:
    ingredient_names[ingredient['name']] = ingredient["_id"] 
    ingredient_names[pluralize_word(ingredient['name'])] = ingredient["_id"] 

unit_mappings = {
    "tablespoon": "tbsp",
    "teaspoon": "tsp",
    "pint": "pt"
}

ingredient_units = ["lb", "g", "oz", "ml", "cup"] + list(unit_mappings.keys())
pluralized_units = {pluralize_word(unit) for unit in ingredient_units}

recipes = []

def main():
    recipe_count = 0
    total_lines = 0
    missed_lines = 0
    missed_word_count = {}
    for key in recipes_wikipedia:
        recipe_lines = recipes_wikipedia[key]
        curr_recipe = {"link": key, "id" : recipe_count, "ingredients": [], "name" : key.split(":")[-1].replace("_", " ")}
        recipes.append(curr_recipe)
        for line in recipe_lines:
            total_lines = total_lines + 1
            quantity = "1"
            units = "count"
            name = None

            # quantity
            words = line.split()
            if words[0].replace('.', '', 1).isdigit():

                quantity = words[0]

            # units
            for word in words:
                word_lower = word.lower()
                if word_lower in pluralized_units:
                    units = singularize_word(word_lower)
                    break
                elif word_lower in ingredient_units:
                    units = word_lower
                    break
            if units in unit_mappings:
                units = unit_mappings[units]

            # names
            for ingredient_name in ingredient_names:
                if ingredient_name.lower() in line.lower():
                    name = ingredient_name
                    break

            # create ingredient
            if name:
                ingredient = {
                    "name": name,
                    "quantity": quantity,
                    "units": units,
                    "id": ingredient_names[name]
                }

                # add ingredients array to recipe obj
                curr_recipe["ingredients"].append(ingredient)
            
            else:
                for word in line.split(" "):
                    if not word.isdigit():
                        missed_word_count[word] = missed_word_count.get(word, 0) + 1
                missed_lines = missed_lines + 1
                if "orange" in line:
                    print(line)
            
        curr_recipe["ingredients"].sort(key=lambda ingredient: ingredient["id"])
        recipe_count = recipe_count + 1

    json_output = json.dumps(recipes, indent=2)
    f = open("../resources/recipe-with-ingredients.json", "w")
    f.write(json_output) # write all links
    f.close
    #print(json_output)
    #print(recipe_count)
    #print(total_lines)
    #print(missed_lines)
    #print({k: v for k, v in list(reversed(sorted(missed_word_count.items(), key=lambda item: item[1])))[:25]})
main()

f1.close()
f2.close()
