/**
 * hodData.js — shared source of truth for the Heads of the Department
 * index (HeadsOfDepartments.jsx) and the individual profile page
 * (HodDetail.jsx).
 *
 * IMPORTANT FIX: HodDetail.jsx was importing from "./Hoddata.js" but
 * this file is "hodData.js" — different case. That works on a
 * case-insensitive filesystem (Windows, default macOS) but silently
 * fails to resolve on a case-sensitive one (Linux, most CI/hosting).
 * The updated HodDetail.jsx below imports "./hodData.js" — matching
 * this file's actual name exactly — so make sure both files keep
 * that exact casing on disk.
 *
 * SCHEMA — every field below is optional except slug/name/department/
 * photo. HodDetail.jsx only renders a section when the relevant
 * field(s) are present, so a HOD entry can carry as little or as much
 * as you have for them:
 * - title, dateOfJoining, supervisor           → quick facts
 * - qualifications: string[]                   → Educational Qualification(s)
 * - inBrief: string                             → "In Brief"
 * - subjectExpertise: string[]                  → "Subject Expertise" (bullet list)
 * - subjectBrief: string                        → fallback prose version of the above
 * - researchArea: string[]                      → "Research Area" (bullet list)
 * - researchWork: string                        → fallback prose version of the above
 * - professionalExperience: {role,place,period}[] → "Professional Experience" (Academic)
 * - membership: string[]                        → "Membership"
 * - patents: {role,patentId,title,level,registeredWith,year,status}[]
 * - journals: {journal,title,year,role,volume}[] → "International & National Journals"
 * - conferences: {conference,title,date,role,organizedBy}[] → "...Conferences"
 * - booksPublished: {publisher,title,year,role,edition}[]
 * - contributions: {title,authors,nature,date}[]
 * - programmesOrganised: {title,from,to,sponsoringAgency,audience}[]
 * - programmesAttended: {title,from,to,organizedBy,sponsoringAgency}[]
 * - awards: {title,awardedBy,date}[]
 * - doctoralGuidance: {candidate,thesis,date}[]  → "...Supervision: Completed"
 * - certificateCourses: string[]
 * - contactEmails: string[]
 * - googleScholarUrl, researchScholarUrl: string → Contact & Links
 *
 * COMPLETENESS NOTES (Dr. Karpagam G R, transcribed from ten profile
 * screenshots):
 * - Research Area was cut off after six entries in the source
 *   screenshot — add the rest once you have them.
 * - The Journals table's row 9 had its Journal name scrolled out of
 *   frame in the screenshot (only the paper title, year, role, and
 *   volume were visible) — left blank here rather than guessed.
 * - The Conferences table appeared to continue past row 8 (cut off at
 *   the bottom of the screenshot) — add further rows once you have
 *   them. Several rows show "Select" or a blank in "Organized By" —
 *   that's transcribed as-is; it looks like an unfilled dropdown on
 *   the source page rather than a real organisation name.
 * - Contributions row 2's author list was cut off after two names —
 *   add the rest once you have them.
 * - Programmes Attended row 6's sponsoring agency was cut off at the
 *   bottom of the screenshot — left blank.
 * - A few source rows contain their own typos (e.g. "PSG CT Alumni
 *   Assocoation", "Institution od Engineers", "CMI Level 5 award in
 *   Mangement and Leadership") — kept verbatim rather than silently
 *   corrected, since these are the college's own published text.
 * - Doctoral Guidance rows 2 and 3 are identical in the source
 *   screenshot (same candidate, thesis, and date) — kept as two
 *   entries since that's what the source page shows, rather than
 *   assuming one is an error and deleting it.
 *
 * `photo` paths are whatever you already have on disk under
 * /assets/HOD/.
 */

