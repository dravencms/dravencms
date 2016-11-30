#!/bin/bash
composer create-project dravencms/dravencms:@dev $1 --repository '{"type":"vcs","url":"git@gitlab.salamek.cz:sadam/dravencms-dravencms.git"}'
