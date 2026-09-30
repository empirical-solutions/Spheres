#!/usr/bin/env python3
"""
The Mirror of Spheres — Master API Context Injection & Generative Engine
=========================================================================
Automates 360° Zodiac matrix traversal across the 72 Decan Gates (5° increments)
and 12 Zodiac Acts with hardcoded system instructions and Veo 3 video generation.

Architecture:
  Layer 1: System-Level Instruction (Recursive Continuity / Dark-Gothic Sumerian Futurism)
  Layer 2: Procedural Context Array (12 Signs / 72 Gates Matrix / 8.33s Temporal Cadence)
  Layer 3: Multimodal Boundary Code (Audio Sync: 40Hz -> 1.618 Phi / Visual Flows)
"""

import os
import sys
import json
import time
import argparse
from typing import Dict, Any, List, Optional

try:
    from google import genai
    from google.genai import types
except ImportError:
    genai = None

# ==============================================================================
# LAYER 1: CANONICAL SYSTEM DIRECTIVE (AI STUDIO PROMPT-INJECT PAYLOAD)
# ==============================================================================

CANONICAL_SYSTEM_DIRECTIVE = {
    "AestheticProfile": (
        "Dark-Gothic Sumerian Futurism. High-contrast chiaroscuro, cosmic voids, "
        "mirror-polished basalt megaliths, glowing crimson energy veins, holographic cuneiform glyphs."
    ),
    "TemporalAxiom": {
        "TotalDurationSeconds": 600,
        "ZodiacPhaseDurationSeconds": 50,
        "GateNodeIntervalSeconds": 8.333333333333334,
        "TotalGates": 72,
        "DegreesPerGate": 5.0,
        "TotalActs": 12,
        "DegreesPerAct": 30.0
    },
    "CoreExecutionRules": [
        "RECURSIVE_CONTINUITY: Enforce pixel-level optical flow consistency. Ensure Frame_Start(k) perfectly anchors to Frame_End(k-1). Zero micro-cuts.",
        "DUAL_ENTITY_ANCHORING: Dynamically embed subtle Shem wing motifs and Goetia horn motifs into the environment geometry during each 8.33s node loop.",
        "AXIS_OPPOSITION: Force absolute structural and acoustic inversion at exactly 300 seconds (5:00 / Gate 37 Libra) relative to 0 seconds (0:00 / Gate 1 Aries).",
        "CYMATIC_RESONANCE: Couple 40Hz sub-bass standing waves with Golden Ratio Phi (1.618) sacred geometry fractals across all visual transitions."
    ]
}

# ==============================================================================
# GATE 48 (6:40 / 400.0s) LATERAL DOLLY EVENT & CAMERA VECTOR SPECIFICATION
# ==============================================================================

GATE_48_LATERAL_DOLLY_SPEC = {
    "Event": "240_SEAM_BREACH_LATERAL_DOLLY",
    "TimestampSeconds": 400.0,
    "Timecode": "06:40",
    "Sign": "Scorpio",
    "Degrees": "25°–30° Scorpio (235°–240° Total)",
    "Entities": {
        "Angel": "Mihael",
        "Demon": "Haagenti",
        "HarmonicRole": "Mihael unites spiritual essence; Haagenti transmutates the abyssal boundary."
    },
    "CameraVectorBreakdown": {
        "BaselineMotion": "Closed 360° circular trajectory along the circumference rail at radius R=1.0.",
        "BreachVector": "At t=400.0s (6:40), the camera breaks tangential velocity and initiates a rapid lateral dolly-out along the 108° Zen Shield Phi ray.",
        "StartVectorXYZ": [0.0, 0.0, -1.0],
        "EndVectorXYZ": [1.618, 0.618, 2.618],
        "FocalLengthShift": "From 35mm anamorphic compression to 14mm ultrawide dimensional tear.",
        "OpticalPhenomenon": "Basalt walls fracture along crimson runic seams, exposing the unmanifest Ophiuchus Void and the Runic Staff of the Arch-Magus."
    },
    "Veo3PromptInject": (
        "Cinematic 16:9 widescreen master shot, Dark-Gothic Sumerian Futurism. Scorpio 25°–30° Gate 48 at 06:40 (400.0s). "
        "The camera travels along a circular basalt rail before violently breaking tangential tracking into a dynamic lateral dolly-out "
        "along the 108° Zen Shield vector. Bioluminescent aqua currents from angel Mihael collide with Haagenti's abyssal metallic ink. "
        "At the 240° seam, the circular boundary fractures open, revealing a cosmic portal into the Ophiuchus Void with glowing crimson runic monoliths. "
        "High-contrast chiaroscuro, volumetric mist, continuous fluid optical flow, photorealistic cinematic lighting."
    )
}

# ==============================================================================
# LAYER 2: PROCEDURAL CONTEXT ARRAY (ALL 72 SHEM-GOETIA GATES)
# ==============================================================================

