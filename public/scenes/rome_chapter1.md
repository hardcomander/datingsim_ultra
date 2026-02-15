# ROME KLINE - CHAPTER 1: "POST-PRACTICE VENTING"
**Character:** Rome Kline - Female college soccer starting player
**Setting:** Park bench, late afternoon

---

## SCENE: ROME_01_START

**Scene ID:** ROME_01_START

**NPC Dialogue:** 
*Rome drops onto the bench next to you, breathing hard* 
"Ugh, mind if I sit? I need a minute." *wipes sweat from her face* "Practice was a disaster. Our keeper let in three easy goals today. THREE. How are we supposed to win regionals if she can't even stop a basic shot?"

**Player Choices:**

**Choice A:**
- Text: "That sounds frustrating. Must be stressful for the whole team."
- nextSceneId: ROME_01_SUPPORTED
- statDelta: {affinity: +3, trust: +2, attraction: +1, comfort: +2, respect: +1}
- moodResponse: Happy

**Choice B:**
- Text: "Maybe she was having an off day? Everyone has bad practices."
- nextSceneId: ROME_01_CHALLENGED
- statDelta: {affinity: -1, trust: 0, attraction: 0, comfort: -2, respect: -1}
- moodResponse: Angry

**Choice C:**
- Text: "Wow, you look really hot when you're angry."
- nextSceneId: ROME_01_FLUSTERED
- statDelta: {affinity: +2, trust: 0, attraction: +4, comfort: -1, respect: +1}
- moodResponse: Surprised

---

## SCENE: ROME_01_SUPPORTED

**Scene ID:** ROME_01_SUPPORTED

**NPC Dialogue:**
*Rome sighs* 
"Right? Thank you! Everyone else is acting like it's no big deal." *stretches her legs* "Coach keeps saying 'be patient with her,' but we don't have time for patience. Regionals are in three weeks." *looks at you* "Sorry, I'm totally unloading on you. How's your day been?"

**Player Choices:**

**Choice A:**
- Text: "No worries, vent away. Sounds like you needed to get that out."
- nextSceneId: ROME_02_SUPPORTED_CONTINUED
- statDelta: {affinity: +3, trust: +3, attraction: +1, comfort: +3, respect: +2}
- moodResponse: Happy

**Choice B:**
- Text: "My day's been fine. Want to grab food and talk about something other than soccer?"
- nextSceneId: ROME_02_FOOD_INVITE
- statDelta: {affinity: +4, trust: +1, attraction: +3, comfort: +2, respect: +1}
- moodResponse: Surprised

**Choice C:**
- Text: "Honestly? Your keeper probably just needs confidence. Have you tried encouraging her?"
- nextSceneId: ROME_02_ANNOYED
- statDelta: {affinity: -3, trust: -2, attraction: -1, comfort: -3, respect: -2}
- moodResponse: Angry

---

## SCENE: ROME_01_CHALLENGED

**Scene ID:** ROME_01_CHALLENGED

**NPC Dialogue:**
*Rome turns to look at you* 
"An off day? She's had an 'off week.' This isn't a one-time thing." *defensive* "I'm not trying to be mean, but when you're a starting player, you can't afford to have off days every practice."

**Player Choices:**

**Choice A:**
- Text: "Fair point. Guess the pressure's different for starters."
- nextSceneId: ROME_02_VALIDATED
- statDelta: {affinity: +2, trust: +1, attraction: 0, comfort: +1, respect: +2}
- moodResponse: Happy

**Choice B:**
- Text: "Sounds like you're being pretty hard on a teammate though."
- nextSceneId: ROME_02_DEFENSIVE
- statDelta: {affinity: -4, trust: -2, attraction: -1, comfort: -4, respect: -3}
- moodResponse: Angry

**Choice C:**
- Text: "You know what? You're cute when you're defensive."
- nextSceneId: ROME_02_DISTRACTED_FLIRT
- statDelta: {affinity: +2, trust: 0, attraction: +4, comfort: 0, respect: +2}
- moodResponse: Surprised

---

