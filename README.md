# create-skeleton-app

Everything you need to build a Svelte project, powered by [`create-skeleton-app`](https://github.com/skeletonlabs/skeleton/tree/dev/packages/create-skeleton-app).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create skeleton-app@latest

# create a new project in my-app
npm create skeleton-app@latest my-skeleton-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
