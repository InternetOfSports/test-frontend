# IoS (test) frontend

## Install

Checkout the blockchain repository to the same direcotry as test-frontend is.

```
| InternetOfSports
+--- test-frontend
+--- blockchain
```

### install hooks

```bash
cd ../blockchain
```

```bash
ignite generate hooks -o ../test-frontend
```

### Build the frotnend app

Change directory to the `react` directory.

```bash
cd react
```

Install dependencies
```bash
npm install
```

Run development server
```bash
npm run dev
```