## SCENE: ROME_01_FLUSTERED

**Scene ID:** ROME_01_FLUSTERED

**NPC Dialogue:**
*Rome blinks, caught off guard* 
"I— what?" *laughs despite herself* "Did you just hit on me while I'm sweaty and complaining?" *shakes her head, smiling* "That's... actually kind of bold."

**Player Choices:**

**Choice A:**
- Text: "I call it like I see it. Plus, you needed a distraction from goalkeeper drama."
- nextSceneId: ROME_02_CHARMED
- statDelta: {affinity: +4, trust: +1, attraction: +4, comfort: +2, respect: +3}
- moodResponse: Happy

**Choice B:**
- Text: "Sorry, too forward? I can stick to soccer talk."
- nextSceneId: ROME_02_SHY_BACKOFF
- statDelta: {affinity: +1, trust: +2, attraction: +1, comfort: +2, respect: 0}
- moodResponse: Happy

**Choice C:**
- Text: "Sweaty and angry is a good look on you. Just saying."
- nextSceneId: ROME_02_PLAYFUL_FLIRT
- statDelta: {affinity: +3, trust: +1, attraction: +5, comfort: +1, respect: +2}
- moodResponse: Surprised

---

## SCENE: ROME_02_SUPPORTED_CONTINUED

**Scene ID:** ROME_02_SUPPORTED_CONTINUED

**NPC Dialogue:**
*Rome relaxes back against the bench* 
"Thanks for listening. Most people just tune me out when I talk about soccer." *looks at you curiously* "You're a good listener. How come we don't hang out more often?"

**Player Choices:**

**Choice A:**
- Text: "Good question. We should change that. Want to do something this weekend?"
- nextSceneId: ROME_03_DATE_SETUP
- statDelta: {affinity: +4, trust: +2, attraction: +4, comfort: +2, respect: +2}
- moodResponse: Happy

**Choice B:**
- Text: "I'm around if you ever need to vent again."
- nextSceneId: ROME_03_FRIENDLY
- statDelta: {affinity: +3, trust: +3, attraction: +1, comfort: +3, respect: +2}
- moodResponse: Happy

**Choice C:**
- Text: "Honestly? You're usually so focused on soccer, I figured you didn't have time."
- nextSceneId: ROME_03_GUILTY
- statDelta: {affinity: +2, trust: +1, attraction: 0, comfort: +1, respect: +1}
- moodResponse: Sad

---

## SCENE: ROME_02_ANNOYED

**Scene ID:** ROME_02_ANNOYED

**NPC Dialogue:**
*Rome's jaw tightens* 
"Encouraging her? Are you kidding?" *stands up* "You don't know anything about our team dynamics or what I've already tried." *crosses arms* "Not everyone needs to be coddled."

**Player Choices:**

**Choice A:**
- Text: "You're right, I don't know your team. Sorry for overstepping."
- nextSceneId: ROME_03_CALMED
- statDelta: {affinity: +1, trust: +1, attraction: 0, comfort: +1, respect: +1}
- moodResponse: Happy

**Choice B:**
- Text: "Wow, defensive much? I was just making a suggestion."
- nextSceneId: ROME_03_FIGHT
- statDelta: {affinity: -5, trust: -3, attraction: -2, comfort: -5, respect: -4}
- moodResponse: Angry

**Choice C:**
- Text: "I think you need to cool off. Want me to leave you alone?"
- nextSceneId: ROME_03_DISTANCE
- statDelta: {affinity: -2, trust: -1, attraction: -1, comfort: -2, respect: 0}
- moodResponse: Angry

---

## SCENE: ROME_02_DEFENSIVE

**Scene ID:** ROME_02_DEFENSIVE

**NPC Dialogue:**
*Rome stands up abruptly* 
"Hard on a teammate? I'm trying to WIN. Maybe you don't get what it's like to actually compete for something that matters." *starts to walk away* "Forget it."

**Player Choices:**

**Choice A:**
- Text: "Rome, wait. I'm sorry. I shouldn't have said that."
- nextSceneId: ROME_03_APOLOGIZED
- statDelta: {affinity: 0, trust: +1, attraction: 0, comfort: 0, respect: +1}
- moodResponse: Sad

