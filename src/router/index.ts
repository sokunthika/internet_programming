import { createRouter, createWebHistory, type RouterHistory } from "vue-router";
import { useSessionStore } from "../stores/session";
import EventsPage from "../pages/EventsPage.vue";

declare module "vue-router" {
  interface RouteMeta {
    organiserOnly?: boolean;
  }
}

export const routes = [
  { path: "/", name: "events", component: EventsPage },
  // TODO A1: add these routes. Lazy-load each page: component: () => import("../pages/....vue")
  //   /events/new    name "event-new"     NewEventPage      meta: { organiserOnly: true }
  {
    path: "/events/new",
    name: "event-new",
    component: () => import("../pages/NewEventPage.vue"),
     meta: { organiserOnly: true }
  },
  //   /events/:id    name "event-detail"  EventDetailPage   props: true, and only digits: ":id(\\d+)"
  {
    path: "/events/:id(\\d+)",
    name: "event-detail",
    component: () => import("../pages/EventDetailPage.vue")
  },
  //   /my-bookings   name "my-bookings"   MyBookingsPage
  {
    path: "/my-bookings",
    name: "my-bookings",
    component: () => import("../pages/MyBookingsPage.vue")
  },
  //   anything else  name "not-found"     NotFoundPage      path: "/:pathMatch(.*)*"
  {
    path: "/ :pathMatch(.*)*",
    name: "not-found",
    component: () => import("../pages/NotFoundPage.vue")
  }, 
  // Question: why must "/events/new" come before "/event s/:id" if :id had no (\\d+)?
  // because Express/NestJS route matching can interpret "new" as the value of :id.
]; 

export function makeRouter(history: RouterHistory = createWebHistory()) {
  // TODO A2: a global guard (router.beforeEach).
  // If the route has meta.organiserOnly and the session is not an organiser,
  // redirect to { name: "events", query: { denied: "1" } }.
  const router = createRouter({ history, routes });

  router.beforeEach((to) => {
    if (to.meta.organiserOnly){
      const session = useSessionStore();
      if (!session.isOrganiser)
        return { name: "events", query: { denied: "1" } };
    }
  })  

  void useSessionStore; // remove this line when you use the store
  return router;
}
