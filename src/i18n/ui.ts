export const languages = {
	en: 'EN',
	es: 'ES',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

const en = {
	'meta.siteTitle': 'A KyoAni Chronicle',
	'meta.titleSuffix': ' — A KyoAni Chronicle',
	'meta.siteDescription':
		'A fan-made chronicle of Kyoto Animation: explore works by decade and timelines from KyoAni titles.',
	'meta.logoAlt': 'A KyoAni Chronicle — Home',

	'nav.home': 'Home',
	'nav.animes': 'Animes',
	'nav.timeline': 'Timeline',
	'nav.map': 'Map',

	'landing.badge': 'For fans, by fans',
	'landing.titleLine1': 'A digital',
	'landing.titleLine2': 'chronicle of',
	'landing.titleLine3': 'Kyoto Animation',
	'landing.intro':
		'Explore the collection by decades. Full-size covers, quick navigation and a minimal editorial design.',
	'landing.aboutCta': 'About',
	'landing.workOne': 'work',
	'landing.workMany': 'works',
	'landing.enter': 'Enter',
	'landing.decadeAria': 'Explore {decade} ({range})',

	'about.eyebrow': 'About the studio',
	'about.title': 'Kyoto Animation',
	'about.lead':
		'A Japanese animation studio that redefined what anime could look like — and feel like.',
	'about.historyLabel': 'History',
	'about.historyP1Before': 'Founded in ',
	'about.historyP1After':
		' by Hideaki & Yoko Hatta in Uji, Kyoto Prefecture, Kyoto Animation began as a subcontracting studio before producing its own original works. Over four decades, it grew into one of the most celebrated studios in the industry, known for its meticulous attention to detail, fluid animation, and deeply human storytelling.',
	'about.historyP2':
		'Unlike most studios, KyoAni trains its animators entirely in-house and employs them as full-time staff — a rare practice that has earned it a devoted following and a reputation for exceptional working conditions within the industry.',
	'about.glanceLabel': 'At a glance',
	'about.founded': 'Founded',
	'about.headquarters': 'Headquarters',
	'about.founders': 'Founders',
	'about.knownFor': 'Known for',
	'about.value1981': '1981',
	'about.valueHq': 'Uji, Kyoto',
	'about.valueFounders': 'Hideaki & Yoko Hatta',
	'about.valueKnownFor': 'Slice of Life · Drama · Moe · Comedy',
	'about.statYearsLabel': 'Years of history',
	'about.statYearsDesc': 'Producing anime since 1981 with an unwavering artistic vision.',
	'about.statTrainLabel': 'In-house training',
	'about.statTrainDesc': 'All animators are trained and employed directly by the studio.',
	'about.statCommunityLabel': 'Community & resilience',
	'about.statCommunityDesc':
		"After the 2019 tragedy, the global fanbase rallied to support KyoAni's recovery.",
	'about.statAwardsLabel': 'Award-winning works',
	'about.statAwardsDesc':
		'Multiple titles recognised by the Animation Kobe and other major awards.',
	'about.quote':
		'"We promise that Kyoto Animation will continue to create animation that help people have dreams, hope and impress them. Kyoto Animation will continue to make its employees and staff lead happy lives."',
	'about.quoteFooter': '— Hideaki Hatta, Co-Founder',
	'about.officialSite': 'Official site',

	'footer.builtWith': 'Built with love by',
	'footer.contactAria': 'Send proposals or contact me',
	'footer.disclaimerPre':
		'An independent, unofficial fan project created to celebrate the work of ',
	'footer.disclaimerPost':
		'This project is not affiliated with, endorsed by, sponsored by, or in any way officially connected to Kyoto Animation. All titles, artwork, characters, trademarks, and other intellectual property featured on this site remain the property of their respective rights holders.',
	'footer.disclaimerLink': 'Kyoto Animation Co., Ltd.',
	'footer.dataSources': 'Data sourced from',
	'footer.and': 'and',

	'map.pageTitle': 'Map',
	'map.eyebrow': 'Real-world references',
	'map.title': 'Map',
	'map.realLocations': 'Real Locations',

	'timeline.pageTitle': 'Timeline',
	'timeline.eyebrow': 'Chronological view',
	'timeline.title': 'Timeline',
	'timeline.unknownYear': 'Unknown',

	'catalog.animesTitle': 'Animes',
	'catalog.seriesEyebrow': 'Grouped by franchise',
	'catalog.catalogEyebrow': 'Catalog',
	'catalog.undated': 'Undated',
	'catalog.standalone': 'Standalone',
	'catalog.tagPageTitle': 'Works: {tag}',
	'catalog.tagAriaLabel': 'Browse works tagged {tag}',

	'error404.layoutTitle': '404 — A KyoAni Chronicle',
	'error404.message': "This work hasn't been animated yet.",
	'error404.back': 'Back to the chronicle',

	'work.description': 'Description',
	'work.readMore': 'Read more',
	'work.readLess': 'Show less',
	'work.release': 'Release',
	'work.hashtags': 'Hashtags',
	'work.soundtrack': 'Soundtrack',
	'work.animePlatform': 'Anime Platform',
	'work.ytMusic': 'YT Music',
	'work.anilist': 'AniList',
	'work.imgAlt': '{title} — detail',

	'works.viewWork': 'View work',

	'search.placeholder': 'Search by title or anime…',

	'location.ariaMap': 'View {place} on the map',
	'location.sceneAlt': '{anime}: {scene}',
	'location.openMaps': 'Open in Google Maps',

	'video.thumbnailAlt': 'Thumbnail for {title}',
	'video.playAria': 'Play {title}',
	'video.animethemes': 'animethemes',

	'up.aria': 'Return to top',
	'up.title': 'Return to top',

	'mobileNav.aria': 'Primary',

	'back.back': 'Back',
	'back.home': 'Home',
} as const;

const es: Record<keyof typeof en, string> = {
	'meta.siteTitle': 'A KyoAni Chronicle',
	'meta.titleSuffix': ' — A KyoAni Chronicle',
	'meta.siteDescription':
		'Crónica hecha por fans sobre Kyoto Animation: explora obras por década y líneas temporales de los títulos de KyoAni.',
	'meta.logoAlt': 'A KyoAni Chronicle — Inicio',

	'nav.home': 'Inicio',
	'nav.animes': 'Animes',
	'nav.timeline': 'Línea temporal',
	'nav.map': 'Mapa',

	'landing.badge': 'De fans, para fans',
	'landing.titleLine1': 'Una crónica',
	'landing.titleLine2': 'digital de',
	'landing.titleLine3': 'Kyoto Animation',
	'landing.intro':
		'Explora la colección por décadas. Portadas a tamaño completo, navegación rápida y un diseño editorial minimalista.',
	'landing.aboutCta': 'Acerca de',
	'landing.workOne': 'obra',
	'landing.workMany': 'obras',
	'landing.enter': 'Entrar',
	'landing.decadeAria': 'Explorar {decade} ({range})',

	'about.eyebrow': 'Sobre el estudio',
	'about.title': 'Kyoto Animation',
	'about.lead':
		'Un estudio de animación japonesa que redefinió cómo puede verse el anime — y cómo puede sentirse.',
	'about.historyLabel': 'Historia',
	'about.historyP1Before': 'Fundado en ',
	'about.historyP1After':
		' por Hideaki y Yoko Hatta en Uji (prefectura de Kyoto), Kyoto Animation comenzó como estudio de subcontratación antes de producir obras propias. En más de cuatro décadas se convirtió en uno de los estudios más celebrados del sector, por su meticulosidad, animación fluida y relatos profundamente humanos.',
	'about.historyP2':
		'A diferencia de la mayoría, KyoAni forma a sus animadores in house y los emplea a jornada completa — una práctica poco habitual que le ha dado una comunidad muy fiel y fama de unas condiciones laborales excepcionales.',
	'about.glanceLabel': 'De un vistazo',
	'about.founded': 'Fundación',
	'about.headquarters': 'Sede',
	'about.founders': 'Fundadores',
	'about.knownFor': 'Conocida por',
	'about.value1981': '1981',
	'about.valueHq': 'Uji, Kyoto',
	'about.valueFounders': 'Hideaki y Yoko Hatta',
	'about.valueKnownFor': 'Slice of life · Drama · Moe · Comedia',
	'about.statYearsLabel': 'Años de historia',
	'about.statYearsDesc': 'Produciendo anime desde 1981 con una visión artística firme.',
	'about.statTrainLabel': 'Formación interna',
	'about.statTrainDesc': 'Todo el equipo creativo se forma y emplea directamente en el estudio.',
	'about.statCommunityLabel': 'Comunidad y resiliencia',
	'about.statCommunityDesc':
		'Tras la tragedia de 2019, la comunidad mundial se movilizó para apoyar la recuperación de KyoAni.',
	'about.statAwardsLabel': 'Obras premiadas',
	'about.statAwardsDesc':
		'Varios títulos reconocidos por Animation Kobe y otros galardones importantes.',
	'about.quote':
		'"Prometemos que Kyoto Animation seguirá creando animación que dé sueños, esperanza e impresione a la gente. Kyoto Animation seguirá haciendo que sus empleados y equipo lleven vidas felices."',
	'about.quoteFooter': '— Hideaki Hatta, cofundador',
	'about.officialSite': 'Sitio oficial',

	'footer.builtWith': 'Hecho con cariño por',
	'footer.contactAria': 'Enviar propuestas o contactar',
	'footer.disclaimerPre': 'Proyecto independiente y no oficial para rendir homenaje al trabajo de ',
	'footer.disclaimerPost':
		'No está afiliado, respaldado ni patrocinado por Kyoto Animation. Títulos, arte, personajes, marcas y demás propiedad intelectual mostrados siguen siendo de sus titulares.',
	'footer.disclaimerLink': 'Kyoto Animation Co., Ltd.',
	'footer.dataSources': 'Datos obtenidos de',
	'footer.and': 'y',

	'map.pageTitle': 'Mapa',
	'map.eyebrow': 'Referencias en el mundo real',
	'map.title': 'Mapa',
	'map.realLocations': 'Lugares reales',

	'timeline.pageTitle': 'Línea temporal',
	'timeline.eyebrow': 'Vista cronológica',
	'timeline.title': 'Línea temporal',
	'timeline.unknownYear': 'Desconocido',

	'catalog.animesTitle': 'Animes',
	'catalog.seriesEyebrow': 'Agrupado por franquicia',
	'catalog.catalogEyebrow': 'Catálogo',
	'catalog.undated': 'Sin fecha',
	'catalog.standalone': 'Independientes',
	'catalog.tagPageTitle': 'Obras: {tag}',
	'catalog.tagAriaLabel': 'Explorar obras con la etiqueta {tag}',

	'error404.layoutTitle': '404 — A KyoAni Chronicle',
	'error404.message': 'Esta obra aún no está animada.',
	'error404.back': 'Volver a la crónica',

	'work.description': 'Descripción',
	'work.readMore': 'Leer más',
	'work.readLess': 'Mostrar menos',
	'work.release': 'Estreno',
	'work.hashtags': 'Hashtags',
	'work.soundtrack': 'Banda sonora',
	'work.animePlatform': 'Plataforma de anime',
	'work.ytMusic': 'YT Music',
	'work.anilist': 'AniList',
	'work.imgAlt': '{title} — detalle',

	'works.viewWork': 'Ver obra',

	'search.placeholder': 'Buscar por título o anime…',

	'location.ariaMap': 'Ver {place} en el mapa',
	'location.sceneAlt': 'Escena de {anime}: {scene}',
	'location.openMaps': 'Abrir en Google Maps',

	'video.thumbnailAlt': 'Miniatura de {title}',
	'video.playAria': 'Reproducir {title}',
	'video.animethemes': 'animethemes',

	'up.aria': 'Volver arriba',
	'up.title': 'Volver arriba',

	'mobileNav.aria': 'Principal',

	'back.back': 'Volver',
	'back.home': 'Inicio',
};

export const ui = {
	en: en as Record<string, string>,
	es: es as Record<string, string>,
} as const;
