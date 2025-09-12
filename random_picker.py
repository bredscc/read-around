import json
import random
import os

FILE = os.path.join("site", "countries_books.json")

with open(FILE, "r", encoding="utf-8") as f:
    data = json.load(f)


countries_with_books = [c for c, v in data.items() if v["books"]]
if countries_with_books:
    country = random.choice(countries_with_books)
else:
    country = random.choice(list(data.keys()))


books = data[country]["books"]
print(f"\nYour country is... {country}\n")
if books:
    print("Recommendations")
    for i, b in enumerate(books, 1):
        print(f"{i}. {b}")
else:
    print("⚠️ There are no books registered for this country yet.")
