---
title: The Space Between Us
slug: the-space-between-us
description: Collaborative BCMI performance exploring shared neural states between two performers
categories:
  - bcmi
  - music
tags:
  - performance
  - research
year: 2017
location: Berlin, Germany
featured: true
featuredImage: ''
videoUrl: https://vimeo.com/116013316
technologies:
  - EEG
  - Pure Data
  - OSC
  - Multi-brain BCMI
  - Emotion Detection
links:
  paper: ''
  video: ''
  github: ''
publishedDate: 2017-03-15
relatedProjects:
  - a-stark-mind
---

# The Space Between Us

A collaborative brain-computer music performance that explores the concept of shared neural states between a performer and the audience. Using dual EEG systems, the piece maps the similarities and differences in brain activity to musical parameters from a singer and an audience member.

## Concept

When two people share an experience, their brain activity can synchronise in measurable ways. This project asks:  what does that synchronisation sound like?  What happens musically when two minds drift apart? And what if the audience could direct a performance based on how they're feeling?

The Space Between us features the composer and pianist [Weiwei Jin](http://www.weiweijin.com/) on piano and composition, and  [Fiona Miller](http://www.fionasallymiller.co.uk/)  on vocals. The piece was performed at the 9th Conference on Interdisciplinary Musicology at the Museum of Musical Instruments, Berlin, Germany.

## Technical Implementation

Two people wear EEG headsets simultaneously. A custom Pure Data patch receives both data streams via OSC, computing real-time measures of inter-brain synchrony. These measures control harmonic, timbral, and rhythmic elements of the musical output by directing the score that the musicians play.

## Impact

This work contributed to the growing field of multi-brain BCIs and demonstrated new possibilities for collaborative human-computer performance.
