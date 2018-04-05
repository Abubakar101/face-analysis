#!/usr/bin/env bash
set -e

RED="\033[31m"

url="$1"
service_name="$2"

>&2 echo -e $RED "Waiting for ${service_name}" "($url)"

until curl --output /dev/null --silent --head --fail $url; do
    printf '.'
    sleep 1
done

>&2 echo -e $RED "${service_name} is up!"
exec $cmd