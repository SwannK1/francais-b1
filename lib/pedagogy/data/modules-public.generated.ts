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
  }
];
