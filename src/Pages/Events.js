import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { json, useLoaderData, Await, defer } from "react-router-dom";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loadevents) => <EventsList events={loadevents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadData() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "could not fetch events" };
    // throw new Response(JSON.stringify({ message: "could not fetch events" }), {
    //   status: 500,
    // });

    return json({ message: "could not fetch events" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadData(),
  });
}
