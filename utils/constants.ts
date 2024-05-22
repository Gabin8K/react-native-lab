import { Dimensions } from 'react-native';
export const { width: Width, height: Height } = Dimensions.get('window');


export type Receip = {
  active: boolean;
  label: string | undefined;
  id: number;
  title: string;
  emoji: string;
  description: string;
}

export const recettesCuisine: Receip[] = [
  {
    id: 1,
    title: 'Poulet',
    emoji: '🍗',
    description: 'Recette de poulet au four avec des épices et des herbes aromatiques'
  },
  {
    id: 2,
    title: 'Poisson',
    emoji: '🐟',
    description: 'Recette de poisson grillé avec des légumes de saison'
  },
  {
    id: 3,
    title: 'Salade',
    emoji: '🥗',
    description: 'Recette de salade composée avec des fruits et des légumes',
  },
  {
    id: 4,
    title: 'Gâteau',
    emoji: '🍰',
    description: 'Recette de gâteau au chocolat avec des amandes et des noisettes'
  },
  {
    id: 5,
    title: 'Pizza',
    emoji: '🍕',
    description: 'Recette de pizza maison avec une pâte fine et des légumes frais'
  },
  {
    id: 6,
    title: 'Pâtes',
    emoji: '🍝',
    description: 'Recette de pâtes fraîches avec une sauce tomate et du basilic'
  },
  {
    id: 7,
    title: 'Tarte',
    emoji: '🥧',
    description: 'Recette de tarte aux pommes avec une pâte feuilletée et de la cannelle et du sucre glace en finition de décoration de la tarte aux pommes frais'
  },
  {
    id: 8,
    title: 'Soupe',
    emoji: '🍲',
    description: 'Recette de soupe de légumes avec des croûtons et du fromage râpé'
  },
  {
    id: 9,
    title: 'Riz',
    emoji: '🍚',
    description: 'Recette de riz basmati avec des épices et des herbes aromatiques'
  },
  {
    id: 10,
    title: 'Burger',
    emoji: '🍔',
    description: 'Recette de burger maison avec un steak haché et des oignons caramélisés'
  },
  {
    id: 11,
    title: 'Tacos',
    emoji: '🌮',
    description: 'Recette de tacos mexicains avec une viande marinée et des légumes croquants'
  },
  {
    id: 12,
    title: 'Sushi',
    emoji: '🍣',
    description: 'Recette de sushi japonais avec du riz vinaigré et du poisson cru'
  },
  {
    id: 13,
    title: 'Curry',
    emoji: '🍛',
    description: 'Recette de curry indien avec du poulet et des légumes mijotés'
  },
  {
    id: 14,
    title: 'Couscous',
    emoji: '🥙',
    description: 'Recette de couscous marocain avec des légumes et de la semoule'
  },
  {
    id: 15,
    title: 'Fondue',
    emoji: '🧀',
    description: 'Recette de fondue savoyarde avec du fromage fondu et du pain'
  },
  {
    id: 16,
    title: 'Raclette',
    emoji: '🧀',
    description: 'Recette de raclette suisse avec des pommes de terre et de la charcuterie'
  },
  {
    id: 17,
    title: 'Fondant',
    emoji: '🍫',
    description: 'Recette de fondant au chocolat avec une crème anglaise et des fruits rouges'
  },
  {
    id: 18,
    title: 'Crêpe',
    emoji: '🥞',
    description: 'Recette de crêpe bretonne avec du caramel au beurre salé et des pommes'
  },
  {
    id: 19,
    title: 'Tiramisu',
    emoji: '🍰',
    description: 'Recette de tiramisu italien avec des biscuits imbibés de café et de la crème mascarpone'
  },
  {
    id: 20,
    title: 'Muffin',
    emoji: '🧁',
    description: 'Recette de muffin aux pépites de chocolat avec des noix et des fruits secs'
  },
  {
    id: 21,
    title: 'Smoothie',
    emoji: '🥤',
    description: 'Recette de smoothie aux fruits frais avec du lait d\'amande et du miel'
  },
  {
    id: 22,
    title: 'Cocktail',
    emoji: '🍹',
    description: 'Recette de cocktail sans alcool avec des fruits pressés et de la menthe'
  },
  {
    id: 23,
    title: 'Jus',
    emoji: '🥤',
    description: 'Recette de jus de fruits frais avec des légumes verts et des graines de chia'
  },
  {
    id: 24,
    title: 'Mojito',
    emoji: '🍹',
    description: 'Recette de mojito cubain avec du rhum blanc et de la menthe fraîche'
  },
  {
    id: 25,
    title: 'Café',
    emoji: '☕️',
    description: 'Recette de café noir avec des grains torréfiés et de l\'eau chaude'
  },
  {
    id: 26,
    title: 'Thé',
    emoji: '🍵',
    description: 'Recette de thé vert avec des feuilles séchées et de l\'eau bouillante'
  },
  {
    id: 27,
    title: 'Chocolat',
    emoji: '🍫',
    description: 'Recette de chocolat chaud avec du lait entier et des carrés de chocolat'
  },
  {
    id: 28,
    title: 'Smoothie Bowl',
    emoji: '🥣',
    description: 'Recette de smoothie bowl aux fruits rouges avec des graines de chia et des amandes'
  },
  {
    id: 29,
    title: 'Buddha Bowl',
    emoji: '🍲',
    description: 'Recette de buddha bowl végétarien avec des légumes rôtis et du quinoa'
  },
  {
    id: 30,
    title: 'Bol de Riz',
    emoji: '🍚',
    description: 'Recette de bol de riz japonais avec des légumes sautés et du tofu'
  },
  {
    id: 31,
    title: 'Bol de Ramen',
    emoji: '🍜',
    description: 'Recette de bol de ramen japonais avec des nouilles et du porc braisé'
  },
  {
    id: 32,
    title: 'Bol de Pho',
    emoji: '🍲',
    description: 'Recette de bol de pho vietnamien avec du bouillon de bœuf et des herbes fraîches'
  },
  {
    id: 33,
    title: 'Bol de Bibimbap',
    emoji: '🍚',
    description: 'Recette de bol de bibimbap coréen avec du riz et des légumes sautés'
  },
  {
    id: 34,
    title: 'Bol de Poke',
    emoji: '🥗',
    description: 'Recette de bol de poke hawaïen avec du poisson cru et des légumes marinés'
  },
  {
    id: 35,
    title: 'Bol de Soba',
    emoji: '🍜',
    description: 'Recette de bol de soba japonais avec des nouilles de sarrasin et du bouillon'
  },
  {
    id: 36,
    title: 'Bol de Udon',
    emoji: '🍜',
    description: 'Recette de bol de udon japonais avec des nouilles épaisses et du bouillon'
  },
  {
    id: 37,
    title: 'Bol de Katsu',
    emoji: '🍚',
    description: 'Recette de bol de katsu japonais avec du porc pané et du riz'
  },
  {
    id: 38,
    title: 'Bol de Donburi',
    emoji: '🍚',
    description: 'Recette de bol de donburi japonais avec du poisson grillé et du riz'
  },
  {
    id: 39,
    title: 'Bol de Gohan',
    emoji: '🍚',
    description: 'Recette de bol de gohan japonais avec du riz et des légumes sautés'
  },
  {
    id: 40,
    title: 'Bol de Chirashi',
    emoji: '🍣',
    description: 'Recette de bol de chirashi japonais avec du riz vinaigré et des sashimis'
  },
  {
    id: 41,
    title: 'Bol de Yakitori',
    emoji: '🍢',
    description: 'Recette de bol de yakitori japonais avec des brochettes de poulet et du riz'
  },
  {
    id: 42,
    title: 'Bol de Tempura',
    emoji: '🍤',
    description: 'Recette de bol de tempura japonais avec des beignets de crevettes et du riz'
  },
  {
    id: 43,
    title: 'Bol de Tonkatsu',
    emoji: '🍛',
    description: 'Recette de bol de tonkatsu japonais avec du porc pané et du riz'
  },
  {
    id: 44,
    title: 'Bol de Sukiyaki',
    emoji: '🍲',
    description: 'Recette de bol de sukiyaki japonais avec du bœuf et des légumes mijotés'
  },
  {
    id: 45,
    title: 'Bol de Yakiniku',
    emoji: '🥩',
    description: 'Recette de bol de yakiniku japonais avec du bœuf grillé et du riz'
  },
  {
    id: 46,
    title: 'Bol de Shabu Shabu',
    emoji: '🍲',
    description: 'Recette de bol de shabu shabu japonais avec du bœuf et des légumes cuits dans un bouillon'
  },
  {
    id: 47,
    title: 'Bol de Okonomiyaki',
    emoji: '🥞',
    description: 'Recette de bol de okonomiyaki japonais avec des crêpes et des légumes'
  },
  {
    id: 48,
    title: 'Bol de Takoyaki',
    emoji: '🍢',
    description: 'Recette de bol de takoyaki japonais avec des boulettes de poulpe et de la sauce'
  },
]
  .sort((e1, e2) => e1.title.localeCompare(e2.title))
  .map((item, index, array) => ({
    ...item,
    active: false,
    label: array[index - 1] ? array[index - 1].title[0] !== item.title[0] ? item.title[0] : undefined : item.title[0]
  }));