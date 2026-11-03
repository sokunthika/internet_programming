# Week 05 ANSWER

1. In development, the Vite dev server answered the browser's request for `/events/2` by serving the SPA entry page, and Vue Router then displayed the event route. In production, the web server must serve `index.html` as a history fallback for client-side routes such as `/events/2`, while the API server must still provide `/events/2`.

2. Yes, a student could bypass the client-side guard by sending a direct `POST /events` request with tools such as `curl` or the browser developer console. The backend must authenticate the request and enforce the organiser role on the event-creation endpoint, because the router guard is not a security boundary.

3. `onMounted` runs only when `EventDetailPage` is first mounted. If the router reuses that component while navigating from `/events/2` to `/events/3`, the `id` changes but the page would not fetch the new event and could display stale data.

4. Pinia store state and getters are reactive, but ordinary destructuring can extract their current values and lose that reactivity. `storeToRefs(store)` converts `events`, `status`, and `error` into refs, so the template updates when the store changes while actions such as `store.fetchAll()` remain available.

5. If the booking `POST` succeeds but the seat-count `PATCH` fails, the booking exists while the event still has its old `booked` value, leaving the data inconsistent and potentially allowing overselling. The server can avoid this with one endpoint that performs both operations in a database transaction, committing them together or rolling both back.
