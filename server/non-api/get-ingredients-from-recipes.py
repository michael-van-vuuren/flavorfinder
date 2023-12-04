import json
import inflect
from fractions import Fraction
 
f1 = open('./../resources/recipe-to-ingredients.json')
f2 = open('./../resources/ingredients-with-images.json')
 
recipes_wikipedia = json.load(f1)
ingredients = json.load(f2)

def pluralize_word(word):
    return inflect.engine().plural(word)

def singularize_word(word):
  return inflect.engine().singular_noun(word)

def spaceify_string(input_string, delimiters=".,?!\t\n"):
    translation_table = str.maketrans(delimiters, ' ' * len(delimiters))
    return input_string.translate(translation_table)

def convert_fraction_to_decimal(input_string):
    parts = input_string.split(" ", 1)  # Split the string into number and the rest
    if len(parts) == 2:
        number_part, rest = parts
        try:
            fraction = Fraction(number_part)
            decimal_value = float(fraction)
            result_string = f"{decimal_value} {rest}"
            return result_string
        except ValueError:
            return input_string
    else:
        return input_string

# create list of ingredient names from ingredient json
# ingredient_names = {}
# for ingredient in ingredients:
#     ingredient_names[ingredient['name']] = ingredient["_id"] 
#     ingredient_names[pluralize_word(ingredient['name'])] = ingredient["_id"] 

id_lut = {}
for ingredient in ingredients:
    name = ingredient["name"] 
    _id = ingredient["_id"]
    id_lut[name] = _id

ingredient_names = []
for ingredient in ingredients:
    singular = ingredient["name"]
    plural = pluralize_word(singular)
    ingredient_names.append((singular, plural))

# sorted_ingredient_names = sorted(ingredient_names.keys(), key=len, reverse=True)
sorted_ingredient_names = sorted(ingredient_names, key=lambda tup: len(tup[0]), reverse=True)

unit_mappings = {
    "tbsp": "Tbs",
    "tablespoon": "Tbs",
    "teaspoon": "tsp",
    "pint": "pt",
    "quart" : "qt",
    "fl oz" : "fl-oz",
    "pound" : "lb",
    "gram" : "g",
    "kilogram" : "kg"
}

ingredient_units = ["lb", "g", "oz", "ml", "cup", "mg", "kg"] + list(unit_mappings.keys())
pluralized_units = {pluralize_word(unit) for unit in ingredient_units}

recipes = []

def main():
    recipe_count = 0
    total_lines = 0
    missed_lines = 0
    missed_word_count = {}
    for key in recipes_wikipedia:
        recipe_lines = recipes_wikipedia[key]
        curr_recipe = {"id" : recipe_count, "name" : key.split(":")[-1].replace("_", " ").split("/")[-1], "link": key, "ingredients": []}
        added_ids = set()

        for line in recipe_lines:
            total_lines = total_lines + 1
            quantity = 1
            units = "count"
            name = None

            # preprocess fractions
            if "/" in line:
                line = convert_fraction_to_decimal(line)

            # quantity
            words = line.split()
            if words[0].replace('.', '', 1).isdigit():
                quantity = float(words[0])

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

            paddedLine = f" {spaceify_string(line.lower())} "
            for i_name in sorted_ingredient_names:
                if f" {i_name[0].lower()} " in paddedLine or f" {i_name[1].lower()} " in paddedLine:
                    name = i_name[0]
                    break

            # create ingredient
            if name and id_lut[name] not in added_ids:
                ingredient = {
                    "name": name,
                    "quantity": quantity,
                    "units": units,
                    "id": id_lut[name]
                }

                # add ingredients array to recipe obj
                curr_recipe["ingredients"].append(ingredient)
                added_ids.add(id_lut[name])
            
            else:
                for word in line.split(" "):
                    if not word.isdigit():
                        missed_word_count[word] = missed_word_count.get(word, 0) + 1
                missed_lines = missed_lines + 1
                print(line)
            
        if (curr_recipe["ingredients"]):
            recipes.append(curr_recipe)
        curr_recipe["ingredients"].sort(key=lambda ingredient: ingredient["id"], reverse=True)
        recipe_count = recipe_count + 1

    json_output = json.dumps(recipes, indent=2)
    f = open("../resources/recipe-with-ingredients2.json", "w")
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
