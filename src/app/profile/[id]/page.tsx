import Link from 'next/link'

export default function Profile({ params }: any) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8 text-2xl'>
      <div className='text-4xl'>User Page</div>
      <div className='bg-orange-500 rounded p-4 text-black'>{params.id}</div>
      <Link
        className='bg-gray-700 p-2 rounded border active:bg-green-600 hover:bg-green-600'
        href='/profile'
      >
        Go to profile
      </Link>
    </main>
  )
}
