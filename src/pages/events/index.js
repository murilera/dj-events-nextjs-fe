import EventItem from "@/components/EventItem"
import Layout from "@/components/Layout"
import Pagination from "@/components/Pagination"
import { API_URL } from "@/config"
import { PER_PAGE } from '@/config/index'

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  const res = await fetch(`${API_URL}/api/events?sort=date%3Aasc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=*`)
  const events = await res.json()

  return {
    props: {
      events: events.data,
      page: +page,
      total: events.meta.pagination.total,
    },
  }
}