**Choice B:**
- Text: "Fine, go cool off. You're being ridiculous."
- nextSceneId: ROME_03_ANGRY_EXIT
- statDelta: {affinity: -6, trust: -4, attraction: -3, comfort: -6, respect: -5}
- moodResponse: Angry

**Choice C:**
- Text: *grab her hand* "Don't leave. I was out of line."
- nextSceneId: ROME_03_TOUCHED
- statDelta: {affinity: +2, trust: +2, attraction: +2, comfort: +1, respect: +2}
- moodResponse: Surprised

---

## SCENE: ROME_02_CHARMED

**Scene ID:** ROME_02_CHARMED

**NPC Dialogue:**
*Rome grins* 
"Okay, I'll admit, that worked. I needed the distraction." *stretches* "You know what? You're not bad company. Even when I'm gross and sweaty." *playful* "So... you always this smooth or am I special?"

**Player Choices:**

**Choice A:**
- Text: "You're definitely special. I don't flirt with just anyone on park benches."
- nextSceneId: ROME_03_ROMANTIC
- statDelta: {affinity: +5, trust: +2, attraction: +5, comfort: +3, respect: +3}
- moodResponse: Happy

**Choice B:**
- Text: "I have my moments. Depends on the company."
- nextSceneId: ROME_03_INTRIGUED
- statDelta: {affinity: +3, trust: +1, attraction: +3, comfort: +2, respect: +2}
- moodResponse: Happy

**Choice C:**
- Text: "Actually, you're not that sweaty. I've seen worse at the gym."
- nextSceneId: ROME_03_LAUGHING
- statDelta: {affinity: +4, trust: +2, attraction: +3, comfort: +4, respect: +2}
- moodResponse: Happy

---

## SCENE: ROME_02_VALIDATED

**Scene ID:** ROME_02_VALIDATED

**NPC Dialogue:**
*Rome sits back down, slightly less tense*
"Thank you. At least someone gets it." *stretches her legs out* "Being a starter means everything you do is under a microscope. One bad game and everyone questions if you deserve your spot."

**Player Choices:**

**Choice A:**
- Text: "That sounds like a lot of pressure. How do you handle it?"
- nextSceneId: ROME_03_OPENING_UP
- statDelta: {affinity: +3, trust: +3, attraction: +1, comfort: +3, respect: +2}
- moodResponse: Happy

**Choice B:**
- Text: "Well, from what I've seen, you definitely deserve your spot."
- nextSceneId: ROME_03_COMPLIMENTED
- statDelta: {affinity: +4, trust: +1, attraction: +3, comfort: +2, respect: +3}
- moodResponse: Happy

**Choice C:**
- Text: "Maybe that pressure is what makes you good though."
- nextSceneId: ROME_03_THOUGHTFUL
- statDelta: {affinity: +2, trust: +1, attraction: +1, comfort: +1, respect: +3}
- moodResponse: Surprised

---

## SCENE: ROME_03_DATE_SETUP

**Scene ID:** ROME_03_DATE_SETUP

**NPC Dialogue:**
*Rome's face lights up*
"Really? I'd like that." *pulls out her phone* "What kind of things do you like to do? Should we do dinner, or something more active? I'm good with whatever."

**Player Choices:**

**Choice A:**
- Text: "Dinner sounds perfect. Friday at seven?"
- nextSceneId: ROME_04_DATE_CONFIRMED
- statDelta: {affinity: +4, trust: +2, attraction: +4, comfort: +3, respect: +2}
- moodResponse: Happy

**Choice B:**
- Text: "How about something active? Rock climbing? Hiking?"
- nextSceneId: ROME_04_ACTIVE_DATE
- statDelta: {affinity: +5, trust: +2, attraction: +3, comfort: +3, respect: +4}
- moodResponse: Happy

**Choice C:**
- Text: "Let's figure it out as we go. Exchange numbers first?"
- nextSceneId: ROME_04_SPONTANEOUS
- statDelta: {affinity: +3, trust: +2, attraction: +3, comfort: +2, respect: +2}
- moodResponse: Happy

