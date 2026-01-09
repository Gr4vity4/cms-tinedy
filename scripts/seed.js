'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');
const {
  categories,
  authors,
  articles,
  blogs,
  global,
  about,
  careerPage,
  contact,
  contactForms,
  pricing,
  faq,
  homeFeatures,
  products,
  homePage,
  jobApplications,
  jobOpenings,
  policyPage,
  testimonials,
} = require('../data/data.json');

async function seedExampleApp() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up the template...');
      await importSeedData();
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  } else {
    console.log(
      'Seed data has already been imported. We cannot reimport unless you clear your database first.'
    );
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats['size'];
  return fileSizeInBytes;
}

function getFileData(fileName) {
  const filePath = path.join('data', 'uploads', fileName);
  // Parse the file metadata
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split('.').pop();
  const mimeType = mime.lookup(ext || '') || '';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function uploadFile(file, name) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: file,
      data: {
        fileInfo: {
          alternativeText: `An image uploaded to Strapi called ${name}`,
          caption: name,
          name,
        },
      },
    });
}

// Create an entry and attach files if there are any
async function createEntry({ model, entry }) {
  try {
    // Actually create the entry in Strapi
    await strapi.documents(`api::${model}.${model}`).create({
      data: entry,
    });
  } catch (error) {
    console.error({ model, entry, error });
  }
}

async function checkFileExistsBeforeUpload(files) {
  const existingFiles = [];
  const uploadedFiles = [];
  const filesCopy = [...files];

  for (const fileName of filesCopy) {
    // Check if the file already exists in Strapi
    const fileWhereName = await strapi.query('plugin::upload.file').findOne({
      where: {
        name: fileName.replace(/\..*$/, ''),
      },
    });

    if (fileWhereName) {
      // File exists, don't upload it
      existingFiles.push(fileWhereName);
    } else {
      // File doesn't exist, upload it
      const fileData = getFileData(fileName);
      const fileNameNoExtension = fileName.split('.').shift();
      const [file] = await uploadFile(fileData, fileNameNoExtension);
      uploadedFiles.push(file);
    }
  }
  const allFiles = [...existingFiles, ...uploadedFiles];
  // If only one file then return only that file
  return allFiles.length === 1 ? allFiles[0] : allFiles;
}

async function updateBlocks(blocks) {
  const updatedBlocks = [];
  for (const block of blocks) {
    if (block.__component === 'shared.media') {
      const uploadedFiles = await checkFileExistsBeforeUpload([block.file]);
      // Copy the block to not mutate directly
      const blockCopy = { ...block };
      // Replace the file name on the block with the actual file
      blockCopy.file = uploadedFiles;
      updatedBlocks.push(blockCopy);
    } else if (block.__component === 'about.hero') {
      const uploadedFiles = await checkFileExistsBeforeUpload([block.backgroundImage]);
      const blockCopy = { ...block };
      blockCopy.backgroundImage = uploadedFiles;
      updatedBlocks.push(blockCopy);
    } else if (block.__component === 'about.story-section') {
      const items = await Promise.all(
        block.items.map(async (item) => {
          const uploadedFiles = await checkFileExistsBeforeUpload([item.image]);
          return { ...item, image: uploadedFiles };
        })
      );
      updatedBlocks.push({ ...block, items });
    } else if (block.__component === 'about.manifesto') {
      const uploadedFiles = await checkFileExistsBeforeUpload([block.image]);
      updatedBlocks.push({ ...block, image: uploadedFiles });
    } else if (block.__component === 'about.mission') {
      const uploadedFiles = await checkFileExistsBeforeUpload([block.image]);
      updatedBlocks.push({ ...block, image: uploadedFiles });
    } else if (block.__component === 'shared.slider') {
      // Get files already uploaded to Strapi or upload new files
      const existingAndUploadedFiles = await checkFileExistsBeforeUpload(block.files);
      // Copy the block to not mutate directly
      const blockCopy = { ...block };
      // Replace the file names on the block with the actual files
      blockCopy.files = existingAndUploadedFiles;
      // Push the updated block
      updatedBlocks.push(blockCopy);
    } else if (block.__component === 'blog.image') {
      const uploadedFiles = await checkFileExistsBeforeUpload([block.image]);
      const blockCopy = { ...block };
      blockCopy.image = uploadedFiles;
      updatedBlocks.push(blockCopy);
    } else {
      // Just push the block as is
      updatedBlocks.push(block);
    }
  }

  return updatedBlocks;
}

