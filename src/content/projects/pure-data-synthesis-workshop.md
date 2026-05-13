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
featured: false
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

I refactored the patches from the (now defunct) pd-extended library, to run in pd-vanilla. This is to allow me to compile it in Heavy for C++/native VST development.

The synth consists of 3 banks of oscillators. Pure sine waves, Harmonic notes, and Organ notes (both the Harmonic and Organ notes are additive sine functions). Each bank two sets of 8 notes of identical pitches. You adjust the volume levels of the pitches to build chords that cross-fade from one to the other. You can set the base pitch of note 1, the the octave, and the scale which determines the relative pitches across the bank.

Each bank has a set of controllable effects, including chorus, distortion, and modulation (both AM and FM for wilder effects), and they all finally pass through a global reverb unit "Space" that has controllable characteristics. The modulation unit is based on an old analogue Throbbing Gristle device, but it's my own interpretation of it.

## Download

The download file is a .pd patch. It's free and fully editable, so you can open it up and explore under the hood. You can even modify and extend it to do new things.

**Requirements:** To run Elysium, you need to download and install [plugdata](https://plugdata.org/)  (Win, macOS, Linux). plugdata runs as standalone application or as a VST3, LV2, CLAP or AU plugin, meaning you can host Elysium in a DAW as a plugin to record, perform, and edit it's sounds.

:::buttons

Download Elysium | https://drive.google.com/drive/folders/1XcE3oPNnAbdeZBCo7WURzrYtQHAW0qkt?usp=drive_link | outline

:::

Here's some screenshots of what's under the hood:

![Elysium organs](/images/uploads/elysium-organs.png "Organ banks")

![Elysium DSP](/images/uploads/elysium-dsp.png "Core DSP subpatch for the 3 voices. Note the Distortion, Modulation, and Chorus subpatches for each voice and the global reverb unit (uses rev3~)")
