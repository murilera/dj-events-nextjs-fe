import EventItem from "@/components/EventItem"
import Layout from "@/components/Layout"
import { API_URL } from "@/config"
import Link from "next/link"

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
      {events.length > 0 && (
        <Link href='/events' className="btn-secondary">
          View All
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=date:asc&pagination[start]=0&pagination[limit]=3`)
  const events = await res.json()

  return {
    props: { events: events.data },
    revalidate: 1
  }
}