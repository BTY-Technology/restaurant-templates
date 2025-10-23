import { Chef } from '@/types/chef';

export const chefs: Chef[] = [
  {
    id: 'chef-zhang',
    name: 'Zhang Wei',
    nameZh: '张伟',
    title: 'Executive Chef & Owner',
    bio: 'Chef Zhang Wei brings over 30 years of culinary expertise from Sichuan province. After training under master chefs in Chengdu, he moved to the United States to share authentic Sichuan flavors with a modern twist. His passion for preserving traditional techniques while embracing innovation has made Golden Wok a beloved destination for Chinese cuisine enthusiasts.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
    specialties: ['Sichuan Cuisine', 'Mapo Tofu', 'Dan Dan Noodles', 'Hot Pot'],
    experience: '30+ years',
  },
  {
    id: 'chef-lin',
    name: 'Lin Mei',
    nameZh: '林美',
    title: 'Head Pastry Chef',
    bio: 'Chef Lin Mei specializes in traditional Chinese desserts and dim sum. Trained in Hong Kong and Guangzhou, she mastered the delicate art of creating beautiful and delicious sweets. Her signature mango pudding and sesame balls have become customer favorites, combining authentic flavors with elegant presentation.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    specialties: ['Dim Sum', 'Chinese Desserts', 'Mango Pudding', 'Sesame Balls'],
    experience: '15+ years',
  },
  {
    id: 'chef-chen',
    name: 'Chen Hao',
    nameZh: '陈浩',
    title: 'Sous Chef',
    bio: 'Chef Chen Hao is our master of wok cooking, having trained in Cantonese cuisine in Guangzhou before joining our team. His expertise in high-heat cooking techniques brings out the perfect "wok hei" (breath of the wok) in every stir-fry dish. He oversees our noodle and rice dishes, ensuring each plate achieves the ideal balance of flavor and texture.',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&q=80',
    specialties: ['Cantonese Cuisine', 'Wok Cooking', 'Fried Rice', 'Chow Mein'],
    experience: '18+ years',
  },
  {
    id: 'chef-liu',
    name: 'Liu Yan',
    nameZh: '刘燕',
    title: 'Chef de Cuisine',
    bio: 'Chef Liu Yan brings elegance to every dish with her training in Beijing cuisine. She specializes in our signature Peking Duck and other Northern Chinese specialties. Her attention to detail and commitment to using the finest ingredients has elevated Golden Wok\'s menu to new heights.',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80',
    specialties: ['Beijing Cuisine', 'Peking Duck', 'Northern Chinese Dishes', 'Dumplings'],
    experience: '22+ years',
  },
];

export const getAllChefs = (): Chef[] => {
  return chefs;
};

export const getChefById = (id: string): Chef | undefined => {
  return chefs.find(chef => chef.id === id);
};

export const getExecutiveChef = (): Chef => {
  return chefs[0];
};
