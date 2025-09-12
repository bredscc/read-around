import pycountry
import json
import os

output_dir = "site"
os.makedirs(output_dir, exist_ok=True)


output_path = os.path.join(output_dir, "countries_books.json")


countries_books = {}
for country in pycountry.countries:
    countries_books[country.name] = {"books": []}


with open(output_path, "w", encoding="utf-8") as f:
    json.dump(countries_books, f, ensure_ascii=False, indent=2)

print(f"Generated: {output_path}")
print(f"Countries: {len(countries_books)}")
