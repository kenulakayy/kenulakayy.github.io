export type Project = {
  href: string;
  src: string;          // 1200w
  src800?: string;
  src1600?: string;
  alt: string;
  title: string;
  artist: string;
};

const ART = "https://kenulakayy.github.io/Album_Arts";
const CRE = "https://kenulakayy.github.io/Creative_Projects";

const sp = (slug: string): Pick<Project, "src" | "src800" | "src1600"> => ({
  src: `${ART}/${slug}-1200.webp`,
  src800: `${ART}/${slug}-800.webp`,
  src1600: `${ART}/${slug}-1600.webp`,
});

const cp = (slug: string): Pick<Project, "src" | "src800" | "src1600"> => ({
  src: `${CRE}/${slug}-1200.webp`,
  src800: `${CRE}/${slug}-800.webp`,
  src1600: `${CRE}/${slug}-1600.webp`,
});

export const studioSlides: Project[][] = [
  [
    { ...sp("DONARUWINI_SIHIWEIUNUHUMA"), href: "https://www.youtube.com/watch?v=9oSUN_EiVoY", alt: "Sihiwei Unuhuma - Dona Ruwini", title: "Sihiwei Unuhuma (සිහිවෙයි උනුහුම)", artist: "Dona Ruwini" },
    { ...sp("STEFFANDIAZ_DONTLETGO"), href: "https://song.link/s/5fZtM9I9nYigD5GBWyvCGw", alt: "Steffan Diaz - Don't Let Go", title: "Don't Let Go", artist: "Steffan Diaz" },
    { ...sp("AMARSHA_ANURAGEN"), href: "https://www.youtube.com/watch?v=dasDzNOu4PE", alt: "Amarsha Tissera - Anuragen (Cover)", title: "Anuragen (Cover)", artist: "Amarsha Tissera" },
    { ...sp("AMARSHA_SEETHAMARUTHE"), href: "https://www.youtube.com/watch?v=Snuss4_Zs90", alt: "Amarsha Tissera - Seetha Maruthe (Cover)", title: "Seetha Maruthe (Cover)", artist: "Amarsha Tissera" },
    { ...sp("AMARSHA_PRIYAWEE"), href: "https://www.instagram.com/p/DQKGMHijIdT/", alt: "Amarsha Tissera - Priyawee (Cover)", title: "Priyawee (Cover)", artist: "Amarsha Tissera" },
    { ...sp("AMARSHA_MATAHEENAYAKWELA"), href: "https://www.youtube.com/watch?v=Dzn8FLMADQo", alt: "Amarsha Tissera - Mata Heenayak Wela (Cover)", title: "Mata Heenayak Wela (Cover)", artist: "Amarsha Tissera" },
    { ...sp("INFINITY_PAATA_PAATA_LOKAYAK"), href: "https://song.link/y/GPnMIuKgB18", alt: "INFINITY - Paata Paata Lokayak", title: "Paata Paata Lokayak", artist: "INFINITY" },
    { ...sp("BEDROOM_ALBUM_ART"), href: "https://li.sten.to/bedroom", alt: "Kenula Kandanaarachchi - Bedroom", title: "Bedroom", artist: "Kenula Kandanaarachchi" },
  ],
  [
    { ...sp("NADINE_GOODNESS_OF_GOD"), href: "https://www.youtube.com/watch?v=YS7hz0ufupk", alt: "Nadine - Goodness of God (Cover)", title: "Goodness of God (Cover)", artist: "Nadine" },
    { ...sp("AMARSHA_MAL_PAN_PODAK"), href: "https://www.instagram.com/p/DMpoZyWswo3/", alt: "Amarsha Tissera - Mal Pan Podak (Cover)", title: "Mal Pan Podak (Cover)", artist: "Amarsha Tissera" },
    { ...sp("AMARSHA_PAALUWE_SATHUTA"), href: "https://www.instagram.com/p/DMUVOKHNM0s/", alt: "Amarsha Tissera - Paaluwe Sathuta (Cover)", title: "Paaluwe Sathuta (Cover)", artist: "Amarsha Tissera" },
    { ...sp("RUMALKI_THANI_MANASAKA"), href: "https://www.youtube.com/watch?v=P3j0_LuZBWg", alt: "Rumalki Raveesha - Thani Manasaka (Cover)", title: "Thani Manasaka (Cover)", artist: "Rumalki Raveesha" },
    { ...sp("BLIND_SCHOOL_APE_DAKMA"), href: "https://www.youtube.com/watch?v=t_DUDmobQgE", alt: "Apé Dakma - Unseen Expressions", title: "අපේ දැක්ම Unseen Expressions", artist: "The School for the Blind Ratmalana" },
    { ...sp("AMARSHA_SANSARAYE"), href: "https://www.instagram.com/p/DJbxK8TsYFI/", alt: "Amarsha Tissera - Sansaraye (Cover)", title: "Sansaraye (Cover)", artist: "Amarsha Tissera" },
    { ...sp("NUWAN_PAPARE_JAZZ"), href: "https://www.youtube.com/watch?v=Evap-ZZc87Y", alt: "Horns with Nuwan - Papara Jazz", title: "Papara Jazz | පපර ජෑස්", artist: "Horns with Nuwan" },
    { ...sp("RUMALKI_DANGAKARA_HANDAKARI"), href: "https://www.instagram.com/p/DG5SH1ev1Fr/", alt: "Rumalki Raveesha - Dangakara Hadakari (Cover)", title: "Dangakara Hadakari (Cover)", artist: "Rumalki Raveesha" },
  ],
  [
    { ...sp("AMARSHA_JEEWITHE_THARUNA_KALE"), href: "https://www.instagram.com/p/DGQVdH5sZlc/", alt: "Amarsha Tissera - Jeewithe Tharuna Kale (Cover)", title: "Jeewithe Tharuna Kale (Cover)", artist: "Amarsha Tissera" },
    { ...sp("AMARSHA_KEHAN_IRIS"), href: "https://www.youtube.com/watch?v=TrlFW0Z05Lc", alt: "IRIS (Cover)", title: "IRIS (Cover)", artist: "Amarsha Tissera & Kehan Gunatilleka" },
    { ...sp("AMARSHA_MIHIRAWIYE"), href: "https://www.youtube.com/shorts/XlEE2H0rABk", alt: "Mihiraviyeh (Cover)", title: "Mihiraviyeh (Cover)", artist: "Amarsha Tissera" },
    { ...sp("ECHOES_OF_US"), href: "https://www.youtube.com/watch?v=u-RbnKfEqfM", alt: "Echoes of Us (Short Film)", title: "Echoes of Us (Short Film)", artist: "Last Bench Movies" },
    { ...sp("AMARSHA_ASIPIYA_SALANA"), href: "https://www.youtube.com/watch?v=CLxDbtnFYWI", alt: "Asipiya Salana (Cover)", title: "Asipiya Salana (Cover)", artist: "Amarsha Tissera" },
    { ...sp("AMARSHA_HANTHANEY"), href: "https://www.youtube.com/watch?v=0uTXkuQrvTw", alt: "Hanthaney (Cover)", title: "Hanthaney (Cover)", artist: "Amarsha Tissera x Yashvin Senanayake" },
    { ...sp("DANCING_SHOES_ALBUM_ART_COVER"), href: "https://hyperfollow.com/kenulakandanaarachchidancingshoes", alt: "Dancing Shoes", title: "Dancing Shoes", artist: "Kenula Kandanaarachchi" },
    { ...sp("PATTA_HISTORY_POLITCS"), href: "https://youtube.com/playlist?list=PLHCzepx_gjsb80nX0EVVEt56pDHpDssVe", alt: "Patta History", title: "Sri Lanka's Politics — a History of Power in Paradise", artist: "Patta History" },
  ],
  [
    { ...sp("AMARSHA_BIRDSOFAFEATHER"), href: "https://www.youtube.com/watch?v=GGmb2E5V9VI", alt: "BIRDS OF A FEATHER (Cover)", title: "BIRDS OF A FEATHER (Cover)", artist: "Amarsha Tissera" },
    { ...sp("THANUKI_DIVE_COVER"), href: "https://www.youtube.com/watch?v=mDjHya2Vjc0", alt: "Dive (Cover)", title: "Dive (Cover)", artist: "Thanuki Goonesinghe" },
    { ...sp("AMARSHA_PLEASE_PLEASE_PLEASE"), href: "https://www.youtube.com/watch?v=7arHqsnm9ko", alt: "Please Please Please (Cover)", title: "Please Please Please (Cover)", artist: "Amarsha Tissera" },
    { ...sp("AMARSHA_EKA_WASSAK"), href: "https://www.youtube.com/watch?v=TdQnGWZSMvs", alt: "Eka Wassak (Cover)", title: "Eka Wassak (Cover)", artist: "Amarsha Tissera x Yashvin Senanayake" },
    { ...sp("AND_THEN_THERE_WERE_NONE"), href: "https://www.youtube.com/watch?v=mLkYtWjqIC8", alt: "10 Little Soldier Boys", title: "10 Little Soldier Boys (And Then There Were None)", artist: "Cold Theatre Seven" },
    { ...sp("DON_SWAPNA_KUMARI"), href: "https://www.youtube.com/watch?v=myBLik-btCE", alt: "Swapna Kumari", title: "Swapna Kumari", artist: "Dona Ruwini" },
    { ...sp("CLOSE_TO_ME"), href: "https://song.link/s/5SKcfchRN8miUir3IqKYWQ", alt: "close to me", title: "close to me", artist: "Vinuk" },
    { ...sp("AMARSHA_STICK_SEASON"), href: "https://www.youtube.com/watch?v=QSKkhmNAGaI", alt: "Stick Season (Live Cover)", title: "Stick Season (Live Cover)", artist: "Amarsha Tissera" },
  ],
  [
    { ...sp("4000_MILES"), href: "https://hyperfollow.com/4000miles", alt: "4000 Miles", title: "4000 Miles", artist: "Kenula Kandanaarachchi" },
    { ...sp("CARLLIN_HALLELUJAH"), href: "https://www.youtube.com/watch?v=26aE1nnDCZk", alt: "Hallelujah (Cover)", title: "Hallelujah (Cover)", artist: "Amarsha Tissera & Carllin Perera" },
    { ...sp("NTYK"), href: "https://hyperfollow.com/nowthatyouknow", alt: "Now That You Know", title: "Now That You Know", artist: "Kenula Kandanaarachchi" },
    { ...sp("SUBHATH_TITLI"), href: "https://www.instagram.com/p/CpY_lSBI5zE/", alt: "Titli", title: "Titli", artist: "Subhath Sanjula" },
    { ...sp("IF_THIS_IS_GOODBYE"), href: "https://www.youtube.com/watch?v=A2PJqQXX_2A", alt: "If This Is Goodbye", title: "If This Is Goodbye", artist: "Kenula Kandanaarachchi" },
    { ...sp("ALL_I_EVER_SEE_IS_YOU"), href: "https://www.youtube.com/watch?v=cGwQl8uVQmQ", alt: "All I Ever See Is You", title: "All I Ever See Is You", artist: "Kenula Kandanaarachchi" },
    { ...sp("SATURDAY_NIGHT"), href: "https://www.youtube.com/watch?v=qVNyUQmVNFI", alt: "Saturday Night", title: "Saturday Night (U & I)", artist: "Kenula Kandanaarachchi" },
    { ...sp("SSA_GROWNUP_CHRISTMAS_LIST"), href: "https://www.youtube.com/watch?v=BhYsfa_qYps", alt: "Grown Up Christmas List", title: "Grown Up Christmas List (Cover)", artist: "Soul Sounds Academy Children's Choir" },
  ],
  [
    { ...sp("SSA_THE_CHRISTMAS_SONG"), href: "https://www.youtube.com/watch?v=imm10K3-5nE", alt: "Christmas Song", title: "Christmas Song (Cover)", artist: "Soul Sounds Academy Intermediate Choir" },
    { ...sp("SSA_ROCKING_AROUND"), href: "https://www.youtube.com/watch?v=ekj79UXx-4Q", alt: "Rocking Around the Christmas Tree", title: "Rocking Around the Christmas Tree", artist: "Soul Sounds KiDZ" },
    { ...sp("3_WORDS"), href: "https://youtu.be/ikCpQXguwDs", alt: "3 Words", title: "3 Words", artist: "Kenula Kandanaarachchi" },
    { ...sp("TAKE_YOU_HOME"), href: "https://youtu.be/r4plnR27NTE", alt: "Take You Home", title: "Take You Home", artist: "Kenula Kandanaarachchi" },
    { ...sp("FALL_APART_LIKE_OTHERS_DO"), href: "https://youtu.be/YZS2cZX5PZ0", alt: "Fall Apart Like Others Do", title: "Fall Apart Like Others Do", artist: "Kenula Kandanaarachchi" },
    { ...sp("PICTURE_PERFECT"), href: "https://youtu.be/DiHNbDJnPoY", alt: "Picture Perfect", title: "Picture Perfect", artist: "Kenula Kandanaarachchi" },
    { href: "https://docs.google.com/spreadsheets/d/1rfe-AVFp1on6dUTb6cWEVkP8vVrvX-R3m_GP_Y6LzFc/edit?usp=sharing", src: "", alt: "View More", title: "View More", artist: "" },
  ],
];

