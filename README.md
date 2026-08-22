# PG Life

A PG (Paying Guest) accommodation listing web app where users can browse, filter, and show interest in PG properties across major Indian cities.

---

## Features

- Browse PG listings by city (Delhi, Mumbai, Bengaluru, Hyderabad)
- View property details — photos, amenities, ratings, testimonials
- User signup and login
- Mark/unmark interest in properties
- User dashboard showing interested properties
- Filter and sort by rent

---

## Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Backend  | PHP 8.x                     |
| Database | MySQL 9.x                   |
| Frontend | HTML, CSS, Bootstrap 4, jQuery |
| Server   | PHP built-in dev server     |

---

## Local Setup

---

## 🍎 macOS

### Prerequisites
- [Homebrew](https://brew.sh) — install it with:
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
- Git (comes pre-installed on macOS, or `brew install git`)

---

### Step 1 — Clone the repository

```bash
git clone <your-repo-url>
cd pglife-project
```

---

### Step 2 — Install PHP

```bash
brew install php
```

Verify:
```bash
php --version
```

---

### Step 3 — Install and start MySQL

```bash
brew install mysql
brew services start mysql
```

Verify:
```bash
mysql -u root -e "SELECT 1;"
```

---

### Step 4 — Create the database

```bash
mysql -u root -e "CREATE DATABASE pg_life;"
```

---

### Step 5 — Import the schema and seed data

```bash
mysql -u root pg_life < ../pg_life_schema.sql
```

> The `pg_life_schema.sql` file is located one level above the `pglife-project/` folder.

---

### Step 6 — Start the PHP development server

```bash
php -S localhost:8000
```

---

### Step 7 — Open in browser

```
http://localhost:8000
```

---

## 🪟 Windows

### Prerequisites
- [XAMPP](https://www.apachefriends.org/download.html) — installs PHP, MySQL, and Apache together (easiest option)
- [Git for Windows](https://git-scm.com/download/win)

---

### Step 1 — Install XAMPP

1. Download XAMPP from https://www.apachefriends.org/download.html
2. Run the installer and select **PHP** and **MySQL** components
3. After install, open **XAMPP Control Panel**
4. Click **Start** next to **Apache** and **MySQL**

---

### Step 2 — Clone the repository

Open **Git Bash** or **Command Prompt** and run:

```bash
git clone <your-repo-url>
```

Move the `pglife-project` folder into XAMPP's web root:

```
C:\xampp\htdocs\pglife-project
```

You can do this by copying the folder manually in File Explorer.

---

### Step 3 — Create the database

1. Open your browser and go to: `http://localhost/phpmyadmin`
2. Click **New** in the left sidebar
3. Enter `pg_life` as the database name and click **Create**

---

### Step 4 — Import the schema and seed data

1. In phpMyAdmin, click on the `pg_life` database in the left sidebar
2. Click the **Import** tab at the top
3. Click **Choose File** and select `pg_life_schema.sql` (located one level above `pglife-project/`)
4. Click **Import** at the bottom

---

### Step 5 — Open in browser

```
http://localhost/pglife-project/index.php
```

> On Windows with XAMPP, Apache serves the files directly — no need to run a separate PHP server.

---

### Troubleshooting on Windows

| Issue | Fix |
|-------|-----|
| Apache won't start (port 80 in use) | Change Apache port to 8080 in XAMPP → Config → httpd.conf, then access via `http://localhost:8080/pglife-project/` |
| MySQL won't start | Open Task Manager and end any `mysqld.exe` process, then restart |
| `mysqli` extension not found | Open `C:\xampp\php\php.ini`, find `;extension=mysqli` and remove the `;` to enable it |

---

## Project Structure

```
pglife-project/
├── index.php                  # Home page
├── property_list.php          # List PGs by city
├── property_detail.php        # Individual property page
├── dashboard.php              # User dashboard
├── logout.php                 # Logout
│
├── api/
│   ├── login_submit.php       # Login API
│   ├── signup_submit.php      # Signup API
│   ├── toggle_interested.php  # Mark/unmark interest API
│   └── get_properties_by_city.php  # Properties JSON API (used by React)
│
├── includes/
│   ├── database_connect.php   # MySQL connection
│   ├── header.php             # Shared navbar
│   ├── footer.php             # Shared footer
│   ├── head_links.php         # CSS/JS imports
│   ├── login_modal.php        # Login modal
│   └── signup_modal.php       # Signup modal
│
├── css/
│   ├── common.css             # Global styles
│   ├── home.css               # Home page styles
│   ├── property_list.css      # Property list styles
│   ├── property_detail.css    # Property detail styles
│   └── dashboard.css          # Dashboard styles
│
├── js/
│   ├── common.js              # Login/signup AJAX
│   ├── property_list.js       # Filter, sort, interest toggle
│   └── property_detail.js     # Interest toggle
│
├── img/
│   ├── properties/            # Property photos (organized by property ID)
│   │   ├── 1/
│   │   ├── 2/
│   │   └── ...
│   └── amenities/             # Amenity SVG icons
│
└── react-app/                 # Embedded React version of property list
```

---

## Database Schema

| Table                      | Description                              |
|----------------------------|------------------------------------------|
| `cities`                   | Supported cities                         |
| `properties`               | PG listings with rent, ratings, gender   |
| `amenities`                | Available amenities (WiFi, AC, etc.)     |
| `properties_amenities`     | Many-to-many: property ↔ amenity         |
| `users`                    | Registered users                         |
| `interested_users_properties` | Many-to-many: user ↔ property interest |
| `testimonials`             | User reviews for properties              |

---

## Default Credentials (dev only)

The MySQL root user has **no password** by default (Homebrew install).  
The DB connection is configured in `includes/database_connect.php`:

```php
$conn = mysqli_connect("127.0.0.1", "root", "", "pg_life");
```

> ⚠️ Do not use this configuration in production. Set a strong password and use environment variables.

---

## Adding Property Images

Property images are stored in `img/properties/{property_id}/`.  
Drop any `.jpg` or `.png` files into the folder for the matching property ID — the app picks them up automatically via `glob()`.

Example:
```
img/properties/1/photo1.jpg
img/properties/1/photo2.jpg
```

---

## License

This project is for educational purposes.
