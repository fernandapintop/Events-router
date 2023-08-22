import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Pages/Root";
import HomePage from "./Pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./Pages/Events";
import EventDetailPage, {
  loader as eventDetailLoaderr,
  action as deleteEventAction,
} from "./Pages/EventsDetailPage";
import NewEventPage from "./Pages/NewEvent";
import EditEventPage from "./Pages/EditEventPage";
import EventRootLayout from "./Pages/EventsRoot";
import ErrorPage from "./Pages/Error";
import { action as manipulateEventsAction } from "./components/EventForm";

import NewsletterPage, {
  action as newsletterAction,
} from "../src/Pages/Newsletter";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/events",
          element: <EventRootLayout />,
          children: [
            {
              path: "/events",
              element: <EventsPage />,
              loader: eventsLoader,
            },
            {
              path: "/events/:id",
              loader: eventDetailLoaderr,
              id: "event-detail",
              children: [
                {
                  path: "/events/:id",
                  element: <EventDetailPage />,
                  action: deleteEventAction,
                },
                {
                  path: "/events/:id/edit",
                  element: <EditEventPage />,
                  action: manipulateEventsAction,
                },
              ],
            },
            {
              path: "/events/new",
              element: <NewEventPage />,
              action: manipulateEventsAction,
            },
          ],
        },
        {
          path: "/newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
