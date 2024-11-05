import { Link } from "inertia-adapter-solid";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/solid-query'

const queryClient = new QueryClient();

function HomeIcon(props: { size: string }) {
  const size = props.size;
  return (
    <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="overflow: visible; color: currentcolor;" height={size} width={size}><path d="M946.5 505 534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path></svg>
  )
}

export default function Layout(props: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <main class='bg-rose-300 '>
        <header class='fixed px-5 py-2 text-white'>
          <Link href="/">
            <HomeIcon size='30' />
          </Link>
        </header>
        {props.children}
      </main>
    </QueryClientProvider>
  )
}
