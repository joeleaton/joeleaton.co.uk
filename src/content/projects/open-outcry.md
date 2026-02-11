---
title: Open Outcry
slug: open-outcry
draft: false
description: An interactive opera based on the highs and lows of the trading floor.
categories:
  - music
tags:
  - performance
  - research
year: 2013
location: Mansion House, London, UK
featured: false
featuredImage: ''
videoUrl: https://www.youtube.com/watch?v=_FVMTvtYvIc
technologies: []
links: null
publishedDate: 2026-02-11T20:45:00
---

# Open Outcry

Open Outcry is an interactive Opera that was first performed live in the Egyptian Hall, Mansion House in the heart of the City of London on the 14th November 2012. Open Outcry was produced by Barclays Wealth.

I was the technical lead for this innovative production in the heart of London's financial district. I programmed the interactive stock market that traders traded against using real money (backed by Barclays) during the performance (yes, that's me in the video, immersed in my laptop during rehearsals).

The market had to abide by rules, react to external events, triggered by the conductor, handle transactions in real time, yet work within reasonable constraints so it didn't lose Barclays a tonne of money!

## The premise

12 classical singers act as traders in this experimental piece which questions how peoples personalities affect their financial decision making, risk taking and spur of the moment trading; the essence of behavioural finance studies. This half an hour long performance attempted to capture a period of intense financial activity of individuals who are trading with each other with melodic, harmonic and dissonant phrases of song.

They trade real money against the stock market that I built which fluctuates sporadically, and relative to the conductor. Given that they were trading real money (well, Barlcays' money), the market needed to be water tight, so a crash course in financial modelling and stock market simulations was needed!

## Building the Market

I built the stock market engine as a stochastic 3 asset model (a Monte Carlo simulation normal distribution) which follows the prices of the the assets at monthly periods over 10 years (condensed to 30 mins). The assets all have the same starting price, but different variables allow them to move independently and relative (using correlation coefficients) to each other. The market uses a transitional matrix (Markov chain) to move between three regimes; normal, boom and bust; which changes the parameters of the model accordingly. These regimes are also manually assignable by a conductor during a live performance.

### Performing with a Market

Open Outcry was performed live in Mansion House, City of London. The 12 singers were placed on podiums around the edge of the hall, and each performer's portfolio was displayed on large screens alongside the market changes - all updated in real time. Market administrators recorded trades between performers and I, as market coordinator, input these into the market which reacted accordingly. Trades and portfolios were reflected in the screen displays, so that performers and the audience could keep track of activity.

During the performance, and to encourage trading, the cash in traders' portfolios was reduced by a factor of 0.2% every period. To counter any negative effects of this, or from over trading a 'quantitative easing' button was on hand, to inject an equal sum of cash back into traders' portfolios.

Trades were entered into the system during the performance to be displayed on screens around the hall for traders to keep rack on their portfolios. Although, to prevent negative trading some rules were implemented to the model in case traders attempted to buy with money they didn't have, or sell assets they didn't already own. A feedback system from the trading had a direct effect on the market using weighted values against buy or sell initiated trades; at every period the feedback model would analyze the last 12 period of trades and apply the effects on the market accordingly. With this in place influence of the local market will phase in gradually over the first 12 periods. It also meant that the singers can influence the final values simply through optimism or pessimism.

_Open Outcry cast – Premiere London November 2012_
![Open Outcry cast – Premiere London November 2012](/images/uploads/OpenOutcryCast-1.jpg "Open Outcry cast – Premiere London November 2012")
