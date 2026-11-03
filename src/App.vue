<script setup lang="ts">
<<<<<<< HEAD
import { storeToRefs } from "pinia";
import { useSessionStore, type Role } from "./stores/session";
import { useBookingsStore } from "./stores/bookings";

const session = useSessionStore();
const { role, isOrganiser } = storeToRefs(session);
const { totalSeats } = storeToRefs(useBookingsStore());
</script>

<template>
  <header class="top">
    <nav>
      <RouterLink to="/" class="brand">Campus Events</RouterLink>
      <RouterLink to="/my-bookings">My bookings<span v-if="totalSeats"> ({{ totalSeats }})</span></RouterLink>
      <RouterLink v-if="isOrganiser" to="/events/new">New event</RouterLink>
    </nav>
    <label class="role">
      Role
      <select :value="role" aria-label="Role" @change="session.setRole(($event.target as HTMLSelectElement).value as Role)">
        <option value="student">Student</option>
        <option value="organiser">Organiser</option>
      </select>
    </label>
  </header>
  <main>
    <RouterView />
=======
import { computed, ref, watch } from "vue";
import EventList from "./components/EventList.vue";
import { initialEvents } from "./data/events";
import type { CampusEvent } from "./types";

// A reactive copy of the hard-coded events
const events = ref<CampusEvent[]>(initialEvents.map(e => ({ ...e })));

// TODO 1: a ref `myBookings` holding the ids of the events I booked (one entry per seat)
const myBookings = ref<number[]>([])
// TODO 2: a computed `bookingCount`
const bookingCount = computed(() => myBookings.value.length)
// TODO 3: onBook(id): find the event; if it still has a seat,
//         increase its `booked` and add the id to myBookings
function onBook(id: number) {
  const event = events.value.find((event) => event.id === id)

  if (!event) return

  if (event.booked < event.capacity) {
    event.booked++
    myBookings.value.push(id)
  }
}

// TODO 4 (bonus): keep my bookings after a page reload
//   - watch myBookings and save it to localStorage (JSON.stringify)
//   - read it back when the app starts, and add those seats to `booked`
try {
  const saved = localStorage.getItem('myBookings')

  if (saved) {
    const parsed: unknown = JSON.parse(saved)

    if (Array.isArray(parsed) && parsed.every((id) => typeof id === 'number')) {
      myBookings.value = parsed
      const restoredBookings: number[] = [];
      for (const event of events.value) {
        const savedSeats = myBookings.value.filter(
          (id) => id === event.id
        ).length

        event.booked = Math.min(
          event.capacity, 
          event.booked + savedSeats
        )
      }
    }
  }
} catch (error) {
  console.error ('Could not restore saved bookings', error)
}

watch(
  myBookings, (newBookings) => {
    localStorage.setItem('myBookings', JSON.stringify(newBookings))
}, {
    deep : true
  }
)
</script>

<template>
  <main>
    <header>
      <h1>Campus Events</h1>
      <!-- TODO 5: show the real count ("1 seat" / "N seats") -->
      <p class="mine">You have booked {{bookingCount}} {{ bookingCount === 1 ? 'seat' : 'seats' }}.</p>
    </header>
    <EventList :events="events" @book="onBook" />
>>>>>>> origin/main
  </main>
</template>

<style scoped>
<<<<<<< HEAD
.top { background: #1b1b1f; color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
nav { display: flex; gap: 16px; align-items: center; }
nav a { color: #e5e7eb; text-decoration: none; }
nav a.router-link-exact-active { color: #f7df1e; }
.brand { font-weight: 700; font-size: 1.1rem; }
.role { display: flex; gap: 8px; align-items: center; }
=======
header { margin-bottom: 16px; }
.mine { color: #6b7280; margin: 0; }
>>>>>>> origin/main
</style>
