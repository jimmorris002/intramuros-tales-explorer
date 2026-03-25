export type Language = "en" | "tl" | "es" | "zh";

export interface Landmark {
  id: string;
  lat: number;
  lng: number;
  category: "fortress" | "church" | "historic" | "plaza" | "gate";
  translations: Record<Language, {
    name: string;
    description: string;
    history: string;
  }>;
}

export const languageLabels: Record<Language, string> = {
  en: "English",
  tl: "Tagalog",
  es: "Español",
  zh: "中文",
};

export const uiTranslations: Record<Language, {
  title: string;
  subtitle: string;
  selectLanguage: string;
  landmarks: string;
  history: string;
  clickHint: string;
  close: string;
  watchVideo: string;
  categories: Record<string, string>;
}> = {
  en: {
    title: "Intramuros",
    subtitle: "Interactive Map",
    selectLanguage: "Select Language",
    landmarks: "Landmarks",
    history: "Historical Background",
    clickHint: "Click a marker on the map for details",
    close: "Close",
    watchVideo: "Watch Video",
    categories: { fortress: "Fortress", church: "Church", historic: "Historic Site", plaza: "Plaza", gate: "Gate" },
  },
  tl: {
    title: "Intramuros",
    subtitle: "Interaktibong Mapa",
    selectLanguage: "Pumili ng Wika",
    landmarks: "Mga Palatandaan",
    history: "Kasaysayan",
    clickHint: "Pindutin ang marker sa mapa para sa detalye",
    close: "Isara",
    watchVideo: "Panoorin",
    categories: { fortress: "Kuta", church: "Simbahan", historic: "Makasaysayang Lugar", plaza: "Plasa", gate: "Pintuan" },
  },
  es: {
    title: "Intramuros",
    subtitle: "Mapa Interactivo",
    selectLanguage: "Seleccionar Idioma",
    landmarks: "Puntos de Interés",
    history: "Historia",
    clickHint: "Haga clic en un marcador del mapa para ver detalles",
    close: "Cerrar",
    watchVideo: "Ver Video",
    categories: { fortress: "Fortaleza", church: "Iglesia", historic: "Sitio Histórico", plaza: "Plaza", gate: "Puerta" },
  },
  zh: {
    title: "王城区",
    subtitle: "互动地图",
    selectLanguage: "选择语言",
    landmarks: "地标",
    history: "历史背景",
    clickHint: "点击地图上的标记查看详情",
    close: "关闭",
    watchVideo: "观看视频",
    categories: { fortress: "堡垒", church: "教堂", historic: "历史遗址", plaza: "广场", gate: "城门" },
  },
};