export const HODS = [
  {
    slug: "vijayalakshmi-d",
    name: "Dr. Vijayalakshmi D",
    department: "Apparel & Fashion Design",
    photo: "/assets/HOD/Hod1.jpg",
  },
  {
    slug: "shina-sheen",
    name: "Dr. Shina Sheen",
    department: "Applied Mathematics & Computational Sciences",
    photo: "/assets/HOD/Hod2.png",
    title: "Professor",
    dateOfJoining: "10/06/2005",
    qualifications: [
      "B.Sc (Physics) — Calicut University — 1993",
      "M.C.A — Bharathiar University — 1996",
      "Ph.D (Computer Science) — Anna University — 23/02/2015",
      "Computer Science (Computer Science) — Anna University — 20/05/2007",
    ],
    supervisor: "Dr. R. Anitha",
    certificateCourses: ["GIAC Certified Intrusion Analyst…"],
    contactEmails: ["hod.amcs@psgtech.ac.in", "ssh.amcs@psgtech.ac.in"],
    googleScholarUrl: "https://scholar.google.co.in/citations?user=d0ptyhgAAAAJ&hl=en",
  },
  {
    slug: "murugavel-s-c",
    name: "Dr. Murugavel S C",
    department: "Applied Science",
    photo: "/assets/HOD/Hod3.jpg",
  },
  {
    slug: "neelakrishnan-s",
    name: "Dr. Neelakrishnan S",
    department: "Automobile Engineering",
    photo: "/assets/HOD/Hod4.jpg",
  },
  {
    slug: "ananthasubramanian-m",
    name: "Dr. Ananthasubramanian M",
    department: "Biotechnology",
    photo: "/assets/HOD/HOd5.jpg",
  },
  {
    slug: "vidhyapriya-r",
    name: "Dr. Vidhyapriya R",
    department: "Biomedical Engineering",
    photo: "/assets/HOD/Hod6.jpg",
  },
  {
    slug: "theivarasu-c",
    name: "Dr. Theivarasu C",
    department: "Chemistry",
    photo: "/assets/HOD/Hod7.jpg",
  },
  {
    slug: "sivakumar-c-g",
    name: "Mr. Sivakumar C G",
    department: "Civil Engineering",
    photo: "/assets/HOD/Hod8.jpg",
  },
  {
    slug: "karpagam-g-r",
    name: "Dr. Karpagam G R",
    department: "Computer Science & Engineering",
    photo: "/assets/HOD/Hod9.png",

    title: "Professor",
    dateOfJoining: "24/02/1997",
    qualifications: [
      "ME (CSE) — PSG College of Technology, Bharathiar University — 1998",
      "(Certi.A Course on PB, Oracle, V) — Hi Tech Computers, Malleshwaram, Bangalore — 1996",
      "BE (CSE) — Kongu Engineering College, Bharathiar — 1992",
      "Ph.D (Information and Communication) — PSG College of Technology, Anna University — 05/05/2008",
    ],
    supervisor: "Dr. S.N. Sivanandam",
    contactEmails: ["grk.cse@psgtech.ac.in"],
    googleScholarUrl: "https://scholar.google.com/citations?hl=en&user=MsVSOuwAAAAJ",
    researchScholarUrl: "https://www.scopus.com/authid/detail.uri?authorId=36131590200",

    inBrief:
      "Dr. G.R Karpagam is a Professor and Head with 30 years of experience in Computer Science and Engineering at PSG College of Technology. She obtained her B.E, M.E, and Ph.D in Computer Science and Engineering. Areas of specialization include Database Management System, Data Structures and Algorithms, AI and ML, Service Oriented Architecture, Blockchain, and Security.",

    subjectExpertise: [
      "Database Management System",
      "Cryptography and Network Security",
      "Object Oriented Analysis and Design",
      "Cloud Computing",
      "Open Source Software",
      "Data Structures",
      "System Software",
      "Multi-tier Computing",
      "Block Chain, Semantic Web Services",
    ],

    researchArea: [
      "Database Management System",
      "Cloud Computing",
      "Artificial Intelligence",
      "Block Chain, Semantic Web Services",
      "Cryptography and Network Security",
      "Data Structures",
    ],

    professionalExperience: [
      { role: "Lecturer, Assistant Professor, Professor", place: "PSG College of Technology, Coimbatore", period: "24/02/1997 – Till Date" },
      { role: "Professor and Associate Head", place: "PSG College of Technology, Coimbatore", period: "02/04/2018 – Till Date" },
      { role: "Professor Incharge, Dr.GRD Memorial Library", place: "Coimbatore", period: "10/06/2019 – Till Date" },
    ],

    membership: [
      "Member — Institute of Electrical and Electronics Engineers, United States of America",
      "Member — Institute of Electrical and Electronics Engineers, Women in Engineering, United States of America",
      "Member — Association for Computing Machinery, New York City, New York, United States",
      "Life Member — The Indian Society for Technical Education, New Delhi",
      "Life Member — Advance Computing and Communication Society, Bangalore",
      "Life Member — Institution od Engineers, New Delhi",
      "Institutional — Institute of Electrical and Electronics Engineers, USA",
      "Member — Senior IEEE Member, USA",
    ],

    patents: [
      {
        role: "Co Investigator",
        patentId: "201941040131",
        title: "System and method for notifying an arrival of an emergency vehicle to automotive vehicles",
        level: "National",
        registeredWith: "",
        year: "2019",
        status: "Published",
      },
    ],

    journals: [
      { journal: "International Journal of Intelligent Systems Technologies and Applications", title: "Knowledge-based genetic algorithm approach to optimise gated recurrent unit for semantic web service classification", year: "2023", role: "Co Author", volume: "21" },
      { journal: "International Journal of Adaptive and Innovative Systems", title: "Facial emotion detection using convolutional neural network algorithm", year: "2022", role: "Main Author", volume: "3" },
      { journal: "Computer Systems Science And Engineering", title: "Energy-Aware Scheduling for Tasks with Target-Time in Blockchain based Data Centres", year: "2022", role: "Co Author", volume: "40" },
      { journal: "Malaysian Journal Of Computer Science", title: "Genetic Algorithm - Optimized Gated Recurrent Unit (GRU) Network for Semantic Web Services Classification", year: "2022", role: "Co Author", volume: "35" },
      { journal: "Applied Intelligence", title: "Reinforcement learning infused intelligent framework for semantic web service composition", year: "2022", role: "Co Author", volume: "52" },
      { journal: "International Journal of Information Technology and Decision Making", title: "GPU enabled Improved Reference Ideal Method (I-RIM) for Web Service Selection", year: "2022", role: "Co Author", volume: "21" },
      { journal: "Malaysian Journal Of Computer Science", title: "Genetic Algorithm-Optimized Gated Recurrent Unit (GRU) Network for Semantic Web Services Classification", year: "2022", role: "Co Author", volume: "35" },
      { journal: "SADHANA — Academy Proceedings in Engineering Sciences", title: "Incorporating blockchain for semantic web service selection (SWSS) method", year: "2021", role: "Co Author", volume: "46" },
      { journal: "", title: "Leveraging Education Through Mobile App and Chatbot - Skylanot", year: "2021", role: "Main Author", volume: "9" },
    ],

    conferences: [
      { conference: "Lecture Notes in Networks and Systems", title: "XAI-Powered CBR-Enabled Assessment of Bone Health: Integrating Lifestyle Management Recommendation for Prevention and Care", date: "13-11-2025", role: "Co Author", organizedBy: "" },
      { conference: "2025 International Conference on Next Generation Computing Systems — Intelligent System for Sustainable Development (ICNGCS 2025)", title: "eXplainable AI-Enabled Deep Learning Eco System: Advancing Breast Cancer Prediction through Histological Image Analysis", date: "08-10-2025", role: "Co Author", organizedBy: "PSG College of Technology" },
      { conference: "Advancing Societally Relevant Applications of Knowledge Through Scientific Research", title: "zk-ID: A privacy-preserving identity verification framework for healthcare using blockchain, ECDSA, and zero-knowledge proofs", date: "15-05-2025", role: "Co Author", organizedBy: "PSG College of Technology" },
      { conference: "2025 International Conference on Computational Innovations and Engineering Sustainability (ICCIES)", title: "AI with Clarity: Unraveling Plant Disease through XAI", date: "25-04-2025", role: "Main Author", organizedBy: "" },
      { conference: "2025 International Conference on Computational Innovations and Engineering Sustainability (ICCIES)", title: "Enhancing Breast Cancer Detection in Federated Learning by Memorizing at Test Time", date: "25-04-2025", role: "Main Author", organizedBy: "" },
      { conference: "2025 IEEE 14th International Conference on Communication Systems and Network Technologies (CSNT 2025)", title: "Smart Vision: AI-Driven Driver Fatigue Monitoring for Drivers", date: "08-03-2025", role: "Co Author", organizedBy: "" },
      { conference: "IEEE Conference on Computer Vision and Machine Intelligence", title: "Enhancing Cybersecurity Resilience with CYBRANA: A Cyber YARA/YAML-Based Resilience Firewall Solution Applied with Next-Gen AI", date: "20-10-2024", role: "Co Author", organizedBy: "" },
      { conference: "International Conference on Smart Systems for Electrical, Electronics, Communication and Computer Engineering (ICSSFEC 2024)", title: "Multimodal Fusion for Precision Personality Trait Analysis: A Comprehensive Model", date: "29-06-2024", role: "Main Author", organizedBy: "" },
    ],

    booksPublished: [
      { publisher: "CRC Publisher", title: "Smart Cyber Physical Systems: Advances, Challenges and Opportunities", year: "2020", role: "Main Author", edition: "1" },
      { publisher: "Novascience Publisher", title: "Computing Paradigms for Smart Healthcare", year: "2020", role: "Co Author", edition: "1" },
      { publisher: "Springer", title: "Recent Advances on Memetic Algorithms and its Applications in Image Processing", year: "2020", role: "Co Author", edition: "1" },
      { publisher: "Springer", title: "Studies in Fuzziness and Soft Computing — Smart Techniques for a Smarter Planet Towards Smarter Algorithms", year: "2019", role: "Main Author", edition: "1" },
    ],

    contributions: [
      {
        title: "Analyzing Statewise COVID-19 Lockdowns Using Support Vector Regression",
        authors: "K Naresh (Student), M Keerthna (Student), M Sairam Vaidya (Student), Dr. T. Karthikeyan (University of Technology and Applied Sciences — Salalah), Dr. Karpagam G R, Syed Khaja Mohideen (Dept. of Information Technology, University of Technology and Applied Sciences — Salalah)",
        nature: "Chapter",
        date: "16-11-2023",
      },
      {
        title: "Local Binary Pattern Based Criminal Identification System",
        authors: "Dhana Srinithi (Student), Soundarya (Student)…",
        nature: "Chapter",
        date: "31-07-2023",
      },
    ],

    programmesOrganised: [
      { title: "Intellitech Expo 2025", from: "23-12-2025", to: "23-12-2025", sponsoringAgency: "—", audience: "115" },
      { title: "AI Spectrum: Bridging Research, Industry & Innovation", from: "22-12-2025", to: "24-12-2025", sponsoringAgency: "Anusandhan National Research Foundation (ANRF)", audience: "950" },
      { title: "Annual Book Exhibition 2025", from: "09-09-2025", to: "11-09-2025", sponsoringAgency: "—", audience: "1500" },
      { title: "Writing Quality Technical Papers for IEEE", from: "12-12-2024", to: "12-12-2024", sponsoringAgency: "—", audience: "67" },
      { title: "Annual Book Exhibition 2024", from: "26-11-2024", to: "28-11-2024", sponsoringAgency: "—", audience: "150" },
      { title: "Turnitin Plagiarism Software", from: "26-07-2024", to: "26-07-2024", sponsoringAgency: "—", audience: "34" },
      { title: "PoSH Awareness Programme", from: "09-03-2024", to: "09-03-2024", sponsoringAgency: "—", audience: "99" },
      { title: "ATAL FDP on Reengineering of Library Landscape: Adopting Industry 5.0 for the 21st Century", from: "04-12-2023", to: "09-12-2023", sponsoringAgency: "AICTE", audience: "34" },
      { title: "AICTE-ATAL Faculty Development Programme on Reengineering of Library Landscape: Adopting Industry 5.0 for the 21st Century", from: "04-12-2023", to: "09-12-2023", sponsoringAgency: "AICTE", audience: "34" },
      { title: "IEEE Xplore Workshop", from: "21-09-2023", to: "21-09-2023", sponsoringAgency: "—", audience: "119" },
      { title: "Workshop on Exploring the E-Resources using Knimbus", from: "14-09-2023", to: "14-09-2023", sponsoringAgency: "—", audience: "184" },
      { title: "Fire Safety and First Aid", from: "28-01-2023", to: "28-01-2023", sponsoringAgency: "—", audience: "23" },
      { title: "Thesis Rendering on DSpace Institutional Repository", from: "18-09-2022", to: "18-09-2022", sponsoringAgency: "—", audience: "19" },
      { title: "Annual Book Exhibition-2022", from: "13-09-2022", to: "15-09-2022", sponsoringAgency: "—", audience: "1000" },
      { title: "Workshop on Thesis Rendering on DSpace Institutional Repository", from: "17-03-2022", to: "17-03-2022", sponsoringAgency: "—", audience: "19" },
    ],

    programmesAttended: [
      { title: "ICT Tools for Teaching, Learning Process and Institute", from: "10/08/2020", to: "26/08/2020", organizedBy: "Electronics & ICT Academies NIT Patna, MNIT Jaipur, PDPM IIITDM Jabalpur, IIT Guwahati and IIT Roorkee", sponsoringAgency: "PSG College of Technology" },
      { title: "Bibliometrics and Research Output Analysis", from: "20/07/2020", to: "24/07/2020", organizedBy: "Information and Library Network (INFLIBNET) Centre, Gandhinagar, Gujarat", sponsoringAgency: "PSG College of Technology" },
      { title: "Blockchain Basics", from: "31/05/2020", to: "30/06/2020", organizedBy: "Coursera", sponsoringAgency: "PSG College of Technology" },
      { title: "AICTE ATAL Course on Blockchain", from: "11/05/2020", to: "20/05/2020", organizedBy: "AICTE Training And Learning (ATAL) Academy, Punjab Engineering College", sponsoringAgency: "PSG College of Technology" },
      { title: "AI For Everyone", from: "01/05/2020", to: "31/05/2020", organizedBy: "Coursera", sponsoringAgency: "PSG College of Technology" },
      { title: "Design, Develop and Deliver Online Courses through MOODLE Platform", from: "23/04/2020", to: "24/04/2020", organizedBy: "Department of Technical Education State Project Implementation Unit — Tamil Nadu & Coimbatore Institute of Technology", sponsoringAgency: "" },
    ],

    awards: [
      { title: "Best project guided", awardedBy: "PSG CT Alumni Assocoation", date: "30/06/2024" },
      { title: "Best Paper", awardedBy: "IEEE", date: "29/06/2024" },
      { title: "Best Paper", awardedBy: "IEEE", date: "28/06/2024" },
      { title: "Best project guided", awardedBy: "Alumni Aasciation", date: "31/05/2023" },
      { title: "Crossed phase 2", awardedBy: "AICTE", date: "05/09/2022" },
      { title: "CMI Level 5 award in Mangement and Leadership", awardedBy: "AICTE-India and CMI-UK", date: "01/09/2021" },
    ],

    doctoralGuidance: [
      { candidate: "Devi Ilangovan", thesis: "Investigations on Energy and Performance Aware Task Scheduling in Cloud Environment", date: "09-03-2023" },
      { candidate: "S. Sridevi, Dr. Vinoth Kumar B (IT)", thesis: "Blockchain Empowered Security and Privacy Vested Framework for Semantic Web Service Composition", date: "21-09-2022" },
      { candidate: "S. Sridevi, Dr. Vinoth Kumar B (IT)", thesis: "Blockchain Empowered Security and Privacy Vested Framework for Semantic Web Service Composition", date: "21-09-2022" },
      { candidate: "Ms. Swetha N G", thesis: "AI Powered GPU Enabled Semantic Web Service Composition", date: "15-07-2022" },
      { candidate: "Dr. Vijayalakshmi S", thesis: "Self Organizing Blockchain Enabled Security Framework for Online Voting", date: "07-01-2021" },
      { candidate: "Dr. Bhama S, MCA", thesis: "Design and Development of AI-Powered QoS Based Architecture for Semantic Web Service Discovery in Cloud", date: "13-11-2019" },
    ],
  },
];

export function getHod(slug) {
  return HODS.find((h) => h.slug === slug);
}