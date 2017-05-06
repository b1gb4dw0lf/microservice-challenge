#!/bin/bash

cmd="$1"
path="$2"

while ! timeout 15 bash -c "echo > /dev/tcp/rabbitmq/5672"; do sleep 5; done;
exec $cmd $path;
