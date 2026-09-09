// Fichier généré — NE PAS ÉDITER À LA MAIN.
// Source : lib/pedagogy/data/modules.ts, via `npm run generate:public-modules`
// (scripts/generate-public-modules.mjs). Volontairement sans aucun import
// vers data/modules.ts : c'est ce qui garantit que ce fichier est sûr à
// importer depuis du code client — voir lib/pedagogy/data/modules-public.ts
// et docs/architecture/user-lifecycle.md § Premium content boundary.
import type { PublicModule } from "@/lib/pedagogy/types";

export const PUBLIC_MODULES: PublicModule[] = [
  {
    "id": "b1-se-presenter",
    "slug": "se-presenter",
    "level": "B1",
    "title": "Se présenter",
    "description": "À la fin de ce module, tu pourras te présenter clairement et poser des questions pour connaître quelqu'un.",
    "objectives": [
      "Donner des informations sur soi",
      "Parler de sa famille et de son parcours",
      "Poser des questions simples à quelqu'un"
    ],
    "domain": "grammaire",
    "stageId": "b1-debut",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "se-presenter-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "se-presenter-comprendre-activite",
            "title": "Lire un message de présentation",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "sp-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "se-presenter-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "se-presenter-entrainement-activite",
            "title": "Se présenter et poser des questions",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "sp-g1",
                "type": "qcm",
                "skillId": "gr-questions",
                "difficulty": "B1"
              },
              {
                "id": "sp-g2",
                "type": "texte_a_trous",
                "skillId": "gr-questions",
                "difficulty": "B1"
              },
              {
                "id": "sp-g3",
                "type": "association",
                "skillId": "voc-identite",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "se-presenter-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "se-presenter-ecriture-activite",
            "title": "Se présenter par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "sp-h",
                "type": "production_ecrite",
                "skillId": "pe-se-presenter",
                "difficulty": "B1"
              }
            ]
          },
          {
            "id": "se-presenter-ecriture-activite-orale",
            "title": "Se présenter à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "sp-h-oral",
                "type": "production_orale",
                "skillId": "pe-se-presenter",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "se-presenter-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "se-presenter-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "sp-i1",
                "type": "qcm",
                "skillId": "gr-questions",
                "difficulty": "B1"
              },
              {
                "id": "sp-i2",
                "type": "reponse_courte",
                "skillId": "voc-identite",
                "difficulty": "B1"
              },
              {
                "id": "sp-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "b1-raconter-une-experience-personnelle",
    "slug": "raconter-une-experience-personnelle",
    "level": "B1",
    "title": "Raconter une expérience personnelle",
    "description": "À la fin de ce module, tu pourras raconter une expérience marquante de façon simple et organisée, à l'oral comme à l'écrit.",
    "objectives": [
      "Raconter une expérience",
      "Organiser un récit avec des connecteurs chronologiques",
      "Réagir au récit de quelqu'un d'autre"
    ],
    "domain": "grammaire",
    "stageId": "b1-debut",
    "estimatedMinutes": 27,
    "lessons": [
      {
        "id": "experience-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "experience-comprendre-activite",
            "title": "Lire le récit de Karim",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "exp-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "experience-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "experience-entrainement-activite",
            "title": "Passé composé et connecteurs chronologiques",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "exp-g1",
                "type": "qcm",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "exp-g2",
                "type": "texte_a_trous",
                "skillId": "gr-connecteurs-chronologiques",
                "difficulty": "B1"
              },
              {
                "id": "exp-g3",
                "type": "association",
                "skillId": "voc-emotions-experiences",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "experience-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "experience-ecriture-activite",
            "title": "Raconter son expérience",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "exp-h",
                "type": "production_ecrite",
                "skillId": "pe-recit",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "experience-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "experience-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "exp-i1",
                "type": "qcm",
                "skillId": "gr-connecteurs-chronologiques",
                "difficulty": "B1"
              },
              {
                "id": "exp-i2",
                "type": "reponse_courte",
                "skillId": "voc-emotions-experiences",
                "difficulty": "B1"
              },
              {
                "id": "exp-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-decrire-vie-quotidienne",
    "slug": "decrire-vie-quotidienne",
    "level": "B1",
    "title": "Décrire sa vie quotidienne et ses habitudes",
    "description": "À la fin de ce module, tu pourras décrire ton quotidien, tes habitudes et ton organisation avec précision.",
    "objectives": [
      "Décrire une habitude",
      "Exprimer une fréquence",
      "Comparer un avant et un maintenant"
    ],
    "domain": "vocabulaire",
    "stageId": "b1-debut",
    "estimatedMinutes": 28,
    "lessons": [
      {
        "id": "decrire-vie-quotidienne-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "decrire-vie-quotidienne-comprendre-activite",
            "title": "Lire le message de Léa",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "quotidien-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "decrire-vie-quotidienne-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "decrire-vie-quotidienne-ecoute-activite",
            "title": "Écouter Léa et Fatou s'organiser",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "quotidien-f",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "decrire-vie-quotidienne-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "decrire-vie-quotidienne-entrainement-activite",
            "title": "Fréquence, partitifs et négation",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "quotidien-g1",
                "type": "qcm",
                "skillId": "gr-present-habitudes",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-g2",
                "type": "texte_a_trous",
                "skillId": "gr-present-habitudes",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-g3",
                "type": "association",
                "skillId": "voc-vie-quotidienne",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-g4",
                "type": "remise_en_ordre",
                "skillId": "voc-vie-quotidienne",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-g5",
                "type": "vrai_faux",
                "skillId": "gr-present-habitudes",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "decrire-vie-quotidienne-ecriture",
        "type": "ecriture",
        "title": "Production écrite",
        "optional": false,
        "activities": [
          {
            "id": "decrire-vie-quotidienne-ecriture-activite",
            "title": "Décrire sa semaine type",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "quotidien-h",
                "type": "production_ecrite",
                "skillId": "pe-decrire-quotidien",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "decrire-vie-quotidienne-evaluation",
        "type": "evaluation",
        "title": "Mini-évaluation",
        "optional": true,
        "activities": [
          {
            "id": "decrire-vie-quotidienne-evaluation-activite",
            "title": "Bilan du module (10 items, 7/10 pour valider)",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "quotidien-i1",
                "type": "qcm",
                "skillId": "gr-present-habitudes",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-i2",
                "type": "reponse_courte",
                "skillId": "gr-present-habitudes",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-i3",
                "type": "vrai_faux",
                "skillId": "voc-vie-quotidienne",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-i4",
                "type": "reponse_courte",
                "skillId": "voc-vie-quotidienne",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-i5",
                "type": "texte_a_trous",
                "skillId": "gr-present-habitudes",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-i6",
                "type": "reponse_courte",
                "skillId": "voc-vie-quotidienne",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-i7",
                "type": "qcm",
                "skillId": "gr-present-habitudes",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-i8",
                "type": "reponse_courte",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-i9",
                "type": "reponse_courte",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              },
              {
                "id": "quotidien-i10",
                "type": "reponse_courte",
                "skillId": "pe-decrire-quotidien",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 18
  },
  {
    "id": "b1-chercher-un-logement",
    "slug": "chercher-un-logement",
    "level": "B1",
    "title": "Chercher un logement",
    "description": "À la fin de ce module, tu pourras lire une annonce immobilière et poser les bonnes questions avant de visiter.",
    "objectives": [
      "Comprendre une annonce de logement",
      "Identifier les informations essentielles",
      "Poser des questions sur un logement"
    ],
    "domain": "comprehension_ecrite",
    "stageId": "b1-debut",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "logement-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "logement-comprendre-activite",
            "title": "Lire une annonce de location",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "log-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "logement-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "logement-entrainement-activite",
            "title": "Vocabulaire du logement",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "log-g1",
                "type": "qcm",
                "skillId": "voc-logement",
                "difficulty": "B1"
              },
              {
                "id": "log-g2",
                "type": "texte_a_trous",
                "skillId": "voc-logement",
                "difficulty": "B1"
              },
              {
                "id": "log-g3",
                "type": "association",
                "skillId": "voc-logement",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "logement-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "logement-ecriture-activite",
            "title": "Poser une question au propriétaire",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "log-h",
                "type": "reponse_courte",
                "skillId": "voc-logement",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "logement-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "logement-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "log-i1",
                "type": "qcm",
                "skillId": "voc-logement",
                "difficulty": "B1"
              },
              {
                "id": "log-i2",
                "type": "reponse_courte",
                "skillId": "voc-logement",
                "difficulty": "B1"
              },
              {
                "id": "log-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-habitudes-et-gouts",
    "slug": "habitudes-et-gouts",
    "level": "B1",
    "title": "Parler de ses habitudes et de ses goûts",
    "description": "À la fin de ce module, tu pourras parler de ta routine, de tes loisirs et de ce que tu aimes ou non.",
    "objectives": [
      "Décrire une habitude",
      "Exprimer une préférence",
      "Comparer deux goûts"
    ],
    "domain": "vocabulaire",
    "stageId": "b1-debut",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "habitudes-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "habitudes-comprendre-activite",
            "title": "Lire une conversation entre voisins",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "hab-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "habitudes-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "habitudes-entrainement-activite",
            "title": "Fréquence et comparaisons",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "hab-g1",
                "type": "qcm",
                "skillId": "gr-comparatifs",
                "difficulty": "B1"
              },
              {
                "id": "hab-g2",
                "type": "texte_a_trous",
                "skillId": "voc-loisirs-gouts",
                "difficulty": "B1"
              },
              {
                "id": "hab-g3",
                "type": "association",
                "skillId": "voc-loisirs-gouts",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "habitudes-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "habitudes-ecriture-activite",
            "title": "Décrire son week-end",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "hab-h",
                "type": "production_ecrite",
                "skillId": "pe-decrire-quotidien",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "habitudes-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "habitudes-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "hab-i1",
                "type": "qcm",
                "skillId": "gr-comparatifs",
                "difficulty": "B1"
              },
              {
                "id": "hab-i2",
                "type": "reponse_courte",
                "skillId": "voc-loisirs-gouts",
                "difficulty": "B1"
              },
              {
                "id": "hab-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-faire-des-achats",
    "slug": "faire-des-achats",
    "level": "B1",
    "title": "Faire des achats et comparer",
    "description": "À la fin de ce module, tu pourras comparer des produits, demander de l'aide et signaler un problème lors d'un achat.",
    "objectives": [
      "Comparer deux produits",
      "Demander un renseignement en magasin",
      "Faire une réclamation simple"
    ],
    "domain": "vocabulaire",
    "stageId": "b1-debut",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "achats-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "achats-comprendre-activite",
            "title": "Lire un échange chez le vendeur",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "ach-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "achats-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "achats-entrainement-activite",
            "title": "Comparer et parler d'un problème",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "ach-g1",
                "type": "qcm",
                "skillId": "gr-comparatifs",
                "difficulty": "B1"
              },
              {
                "id": "ach-g2",
                "type": "texte_a_trous",
                "skillId": "voc-achats",
                "difficulty": "B1"
              },
              {
                "id": "ach-g3",
                "type": "association",
                "skillId": "voc-achats",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "achats-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "achats-ecriture-activite",
            "title": "Faire une réclamation",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "ach-h",
                "type": "reponse_courte",
                "skillId": "voc-achats",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "achats-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "achats-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "ach-i1",
                "type": "qcm",
                "skillId": "gr-comparatifs",
                "difficulty": "B1"
              },
              {
                "id": "ach-i2",
                "type": "reponse_courte",
                "skillId": "voc-achats",
                "difficulty": "B1"
              },
              {
                "id": "ach-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-discuter-avec-un-proprietaire",
    "slug": "discuter-avec-un-proprietaire",
    "level": "B1",
    "title": "Discuter avec un propriétaire ou un voisin",
    "description": "À la fin de ce module, tu pourras prendre contact avec un propriétaire, poser des questions précises et répondre à des objections simples.",
    "objectives": [
      "Demander des informations sur un logement",
      "Négocier poliment",
      "Comprendre une conversation courante sur le logement"
    ],
    "domain": "comprehension_orale",
    "stageId": "b1-debut",
    "estimatedMinutes": 25,
    "lessons": [
      {
        "id": "proprietaire-ecoute",
        "type": "ecoute",
        "title": "Écouter",
        "optional": false,
        "activities": [
          {
            "id": "proprietaire-ecoute-activite",
            "title": "Écouter un appel à propos d'une visite",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "prop-e",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "proprietaire-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "proprietaire-entrainement-activite",
            "title": "Questions soutenues et impératif",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "prop-g1",
                "type": "qcm",
                "skillId": "gr-questions",
                "difficulty": "B1"
              },
              {
                "id": "prop-g2",
                "type": "texte_a_trous",
                "skillId": "gr-imperatif",
                "difficulty": "B1"
              },
              {
                "id": "prop-g3",
                "type": "association",
                "skillId": "voc-logement",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "proprietaire-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "proprietaire-ecriture-activite",
            "title": "Reporter un rendez-vous poliment",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "prop-h",
                "type": "reponse_courte",
                "skillId": "voc-logement",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "proprietaire-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "proprietaire-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "prop-i1",
                "type": "qcm",
                "skillId": "gr-questions",
                "difficulty": "B1"
              },
              {
                "id": "prop-i2",
                "type": "reponse_courte",
                "skillId": "voc-logement",
                "difficulty": "B1"
              },
              {
                "id": "prop-i3",
                "type": "vrai_faux",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-raconter-un-evenement-passe",
    "slug": "raconter-un-evenement-passe",
    "level": "B1",
    "title": "Raconter un événement passé",
    "description": "À la fin de ce module, tu pourras raconter un événement passé de façon claire, en distinguant ce qui s'est passé (les actions) de ce qui était (le contexte, les circonstances).",
    "objectives": [
      "Raconter un événement",
      "Structurer un récit court",
      "Distinguer premier plan (actions) et arrière-plan (contexte)"
    ],
    "domain": "grammaire",
    "stageId": "b1-debut",
    "estimatedMinutes": 33,
    "lessons": [
      {
        "id": "raconter-un-evenement-passe-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "raconter-un-evenement-passe-comprendre-activite",
            "title": "Lire le message de Farid",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "recit-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "raconter-un-evenement-passe-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "raconter-un-evenement-passe-ecoute-activite",
            "title": "Écouter Farid raconter sa matinée",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "recit-f",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "raconter-un-evenement-passe-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "raconter-un-evenement-passe-entrainement-activite",
            "title": "Passé composé, imparfait et plus-que-parfait",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "recit-g1",
                "type": "texte_a_trous",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "recit-g2",
                "type": "texte_a_trous",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "recit-g3",
                "type": "remise_en_ordre",
                "skillId": "pe-recit",
                "difficulty": "B1"
              },
              {
                "id": "recit-g4",
                "type": "vrai_faux",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "recit-g5",
                "type": "association",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "recit-g6",
                "type": "reponse_courte",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "raconter-un-evenement-passe-ecriture",
        "type": "ecriture",
        "title": "Production écrite",
        "optional": false,
        "activities": [
          {
            "id": "raconter-un-evenement-passe-ecriture-activite",
            "title": "Raconter un imprévu",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "recit-h",
                "type": "production_ecrite",
                "skillId": "pe-recit",
                "difficulty": "B1"
              }
            ]
          },
          {
            "id": "raconter-un-evenement-passe-ecriture-activite-orale",
            "title": "Raconter un imprévu à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "recit-h-oral",
                "type": "production_orale",
                "skillId": "pe-recit",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "raconter-un-evenement-passe-evaluation",
        "type": "evaluation",
        "title": "Mini-évaluation",
        "optional": false,
        "activities": [
          {
            "id": "raconter-un-evenement-passe-evaluation-activite",
            "title": "Bilan du module (10 items, 7/10 pour valider)",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "recit-i1",
                "type": "qcm",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "recit-i2",
                "type": "reponse_courte",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "recit-i3",
                "type": "vrai_faux",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "recit-i4",
                "type": "reponse_courte",
                "skillId": "pe-recit",
                "difficulty": "B1"
              },
              {
                "id": "recit-i5",
                "type": "texte_a_trous",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "recit-i6",
                "type": "reponse_courte",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "recit-i7",
                "type": "qcm",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "recit-i8",
                "type": "reponse_courte",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              },
              {
                "id": "recit-i9",
                "type": "reponse_courte",
                "skillId": "pe-recit",
                "difficulty": "B1"
              },
              {
                "id": "recit-i10",
                "type": "reponse_courte",
                "skillId": "pe-recit",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 20
  },
  {
    "id": "b1-comprendre-un-courrier-simple",
    "slug": "comprendre-un-courrier-simple",
    "level": "B1",
    "title": "Comprendre un courrier simple",
    "description": "À la fin de ce module, tu pourras comprendre un courrier administratif courant et identifier ce qu'on te demande de faire.",
    "objectives": [
      "Comprendre un courrier administratif",
      "Repérer une information précise dans un texte",
      "Réagir à un courrier par écrit"
    ],
    "domain": "comprehension_ecrite",
    "stageId": "b1-debut",
    "estimatedMinutes": 27,
    "lessons": [
      {
        "id": "comprendre-un-courrier-simple-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "comprendre-un-courrier-simple-comprendre-activite",
            "title": "Lire le courrier de la CAF",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "courrier-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-courrier-administratif",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comprendre-un-courrier-simple-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "comprendre-un-courrier-simple-ecoute-activite",
            "title": "Écouter Amina au téléphone avec la CAF",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "courrier-f",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comprendre-un-courrier-simple-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "comprendre-un-courrier-simple-entrainement-activite",
            "title": "Vocabulaire et formules du courrier",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "courrier-g1",
                "type": "qcm",
                "skillId": "voc-courrier",
                "difficulty": "B1"
              },
              {
                "id": "courrier-g2",
                "type": "texte_a_trous",
                "skillId": "ce-courrier-administratif",
                "difficulty": "B1"
              },
              {
                "id": "courrier-g3",
                "type": "association",
                "skillId": "voc-courrier",
                "difficulty": "B1"
              },
              {
                "id": "courrier-g4",
                "type": "remise_en_ordre",
                "skillId": "ce-courrier-administratif",
                "difficulty": "B1"
              },
              {
                "id": "courrier-g5",
                "type": "vrai_faux",
                "skillId": "voc-courrier",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comprendre-un-courrier-simple-ecriture",
        "type": "ecriture",
        "title": "Production écrite",
        "optional": false,
        "activities": [
          {
            "id": "comprendre-un-courrier-simple-ecriture-activite",
            "title": "Répondre au courrier",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "courrier-h",
                "type": "production_ecrite",
                "skillId": "pe-repondre-courrier",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comprendre-un-courrier-simple-evaluation",
        "type": "evaluation",
        "title": "Mini-évaluation",
        "optional": true,
        "activities": [
          {
            "id": "comprendre-un-courrier-simple-evaluation-activite",
            "title": "Bilan du module (10 items, 7/10 pour valider)",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "courrier-i1",
                "type": "qcm",
                "skillId": "ce-courrier-administratif",
                "difficulty": "B1"
              },
              {
                "id": "courrier-i2",
                "type": "reponse_courte",
                "skillId": "voc-courrier",
                "difficulty": "B1"
              },
              {
                "id": "courrier-i3",
                "type": "vrai_faux",
                "skillId": "ce-courrier-administratif",
                "difficulty": "B1"
              },
              {
                "id": "courrier-i4",
                "type": "reponse_courte",
                "skillId": "voc-courrier",
                "difficulty": "B1"
              },
              {
                "id": "courrier-i5",
                "type": "texte_a_trous",
                "skillId": "ce-courrier-administratif",
                "difficulty": "B1"
              },
              {
                "id": "courrier-i6",
                "type": "reponse_courte",
                "skillId": "ce-courrier-administratif",
                "difficulty": "B1"
              },
              {
                "id": "courrier-i7",
                "type": "qcm",
                "skillId": "voc-courrier",
                "difficulty": "B1"
              },
              {
                "id": "courrier-i8",
                "type": "reponse_courte",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              },
              {
                "id": "courrier-i9",
                "type": "vrai_faux",
                "skillId": "ce-courrier-administratif",
                "difficulty": "B1"
              },
              {
                "id": "courrier-i10",
                "type": "reponse_courte",
                "skillId": "pe-repondre-courrier",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 18
  },
  {
    "id": "b1-prendre-rendez-vous",
    "slug": "prendre-rendez-vous",
    "level": "B1",
    "title": "Prendre rendez-vous",
    "description": "À la fin de ce module, tu pourras prendre, modifier ou annuler un rendez-vous par téléphone ou par écrit.",
    "objectives": [
      "Demander un rendez-vous",
      "Proposer une date ou un horaire",
      "Comprendre une confirmation de rendez-vous"
    ],
    "domain": "grammaire",
    "stageId": "b1-debut",
    "estimatedMinutes": 27,
    "lessons": [
      {
        "id": "prendre-rendez-vous-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "prendre-rendez-vous-comprendre-activite",
            "title": "Lire le SMS de confirmation",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "rdv-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "prendre-rendez-vous-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "prendre-rendez-vous-ecoute-activite",
            "title": "Écouter l'appel au secrétariat",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "rdv-f",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "prendre-rendez-vous-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "prendre-rendez-vous-entrainement-activite",
            "title": "Futur proche, futur simple et expressions de temps",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "rdv-g1",
                "type": "qcm",
                "skillId": "gr-futur-proche-simple",
                "difficulty": "B1"
              },
              {
                "id": "rdv-g2",
                "type": "texte_a_trous",
                "skillId": "gr-futur-proche-simple",
                "difficulty": "B1"
              },
              {
                "id": "rdv-g3",
                "type": "remise_en_ordre",
                "skillId": "voc-rendez-vous",
                "difficulty": "B1"
              },
              {
                "id": "rdv-g4",
                "type": "association",
                "skillId": "voc-rendez-vous",
                "difficulty": "B1"
              },
              {
                "id": "rdv-g5",
                "type": "vrai_faux",
                "skillId": "gr-futur-proche-simple",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "prendre-rendez-vous-ecriture",
        "type": "ecriture",
        "title": "Production écrite",
        "optional": false,
        "activities": [
          {
            "id": "prendre-rendez-vous-ecriture-activite",
            "title": "Demander un rendez-vous par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "rdv-h",
                "type": "production_ecrite",
                "skillId": "pe-demander-rdv",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "prendre-rendez-vous-evaluation",
        "type": "evaluation",
        "title": "Mini-évaluation",
        "optional": true,
        "activities": [
          {
            "id": "prendre-rendez-vous-evaluation-activite",
            "title": "Bilan du module (10 items, 7/10 pour valider)",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "rdv-i1",
                "type": "qcm",
                "skillId": "gr-futur-proche-simple",
                "difficulty": "B1"
              },
              {
                "id": "rdv-i2",
                "type": "reponse_courte",
                "skillId": "gr-futur-proche-simple",
                "difficulty": "B1"
              },
              {
                "id": "rdv-i3",
                "type": "vrai_faux",
                "skillId": "voc-rendez-vous",
                "difficulty": "B1"
              },
              {
                "id": "rdv-i4",
                "type": "reponse_courte",
                "skillId": "voc-rendez-vous",
                "difficulty": "B1"
              },
              {
                "id": "rdv-i5",
                "type": "texte_a_trous",
                "skillId": "gr-futur-proche-simple",
                "difficulty": "B1"
              },
              {
                "id": "rdv-i6",
                "type": "reponse_courte",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              },
              {
                "id": "rdv-i7",
                "type": "qcm",
                "skillId": "voc-rendez-vous",
                "difficulty": "B1"
              },
              {
                "id": "rdv-i8",
                "type": "reponse_courte",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              },
              {
                "id": "rdv-i9",
                "type": "vrai_faux",
                "skillId": "gr-futur-proche-simple",
                "difficulty": "B1"
              },
              {
                "id": "rdv-i10",
                "type": "reponse_courte",
                "skillId": "pe-demander-rdv",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 18
  },
  {
    "id": "b1-donner-son-opinion",
    "slug": "donner-son-opinion",
    "level": "B1",
    "title": "Donner son opinion",
    "description": "À la fin de ce module, tu pourras donner ton avis sur un sujet simple et le justifier, à l'oral comme à l'écrit.",
    "objectives": [
      "Exprimer un accord ou un désaccord",
      "Justifier une opinion",
      "Réagir à l'opinion d'une autre personne"
    ],
    "domain": "production_ecrite",
    "stageId": "b1-intermediaire",
    "estimatedMinutes": 33,
    "lessons": [
      {
        "id": "donner-son-opinion-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "donner-son-opinion-comprendre-activite",
            "title": "Lire un message sur le compost partagé",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "opinion-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "donner-son-opinion-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "donner-son-opinion-ecoute-activite",
            "title": "Écouter un débat entre voisins",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "opinion-f",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "donner-son-opinion-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "donner-son-opinion-entrainement-activite",
            "title": "Pronoms compléments et vocabulaire de l'opinion",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "opinion-g1",
                "type": "qcm",
                "skillId": "gr-pronoms-complements",
                "difficulty": "B1"
              },
              {
                "id": "opinion-g2",
                "type": "texte_a_trous",
                "skillId": "gr-pronoms-complements",
                "difficulty": "B1"
              },
              {
                "id": "opinion-g3",
                "type": "qcm",
                "skillId": "voc-opinion",
                "difficulty": "B1"
              },
              {
                "id": "opinion-g4",
                "type": "association",
                "skillId": "voc-opinion",
                "difficulty": "B1"
              },
              {
                "id": "opinion-g5",
                "type": "remise_en_ordre",
                "skillId": "voc-opinion",
                "difficulty": "B1"
              },
              {
                "id": "opinion-g6",
                "type": "reponse_courte",
                "skillId": "pe-exprimer-avis",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "donner-son-opinion-ecriture",
        "type": "ecriture",
        "title": "Production écrite",
        "optional": false,
        "activities": [
          {
            "id": "donner-son-opinion-ecriture-activite",
            "title": "Donner son avis par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "opinion-h",
                "type": "production_ecrite",
                "skillId": "pe-exprimer-avis",
                "difficulty": "B1"
              }
            ]
          },
          {
            "id": "donner-son-opinion-ecriture-activite-orale",
            "title": "Donner son avis à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "opinion-h-oral",
                "type": "production_orale",
                "skillId": "pe-exprimer-avis",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "donner-son-opinion-evaluation",
        "type": "evaluation",
        "title": "Mini-évaluation",
        "optional": false,
        "activities": [
          {
            "id": "donner-son-opinion-evaluation-activite",
            "title": "Bilan du module (10 items, 7/10 pour valider)",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "opinion-i1",
                "type": "qcm",
                "skillId": "voc-opinion",
                "difficulty": "B1"
              },
              {
                "id": "opinion-i2",
                "type": "reponse_courte",
                "skillId": "gr-pronoms-complements",
                "difficulty": "B1"
              },
              {
                "id": "opinion-i3",
                "type": "vrai_faux",
                "skillId": "voc-opinion",
                "difficulty": "B1"
              },
              {
                "id": "opinion-i4",
                "type": "reponse_courte",
                "skillId": "voc-opinion",
                "difficulty": "B1"
              },
              {
                "id": "opinion-i5",
                "type": "texte_a_trous",
                "skillId": "gr-pronoms-complements",
                "difficulty": "B1"
              },
              {
                "id": "opinion-i6",
                "type": "reponse_courte",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "opinion-i7",
                "type": "qcm",
                "skillId": "gr-pronoms-complements",
                "difficulty": "B1"
              },
              {
                "id": "opinion-i8",
                "type": "reponse_courte",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              },
              {
                "id": "opinion-i9",
                "type": "reponse_courte",
                "skillId": "voc-opinion",
                "difficulty": "B1"
              },
              {
                "id": "opinion-i10",
                "type": "reponse_courte",
                "skillId": "pe-exprimer-avis",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 20
  },
  {
    "id": "b1-comparer-modes-de-vie",
    "slug": "comparer-modes-de-vie",
    "level": "B1",
    "title": "Comparer des choses, des lieux, des modes de vie",
    "description": "À la fin de ce module, tu pourras comparer deux situations, deux endroits ou deux façons de vivre, et justifier ta préférence.",
    "objectives": [
      "Comparer plusieurs possibilités",
      "Nuancer une comparaison",
      "Justifier une préférence"
    ],
    "domain": "production_ecrite",
    "stageId": "b1-intermediaire",
    "estimatedMinutes": 28,
    "lessons": [
      {
        "id": "comparer-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "comparer-comprendre-activite",
            "title": "Lire le message de Nadia",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "cmp-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comparer-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "comparer-entrainement-activite",
            "title": "Comparatif, superlatif et dont",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "cmp-g1",
                "type": "qcm",
                "skillId": "gr-comparatifs",
                "difficulty": "B1"
              },
              {
                "id": "cmp-g2",
                "type": "texte_a_trous",
                "skillId": "gr-superlatif",
                "difficulty": "B1"
              },
              {
                "id": "cmp-g3",
                "type": "association",
                "skillId": "gr-relatifs-dont",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comparer-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "comparer-ecriture-activite",
            "title": "Comparer deux modes de vie",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "cmp-h",
                "type": "production_ecrite",
                "skillId": "pe-exprimer-avis",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comparer-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "comparer-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "cmp-i1",
                "type": "reponse_courte",
                "skillId": "voc-modes-de-vie",
                "difficulty": "B1"
              },
              {
                "id": "cmp-i2",
                "type": "qcm",
                "skillId": "gr-superlatif",
                "difficulty": "B1"
              },
              {
                "id": "cmp-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-parler-de-ses-projets",
    "slug": "parler-de-ses-projets",
    "level": "B1",
    "title": "Parler de ses projets",
    "description": "À la fin de ce module, tu pourras présenter tes projets à court et moyen terme et expliquer les conditions pour les réaliser.",
    "objectives": [
      "Parler d'un projet personnel ou professionnel",
      "Exprimer une condition",
      "Expliquer les étapes prévues"
    ],
    "domain": "grammaire",
    "stageId": "b1-intermediaire",
    "estimatedMinutes": 27,
    "lessons": [
      {
        "id": "projets-ecoute",
        "type": "ecoute",
        "title": "Écouter",
        "optional": false,
        "activities": [
          {
            "id": "projets-ecoute-activite",
            "title": "Écouter un entretien avec une conseillère",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "prj-e",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "projets-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "projets-entrainement-activite",
            "title": "Futur et condition réelle",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "prj-g1",
                "type": "qcm",
                "skillId": "gr-futur-proche-simple",
                "difficulty": "B1"
              },
              {
                "id": "prj-g2",
                "type": "texte_a_trous",
                "skillId": "gr-si-condition",
                "difficulty": "B1"
              },
              {
                "id": "prj-g3",
                "type": "association",
                "skillId": "voc-projets",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "projets-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "projets-ecriture-activite",
            "title": "Présenter son projet",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "prj-h",
                "type": "production_ecrite",
                "skillId": "pe-presentation-professionnelle",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "projets-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "projets-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "prj-i1",
                "type": "qcm",
                "skillId": "gr-si-condition",
                "difficulty": "B1"
              },
              {
                "id": "prj-i2",
                "type": "reponse_courte",
                "skillId": "voc-projets",
                "difficulty": "B1"
              },
              {
                "id": "prj-i3",
                "type": "vrai_faux",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-parler-de-son-travail-et-projets",
    "slug": "parler-de-son-travail-et-projets",
    "level": "B1",
    "title": "Parler de son travail et de ses projets",
    "description": "À la fin de ce module, tu pourras décrire ton travail (actuel ou passé), raconter brièvement ton parcours professionnel et présenter un projet pour l'avenir.",
    "objectives": [
      "Décrire un poste",
      "Raconter un parcours professionnel",
      "Présenter un projet professionnel"
    ],
    "domain": "production_ecrite",
    "stageId": "b1-intermediaire",
    "estimatedMinutes": 33,
    "lessons": [
      {
        "id": "parler-de-son-travail-et-projets-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "parler-de-son-travail-et-projets-comprendre-activite",
            "title": "Lire le profil professionnel de Karim",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "travail-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "parler-de-son-travail-et-projets-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "parler-de-son-travail-et-projets-ecoute-activite",
            "title": "Écouter Karim et Julie",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "travail-f",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "parler-de-son-travail-et-projets-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "parler-de-son-travail-et-projets-entrainement-activite",
            "title": "Passé, futur proche et vocabulaire du travail",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "travail-g1",
                "type": "texte_a_trous",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "travail-g2",
                "type": "texte_a_trous",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "travail-g3",
                "type": "association",
                "skillId": "voc-travail",
                "difficulty": "B1"
              },
              {
                "id": "travail-g4",
                "type": "texte_a_trous",
                "skillId": "voc-travail",
                "difficulty": "B1"
              },
              {
                "id": "travail-g5",
                "type": "vrai_faux",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              },
              {
                "id": "travail-g6",
                "type": "reponse_courte",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "parler-de-son-travail-et-projets-ecriture",
        "type": "ecriture",
        "title": "Production écrite",
        "optional": false,
        "activities": [
          {
            "id": "parler-de-son-travail-et-projets-ecriture-activite",
            "title": "Se présenter professionnellement",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "travail-h",
                "type": "production_ecrite",
                "skillId": "pe-presentation-professionnelle",
                "difficulty": "B1"
              }
            ]
          },
          {
            "id": "parler-de-son-travail-et-projets-ecriture-activite-orale",
            "title": "Se présenter professionnellement à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "travail-h-oral",
                "type": "production_orale",
                "skillId": "pe-presentation-professionnelle",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "parler-de-son-travail-et-projets-evaluation",
        "type": "evaluation",
        "title": "Mini-évaluation",
        "optional": false,
        "activities": [
          {
            "id": "parler-de-son-travail-et-projets-evaluation-activite",
            "title": "Bilan du module (10 items, 7/10 pour valider)",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "travail-i1",
                "type": "qcm",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "travail-i2",
                "type": "reponse_courte",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "travail-i3",
                "type": "vrai_faux",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "travail-i4",
                "type": "reponse_courte",
                "skillId": "voc-travail",
                "difficulty": "B1"
              },
              {
                "id": "travail-i5",
                "type": "texte_a_trous",
                "skillId": "voc-travail",
                "difficulty": "B1"
              },
              {
                "id": "travail-i6",
                "type": "reponse_courte",
                "skillId": "voc-travail",
                "difficulty": "B1"
              },
              {
                "id": "travail-i7",
                "type": "qcm",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "travail-i8",
                "type": "reponse_courte",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              },
              {
                "id": "travail-i9",
                "type": "reponse_courte",
                "skillId": "voc-travail",
                "difficulty": "B1"
              },
              {
                "id": "travail-i10",
                "type": "reponse_courte",
                "skillId": "pe-presentation-professionnelle",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 20
  },
  {
    "id": "b1-aller-chez-le-medecin",
    "slug": "aller-chez-le-medecin",
    "level": "B1",
    "title": "Aller chez le médecin et parler de sa santé",
    "description": "À la fin de ce module, tu pourras décrire un symptôme, préciser depuis quand, et comprendre les conseils d'un médecin.",
    "objectives": [
      "Décrire un symptôme",
      "Préciser depuis quand",
      "Comprendre et reformuler une recommandation"
    ],
    "domain": "comprehension_orale",
    "stageId": "b1-intermediaire",
    "estimatedMinutes": 27,
    "lessons": [
      {
        "id": "medecin-ecoute",
        "type": "ecoute",
        "title": "Écouter",
        "optional": false,
        "activities": [
          {
            "id": "medecin-ecoute-activite",
            "title": "Écouter une consultation",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "med-e",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "medecin-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "medecin-entrainement-activite",
            "title": "Durée et conseils médicaux",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "med-g1",
                "type": "qcm",
                "skillId": "gr-expression-duree",
                "difficulty": "B1"
              },
              {
                "id": "med-g2",
                "type": "texte_a_trous",
                "skillId": "gr-imperatif",
                "difficulty": "B1"
              },
              {
                "id": "med-g3",
                "type": "association",
                "skillId": "voc-sante",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "medecin-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "medecin-ecriture-activite",
            "title": "Décrire ses symptômes par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "med-h",
                "type": "production_ecrite",
                "skillId": "pe-expliquer-probleme",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "medecin-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "medecin-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "med-i1",
                "type": "qcm",
                "skillId": "gr-expression-duree",
                "difficulty": "B1"
              },
              {
                "id": "med-i2",
                "type": "reponse_courte",
                "skillId": "voc-sante",
                "difficulty": "B1"
              },
              {
                "id": "med-i3",
                "type": "vrai_faux",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-expliquer-un-probleme-et-demander-une-solution",
    "slug": "expliquer-un-probleme-et-demander-une-solution",
    "level": "B1",
    "title": "Expliquer un problème et demander une solution",
    "description": "À la fin de ce module, tu pourras décrire un problème concret, en expliquer la cause, et demander clairement une solution, à l'oral et à l'écrit.",
    "objectives": [
      "Expliquer un problème",
      "Exprimer une cause et une conséquence",
      "Demander de l'aide de façon claire et polie"
    ],
    "domain": "production_ecrite",
    "stageId": "b1-intermediaire",
    "estimatedMinutes": 33,
    "lessons": [
      {
        "id": "expliquer-un-probleme-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "expliquer-un-probleme-comprendre-activite",
            "title": "Lire le message d'Amélie au service client",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "probleme-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "expliquer-un-probleme-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "expliquer-un-probleme-ecoute-activite",
            "title": "Écouter l'appel au service technique",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "probleme-f",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "expliquer-un-probleme-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "expliquer-un-probleme-entrainement-activite",
            "title": "Cause, conséquence et vocabulaire du problème",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "probleme-g1",
                "type": "qcm",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "probleme-g2",
                "type": "texte_a_trous",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "probleme-g3",
                "type": "association",
                "skillId": "voc-problemes-quotidien",
                "difficulty": "B1"
              },
              {
                "id": "probleme-g4",
                "type": "qcm",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "probleme-g5",
                "type": "vrai_faux",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              },
              {
                "id": "probleme-g6",
                "type": "reponse_courte",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "expliquer-un-probleme-ecriture",
        "type": "ecriture",
        "title": "Production écrite",
        "optional": false,
        "activities": [
          {
            "id": "expliquer-un-probleme-ecriture-activite",
            "title": "Signaler un problème par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "probleme-h",
                "type": "production_ecrite",
                "skillId": "pe-expliquer-probleme",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "expliquer-un-probleme-evaluation",
        "type": "evaluation",
        "title": "Mini-évaluation",
        "optional": false,
        "activities": [
          {
            "id": "expliquer-un-probleme-evaluation-activite",
            "title": "Bilan du module (10 items, 7/10 pour valider)",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "probleme-i1",
                "type": "qcm",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "probleme-i2",
                "type": "reponse_courte",
                "skillId": "voc-problemes-quotidien",
                "difficulty": "B1"
              },
              {
                "id": "probleme-i3",
                "type": "vrai_faux",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "probleme-i4",
                "type": "texte_a_trous",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "probleme-i5",
                "type": "reponse_courte",
                "skillId": "voc-problemes-quotidien",
                "difficulty": "B1"
              },
              {
                "id": "probleme-i6",
                "type": "qcm",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "probleme-i7",
                "type": "reponse_courte",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              },
              {
                "id": "probleme-i8",
                "type": "reponse_courte",
                "skillId": "voc-problemes-quotidien",
                "difficulty": "B1"
              },
              {
                "id": "probleme-i9",
                "type": "reponse_courte",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "probleme-i10",
                "type": "reponse_courte",
                "skillId": "pe-expliquer-probleme",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 19
  },
  {
    "id": "b1-faire-une-reclamation",
    "slug": "faire-une-reclamation",
    "level": "B1",
    "title": "Faire une réclamation",
    "description": "À la fin de ce module, tu pourras expliquer un problème avec des faits précis, exprimer poliment ton mécontentement et demander une solution.",
    "objectives": [
      "Expliquer un problème avec des faits précis",
      "Demander une solution",
      "Répondre à une proposition (accepter ou refuser)"
    ],
    "domain": "production_ecrite",
    "stageId": "b1-intermediaire",
    "estimatedMinutes": 28,
    "lessons": [
      {
        "id": "reclamation-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "reclamation-comprendre-activite",
            "title": "Lire un e-mail de réclamation",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "rec-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "reclamation-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "reclamation-entrainement-activite",
            "title": "Négation renforcée et politesse",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "rec-g1",
                "type": "qcm",
                "skillId": "gr-negation-avancee",
                "difficulty": "B1"
              },
              {
                "id": "rec-g2",
                "type": "texte_a_trous",
                "skillId": "gr-conditionnel-politesse",
                "difficulty": "B1"
              },
              {
                "id": "rec-g3",
                "type": "association",
                "skillId": "voc-reclamation",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "reclamation-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "reclamation-ecriture-activite",
            "title": "Rédiger une réclamation",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "rec-h",
                "type": "production_ecrite",
                "skillId": "pe-expliquer-probleme",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "reclamation-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "reclamation-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "rec-i1",
                "type": "qcm",
                "skillId": "gr-negation-avancee",
                "difficulty": "B1"
              },
              {
                "id": "rec-i2",
                "type": "reponse_courte",
                "skillId": "voc-reclamation",
                "difficulty": "B1"
              },
              {
                "id": "rec-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-comprendre-une-demarche-administrative",
    "slug": "comprendre-une-demarche-administrative",
    "level": "B1",
    "title": "Comprendre une démarche administrative",
    "description": "À la fin de ce module, tu pourras comprendre les étapes d'une démarche administrative, identifier les documents à fournir et poser une question pour clarifier une procédure.",
    "objectives": [
      "Comprendre une procédure",
      "Repérer une liste de pièces justificatives",
      "Poser une question de clarification"
    ],
    "domain": "comprehension_ecrite",
    "stageId": "b1-intermediaire",
    "estimatedMinutes": 33,
    "lessons": [
      {
        "id": "comprendre-une-demarche-administrative-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "comprendre-une-demarche-administrative-comprendre-activite",
            "title": "Lire une page d'information administrative",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "admin-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comprendre-une-demarche-administrative-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "comprendre-une-demarche-administrative-ecoute-activite",
            "title": "Écouter Youssef au guichet de la préfecture",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "admin-f",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comprendre-une-demarche-administrative-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "comprendre-une-demarche-administrative-entrainement-activite",
            "title": "Il faut que + subjonctif, et vocabulaire administratif",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "admin-g1",
                "type": "qcm",
                "skillId": "gr-subjonctif-il-faut-que",
                "difficulty": "B1"
              },
              {
                "id": "admin-g2",
                "type": "texte_a_trous",
                "skillId": "gr-subjonctif-il-faut-que",
                "difficulty": "B1"
              },
              {
                "id": "admin-g3",
                "type": "remise_en_ordre",
                "skillId": "voc-administratif",
                "difficulty": "B1"
              },
              {
                "id": "admin-g4",
                "type": "association",
                "skillId": "voc-administratif",
                "difficulty": "B1"
              },
              {
                "id": "admin-g5",
                "type": "reponse_courte",
                "skillId": "voc-administratif",
                "difficulty": "B1"
              },
              {
                "id": "admin-g6",
                "type": "vrai_faux",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comprendre-une-demarche-administrative-ecriture",
        "type": "ecriture",
        "title": "Production écrite",
        "optional": false,
        "activities": [
          {
            "id": "comprendre-une-demarche-administrative-ecriture-activite",
            "title": "Demander une clarification par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "admin-h",
                "type": "production_ecrite",
                "skillId": "pe-clarifier-demarche",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "comprendre-une-demarche-administrative-evaluation",
        "type": "evaluation",
        "title": "Mini-évaluation",
        "optional": false,
        "activities": [
          {
            "id": "comprendre-une-demarche-administrative-evaluation-activite",
            "title": "Bilan du module (10 items, 7/10 pour valider)",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "admin-i1",
                "type": "qcm",
                "skillId": "gr-subjonctif-il-faut-que",
                "difficulty": "B1"
              },
              {
                "id": "admin-i2",
                "type": "reponse_courte",
                "skillId": "voc-administratif",
                "difficulty": "B1"
              },
              {
                "id": "admin-i3",
                "type": "vrai_faux",
                "skillId": "voc-administratif",
                "difficulty": "B1"
              },
              {
                "id": "admin-i4",
                "type": "texte_a_trous",
                "skillId": "gr-connecteurs-logiques",
                "difficulty": "B1"
              },
              {
                "id": "admin-i5",
                "type": "reponse_courte",
                "skillId": "voc-administratif",
                "difficulty": "B1"
              },
              {
                "id": "admin-i6",
                "type": "reponse_courte",
                "skillId": "gr-subjonctif-il-faut-que",
                "difficulty": "B1"
              },
              {
                "id": "admin-i7",
                "type": "qcm",
                "skillId": "voc-administratif",
                "difficulty": "B1"
              },
              {
                "id": "admin-i8",
                "type": "reponse_courte",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              },
              {
                "id": "admin-i9",
                "type": "reponse_courte",
                "skillId": "voc-administratif",
                "difficulty": "B1"
              },
              {
                "id": "admin-i10",
                "type": "reponse_courte",
                "skillId": "pe-clarifier-demarche",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 19
  },
  {
    "id": "b1-parler-ecole-enfant",
    "slug": "parler-ecole-enfant",
    "level": "B1",
    "title": "Parler de l'école de son enfant",
    "description": "À la fin de ce module, tu pourras échanger avec l'école de ton enfant et comprendre les informations transmises.",
    "objectives": [
      "Comprendre une communication scolaire",
      "Poser une question à un enseignant",
      "Décrire une situation familiale ou scolaire"
    ],
    "domain": "comprehension_orale",
    "stageId": "b1-consolidation",
    "estimatedMinutes": 27,
    "lessons": [
      {
        "id": "ecole-ecoute",
        "type": "ecoute",
        "title": "Écouter",
        "optional": false,
        "activities": [
          {
            "id": "ecole-ecoute-activite",
            "title": "Écouter un échange avec l'institutrice",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "eco-e",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "ecole-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "ecole-entrainement-activite",
            "title": "Donner son avis et réviser dont",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "eco-g1",
                "type": "qcm",
                "skillId": "gr-relatifs-dont",
                "difficulty": "B1"
              },
              {
                "id": "eco-g2",
                "type": "texte_a_trous",
                "skillId": "gr-subordonnee-que",
                "difficulty": "B1"
              },
              {
                "id": "eco-g3",
                "type": "association",
                "skillId": "voc-scolarite",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "ecole-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "ecole-ecriture-activite",
            "title": "Répondre à un message de l'école",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "eco-h",
                "type": "reponse_courte",
                "skillId": "pe-clarifier-demarche",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "ecole-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "ecole-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "eco-i1",
                "type": "qcm",
                "skillId": "gr-subordonnee-que",
                "difficulty": "B1"
              },
              {
                "id": "eco-i2",
                "type": "reponse_courte",
                "skillId": "voc-scolarite",
                "difficulty": "B1"
              },
              {
                "id": "eco-i3",
                "type": "vrai_faux",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-utiliser-les-transports",
    "slug": "utiliser-les-transports",
    "level": "B1",
    "title": "Utiliser les transports et comprendre une annonce",
    "description": "À la fin de ce module, tu pourras comprendre une annonce dans les transports et expliquer un trajet ou un incident.",
    "objectives": [
      "Comprendre une annonce publique",
      "Décrire un trajet",
      "Signaler un incident de transport"
    ],
    "domain": "comprehension_orale",
    "stageId": "b1-consolidation",
    "estimatedMinutes": 27,
    "lessons": [
      {
        "id": "utiliser-les-transports-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "utiliser-les-transports-comprendre-activite",
            "title": "Lire le panneau d'information voyageurs",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "transport-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "utiliser-les-transports-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "utiliser-les-transports-ecoute-activite",
            "title": "Écouter l'annonce en gare",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "transport-f",
                "type": "comprehension_orale",
                "skillId": "co-annonces-publiques",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "utiliser-les-transports-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "utiliser-les-transports-entrainement-activite",
            "title": "Vocabulaire et récit d'un trajet",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "transport-g1",
                "type": "qcm",
                "skillId": "voc-transports",
                "difficulty": "B1"
              },
              {
                "id": "transport-g2",
                "type": "texte_a_trous",
                "skillId": "gr-present-habitudes",
                "difficulty": "B1"
              },
              {
                "id": "transport-g3",
                "type": "association",
                "skillId": "voc-transports",
                "difficulty": "B1"
              },
              {
                "id": "transport-g4",
                "type": "remise_en_ordre",
                "skillId": "voc-transports",
                "difficulty": "B1"
              },
              {
                "id": "transport-g5",
                "type": "vrai_faux",
                "skillId": "voc-transports",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "utiliser-les-transports-ecriture",
        "type": "ecriture",
        "title": "Production écrite",
        "optional": false,
        "activities": [
          {
            "id": "utiliser-les-transports-ecriture-activite",
            "title": "Raconter un incident de trajet",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "transport-h",
                "type": "production_ecrite",
                "skillId": "pe-signaler-incident",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "utiliser-les-transports-evaluation",
        "type": "evaluation",
        "title": "Mini-évaluation",
        "optional": true,
        "activities": [
          {
            "id": "utiliser-les-transports-evaluation-activite",
            "title": "Bilan du module (10 items, 7/10 pour valider)",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "transport-i1",
                "type": "qcm",
                "skillId": "co-annonces-publiques",
                "difficulty": "B1"
              },
              {
                "id": "transport-i2",
                "type": "reponse_courte",
                "skillId": "voc-transports",
                "difficulty": "B1"
              },
              {
                "id": "transport-i3",
                "type": "vrai_faux",
                "skillId": "voc-transports",
                "difficulty": "B1"
              },
              {
                "id": "transport-i4",
                "type": "reponse_courte",
                "skillId": "voc-transports",
                "difficulty": "B1"
              },
              {
                "id": "transport-i5",
                "type": "texte_a_trous",
                "skillId": "gr-present-habitudes",
                "difficulty": "B1"
              },
              {
                "id": "transport-i6",
                "type": "reponse_courte",
                "skillId": "co-annonces-publiques",
                "difficulty": "B1"
              },
              {
                "id": "transport-i7",
                "type": "qcm",
                "skillId": "voc-transports",
                "difficulty": "B1"
              },
              {
                "id": "transport-i8",
                "type": "reponse_courte",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              },
              {
                "id": "transport-i9",
                "type": "vrai_faux",
                "skillId": "co-annonces-publiques",
                "difficulty": "B1"
              },
              {
                "id": "transport-i10",
                "type": "reponse_courte",
                "skillId": "pe-signaler-incident",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 18
  },
  {
    "id": "b1-rechercher-un-emploi",
    "slug": "rechercher-un-emploi",
    "level": "B1",
    "title": "Rechercher un emploi et passer un entretien",
    "description": "À la fin de ce module, tu pourras présenter ta candidature à l'oral et répondre aux questions courantes d'un entretien.",
    "objectives": [
      "Comprendre une annonce d'emploi",
      "Présenter son expérience et ses qualités",
      "Répondre à des questions d'entretien"
    ],
    "domain": "production_ecrite",
    "stageId": "b1-consolidation",
    "estimatedMinutes": 30,
    "lessons": [
      {
        "id": "emploi-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "emploi-comprendre-activite",
            "title": "Lire une annonce d'emploi",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "emp-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "emploi-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "emploi-entrainement-activite",
            "title": "Exprimer un but et réviser le subjonctif",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "emp-g1",
                "type": "qcm",
                "skillId": "gr-expression-but",
                "difficulty": "B1"
              },
              {
                "id": "emp-g2",
                "type": "texte_a_trous",
                "skillId": "gr-subjonctif-il-faut-que",
                "difficulty": "B1"
              },
              {
                "id": "emp-g3",
                "type": "association",
                "skillId": "voc-recherche-emploi",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "emploi-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "emploi-ecriture-activite",
            "title": "Présenter sa candidature",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "emp-h",
                "type": "production_ecrite",
                "skillId": "pe-presentation-professionnelle",
                "difficulty": "B1"
              }
            ]
          },
          {
            "id": "emploi-ecriture-activite-orale",
            "title": "Répondre à des questions d'entretien",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "emp-h-oral",
                "type": "production_orale",
                "skillId": "pe-presentation-professionnelle",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "emploi-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "emploi-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "emp-i1",
                "type": "qcm",
                "skillId": "gr-expression-but",
                "difficulty": "B1"
              },
              {
                "id": "emp-i2",
                "type": "reponse_courte",
                "skillId": "voc-recherche-emploi",
                "difficulty": "B1"
              },
              {
                "id": "emp-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "b1-hypothese-et-conseil",
    "slug": "hypothese-et-conseil",
    "level": "B1",
    "title": "Exprimer une hypothèse et donner un conseil",
    "description": "À la fin de ce module, tu pourras envisager une possibilité et conseiller quelqu'un face à une décision.",
    "objectives": [
      "Faire une hypothèse",
      "Conseiller quelqu'un",
      "Nuancer un conseil"
    ],
    "domain": "grammaire",
    "stageId": "b1-consolidation",
    "estimatedMinutes": 30,
    "lessons": [
      {
        "id": "conseil-ecoute",
        "type": "ecoute",
        "title": "Écouter",
        "optional": false,
        "activities": [
          {
            "id": "conseil-ecoute-activite",
            "title": "Écouter Yasmine demander conseil",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "cns-e",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "conseil-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "conseil-entrainement-activite",
            "title": "Hypothèse et vocabulaire du conseil",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "cns-g1",
                "type": "qcm",
                "skillId": "gr-conditionnel-hypothese",
                "difficulty": "B1"
              },
              {
                "id": "cns-g2",
                "type": "texte_a_trous",
                "skillId": "gr-conditionnel-hypothese",
                "difficulty": "B1"
              },
              {
                "id": "cns-g3",
                "type": "association",
                "skillId": "voc-conseils",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "conseil-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "conseil-ecriture-activite",
            "title": "Conseiller un ami",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "cns-h",
                "type": "production_ecrite",
                "skillId": "pe-conseiller",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "conseil-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "conseil-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "cns-i1",
                "type": "qcm",
                "skillId": "gr-conditionnel-hypothese",
                "difficulty": "B1"
              },
              {
                "id": "cns-i2",
                "type": "reponse_courte",
                "skillId": "voc-conseils",
                "difficulty": "B1"
              },
              {
                "id": "cns-i3",
                "type": "vrai_faux",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-rapporter-les-paroles",
    "slug": "rapporter-les-paroles",
    "level": "B1",
    "title": "Rapporter les paroles de quelqu'un",
    "description": "À la fin de ce module, tu pourras transmettre correctement un message ou une information reçue par quelqu'un d'autre.",
    "objectives": [
      "Rapporter un message reçu",
      "Transmettre une demande ou une consigne",
      "Distinguer ce qu'on sait de ce qu'on a entendu dire"
    ],
    "domain": "production_ecrite",
    "stageId": "b1-consolidation",
    "estimatedMinutes": 27,
    "lessons": [
      {
        "id": "rapporter-ecoute",
        "type": "ecoute",
        "title": "Écouter",
        "optional": false,
        "activities": [
          {
            "id": "rapporter-ecoute-activite",
            "title": "Écouter un message vocal",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "rap-e",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "rapporter-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "rapporter-entrainement-activite",
            "title": "Transformer en discours rapporté",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "rap-g1",
                "type": "qcm",
                "skillId": "gr-discours-rapporte",
                "difficulty": "B1"
              },
              {
                "id": "rap-g2",
                "type": "texte_a_trous",
                "skillId": "gr-discours-rapporte",
                "difficulty": "B1"
              },
              {
                "id": "rap-g3",
                "type": "association",
                "skillId": "voc-communication",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "rapporter-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "rapporter-ecriture-activite",
            "title": "Transmettre un message reçu",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "rap-h",
                "type": "production_ecrite",
                "skillId": "pe-rapporter-message",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "rapporter-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "rapporter-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "rap-i1",
                "type": "qcm",
                "skillId": "gr-discours-rapporte",
                "difficulty": "B1"
              },
              {
                "id": "rap-i2",
                "type": "reponse_courte",
                "skillId": "voc-communication",
                "difficulty": "B1"
              },
              {
                "id": "rap-i3",
                "type": "vrai_faux",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-organiser-un-voyage",
    "slug": "organiser-un-voyage",
    "level": "B1",
    "title": "Organiser un voyage",
    "description": "À la fin de ce module, tu pourras organiser un voyage simple, comparer plusieurs options et exprimer une préférence.",
    "objectives": [
      "Comparer plusieurs options de voyage",
      "Comprendre un document de réservation",
      "Justifier un choix et s'organiser"
    ],
    "domain": "comprehension_ecrite",
    "stageId": "b1-consolidation",
    "estimatedMinutes": 28,
    "lessons": [
      {
        "id": "voyage-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "voyage-comprendre-activite",
            "title": "Lire une confirmation de réservation",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "voy-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "voyage-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "voyage-entrainement-activite",
            "title": "Choisir et réviser y/en",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "voy-g1",
                "type": "qcm",
                "skillId": "gr-connecteurs-choix",
                "difficulty": "B1"
              },
              {
                "id": "voy-g2",
                "type": "texte_a_trous",
                "skillId": "gr-pronoms-complements",
                "difficulty": "B1"
              },
              {
                "id": "voy-g3",
                "type": "association",
                "skillId": "voc-voyage",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "voyage-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "voyage-ecriture-activite",
            "title": "Comparer deux façons de voyager",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "voy-h",
                "type": "production_ecrite",
                "skillId": "pe-exprimer-avis",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "voyage-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "voyage-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "voy-i1",
                "type": "qcm",
                "skillId": "gr-connecteurs-choix",
                "difficulty": "B1"
              },
              {
                "id": "voy-i2",
                "type": "reponse_courte",
                "skillId": "voc-voyage",
                "difficulty": "B1"
              },
              {
                "id": "voy-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-opinion-question-de-societe",
    "slug": "opinion-question-de-societe",
    "level": "B1",
    "title": "Donner son opinion sur une question de société",
    "description": "À la fin de ce module, tu pourras exprimer et structurer ton opinion sur un sujet de société simple, à l'écrit.",
    "objectives": [
      "Identifier différents points de vue",
      "Argumenter et nuancer une opinion",
      "Opposer deux points de vue"
    ],
    "domain": "production_ecrite",
    "stageId": "b1-consolidation",
    "estimatedMinutes": 32,
    "lessons": [
      {
        "id": "societe-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "societe-comprendre-activite",
            "title": "Lire un débat sur un forum",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "soc-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "societe-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "societe-entrainement-activite",
            "title": "Opposer et nuancer",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "soc-g1",
                "type": "qcm",
                "skillId": "gr-opposition-concession",
                "difficulty": "B1"
              },
              {
                "id": "soc-g2",
                "type": "texte_a_trous",
                "skillId": "gr-opposition-concession",
                "difficulty": "B1"
              },
              {
                "id": "soc-g3",
                "type": "association",
                "skillId": "voc-societe",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "societe-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "societe-ecriture-activite",
            "title": "Donner son opinion sur un sujet de société",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "soc-h",
                "type": "production_ecrite",
                "skillId": "pe-exprimer-avis",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "societe-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "societe-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "soc-i1",
                "type": "qcm",
                "skillId": "gr-opposition-concession",
                "difficulty": "B1"
              },
              {
                "id": "soc-i2",
                "type": "reponse_courte",
                "skillId": "voc-societe",
                "difficulty": "B1"
              },
              {
                "id": "soc-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "b1-bilan-se-presenter-examen",
    "slug": "bilan-b1",
    "level": "B1",
    "title": "Bilan B1 : se présenter à un examen",
    "description": "À la fin de ce module, tu pourras mobiliser tes principales compétences B1 dans un cadre proche d'un examen, et organiser ta réponse avec méthode.",
    "objectives": [
      "Combiner plusieurs compétences B1 dans une même tâche",
      "Gérer une consigne d'examen",
      "Organiser et vérifier sa production"
    ],
    "domain": "comprehension_ecrite",
    "stageId": "b1-consolidation",
    "estimatedMinutes": 40,
    "lessons": [
      {
        "id": "bilan-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "bilan-comprendre-activite",
            "title": "Lire un texte qui raconte et qui donne un avis",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "bil-e",
                "type": "comprehension_ecrite",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "bilan-ecoute-activite",
            "title": "Écouter Léa raconter un choix professionnel",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "bil-f",
                "type": "comprehension_orale",
                "skillId": "co-dialogues-simples",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "bilan-entrainement-activite",
            "title": "Révision croisée : temps, verbes et méthode d'examen",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "bil-g1",
                "type": "qcm",
                "skillId": "gr-conditionnel-hypothese",
                "difficulty": "B1"
              },
              {
                "id": "bil-g2",
                "type": "texte_a_trous",
                "skillId": "gr-passe-compose-imparfait",
                "difficulty": "B1"
              },
              {
                "id": "bil-g3",
                "type": "association",
                "skillId": "exam-delf-b1",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "bilan-ecriture-activite",
            "title": "Tâche intégrée : raconter et donner son avis",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "bil-h",
                "type": "production_ecrite",
                "skillId": "pe-exprimer-avis",
                "difficulty": "B1"
              }
            ]
          },
          {
            "id": "bilan-ecriture-activite-orale",
            "title": "Monologue suivi (entraînement en conditions d'examen)",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "bil-h-oral",
                "type": "production_orale",
                "skillId": "exam-delf-b1",
                "difficulty": "B1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "bilan-evaluation-activite",
            "title": "Bilan transversal",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "bil-i1",
                "type": "qcm",
                "skillId": "gr-subjonctif-il-faut-que",
                "difficulty": "B1"
              },
              {
                "id": "bil-i2",
                "type": "reponse_courte",
                "skillId": "exam-delf-b1",
                "difficulty": "B1"
              },
              {
                "id": "bil-i3",
                "type": "vrai_faux",
                "skillId": "ce-textes-courants",
                "difficulty": "B1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a1-se-presenter",
    "slug": "se-presenter-a1",
    "level": "A1",
    "title": "Se saluer et se présenter",
    "description": "À la fin de ce module, tu peux saluer quelqu'un, dire ton nom et épeler.",
    "objectives": [
      "Saluer et prendre congé",
      "Dire son nom et épeler",
      "Demander le nom de quelqu'un"
    ],
    "domain": "grammaire",
    "stageId": "a1-decouverte",
    "estimatedMinutes": 15,
    "lessons": [
      {
        "id": "a1-se-presenter-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "a1-se-presenter-comprendre-activite",
            "title": "Lire un petit dialogue",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m01-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "a1-se-presenter-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "a1-se-presenter-entrainement-activite",
            "title": "Saluer et se présenter",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m01-g1",
                "type": "qcm",
                "skillId": "a1-gr-etre-avoir",
                "difficulty": "A1"
              },
              {
                "id": "m01-g2",
                "type": "texte_a_trous",
                "skillId": "a1-gr-etre-avoir",
                "difficulty": "A1"
              },
              {
                "id": "m01-g3",
                "type": "association",
                "skillId": "a1-voc-identite",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "a1-se-presenter-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "a1-se-presenter-ecriture-activite",
            "title": "Se présenter par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m01-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-se-presenter",
                "difficulty": "A1"
              }
            ]
          },
          {
            "id": "a1-se-presenter-ecriture-activite-orale",
            "title": "Se présenter à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m01-h-oral",
                "type": "production_orale",
                "skillId": "a1-pe-se-presenter",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "a1-se-presenter-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "a1-se-presenter-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m01-i1",
                "type": "qcm",
                "skillId": "a1-gr-etre-avoir",
                "difficulty": "A1"
              },
              {
                "id": "m01-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-identite",
                "difficulty": "A1"
              },
              {
                "id": "m01-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-nombres-et-age",
    "slug": "nombres-et-age",
    "level": "A1",
    "title": "Les nombres et l'âge",
    "description": "À la fin de ce module, tu peux compter, donner ton âge et ton numéro de téléphone.",
    "objectives": [
      "Utiliser les nombres de 0 à 100",
      "Donner et demander l'âge de quelqu'un",
      "Donner un numéro de téléphone"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-decouverte",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "nombres-et-age-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "nombres-et-age-comprendre-activite",
            "title": "Lire une fiche d'inscription",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m02-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "nombres-et-age-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "nombres-et-age-ecoute-activite",
            "title": "Écouter une présentation",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m02-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "nombres-et-age-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "nombres-et-age-entrainement-activite",
            "title": "Compter et donner son âge",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m02-g1",
                "type": "qcm",
                "skillId": "a1-gr-etre-avoir",
                "difficulty": "A1"
              },
              {
                "id": "m02-g2",
                "type": "remise_en_ordre",
                "skillId": "a1-voc-nombres",
                "difficulty": "A1"
              },
              {
                "id": "m02-g3",
                "type": "texte_a_trous",
                "skillId": "a1-voc-nombres",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "nombres-et-age-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "nombres-et-age-ecriture-activite",
            "title": "Donner des informations chiffrées",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m02-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-se-presenter",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "nombres-et-age-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "nombres-et-age-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m02-i1",
                "type": "qcm",
                "skillId": "a1-gr-etre-avoir",
                "difficulty": "A1"
              },
              {
                "id": "m02-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-nombres",
                "difficulty": "A1"
              },
              {
                "id": "m02-i3",
                "type": "vrai_faux",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-nationalites-et-langues",
    "slug": "nationalites-et-langues",
    "level": "A1",
    "title": "Nationalités et langues",
    "description": "À la fin de ce module, tu peux dire d'où tu viens, ta nationalité et les langues que tu parles.",
    "objectives": [
      "Dire sa nationalité",
      "Dire d'où on vient",
      "Dire quelle(s) langue(s) on parle"
    ],
    "domain": "grammaire",
    "stageId": "a1-decouverte",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "nationalites-et-langues-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "nationalites-et-langues-comprendre-activite",
            "title": "Lire un mini-dialogue",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m03-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "nationalites-et-langues-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "nationalites-et-langues-entrainement-activite",
            "title": "Nationalités et langues",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m03-g1",
                "type": "qcm",
                "skillId": "a1-gr-verbes-irreguliers",
                "difficulty": "A1"
              },
              {
                "id": "m03-g2",
                "type": "texte_a_trous",
                "skillId": "a1-voc-identite",
                "difficulty": "A1"
              },
              {
                "id": "m03-g3",
                "type": "association",
                "skillId": "a1-voc-identite",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "nationalites-et-langues-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "nationalites-et-langues-ecriture-activite",
            "title": "Se présenter : pays et langues",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m03-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-se-presenter",
                "difficulty": "A1"
              }
            ]
          },
          {
            "id": "nationalites-et-langues-ecriture-activite-orale",
            "title": "Se présenter à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m03-h-oral",
                "type": "production_orale",
                "skillId": "a1-pe-se-presenter",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "nationalites-et-langues-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "nationalites-et-langues-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m03-i1",
                "type": "qcm",
                "skillId": "a1-gr-verbes-irreguliers",
                "difficulty": "A1"
              },
              {
                "id": "m03-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-identite",
                "difficulty": "A1"
              },
              {
                "id": "m03-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-ma-famille",
    "slug": "ma-famille",
    "level": "A1",
    "title": "Ma famille",
    "description": "À la fin de ce module, tu peux présenter ta famille et utiliser les possessifs simples.",
    "objectives": [
      "Nommer les membres de sa famille",
      "Utiliser les adjectifs possessifs (mon, ma, mes...)",
      "Présenter quelqu'un"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-decouverte",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "ma-famille-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "ma-famille-comprendre-activite",
            "title": "Lire une présentation de famille",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m04-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "ma-famille-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "ma-famille-ecoute-activite",
            "title": "Écouter une présentation de famille",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m04-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "ma-famille-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "ma-famille-entrainement-activite",
            "title": "Les possessifs et la famille",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m04-g1",
                "type": "qcm",
                "skillId": "a1-gr-possessifs",
                "difficulty": "A1"
              },
              {
                "id": "m04-g2",
                "type": "texte_a_trous",
                "skillId": "a1-gr-possessifs",
                "difficulty": "A1"
              },
              {
                "id": "m04-g3",
                "type": "association",
                "skillId": "a1-voc-famille",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "ma-famille-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "ma-famille-ecriture-activite",
            "title": "Présenter sa famille",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m04-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "ma-famille-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "ma-famille-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m04-i1",
                "type": "qcm",
                "skillId": "a1-gr-possessifs",
                "difficulty": "A1"
              },
              {
                "id": "m04-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-famille",
                "difficulty": "A1"
              },
              {
                "id": "m04-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-decrire-une-personne",
    "slug": "decrire-une-personne",
    "level": "A1",
    "title": "Décrire une personne",
    "description": "À la fin de ce module, tu peux décrire l'apparence et le caractère de quelqu'un simplement.",
    "objectives": [
      "Décrire le physique d'une personne",
      "Décrire le caractère avec des mots simples",
      "Utiliser les adjectifs au masculin et au féminin"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-vie-quotidienne",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "decrire-une-personne-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "decrire-une-personne-comprendre-activite",
            "title": "Lire un message de description",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m05-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "decrire-une-personne-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "decrire-une-personne-entrainement-activite",
            "title": "Décrire quelqu'un",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m05-g1",
                "type": "qcm",
                "skillId": "a1-voc-description",
                "difficulty": "A1"
              },
              {
                "id": "m05-g2",
                "type": "texte_a_trous",
                "skillId": "a1-voc-description",
                "difficulty": "A1"
              },
              {
                "id": "m05-g3",
                "type": "association",
                "skillId": "a1-voc-description",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "decrire-une-personne-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "decrire-une-personne-ecriture-activite",
            "title": "Décrire quelqu'un par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m05-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "decrire-une-personne-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "decrire-une-personne-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m05-i1",
                "type": "qcm",
                "skillId": "a1-voc-description",
                "difficulty": "A1"
              },
              {
                "id": "m05-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-description",
                "difficulty": "A1"
              },
              {
                "id": "m05-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "a1-vetements-et-couleurs",
    "slug": "vetements-et-couleurs",
    "level": "A1",
    "title": "Vêtements et couleurs",
    "description": "À la fin de ce module, tu peux nommer des vêtements et des couleurs, et décrire une tenue simple.",
    "objectives": [
      "Nommer des vêtements courants",
      "Nommer des couleurs",
      "Décrire ce que porte quelqu'un"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-vie-quotidienne",
    "estimatedMinutes": 16,
    "lessons": [
      {
        "id": "vetements-et-couleurs-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "vetements-et-couleurs-ecoute-activite",
            "title": "Écouter un essayage",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m06-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "vetements-et-couleurs-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "vetements-et-couleurs-entrainement-activite",
            "title": "Vêtements et couleurs",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m06-g1",
                "type": "qcm",
                "skillId": "a1-voc-vetements",
                "difficulty": "A1"
              },
              {
                "id": "m06-g2",
                "type": "texte_a_trous",
                "skillId": "a1-voc-vetements",
                "difficulty": "A1"
              },
              {
                "id": "m06-g3",
                "type": "association",
                "skillId": "a1-voc-vetements",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "vetements-et-couleurs-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "vetements-et-couleurs-ecriture-activite",
            "title": "Décrire une tenue",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m06-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "vetements-et-couleurs-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "vetements-et-couleurs-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m06-i1",
                "type": "qcm",
                "skillId": "a1-voc-vetements",
                "difficulty": "A1"
              },
              {
                "id": "m06-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-vetements",
                "difficulty": "A1"
              },
              {
                "id": "m06-i3",
                "type": "vrai_faux",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "a1-ma-maison",
    "slug": "ma-maison",
    "level": "A1",
    "title": "Ma maison",
    "description": "À la fin de ce module, tu peux décrire ton logement et dire où sont les objets.",
    "objectives": [
      "Nommer les pièces d'un logement",
      "Nommer des objets courants",
      "Utiliser il y a et les prépositions de lieu"
    ],
    "domain": "grammaire",
    "stageId": "a1-vie-quotidienne",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "ma-maison-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "ma-maison-comprendre-activite",
            "title": "Lire la description d'un appartement",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m07-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "ma-maison-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "ma-maison-entrainement-activite",
            "title": "Décrire un logement",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m07-g1",
                "type": "qcm",
                "skillId": "a1-gr-il-y-a-cest",
                "difficulty": "A1"
              },
              {
                "id": "m07-g2",
                "type": "texte_a_trous",
                "skillId": "a1-gr-prepositions-lieu",
                "difficulty": "A1"
              },
              {
                "id": "m07-g3",
                "type": "association",
                "skillId": "a1-voc-maison",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "ma-maison-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "ma-maison-ecriture-activite",
            "title": "Décrire son logement",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m07-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "ma-maison-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "ma-maison-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m07-i1",
                "type": "qcm",
                "skillId": "a1-gr-il-y-a-cest",
                "difficulty": "A1"
              },
              {
                "id": "m07-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-maison",
                "difficulty": "A1"
              },
              {
                "id": "m07-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "a1-jours-et-mois",
    "slug": "jours-et-mois",
    "level": "A1",
    "title": "Les jours et les mois",
    "description": "À la fin de ce module, tu peux donner une date et parler des jours de la semaine.",
    "objectives": [
      "Nommer les jours de la semaine",
      "Nommer les mois de l'année",
      "Donner une date"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-vie-quotidienne",
    "estimatedMinutes": 16,
    "lessons": [
      {
        "id": "jours-et-mois-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "jours-et-mois-ecoute-activite",
            "title": "Écouter les jours de la semaine",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m08-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "jours-et-mois-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "jours-et-mois-entrainement-activite",
            "title": "Jours, mois et dates",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m08-g1",
                "type": "remise_en_ordre",
                "skillId": "a1-voc-temps",
                "difficulty": "A1"
              },
              {
                "id": "m08-g2",
                "type": "qcm",
                "skillId": "a1-voc-temps",
                "difficulty": "A1"
              },
              {
                "id": "m08-g3",
                "type": "texte_a_trous",
                "skillId": "a1-voc-temps",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "jours-et-mois-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "jours-et-mois-ecriture-activite",
            "title": "Donner une date",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m08-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "jours-et-mois-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "jours-et-mois-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m08-i1",
                "type": "qcm",
                "skillId": "a1-voc-temps",
                "difficulty": "A1"
              },
              {
                "id": "m08-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-temps",
                "difficulty": "A1"
              },
              {
                "id": "m08-i3",
                "type": "vrai_faux",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "a1-lheure-et-lemploi-du-temps",
    "slug": "lheure-et-lemploi-du-temps",
    "level": "A1",
    "title": "L'heure et l'emploi du temps",
    "description": "À la fin de ce module, tu peux dire l'heure et parler de ton emploi du temps.",
    "objectives": [
      "Demander et dire l'heure",
      "Parler des horaires d'une activité",
      "Utiliser les verbes en -er pour l'emploi du temps"
    ],
    "domain": "grammaire",
    "stageId": "a1-vie-quotidienne",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "lheure-et-lemploi-du-temps-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "lheure-et-lemploi-du-temps-comprendre-activite",
            "title": "Lire un emploi du temps",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m09-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "lheure-et-lemploi-du-temps-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "lheure-et-lemploi-du-temps-entrainement-activite",
            "title": "Dire l'heure",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m09-g1",
                "type": "qcm",
                "skillId": "a1-voc-nombres",
                "difficulty": "A1"
              },
              {
                "id": "m09-g2",
                "type": "texte_a_trous",
                "skillId": "a1-gr-verbes-er",
                "difficulty": "A1"
              },
              {
                "id": "m09-g3",
                "type": "association",
                "skillId": "a1-voc-temps",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "lheure-et-lemploi-du-temps-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "lheure-et-lemploi-du-temps-ecriture-activite",
            "title": "Décrire son emploi du temps",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m09-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          },
          {
            "id": "lheure-et-lemploi-du-temps-ecriture-activite-orale",
            "title": "Dire l'heure à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m09-h-oral",
                "type": "production_orale",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "lheure-et-lemploi-du-temps-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "lheure-et-lemploi-du-temps-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m09-i1",
                "type": "qcm",
                "skillId": "a1-voc-nombres",
                "difficulty": "A1"
              },
              {
                "id": "m09-i2",
                "type": "reponse_courte",
                "skillId": "a1-gr-verbes-er",
                "difficulty": "A1"
              },
              {
                "id": "m09-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-bilan-intermediaire-1",
    "slug": "bilan-intermediaire-1",
    "level": "A1",
    "title": "Bilan intermédiaire 1",
    "description": "Ce bilan reprend les modules 1 à 9 : se présenter, les nombres, la nationalité, la famille, décrire quelqu'un, la maison, les dates et l'heure.",
    "objectives": [
      "Réutiliser le vocabulaire de l'identité, de la famille et de la maison",
      "Combiner plusieurs informations dans un même dialogue",
      "Vérifier ses acquis avant de continuer"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-vie-quotidienne",
    "estimatedMinutes": 22,
    "lessons": [
      {
        "id": "bilan-intermediaire-1-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-1-comprendre-activite",
            "title": "Lire un dialogue qui combine plusieurs sujets",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "b01-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-intermediaire-1-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-1-entrainement-activite",
            "title": "Réviser identité, famille et maison",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "b01-g1",
                "type": "texte_a_trous",
                "skillId": "a1-gr-etre-avoir",
                "difficulty": "A1"
              },
              {
                "id": "b01-g2",
                "type": "qcm",
                "skillId": "a1-gr-possessifs",
                "difficulty": "A1"
              },
              {
                "id": "b01-g3",
                "type": "association",
                "skillId": "a1-voc-description",
                "difficulty": "A1"
              },
              {
                "id": "b01-g4",
                "type": "remise_en_ordre",
                "skillId": "a1-gr-interrogation",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-intermediaire-1-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-1-ecriture-activite",
            "title": "Se présenter en détail",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "b01-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-se-presenter",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-intermediaire-1-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-1-evaluation-activite",
            "title": "Bilan intermédiaire",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "b01-i1",
                "type": "qcm",
                "skillId": "a1-gr-etre-avoir",
                "difficulty": "A1"
              },
              {
                "id": "b01-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-famille",
                "difficulty": "A1"
              },
              {
                "id": "b01-i3",
                "type": "vrai_faux",
                "skillId": "a1-gr-il-y-a-cest",
                "difficulty": "A1"
              },
              {
                "id": "b01-i4",
                "type": "qcm",
                "skillId": "a1-voc-vetements",
                "difficulty": "A1"
              },
              {
                "id": "b01-i5",
                "type": "reponse_courte",
                "skillId": "a1-voc-temps",
                "difficulty": "A1"
              },
              {
                "id": "b01-i6",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 12
  },
  {
    "id": "a1-en-ville",
    "slug": "en-ville",
    "level": "A1",
    "title": "En ville",
    "description": "À la fin de ce module, tu peux nommer des lieux en ville et demander ton chemin.",
    "objectives": [
      "Nommer des lieux et des commerces",
      "Demander où se trouve un endroit",
      "Comprendre des indications simples"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-sortir-et-bouger",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "en-ville-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "en-ville-comprendre-activite",
            "title": "Lire des indications",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m10-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "en-ville-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "en-ville-ecoute-activite",
            "title": "Écouter une personne qui demande son chemin",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m10-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "en-ville-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "en-ville-entrainement-activite",
            "title": "Se repérer en ville",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m10-g1",
                "type": "texte_a_trous",
                "skillId": "a1-gr-prepositions-lieu",
                "difficulty": "A1"
              },
              {
                "id": "m10-g2",
                "type": "qcm",
                "skillId": "a1-gr-verbes-irreguliers",
                "difficulty": "A1"
              },
              {
                "id": "m10-g3",
                "type": "association",
                "skillId": "a1-voc-ville",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "en-ville-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "en-ville-ecriture-activite",
            "title": "Expliquer un chemin",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m10-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "en-ville-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "en-ville-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m10-i1",
                "type": "qcm",
                "skillId": "a1-gr-prepositions-lieu",
                "difficulty": "A1"
              },
              {
                "id": "m10-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-ville",
                "difficulty": "A1"
              },
              {
                "id": "m10-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-prendre-les-transports",
    "slug": "prendre-les-transports-a1",
    "level": "A1",
    "title": "Prendre les transports",
    "description": "À la fin de ce module, tu peux acheter un billet et comprendre des horaires simples.",
    "objectives": [
      "Nommer les moyens de transport",
      "Acheter un billet",
      "Comprendre une annonce ou un horaire simple"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-sortir-et-bouger",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "prendre-les-transports-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "prendre-les-transports-comprendre-activite",
            "title": "Lire un billet de train",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m11-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "prendre-les-transports-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "prendre-les-transports-ecoute-activite",
            "title": "Écouter une annonce de gare",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m11-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "prendre-les-transports-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "prendre-les-transports-entrainement-activite",
            "title": "Acheter un billet",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m11-g1",
                "type": "qcm",
                "skillId": "a1-gr-verbes-irreguliers",
                "difficulty": "A1"
              },
              {
                "id": "m11-g2",
                "type": "remise_en_ordre",
                "skillId": "a1-gr-interrogation",
                "difficulty": "A1"
              },
              {
                "id": "m11-g3",
                "type": "association",
                "skillId": "a1-voc-transports",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "prendre-les-transports-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "prendre-les-transports-ecriture-activite",
            "title": "Décrire un trajet",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m11-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "prendre-les-transports-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "prendre-les-transports-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m11-i1",
                "type": "qcm",
                "skillId": "a1-gr-verbes-irreguliers",
                "difficulty": "A1"
              },
              {
                "id": "m11-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-transports",
                "difficulty": "A1"
              },
              {
                "id": "m11-i3",
                "type": "vrai_faux",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-au-restaurant-et-au-cafe",
    "slug": "au-restaurant-et-au-cafe",
    "level": "A1",
    "title": "Au restaurant et au café",
    "description": "À la fin de ce module, tu peux commander à manger et à boire, et payer l'addition.",
    "objectives": [
      "Commander au restaurant ou au café",
      "Utiliser des expressions de quantité simples",
      "Demander et payer l'addition"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-sortir-et-bouger",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "au-restaurant-et-au-cafe-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "au-restaurant-et-au-cafe-ecoute-activite",
            "title": "Écouter une commande",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m12-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "au-restaurant-et-au-cafe-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "au-restaurant-et-au-cafe-entrainement-activite",
            "title": "Commander poliment",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m12-g1",
                "type": "qcm",
                "skillId": "a1-gr-quantite",
                "difficulty": "A1"
              },
              {
                "id": "m12-g2",
                "type": "texte_a_trous",
                "skillId": "a1-voc-alimentation",
                "difficulty": "A1"
              },
              {
                "id": "m12-g3",
                "type": "association",
                "skillId": "a1-voc-alimentation",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "au-restaurant-et-au-cafe-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "au-restaurant-et-au-cafe-ecriture-activite",
            "title": "Écrire une commande",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m12-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          },
          {
            "id": "au-restaurant-et-au-cafe-ecriture-activite-orale",
            "title": "Commander à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m12-h-oral",
                "type": "production_orale",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "au-restaurant-et-au-cafe-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "au-restaurant-et-au-cafe-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m12-i1",
                "type": "qcm",
                "skillId": "a1-gr-quantite",
                "difficulty": "A1"
              },
              {
                "id": "m12-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-alimentation",
                "difficulty": "A1"
              },
              {
                "id": "m12-i3",
                "type": "vrai_faux",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-faire-les-courses",
    "slug": "faire-les-courses-a1",
    "level": "A1",
    "title": "Faire les courses",
    "description": "À la fin de ce module, tu peux nommer des aliments et demander une quantité au marché ou au supermarché.",
    "objectives": [
      "Nommer des aliments courants",
      "Demander une quantité précise",
      "Comprendre un prix"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-sortir-et-bouger",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "faire-les-courses-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "faire-les-courses-comprendre-activite",
            "title": "Lire une liste de courses et des prix",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m13-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "faire-les-courses-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "faire-les-courses-entrainement-activite",
            "title": "Acheter des aliments",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m13-g1",
                "type": "qcm",
                "skillId": "a1-gr-verbes-irreguliers",
                "difficulty": "A1"
              },
              {
                "id": "m13-g2",
                "type": "qcm",
                "skillId": "a1-gr-quantite",
                "difficulty": "A1"
              },
              {
                "id": "m13-g3",
                "type": "texte_a_trous",
                "skillId": "a1-voc-alimentation",
                "difficulty": "A1"
              },
              {
                "id": "m13-g4",
                "type": "reponse_courte",
                "skillId": "a1-voc-nombres",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "faire-les-courses-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "faire-les-courses-ecriture-activite",
            "title": "Écrire une liste de courses",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m13-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "faire-les-courses-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "faire-les-courses-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m13-i1",
                "type": "qcm",
                "skillId": "a1-gr-quantite",
                "difficulty": "A1"
              },
              {
                "id": "m13-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-alimentation",
                "difficulty": "A1"
              },
              {
                "id": "m13-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-faire-des-achats",
    "slug": "faire-des-achats-a1",
    "level": "A1",
    "title": "Faire des achats",
    "description": "À la fin de ce module, tu peux demander une taille ou une couleur, et payer un achat.",
    "objectives": [
      "Demander une taille et une couleur",
      "Demander à essayer un vêtement",
      "Payer un achat"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-sortir-et-bouger",
    "estimatedMinutes": 16,
    "lessons": [
      {
        "id": "faire-des-achats-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "faire-des-achats-ecoute-activite",
            "title": "Écouter un achat au marché",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m14-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "faire-des-achats-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "faire-des-achats-entrainement-activite",
            "title": "Demander taille et couleur",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m14-g1",
                "type": "qcm",
                "skillId": "a1-gr-interrogation",
                "difficulty": "A1"
              },
              {
                "id": "m14-g2",
                "type": "texte_a_trous",
                "skillId": "a1-voc-achats",
                "difficulty": "A1"
              },
              {
                "id": "m14-g3",
                "type": "association",
                "skillId": "a1-voc-achats",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "faire-des-achats-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "faire-des-achats-ecriture-activite",
            "title": "Écrire un mini-dialogue d'achat",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m14-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "faire-des-achats-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "faire-des-achats-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m14-i1",
                "type": "qcm",
                "skillId": "a1-voc-achats",
                "difficulty": "A1"
              },
              {
                "id": "m14-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-achats",
                "difficulty": "A1"
              },
              {
                "id": "m14-i3",
                "type": "vrai_faux",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "a1-bilan-intermediaire-2",
    "slug": "bilan-intermediaire-2",
    "level": "A1",
    "title": "Bilan intermédiaire 2",
    "description": "Ce bilan reprend les modules 10 à 14 : la ville, les transports, le restaurant, les courses et les achats.",
    "objectives": [
      "Réutiliser le vocabulaire de la ville, des transports et des achats",
      "Combiner plusieurs informations pratiques dans un même dialogue",
      "Vérifier ses acquis avant de continuer"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-sortir-et-bouger",
    "estimatedMinutes": 22,
    "lessons": [
      {
        "id": "bilan-intermediaire-2-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-2-comprendre-activite",
            "title": "Lire un programme de journée",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "b02-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-intermediaire-2-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-2-entrainement-activite",
            "title": "Réviser ville, transports et achats",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "b02-g1",
                "type": "texte_a_trous",
                "skillId": "a1-gr-prepositions-lieu",
                "difficulty": "A1"
              },
              {
                "id": "b02-g2",
                "type": "qcm",
                "skillId": "a1-gr-verbes-irreguliers",
                "difficulty": "A1"
              },
              {
                "id": "b02-g3",
                "type": "association",
                "skillId": "a1-voc-achats",
                "difficulty": "A1"
              },
              {
                "id": "b02-g4",
                "type": "remise_en_ordre",
                "skillId": "a1-voc-quotidien",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-intermediaire-2-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-2-ecriture-activite",
            "title": "Raconter une sortie",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "b02-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-intermediaire-2-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-2-evaluation-activite",
            "title": "Bilan intermédiaire",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "b02-i1",
                "type": "qcm",
                "skillId": "a1-gr-prepositions-lieu",
                "difficulty": "A1"
              },
              {
                "id": "b02-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-transports",
                "difficulty": "A1"
              },
              {
                "id": "b02-i3",
                "type": "vrai_faux",
                "skillId": "a1-gr-quantite",
                "difficulty": "A1"
              },
              {
                "id": "b02-i4",
                "type": "qcm",
                "skillId": "a1-voc-achats",
                "difficulty": "A1"
              },
              {
                "id": "b02-i5",
                "type": "reponse_courte",
                "skillId": "a1-voc-alimentation",
                "difficulty": "A1"
              },
              {
                "id": "b02-i6",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 12
  },
  {
    "id": "a1-ma-journee",
    "slug": "ma-journee",
    "level": "A1",
    "title": "Ma journée",
    "description": "À la fin de ce module, tu peux décrire ta journée et dire à quelle fréquence tu fais quelque chose.",
    "objectives": [
      "Décrire les activités d'une journée type",
      "Utiliser des verbes pronominaux courants",
      "Exprimer une fréquence (toujours, souvent, parfois, jamais)"
    ],
    "domain": "grammaire",
    "stageId": "a1-quotidien-et-loisirs",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "ma-journee-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "ma-journee-comprendre-activite",
            "title": "Lire une journée type",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m15-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "ma-journee-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "ma-journee-entrainement-activite",
            "title": "Verbes pronominaux et fréquence",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m15-g1",
                "type": "qcm",
                "skillId": "a1-gr-verbes-er",
                "difficulty": "A1"
              },
              {
                "id": "m15-g2",
                "type": "texte_a_trous",
                "skillId": "a1-gr-negation",
                "difficulty": "A1"
              },
              {
                "id": "m15-g3",
                "type": "remise_en_ordre",
                "skillId": "a1-voc-quotidien",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "ma-journee-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "ma-journee-ecriture-activite",
            "title": "Décrire sa journée",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m15-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "ma-journee-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "ma-journee-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m15-i1",
                "type": "qcm",
                "skillId": "a1-gr-verbes-er",
                "difficulty": "A1"
              },
              {
                "id": "m15-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-quotidien",
                "difficulty": "A1"
              },
              {
                "id": "m15-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "a1-mes-loisirs",
    "slug": "mes-loisirs",
    "level": "A1",
    "title": "Mes loisirs",
    "description": "À la fin de ce module, tu peux parler de tes loisirs et dire ce que tu aimes ou n'aimes pas.",
    "objectives": [
      "Nommer des loisirs et des sports",
      "Exprimer un goût (aimer, adorer, détester, préférer)",
      "Parler d'une sortie du week-end"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-quotidien-et-loisirs",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "mes-loisirs-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "mes-loisirs-ecoute-activite",
            "title": "Écouter une discussion sur le week-end",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m16-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "mes-loisirs-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "mes-loisirs-entrainement-activite",
            "title": "Parler de ses goûts",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m16-g1",
                "type": "qcm",
                "skillId": "a1-gr-verbes-er",
                "difficulty": "A1"
              },
              {
                "id": "m16-g2",
                "type": "association",
                "skillId": "a1-voc-loisirs",
                "difficulty": "A1"
              },
              {
                "id": "m16-g3",
                "type": "vrai_faux",
                "skillId": "a1-voc-loisirs",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "mes-loisirs-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "mes-loisirs-ecriture-activite",
            "title": "Parler de ses loisirs",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m16-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          },
          {
            "id": "mes-loisirs-ecriture-activite-orale",
            "title": "Parler de ses loisirs à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m16-h-oral",
                "type": "production_orale",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "mes-loisirs-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "mes-loisirs-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m16-i1",
                "type": "qcm",
                "skillId": "a1-gr-verbes-er",
                "difficulty": "A1"
              },
              {
                "id": "m16-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-loisirs",
                "difficulty": "A1"
              },
              {
                "id": "m16-i3",
                "type": "vrai_faux",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-travail-et-etudes",
    "slug": "travail-et-etudes",
    "level": "A1",
    "title": "Le travail et les études",
    "description": "À la fin de ce module, tu peux dire ta profession, où tu travailles ou étudies.",
    "objectives": [
      "Dire sa profession",
      "Dire où on travaille ou étudie",
      "Utiliser le futur proche pour un projet professionnel simple"
    ],
    "domain": "grammaire",
    "stageId": "a1-quotidien-et-loisirs",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "travail-et-etudes-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "travail-et-etudes-comprendre-activite",
            "title": "Lire une présentation professionnelle",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m17-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "travail-et-etudes-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "travail-et-etudes-entrainement-activite",
            "title": "Parler de son travail",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m17-g1",
                "type": "qcm",
                "skillId": "a1-gr-futur-proche",
                "difficulty": "A1"
              },
              {
                "id": "m17-g2",
                "type": "texte_a_trous",
                "skillId": "a1-voc-travail-etudes",
                "difficulty": "A1"
              },
              {
                "id": "m17-g3",
                "type": "association",
                "skillId": "a1-voc-travail-etudes",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "travail-et-etudes-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "travail-et-etudes-ecriture-activite",
            "title": "Se présenter professionnellement",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m17-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-se-presenter",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "travail-et-etudes-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "travail-et-etudes-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m17-i1",
                "type": "qcm",
                "skillId": "a1-gr-futur-proche",
                "difficulty": "A1"
              },
              {
                "id": "m17-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-travail-etudes",
                "difficulty": "A1"
              },
              {
                "id": "m17-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "a1-la-sante",
    "slug": "la-sante",
    "level": "A1",
    "title": "La santé",
    "description": "À la fin de ce module, tu peux nommer des parties du corps et dire que tu as mal.",
    "objectives": [
      "Nommer les parties du corps les plus courantes",
      "Dire qu'on a mal",
      "Comprendre une recommandation simple du médecin ou du pharmacien"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-quotidien-et-loisirs",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "la-sante-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "la-sante-ecoute-activite",
            "title": "Écouter une visite à la pharmacie",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m18-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "la-sante-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "la-sante-entrainement-activite",
            "title": "Dire qu'on a mal",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m18-g1",
                "type": "qcm",
                "skillId": "a1-gr-prepositions-lieu",
                "difficulty": "A1"
              },
              {
                "id": "m18-g2",
                "type": "association",
                "skillId": "a1-voc-sante",
                "difficulty": "A1"
              },
              {
                "id": "m18-g3",
                "type": "texte_a_trous",
                "skillId": "a1-gr-imperatif",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "la-sante-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "la-sante-ecriture-activite",
            "title": "Expliquer un problème de santé",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m18-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "la-sante-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "la-sante-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m18-i1",
                "type": "qcm",
                "skillId": "a1-gr-prepositions-lieu",
                "difficulty": "A1"
              },
              {
                "id": "m18-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-sante",
                "difficulty": "A1"
              },
              {
                "id": "m18-i3",
                "type": "vrai_faux",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "a1-le-temps-quil-fait",
    "slug": "le-temps-quil-fait",
    "level": "A1",
    "title": "Le temps qu'il fait",
    "description": "À la fin de ce module, tu peux parler du temps qu'il fait et proposer une tenue adaptée.",
    "objectives": [
      "Décrire le temps qu'il fait",
      "Donner une température simple",
      "Proposer une tenue adaptée à la météo"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-quotidien-et-loisirs",
    "estimatedMinutes": 15,
    "lessons": [
      {
        "id": "le-temps-quil-fait-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "le-temps-quil-fait-comprendre-activite",
            "title": "Lire un bulletin météo",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m19-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "le-temps-quil-fait-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "le-temps-quil-fait-entrainement-activite",
            "title": "Décrire le temps et s'habiller",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m19-g1",
                "type": "qcm",
                "skillId": "a1-voc-meteo",
                "difficulty": "A1"
              },
              {
                "id": "m19-g2",
                "type": "texte_a_trous",
                "skillId": "a1-voc-meteo",
                "difficulty": "A1"
              },
              {
                "id": "m19-g3",
                "type": "association",
                "skillId": "a1-voc-meteo",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "le-temps-quil-fait-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "le-temps-quil-fait-ecriture-activite",
            "title": "Décrire la météo",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m19-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "le-temps-quil-fait-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "le-temps-quil-fait-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m19-i1",
                "type": "qcm",
                "skillId": "a1-voc-meteo",
                "difficulty": "A1"
              },
              {
                "id": "m19-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-meteo",
                "difficulty": "A1"
              },
              {
                "id": "m19-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "a1-proposer-un-rendez-vous",
    "slug": "proposer-un-rendez-vous",
    "level": "A1",
    "title": "Proposer un rendez-vous",
    "description": "À la fin de ce module, tu peux proposer, accepter ou refuser un rendez-vous.",
    "objectives": [
      "Proposer un rendez-vous (jour, heure, lieu)",
      "Accepter ou refuser poliment",
      "Confirmer les détails d'un rendez-vous"
    ],
    "domain": "grammaire",
    "stageId": "a1-quotidien-et-loisirs",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "proposer-un-rendez-vous-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "proposer-un-rendez-vous-comprendre-activite",
            "title": "Lire un échange de messages",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m20-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "proposer-un-rendez-vous-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "proposer-un-rendez-vous-entrainement-activite",
            "title": "Proposer et répondre",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m20-g1",
                "type": "qcm",
                "skillId": "a1-gr-interrogation",
                "difficulty": "A1"
              },
              {
                "id": "m20-g2",
                "type": "association",
                "skillId": "a1-voc-invitations",
                "difficulty": "A1"
              },
              {
                "id": "m20-g3",
                "type": "texte_a_trous",
                "skillId": "a1-voc-invitations",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "proposer-un-rendez-vous-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "proposer-un-rendez-vous-ecriture-activite",
            "title": "Écrire un échange de messages",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m20-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          },
          {
            "id": "proposer-un-rendez-vous-ecriture-activite-orale",
            "title": "Proposer un rendez-vous à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m20-h-oral",
                "type": "production_orale",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "proposer-un-rendez-vous-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "proposer-un-rendez-vous-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m20-i1",
                "type": "qcm",
                "skillId": "a1-gr-interrogation",
                "difficulty": "A1"
              },
              {
                "id": "m20-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-invitations",
                "difficulty": "A1"
              },
              {
                "id": "m20-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a1-bilan-intermediaire-3",
    "slug": "bilan-intermediaire-3",
    "level": "A1",
    "title": "Bilan intermédiaire 3",
    "description": "Ce bilan reprend les modules 15 à 20 : la journée type, les loisirs, le travail, la santé, la météo et les rendez-vous.",
    "objectives": [
      "Réutiliser le vocabulaire du quotidien, du travail et des loisirs",
      "Combiner plusieurs informations dans une situation complète",
      "Vérifier ses acquis avant l'entraînement final"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-quotidien-et-loisirs",
    "estimatedMinutes": 22,
    "lessons": [
      {
        "id": "bilan-intermediaire-3-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-3-comprendre-activite",
            "title": "Lire un message sur la semaine",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "b03-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-intermediaire-3-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-3-entrainement-activite",
            "title": "Réviser quotidien, travail et santé",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "b03-g1",
                "type": "texte_a_trous",
                "skillId": "a1-gr-futur-proche",
                "difficulty": "A1"
              },
              {
                "id": "b03-g2",
                "type": "qcm",
                "skillId": "a1-gr-prepositions-lieu",
                "difficulty": "A1"
              },
              {
                "id": "b03-g3",
                "type": "association",
                "skillId": "a1-voc-loisirs",
                "difficulty": "A1"
              },
              {
                "id": "b03-g4",
                "type": "remise_en_ordre",
                "skillId": "a1-voc-quotidien",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-intermediaire-3-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-3-ecriture-activite",
            "title": "Raconter sa semaine",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "b03-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-message-simple",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-intermediaire-3-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "bilan-intermediaire-3-evaluation-activite",
            "title": "Bilan intermédiaire",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "b03-i1",
                "type": "qcm",
                "skillId": "a1-gr-futur-proche",
                "difficulty": "A1"
              },
              {
                "id": "b03-i2",
                "type": "reponse_courte",
                "skillId": "a1-voc-quotidien",
                "difficulty": "A1"
              },
              {
                "id": "b03-i3",
                "type": "vrai_faux",
                "skillId": "a1-voc-sante",
                "difficulty": "A1"
              },
              {
                "id": "b03-i4",
                "type": "qcm",
                "skillId": "a1-voc-loisirs",
                "difficulty": "A1"
              },
              {
                "id": "b03-i5",
                "type": "reponse_courte",
                "skillId": "a1-voc-invitations",
                "difficulty": "A1"
              },
              {
                "id": "b03-i6",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 12
  },
  {
    "id": "a1-entrainement-comprehension",
    "slug": "entrainement-comprehension-delf-a1",
    "level": "A1",
    "title": "S'entraîner : compréhension façon DELF A1",
    "description": "À la fin de ce module, tu es capable de traiter des documents courts en compréhension écrite et orale, dans un format proche du DELF A1.",
    "objectives": [
      "Comprendre un document écrit court et informatif",
      "Comprendre une annonce orale courte",
      "Repérer rapidement les informations essentielles (qui, quoi, où, quand)"
    ],
    "domain": "comprehension_ecrite",
    "stageId": "a1-preparation-examen",
    "estimatedMinutes": 25,
    "lessons": [
      {
        "id": "entrainement-comprehension-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "entrainement-comprehension-comprendre-activite-1",
            "title": "Document 1 : une petite annonce",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m21-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              }
            ]
          },
          {
            "id": "entrainement-comprehension-comprendre-activite-2",
            "title": "Document 2 : un message court",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m21-e2",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "entrainement-comprehension-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "entrainement-comprehension-ecoute-activite",
            "title": "Document 3 : une annonce orale",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "m21-f1",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "m21-f2",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "entrainement-comprehension-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "entrainement-comprehension-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m21-i1",
                "type": "qcm",
                "skillId": "a1-ce-panneaux-annonces",
                "difficulty": "A1"
              },
              {
                "id": "m21-i2",
                "type": "reponse_courte",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              },
              {
                "id": "m21-i3",
                "type": "vrai_faux",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 7
  },
  {
    "id": "a1-entrainement-production",
    "slug": "entrainement-production-delf-a1",
    "level": "A1",
    "title": "S'entraîner : production façon DELF A1",
    "description": "À la fin de ce module, tu es capable de rédiger un message court et de te présenter à l'oral, dans un format proche du DELF A1.",
    "objectives": [
      "Rédiger un message ou une fiche de présentation courte",
      "Répondre à des questions personnelles à l'oral",
      "Réutiliser le vocabulaire et la grammaire des étapes précédentes"
    ],
    "domain": "production_ecrite",
    "stageId": "a1-preparation-examen",
    "estimatedMinutes": 25,
    "lessons": [
      {
        "id": "entrainement-production-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "entrainement-production-entrainement-activite",
            "title": "Réviser avant de produire",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m22-g1",
                "type": "qcm",
                "skillId": "a1-gr-etre-avoir",
                "difficulty": "A1"
              },
              {
                "id": "m22-g2",
                "type": "association",
                "skillId": "a1-voc-identite",
                "difficulty": "A1"
              },
              {
                "id": "m22-g3",
                "type": "remise_en_ordre",
                "skillId": "a1-gr-interrogation",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "entrainement-production-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "entrainement-production-ecriture-activite",
            "title": "Rédiger une fiche de présentation",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m22-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-se-presenter",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "entrainement-production-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "entrainement-production-evaluation-activite",
            "title": "Entretien dirigé",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m22-i-oral",
                "type": "production_orale",
                "skillId": "a1-pe-se-presenter",
                "difficulty": "A1"
              },
              {
                "id": "m22-i2",
                "type": "reponse_courte",
                "skillId": "a1-exam-delf-a1",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 6
  },
  {
    "id": "a1-bilan-final",
    "slug": "bilan-a1",
    "level": "A1",
    "title": "Bilan A1 : je fais le point",
    "description": "Dernier module du parcours A1 : une situation complète qui combine identité, quotidien, ville et projets, pour vérifier ton autonomie avant de continuer vers le A2.",
    "objectives": [
      "Comprendre un message qui combine plusieurs sujets A1",
      "Réutiliser le vocabulaire et la grammaire de tout le parcours A1",
      "Identifier ce qui est acquis et ce qu'il reste à consolider"
    ],
    "domain": "vocabulaire",
    "stageId": "a1-bilan",
    "estimatedMinutes": 25,
    "lessons": [
      {
        "id": "bilan-final-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "bilan-final-comprendre-activite",
            "title": "Lire une lettre complète",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "m23-e1",
                "type": "comprehension_ecrite",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-final-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "bilan-final-entrainement-activite",
            "title": "Réviser tout le parcours A1",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "m23-g1",
                "type": "texte_a_trous",
                "skillId": "a1-gr-verbes-er",
                "difficulty": "A1"
              },
              {
                "id": "m23-g2",
                "type": "qcm",
                "skillId": "a1-gr-futur-proche",
                "difficulty": "A1"
              },
              {
                "id": "m23-g3",
                "type": "association",
                "skillId": "a1-voc-quotidien",
                "difficulty": "A1"
              },
              {
                "id": "m23-g4",
                "type": "vrai_faux",
                "skillId": "a1-gr-negation",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-final-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "bilan-final-ecriture-activite",
            "title": "Écrire sa propre lettre",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m23-h",
                "type": "production_ecrite",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          },
          {
            "id": "bilan-final-ecriture-activite-orale",
            "title": "Se raconter à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "m23-h-oral",
                "type": "production_orale",
                "skillId": "a1-pe-decrire",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-final-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "bilan-final-evaluation-activite",
            "title": "Bilan de fin de parcours A1",
            "skillDomain": "vocabulaire",
            "exercises": [
              {
                "id": "m23-i1",
                "type": "qcm",
                "skillId": "a1-gr-etre-avoir",
                "difficulty": "A1"
              },
              {
                "id": "m23-i2",
                "type": "reponse_courte",
                "skillId": "a1-gr-il-y-a-cest",
                "difficulty": "A1"
              },
              {
                "id": "m23-i3",
                "type": "vrai_faux",
                "skillId": "a1-ce-messages-simples",
                "difficulty": "A1"
              },
              {
                "id": "m23-i4",
                "type": "qcm",
                "skillId": "a1-gr-futur-proche",
                "difficulty": "A1"
              },
              {
                "id": "m23-i5",
                "type": "reponse_courte",
                "skillId": "a1-voc-loisirs",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 12
  },
  {
    "id": "a1-banque-ecoute",
    "slug": "banque-ecoute-a1",
    "level": "A1",
    "title": "Banque d'écoute A1",
    "description": "Un ensemble libre de 51 pistes audio supplémentaires pour t'entraîner à l'écoute, classées par thème. Ce module est optionnel : il n'est pas nécessaire de le terminer pour progresser dans le parcours A1.",
    "objectives": [
      "S'entraîner à la compréhension orale sur des situations variées du quotidien",
      "Élargir l'exposition à des voix et des débits différents"
    ],
    "domain": "comprehension_orale",
    "stageId": "a1-bilan",
    "estimatedMinutes": 38,
    "lessons": [
      {
        "id": "banque-a1-salutations",
        "type": "ecoute",
        "title": "Écoute libre : salutations",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-salutations-activite",
            "title": "Salutations",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-salutations-bonjour-matin",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-salutations-se-presenter",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-salutations-comment-ca-va",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-salutations-au-revoir",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-presentations",
        "type": "ecoute",
        "title": "Écoute libre : présentations",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-presentations-activite",
            "title": "Présentations",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-presentations-nationalite",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-presentations-profession",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-presentations-etudiant",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-nombres-telephone",
        "type": "ecoute",
        "title": "Écoute libre : nombres et téléphone",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-nombres-telephone-activite",
            "title": "Nombres et téléphone",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-nombres-compter-dix",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-nombres-numero-telephone",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-nombres-code-porte",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-nombres-repondeur-numero",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-dates-heures",
        "type": "ecoute",
        "title": "Écoute libre : dates et heures",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-dates-heures-activite",
            "title": "Dates et heures",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-dates-quelle-heure",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-dates-anniversaire",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-prix-achats",
        "type": "ecoute",
        "title": "Écoute libre : prix et achats",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-prix-achats-activite",
            "title": "Prix et achats",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-prix-a-la-boulangerie",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-prix-caisse-supermarche",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-famille",
        "type": "ecoute",
        "title": "Écoute libre : famille",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-famille-activite",
            "title": "Famille",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-famille-mamie-papi",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-famille-combien-enfants",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-famille-reunion-dimanche",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-description",
        "type": "ecoute",
        "title": "Écoute libre : descriptions",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-description-activite",
            "title": "Descriptions",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-description-physique-ami",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-description-personnalite",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-description-vetements-aujourdhui",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-cafe-restaurant",
        "type": "ecoute",
        "title": "Écoute libre : café et restaurant",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-cafe-restaurant-activite",
            "title": "Café et restaurant",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-cafe-serveur-question",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-cafe-restaurant-menu",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-petites-annonces",
        "type": "ecoute",
        "title": "Écoute libre : petites annonces",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-petites-annonces-activite",
            "title": "Petites annonces",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-annonce-appartement-a-louer",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-annonce-recherche-colocataire",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-annonce-objet-a-vendre",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-directions",
        "type": "ecoute",
        "title": "Écoute libre : directions",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-directions-activite",
            "title": "Directions",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-directions-tout-droit",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-directions-metro-changement",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-directions-pharmacie-proche",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-transports",
        "type": "ecoute",
        "title": "Écoute libre : transports",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-transports-activite",
            "title": "Transports",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-transports-bus-horaire",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-meteo",
        "type": "ecoute",
        "title": "Écoute libre : météo",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-meteo-activite",
            "title": "Météo",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-meteo-aujourdhui",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-meteo-semaine",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-meteo-dialogue-sortie",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-quotidien-loisirs",
        "type": "ecoute",
        "title": "Écoute libre : quotidien et loisirs",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-quotidien-loisirs-activite",
            "title": "Quotidien et loisirs",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-quotidien-routine-matin",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-quotidien-loisirs-preferes",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-quotidien-sport",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-quotidien-recit-samedi",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-rendez-vous",
        "type": "ecoute",
        "title": "Écoute libre : rendez-vous",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-rendez-vous-activite",
            "title": "Rendez-vous",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-rdv-rejoindre-un-ami",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-rdv-annuler-rendez-vous",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-rdv-coiffeur",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-messages-vocaux",
        "type": "ecoute",
        "title": "Écoute libre : messages vocaux",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-messages-vocaux-activite",
            "title": "Messages vocaux",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-message-absence-bureau",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-message-ami-retard",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-message-rappel-rdv",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-message-invitation-anniversaire",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-consignes",
        "type": "ecoute",
        "title": "Écoute libre : consignes",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-consignes-activite",
            "title": "Consignes",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-consigne-salle-classe",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-consigne-exercice-ecrit",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-consigne-securite-avion",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a1-bilan",
        "type": "evaluation",
        "title": "Écoute libre : bilan",
        "optional": true,
        "activities": [
          {
            "id": "banque-a1-bilan-activite",
            "title": "Bilan",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a1-bilan-message-nouvel-appartement",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-bilan-dialogue-agence-voyage",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              },
              {
                "id": "a1-bilan-annonce-gare-complete",
                "type": "comprehension_orale",
                "skillId": "a1-co-annonces-simples",
                "difficulty": "A1"
              },
              {
                "id": "a1-bilan-conversation-nouvelle-vie",
                "type": "comprehension_orale",
                "skillId": "a1-co-dialogues-quotidiens",
                "difficulty": "A1"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 51
  },
  {
    "id": "a2-se-presenter-en-detail",
    "slug": "se-presenter-en-detail",
    "level": "A2",
    "title": "Se présenter en détail",
    "description": "À la fin de ce module, tu pourras te présenter en donnant ton origine, ta situation actuelle et depuis combien de temps tu es là où tu es.",
    "objectives": [
      "Donner des informations détaillées sur soi (origine, situation, durée)",
      "Utiliser depuis et il y a pour situer une information dans le temps",
      "Comprendre la présentation de quelqu'un d'autre"
    ],
    "domain": "grammaire",
    "stageId": "a2-debut",
    "estimatedMinutes": 22,
    "lessons": [
      {
        "id": "sped-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "sped-comprendre-activite",
            "title": "Lire un message de présentation",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "sped-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "sped-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "sped-entrainement-activite",
            "title": "Se présenter avec depuis et il y a",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "sped-g1",
                "type": "qcm",
                "skillId": "a2-gr-expressions-temporelles",
                "difficulty": "A2"
              },
              {
                "id": "sped-g2",
                "type": "texte_a_trous",
                "skillId": "a2-gr-present-verbes-frequents",
                "difficulty": "A2"
              },
              {
                "id": "sped-g3",
                "type": "association",
                "skillId": "a2-voc-identite",
                "difficulty": "A2"
              },
              {
                "id": "sped-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-expressions-temporelles",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "sped-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "sped-ecriture-activite",
            "title": "Se présenter par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "sped-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-se-presenter",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "sped-ecriture-activite-orale",
            "title": "Se présenter à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "sped-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-se-presenter",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "sped-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "sped-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "sped-i1",
                "type": "qcm",
                "skillId": "a2-gr-expressions-temporelles",
                "difficulty": "A2"
              },
              {
                "id": "sped-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-identite",
                "difficulty": "A2"
              },
              {
                "id": "sped-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-parler-de-sa-famille",
    "slug": "parler-de-sa-famille",
    "level": "A2",
    "title": "Parler de sa famille et de ses relations",
    "description": "À la fin de ce module, tu pourras décrire ta famille et parler de tes relations avec quelques détails.",
    "objectives": [
      "Présenter les membres de sa famille",
      "Utiliser les adjectifs possessifs",
      "Décrire une relation avec un verbe pronominal"
    ],
    "domain": "vocabulaire",
    "stageId": "a2-debut",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "fam-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "fam-comprendre-activite",
            "title": "Lire un message sur la famille",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "fam-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "fam-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "fam-entrainement-activite",
            "title": "Possessifs et verbes pronominaux",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "fam-g1",
                "type": "texte_a_trous",
                "skillId": "a2-gr-possessifs",
                "difficulty": "A2"
              },
              {
                "id": "fam-g2",
                "type": "qcm",
                "skillId": "a2-gr-pronominaux",
                "difficulty": "A2"
              },
              {
                "id": "fam-g3",
                "type": "association",
                "skillId": "a2-voc-famille",
                "difficulty": "A2"
              },
              {
                "id": "fam-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-possessifs",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "fam-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "fam-ecriture-activite",
            "title": "Décrire sa famille par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "fam-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "fam-ecriture-activite-orale",
            "title": "Décrire sa famille à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "fam-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "fam-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "fam-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "fam-i1",
                "type": "qcm",
                "skillId": "a2-gr-possessifs",
                "difficulty": "A2"
              },
              {
                "id": "fam-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-famille",
                "difficulty": "A2"
              },
              {
                "id": "fam-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-decrire-son-quotidien",
    "slug": "decrire-son-quotidien",
    "level": "A2",
    "title": "Décrire son quotidien",
    "description": "À la fin de ce module, tu pourras décrire ta routine et l'organisation de ton quotidien.",
    "objectives": [
      "Décrire une routine avec des adverbes de fréquence",
      "Utiliser les verbes pronominaux de la routine",
      "Comprendre un dialogue sur l'organisation des tâches"
    ],
    "domain": "vocabulaire",
    "stageId": "a2-debut",
    "estimatedMinutes": 24,
    "lessons": [
      {
        "id": "quot-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "quot-ecoute-activite",
            "title": "Écouter Léa et Nora un matin",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "quot-o",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "quot-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "quot-entrainement-activite",
            "title": "Fréquence et routine",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "quot-g1",
                "type": "qcm",
                "skillId": "a2-gr-pronominaux",
                "difficulty": "A2"
              },
              {
                "id": "quot-g2",
                "type": "texte_a_trous",
                "skillId": "a2-gr-adverbes-frequence",
                "difficulty": "A2"
              },
              {
                "id": "quot-g3",
                "type": "remise_en_ordre",
                "skillId": "a2-voc-quotidien",
                "difficulty": "A2"
              },
              {
                "id": "quot-g4",
                "type": "association",
                "skillId": "a2-voc-quotidien",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "quot-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "quot-ecriture-activite",
            "title": "Décrire sa routine par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "quot-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "quot-ecriture-activite-orale",
            "title": "Décrire sa routine à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "quot-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "quot-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "quot-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "quot-i1",
                "type": "qcm",
                "skillId": "a2-gr-pronominaux",
                "difficulty": "A2"
              },
              {
                "id": "quot-i2",
                "type": "reponse_courte",
                "skillId": "a2-gr-adverbes-frequence",
                "difficulty": "A2"
              },
              {
                "id": "quot-i3",
                "type": "vrai_faux",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-chercher-un-logement",
    "slug": "chercher-un-logement-a2",
    "level": "A2",
    "title": "Chercher un logement",
    "description": "À la fin de ce module, tu pourras comprendre une annonce immobilière et comparer deux logements.",
    "objectives": [
      "Comprendre une petite annonce immobilière",
      "Comparer deux logements",
      "Décrire le logement que tu recherches"
    ],
    "domain": "comprehension_ecrite",
    "stageId": "a2-debut",
    "estimatedMinutes": 22,
    "lessons": [
      {
        "id": "a2-log-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "a2-log-comprendre-activite",
            "title": "Comparer deux annonces",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "a2-log-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-annonces",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-log-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "a2-log-entrainement-activite",
            "title": "Comparer et décrire un logement",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "a2-log-g1",
                "type": "qcm",
                "skillId": "a2-gr-comparatif",
                "difficulty": "A2"
              },
              {
                "id": "a2-log-g2",
                "type": "texte_a_trous",
                "skillId": "a2-gr-relatifs-qui-que",
                "difficulty": "A2"
              },
              {
                "id": "a2-log-g3",
                "type": "association",
                "skillId": "a2-voc-logement",
                "difficulty": "A2"
              },
              {
                "id": "a2-log-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-comparatif",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-log-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "a2-log-ecriture-activite",
            "title": "Décrire le logement recherché",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "a2-log-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "a2-log-ecriture-activite-orale",
            "title": "Comparer deux logements à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "a2-log-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-log-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "a2-log-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "a2-log-i1",
                "type": "qcm",
                "skillId": "a2-gr-relatifs-qui-que",
                "difficulty": "A2"
              },
              {
                "id": "a2-log-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-logement",
                "difficulty": "A2"
              },
              {
                "id": "a2-log-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-annonces",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-decrire-son-logement-et-un-probleme",
    "slug": "decrire-son-logement-et-un-probleme",
    "level": "A2",
    "title": "Décrire son logement et signaler un problème",
    "description": "À la fin de ce module, tu pourras signaler un problème de logement et en expliquer la cause.",
    "objectives": [
      "Décrire un équipement en panne",
      "Expliquer un problème et sa cause",
      "Demander une réparation par téléphone"
    ],
    "domain": "comprehension_orale",
    "stageId": "a2-debut",
    "estimatedMinutes": 24,
    "lessons": [
      {
        "id": "logp-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "logp-ecoute-activite",
            "title": "Écouter un appel à la plombière",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "logp-o",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "logp-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "logp-entrainement-activite",
            "title": "Signaler un problème",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "logp-g1",
                "type": "texte_a_trous",
                "skillId": "a2-gr-passe-compose",
                "difficulty": "A2"
              },
              {
                "id": "logp-g2",
                "type": "qcm",
                "skillId": "a2-gr-cause-simple",
                "difficulty": "A2"
              },
              {
                "id": "logp-g3",
                "type": "qcm",
                "skillId": "a2-gr-consequence-simple",
                "difficulty": "A2"
              },
              {
                "id": "logp-g4",
                "type": "association",
                "skillId": "a2-voc-voisinage",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "logp-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "logp-ecriture-activite",
            "title": "Signaler un problème par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "logp-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-demander-information",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "logp-ecriture-activite-orale",
            "title": "Signaler un problème à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "logp-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-demander-information",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "logp-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "logp-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "logp-i1",
                "type": "qcm",
                "skillId": "a2-gr-passe-compose",
                "difficulty": "A2"
              },
              {
                "id": "logp-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-voisinage",
                "difficulty": "A2"
              },
              {
                "id": "logp-i3",
                "type": "vrai_faux",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-faire-les-courses",
    "slug": "faire-les-courses-a2",
    "level": "A2",
    "title": "Faire les courses",
    "description": "À la fin de ce module, tu pourras comparer des produits, exprimer une quantité et demander conseil au supermarché.",
    "objectives": [
      "Comparer deux produits",
      "Exprimer une quantité avec les partitifs",
      "Demander conseil à un vendeur"
    ],
    "domain": "vocabulaire",
    "stageId": "a2-debut",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "cours-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "cours-comprendre-activite",
            "title": "Lire une affiche de promotion",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "cours-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-annonces",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "cours-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "cours-entrainement-activite",
            "title": "Comparer et quantifier",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "cours-g1",
                "type": "texte_a_trous",
                "skillId": "a2-gr-quantite-partitifs",
                "difficulty": "A2"
              },
              {
                "id": "cours-g2",
                "type": "qcm",
                "skillId": "a2-gr-comparatif",
                "difficulty": "A2"
              },
              {
                "id": "cours-g3",
                "type": "vrai_faux",
                "skillId": "a2-gr-quantite-partitifs",
                "difficulty": "A2"
              },
              {
                "id": "cours-g4",
                "type": "association",
                "skillId": "a2-voc-achats",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "cours-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "cours-ecriture-activite",
            "title": "Demander conseil par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "cours-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-demander-information",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "cours-ecriture-activite-orale",
            "title": "Demander conseil à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "cours-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-demander-information",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "cours-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "cours-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "cours-i1",
                "type": "qcm",
                "skillId": "a2-gr-quantite-partitifs",
                "difficulty": "A2"
              },
              {
                "id": "cours-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-achats",
                "difficulty": "A2"
              },
              {
                "id": "cours-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-annonces",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-se-reperer-en-ville",
    "slug": "se-reperer-en-ville",
    "level": "A2",
    "title": "Se repérer en ville et utiliser les services",
    "description": "À la fin de ce module, tu pourras demander et comprendre un chemin, et utiliser un service simple comme la poste ou la banque.",
    "objectives": [
      "Comprendre des indications pour se repérer en ville",
      "Donner une instruction avec l'impératif",
      "Utiliser un pronom pour éviter une répétition"
    ],
    "domain": "comprehension_orale",
    "stageId": "a2-debut",
    "estimatedMinutes": 24,
    "lessons": [
      {
        "id": "ville-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "ville-ecoute-activite",
            "title": "Écouter une demande d'itinéraire en ville",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "ville-o",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "ville-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "ville-entrainement-activite",
            "title": "Donner des indications et utiliser un pronom",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "ville-g1",
                "type": "texte_a_trous",
                "skillId": "a2-gr-imperatif",
                "difficulty": "A2"
              },
              {
                "id": "ville-g2",
                "type": "qcm",
                "skillId": "a2-gr-pronoms-cod",
                "difficulty": "A2"
              },
              {
                "id": "ville-g3",
                "type": "association",
                "skillId": "a2-voc-ville-services",
                "difficulty": "A2"
              },
              {
                "id": "ville-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-pronoms-cod",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "ville-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "ville-ecriture-activite",
            "title": "Donner des indications par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "ville-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-demander-information",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "ville-ecriture-activite-orale",
            "title": "Demander son chemin à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "ville-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-demander-information",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "ville-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "ville-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "ville-i1",
                "type": "qcm",
                "skillId": "a2-gr-imperatif",
                "difficulty": "A2"
              },
              {
                "id": "ville-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-ville-services",
                "difficulty": "A2"
              },
              {
                "id": "ville-i3",
                "type": "vrai_faux",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-parler-de-ses-gouts-et-loisirs",
    "slug": "parler-de-ses-gouts-et-loisirs",
    "level": "A2",
    "title": "Parler de ses goûts et de ses loisirs",
    "description": "À la fin de ce module, tu pourras parler de tes loisirs préférés et exprimer une préférence claire.",
    "objectives": [
      "Parler de ses loisirs préférés",
      "Exprimer un degré maximal avec le superlatif",
      "Comparer deux loisirs avec une fréquence"
    ],
    "domain": "vocabulaire",
    "stageId": "a2-debut",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "gout-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "gout-comprendre-activite",
            "title": "Lire un commentaire sur les loisirs",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "gout-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-recits-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "gout-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "gout-entrainement-activite",
            "title": "Superlatif et fréquence",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "gout-g1",
                "type": "qcm",
                "skillId": "a2-gr-superlatif-simple",
                "difficulty": "A2"
              },
              {
                "id": "gout-g2",
                "type": "association",
                "skillId": "a2-voc-loisirs-gouts",
                "difficulty": "A2"
              },
              {
                "id": "gout-g3",
                "type": "vrai_faux",
                "skillId": "a2-gr-adverbes-frequence",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "gout-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "gout-ecriture-activite",
            "title": "Parler de ses loisirs par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "gout-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "gout-ecriture-activite-orale",
            "title": "Parler de ses loisirs à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "gout-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "gout-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "gout-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "gout-i1",
                "type": "qcm",
                "skillId": "a2-gr-superlatif-simple",
                "difficulty": "A2"
              },
              {
                "id": "gout-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-loisirs-gouts",
                "difficulty": "A2"
              },
              {
                "id": "gout-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-recits-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a2-prendre-les-transports",
    "slug": "prendre-les-transports-a2",
    "level": "A2",
    "title": "Prendre les transports",
    "description": "À la fin de ce module, tu pourras comprendre une annonce dans une gare et expliquer ton trajet à quelqu'un.",
    "objectives": [
      "Comprendre une annonce de retard ou de changement de quai",
      "Utiliser le futur proche pour annoncer une action prévue",
      "Expliquer un trajet avec des expressions temporelles"
    ],
    "domain": "comprehension_orale",
    "stageId": "a2-intermediaire",
    "estimatedMinutes": 24,
    "lessons": [
      {
        "id": "trans-comprendre",
        "type": "comprendre",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "trans-comprendre-activite",
            "title": "Écouter une annonce de gare",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "trans-e",
                "type": "comprehension_orale",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "trans-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "trans-entrainement-activite",
            "title": "Parler de son trajet",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "trans-g1",
                "type": "qcm",
                "skillId": "a2-gr-futur-proche",
                "difficulty": "A2"
              },
              {
                "id": "trans-g2",
                "type": "texte_a_trous",
                "skillId": "a2-gr-expressions-temporelles",
                "difficulty": "A2"
              },
              {
                "id": "trans-g3",
                "type": "association",
                "skillId": "a2-voc-transports",
                "difficulty": "A2"
              },
              {
                "id": "trans-g4",
                "type": "remise_en_ordre",
                "skillId": "a2-gr-futur-proche",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "trans-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "trans-ecriture-activite",
            "title": "Expliquer son trajet par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "trans-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-message-informel",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "trans-ecriture-activite-orale",
            "title": "Expliquer son trajet à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "trans-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-message-informel",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "trans-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "trans-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "trans-i1",
                "type": "qcm",
                "skillId": "a2-gr-futur-proche",
                "difficulty": "A2"
              },
              {
                "id": "trans-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-transports",
                "difficulty": "A2"
              },
              {
                "id": "trans-i3",
                "type": "vrai_faux",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-organiser-un-voyage",
    "slug": "organiser-un-voyage-a2",
    "level": "A2",
    "title": "Organiser un voyage",
    "description": "À la fin de ce module, tu pourras comprendre une confirmation de réservation et échanger avec un hôtel par écrit.",
    "objectives": [
      "Comprendre une confirmation de réservation d'hôtel",
      "Comparer deux offres d'hébergement",
      "Écrire pour demander une information sur une réservation"
    ],
    "domain": "comprehension_ecrite",
    "stageId": "a2-intermediaire",
    "estimatedMinutes": 24,
    "lessons": [
      {
        "id": "a2-voy-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "a2-voy-comprendre-activite",
            "title": "Lire une confirmation de réservation",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "a2-voy-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-voy-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "a2-voy-entrainement-activite",
            "title": "Raconter une réservation",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "a2-voy-g1",
                "type": "texte_a_trous",
                "skillId": "a2-gr-passe-compose",
                "difficulty": "A2"
              },
              {
                "id": "a2-voy-g2",
                "type": "qcm",
                "skillId": "a2-gr-pronoms-coi",
                "difficulty": "A2"
              },
              {
                "id": "a2-voy-g3",
                "type": "association",
                "skillId": "a2-voc-voyage",
                "difficulty": "A2"
              },
              {
                "id": "a2-voy-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-pronoms-coi",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-voy-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "a2-voy-ecriture-activite",
            "title": "Demander une information à un hôtel",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "a2-voy-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-demander-information",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "a2-voy-ecriture-activite-orale",
            "title": "Demander une information à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "a2-voy-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-demander-information",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-voy-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "a2-voy-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "a2-voy-i1",
                "type": "qcm",
                "skillId": "a2-gr-passe-compose",
                "difficulty": "A2"
              },
              {
                "id": "a2-voy-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-voyage",
                "difficulty": "A2"
              },
              {
                "id": "a2-voy-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-aller-a-la-pharmacie-et-chez-le-medecin",
    "slug": "aller-a-la-pharmacie-et-chez-le-medecin",
    "level": "A2",
    "title": "Aller à la pharmacie et chez le médecin",
    "description": "À la fin de ce module, tu pourras décrire un symptôme simple et comprendre un conseil de santé.",
    "objectives": [
      "Décrire un symptôme simple",
      "Comprendre un conseil donné à la pharmacie",
      "Utiliser il faut + infinitif pour exprimer une nécessité"
    ],
    "domain": "comprehension_orale",
    "stageId": "a2-intermediaire",
    "estimatedMinutes": 24,
    "lessons": [
      {
        "id": "sante-comprendre",
        "type": "comprendre",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "sante-comprendre-activite",
            "title": "Écouter un dialogue à la pharmacie",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "sante-e",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "sante-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "sante-entrainement-activite",
            "title": "Donner un conseil de santé",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "sante-g1",
                "type": "qcm",
                "skillId": "a2-gr-il-faut-infinitif",
                "difficulty": "A2"
              },
              {
                "id": "sante-g2",
                "type": "texte_a_trous",
                "skillId": "a2-gr-imperatif",
                "difficulty": "A2"
              },
              {
                "id": "sante-g3",
                "type": "association",
                "skillId": "a2-voc-sante",
                "difficulty": "A2"
              },
              {
                "id": "sante-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-il-faut-infinitif",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "sante-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "sante-ecriture-activite",
            "title": "Demander un conseil de santé par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "sante-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-demander-information",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "sante-ecriture-activite-orale",
            "title": "Décrire ses symptômes à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "sante-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-demander-information",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "sante-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "sante-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "sante-i1",
                "type": "qcm",
                "skillId": "a2-gr-il-faut-infinitif",
                "difficulty": "A2"
              },
              {
                "id": "sante-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-sante",
                "difficulty": "A2"
              },
              {
                "id": "sante-i3",
                "type": "vrai_faux",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-parler-de-son-travail",
    "slug": "parler-de-son-travail",
    "level": "A2",
    "title": "Parler de son travail",
    "description": "À la fin de ce module, tu pourras décrire ton travail, tes horaires et tes tâches à un nouveau collègue.",
    "objectives": [
      "Décrire un poste et des horaires de travail",
      "Relier des idées avec et, mais, donc, parce que",
      "Comprendre la présentation professionnelle de quelqu'un d'autre"
    ],
    "domain": "grammaire",
    "stageId": "a2-intermediaire",
    "estimatedMinutes": 24,
    "lessons": [
      {
        "id": "trav-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "trav-comprendre-activite",
            "title": "Lire un message de présentation professionnelle",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "trav-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "trav-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "trav-entrainement-activite",
            "title": "Relier des idées sur le travail",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "trav-g1",
                "type": "qcm",
                "skillId": "a2-gr-connecteurs-simples",
                "difficulty": "A2"
              },
              {
                "id": "trav-g2",
                "type": "texte_a_trous",
                "skillId": "a2-gr-connecteurs-simples",
                "difficulty": "A2"
              },
              {
                "id": "trav-g3",
                "type": "association",
                "skillId": "a2-voc-travail",
                "difficulty": "A2"
              },
              {
                "id": "trav-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-futur-proche",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "trav-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "trav-ecriture-activite",
            "title": "Se présenter professionnellement par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "trav-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-se-presenter",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "trav-ecriture-activite-orale",
            "title": "Se présenter professionnellement à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "trav-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-se-presenter",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "trav-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "trav-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "trav-i1",
                "type": "qcm",
                "skillId": "a2-gr-connecteurs-simples",
                "difficulty": "A2"
              },
              {
                "id": "trav-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-travail",
                "difficulty": "A2"
              },
              {
                "id": "trav-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-chercher-un-emploi-simplement",
    "slug": "chercher-un-emploi-simplement",
    "level": "A2",
    "title": "Chercher un emploi simplement",
    "description": "À la fin de ce module, tu pourras répondre à une annonce d'emploi et comprendre une convocation à un entretien.",
    "objectives": [
      "Comprendre un message vocal de convocation à un entretien",
      "Raconter son parcours au passé composé",
      "Parler de ses disponibilités avec le futur simple"
    ],
    "domain": "production_ecrite",
    "stageId": "a2-intermediaire",
    "estimatedMinutes": 24,
    "lessons": [
      {
        "id": "a2-emp-comprendre",
        "type": "comprendre",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "a2-emp-comprendre-activite",
            "title": "Écouter un micro-trottoir sur les métiers",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-emp-e",
                "type": "comprehension_orale",
                "skillId": "a2-co-messages-vocaux",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-emp-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "a2-emp-entrainement-activite",
            "title": "Raconter son parcours et ses disponibilités",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "a2-emp-g1",
                "type": "texte_a_trous",
                "skillId": "a2-gr-passe-compose",
                "difficulty": "A2"
              },
              {
                "id": "a2-emp-g2",
                "type": "qcm",
                "skillId": "a2-gr-futur-simple-introduction",
                "difficulty": "A2"
              },
              {
                "id": "a2-emp-g3",
                "type": "association",
                "skillId": "a2-voc-recherche-emploi",
                "difficulty": "A2"
              },
              {
                "id": "a2-emp-g4",
                "type": "remise_en_ordre",
                "skillId": "a2-gr-futur-simple-introduction",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-emp-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "a2-emp-ecriture-activite",
            "title": "Répondre à une annonce d'emploi",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "a2-emp-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-message-informel",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "a2-emp-ecriture-activite-orale",
            "title": "Répondre à des questions d'entretien",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "a2-emp-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-message-informel",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-emp-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "a2-emp-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "a2-emp-i1",
                "type": "qcm",
                "skillId": "a2-gr-futur-simple-introduction",
                "difficulty": "A2"
              },
              {
                "id": "a2-emp-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-recherche-emploi",
                "difficulty": "A2"
              },
              {
                "id": "a2-emp-i3",
                "type": "vrai_faux",
                "skillId": "a2-co-messages-vocaux",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-parler-de-ses-etudes",
    "slug": "parler-de-ses-etudes",
    "level": "A2",
    "title": "Parler de ses études",
    "description": "À la fin de ce module, tu pourras parler de ta formation actuelle et comparer avec ta situation d'avant.",
    "objectives": [
      "Décrire une formation et un emploi du temps",
      "Utiliser l'imparfait pour décrire une situation passée",
      "Comprendre un petit récit sur des études"
    ],
    "domain": "grammaire",
    "stageId": "a2-intermediaire",
    "estimatedMinutes": 22,
    "lessons": [
      {
        "id": "etud-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "etud-comprendre-activite",
            "title": "Lire un message sur un forum de formation",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "etud-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-recits-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "etud-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "etud-entrainement-activite",
            "title": "Comparer avant et maintenant",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "etud-g1",
                "type": "texte_a_trous",
                "skillId": "a2-gr-imparfait-introduction",
                "difficulty": "A2"
              },
              {
                "id": "etud-g2",
                "type": "qcm",
                "skillId": "a2-gr-imparfait-introduction",
                "difficulty": "A2"
              },
              {
                "id": "etud-g3",
                "type": "association",
                "skillId": "a2-voc-etudes",
                "difficulty": "A2"
              },
              {
                "id": "etud-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-imparfait-introduction",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "etud-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "etud-ecriture-activite",
            "title": "Comparer ses études d'avant et de maintenant",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "etud-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "etud-ecriture-activite-orale",
            "title": "Comparer ses études à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "etud-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "etud-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "etud-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "etud-i1",
                "type": "qcm",
                "skillId": "a2-gr-imparfait-introduction",
                "difficulty": "A2"
              },
              {
                "id": "etud-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-etudes",
                "difficulty": "A2"
              },
              {
                "id": "etud-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-recits-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-raconter-son-week-end",
    "slug": "raconter-son-week-end",
    "level": "A2",
    "title": "Raconter son week-end",
    "description": "À la fin de ce module, tu pourras raconter ton week-end de façon organisée et proposer une nouvelle sortie.",
    "objectives": [
      "Raconter un week-end en distinguant actions et contexte",
      "Organiser un récit avec d'abord, ensuite, après, enfin",
      "Proposer une sortie à un ami"
    ],
    "domain": "production_ecrite",
    "stageId": "a2-intermediaire",
    "estimatedMinutes": 26,
    "lessons": [
      {
        "id": "wknd-comprendre",
        "type": "comprendre",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "wknd-comprendre-activite",
            "title": "Écouter un récit de week-end",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "wknd-e",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "wknd-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "wknd-entrainement-activite",
            "title": "Raconter dans l'ordre",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "wknd-g1",
                "type": "qcm",
                "skillId": "a2-gr-passe-compose-imparfait-contraste",
                "difficulty": "A2"
              },
              {
                "id": "wknd-g2",
                "type": "remise_en_ordre",
                "skillId": "a2-gr-connecteurs-chronologiques",
                "difficulty": "A2"
              },
              {
                "id": "wknd-g3",
                "type": "texte_a_trous",
                "skillId": "a2-gr-passe-compose-imparfait-contraste",
                "difficulty": "A2"
              },
              {
                "id": "wknd-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-connecteurs-chronologiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "wknd-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "wknd-ecriture-activite",
            "title": "Raconter son week-end par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "wknd-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-raconter-brievement",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "wknd-ecriture-activite-orale",
            "title": "Raconter son week-end à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "wknd-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-raconter-brievement",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "wknd-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "wknd-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "wknd-i1",
                "type": "qcm",
                "skillId": "a2-gr-passe-compose-imparfait-contraste",
                "difficulty": "A2"
              },
              {
                "id": "wknd-i2",
                "type": "reponse_courte",
                "skillId": "a2-gr-connecteurs-chronologiques",
                "difficulty": "A2"
              },
              {
                "id": "wknd-i3",
                "type": "vrai_faux",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-communiquer-au-quotidien",
    "slug": "communiquer-au-quotidien",
    "level": "A2",
    "title": "Communiquer au quotidien",
    "description": "À la fin de ce module, tu pourras écrire un message pour annuler un rendez-vous et répondre à un message en ligne.",
    "objectives": [
      "Écrire un SMS pour annuler ou modifier un rendez-vous",
      "Répondre à un message sur un groupe en ligne",
      "Utiliser lui/leur et le futur simple dans un message court"
    ],
    "domain": "vocabulaire",
    "stageId": "a2-intermediaire",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "num-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "num-comprendre-activite",
            "title": "Lire un message de groupe en ligne",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "num-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "num-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "num-entrainement-activite",
            "title": "Écrire des messages courts",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "num-g1",
                "type": "qcm",
                "skillId": "a2-gr-pronoms-coi",
                "difficulty": "A2"
              },
              {
                "id": "num-g2",
                "type": "texte_a_trous",
                "skillId": "a2-gr-futur-simple-introduction",
                "difficulty": "A2"
              },
              {
                "id": "num-g3",
                "type": "association",
                "skillId": "a2-voc-numerique",
                "difficulty": "A2"
              },
              {
                "id": "num-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-pronoms-coi",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "num-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "num-ecriture-activite",
            "title": "Annuler un rendez-vous par SMS",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "num-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-message-informel",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "num-ecriture-activite-orale",
            "title": "Laisser un message vocal",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "num-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-message-informel",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "num-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "num-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "num-i1",
                "type": "qcm",
                "skillId": "a2-gr-pronoms-coi",
                "difficulty": "A2"
              },
              {
                "id": "num-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-numerique",
                "difficulty": "A2"
              },
              {
                "id": "num-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-parler-de-la-meteo",
    "slug": "parler-de-la-meteo",
    "level": "A2",
    "title": "Parler de la météo",
    "description": "À la fin de ce module, tu pourras comprendre un bulletin météo simple et proposer une activité selon le temps qu'il fera.",
    "objectives": [
      "Comprendre un bulletin météo simple",
      "Comparer le temps qu'il fait selon les saisons",
      "Proposer une activité adaptée à la météo prévue"
    ],
    "domain": "comprehension_orale",
    "stageId": "a2-consolidation",
    "estimatedMinutes": 20,
    "lessons": [
      {
        "id": "meteo-comprendre",
        "type": "comprendre",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "meteo-comprendre-activite",
            "title": "Écouter le bulletin météo",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "meteo-e",
                "type": "comprehension_orale",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "meteo-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "meteo-entrainement-activite",
            "title": "Prévoir et comparer le temps",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "meteo-g1",
                "type": "texte_a_trous",
                "skillId": "a2-gr-futur-simple-introduction",
                "difficulty": "A2"
              },
              {
                "id": "meteo-g2",
                "type": "qcm",
                "skillId": "a2-gr-comparatif",
                "difficulty": "A2"
              },
              {
                "id": "meteo-g3",
                "type": "association",
                "skillId": "a2-voc-meteo",
                "difficulty": "A2"
              },
              {
                "id": "meteo-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-futur-simple-introduction",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "meteo-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "meteo-ecriture-activite",
            "title": "Décrire le temps par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "meteo-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "meteo-ecriture-activite-orale",
            "title": "Proposer une sortie selon la météo",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "meteo-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-decrire",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "meteo-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "meteo-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "meteo-i1",
                "type": "qcm",
                "skillId": "a2-gr-futur-simple-introduction",
                "difficulty": "A2"
              },
              {
                "id": "meteo-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-meteo",
                "difficulty": "A2"
              },
              {
                "id": "meteo-i3",
                "type": "vrai_faux",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-organiser-un-evenement",
    "slug": "organiser-un-evenement",
    "level": "A2",
    "title": "Organiser un événement",
    "description": "À la fin de ce module, tu pourras organiser une fête simple, écrire une invitation et donner des instructions aux invités.",
    "objectives": [
      "Écrire une invitation pour un événement",
      "Donner des instructions simples avec l'impératif",
      "Comprendre les détails pratiques d'une invitation reçue"
    ],
    "domain": "production_ecrite",
    "stageId": "a2-consolidation",
    "estimatedMinutes": 22,
    "lessons": [
      {
        "id": "evt-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "evt-comprendre-activite",
            "title": "Lire le message d'organisation de Manon",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "evt-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "evt-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "evt-entrainement-activite",
            "title": "Donner des instructions et des dates",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "evt-g1",
                "type": "qcm",
                "skillId": "a2-gr-imperatif",
                "difficulty": "A2"
              },
              {
                "id": "evt-g2",
                "type": "texte_a_trous",
                "skillId": "a2-gr-imperatif",
                "difficulty": "A2"
              },
              {
                "id": "evt-g3",
                "type": "association",
                "skillId": "a2-gr-expressions-temporelles",
                "difficulty": "A2"
              },
              {
                "id": "evt-g4",
                "type": "remise_en_ordre",
                "skillId": "a2-voc-evenements",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "evt-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "evt-ecriture-activite",
            "title": "Écrire une invitation",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "evt-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-repondre-invitation",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "evt-ecriture-activite-orale",
            "title": "Inviter à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "evt-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-repondre-invitation",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "evt-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "evt-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "evt-i1",
                "type": "qcm",
                "skillId": "a2-gr-imperatif",
                "difficulty": "A2"
              },
              {
                "id": "evt-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-evenements",
                "difficulty": "A2"
              },
              {
                "id": "evt-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-parler-de-ses-projets-de-vacances",
    "slug": "parler-de-ses-projets-de-vacances",
    "level": "A2",
    "title": "Parler de ses projets de vacances",
    "description": "À la fin de ce module, tu pourras parler de tes projets de vacances et exprimer une condition simple pour les réaliser.",
    "objectives": [
      "Parler de projets et d'intentions pour les vacances",
      "Exprimer une condition simple avec si + présent",
      "Comprendre les projets de vacances de quelqu'un d'autre"
    ],
    "domain": "grammaire",
    "stageId": "a2-consolidation",
    "estimatedMinutes": 24,
    "lessons": [
      {
        "id": "proj-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "proj-comprendre-activite",
            "title": "Lire un message sur des projets de vacances",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "proj-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-recits-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "proj-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "proj-entrainement-activite",
            "title": "Exprimer un projet et une condition",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "proj-g1",
                "type": "qcm",
                "skillId": "a2-gr-si-condition-elementaire",
                "difficulty": "A2"
              },
              {
                "id": "proj-g2",
                "type": "texte_a_trous",
                "skillId": "a2-gr-futur-simple-introduction",
                "difficulty": "A2"
              },
              {
                "id": "proj-g3",
                "type": "association",
                "skillId": "a2-voc-projets",
                "difficulty": "A2"
              },
              {
                "id": "proj-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-si-condition-elementaire",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "proj-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "proj-ecriture-activite",
            "title": "Écrire ses projets de vacances",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "proj-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-message-informel",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "proj-ecriture-activite-orale",
            "title": "Parler de ses projets à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "proj-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-message-informel",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "proj-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "proj-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "proj-i1",
                "type": "qcm",
                "skillId": "a2-gr-si-condition-elementaire",
                "difficulty": "A2"
              },
              {
                "id": "proj-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-projets",
                "difficulty": "A2"
              },
              {
                "id": "proj-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-recits-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-raconter-une-experience-recente",
    "slug": "raconter-une-experience-recente",
    "level": "A2",
    "title": "Raconter une expérience récente",
    "description": "À la fin de ce module, tu pourras raconter brièvement un souvenir marquant en le situant dans le temps.",
    "objectives": [
      "Raconter un souvenir bref avec passé composé et imparfait",
      "Décrire le contexte d'un souvenir avec l'imparfait",
      "Relier deux phrases avec un pronom relatif qui ou que"
    ],
    "domain": "production_ecrite",
    "stageId": "a2-consolidation",
    "estimatedMinutes": 26,
    "lessons": [
      {
        "id": "a2-exp-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "a2-exp-comprendre-activite",
            "title": "Lire le récit de Théo",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "a2-exp-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-recits-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-exp-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "a2-exp-entrainement-activite",
            "title": "Raconter avec qui et que",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "a2-exp-g1",
                "type": "texte_a_trous",
                "skillId": "a2-gr-passe-compose-imparfait-contraste",
                "difficulty": "A2"
              },
              {
                "id": "a2-exp-g2",
                "type": "qcm",
                "skillId": "a2-gr-relatifs-qui-que",
                "difficulty": "A2"
              },
              {
                "id": "a2-exp-g3",
                "type": "association",
                "skillId": "a2-gr-relatifs-qui-que",
                "difficulty": "A2"
              },
              {
                "id": "a2-exp-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-passe-compose-imparfait-contraste",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-exp-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "a2-exp-ecriture-activite",
            "title": "Raconter un souvenir par écrit",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "a2-exp-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-raconter-brievement",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "a2-exp-ecriture-activite-orale",
            "title": "Raconter un souvenir à l'oral",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "a2-exp-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-raconter-brievement",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "a2-exp-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "a2-exp-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "a2-exp-i1",
                "type": "qcm",
                "skillId": "a2-gr-relatifs-qui-que",
                "difficulty": "A2"
              },
              {
                "id": "a2-exp-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-experiences",
                "difficulty": "A2"
              },
              {
                "id": "a2-exp-i3",
                "type": "vrai_faux",
                "skillId": "a2-ce-recits-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 10
  },
  {
    "id": "a2-comprendre-annonces-et-programmes",
    "slug": "comprendre-annonces-et-programmes",
    "level": "A2",
    "title": "Comprendre des annonces et des programmes",
    "description": "À la fin de ce module, tu pourras comprendre un programme d'événements et une annonce, et en reconstituer la chronologie.",
    "objectives": [
      "Comprendre un programme d'événements",
      "Comprendre une annonce audio liée à un programme",
      "Remettre en ordre une chronologie simple"
    ],
    "domain": "comprehension_ecrite",
    "stageId": "a2-consolidation",
    "estimatedMinutes": 22,
    "lessons": [
      {
        "id": "annonce-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "annonce-comprendre-activite",
            "title": "Lire le programme de la fête de quartier",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "annonce-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-programmes-horaires",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "annonce-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "annonce-ecoute-activite",
            "title": "Écouter le programme culturel à la radio",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "annonce-co",
                "type": "comprehension_orale",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "annonce-entrainement",
        "type": "entrainement",
        "title": "S'entraîner",
        "optional": false,
        "activities": [
          {
            "id": "annonce-entrainement-activite",
            "title": "Utiliser y, en, et remettre en ordre",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "annonce-g1",
                "type": "qcm",
                "skillId": "a2-gr-y-en-introduction",
                "difficulty": "A2"
              },
              {
                "id": "annonce-g2",
                "type": "qcm",
                "skillId": "a2-gr-y-en-introduction",
                "difficulty": "A2"
              },
              {
                "id": "annonce-g3",
                "type": "remise_en_ordre",
                "skillId": "a2-ce-programmes-horaires",
                "difficulty": "A2"
              },
              {
                "id": "annonce-g4",
                "type": "vrai_faux",
                "skillId": "a2-gr-quantite-partitifs",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "annonce-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "annonce-evaluation-activite",
            "title": "Bilan du module",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "annonce-i1",
                "type": "qcm",
                "skillId": "a2-gr-y-en-introduction",
                "difficulty": "A2"
              },
              {
                "id": "annonce-i2",
                "type": "reponse_courte",
                "skillId": "a2-voc-evenements",
                "difficulty": "A2"
              },
              {
                "id": "annonce-i3",
                "type": "vrai_faux",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 9
  },
  {
    "id": "a2-bilan-a2",
    "slug": "bilan-a2",
    "level": "A2",
    "title": "Bilan A2 : se présenter à un examen",
    "description": "À la fin de ce module, tu pourras mobiliser l'ensemble des compétences A2 dans un cadre proche d'un examen (DELF A2), à l'écrit comme à l'oral.",
    "objectives": [
      "Mobiliser les 4 compétences (compréhension écrite/orale, production écrite/orale) sur un format proche du DELF A2",
      "Réviser les notions grammaticales clés du parcours A2",
      "Se préparer aux conditions de gestion du temps d'un examen"
    ],
    "domain": "comprehension_ecrite",
    "stageId": "a2-consolidation",
    "estimatedMinutes": 32,
    "lessons": [
      {
        "id": "bilan-a2-comprendre",
        "type": "comprendre",
        "title": "Compréhension écrite",
        "optional": false,
        "activities": [
          {
            "id": "bilan-a2-comprendre-activite",
            "title": "Lire le message de Nadia",
            "skillDomain": "comprehension_ecrite",
            "exercises": [
              {
                "id": "bilan-e",
                "type": "comprehension_ecrite",
                "skillId": "a2-ce-messages-courts",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-a2-ecoute",
        "type": "ecoute",
        "title": "Compréhension orale",
        "optional": false,
        "activities": [
          {
            "id": "bilan-a2-ecoute-activite",
            "title": "Écouter un récit de journée",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "bilan-co",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-a2-ecriture",
        "type": "ecriture",
        "title": "Réutiliser",
        "optional": false,
        "activities": [
          {
            "id": "bilan-a2-ecriture-activite",
            "title": "Production écrite transversale",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "bilan-h",
                "type": "production_ecrite",
                "skillId": "a2-pe-raconter-brievement",
                "difficulty": "A2"
              }
            ]
          },
          {
            "id": "bilan-a2-ecriture-activite-orale",
            "title": "Production orale calibrée DELF A2",
            "skillDomain": "production_ecrite",
            "exercises": [
              {
                "id": "bilan-h-oral",
                "type": "production_orale",
                "skillId": "a2-pe-se-presenter",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "bilan-a2-evaluation",
        "type": "evaluation",
        "title": "Faire le point",
        "optional": false,
        "activities": [
          {
            "id": "bilan-a2-evaluation-activite",
            "title": "Bilan transversal du niveau A2",
            "skillDomain": "grammaire",
            "exercises": [
              {
                "id": "bilan-i1",
                "type": "qcm",
                "skillId": "a2-gr-passe-compose-imparfait-contraste",
                "difficulty": "A2"
              },
              {
                "id": "bilan-i2",
                "type": "qcm",
                "skillId": "a2-gr-cause-simple",
                "difficulty": "A2"
              },
              {
                "id": "bilan-i3",
                "type": "reponse_courte",
                "skillId": "a2-gr-consequence-simple",
                "difficulty": "A2"
              },
              {
                "id": "bilan-i4",
                "type": "vrai_faux",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 8
  },
  {
    "id": "a2-banque-ecoute",
    "slug": "banque-ecoute-a2",
    "level": "A2",
    "title": "Banque d'écoute A2",
    "description": "Un ensemble libre de pistes audio supplémentaires pour t'entraîner à l'écoute, classées par thème. Ce module est optionnel : il n'est pas nécessaire de le terminer pour progresser dans le parcours A2.",
    "objectives": [
      "S'entraîner à la compréhension orale sur des situations variées du quotidien",
      "Élargir l'exposition à des voix et des débits différents"
    ],
    "domain": "comprehension_orale",
    "stageId": "a2-pret-pour-le-b1",
    "estimatedMinutes": 18,
    "lessons": [
      {
        "id": "banque-a2-famille",
        "type": "ecoute",
        "title": "Écoute libre : famille",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-famille-activite",
            "title": "Famille",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-famille-message-presentation",
                "type": "comprehension_orale",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-logement",
        "type": "ecoute",
        "title": "Écoute libre : logement",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-logement-activite",
            "title": "Logement",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-logement-appel-agence",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              },
              {
                "id": "a2-copropriete-reunion-travaux",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-rendez-vous",
        "type": "ecoute",
        "title": "Écoute libre : rendez-vous",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-rendez-vous-activite",
            "title": "Rendez-vous",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-rdv-medecin-secretariat",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              },
              {
                "id": "bilan-a2-repondeur-coiffeur",
                "type": "comprehension_orale",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-loisirs",
        "type": "ecoute",
        "title": "Écoute libre : loisirs",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-loisirs-activite",
            "title": "Loisirs",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-loisirs-invitation-vocale",
                "type": "comprehension_orale",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              },
              {
                "id": "a2-restaurant-reservation-telephone",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              },
              {
                "id": "bilan-a2-dialogue-patinoire",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-travail",
        "type": "ecoute",
        "title": "Écoute libre : travail",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-travail-activite",
            "title": "Travail",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-travail-nouveau-collegue",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-voyages",
        "type": "ecoute",
        "title": "Écoute libre : voyages",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-voyages-activite",
            "title": "Voyages",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-hotel-reservation-dates",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-projets",
        "type": "ecoute",
        "title": "Écoute libre : projets",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-projets-activite",
            "title": "Projets",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-projet-vacances-couple",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              },
              {
                "id": "a2-reunion-projet-collegues",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-evenements",
        "type": "ecoute",
        "title": "Écoute libre : événements",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-evenements-activite",
            "title": "Événements",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-evenement-anniversaire-surprise",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              },
              {
                "id": "a2-invitation-mariage-repondeur",
                "type": "comprehension_orale",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-achats",
        "type": "ecoute",
        "title": "Écoute libre : achats",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-achats-activite",
            "title": "Achats",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-appel-service-client-colis",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-sante",
        "type": "ecoute",
        "title": "Écoute libre : santé",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-sante-activite",
            "title": "Santé",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-medecin-suivi-consultation",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-recits",
        "type": "ecoute",
        "title": "Écoute libre : récits",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-recits-activite",
            "title": "Récits",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-recit-voyage-etranger",
                "type": "comprehension_orale",
                "skillId": "a2-co-dialogues-quotidiens",
                "difficulty": "A2"
              }
            ]
          }
        ]
      },
      {
        "id": "banque-a2-transports",
        "type": "ecoute",
        "title": "Écoute libre : transports",
        "optional": true,
        "activities": [
          {
            "id": "banque-a2-transports-activite",
            "title": "Transports",
            "skillDomain": "comprehension_orale",
            "exercises": [
              {
                "id": "a2-annonce-gare-perturbation",
                "type": "comprehension_orale",
                "skillId": "a2-co-annonces-publiques",
                "difficulty": "A2"
              }
            ]
          }
        ]
      }
    ],
    "totalExercises": 18
  }
];
