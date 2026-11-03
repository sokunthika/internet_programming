import { computed, ref, type Ref } from "vue";
import type { CampusEvent, Category } from "../types";

// TODO E1 (refactor): move the filtering logic from week 4's EventList.vue here,
// so any page can reuse it. Return { search, category, visible }.
// The test "filters the list with the search box" in EventsPage.test.ts checks it.
export function useEventFilters(events: Ref<CampusEvent[]>) {
  const search = ref("");
  const category = ref<Category | "all">("all");

  const visible = computed(() =>
    events.value.filter(e => {
      const query = search.value.trim().toLowerCase();
      const matchesSearch =
        e.title.toLowerCase().includes(query) ||
        e.location.toLowerCase().includes(query);
      const matchesCategory = category.value === "all" || e.category === category.value;
      return matchesSearch && matchesCategory;
    })
  );
  return { search, category, visible };
}
