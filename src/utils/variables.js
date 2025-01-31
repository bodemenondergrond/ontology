'use strict';
import yaml from 'js-yaml';
import fs from "fs";


const config = yaml.load(fs.readFileSync('./source/config.yml', 'utf8'));

const prefixes = Object.assign( {}, config.skos.prefixes, config.prefixes, { '@base' : config.skos.prefixes.concept })

const context = JSON.parse(fs.readFileSync(config.source.path + config.source.context));

const context_prefixes = Object.assign({},context , prefixes)

const virtuoso = config.deploy.virtuoso ;

const frame_skos_prefixes = {
    "@context": context_prefixes,
    "@type": ["owl:Ontology", "rdf:Property", "rdfs:Class", "rdfs:Resource", "skos:Concept"],
    "isDefinedBy": {
        "@type": "owl:Ontology",
        "@embed": "@never",
        "@omitDefault": true
    },
    "domain": {
        "@type": "rdfs:Class",
        "@embed": "@never",
        "@omitDefault": true
    },
    "range": {
        "@type": "rdfs:Class",
        "@embed": "@never",
        "@omitDefault": true
    }
}

const frame_skos_no_prefixes = {
    "@context": context,
    "@type": ["http://www.w3.org/2002/07/owl#Ontology", "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property", "http://www.w3.org/2000/01/rdf-schema#Class"],
    "isDefinedBy": {
        "@type": "http://www.w3.org/2002/07/owl#Ontology",
        "@embed": "@never",
        "@omitDefault": true
    },
    "domain": {
        "@type": "http://www.w3.org/2000/01/rdf-schema#Class",
        "@embed": "@never",
        "@omitDefault": true
    },
    "range": {
        "@embed": "@never",
        "@omitDefault": true
    },
    "subClassOf": {
        "@type": "http://www.w3.org/2000/01/rdf-schema#Class",
        "@embed": "@never",
        "@omitDefault": true
    },
    "subPropertyOf": {
    "@type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property",
        "@embed": "@never",
        "@omitDefault": true
},

}

const ttl = config.skos.path + config.skos.name + '/' + config.skos.name + config.skos.turtle

const nt = config.skos.path + config.skos.name + '/' + config.skos.name + config.skos.nt

const jsonld = [config.skos.path + config.skos.name + '/' + config.skos.name + config.skos.jsonld, frame_skos_prefixes]

const csv = [config.skos.path + config.skos.name + '/' + config.skos.name + config.skos.csv, frame_skos_no_prefixes]

export {
    virtuoso,
    ttl,
    nt,
    jsonld,
    csv
};