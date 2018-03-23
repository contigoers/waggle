const organizations = [];


const adopters = [];


const dogs = [
  {
    id: 1,
    name: 'Sputnik',
    breed: 'Maltese',
    mix: false,
    male: false,
    size: 'small',
    aggressive: false,
    anxious: true,
    lifestage: 'adult',
    age: 7,
    fixed: true,
    diet: true,
    medical: false,
    energy_level: 'low',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/8/86/Maltese_puppy.jpeg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
    adopted: false,
    org_id: 1,
  },
  {
    id: 2,
    name: 'Fido',
    breed: 'Boxer',
    mix: true,
    male: true,
    size: 'medium',
    aggressive: true,
    anxious: false,
    lifestage: 'adolescent',
    age: 2,
    fixed: false,
    diet: false,
    medical: false,
    energy_level: 'high',
    photo:
      'https://cdn-www.dailypuppy.com/dog-images/roxie-the-boxer-mix-5_34663_2009-09-18_w450.jpg',
    description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.',
    adopted: false,
    org_id: 2,
  },
  {
    id: 3,
    name: 'Rover',
    breed: 'Border Collie',
    mix: false,
    male: true,
    size: 'large',
    aggressive: false,
    anxious: false,
    lifestage: 'senior',
    age: 11,
    fixed: true,
    diet: true,
    medical: true,
    energy_level: 'medium',
    photo:
      'http://www.shopforyourcause.com/images/dog-breeds/dog_breed_gallery/german_shepherd_border_collie3.jpeg',
    description:
      'Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    adopted: false,
    org_id: 1,
  },
  {
    id: 4,
    name: 'Daisy',
    breed: 'Lab',
    mix: true,
    male: true,
    size: 'small',
    aggressive: true,
    anxious: true,
    lifestage: 'puppy',
    age: 1,
    fixed: true,
    diet: false,
    medical: false,
    energy_level: 'medium',
    photo:
      'https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/74/95/fotolia_801950_XS.jpg',
    description:
      'Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.',
    adopted: false,
    org_id: 2,
  },
];

export default { dogs, organizations, adopters };
