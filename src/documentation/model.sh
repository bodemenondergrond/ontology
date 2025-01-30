#!/bin/bash

  sparql --results=CSV --data=../source/bodem-en-ondergrond.ttl --query select.rq | sed -e 's/rdfs:label/rdfs:Label/' > bodem-en-ondergrond.csv
