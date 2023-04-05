import { FaPencilAlt, FaTimes } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/Layout"
import styles from "@/styles/Event.module.css"
import { API_URL } from "@/config"

const EventPage = ({ evt }) => {
  const deleteEvent = (e) => {
    console.log('delete')
  }
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image?.data?.attributes.formats.medium.url ?? '/images/event-default.png'} width={960} height={600} alt={evt.name} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href='/events' className={styles.back}>
          {'<'} Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default EventPage

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  const paths = events.data.map(evt => ({
    params: { slug: evt.attributes.slug }
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`)
  const events = await res.json()

  return {
    props: {
      evt: events.data[0].attributes
    },
    revalidate: 1
  }
}

// export const getServerSideProps = async ({ query: { slug } }) => {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0]
//     }
//   }
// }