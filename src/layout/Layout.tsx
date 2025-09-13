import { Link, Outlet } from 'react-router-dom';

import { Code } from 'lucide-react';

const Layout = () => {
  return (
    <>
      <header className="border-b bg-card/50 border-accent-foreground/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/#generate"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("generate");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2"
            >
              <Code className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">DecodeMyCode</h1>
            </Link>
          </div>

          {/* <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/#generate')}
              className="hover:scale-105 transition-all duration-300 ease-in-out"
            >
              New Analysis
            </Button>

            <ThemeToggle />
          </div> */}
        </div>
      </header>

      <Outlet />
    </>
  )
}

export default Layout