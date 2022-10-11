#!/usr/bin/env sh
changed_files_cmd="git diff --diff-filter=ACM --name-only --cached \"*.ts\""
changed_files_count=$(eval $changed_files_cmd | wc -l)

if [ $changed_files_count -gt 0 ]; then
  echo Linting:
  echo $(eval $changed_files_cmd) | tr " " "\n"
  yarn eslint $(eval $changed_files_cmd | xargs)
else
  echo No files to lint
fi
