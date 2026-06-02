---
title: Tides
slug: tides-bbd-resonator-synth
draft: false
description: A polyphonic synthesiser built around a BBD-style resonator. Karplus-Strong pluck meets self-oscillating filter meets tuned reverb.
categories:
  - music
tags:
  - composition
  - performance
year: 2026
location: The depths of the ocean
featured: false
featuredImage: /images/uploads/tides-ui.png
videoUrl: ''
technologies:
  - '- C++'
  - '- JUCE'
  - '- BBD delay line emulation'
  - '- Polyphonic synthesis'
  - '- MPE'
links: null
publishedDate: 2026-06-02T10:21:00
---

# Tides

I've always had a soft spot for instruments that aren't quite filters and aren't quite synths, the ones that _sing_. 

Karplus-Strong plucks, self-oscillating ladders, comb filters fed back into themselves until they tune. There's a particular character to a resonator being _excited_ rather than a waveform being _filtered_, and after the [St. Barts Reverb plugin](../../projects/st-barts-reverb-plugin) I wanted to spend some time chasing it.

Tides is the result. A free polyphonic synthesiser (Standalone, VST3, AU) built around a bucket-brigade-style resonator, with six voice groups, a fully patchable modulation matrix, MPE support, and 33 designed factory presets. I built some early prototypes in Max, you can hear the results on [Beyond the Beyond](../../projects/dying-tides-beyond-the-beyond/).

![Tides main editor](/images/uploads/tides-ui.png "The Tides editor — exciter, envelope, BBD resonator, output, quad LFO, modulation matrix, and a live viz strip")

## The premise

A BBD (bucket-brigade device) is an analogue chip that shuttles a sample of audio along a chain of capacitor "buckets" once per clock cycle. It was the secret behind those gorgeous late-70s chorus, flanger and analogue delay pedals: short, lossy, warm, with a soft top end that took on a life of its own when you fed it back into itself.

Take that delay-line behaviour, set the loop length to a musical pitch, feed it a short burst of energy from an oscillator or noise source, and you've built something that rings like a string and decays like a hall. Crank the feedback up another notch and the resonator self-oscillates — it stops needing the input at all, and you've got a polyphonic singing voice that follows the keyboard.

That's the whole instrument. An exciter, a feedback loop, and the dance between them. Everything else in Tides is in service of making that path expressive and playable.

```plain
      ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌────────┐
MIDI → │  EXCITER  │ → │ RESONATOR │ → │  OUTPUT   │ → │ MASTER │ → out
       └───────────┘   └───────────┘   └───────────┘   └────────┘
              ▲              ▲                ▲
              └─── modulation matrix (9 sources × everything) ───┘
```

## How it works

### 
The exciter

The exciter is where the energy comes from. A continuous morph through five waveforms (sine → triangle → ramp → pulse → square), crossfaded against a noise generator with a sample-and-hold rate of its own. A short, plucky envelope gives you Karplus-Strong-style strings; a long sustained envelope into the loop gives you a bowed pad. The exciter is also routable to an external audio input, so you can run guitars, vocals, anything you fancy through the resonator.

### The BBD resonator

The heart of the instrument. A delay line tuned to the note's frequency, with three controls:

- **Input filter -** how much of the exciter actually reaches the loop. Pull it down to keep bright sources from screaming.
- **Feedback** - how resonant the loop is. At 0, you hear a single tap. Around 0.5, you've got a tuned reverb. Past about 0.85, the loop self-oscillates indefinitely; the exciter becomes optional.
- **Feedback filter** - a tilt in the feedback path. Higher = brighter, longer rings; lower = the energy decays into softer overtones each pass.

There's also a **Wild/Tame** macro that modulates the loop's internal noise floor, drift, per-voice detune and soft-clip drive. Fully tame, you get a clean precise model. Pushed to wild, you get something that breathes, drifts and occasionally overshoots — closer to a piece of analogue hardware that's been around a while.

![Engine: exciter, resonator and output](/images/uploads/tides-ui-engine.png "The exciter feeds the resonator, the resonator feeds the output. Three panes for the entire DSP path.")

### Modulation, properly

Modulation is the bit that makes a synth feel like an instrument rather than a calculator. 

Tides has nine sources (four LFOs, the envelope, velocity, key-follow, aftertouch, mod wheel) and every continuous parameter can be a destination, including the preset morph slider. Each source has a master macro so you can sweep everything that source is driving from a single knob.

I built a click-to-assign workflow so you can patch without ever leaving the panel. Tap a source tile to arm it, then click any knob on the synth — a connection lights up at +50% depth. Click the same knob again and it bumps to +100%, then back down through zero to -100%. A little triangle-wave traversal of the whole range from one gesture. Every modulated knob shows a coloured arc around its bezel for the modulation's excursion, and an animated dot riding along where the live value currently is.

![Quad LFO and modulation matrix](/images/uploads/tides-ui-mod.png "Quad LFO panel on the left, modulation matrix on the right. Tiles light when active; the W↔RND knob crossfades each LFO between periodic waves and sample-and-hold.")

### Voice groups

A voice group in Tides is a complete synth - its own patch, its own MIDI channel, its own polyphony. There are six of them. You can layer all six on channel 1 for an absurdly thick stack, split them across channels for a multi-timbral rig, or focus down to just one and use the others as silent variation slots.

There's a preset morph slider that takes any two factory presets as endpoints and crossfades the focused voice between them - all 20 continuous parameters, all LFO settings, all macros interpolate at sample-block rate. Mod connections survive the morph, so you can build a patch where the modulation routing is fixed and the entire underlying sound morphs around it.

### Quality switch

Resonators are nasty to oversample naively. Feed them aliasing and they ring it back at you forever. There's an Eco / Std / HQ quality switch on the group bar: 1× / 2× / 4× internal upsampling around the feedback loop. Eco is great for live work; HQ is for mixing and gives you noticeably cleaner top-octave behaviour. Switching is live; the engine crossfades the new sample-rate state over a few milliseconds.

### MPE

Lower-zone MPE is in there. Per-note pitch follows the slide. Per-note pressure routes to the AT modulation source so you can map it to anything, including feedback amount, Wild/Tame, resonator pitch, dry/wet, whatever you need. Channel-mode MIDI works fine if you don't have an MPE controller.

## Design notes

The whole editor is a single procedurally-drawn interface — no PNG assets, no fixed pixel layouts, everything resolves from a colour-token system and font helpers at runtime. That made the iteration loop on the UI extremely fast, but it also means the entire visual style is in version control as readable code. The two-wave icon you see in the top bar (and now on the app itself) is literally rendered by the same function in the plug-in and in a Python script that generates the `.icns`.

There are 33 factory presets across eight categories: plucks, pads, self-oscillating tones, basses, bell/metallic textures, strings, glitchy random things, and multi-voice layered stacks. Each one ships with designer notes explaining what technique it's showing off.

## Download

Free. Standalone, VST3 and AU. macOS, Apple Silicon.

The download includes a quick-start README and two PDFs — a friendly user guide and an exhaustive parameter reference (including all the expected quirks like the LFO knobs visually freezing during morph mode).

:::buttons

Download Tides v1.0 | https://drive.google.com/drive/folders/14Ep0xOujQhGEusdxb-kggNDaMHdMCfhx?usp=sharing | outline
:::

> _macOS will warn that Tides is from an unidentified developer the first time you open it — that's because it's ad-hoc signed rather than notarised. Open System Settings → Privacy & Security and click "Open Anyway" once, and you're good._
