# DravenCMS

Modular content-management system built on Nette, Doctrine ORM, Latte, and reusable `dravencms/*` packages. This repository is the project skeleton and package synchronizer entry point; applications select the feature packages they need.

## Requirements

- A PHP version supported by the selected DravenCMS packages.
- Composer.
- MySQL/MariaDB or PostgreSQL for the standard database configuration.
- A writable `temp`, `log`, `www/data`, and `www/webtemp` setup for the web/PHP process.
- Node/npm only when rebuilding package frontend assets.

## Create a Project

```bash
composer create-project dravencms/dravencms my-project
cd my-project
```

Install the application packages required by the project. A typical administration-enabled installation starts with:

```bash
composer require dravencms/admin dravencms/frontend dravencms/recaptcha
```

`dravencms/admin` brings in the shared application, database, user, form, grid, locale, and related dependencies. `dravencms/recaptcha` satisfies the CAPTCHA implementation required by the user package; `dravencms/antiq-captcha` is the self-hosted alternative.

Feature packages can then be added independently, for example:

```bash
composer require dravencms/file dravencms/tag dravencms/gallery dravencms/seo
```

Composer runs `packager:sync` after install and update operations. The packager copies public assets and installs each package's `dravencms.config.neon` into the application package configuration.

## Configure the Database

Create the local configuration:

```bash
cp app/config/config.local.neon.example app/config/config.local.neon
```

Set the connection values:

```neon
parameters:
    database:
        driver: pdo_mysql
        host: 127.0.0.1
        port: 3306
        user: app
        password: secret
        dbname: app
```

Keep production credentials outside version control.

## Initialize a Fresh Database

For a disposable development database, create the schema, proxies, and default fixture data:

```bash
php bin/console orm:schema-tool:create
php bin/console orm:generate-proxies
php bin/console database:default-data:load
```

Use versioned Doctrine migrations for existing and production databases. The default-data command purges mapped data before loading fixtures and must not be run against a database that needs to be preserved.

When `dravencms/structure` is installed, generate its presenter classes as required by that package:

```bash
php bin/console cms:presenters:generate
```

## Development Server

Run the application with PHP's built-in server:

```bash
php -S localhost:8000 -t www www/index.php
```

Open `http://localhost:8000/admin` for the administration interface. Use the bundled Nginx/Apache configuration as a starting point for a real web server; the PHP development server is not intended for production.

## Default Fixture Account

The User package fixtures create an administrator account with these public development credentials:

```text
Username: admin@example.com
Password: adminExample
```

Replace or disable this account immediately. Never deploy an application where these credentials remain usable.

## Package Overview

Core infrastructure:

- `dravencms/application`, `database`, `console`, `logging`, and `webloader`
- `dravencms/base-form`, `base-grid`, `translation`, and `frontend`
- `dravencms/admin`, `user`, `locale`, and `location`

Optional modules in this repository set:

- `dravencms/file`, `gallery`, `tag`, `partner`, `seo`, and `cookie-consent`
- `dravencms/captcha` with `recaptcha` or `antiq-captcha`
- `dravencms/templated-email`

Each package README documents its configuration, integration points, fixtures, and operational warnings.

## License

DravenCMS is licensed under the LGPL-3.0 license unless a package states a more specific SPDX variant.
