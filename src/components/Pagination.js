import Link from 'next/link'
import { PER_PAGE } from '@/config/index'

const Pagination = ({ page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE)
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`} className='btn-secondary'>
          Prev
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`} className='btn-secondary'>
          Next
        </Link>
      )}
    </>
  )
}

export default Pagination