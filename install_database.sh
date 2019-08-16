#!/bin/bash
php bin/console orm:s:d --force
php bin/console orm:s:c
php bin/console orm:default-data:load
php bin/console cms:presenters:generate