---

## SCENE: ROME_03_ROMANTIC

**Scene ID:** ROME_03_ROMANTIC

**NPC Dialogue:**
*Rome moves closer on the bench, her knee touching yours*
"Well, I'm glad you picked my bench then." *holds eye contact* "You know, I've noticed you around campus before. Always wondered if you'd actually talk to me." *smiles* "Guess today was my lucky day."

**Player Choices:**

**Choice A:**
- Text: "I've noticed you too. Hard not to. You want to get dinner sometime?"
- nextSceneId: ROME_04_DINNER_ASK
- statDelta: {affinity: +6, trust: +2, attraction: +6, comfort: +3, respect: +4}
- moodResponse: Happy

**Choice B:**
- Text: *lean in slightly* "Lucky for both of us."
- nextSceneId: ROME_04_TENSION
- statDelta: {affinity: +4, trust: +2, attraction: +7, comfort: +2, respect: +3}
- moodResponse: Surprised

**Choice C:**
- Text: "We should probably get to know each other before I ask you out."
- nextSceneId: ROME_04_SLOW_BUILD
- statDelta: {affinity: +3, trust: +3, attraction: +3, comfort: +3, respect: +4}
- moodResponse: Happy

---

## SCENE: ROME_03_CALMED

**Scene ID:** ROME_03_CALMED

**NPC Dialogue:**
*Rome sits back down, softer*
"No, I'm sorry. I'm just... really stressed about this season." *runs hand through hair* "I didn't mean to snap at you. You were just trying to help."

**Player Choices:**

**Choice A:**
- Text: "It's okay. High stakes situations are tough. Want to talk about it?"
- nextSceneId: ROME_04_OPENING_UP
- statDelta: {affinity: +3, trust: +3, attraction: +1, comfort: +3, respect: +2}
- moodResponse: Happy

**Choice B:**
- Text: "How about we talk about literally anything except soccer for five minutes?"
- nextSceneId: ROME_04_DISTRACTION
- statDelta: {affinity: +3, trust: +2, attraction: +2, comfort: +3, respect: +1}
- moodResponse: Happy

**Choice C:**
- Text: "You carry a lot of pressure, don't you? Must be exhausting."
- nextSceneId: ROME_04_VULNERABLE
- statDelta: {affinity: +4, trust: +4, attraction: +2, comfort: +3, respect: +3}
- moodResponse: Sad

---

## SCENE: ROME_03_FIGHT

**Scene ID:** ROME_03_FIGHT

**NPC Dialogue:**
*Rome's pacing now*
"Defensive? You're the one who sat there judging me when you don't know anything about what I'm dealing with!" *voice rising* "You know what? This was a mistake. I should've just gone home."

**Player Choices:**

**Choice A:**
- Text: "Rome, I wasn't judging. I'm sorry it came across that way."
- nextSceneId: ROME_04_SALVAGE_ATTEMPT
- statDelta: {affinity: -1, trust: 0, attraction: -1, comfort: -1, respect: 0}
- moodResponse: Angry

**Choice B:**
- Text: "Yeah, maybe you should go home and calm down."
- nextSceneId: ROME_04_DONE
- statDelta: {affinity: -7, trust: -5, attraction: -4, comfort: -7, respect: -6}
- moodResponse: Angry

**Choice C:**
- Text: *stand up and face her* "Stop. Take a breath. I'm not your enemy here."
- nextSceneId: ROME_04_CONFRONTED
- statDelta: {affinity: 0, trust: +1, attraction: +1, comfort: -1, respect: +2}
- moodResponse: Surprised

---

## SCENE: ROME_04_DINNER_ASK

**Scene ID:** ROME_04_DINNER_ASK

**NPC Dialogue:**
*Rome's face lights up*
"Really? Yes! I mean—" *composes herself* "Yeah, that sounds great. Friday work for you?" *pulls out phone* "Here, give me your number so I can text you details."

**Player Choices:**