async function importArticles() {
  for (const article of articles) {
    const cover = await checkFileExistsBeforeUpload([`${article.slug}.jpg`]);
    const updatedBlocks = await updateBlocks(article.blocks);

    await createEntry({
      model: 'article',
      entry: {
        ...article,
        cover,
        blocks: updatedBlocks,
        // Make sure it's not a draft
        publishedAt: Date.now(),
      },
    });
  }
}

async function importBlogs() {
  if (!blogs?.length) {
    return;
  }

  for (const blog of blogs) {
    const updatedContent = blog.content ? await updateBlocks(blog.content) : undefined;
    const coverImage = blog.coverImage
      ? await checkFileExistsBeforeUpload([blog.coverImage])
      : undefined;

    const entry = {
      ...blog,
      // Make sure it's not a draft
      publishedAt: Date.now(),
    };

    if (updatedContent) {
      entry.content = updatedContent;
    }

    if (coverImage) {
      entry.coverImage = coverImage;
    }

    await createEntry({
      model: 'blog',
      entry,
    });
  }
}

async function importGlobal() {
  const favicon = await checkFileExistsBeforeUpload(['favicon.png']);
  const shareImage = await checkFileExistsBeforeUpload(['default-image.png']);
  return createEntry({
    model: 'global',
    entry: {
      ...global,
      favicon,
      // Make sure it's not a draft
      publishedAt: Date.now(),
      defaultSeo: {
        ...global.defaultSeo,
        shareImage,
      },
    },
  });
}

async function importAbout() {
  const updatedBlocks = await updateBlocks(about.blocks);

  await createEntry({
    model: 'about',
    entry: {
      ...about,
      blocks: updatedBlocks,
      // Make sure it's not a draft
      publishedAt: Date.now(),
    },
  });
}

async function importContact() {
  await createEntry({
    model: 'contact',
    entry: {
      ...contact,
      // Make sure it's not a draft
      publishedAt: Date.now(),
    },
  });
}

async function importContactForms() {
  if (!contactForms?.length) {
    return;
  }

  for (const form of contactForms) {
    await createEntry({
      model: 'contact-form',
      entry: form,
    });
  }
}

async function importPricing() {
  await createEntry({
    model: 'pricing',
    entry: {
      ...pricing,
      // Make sure it's not a draft
      publishedAt: Date.now(),
    },
  });
}

async function importHomeFeatures() {
  if (!homeFeatures?.length) {
    return;
  }

  for (const feature of homeFeatures) {
    const image = await checkFileExistsBeforeUpload([feature.image]);
    await createEntry({
      model: 'home-feature',
      entry: {
        ...feature,
        image,
      },
    });
  }
}

async function importTestimonials() {
  if (!testimonials?.length) {
    return;
  }

  for (const testimonial of testimonials) {
    const image = await checkFileExistsBeforeUpload([testimonial.image]);
    await createEntry({
      model: 'testimonial',
      entry: {
        ...testimonial,
        image,
      },
    });
  }
}

async function importPolicyPage() {
  if (!policyPage) {
    return;
  }

  await createEntry({
    model: 'policy-page',
    entry: policyPage,
  });
}

async function importCareerPage() {
  if (!careerPage) {
    return;
  }

  const heroImage = await checkFileExistsBeforeUpload([careerPage.heroImage]);
  const cultureCards = await Promise.all(
    careerPage.cultureCards.map(async (card) => {
      const image = await checkFileExistsBeforeUpload([card.image]);
      return { ...card, image };
    })
  );

  await createEntry({
    model: 'career-page',
    entry: {
      ...careerPage,
      heroImage,
      cultureCards,
    },
  });
}

