import './globals.css'
import { Inter } from 'next/font/google'
import { Header, Main } from '@/components';
import Providers from '@/contexts';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Starbucks Coffee Company',
  description: 'Test App for Spotower',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Main>
            {children}
          </Main>
        </Providers>
      </body>
    </html>
  )
}

