
Bastards, Thieves and Pirates
=============================

**A single-player browser-based space strategy game.**

It's space combat through a scanner (darkly).

Fire your lasers, shoot your photo torpedoes, send all power to the shields, keep an eye on the numbers, watch the hull damage.

Play a part-finished almost-game at: http://deviouschimp.co.uk/misc/btp/

![Screenshot](http://deviouschimp.co.uk/misc/btp/screenshot.png)

Your ship
---------

It's called The Heavy Hawk. It can warp a large distance when the warp drive is charged. It has a *hull* which can be damaged. If hull reaches 0 - game over, man. It has different sections which can be damaged individually. These sections influence how well your ship dodges, shoots, charges etc.

Your crew
---------

** Names are from donjon.bin.sh/scifi/name/#terran_male and are subject to change any time I can think of better ones. **

### Jase Barner ###

Fearless captain and pilot. Knows his shit. Keep this guy alive to keep dodging incoming weapons, warping to safety

### Harry Raige ###

Weapon specialist with anger issues.

### Patry Gibbon ###

Grease monkey engine expert.

Ship Sections
-------------

### Shield ###



### Engine ###



### O2 ###



### Medic ###



### Weapons ###



### Bridge ###

Enemy Ships
-----------

In this sector of space there are four ships. Yours is one of them, the others are filled with, respectively, bastards, thieves and pirates.


### Bastards ###

They want to hurt you.


### Thieves ###

They just want your stuff and they'll try to be sneaky about it.


### Pirates ###

Want your stuff and they won't ask nicely.



How stuff works
===============

    Name        Notes
    ---------------------------------------------
    lasers      These are powered by power.
    warp        Cooldown time after warping.
    
    READOUTS
    ---------------------------------------------
    missiles    Used when fired.
                Do not replenish.
    hull        While 0, oxygen drops.
                Reduced by enemy weapons, increased by `repair` section.
    oxygen      While 0, crew health drops.
    power       Alters effects of lasers, shields & engines.
    power       Alters effects of lasers, shields & engines.
    fuel        While 0, cannot warp.
    
    SECTIONS
    ---------------------------------------------

    Each section has a maximum power. This can be reduced when hit by enemy weapons and replenished by the repair section. The ship itself has a limited amount of power to distribute between sections. This distribution is controlled by the player.

    shield      Limit damage to ship.
      power     Damage to ship is limited in relation to this amount.
    
    engine      Allows the ship to warp and dodge weapons.
      power     Must be above 0 to warp. Greater power means better dodging.
    
    O2 Gen      Regenerates O2 for the crew to breathe.
      power     While above 0, oxygen regenerates in relation to this value.
    
    medic       Repairs crew health.
      power     While above 0, crew health regenerates in relation to this value.
    
    weapons     Powers missile launchers and lasers.
      power     While 0, cannot shoot. While higher number means more accurate weapons.
                All weapons require power to the weapons section to fire.
    
    repair      Repairs ship sections max power.
      power     Sections max power increases in relation to this amount.

    CREW
    --------------------------------------------- 
    crew        When all crew health hits 0 - game over.

    TICK
    --------------------------------------------- 
    Every `x` amount of time the following happen:

    * `Oxygen` is reduced by 1, also reduced further if `hull` is 0. 
      increased in relation to `O2 Gen` power, 
    * Crew `health` regenerates in relation to `medical` power.
    * Weapon cooldowns regenerate in relation to `weapons` power.
    * Warp cooldown regenerates in relation to `engine` power.
    * Ship sections' max power and hull regenerate in relation to `repair` power.
