---
title: Pulsing Pi
slug: pulsing-pi
draft: false
description: A device that composes music on-the fly based on your heart rate.
categories:
  - music
tags:
  - tools
  - therapy
  - composition
year: 2016
location: Cambridge, UK
featured: false
featuredImage: ''
videoUrl: https://vimeo.com/184522319?fl
technologies:
  - Heart Rate Detection
  - Raspberry Pi
  - Arduino
  - BBC micro:bit
  - Pure Data
  - Audio Synthesis
links: null
publishedDate: 2026-02-11T20:49:00
---

# The Pulsing Pi 

The Pulsing Pi monitors your heart beat  and converts it into music in real-time. The music depends on the properties of your heart beat and is unique to you.

Inspired by [a news story](http://www.huffingtonpost.com/2014/07/02/recorded-heartbeats-brian-schreck_n_5552019.html) about a man who recorded the heartbeats of terminally ill children and turned them into music, I’d been wanting to do something with music and heart beats, as well as have a play with the Raspberry Pi, for some time. The chance to delve into these areas came in the form of a hackathon at ARM (where the aim was to build something novel using ARM powered technologies), and the Pulsing Pi project was born.

The aim of this project was to create a new piece of technology that measures a user’s heartbeat, something very personal, and reflects it back to you audibly so you can hear it in a novel musical way.

The rhythm of your heart is totally unique to you. The Pulsing Pi listens to the rhythm of your heart and uses it to compose music. The internal algorithm is designed to compose music that reflects your current physiological state and any recent changes. The device generates music in real-time using a range of creative mapping strategies in order to interpret the behavior of your heart beat and translate it into something musical that is different every time you turn it on.

Besides being a fun way to see and hear what your heart is doing, the Pulsing Pi could have some medical applications. For example, a device that could understand the implications of your heart rhythms could help to soothe issues such as anxiety, stress, and depression. Heart rate is strongly associated with physiological arousal (linked to emotions and alertness), which can also be induced by musical properties such as tempo and harmonic relationships. Such a device could also be used to engage children with heart conditions and provide a new means of bio-feedback to help regulate heart rate.

The device was programmed to run standalone. That is, once powered on, it needs no configuration and begins generating music when a heartbeat is detected. The music stops when the heart rate monitor is not being worn, allowing the device to seamlessly switch between users.

## Hardware used

The device uses the following hardware:

- Raspberry Pi B+ (I upgraded to the Pi 3 to be able to handle all the DSP). This is the main host, running the algorithmic composition software and synthesizing digital audio in real-time (built using Pure Data). The Pi is powered by a micro-USB connection.
- Arduino microcontroller. This interfaces the Raspberry Pi with the external components. These include the heart rate monitor (HRM) and the LEDs. The Arduino is powered by, and interfaces with the Pi, through a USB connection directly to the Pi board.
- Polar Heart rate monitor (HRM). This includes an electrode strap and a wireless receiver board.
- Micro:Bit. We leveraged its accelerometer to provide some physical interaction. I mapped this some sound FX parameters so that sound changes when you tilt the box in different directions.
- LED matrix connected to the Arduino is used to display the heart beat to the user.
- A loudspeaker connects to the Raspberry Pi’s digital to analogue converter (DAC) output socket.
- A wooden enclosure with a heart shaped window in the top. The window holds the LEDs and makes the components contained in the box visible to the user. The box is decorated to look like a music box.

The software and libraries used are:

- Arduino IDE for Linux Raspbian. I used the ‘Standard Firmata’ protocol for the Arduino.
- Pure Data for Raspbian Wheezy. An open source programming environment that converts C code into patchable objects for rapid prototyping of creative applications. Used for reading the heart beat signal, feature extraction, mapping algorithms, sound synthesis, and LED control.
- PDuino. A library for communicating directly to Arduino ports.

### Heart beat feature extraction and music mappings

Synthesizing, sequencing, and playing digital audio on-the-fly is CPU hungry, especially when combined with real-time control from an external source. To deal with this, audio is rendered at low quality (22KHz sample rate, mono) which results in a degradation of sound quality. Getting the music program efficient enough to run and also produce a range of sounds that could be controlled by the heart rate took considerable effort. The bit-crushed low-resolution sound is utilized in the sounds generated by the device to give the sound of a retro-style games console that actually sounds like it might be slightly broken!

To make the music less formulaic and predicable, some algorithmic composition methods are used. These include mapping input values to predetermined stochastic ranges, and applying some fixed probability to the musical outcomes based on the sequence of input values using Markov chains. These help to alter the characteristic of the sounds so that the music does not sound too repetitive but still reflects the heart rhythm.

The software is programmed to extract the following features from the signal received from the Polar strap and then apply them to musical mappings.

#### Pulse

The real-time pulse is measured for direct mappings to the music engine and the LEDs. This provides both a visual and audible pulse.
The pulse is mapped to the rhythm of the piece and the flashing onsets of the LEDs. The drum sounds are triggered by the pulse across steps of a pre-programmed sequence (the number of steps is determined by the variability and heart rate direction).

#### BPM

The BPM of the heart rate is the determined based on the previous 6 pulses to provide an accurate approximation. In early tests, our BPM algorithm recorded similar results as a Tomtom heart rate monitor during rest, which indicated that were getting reasonable accuracy.

#### Heart rate zone

The BPM is categorized into different heart rate zones, commonly used in monitoring exercise and training, and also medically associated with levels of physiological arousal and stress. The BPM is monitored across windows of 8 pulses. The mean BPM across the pulses is used to determine the heart rate zone of the window.

The heart rate zones are mapped to a number of musical features. First, the zone selects the oscillator bank of the pad sounds, the key that the oscillators play in, and the individual pitches of the chords. For example, when zone 1 is read a bank of sine waves is selected and notes from the key of C minor are assigned to the chord bank. In zone 2, the oscillators are triangle waves, zone 3 sawtooth waves, zone 4 square waves, zone 5 square waves and filtered white noise, and zone 6 white noise (with different banks of pitches respectively. Lower heart rate zones sound softer and sadder (minor chords), whereas higher heart rate zones sound harsher and more prominent (square waves and white noise). At the end of each window a chord and oscillator bank are selected (Markov model), and the rate of amplitude modulation of the chords is selected, relative to the heart rate zone.

Heart rate zones are also mapped to the amount of drum sounds enabled. There are five drum sounds (kick drum, snare 1, snare 2, hi hat, and percussive effects – synthesized using a variety of techniques) We did originally have more sounds synchronized with the percussion including bass and lead, but these were sacrificed for performance! Nine combinations of drum sounds are defined, and these are selected via a Markov model depending on the heart rate zone. In lower zones it is more likely that less drum sounds are turned on, and in higher zones it is more likely that more drum sounds are enabled.

#### Variance

The statistical variance of the heart rate BPM is determined across windows of pulses. This is indicative of changes in exertion, mood and attention. Variance, like BPM, is calculated across a window of 8 pulses. Variance as a mapping input is used alongside BPM direction (i.e. has the BPM increased or decreased since the last measure). When variance either is high or low, the direction of the heart rate ( incremental or decremental) is indicative of the rate of the heart rate’s increase or decrease. Variance is mapped to the speed of the drum sequence which is relative to the division of steps within the pattern.

#### Movement

OK, so nothing to do with heart rate, but we decided that adding a means of physical interaction with the device would be be fun and also allow us to integrate another piece of ARM technology. We mapped the accelerometer of the Micro:Bit to some global musical parameters, such as filter cutoff and volume, to give an added dimension to the device. We interfaced the Micro:bit with the Arduino’s analog inputs for direct communication into Pure Data.
