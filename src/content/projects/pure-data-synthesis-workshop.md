---
title: Elysium
slug: elysium
draft: false
description: A software instrument for creating drone-based textured soundscapes.
categories:
  - music
tags:
  - tools
  - performance
year: 2026
location: Outer Space
featured: true
featuredImage: /images/uploads/Screenshot 2026-02-11 at 11.01.51.png
videoUrl: https://youtu.be/gBaBZgYGAqQ
technologies:
  - Plugdata
  - DSP
  - Audio Synthesis
  - VST plugin
links:
  paper: ''
  video: ''
  github: ''
publishedDate: 2026-03-03T01:00:00
relatedProjects:
  - customer-education-framework
---

# Elysium

Elysium is a software synthesizer where you can build and evolve textured harmonic layers of drone-based bliss from scratch.

Using additive synthesis, construct chords of sine waves, control movement, add layers, apply distortion and reverb, sit back and bliss-out.

## Technical Implementation

Elysium is built using the free/open source [plugdata](https://plugdata.org/) environment for the Pure Data visual programming language. This started life in a different guise years ago as an iPhone app, but I recently rewrote it for the modern world as a plugin directly for the DAW.

I refactored the patches from the (now defunct) pd-extended library, to run in pd-vanilla. This will (someday) allow me to compile it in Heavy for C++/native VST development but the UI layer for that is a different (and very time consuming) prospect. I'm saving that for another day.

## Download

The download file is a .pd patch. It's free and fully editable, so you can open it up and explore under the hood. You can even modify and extend it to do new things.

**Requirements:** To run Elysium, you need to download and install [plugdata](https://plugdata.org/)  (Win, macOS, Linux). plugdata runs as standalone application or as a VST3, LV2, CLAP or AU plugin, meaning you can host Elysium in a DAW as a plugin to record, perform, and edit it's sounds.

:::buttons

Download Elysium | https://drive.google.com/drive/folders/1XcE3oPNnAbdeZBCo7WURzrYtQHAW0qkt?usp=drive_link | outline

:::

**Outstanding Tech Tasks in v1**: Add DAW parameter controls for automation.

Here's some screenshots of what's under the hood:

![Elysium organs](/images/uploads/elysium-organs.png "Organ banks")

![Elysium DSP](/images/uploads/elysium-dsp.png "Core DSP subpatch for the 3 voices. Note the Distortion, Modulation, and Chorus subpatches for each voice and the global reverb unit (uses rev3~)")
