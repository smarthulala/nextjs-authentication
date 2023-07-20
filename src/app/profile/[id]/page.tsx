import Link from 'next/link'

export default function UserProfilePage({ params }: any) {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4'>
      <h1>Profile</h1>
      <hr />
      <p className='text-5xl my-10'>
        Profile Page
        <span className='p-2 rounded bg-orange-500 ml-2 text-black'>
          {params.id}
        </span>
      </p>
      <Link href='/profile'>Back to Profile Page</Link>
    </div>
  )
}
