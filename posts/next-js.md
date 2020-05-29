---
title: "Thoughts on Next.js"
date: "2020-05-19"
---

I recently started learning the next.js framework. I started this with javascript experience but none with react. 
I was able to do the React tutorial in next.js with only some slight modifications to add CSS. 
Overall, I really like both React and Next.js. React is a powerful framework on its own, and Next.js extends that even further. 
Server-side generation and rendering is a powerful feature that is neccessary to get the best user experience across all devices and internet connection speeds. 

Here are some bullet points about Next.js (and react in general): 

## Pros
- Fast: Server side rendering and static generation take some of the load off of the client and improve load times
- Don't have to worry about minifying assets
- Re-usable components are nice
- Writing HTML without having to use strings is convenient
- Don't have to write client side javascript or worry about browser compatibility
- Complex features are simple to implement

## Cons
- Must create a lot of files, 1 for almost every page adds up
- I find relative imports annoying. I wish they were based on the application root rather than the current directory so I could use the same import statement in multiple files
- Prefetched links give the user no feedback that the page they navigated to is loading
- Compilation is slow during development
- Tracebacks (for non-syntax errors) are basically non-existant (line numbers in the thousands when the file is less than 100 lines) so debugging them can be painful (adding console.logs, waiting for a recompile, navigate to the page and it compiles some more, get an error, repeat)
- Can't use CSS tag selectors on a page-by-page basis, only globally, so you have to resort to naming classes based on tag name in a CSS module
