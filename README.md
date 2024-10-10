# Tree Manager

Very simple web app for visualizing and managing tree structure, visualized using D3.js. The project comprises Vue.js frontend and Express.js backend with MySQL database.

## Installation

- Clone repo
- Run MySQL server

Run the `init_db.sh` script to set up the MySQL database

Enter your MySQL password when prompted. This will create the **tree_manager** database and the _tree_nodes_ table with initial data.

### Express.js

```
cd server
npm install
# Set up .env file with your DB credentials
npm run dev
```

### Vue.js

```
cd client-vue
npm install
npm run serve
```

## API Endpoints

- `GET /api/v1/getTree`
- `POST /api/v1/addNode`
- `POST /api/v1/initTree`

## Things I didn't finish but I'd do
- Unit tests for backend functions
- Full integration of Tailwind css
- Refactor TreeManager component
- More responsive GUI
