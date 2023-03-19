# DravenCMS

This is a Draven CMS !

## How to create new Draven CMS project

The best way to install dravencms/dravencms is using  [Composer](http://getcomposer.org/):

```sh
composer create-project dravencms/dravencms PROJECT_NAME
```

or add as depedency to your project 

```sh
$ composer require dravencms/dravencms
```

## Optional packages

Optional packages can be installed wia composer like this:

```
$ composer require dravencms/article
```
and so on...

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
- `dravencms/partner` Provides simple partner carousel
- `dravencms/structure` Privides CMS capabilities, lot of other packages install it as depedency.

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
composer require dravencms/PACKAGE_NAME
```

## Configuration

1. You have to create new database, DravenCMS supports MySQL/MariaDB and PostgreSQL (it may work on other databases supported by doctrine2 like SQLite, Oracle, Microsoft SQL Server and SAP Sybase SQL)
2. Copy example configuration `cp app/config/config.local.neon.example app/config/config.local.neon`
3. Modify `app/config/config.local.neon` to match your new database credentials and driver

## Installation

For installation run these commands

```sh
./bin/console orm:schema-tool:create
./bin/console orm:generate-proxies
./bin/console database:default-data:load
```

If you installed `dravencms/structure` or any package depended on it, you should run this command to generate default presenters:

```sh
./bin/console cms:presenters:generate
```

## Running

For testing and development you can use build in PHP web server:

```sh
php -S localhost:8000 -t www www/index.php
```

***!!! Use Nginx or Apache for production ENV !!!***

That should be all, now open http://localhost:8000/admin in your browser and you shoud be able to log in to new DravenCMS installation with:

Username: `admin@example.com`

Password: `adminExample`