export const creativeSlides: Project[][] = [
  [
    { ...cp("DEAR_2024"), href: "https://www.instagram.com/kenulakandanaarachchi/reel/DEHV1Bft_hq/", alt: "Dear 2024", title: "Dear 2024", artist: "Short Vlog" },
    { ...cp("A_DAY_OUT_IN_GALLE"), href: "https://www.instagram.com/p/C3PTXgFBXMC/", alt: "A Day Out in Galle", title: "A Day Out in Galle", artist: "Short Vlog" },
    { ...cp("QUESTIONS_AND_QUESTIONS_WITH_KENNY"), href: "https://www.youtube.com/playlist?list=PLf6gb2sGqaxYutOBBlukNgSCtq4eKlBCI", alt: "Questions & Questions with Kenny", title: "Questions & Questions with Kenny", artist: "Q & A Series" },
    { ...cp("DEAR_2023"), href: "https://www.instagram.com/p/C1UIuM_orna/", alt: "Dear 2023", title: "Dear 2023", artist: "Short Vlog" },
    { ...cp("BALI_RECAP"), href: "https://www.instagram.com/p/Cv2MKRahCG3/", alt: "Bali Recap", title: "12th Bali International Choir Festival 2023 (Recap)", artist: "Short Vlog" },
    { ...cp("NOVULETI"), href: "https://www.behance.net/gallery/165727601/Novuleti-Logo-Design-and-Branding", alt: "Novuleti", title: "Novuleti", artist: "Logo Design & Branding" },
    { src: `${CRE}/PLACES_TO_VISIT_IN_SRI%20LANKA-1200.webp`, src800: `${CRE}/PLACES_TO_VISIT_IN_SRI%20LANKA-800.webp`, src1600: `${CRE}/PLACES_TO_VISIT_IN_SRI%20LANKA-1600.webp`, href: "https://www.instagram.com/p/Cn6Jcd1oW_E/", alt: "Places to Visit in Sri Lanka", title: "Places to Visit in Sri Lanka (Colombo Series)", artist: "Creative Posters" },
    { ...cp("2022_RECAP"), href: "https://www.instagram.com/p/CmzALtLBekd/", alt: "2022 Recap", title: "2022 Recap", artist: "Short Vlog" },
  ],
  [
    { ...cp("ARARTICS"), href: "https://www.behance.net/gallery/153583995/Arartics-Business-Card-Design", alt: "Arartics", title: "Arartics", artist: "Business Card Design" },
    { ...cp("SPOTIFY_BANNERS"), href: "https://www.behance.net/gallery/148881409/Spotify-Cover-Arts", alt: "Spotify Cover Arts", title: "Spotify Cover Arts", artist: "Creative Posters" },
    { href: "https://drive.google.com/drive/folders/12NHk2K7DjVrbvqebSiwUgJxJ8kRTyALi?usp=sharing", src: "", alt: "View More", title: "View More", artist: "" },
  ],
];

export const SOCIALS = [
  { name: "instagram", href: "https://www.instagram.com/kenulakandanaarachchi/", color: "#E1306C" },
  { name: "whatsapp", href: "https://wa.me/94770185211", color: "#25D366" },
  { name: "youtube", href: "https://www.youtube.com/@kenulakandanaarachchi", color: "#FF0000" },
  { name: "spotify", href: "https://open.spotify.com/artist/2xWVvHFNvUpK5hgcSAjgC4", color: "#1DB954" },
  { name: "apple-music", href: "https://music.apple.com/us/artist/kenula-kandanaarachchi/1709852107", color: "#FA233B" },
  { name: "tiktok", href: "https://www.tiktok.com/@kenulakandanaarachchi", color: "#fe2d52" },
  { name: "linkedin", href: "https://www.linkedin.com/in/kenulakandanaarachchi/", color: "#0077b5" },
];
