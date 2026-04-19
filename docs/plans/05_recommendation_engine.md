# Recommendation Engine (Matching)

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
	- [00_nextjs_bootstrap.md](00_nextjs_bootstrap.md)
	- [01_upload_and_bg_removal.md](01_upload_and_bg_removal.md)
	- [02_auto_tagging.md](02_auto_tagging.md)
	- [03_outfit_builder.md](03_outfit_builder.md)
	- [04_save_and_manage_outfits.md](04_save_and_manage_outfits.md)
	- [06_auth_registration_onboarding.md](06_auth_registration_onboarding.md)
	- [07_billing_and_subscription.md](07_billing_and_subscription.md)
	- [08_export_to_social.md](08_export_to_social.md)
	- [09_reverse_image_search.md](09_reverse_image_search.md)
	- [10_privacy_and_data_retention.md](10_privacy_and_data_retention.md)
	- [11_analytics_and_metrics.md](11_analytics_and_metrics.md)

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