def build_72_gates_matrix() -> List[Dict[str, Any]]:
    """Builds the canonical 72 decan gates dictionary with exact coordinates and timestamps."""
    raw_tuples = [
        # (id, act, qIdx, sign, element, angel, hebrew, choir, sphere, aFreq, attr, demon, goetia, rank, legions, metal, dFreq, title, interaction, isBreach)
        (1, 1, 1, 'Aries', 'Fire', 'Vehuiah', 'והו', 'Seraphim', 'Kether', 528, 'God the Exalter', 'Bael', 1, 'King', 66, 'Gold', 40, 'First Lord of Chthonic Fire', 'Vehuiah projects blinding celestial ignition, while Bael grounds it with deep chthonic embers.', False),
        (2, 1, 2, 'Aries', 'Fire', 'Jeliel', 'ילי', 'Seraphim', 'Kether', 540, 'God the Succorer', 'Agares', 2, 'Duke', 31, 'Copper', 44, 'Voice of Trembling Earth', 'Jeliel forms soaring thermal updrafts, neutralized by Agares\'s smoldering volcanic ash.', False),
        (3, 1, 3, 'Aries', 'Fire', 'Sitael', 'סיט', 'Seraphim', 'Kether', 552, 'God the Hope of All Creatures', 'Vassago', 3, 'Prince', 26, 'Tin', 48, 'Discoverer of the Hidden', 'Sitael weaves laser-like photon fire, met by Vassago’s creeping blue flame.', False),
        (4, 1, 4, 'Aries', 'Fire', 'Elemiah', 'עלם', 'Seraphim', 'Kether', 564, 'Hidden God', 'Gamigin', 4, 'Marquis', 30, 'Silver', 52, 'Keeper of Souls in Ash', 'Elemiah expands a protective corona of light, while Gamigin condenses it into concentrated burning rings.', False),
        (5, 1, 5, 'Aries', 'Fire', 'Mahasiah', 'מהש', 'Seraphim', 'Kether', 576, 'God the Savior', 'Marbas', 5, 'President', 36, 'Mercury', 56, 'Artificer of Mechanical Flame', 'Mahasiah projects purifying golden heat, anchored by Marbas’s mechanical forge-fire.', False),
        (6, 1, 6, 'Aries', 'Fire', 'Lelahel', 'ללה', 'Seraphim', 'Kether', 588, 'The Praiseworthy God', 'Valefor', 6, 'Duke', 10, 'Copper', 60, 'The Cunning Phantom', 'Lelahel’s radiant starlight weaves into Valefor’s eclipsing shadows, completing the fire circuit.', False),

        (7, 2, 1, 'Taurus', 'Earth', 'Achaiah', 'אכא', 'Cherubim', 'Chokmah', 432, 'God Good and Patient', 'Amon', 7, 'Marquis', 40, 'Silver', 55, 'Lord of Primeval Bedrock', 'Achaiah cultivates patience within crystal lattice, countered by Amon’s eruptive stone fractures.', False),
        (8, 2, 2, 'Taurus', 'Earth', 'Cahetel', 'כהת', 'Cherubim', 'Chokmah', 444, 'Adorable God', 'Barbatos', 8, 'Duke', 30, 'Copper', 65, 'Lord of the Wild Vaults', 'Cahetel blesses agricultural fertility, interwoven with Barbatos’s underground subterranean secrets.', False),
        (9, 2, 3, 'Taurus', 'Earth', 'Haziel', 'הזי', 'Cherubim', 'Chokmah', 456, 'Merciful God', 'Paimon', 9, 'King', 200, 'Gold', 72, 'Grand Sovereign of Earth Resonance', 'Haziel projects divine grace, held firm by Paimon’s monumental sonic bedrock.', False),
        (10, 2, 4, 'Taurus', 'Earth', 'Aladiah', 'אלד', 'Cherubim', 'Chokmah', 468, 'Propitious God', 'Buer', 10, 'President', 50, 'Mercury', 80, 'Wheel of Herbal Minerals', 'Aladiah cures corporeal infirmity, matched with Buer’s mineral alchemical transmutation.', False),
        (11, 2, 5, 'Taurus', 'Earth', 'Lauviah', 'לאו', 'Cherubim', 'Chokmah', 480, 'God Praised and Exalted', 'Gusion', 11, 'Duke', 40, 'Copper', 88, 'Mirror of Ancient Slabs', 'Lauviah reveals hidden knowledge through quartz, as Gusion anchors historical monoliths.', False),
        (12, 2, 6, 'Taurus', 'Earth', 'Hahaiah', 'ההע', 'Cherubim', 'Chokmah', 492, 'God the Refuge', 'Sitri', 12, 'Prince', 60, 'Tin', 96, 'Spark of Telluric Lust', 'Hahaiah shelters within sacred caverns, balanced by Sitri’s primal molten desire.', False),

        (13, 3, 1, 'Gemini', 'Air', 'Iezalel', 'יזל', 'Cherubim', 'Chokmah', 612, 'God Glorified in All', 'Beleth', 13, 'King', 85, 'Gold', 108, 'Commander of Roaring Winds', 'Iezalel harmonizes binary minds into unity, met by Beleth’s tempestuous dual storm.', False),
        (14, 3, 2, 'Gemini', 'Air', 'Mebahel', 'מבה', 'Cherubim', 'Chokmah', 624, 'God the Conservator', 'Leraje', 14, 'Marquis', 30, 'Silver', 114, 'Archer of Split Prisms', 'Mebahel upholds celestial justice through truth, countered by Leraje’s penetrating arrows of conflict.', False),
        (15, 3, 3, 'Gemini', 'Air', 'Hariel', 'הרי', 'Cherubim', 'Chokmah', 636, 'God the Creator', 'Eligos', 15, 'Duke', 60, 'Copper', 120, 'Strategist of Aerial Phantoms', 'Hariel purifies mental clarity, balanced by Eligos’s shadowy tactical prophecies.', False),
        (16, 3, 4, 'Gemini', 'Air', 'Hakamiah', 'הקם', 'Cherubim', 'Chokmah', 648, 'God Governing the Universe', 'Zepar', 16, 'Duke', 26, 'Copper', 126, 'Weaver of Polarized Passions', 'Hakamiah binds loyalties in the ether, matched with Zepar’s volatile seductive currents.', False),
        (17, 3, 5, 'Gemini', 'Air', 'Lauviah II', 'לאו', 'Thrones', 'Binah', 660, 'Admirable God', 'Botis', 17, 'President', 60, 'Mercury', 132, 'Serpent of Bifurcated Realities', 'Lauviah dispels mental anguish, while Botis unifies past and future illusions.', False),
        (18, 3, 6, 'Gemini', 'Air', 'Caliel', 'כלי', 'Thrones', 'Binah', 672, 'God Ready to Succor', 'Bathin', 18, 'Duke', 30, 'Copper', 138, 'Courier of Rapid Dimensions', 'Caliel shines instant discernment, interwoven with Bathin’s swift interdimensional transit.', False),

        (19, 4, 1, 'Cancer', 'Water', 'Leuviah', 'לוו', 'Thrones', 'Binah', 396, 'God Who Exalts the Sinner', 'Sallos', 19, 'Duke', 30, 'Copper', 42, 'Rider of Deep Love Currents', 'Leuviah retrieves ancient memories in tidal pools, greeted by Sallos’s gravitational emotional tide.', False),
        (20, 4, 2, 'Cancer', 'Water', 'Pahaliah', 'פהל', 'Thrones', 'Binah', 408, 'Redeeming God', 'Purson', 20, 'King', 22, 'Gold', 46, 'Sounder of Abyssal Horns', 'Pahaliah awakens mystical intuition, met by Purson’s deep oceanic subterranean fanfare.', False),
        (21, 4, 3, 'Cancer', 'Water', 'Nelchael', 'נלך', 'Thrones', 'Binah', 420, 'God One and Unique', 'Marax', 21, 'President', 30, 'Mercury', 50, 'Scholar of Oceanic Depths', 'Nelchael illuminates astronomy within water reflections, while Marax cataloges abyssal fauna.', False),
        (22, 4, 4, 'Cancer', 'Water', 'Yeiayel', 'ייי', 'Thrones', 'Binah', 432, 'Right Hand of God', 'Ipos', 22, 'Count', 36, 'Silver', 54, 'Lion-Headed Tide Master', 'Yeiayel guides seafaring vessels through storms, balanced by Ipos’s sharp intuitive undercurrents.', False),
        (23, 4, 5, 'Cancer', 'Water', 'Melahel', 'מלה', 'Thrones', 'Binah', 444, 'God Deflecting the Evil', 'Aim', 23, 'Duke', 26, 'Copper', 58, 'Torchbearer of Sunken Cities', 'Melahel yields soothing herbal balms, while Aim ignites underwater phosphorus flames.', False),
        (24, 4, 6, 'Cancer', 'Water', 'Haheuiah', 'חהו', 'Thrones', 'Binah', 456, 'God Good of Himself', 'Naberius', 24, 'Marquis', 19, 'Silver', 62, 'Guardian of the Stygian Gate', 'Haheuiah grants divine protection against drowning, meeting Naberius at the threshold of the deep.', False),

        (25, 5, 1, 'Leo', 'Fire', 'Nith-Haiah', 'נתה', 'Dominations', 'Chesed', 741, 'God Giving Wisdom', 'Glasya-Labolas', 25, 'President', 36, 'Mercury', 70, 'Winged Hound of Solar Blood', 'Nith-Haiah commands occult solar wisdom, checked by Glasya-Labolas’s razor plasma teeth.', False),
        (26, 5, 2, 'Leo', 'Fire', 'Haaiah', 'האא', 'Dominations', 'Chesed', 753, 'Hidden God', 'Bune', 26, 'Duke', 30, 'Copper', 76, 'Dragon of Golden Sepulchres', 'Haaiah defends state secrets under solar oath, as Bune converts royal ambition into lasting wealth.', False),
        (27, 5, 3, 'Leo', 'Fire', 'Yeratel', 'ירת', 'Dominations', 'Chesed', 765, 'God Punishing the Wicked', 'Ronove', 27, 'Marquis', 19, 'Silver', 82, 'Master of Solar Rhetoric', 'Yeratel spreads radiant justice across continents, met by Ronove’s silver-tongued courtly resonance.', False),
        (28, 5, 4, 'Leo', 'Fire', 'Seheiah', 'שאה', 'Dominations', 'Chesed', 777, 'God Healing the Sick', 'Berith', 28, 'Duke', 26, 'Copper', 88, 'Red Alchemist of the Crown', 'Seheiah protects against thunder and ruin, while Berith binds kings in alchemical gold pacts.', False),
        (29, 5, 5, 'Leo', 'Fire', 'Reiyel', 'ריי', 'Dominations', 'Chesed', 789, 'God Quick to Succor', 'Astaroth', 29, 'Duke', 40, 'Copper', 94, 'Grand Inquisitor of Sunken Light', 'Reiyel delivers souls from idolatry, directly confronting Astaroth’s mesmerizing abyssal intellect.', False),
        (30, 5, 6, 'Leo', 'Fire', 'Omael', 'אום', 'Dominations', 'Chesed', 801, 'Patient God', 'Forneus', 30, 'Marquis', 29, 'Silver', 100, 'Leviathan of the Golden Sea', 'Omael breathes divine patience into creation, counterbalanced by Forneus’s monumental sovereign name.', False),

        (31, 6, 1, 'Virgo', 'Earth', 'Lecabel', 'לכב', 'Dominations', 'Chesed', 852, 'God Inspiring', 'Foras', 31, 'President', 29, 'Mercury', 110, 'Herbalist of the Hidden Stones', 'Lecabel calculates divine agronomy and geometry, while Foras harvests medicinal stone virtues.', False),
        (32, 6, 2, 'Virgo', 'Earth', 'Vasariah', 'ושר', 'Dominations', 'Chesed', 864, 'Just God', 'Asmoday', 32, 'King', 72, 'Gold', 116, 'Sovereign of Precise Geometry', 'Vasariah delivers pure legal equity, counterpointed by Asmoday’s unbreakable mathematical rings.', False),
        (33, 6, 3, 'Virgo', 'Earth', 'Yehuiah', 'יחו', 'Powers', 'Geburah', 876, 'God Omniscient', 'Gaap', 33, 'Prince', 66, 'Tin', 122, 'Guide Across Meridian Lines', 'Yehuiah identifies treason through analytical light, while Gaap teleports between structural meridians.', False),
        (34, 6, 4, 'Virgo', 'Earth', 'Lehahiah', 'להח', 'Powers', 'Geburah', 888, 'Clement God', 'Furfur', 34, 'Count', 26, 'Silver', 128, 'Hart of Lightning and Faults', 'Lehahiah commands absolute discipline, met by Furfur’s crackling tectonic spark within stone.', False),
        (35, 6, 5, 'Virgo', 'Earth', 'Chavakiah', 'כוק', 'Powers', 'Geburah', 900, 'God Giving Joy', 'Marchosias', 35, 'Marquis', 30, 'Silver', 134, 'Wolf of Unbroken Faith', 'Chavakiah reconciles estranged bloodlines, anchored by Marchosias’s fierce martial loyalty.', False),
        (36, 6, 6, 'Virgo', 'Earth', 'Menadel', 'מנד', 'Powers', 'Geburah', 912, 'Adorable God', 'Stolas', 36, 'Prince', 26, 'Tin', 140, 'Astronomer of Stellar Roots', 'Menadel liberates prisoners from labor, as Stolas charts plant and gem coordinates beneath stars.', False),

        (37, 7, 1, 'Libra', 'Air', 'Aniel', 'אני', 'Powers', 'Geburah', 963, 'God of Virtues', 'Phenex', 37, 'Marquis', 20, 'Silver', 150, 'Phoenix of Harmonic Song', 'Aniel breaks the sieges of falsehood, met by Phenex’s soaring chromatic melody. (Axis Opposition 180° Inversion Point)', False),
        (38, 7, 2, 'Libra', 'Air', 'Haamiah', 'חעם', 'Powers', 'Geburah', 975, 'God the Desired', 'Halphas', 38, 'Count', 26, 'Silver', 156, 'Builder of Balanced Towers', 'Haamiah sanctifies sacred ritual equilibrium, as Halphas fortifies the ramparts of air.', False),
        (39, 7, 3, 'Libra', 'Air', 'Rehael', 'רהע', 'Powers', 'Geburah', 987, 'God Swift to Condone', 'Malphas', 39, 'President', 40, 'Mercury', 162, 'Crow of Architectural Symmetry', 'Rehael heals paternal fractures with compassion, while Malphas erects immaculate balanced spires.', False),
        (40, 7, 4, 'Libra', 'Air', 'Ieiazel', 'ייז', 'Powers', 'Geburah', 999, 'God Rejoicing', 'Raum', 40, 'Count', 30, 'Silver', 168, 'Thief of False Weights', 'Ieiazel liberates the oppressed writer, as Raum strips away illusions to restore karmic scale balance.', False),
        (41, 7, 5, 'Libra', 'Air', 'Hahahel', 'ההה', 'Virtues', 'Tiphereth', 1011, 'God in Three Persons', 'Focalor', 41, 'Duke', 30, 'Copper', 174, 'Lord of the Calm Zephyrs', 'Hahahel establishes spiritual mission, met by Focalor’s command over wind vortex equilibrium.', False),
        (42, 7, 6, 'Libra', 'Air', 'Mikael', 'מיכ', 'Virtues', 'Tiphereth', 1023, 'Virtue of God', 'Vepar', 42, 'Duke', 29, 'Copper', 180, 'Navigator of Mirrored Horizons', 'Mikael sustains political treaties and cosmic order, counterweighted by Vepar’s oceanic balance.', False),

        (43, 8, 1, 'Scorpio', 'Water', 'Veuliah', 'וול', 'Virtues', 'Tiphereth', 285, 'King Ruler', 'Sabnock', 43, 'Marquis', 50, 'Silver', 38, 'Architect of Putrefaction Walls', 'Veuliah destroys military tyrannies, while Sabnock raises impenetrable defenses around decaying matter.', False),
        (44, 8, 2, 'Scorpio', 'Water', 'Yelahiah', 'ילה', 'Virtues', 'Tiphereth', 297, 'Eternal God', 'Shax', 44, 'Marquis', 30, 'Silver', 42, 'Stealer of Light and Sight', 'Yelahiah defends lawful warriors with radiant shields, contrasted with Shax’s sight-depriving shadows.', False),
        (45, 8, 3, 'Scorpio', 'Water', 'Sealiah', 'סאל', 'Virtues', 'Tiphereth', 309, 'Mover of All Things', 'Vine', 45, 'King', 36, 'Gold', 46, 'Unearther of Submerged Witchcraft', 'Sealiah resurrects dormant springs of life, as Vine dismantles covert structures beneath the surface.', False),
        (46, 8, 4, 'Scorpio', 'Water', 'Ariel', 'ערי', 'Virtues', 'Tiphereth', 321, 'Revealing God', 'Bifrons', 46, 'Earl', 26, 'Silver', 50, 'Igniter of Corpse Lights', 'Ariel reveals cosmic dreams through pristine water, while Bifrons illuminates necromantic sepulchres.', False),
        (47, 8, 5, 'Scorpio', 'Water', 'Asaliah', 'עשל', 'Virtues', 'Tiphereth', 333, 'Praising God', 'Vual', 47, 'Duke', 37, 'Copper', 54, 'Emissary of Ancient Deep Love', 'Asaliah contemplates celestial justice, met by Vual’s ancient primordial emotional currents.', False),
        (48, 8, 6, 'Scorpio', 'Water', 'Mihael', 'מיה', 'Virtues', 'Tiphereth', 345, 'God Father Generous', 'Haagenti', 48, 'President', 33, 'Mercury', 58, 'Transmuter of Abyssal Waters', 'Mihael unites masculine and feminine spiritual essence. At 240° (6:40), Haagenti breaches the boundary: the 108° Zen Shield triggers the lateral dolly escape into the Ophiuchus Void!', True),

        (49, 9, 1, 'Sagittarius', 'Fire', 'Vehuel', 'והו', 'Principalities', 'Netzach', 639, 'God Great and Exalted', 'Crocell', 49, 'Duke', 48, 'Copper', 72, 'Warm Springs of Hidden Geometries', 'Vehuel elevates consciousness to the heights, while Crocell warms the subterranean baths of knowledge.', False),
        (50, 9, 2, 'Sagittarius', 'Fire', 'Daniel', 'דני', 'Principalities', 'Netzach', 651, 'Sign of Mercies', 'Furcas', 50, 'Knight', 20, 'Lead', 78, 'Crucible of Grim Philosophy', 'Daniel inspires eloquent celestial consolation, countered by Furcas’s stoic, razor-sharp logical rigors.', False),
        (51, 9, 3, 'Sagittarius', 'Fire', 'Hahasiah', 'החש', 'Principalities', 'Netzach', 663, 'Concealed God', 'Balam', 51, 'King', 40, 'Gold', 84, 'Three-Headed Oracle of Past & Future', 'Hahasiah unveils the hermetic philosopher’s stone, while Balam reveals all temporal coordinate shifts.', False),
        (52, 9, 4, 'Sagittarius', 'Fire', 'Imamiah', 'עמם', 'Principalities', 'Netzach', 675, 'God Raised Above All', 'Alloces', 52, 'Duke', 36, 'Copper', 90, 'Astronomer of Burning Horses', 'Imamiah breaks prison shackles through devotion, met by Alloces’s galloping celestial iron legions.', False),
        (53, 9, 5, 'Sagittarius', 'Fire', 'Nanael', 'ננא', 'Principalities', 'Netzach', 687, 'God Humbling the Proud', 'Camio', 53, 'President', 30, 'Mercury', 96, 'Interpreter of the Flying Coals', 'Nanael facilitates high abstract contemplation, as Camio translates the language of smoke and birds.', False),
        (54, 9, 6, 'Sagittarius', 'Fire', 'Nithael', 'נית', 'Principalities', 'Netzach', 699, 'King of Heaven', 'Murmur', 54, 'Duke', 30, 'Copper', 102, 'Trumpeter of the Ancestral Dead', 'Nithael ensures legitimate dynasty and cosmic succession, counterbalanced by Murmur’s ghostly ancestral horns.', False),

        (55, 10, 1, 'Capricorn', 'Earth', 'Mebahiah', 'מבה', 'Principalities', 'Netzach', 528, 'Eternal God', 'Orobas', 55, 'Prince', 20, 'Tin', 85, 'Herald of Unshakable Truth', 'Mebahiah confers moral integrity to structural laws, reinforced by Orobas’s refusal to deceive.', False),
        (56, 10, 2, 'Capricorn', 'Earth', 'Poiel', 'פוי', 'Principalities', 'Netzach', 540, 'God Supporting the Universe', 'Gremory', 56, 'Duke', 26, 'Copper', 90, 'Duchess of the Hidden Gold Veins', 'Poiel bestows fame and philosophical abundance, alongside Gremory’s discovery of subterranean treasures.', False),
        (57, 10, 3, 'Capricorn', 'Earth', 'Nemamiah', 'נמם', 'Archangels', 'Hod', 552, 'Praiseworthy God', 'Ose', 57, 'President', 30, 'Mercury', 95, 'Shapeshifter of the Granite Vaults', 'Nemamiah grants victory to just commanders, tested by Ose’s psychological metamorphic trials.', False),
        (58, 10, 4, 'Capricorn', 'Earth', 'Yeialel', 'יילא', 'Archangels', 'Hod', 564, 'God Hearing Sighs', 'Amy', 58, 'President', 36, 'Mercury', 100, 'Blazing Core of Mechanical Sciences', 'Yeialel dissolves sorrow through intellectual endurance, matched with Amy’s brilliant knowledge of the sciences.', False),
        (59, 10, 5, 'Capricorn', 'Earth', 'Harahel', 'הרח', 'Archangels', 'Hod', 576, 'God Knowing All', 'Orias', 59, 'Marquis', 30, 'Silver', 105, 'Stargazer of the Mineral Throne', 'Harahel enriches mental libraries and archives, as Orias maps the fixed stars onto stone talismans.', False),
        (60, 10, 6, 'Capricorn', 'Earth', 'Mitzrael', 'מצר', 'Archangels', 'Hod', 588, 'God Raising the Oppressed', 'Vapula', 60, 'Duke', 36, 'Copper', 110, 'Artisan of Iron Craft and Guilds', 'Mitzrael heals mental obsessions, balanced by Vapula’s rigorous dedication to master artisanry.', False),

        (61, 11, 1, 'Aquarius', 'Air', 'Umabel', 'ומב', 'Archangels', 'Hod', 714, 'God Above All Things', 'Zagan', 61, 'King', 33, 'Gold', 120, 'Alchemist of Blood and Wine', 'Umabel decodes physics and universal friendship, met by Zagan’s lightning transmutation of crude matter.', False),
        (62, 11, 2, 'Aquarius', 'Air', 'Iah-Hel', 'יהה', 'Archangels', 'Hod', 726, 'Supreme Being', 'Valac', 62, 'President', 38, 'Mercury', 125, 'Child of the Twin-Headed Draconic Void', 'Iah-Hel seeks supreme solitude and wisdom, while Valac commands the serpent networks of the cosmos.', False),
        (63, 11, 3, 'Aquarius', 'Air', 'Anauel', 'ענו', 'Archangels', 'Hod', 738, 'Infinitely Good God', 'Andras', 63, 'Marquis', 30, 'Silver', 130, 'Sower of Rupture and Dissension', 'Anauel protects global commerce and unity, directly countered by Andras’s surgical weapon of division.', False),
        (64, 11, 4, 'Aquarius', 'Air', 'Mehiel', 'מחי', 'Archangels', 'Hod', 750, 'God Vivifying All', 'Flauros', 64, 'Duke', 36, 'Copper', 135, 'Leopard of Consuming Static Fire', 'Mehiel inspires university academics and scholars, held in tension by Flauros’s incinerating truth-fire.', False),
        (65, 11, 5, 'Aquarius', 'Air', 'Damabiah', 'דמב', 'Angels', 'Yesod', 762, 'God Fountain of Wisdom', 'Andrealphus', 65, 'Marquis', 30, 'Silver', 140, 'Geometer of the Measureless Sky', 'Damabiah purifies springs of higher intellect, as Andrealphus calculates hyper-dimensional geometry.', False),
        (66, 11, 6, 'Aquarius', 'Air', 'Manakel', 'מנק', 'Angels', 'Yesod', 774, 'God Supporting All', 'Kimaris', 66, 'Marquis', 20, 'Silver', 145, 'Warrior of the African Depths', 'Manakel stabilizes nocturnal visions and psychic calm, matched with Kimaris’s indomitable psychic perseverance.', False),

        (67, 12, 1, 'Pisces', 'Water', 'Eyael', 'איע', 'Angels', 'Yesod', 432, 'God Delights of Humanity', 'Amdusias', 67, 'Duke', 29, 'Copper', 48, 'Maestro of the Invisible Orchestra', 'Eyael preserves ancient sacred texts and longevity, as Amdusias commands spectral sonic trees to bend.', False),
        (68, 12, 2, 'Pisces', 'Water', 'Habuhiah', 'חבו', 'Angels', 'Yesod', 444, 'God Giving Freely', 'Belial', 68, 'King', 80, 'Gold', 52, 'Earthborn Titan of Sovereign Will', 'Habuhiah heals agricultural plagues with fertility, confronting Belial’s unyielding defiance of celestial orders.', False),
        (69, 12, 3, 'Pisces', 'Water', 'Rochel', 'ראה', 'Angels', 'Yesod', 456, 'God Seeing All', 'Decarabia', 69, 'Marquis', 30, 'Silver', 56, 'Star of the Pentagrammatic Flora', 'Rochel recovers stolen inheritances across time, while Decarabia identifies all astral bird and herbal virtues.', False),
        (70, 12, 4, 'Pisces', 'Water', 'Jabamiah', 'יבמ', 'Angels', 'Yesod', 468, 'Word Producing All', 'Seere', 70, 'Prince', 26, 'Tin', 60, 'Instantaneous Wing of Desire', 'Jabamiah oversees the regeneration of decaying souls, while Seere carries matter across light-years in seconds.', False),
        (71, 12, 5, 'Pisces', 'Water', 'Haiaiel', 'היי', 'Angels', 'Yesod', 480, 'God Master of the Universe', 'Dantalion', 71, 'Duke', 36, 'Copper', 64, 'Book of Ten Thousand Faces', 'Haiaiel delivers spiritual armor to defeat delusion, while Dantalion reflects infinite masks of human consciousness.', False),
        (72, 12, 6, 'Pisces', 'Water', 'Mumiah', 'מום', 'Angels', 'Yesod', 492, 'End of All Things', 'Andromalius', 72, 'Earl', 36, 'Silver', 68, 'Returner of What Was Stolen at the Void', 'Mumiah completes the cycle, returning souls to divine origin, where Andromalius seals the loop. At 10:00 (600s), the circuit instantly ignites back into Gate 1!', False),
    ]

    gates = []
    cadence = 600.0 / 72.0  # 8.333333333333334s

    for t in raw_tuples:
        gate_id, act_no, q_idx, sign, elem, a_name, a_heb, a_choir, a_sph, a_freq, a_attr, d_name, d_goetia, d_rank, d_leg, d_met, d_freq, d_title, inter, is_breach = t
        start_deg = (gate_id - 1) * 5.0
        end_deg = gate_id * 5.0
        start_sec = (gate_id - 1) * cadence
        end_sec = gate_id * cadence

        start_min = int(start_sec // 60)
        start_rem = int(start_sec % 60)
        end_min = int(end_sec // 60)
        end_rem = int(end_sec % 60)

        gates.append({
            "GateId": gate_id,
            "ActNumber": act_no,
            "Sign": sign,
            "Element": elem,
            "QuinanceIndex": q_idx,
            "DegreeSpan": {
                "StartDegree": start_deg,
                "EndDegree": end_deg,
                "SignSpan": f"{(q_idx - 1) * 5}°–{q_idx * 5}° {sign}",
                "GlobalSpan": f"{start_deg:.0f}°–{end_deg:.0f}°"
            },
            "TemporalCadence": {
                "StartSeconds": round(start_sec, 2),
                "EndSeconds": round(end_sec, 2),
                "DurationSeconds": round(cadence, 2),
                "TimecodeStart": f"{start_min:02d}:{start_rem:02d}",
                "TimecodeEnd": f"{end_min:02d}:{end_rem:02d}",
            },
            "Angel": {
                "Name": a_name,
                "Hebrew": a_heb,
                "Choir": a_choir,
                "Sphere": a_sph,
                "FrequencyHz": a_freq,
                "DivineAttribute": a_attr,
                "Polarity": "Celestial Light"
            },
            "Demon": {
                "Name": d_name,
                "GoetiaNumber": d_goetia,
                "Rank": d_rank,
                "Legions": d_leg,
                "Metal": d_met,
                "FrequencyHz": d_freq,
                "ChthonicTitle": d_title,
                "Polarity": "Chthonic Shadow"
            },
            "HarmonicInteraction": inter,
            "IsBreachPoint": is_breach
        })

    return gates

# ==============================================================================
# LAYER 3: MULTIMODAL BOUNDARY CODE (PROMPT COMPOSITION & API CALLER)
# ==============================================================================

def compose_veo3_prompt(gate: Dict[str, Any], aspect_ratio: str = "16:9") -> str:
    """Dynamically generates the prompt injecting all 3 architectural layers."""
    if gate["IsBreachPoint"]:
        return GATE_48_LATERAL_DOLLY_SPEC["Veo3PromptInject"]

    ratio_desc = "16:9 widescreen landscape" if aspect_ratio == "16:9" else "9:16 vertical portrait"
    
    prompt = (
        f"Cinematic {ratio_desc} master shot, Dark-Gothic Sumerian Futurism. "
        f"Act {gate['ActNumber']} ({gate['Sign']} {gate['Element']}), Gate {gate['GateId']} ({gate['DegreeSpan']['GlobalSpan']}). "
        f"High-contrast chiaroscuro with mirror-polished basalt megaliths and glowing crimson cuneiform energy veins. "
        f"In the exact same coordinate space, angel {gate['Angel']['Name']} projects radiant celestial light and wing-like photon geometries ({gate['Angel']['FrequencyHz']}Hz), "
        f"while demon {gate['Demon']['Name']} ({gate['Demon']['Rank']}, Seal #{gate['Demon']['GoetiaNumber']}) anchors deep chthonic embers ({gate['Demon']['FrequencyHz']}Hz). "
        f"{gate['HarmonicInteraction']} "
        f"Recursive continuity: continuous 8.33s camera motion gliding smoothly along a 360-degree circular basalt rail, "
        f"volumetric cymatic particles, optical flow coherence, zero micro-cuts, photorealistic 4K render."
    )
    return prompt

def generate_gate_video(
    gate_id: int,
    aspect_ratio: str = "16:9",
    api_key: Optional[str] = None,
    dry_run: bool = False
) -> Dict[str, Any]:
    """Triggers generation for a specific gate using Google GenAI SDK (Veo 3)."""
    gates = build_72_gates_matrix()
    target_gate = next((g for g in gates if g["GateId"] == gate_id), None)
    if not target_gate:
        raise ValueError(f"Gate {gate_id} not found in 72-gate matrix.")

    prompt = compose_veo3_prompt(target_gate, aspect_ratio)

    result = {
        "GateId": gate_id,
        "Sign": target_gate["Sign"],
        "Timecode": f"{target_gate['TemporalCadence']['TimecodeStart']}–{target_gate['TemporalCadence']['TimecodeEnd']}",
        "AspectRatio": aspect_ratio,
        "SystemDirective": CANONICAL_SYSTEM_DIRECTIVE,
        "Prompt": prompt,
        "Status": "dry_run" if dry_run else "initiating"
    }

    if dry_run:
        print(f"\n[DRY RUN] Gate {gate_id} ({target_gate['Sign']} {target_gate['DegreeSpan']['GlobalSpan']})")
        print(f"Timecode: {result['Timecode']}")
        print(f"Prompt:\n{prompt}\n")
        return result

    effective_key = api_key or os.environ.get("GEMINI_API_KEY")
    if not effective_key:
        raise ValueError("GEMINI_API_KEY environment variable is required to execute generation.")

    if genai is None:
        raise ImportError("google-genai Python library not found. Install via: pip install google-genai")

    client = genai.Client(api_key=effective_key)
    print(f"Sending generation request to Veo 3 for Gate {gate_id}...")

    operation = client.models.generate_videos(
        model="veo-3.1-fast-generate-preview",
        prompt=prompt,
        config=types.GenerateVideosConfig(
            number_of_videos=1,
            aspect_ratio=aspect_ratio,
            resolution="720p"
        )
    )

    result["OperationName"] = operation.name
    result["Status"] = "polling"
    print(f"Operation started: {operation.name}. Polling for completion...")

    # Poll operation until done
    while not operation.done:
        time.sleep(10)
        operation = client.operations.get(operation)
        print("  ...still rendering...")

    if operation.error:
        result["Status"] = "failed"
        result["Error"] = str(operation.error)
        print(f"Generation failed: {operation.error}")
    else:
        video_uri = operation.response.generated_videos[0].video.uri
        result["Status"] = "completed"
        result["VideoUri"] = video_uri
        print(f"Success! Video URI: {video_uri}")

    return result

# ==============================================================================
# CLI INTERFACE
# ==============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="The Mirror of Spheres — Automated 72-Gate Generative Pipeline (Veo 3 & Gemini API)"
    )
    parser.add_argument("--gate", type=int, default=1, help="Gate ID (1 to 72) to generate")
    parser.add_argument("--aspect-ratio", choices=["16:9", "9:16"], default="16:9", help="Video aspect ratio")
    parser.add_argument("--dump-matrix", action="store_true", help="Dump complete 72-gate JSON matrix to stdout")
    parser.add_argument("--export-matrix", type=str, default="", help="Save 72-gate JSON matrix to file path")
    parser.add_argument("--gate48-dolly", action="store_true", help="Inspect or generate Gate 48 240° lateral dolly seam event")
    parser.add_argument("--dry-run", action="store_true", help="Output prompt and system directive without calling API")

    args = parser.parse_args()

    if args.dump_matrix:
        matrix = build_72_gates_matrix()
        print(json.dumps(matrix, indent=2, ensure_ascii=False))
        return

    if args.export_matrix:
        matrix = build_72_gates_matrix()
        with open(args.export_matrix, "w", encoding="utf-8") as f:
            json.dump(matrix, f, indent=2, ensure_ascii=False)
        print(f"Matrix successfully exported to {args.export_matrix} ({len(matrix)} gates).")
        return

    if args.gate48_dolly:
        print("\n=== GATE 48 (6:40 / 400.0s) LATERAL DOLLY EVENT SPECIFICATION ===")
        print(json.dumps(GATE_48_LATERAL_DOLLY_SPEC, indent=2, ensure_ascii=False))
        if not args.dry_run:
            generate_gate_video(gate_id=48, aspect_ratio=args.aspect_ratio, dry_run=False)
        return

    # Standard gate generation
    generate_gate_video(
        gate_id=args.gate,
        aspect_ratio=args.aspect_ratio,
        dry_run=args.dry_run
    )

if __name__ == "__main__":
    main()