export const landmarks: Landmark[] = [
  {
    id: "fort-santiago",
    lat: 14.5952,
    lng: 120.9724,
    category: "fortress",
    translations: {
      en: {
        name: "Fort Santiago",
        description: "A citadel built by Spanish conquistador Miguel López de Legazpi in 1571. It served as the headquarters of the colonial government.",
        history: "Fort Santiago is the site where national hero José Rizal was imprisoned before his execution in 1896. The fort has witnessed centuries of colonial rule under Spain, Britain, and Japan. Today it houses the Rizal Shrine museum and stands as a symbol of Filipino resilience.",
      },
      tl: {
        name: "Fort Santiago",
        description: "Isang kuta na itinayo ni Miguel López de Legazpi noong 1571. Ito ang naging sentro ng pamahalaan ng mga kolonyal.",
        history: "Ang Fort Santiago ang pinakulong kay José Rizal bago siya barilin noong 1896. Ang kuta ay saksi sa daan-daang taon ng kolonyalismo. Ngayon, naroroon ang Rizal Shrine museum at simbolo ito ng katatagan ng mga Pilipino.",
      },
      es: {
        name: "Fuerte de Santiago",
        description: "Una ciudadela construida por el conquistador español Miguel López de Legazpi en 1571. Sirvió como sede del gobierno colonial.",
        history: "El Fuerte de Santiago es el lugar donde el héroe nacional José Rizal fue encarcelado antes de su ejecución en 1896. La fortaleza ha sido testigo de siglos de dominio colonial bajo España, Gran Bretaña y Japón.",
      },
      zh: {
        name: "圣地亚哥堡",
        description: "由西班牙征服者米格尔·洛佩斯·德莱加斯皮于1571年建造的城堡，曾是殖民政府的总部。",
        history: "圣地亚哥堡是民族英雄何塞·黎萨尔在1896年被处决前被监禁的地方。这座堡垒见证了西班牙、英国和日本的殖民统治。如今设有黎萨尔神殿博物馆。",
      },
    },
  },
  {
    id: "manila-cathedral",
    lat: 14.5918,
    lng: 120.9736,
    category: "church",
    translations: {
      en: {
        name: "Manila Cathedral",
        description: "The seat of the Roman Catholic Archdiocese of Manila, rebuilt eight times since its original construction in 1581.",
        history: "The Manila Cathedral has been destroyed by typhoons, earthquakes, and war, yet rebuilt each time with greater grandeur. The current Romanesque-Byzantine structure was completed in 1958 and features stunning stained glass windows and a grand pipe organ.",
      },
      tl: {
        name: "Katedral ng Maynila",
        description: "Ang sentro ng Arkidiyosesis ng Maynila, muling itinayo nang walong beses mula nang itayo noong 1581.",
        history: "Ang Katedral ng Maynila ay nasira ng mga bagyo, lindol, at digmaan, ngunit muling itinayo bawat pagkakataon. Ang kasalukuyang istraktura ay natapos noong 1958 at may magagandang stained glass windows.",
      },
      es: {
        name: "Catedral de Manila",
        description: "Sede de la Archidiócesis de Manila, reconstruida ocho veces desde su construcción original en 1581.",
        history: "La Catedral de Manila ha sido destruida por tifones, terremotos y guerras, pero reconstruida cada vez con mayor grandeza. La estructura actual fue completada en 1958.",
      },
      zh: {
        name: "马尼拉大教堂",
        description: "马尼拉天主教大主教区的所在地，自1581年最初建造以来已重建八次。",
        history: "马尼拉大教堂曾被台风、地震和战争摧毁，但每次都以更宏伟的规模重建。现在的罗马式拜占庭风格建筑于1958年完工。",
      },
    },
  },
  {
    id: "san-agustin",
    lat: 14.5889,
    lng: 120.9750,
    category: "church",
    translations: {
      en: {
        name: "San Agustin Church",
        description: "The oldest stone church in the Philippines, completed in 1607. A UNESCO World Heritage Site.",
        history: "San Agustin Church is the only building left intact after the destruction of Intramuros in 1945. Its Baroque architecture features trompe-l'oeil ceiling murals and 14 side chapels. The adjacent monastery houses a museum of religious art and colonial artifacts.",
      },
      tl: {
        name: "Simbahan ng San Agustin",
        description: "Ang pinakamatandang simbahang bato sa Pilipinas, natapos noong 1607. UNESCO World Heritage Site.",
        history: "Ang San Agustin Church ang nag-iisang gusaling nanatiling buo matapos ang pagkawasak ng Intramuros noong 1945. Ang Baroque na arkitektura nito ay may trompe-l'oeil na mga mural sa kisame.",
      },
      es: {
        name: "Iglesia de San Agustín",
        description: "La iglesia de piedra más antigua de Filipinas, completada en 1607. Patrimonio de la Humanidad por la UNESCO.",
        history: "La Iglesia de San Agustín es el único edificio que quedó intacto tras la destrucción de Intramuros en 1945. Su arquitectura barroca presenta murales en el techo en trampantojo.",
      },
      zh: {
        name: "圣奥古斯丁教堂",
        description: "菲律宾最古老的石砌教堂，于1607年建成。联合国教科文组织世界遗产。",
        history: "圣奥古斯丁教堂是1945年王城区被摧毁后唯一完整保存的建筑。其巴洛克式建筑以天花板上的视觉错觉壁画和14个侧礼拜堂为特色。",
      },
    },
  },
  {
    id: "casa-manila",
    lat: 14.5882,
    lng: 120.9745,
    category: "historic",
    translations: {
      en: {
        name: "Casa Manila",
        description: "A museum showcasing the lifestyle of affluent Filipinos during the Spanish colonial period.",
        history: "Casa Manila was built in the 1980s as a faithful reproduction of a 19th-century colonial house. It recreates the opulent interiors of the ilustrado class with period furniture, chandeliers, and household items from the Spanish era.",
      },
      tl: {
        name: "Casa Manila",
        description: "Isang museo na nagpapakita ng pamumuhay ng mayayamang Pilipino noong panahon ng mga Espanyol.",
        history: "Ang Casa Manila ay itinayo noong 1980s bilang tapat na reproduksyon ng isang bahay kolonyal mula sa ika-19 na siglo. Inilalarawan nito ang marangyang interior ng mga ilustrado.",
      },
      es: {
        name: "Casa Manila",
        description: "Un museo que muestra el estilo de vida de los filipinos adinerados durante el período colonial español.",
        history: "Casa Manila fue construida en la década de 1980 como una reproducción fiel de una casa colonial del siglo XIX.",
      },
      zh: {
        name: "马尼拉之家",
        description: "展示西班牙殖民时期菲律宾富裕阶层生活方式的博物馆。",
        history: "马尼拉之家建于20世纪80年代，忠实再现了19世纪殖民地房屋的面貌，重现了文人阶层的奢华内饰。",
      },
    },
  },
  {
    id: "baluarte-san-diego",
    lat: 14.5862,
    lng: 120.9725,
    category: "fortress",
    translations: {
      en: {
        name: "Baluarte de San Diego",
        description: "A circular bastion that formed part of the defensive walls of Intramuros.",
        history: "Built in 1593 by Antonio Sedeño, Baluarte de San Diego is the oldest bastion in Intramuros. It was originally designed to defend against attacks from the sea. The bastion was heavily damaged during WWII and later restored as a garden and historical site.",
      },
      tl: {
        name: "Baluarte de San Diego",
        description: "Isang bilog na kuta na bahagi ng mga pader ng Intramuros.",
        history: "Itinayo noong 1593 ni Antonio Sedeño, ito ang pinakamatandang baluarte sa Intramuros. Orihinal itong idinisenyo upang ipagtanggol laban sa mga atake mula sa dagat.",
      },
      es: {
        name: "Baluarte de San Diego",
        description: "Un bastión circular que formaba parte de las murallas defensivas de Intramuros.",
        history: "Construido en 1593 por Antonio Sedeño, es el bastión más antiguo de Intramuros. Fue diseñado originalmente para defender contra ataques desde el mar.",
      },
      zh: {
        name: "圣迭戈堡垒",
        description: "构成王城区防御城墙一部分的圆形堡垒。",
        history: "圣迭戈堡垒由安东尼奥·塞德尼奥于1593年建造，是王城区最古老的堡垒。最初设计用于抵御来自海上的攻击。",
      },
    },
  },
  {
    id: "puerta-real",
    lat: 14.5895,
    lng: 120.9710,
    category: "gate",
    translations: {
      en: {
        name: "Puerta Real",
        description: "The Royal Gate — the main entrance to Intramuros during the Spanish colonial period.",
        history: "Puerta Real, meaning 'Royal Gate,' was the primary entrance used by governors and dignitaries. It connected the walled city to the outlying districts and served as a checkpoint for goods and people entering Intramuros.",
      },
      tl: {
        name: "Puerta Real",
        description: "Ang Royal Gate — ang pangunahing pasukan ng Intramuros noong panahon ng mga Espanyol.",
        history: "Ang Puerta Real, na ang ibig sabihin ay 'Maharlikang Pintuan,' ay ang pangunahing pasukan ng mga gobernador at mahahalagang tao.",
      },
      es: {
        name: "Puerta Real",
        description: "La Puerta Real — la entrada principal a Intramuros durante el período colonial español.",
        history: "La Puerta Real era la entrada principal utilizada por gobernadores y dignatarios. Conectaba la ciudad amurallada con los distritos exteriores.",
      },
      zh: {
        name: "皇家大门",
        description: "皇家大门——西班牙殖民时期王城区的主要入口。",
        history: "皇家大门是总督和要员使用的主要入口，连接城墙内的城市与外围地区。",
      },
    },
  },
  {
    id: "plaza-roma",
    lat: 14.5912,
    lng: 120.9738,
    category: "plaza",
    translations: {
      en: {
        name: "Plaza Roma",
        description: "The central square of Intramuros, surrounded by important government and religious buildings.",
        history: "Originally called Plaza Mayor, then Plaza McKinley during the American period, Plaza Roma has been the heart of Intramuros since the Spanish era. It hosted bullfights, public gatherings, and military parades. Today it features a monument to Charles IV of Spain.",
      },
      tl: {
        name: "Plaza Roma",
        description: "Ang sentral na plasa ng Intramuros, napapaligiran ng mahahalagang gusali ng gobyerno at simbahan.",
        history: "Orihinal na tinawag na Plaza Mayor, pagkatapos ay Plaza McKinley noong panahon ng mga Amerikano. Ito ang puso ng Intramuros mula pa noong panahon ng mga Espanyol.",
      },
      es: {
        name: "Plaza Roma",
        description: "La plaza central de Intramuros, rodeada de importantes edificios gubernamentales y religiosos.",
        history: "Originalmente llamada Plaza Mayor, luego Plaza McKinley durante el período americano. Ha sido el corazón de Intramuros desde la era española.",
      },
      zh: {
        name: "罗马广场",
        description: "王城区的中心广场，周围环绕着重要的政府和宗教建筑。",
        history: "最初称为市长广场，美国时期改称麦金莱广场。自西班牙时代以来一直是王城区的中心。",
      },
    },
  },
  {
    id: "revellin-recoletos",
    lat: 14.5935,
    lng: 120.9700,
    category: "fortress",
    translations: {
      en: {
        name: "Revellin de Recoletos",
        description: "A triangular fortification that served as an outwork defense for the walls of Intramuros.",
        history: "The Revellin de Recoletos was one of several ravelins built to strengthen the defenses of Intramuros. These triangular structures were placed outside the main walls to provide additional layers of protection against invaders.",
      },
      tl: {
        name: "Revellin de Recoletos",
        description: "Isang tatsulok na kuta na nagsilbing panlabas na depensa ng mga pader ng Intramuros.",
        history: "Ang Revellin de Recoletos ay isa sa ilang mga ravelin na itinayo upang palakasin ang depensa ng Intramuros.",
      },
      es: {
        name: "Revellín de Recoletos",
        description: "Una fortificación triangular que sirvió como defensa exterior para las murallas de Intramuros.",
        history: "El Revellín de Recoletos fue uno de varios revelines construidos para reforzar las defensas de Intramuros.",
      },
      zh: {
        name: "雷科莱托斯三角堡",
        description: "为王城区城墙提供外围防御的三角形防御工事。",
        history: "雷科莱托斯三角堡是为加强王城区防御而建造的数个三角堡之一。",
      },
    },
  },
  {
    id: "palacio-gobernador",
    lat: 14.5930,
    lng: 120.9745,
    category: "historic",
    translations: {
      en: {
        name: "Palacio del Gobernador",
        description: "The former seat of the Spanish colonial government, now home to the Commission on Elections (COMELEC).",
        history: "Originally built in the 16th century, the Palacio del Gobernador housed the Spanish Governor-General. It was destroyed during WWII and reconstructed in the 1970s. The building's neoclassical facade reflects the grandeur of colonial architecture.",
      },
      tl: {
        name: "Palacio del Gobernador",
        description: "Ang dating sentro ng pamahalaan ng mga Espanyol, ngayon ay tahanan ng COMELEC.",
        history: "Orihinal na itinayo noong ika-16 na siglo, ang Palacio del Gobernador ang tirahan ng Gobernador-Heneral ng Espanya. Nawasak ito noong WWII at muling itinayo noong 1970s.",
      },
      es: {
        name: "Palacio del Gobernador",
        description: "La antigua sede del gobierno colonial español, ahora sede de la Comisión de Elecciones.",
        history: "Construido originalmente en el siglo XVI, albergaba al Gobernador General español. Fue destruido durante la Segunda Guerra Mundial y reconstruido en la década de 1970.",
      },
      zh: {
        name: "总督府",
        description: "西班牙殖民政府的前所在地，现为选举委员会办公处。",
        history: "总督府最初建于16世纪，曾是西班牙总督的住所。二战期间被摧毁，于20世纪70年代重建。",
      },
    },
  },
  {
    id: "puerta-isabel",
    lat: 14.5870,
    lng: 120.9770,
    category: "gate",
    translations: {
      en: {
        name: "Puerta de Isabel II",
        description: "A gate named after Queen Isabel II of Spain, one of the main entrances to the walled city.",
        history: "Puerta de Isabel II was named in honor of Queen Isabella II of Spain. It served as a key access point connecting Intramuros to the surrounding areas and played an important role in controlling movement in and out of the walled city.",
      },
      tl: {
        name: "Puerta de Isabel II",
        description: "Isang pintuan na ipinangalan kay Reyna Isabel II ng Espanya, isa sa mga pangunahing pasukan ng lunsod.",
        history: "Ang Puerta de Isabel II ay ipinangalan bilang parangal kay Reyna Isabella II ng Espanya. Nagsilbi itong mahalagang daanan papasok at palabas ng Intramuros.",
      },
      es: {
        name: "Puerta de Isabel II",
        description: "Una puerta nombrada en honor a la Reina Isabel II de España, una de las entradas principales a la ciudad amurallada.",
        history: "La Puerta de Isabel II fue nombrada en honor a la Reina Isabel II de España. Sirvió como punto de acceso clave que conectaba Intramuros con las áreas circundantes.",
      },
      zh: {
        name: "伊莎贝尔二世门",
        description: "以西班牙女王伊莎贝尔二世命名的城门，是城墙城市的主要入口之一。",
        history: "伊莎贝尔二世门以纪念西班牙女王伊莎贝拉二世而命名，是连接王城区与周边地区的重要通道。",
      },
    },
  },
];
