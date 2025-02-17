import { Link, useRouter } from 'next/router'

const ActiveLink = ({ children, href, className }) => {
  const router = useRouter()
  return (
    <Link
      href={href}
      scroll={false}
      className={`${
        router.pathname === href
          ? 'text-gray-900 border-gray-800'
          : 'text-gray-600 hover:text-gray-700 border-transparent'
      } ${className} block pb-4 font-semibold text-sm sm:text-base border-b-2 focus:outline-none focus:text-gray-900 whitespace-no-wrap`}
    >
      {children}
    </Link>
  )
}

export default ActiveLink
