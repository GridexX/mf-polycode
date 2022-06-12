# Polycode frontend

## Naming convention

To name variables and functions, use the camelCase convention.

For react components names should capitalized CamelCase, the filename should follow the name of the react component.

## Folder architecture

Pages related to the router should be in the pages folder (path-based routing).

React components should be in the `components` folder, bse UI components should be in the `components/base` folder.

Stylesheets should be in the `styles` folder, then following the path where the style is used (try to use one stylesheet file per component/page), example : the styles for the `Home` page compenent should go in `styles/pages/Home.module.css`.

Typescript files that are not react components should go in the `lib` folder (for typescript files interacting with the api : `lib/api/*.ts`)

## Set backend url

To set the backen url you need to set the NEXT_PUBLIC_API_URL env variable to point to the api, ex : `https://api.polycode.dopolytech.fr`.

This env variable must be set at build time.

## About

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Installing packages

- After cloning the project, you must have at least `npm >= 6` (see with `npm --version`) installed.
Then run `npm install` to install packages.

- As we are using [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks), you must install them with
`npm run setup`. These hooks are installed using [`husky`](https://github.com/typicode/husky)
which is used in order to help you to not commit unformatted / unlinted code. Furthermore, [`commit-lint`](https://commitlint.js.org/#/) is used to ensure you respects [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). 

- Copy the file `.env.example` to `.env.local`, this new file won't be committed, it is used to define local environment
variables.

- You are now ready to code, get started with `npm run start`! 🚀

## Contributing

To contribute to this repository, there are a few guidelines : 

1. Create an issue with a descriptive title.
2. Create an associated Merge Request.
3. Perform modifications on your branch
4. When you're done, ensure you check all the Mark of the DoD
5. Great job, you're MR is ready to be reviewed 🚀

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
