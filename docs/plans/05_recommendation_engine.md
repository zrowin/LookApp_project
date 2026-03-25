# Recommendation Engine (Matching)

## Cel
Dostarczać sugestie outfitów / dopasowań elementów oparte na prostych regułach i podobieństwie embeddingowym.

## Kryteria akceptacji
- Dla przesłanego elementu system generuje min. 3 propozycje outfitów/opcji dopasowania.

## Kroki implementacji
- MVP: prosty rule-based + embedding similarity (wektory cech) do wyszukiwania podobnych elementów.
- Pipeline: obraz → tagi + embedding → query do similarity index (Faiss / Pinecone / Elastic/k-NN).
- Wynik: lista kandydatów z confidence score.

## API
- `GET /api/recommendations?imageId=` — zwraca listę rekomendacji.

## Dane
- Embedding: imageId, vector[], lastUpdated.

## 3rd-party
- Vector DB: Pinecone, Weaviate, lub prosty FAISS na serwerze.

## Testy
- Offline evaluation: precision@k na zestawie walidacyjnym.

## Szacowany czas
- MVP (rule + embeddings + prosty index): 4–7 dni.