async function importJobOpenings() {
  if (!jobOpenings?.length) {
    return;
  }

  for (const opening of jobOpenings) {
    await createEntry({
      model: 'job-opening',
      entry: opening,
    });
  }
}

async function importJobApplications() {
  if (!jobApplications?.length) {
    return;
  }

  for (const application of jobApplications) {
    const resume = await checkFileExistsBeforeUpload([application.resume]);
    await createEntry({
      model: 'job-application',
      entry: {
        ...application,
        resume,
      },
    });
  }
}

async function importFaq() {
  await createEntry({
    model: 'faq',
    entry: {
      ...faq,
      // Make sure it's not a draft
      publishedAt: Date.now(),
    },
  });
}

async function importHomePage() {
  if (!homePage) {
    return;
  }

  const hero = { ...homePage.hero };
  if (hero?.heroImage) {
    hero.heroImage = await checkFileExistsBeforeUpload([hero.heroImage]);
  }

  const services = await Promise.all(
    homePage.services.map(async (service) => {
      const image = await checkFileExistsBeforeUpload([service.image]);
      return { ...service, image };
    })
  );

  const leftCardImage = await checkFileExistsBeforeUpload([
    homePage.tersano.leftCard.image,
  ]);
  const rightCardImage = await checkFileExistsBeforeUpload([
    homePage.tersano.rightCard.image,
  ]);

  const tersano = {
    ...homePage.tersano,
    leftCard: {
      ...homePage.tersano.leftCard,
      image: leftCardImage,
    },
    rightCard: {
      ...homePage.tersano.rightCard,
      image: rightCardImage,
    },
  };

  await createEntry({
    model: 'home-page',
    entry: {
      ...homePage,
      hero,
      services,
      tersano,
      // Make sure it's not a draft
      publishedAt: Date.now(),
    },
  });
}

async function importProducts() {
  for (const product of products) {
    const thumbnail = await checkFileExistsBeforeUpload([product.thumbnail]);
    const images = product.images?.length
      ? await checkFileExistsBeforeUpload(product.images)
      : undefined;

    const entry = {
      ...product,
      thumbnail,
      // Make sure it's not a draft
      publishedAt: Date.now(),
    };

    if (images) {
      entry.images = images;
    }

    await createEntry({ model: 'product', entry });
  }
}

async function importCategories() {
  for (const category of categories) {
    await createEntry({ model: 'category', entry: category });
  }
}

async function importAuthors() {
  for (const author of authors) {
    const avatar = await checkFileExistsBeforeUpload([author.avatar]);

    await createEntry({
      model: 'author',
      entry: {
        ...author,
        avatar,
      },
    });
  }
}

async function importSeedData() {
  // Allow read of application content types
  await setPublicPermissions({
    blog: ['find', 'findOne'],
    article: ['find', 'findOne'],
    category: ['find', 'findOne'],
    author: ['find', 'findOne'],
    global: ['find', 'findOne'],
    about: ['find', 'findOne'],
    contact: ['find', 'findOne'],
    'career-page': ['find', 'findOne'],
    pricing: ['find', 'findOne'],
    faq: ['find', 'findOne'],
    'home-page': ['find', 'findOne'],
    'home-feature': ['find', 'findOne'],
    'job-opening': ['find', 'findOne'],
    'policy-page': ['find', 'findOne'],
    product: ['find', 'findOne'],
    testimonial: ['find', 'findOne'],
  });

  // Create all entries
  await importCategories();
  await importAuthors();
  await importBlogs();
  await importArticles();
  await importGlobal();
  await importAbout();
  await importCareerPage();
  await importContact();
  await importContactForms();
  await importPricing();
  await importFaq();
  await importHomePage();
  await importHomeFeatures();
  await importTestimonials();
  await importPolicyPage();
  await importJobOpenings();
  await importJobApplications();
  await importProducts();
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedExampleApp();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
