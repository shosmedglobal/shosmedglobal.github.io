# SHOS Med - Keyword & SEO Strategy

Last updated: 2026-04-30

## Target personas

1. **International HS students** (Europe-bound) -> LF3 / Czech Republic / English-taught MD
2. **US HS students** (no-MCAT path) -> "skip the MCAT" angle, US to Europe pipeline
3. **Caribbean medical students** -> alternative-to-Caribbean angle (return to Europe or plan US match smarter)
4. **IMGs seeking US residency** -> ECFMG + USMLE + ERAS + match strategy
5. **Step / board candidates** -> USMLE Step 1 P/F, Step 2 CK, OET Medicine

---

## Page-to-persona-to-keyword map

| Page | Primary persona | Primary keywords | Long-tail keywords | Search intent |
|---|---|---|---|---|
| `/` (index) | All / brand | SHOS Med, study medicine in Czech Republic, medical school Europe, IMG mentorship | "study medicine in english europe", "european medical school for americans", "img residency mentorship" | Informational + brand |
| `/applicants.html` | International HS, US HS no-MCAT, Caribbean transfers | apply to medical school in Czech Republic, Charles University application, medical school without MCAT, English-taught MD Europe | "study medicine in prague english", "apply to charles university medical school", "medical school no mcat europe", "american high school student european medical school" | Transactional |
| `/students.html` | IMG residency seekers, current European med students | IMG residency match, European medical school to US residency, USMLE prep IMG, ERAS strategy IMG | "match into us residency from prague", "img match strategy internal medicine", "img research opportunities for residency", "ecfmg pathway charles university" | Transactional |
| `/lf3.html` | International HS, US HS, Caribbean transfers | Charles University LF3, Third Faculty of Medicine Prague, study medicine prague | "lf3 charles university entrance exam", "charles university english program tuition", "lf3 prague international students", "kralovske vinohrady medical school" | Informational |
| `/mentors.html` | All | physician mentor IMG, charles university alumni mentor | "img physician mentorship usmle", "charles university graduate practicing in us" | Informational |
| `/community.html` | Current students + applicants | medical school forum, IMG Q&A, USMLE community | "charles university student forum", "img match q and a", "european medical school discussion" | Informational + community |
| `/blog/applying-to-charles-university.html` | Applicants | charles university application tips, prague medical school student life, lf3 entrance exam advice | "what to know before applying to charles university", "charles university entrance exam tips", "first year prague medical school" | Informational |
| `/blog/from-acceptance-to-residency.html` | Current European med students | european medical student to us residency, usmle timeline img, eras roadmap img | "year by year usmle plan img", "when to take step 1 european med school", "img research timeline" | Informational |
| `/qbank.html` | Paying applicants | (noindex - app page) | (noindex) | Transactional |
| `/practice-exam.html` | Free-tier applicants | (noindex - demo) | (noindex) | Transactional |

---

## Schema deployment plan

| Page | Schema types |
|---|---|
| `/` | Organization, WebSite (with SearchAction), EducationalOrganization |
| `/applicants.html` | EducationalOccupationalProgram (LF3 General Medicine), Service offerings, BreadcrumbList |
| `/students.html` | Service (residency mentorship), ItemList (offerings), BreadcrumbList |
| `/lf3.html` | EducationalOrganization (deepened), EducationalOccupationalProgram (General Medicine MD), FAQPage, BreadcrumbList |
| `/mentors.html` | Person x 2 (Eli Zolotov, Anat Sigal), BreadcrumbList |
| `/community.html` | FAQPage, Blog reference, BreadcrumbList |
| `/blog/*.html` | BlogPosting (upgrade from Article) with nested Person author |

---

## Title / description rules of thumb

- **Title**: 50-60 chars, primary keyword first, brand suffix " | SHOS Med"
- **Description**: 140-160 chars, action verb up front, end with social proof or CTA
- **No em dashes** in any user-facing copy (sitewide rule). Use middle dot or comma.
- **OG title** can be punchier and emoji-free
- **OG description** should hint at what's on the page (what visitors will see/learn)
- **Twitter title/description** can mirror OG but trimmed if needed

---

## Conversion-focused phrasing inventory

These phrases appear in optimized descriptions because each maps to a known persona pain point:

- "without taking the MCAT" -> US HS persona
- "English-taught" -> international students worried about Czech requirement
- "founded 1348" / "top 2%" -> credibility for parents and credential-conscious students
- "from Charles University alumni" -> social proof / lived experience
- "match into US residency" -> IMG persona transactional intent
- "1,000+ practice questions" -> applicants comparing prep options
- "physicians who walked this path" -> trust + relatability
