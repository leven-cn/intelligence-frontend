#!/bin/bash -
#
# Requirements
#
#     sudo npm install -g htmlhint stylelint stylelint-config-recommended

# Code Review - Static Analysis
htmlhint src/*.html
stylelint "src/css/*.css"
