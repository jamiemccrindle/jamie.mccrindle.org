#!/bin/bash

set -e

aws --profile jamie s3 sync --delete --exclude='*.html' --acl public-read \
    --metadata-directive REPLACE --cache-control max-age=31104000 \
    dist/ s3://$1/

aws --profile jamie s3 sync --include='*.html' --acl public-read \
    --metadata-directive REPLACE --cache-control 'public, must-revalidate, proxy-revalidate, max-age=0' \
    dist/ s3://$1/
