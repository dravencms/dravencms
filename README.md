# DravenCMS

This is a Draven CMS !

## How to create new Draven CMS project

The best way to install dravencms/dravencms is using  [Composer](http://getcomposer.org/):

```sh
composer create-project dravencms/dravencms:dev-master PROJECT_NAME
```

or add as depedency to your project 

```sh
$ composer require dravencms/dravencms:dev-master
```

## Optional packages

These packages can be installed for free (OSS)

- `dravencms/article` Provides simple article/blog system
- `dravencms/form` Provides customizable forms with option to send data on email and into DB
- `dravencms/fag` Provides simple FAQ system
- `dravencms/carousel` Provides simple image carousel system
- `dravencms/map` Provides simple Google Map system
- `dravencms/file` Provides files administration
- `dravencms/social` Provides simple social tools (FB Buttons etc.)
- `dravencms/seo` Provides simple SEO tools (sitemap, robots.txt, etc.)
- `dravencms/file-download` Allows simple file download
- `dravencms/gallery` Provides simple gallery system
- `dravencms/primitive` Provides simple primitive components like Call To Action buttons etc.
- `dravencms/partner` Provides simple partner carousel

## Commercial packages

These packages cant be installed withnout payment (To package provider or 3rd party)

- `dravencms/eshop` Provides eshop functionality - Contact me if you want to know more
- `dravencms/dravencms-template-bushido` Bushido template (You have to have valid licence for Bushido template)
- `dravencms/dravencms-template-college-green` College Green template (You have to have valid licence for College Green template)

## Work In Progress (WIP) packages

These packages can be installed but are in Work In Progress

- `dravencms/discussion` Provides simple discussions
- `dravencms/timeline` Shows timeline

You can install these packages by issuing this command in project directory:

```sh
composer require dravencms/PACKAGE_NAME issued in project directory
```

## Configuration

You should have your webserver configured already and pointed to PROJECT_DIR/www

1. You have to create new database, DravenCMS supports MySQL/MariaDB and PostgreSQL (it may work on other databases supported by doctrine2 like SQLite, Oracle, Microsoft SQL Server and SAP Sybase SQL)
2. Copy example configuration `cp app/config/config.local.neon.example app/config/config.local.neon`
3. Modify `app/config/config.local.neon` to match your new database credentials and driver

## Installation

For installation run these commands

```sh
php www/index.php orm:s:d --force
php www/index.php orm:s:c
php www/index.php orm:default-data:load
php www/index.php cms:presenters:generate
```

That should be all, now open http://localhost/admin in your browser and you shoud be able to log in to new DravenCMS installation with:

Username: `admin@example.com`

Password: `adminExample`







