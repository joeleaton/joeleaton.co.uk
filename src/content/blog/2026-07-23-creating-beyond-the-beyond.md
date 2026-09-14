---
title: Creating Beyond the Beyond
slug: creating-beyond-the-beyond
draft: true
description: New workflows and tools for unlocking a path to finishing
category: music
tags:
  - case-study
publishedDate: 2026-07-23T12:31
featured: false
featuredImage: ''
readTime: 10
---

Producing Beyond the Beyond was a labour of love. But finishing it was the hardest part. I've been tinkering away for years, making half-finished tracks, quarter-finished tracks, well who am I kidding, nothing was ever finished. 

I read an article on a music production blog many years ago that argued that finishing electronic music, and more specifically the tension between what you gain by playing and creating music through the art of exploring, vs the need to finish was simply a pull being driven by capitalism.

And in a way, reading that article helped me justify how I felt about exploring and playing with music. Find something of interest, get lost in pushing it around and shaping it in different ways for a while. Then put it down and move on to something else - either in life or come back next week and tinker with a new thing. 

Finishing something to share with our demands an entirely different approach. When you're exploring for fun, you're not saying anything to anyone. You're not considering a listener or an interpretation of what you're doing. 

I'd been building loads of modulation ideas in Max for Live and Ableton over the years into little nuggets of music, but for this project I was on the look out for some ideas that could help me move from idea to track much faster than I was used to, as like many people I've been hampered by the weight of the speed of getting ideas into finished music.

So I spent a lot of time crafting a workflow to put these tracks together. I created a lot of rules to help move things along fast, even some rules on the fly just to keep moving and not get stuck. 

The overall feel was heavily inspired by what I was reading at the time. Henry Vaughans _Silex Scintillans_, Blake's _Songs of Innocence and Experience,_ and more recent writing about microhistory including the brilliant _The Rising Down_ by Alexandra Harris - landscapes formed form muted interwoven lives across centuries underpinned by doctrine and ritual. These songs are my pictures of landscapes and place alive with the gravity of accumulated human experience, beyond just the scenery. 

## Starting point

Three of the tracks were born in a customised version of Tim Exile's Scapeshift. Scapeshift is a rules based pattern engine that generates ideas and allows you to manipulate them in some pretty deep ways. I got under the hood and made some changes towards getting shapes of patterns and phrases that really spoke to me (yeah, I changed the UI and the name to Neurobloom for fun too but hey - credit to Tim for actually building it).

As much as the pattern generators in Neurobloom are good, the synthesis engines just make everything sound like Tim's music. Don't get me wrong, they're really good - especially the bass synth, but it sounded like I was making his music from the off. Neurobloom is a a Reaktor instrument, and as such doesn't simply spit out midi that can be used easily in a DAW (in fact the first version didn't do MIDI out at all). To separate midi across channels in Ableton Live, I built a M4L device that extracted the MIDI signals and made it easy to split them across channels in Live. The device even allows you to route the resulting audio from other plugins (or synths) back into Neurobloom for it's mastering chain, which adds some really like dynamic life and overall glue to the patterns.

## Pick a preset, move on

Once I had the MIDI coming into Ableton, I stayed in the box for the sounds - other than using my Behringer Model D for some bass lines). 

I captured patterns, edited them, edited more and more, then started applying different plug-ins for the sounds. 

Around this time I read an interview with Four Tet on some of his production techniques. I remember the revelation of him saying how he just doesn't have the time to spend dicking around tweaking synth parameters to the _n_-th degree, and in fact how he very often just scrolls through the presets and settles on one that fits. Well, I do like dicking around to the _n-_th degree but being on the lookout for new ways to finish things and not procrastinate I adopted this approach quite a lot!

For example, the  sounds for the main drum beat in _Marks of Weakness, Marks of Woe_ are a preset from the awesome _Visco_ plugin. From memory, it was the first one I selected and it just worked.

[vsico screenshot]

# The edit-mix

Once the general arrangements were laid out, I did get pretty deep on the editing side of things. Anchoress was a pig, but I was almost mixing as I went so there wasn't really a final mixing stage per se - probably a side effect from going so deep with all of the side-chain compression, OTT compression and teasing out sounds to avoid the mud of chaos. 

# Vocals

I had earmarked both _Marks of Weakness_ and _The Sun and Her Worlds_ for vocals straight from the bat.

I'm fortunate to have a pretty sweet vintage mic to get a good source recording but that didn't mean I didn't make mistakes. 

Giving Fiona my open-back headphones for monitoring her soft voice while they were cranked up gav me so much bleed to contend with, which is never fun to work with. One happy accident from that session though was the sound of my wife screaming at the family from outside the room - I pushed it up a little in the mix just to add a little subtle something at a point that could have otherwise gone stale.

## Hidden bits of life

I think it might have been the same interview with Kieran from before where I heard him talking about producing the track _Skater_. The swooshing sounds on this were from an iphone recording of his daughter skating on a frozen lake. He says how he often interweaves unprocessed field recordings into his music just to give it a human, worldly quality.

I was really struggling with the sterile nature of _Before I Knew this place_ when I dug into my hard drive of field recordings, taken over the years. Adding some rain and winds from the woods gave that track the touch it was really missed, and connected what I wanted it to convey to the real world. 

I did the same for _While Yet in Dust._ Recordings of my kids playing a the swimming pool balanced life to a track that was primarily about death.

{image of neurobloom]

Starting places

- New workflow. Scapeshift
- Max utilities for MIDI

Decisions of speed

- Presets
- Stick with an idea
- Build around 'mistakes'

New sounds need new tools

-  [Orbit](https://www.joeleaton.co.uk/projects/orbit) was made for processing Fiona's vocals on The Sun and Her Worlds. For that, I wanted a grittier version of Output's Movement plugin. Tides was the result of emulating BBD-style resonant synth techniques in Max that underpin the synths in Anchoress and other tracks, and Life was born out of wanting to make a tool that could manage for all of the inter-track modulation chaos and brainstorms that came with making _Forward Motion Love_. 

Continuing on

- Inspiration for Life and Tides. Other tracks that _might_ see the light of day. Especially some of a similar vibe from over the years (Cakobau - add here, not finished)

End on a point about finishing. Having an end point, a goal. Closure. Progression
