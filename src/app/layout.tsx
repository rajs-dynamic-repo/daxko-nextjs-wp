import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marvel Comics Explorer',
  description: 'Explore Marvel comics featuring Spider-Man from 2022',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-red-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">MARVEL COMICS</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-gray-200">Home</a>
              <a href="#heroes" className="hover:text-gray-200">Heroes</a>
              <a href="#comics" className="hover:text-gray-200">Comics</a>
              <a href="#news" className="hover:text-gray-200">News</a>
            </nav>
            <button className="bg-white text-red-600 px-4 py-2 rounded">Login</button>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="bg-gray-900 text-white p-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Marvel Comics</h3>
                <p className="text-gray-400">Your source for Spider-Man comics and Marvel heroes information.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Home</a></li>
                  <li><a href="#heroes" className="hover:text-white">Heroes</a></li>
                  <li><a href="#comics" className="hover:text-white">Comics</a></li>
                  <li><a href="#news" className="hover:text-white">News</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Contact</h4>
                <p className="text-gray-400">Email: info@example.com</p>
                <p className="text-gray-400">© {new Date().getFullYear()} Marvel Comics Explorer</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}