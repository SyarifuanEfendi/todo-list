#!/bin/bash

set -e

psql -U user -d postgres -c "CREATE DATABASE IF NOT EXISTS todo_list;"