**Choice A:**
- Text: *exchange numbers* "Friday's perfect. Can't wait."
- nextSceneId: ROME_05_EXCITED_END
- statDelta: {affinity: +4, trust: +2, attraction: +4, comfort: +3, respect: +2}
- moodResponse: Happy

**Choice B:**
- Text: "Friday works. Where should we go?"
- nextSceneId: ROME_05_PLANNING
- statDelta: {affinity: +3, trust: +2, attraction: +3, comfort: +2, respect: +2}
- moodResponse: Happy

**Choice C:**
- Text: "Actually, want to just walk around now? No reason to wait."
- nextSceneId: ROME_05_IMMEDIATE
- statDelta: {affinity: +5, trust: +3, attraction: +5, comfort: +3, respect: +3}
- moodResponse: Surprised

---

## SCENE: ROME_04_VULNERABLE

**Scene ID:** ROME_04_VULNERABLE

**NPC Dialogue:**
*Rome looks down at her hands*
"Yeah. It is." *quiet* "I'm team captain. Everyone looks to me. If I mess up, if I'm not perfect, the whole team falls apart." *looks at you* "Sometimes I just want someone to tell me it's okay to not have all the answers."

**Player Choices:**

**Choice A:**
- Text: "It's okay to not have all the answers, Rome. You're human."
- nextSceneId: ROME_05_COMFORTED
- statDelta: {affinity: +5, trust: +5, attraction: +2, comfort: +4, respect: +3}
- moodResponse: Happy

**Choice B:**
- Text: "That's a lot to carry alone. Do you have anyone to talk to about this?"
- nextSceneId: ROME_05_SUPPORT_OFFER
- statDelta: {affinity: +4, trust: +4, attraction: +1, comfort: +3, respect: +2}
- moodResponse: Sad

**Choice C:**
- Text: "Maybe you should talk to your coach about sharing that responsibility."
- nextSceneId: ROME_05_PRACTICAL
- statDelta: {affinity: +2, trust: +1, attraction: 0, comfort: +1, respect: +2}
- moodResponse: Happy

---

## SCENE: ROME_04_DONE

**Scene ID:** ROME_04_DONE

**NPC Dialogue:**
*Rome stops, turns back*
"You know what? Fine. I'm going." *voice shakes slightly* "Thanks for the reminder that I can't talk to anyone without being told I'm wrong." *walks away quickly*

**Player Choices:**

**Choice A:**
- Text: *call after her* "Rome, wait! I didn't mean it like that!"
- nextSceneId: ROME_05_TOO_LATE
- statDelta: {affinity: -4, trust: -3, attraction: -2, comfort: -5, respect: -4}
- moodResponse: Sad

**Choice B:**
- Text: *let her go without saying anything*
- nextSceneId: ROME_05_GONE
- statDelta: {affinity: -8, trust: -6, attraction: -5, comfort: -8, respect: -7}
- moodResponse: Sad

**Choice C:**
- Text: *chase after her* "Rome! Stop! Please!"
- nextSceneId: ROME_05_DESPERATE
- statDelta: {affinity: -2, trust: -1, attraction: 0, comfort: -3, respect: -2}
- moodResponse: Angry

---

## SCENE: ROME_05_EXCITED_END

**Scene ID:** ROME_05_EXCITED_END

**NPC Dialogue:**
*Rome saves your number*
"Great! I promise I'll be less sweaty and complainy on Friday." *stands up, stretching* "I should head home and shower. But I'm really glad we ran into each other today." *genuine smile* "This was... unexpected. In the best way."

**Player Choices:**

**Choice A:**
- Text: "Me too. See you Friday, Rome."
- nextSceneId: CHAPTER_1_END_ROMANTIC_SUCCESS
- statDelta: {affinity: +2, trust: +1, attraction: +2, comfort: +2, respect: +1}
- moodResponse: Happy

**Choice B:**
- Text: *stand up too* "Want company walking back? I'm headed that direction."
- nextSceneId: CHAPTER_1_END_EXTENDED_TIME
- statDelta: {affinity: +3, trust: +2, attraction: +3, comfort: +2, respect: +2}
- moodResponse: Happy

