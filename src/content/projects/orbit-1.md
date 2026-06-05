---
title: Orbit
slug: orbit
draft: false
description: Dual-engine granular modulator with stochastic controls and cross-feedback
categories:
  - music
tags:
  - tools
  - composition
year: 2026
location: Parallel Universes
featured: true
featuredImage: /images/uploads/orbit.gif
videoUrl: ''
technologies:
  - C++
  - JUCE
links: null
publishedDate: 2026-05-10T20:04:00
---

I made Orbit during the making of the tracks that turned into [Beyond the Beyond](https://joeleaton.co.uk/projects/dying-tides-beyond-the-beyond/). I struggled to find a tool that could do what I wanted for processing vocals and synths,  in a rhythmic way and also in a way that blurred rhythmic layers together to create something less rigid and clean, something that could sound almost celestial and otherworldly. 

I also wanted to _see_ what was I doing to incoming sounds as I was affecting them, getting visual feedback and a novel interactive layer of control beyond knobs and sliders, to help guide the way I can affect the sonic characteristics. Thus, Orbit was born.

The first version didn't have the interactive canvas layer, that came later as I wanted to bring the visual representation, of what was happening sonically, to life. 

I'll upload some audio examples and a video demo soon!

## So what is Orbit?

Orbit takes incoming audio and feeds it into a 10-second stereo ring buffer. Two independent engines  (A and B) read from that buffer simultaneously, each extracting overlapping grains at different positions, sizes, and densities. The result is everything from subtle textural doubling to full-blown granular destruction, depending on how far you push it.

## What it does

Feed Orbit any audio source,  vocals, synths, drums, field recordings, and it splits processing across two parallel engines. Each engine has three stages:

**Modulation → Granular → Gate**

The **modulation core** (GristleOsc) generates LFO or audio-rate modulation from 0.01 Hz to 2 kHz across five waveshapes: sine, triangle, saw, square, and _gristle_ (inspired by Chris Carter's analogue machine _The Gristlizer_) _-_ a sample-and-hold variant that's been soft-clipped through `tanh` for a blown-circuit character. This modulation drives either amplitude (tremolo/chopping) or frequency (metallic, FM-synthesis textures). A pink-noise jitter layer built on the Voss–McCartney algorithm adds organic frequency drift, the kind of instability that makes things feel alive rather than robotic. This is actually a reuse/extension of the modulator I built in [Elysium](https://joeleaton.co.uk/projects/elysium), but in Orbit it's designed for an incoming audio signal not a drone synth.

The **granular engine** reads from the shared ring buffer using Brownian-motion scanning. Rather than looping a fixed region, the read position drifts stochastically - each grain starts from a slightly different spot, governed by the spray parameter. Up to 64 grains can overlap simultaneously, each with a Hann-window envelope, independent pitch ratio via linear interpolation, and Gaussian-distributed stereo panning. Density compensation (`1/√n` normalization) keeps levels stable whether you're running 2 grains or 48.

The **probability gate** is a rhythmic chopper synced to a DAW's tempo. At each beat subdivision (1/2 through 1/32), it rolls a random number against the probability threshold level and if it passes, audio flows; if not, it outputs silence. Each gate event also randomizes stereo placement, creating spatial movement locked to the rhythm.

## The cross-feedback matrix

This is where Orbit gets interesting and goes beyond other modulation tools. Engine A's output feeds back into Engine B's grain input, and vice versa. At low feedback (0.1–0.3), this adds subtle harmonic interaction between the two engines. At high feedback (0.6+), the engines start building on each other recursively, textures evolve, timbres shift, and the output becomes something neither engine could produce alone. A `tanh` soft-clipper on the feedback path prevents runaway distortion while preserving the organic buildup.

## The Orbit canvas

The central visualization doesn't just represent the engines orbiting, it's a control surface. Each engine is represented as a ring whose position and size map directly to parameters:

- **Drag the ring body** to scrub grain position (X axis) and jitter amount (Y axis — up means more chaos)
- **Drag the radius handle** to resize the grain window (exponential feel via skew mapping)
- **Drag the playhead** (the dot orbiting the ring) to adjust modulation frequency with logarithmic scaling, so small movements at low frequencies give fine control, the same gesture at high frequencies jumps octaves

Beyond these, I wanted a way to add some additional stochastic movement through the interface. **Gravity wells** let you place up to four spatial attractors on the canvas. These warp the orbit paths toward them using a smoothstep falloff, visually distorting the rings and influencing how the engines interact spatially.

![orbit's gravity wells](/images/uploads/orbit.gif "Orbit with 4 gravity wells placed on the canvas")

And if you look closely (well, very closely as I ended up burring it deep so it wasn't a distraction) a spectrogram runs behind the orbits shows the real-time frequency content of the output.

## Under the hood

- **Zero latency. N**o look-ahead or pre-buffering is a big deal for CPU load. Input hits the ring buffer and is immediately available for grain extraction.
- **Lock-free audio thread.** All parameter reads use atomics via JUCE's AudioProcessorValueTreeState. No mutexes, no priority inversion, no glitches.
- **10-second stereo ring buffer** (\~1 MB) shared between both engines. The older audio is naturally overwritten as new input arrives
- **One-pole parameter smoothing** (\~5 ms) on all continuous parameters prevents clicks during automation
- **Pink noise via Voss–McCartney** — 16 octave rows updated per sample based on trailing-zero counting, producing proper 1/f spectral rolloff for the jitter layer
- **Constant-power panning** on both the per-grain spatial placement and the gate's stereo randomization (`cos/sin` split).

## Parameters at a glance

Each engine exposes: Mod frequency (0.01–2000 Hz, log-skewed), mod depth, waveshape, AM/FM mode, jitter, FM depth (0–96 semitones), grain position, grain size (skew 0.5), density (1–64), spray, chop division, chop probability, and pan modulation (±1).

Global controls: Cross-feedback (0–0.98), dry/wet mix, and master gain (−60 to +6 dB).

8 factory presets ship with the plugin,  including _Gravity Field_ (4 gravity wells demonstrating spatial warping) and _Industrial Metallic_ (audio-rate FM with high jitter).

## Get Orbit for free!

VST3 + AU + Standalone for macOS. Built with JUCE 8 / C++17.

:::buttons 

Download Orbit| https://drive.google.com/drive/folders/10ilgpJ4laTgBp1uZQcEHLcLT-TMSEwHW?usp=sharing | outline

:::

> _macOS will warn that Orbit is from an unidentified developer the first time you open it — that's because it's ad-hoc signed rather than notarised. Open System Settings → Privacy & Security and click "Open Anyway" once, and you're good._
