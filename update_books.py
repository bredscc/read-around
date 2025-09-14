import json

with open("countries_books.json", "r", encoding="utf-8") as f:
    countries = json.load(f)

with open("new_books.json", "r", encoding="utf-8") as f:
    new_books = json.load(f)

for country, books in new_books.items():
    if country not in countries:
        countries[country] = {"books": []}

    updated_books = countries[country]["books"] + books

    seen = set()
    unique_books = []
    for book in updated_books:
        if book not in seen:
            unique_books.append(book)
            seen.add(book)

    countries[country]["books"] = unique_books[-5:]

with open("countries_books.json", "w", encoding="utf-8") as f:
    json.dump(countries, f, indent=2, ensure_ascii=False)

print("✅ Books updated successfully! Oldest books replaced by new ones.")