**Choice C:**
- Text: "Unexpected good things are the best kind. Go shower, I'll text you later."
- nextSceneId: CHAPTER_1_END_FLIRTY
- statDelta: {affinity: +2, trust: +1, attraction: +3, comfort: +2, respect: +2}
- moodResponse: Happy

---

## SCENE: ROME_05_COMFORTED

**Scene ID:** ROME_05_COMFORTED

**NPC Dialogue:**
*Rome's shoulders relax*
"Thank you." *voice soft* "I really needed to hear that." *stands up* "I should probably go before I get too emotional on a park bench." *smiles* "But seriously, thank you for listening."

**Player Choices:**

**Choice A:**
- Text: "Anytime. Even if you just need to vent about goalkeepers."
- nextSceneId: CHAPTER_1_END_FRIENDSHIP_SOLID
- statDelta: {affinity: +3, trust: +3, attraction: +1, comfort: +3, respect: +2}
- moodResponse: Happy

**Choice B:**
- Text: "We should hang out more. Coffee sometime?"
- nextSceneId: CHAPTER_1_END_POTENTIAL_ROMANCE
- statDelta: {affinity: +4, trust: +2, attraction: +3, comfort: +3, respect: +2}
- moodResponse: Happy

**Choice C:**
- Text: "You're not being too emotional. You're being human. Big difference."
- nextSceneId: CHAPTER_1_END_EMOTIONAL_BOND
- statDelta: {affinity: +3, trust: +3, attraction: +1, comfort: +3, respect: +3}
- moodResponse: Happy

---

## SCENE: ROME_05_SUPPORT_OFFER

**Scene ID:** ROME_05_SUPPORT_OFFER

**NPC Dialogue:**
*Rome shakes her head*
"Not really. My teammates wouldn't understand—they need me to be strong. My family's far away. I guess..." *looks at you* "I guess I don't really let people in much."

**Player Choices:**

**Choice A:**
- Text: "Well, you can talk to me. Anytime you need to."
- nextSceneId: CHAPTER_1_END_TRUST_ESTABLISHED
- statDelta: {affinity: +5, trust: +6, attraction: +2, comfort: +4, respect: +3}
- moodResponse: Happy

**Choice B:**
- Text: "Maybe it's time to change that. Let people help you."
- nextSceneId: CHAPTER_1_END_ENCOURAGING
- statDelta: {affinity: +3, trust: +3, attraction: +1, comfort: +2, respect: +2}
- moodResponse: Happy

**Choice C:**
- Text: "That sounds lonely. No one should carry everything alone."
- nextSceneId: CHAPTER_1_END_EMPATHY
- statDelta: {affinity: +4, trust: +4, attraction: +2, comfort: +3, respect: +3}
- moodResponse: Sad

---

## SCENE: ROME_05_DESPERATE

**Scene ID:** ROME_05_DESPERATE

**NPC Dialogue:**
*Rome stops but doesn't turn around*
"Why? So you can tell me more things I'm doing wrong?" *shoulders are tense*

**Player Choices:**

**Choice A:**
- Text: "No. Because I was a jerk and I'm sorry. Please give me a chance to make it right."
- nextSceneId: CHAPTER_1_END_FRAGILE_PEACE
- statDelta: {affinity: +1, trust: +1, attraction: 0, comfort: 0, respect: +1}
- moodResponse: Sad

**Choice B:**
- Text: "Because I don't want to leave things like this. You deserve better."
- nextSceneId: CHAPTER_1_END_RECOVERY_POSSIBLE
- statDelta: {affinity: +2, trust: +2, attraction: +1, comfort: +1, respect: +2}
- moodResponse: Surprised

**Choice C:**
- Text: "I'm sorry. I pushed too hard. Can we start over?"
- nextSceneId: CHAPTER_1_END_SECOND_CHANCE
- statDelta: {affinity: +1, trust: +1, attraction: 0, comfort: +1, respect: +1}
- moodResponse: Sad

---

