#!/bin/bash
php www/index.php orm:s:d --force
php www/index.php orm:s:c
php www/index.php orm:default-data:load
php www/index.php cms:presenters:generate
