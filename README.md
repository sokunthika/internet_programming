# Week 4 practice: Vue components and reactivity

Campus Events, the reference app we build together in practice sessions.
This week it runs on hard-coded data (`src/data/events.ts`).

Requires Node 24 LTS (npm 11).

```bash
npm install
npm run dev     # open http://localhost:5173
npm test        # component tests (Vitest + Vue Test Utils)
npm run check   # type-check .ts and .vue files
```

Work through the TODOs in this order:

1. `src/components/EventCard.vue`: props, emits, computed, v-if, class and attribute bindings
2. `src/components/EventList.vue`: v-model, computed filtering, v-for with keys, passing events up
3. `src/App.vue`: state that changes when you book; bonus: watch + localStorage

You are done when `npm test` passes (15 tests) and `npm run check` shows no errors.
The last App test ("keeps my bookings after a reload") is the bonus.


# week03/ANSWERS
1. In Eventlist, using the array index as :key can cause Vue to reuse the wrong component when the list is filtered or reordered. As a result, a card may show another event's local state even though the displayed event has changed. 

2. Visible is a computed property because it depends on reactive values. When we type in the search box, both approaches can update the results, but a computed property avoids unnecessary recalculations. 

3. First, EventCard should only display the event and report the user's action, while App.vue owns and updates the event data. Second, emitting an event keeps the component reusable and separates responsibilities, making the application easier to maintain and test.

4. Destructuring booked from a reactive object creates a separate local variable that is no longer connected to the original reactive property. Therefore, changing booked does not update event.booked, so Vue cannot detect the intended change. Instead, use event.booked++ or use toRef(event, 'booked') to preserve reactivity.

5. myBookings lives in App.vue because it is the parent component that manages the events and the user's bookings. EventCard only displays an event and emits booking actions, while EventList displays and filters events. Keeping the booking state in App.vue provides one source of truth and makes it easier to update the event data, display the total booking count, and save bookings to localStorage.