## SCENE: ROME_05_GONE

**Scene ID:** ROME_05_GONE

**NPC Dialogue:**
*Rome is gone. You sit alone on the bench, replaying the conversation.*

*Your phone buzzes three days later. Unknown number.*

TEXT: "I don't know if you'll see this, but I'm sorry I walked away. Practice was rough and I took it out on you. That wasn't fair. If you want to talk sometime, I'm around. No pressure. -Rome"

**Player Choices:**

**Choice A:**
- Text: *text back immediately* "I'm sorry too. Want to try that conversation again?"
- nextSceneId: CHAPTER_1_END_SECOND_CHANCE_TEXT
- statDelta: {affinity: +3, trust: +2, attraction: +1, comfort: +1, respect: +2}
- moodResponse: Happy

**Choice B:**
- Text: *text back later* "Thanks for reaching out. Let's just forget today happened."
- nextSceneId: CHAPTER_1_END_ACQUAINTANCES
- statDelta: {affinity: 0, trust: 0, attraction: 0, comfort: 0, respect: 0}
- moodResponse: Sad

**Choice C:**
- Text: *don't respond*
- nextSceneId: CHAPTER_1_END_DARK_SEED
- statDelta: {affinity: -5, trust: -5, attraction: -3, comfort: -5, respect: -5}
- moodResponse: Sad

---

## CHAPTER 1 ENDING STATES

### CHAPTER_1_END_ROMANTIC_SUCCESS
**Total Stats Range:** Affinity: 30-40, Trust: 20-28, Attraction: 30-40, Comfort: 25-35, Respect: 22-30
**Status:** Date confirmed, mutual romantic interest
**Next Chapter:** Date scenario with Rome

### CHAPTER_1_END_FRIENDSHIP_SOLID
**Total Stats Range:** Affinity: 28-35, Trust: 30-38, Attraction: 10-18, Comfort: 28-35, Respect: 22-28
**Status:** Strong emotional bond, no romance yet
**Next Chapter:** Casual hangout, romance possible

### CHAPTER_1_END_TRUST_ESTABLISHED
**Total Stats Range:** Affinity: 30-38, Trust: 32-42, Attraction: 12-20, Comfort: 28-36, Respect: 24-30
**Status:** Deep trust, she opens up to you
**Next Chapter:** Emotional support moments

### CHAPTER_1_END_FRAGILE_PEACE
**Total Stats Range:** Affinity: -5-5, Trust: -3-5, Attraction: -8-2, Comfort: -10-2, Respect: -5-5
**Status:** Salvaged but damaged, wary
**Next Chapter:** Awkward re-encounter, rebuild

### CHAPTER_1_END_SECOND_CHANCE_TEXT
**Total Stats Range:** Affinity: -10-0, Trust: -8-0, Attraction: -8-0, Comfort: -12--2, Respect: -10-0
**Status:** Major damage but recovery attempted
**Next Chapter:** Difficult reconciliation scene

### CHAPTER_1_END_DARK_SEED
**Total Stats Range:** Affinity: -20--10, Trust: -20--10, Attraction: -15--5, Comfort: -25--15, Respect: -20--10
**Status:** Rome feels abandoned and betrayed
**Next Chapter:** Dark route warning signs appear
**Warning:** Possessive behavior may emerge

---

## STAT THRESHOLDS FOR CHAPTER 2

**Romantic Route Unlocked:**
- Affinity ≥ 28 AND Attraction ≥ 28

**Deep Emotional Route:**
- Trust ≥ 30 AND Comfort ≥ 25

**Friendship Route:**
- Affinity ≥ 22, Trust ≥ 20, Respect ≥ 18, Attraction < 25

**Strained Route:**
- Any stat between -10 and +10
- Recovery still possible

**Dark Route Warning:**
- Affinity ≤ -8 OR Trust ≤ -8 OR Comfort ≤ -12

**Dark Route Activated:**
- Affinity ≤ -15 AND (Trust ≤ -12 OR Comfort ≤ -18)

---

**END OF CHAPTER 1 - ROME KLINE**
