import type { Schema, Struct } from '@strapi/strapi';

export interface AboutHero extends Struct.ComponentSchema {
  collectionName: 'components_about_heroes';
  info: {
    description: 'About page hero section';
    displayName: 'Hero';
    icon: 'image';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface AboutManifesto extends Struct.ComponentSchema {
  collectionName: 'components_about_manifestos';
  info: {
    description: 'We Clean / We Train / You Relax section';
    displayName: 'Manifesto Section';
    icon: 'list';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    items: Schema.Attribute.Component<'about.manifesto-item', true> &
      Schema.Attribute.Required;
  };
}

export interface AboutManifestoItem extends Struct.ComponentSchema {
  collectionName: 'components_about_manifesto_items';
  info: {
    description: 'Single line in the About manifesto section';
    displayName: 'Manifesto Item';
    icon: 'paragraph';
  };
  attributes: {
    description: Schema.Attribute.Text;
    highlightColor: Schema.Attribute.Enumeration<['blue', 'yellow', 'green']> &
      Schema.Attribute.Required;
    highlightText: Schema.Attribute.String & Schema.Attribute.Required;
    leadingText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutMission extends Struct.ComponentSchema {
  collectionName: 'components_about_missions';
  info: {
    description: 'Mission text with supporting image';
    displayName: 'Mission Section';
    icon: 'flag';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutStoryItem extends Struct.ComponentSchema {
  collectionName: 'components_about_story_items';
  info: {
    description: 'Single text + image row in the about story section';
    displayName: 'Story Item';
    icon: 'align-left';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface AboutStorySection extends Struct.ComponentSchema {
  collectionName: 'components_about_story_sections';
  info: {
    description: 'Two-column story section on the about page';
    displayName: 'Story Section';
    icon: 'list';
  };
  attributes: {
    items: Schema.Attribute.Component<'about.story-item', true> &
      Schema.Attribute.Required;
  };
}

export interface BlogHeading extends Struct.ComponentSchema {
  collectionName: 'components_blog_headings';
  info: {
    description: '';
    displayName: 'Heading';
    icon: 'heading';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlogImage extends Struct.ComponentSchema {
  collectionName: 'components_blog_images';
  info: {
    description: '';
    displayName: 'Image';
    icon: 'image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['narrow', 'wide']> &
      Schema.Attribute.DefaultTo<'wide'>;
  };
}

export interface BlogParagraph extends Struct.ComponentSchema {
  collectionName: 'components_blog_paragraphs';
  info: {
    description: '';
    displayName: 'Paragraph';
    icon: 'align-justify';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface CareerCultureCard extends Struct.ComponentSchema {
  collectionName: 'components_career_culture_cards';
  info: {
    description: 'Image card for the career culture section';
    displayName: 'Culture Card';
    icon: 'image';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareerJob extends Struct.ComponentSchema {
  collectionName: 'components_career_jobs';
  info: {
    description: 'Single job item';
    displayName: 'Job';
    icon: 'briefcase';
  };
  attributes: {
    tags: Schema.Attribute.Component<'career.job-tag', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareerJobGroup extends Struct.ComponentSchema {
  collectionName: 'components_career_job_groups';
  info: {
    description: 'Group of jobs for a team';
    displayName: 'Job Group';
    icon: 'list';
  };
  attributes: {
    jobs: Schema.Attribute.Component<'career.job', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareerJobTag extends Struct.ComponentSchema {
  collectionName: 'components_career_job_tags';
  info: {
    description: 'Label for a job tag';
    displayName: 'Job Tag';
    icon: 'tag';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareerRequirement extends Struct.ComponentSchema {
  collectionName: 'components_career_requirements';
  info: {
    description: 'Single bullet line in job requirements';
    displayName: 'Requirement';
    icon: 'dot-circle';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ContactSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_contact_social_links';
  info: {
    description: 'Social link shown in contact section';
    displayName: 'Contact Social Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      ['tiktok', 'facebook', 'line', 'instagram']
    > &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FaqAnswerRow extends Struct.ComponentSchema {
  collectionName: 'components_faq_answer_rows';
  info: {
    description: 'Single row in the FAQ answer list';
    displayName: 'FAQ Answer Row';
    icon: 'align-justify';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FaqItem extends Struct.ComponentSchema {
  collectionName: 'components_faq_items';
  info: {
    description: 'Question and its answer rows';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answerRows: Schema.Attribute.Component<'faq.answer-row', true> &
      Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeBookingBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_booking_banners';
  info: {
    description: 'CTA banner for booking services on the home page';
    displayName: 'Booking Banner';
    icon: 'announcement';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    ctaUrl: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    description: 'Homepage hero section';
    displayName: 'Hero';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    headingLines: Schema.Attribute.Component<'home.hero-line', true> &
      Schema.Attribute.Required;
    heroImage: Schema.Attribute.Media<'images'>;
    heroImageMobile: Schema.Attribute.Media<'images'>;
    primaryCtaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCtaUrl: Schema.Attribute.String & Schema.Attribute.Required;
    secondaryCtaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    secondaryCtaUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHeroLine extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_lines';
  info: {
    description: 'Single headline line with a highlighted word';
    displayName: 'Hero Line';
    icon: 'heading';
  };
  attributes: {
    accent: Schema.Attribute.Enumeration<['navy', 'gold', 'sage']> &
      Schema.Attribute.Required;
    highlightText: Schema.Attribute.String & Schema.Attribute.Required;
    leadingText: Schema.Attribute.String & Schema.Attribute.Required;
    trailingText: Schema.Attribute.String;
  };
}

export interface HomeProductCard extends Struct.ComponentSchema {
  collectionName: 'components_home_product_cards';
  info: {
    description: 'Product feature card for the Tersano section';
    displayName: 'Product Card';
    icon: 'package';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_home_service_cards';
  info: {
    description: 'Image card for homepage services section';
    displayName: 'Service Card';
    icon: 'grid';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeTersano extends Struct.ComponentSchema {
  collectionName: 'components_home_tersanos';
  info: {
    description: 'Two product cards shown in the Tersano section';
    displayName: 'Tersano Section';
    icon: 'star';
  };
  attributes: {
    leftCard: Schema.Attribute.Component<'home.product-card', false> &
      Schema.Attribute.Required;
    rightCard: Schema.Attribute.Component<'home.product-card', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PolicyBullet extends Struct.ComponentSchema {
  collectionName: 'components_policy_bullets';
  info: {
    description: 'Single bullet line in a policy section';
    displayName: 'Policy Bullet';
    icon: 'dot-circle';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface PolicySection extends Struct.ComponentSchema {
  collectionName: 'components_policy_sections';
  info: {
    description: 'Numbered policy section with body text and bullets';
    displayName: 'Policy Section';
    icon: 'list';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    bullets: Schema.Attribute.Component<'policy.bullet', true>;
    note: Schema.Attribute.RichText;
    number: Schema.Attribute.Integer & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PricingNote extends Struct.ComponentSchema {
  collectionName: 'components_pricing_notes';
  info: {
    description: 'Footnote for pricing table';
    displayName: 'Pricing Note';
    icon: 'info-circle';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PricingPackage extends Struct.ComponentSchema {
  collectionName: 'components_pricing_packages';
  info: {
    description: 'Package tab and its rows';
    displayName: 'Pricing Package';
    icon: 'chart-pie';
  };
  attributes: {
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    rows: Schema.Attribute.Component<'pricing.row', true> &
      Schema.Attribute.Required;
  };
}

export interface PricingRow extends Struct.ComponentSchema {
  collectionName: 'components_pricing_rows';
  info: {
    description: 'Single row in the pricing table';
    displayName: 'Pricing Row';
    icon: 'table';
  };
  attributes: {
    area: Schema.Attribute.String & Schema.Attribute.Required;
    eightTimes: Schema.Attribute.String & Schema.Attribute.Required;
    fourTimes: Schema.Attribute.String & Schema.Attribute.Required;
    hours: Schema.Attribute.Integer & Schema.Attribute.Required;
    once: Schema.Attribute.String & Schema.Attribute.Required;
    twice: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductLandingFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_product_landing_feature_cards';
  info: {
    description: 'Feature card with image, title, and description';
    displayName: 'Feature Card';
    icon: 'image';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductLandingReasonItem extends Struct.ComponentSchema {
  collectionName: 'components_product_landing_reason_items';
  info: {
    description: 'Reason item with icon, title, and description';
    displayName: 'Reason Item';
    icon: 'thumbs-up';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      ['safer', 'save-time-cost', 'proven-performance', 'sustainability']
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductLandingSpecItem extends Struct.ComponentSchema {
  collectionName: 'components_product_landing_spec_items';
  info: {
    description: 'Technical spec item with icon';
    displayName: 'Spec Item';
    icon: 'list';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['battery', 'spray', 'filter', 'faucet', 'badge', 'safety']
    > &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    underlineValue: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductLandingStandardItem extends Struct.ComponentSchema {
  collectionName: 'components_product_landing_standard_items';
  info: {
    description: 'Certification standard item';
    displayName: 'Standard Item';
    icon: 'certificate';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ProductLandingTableRow extends Struct.ComponentSchema {
  collectionName: 'components_product_landing_table_rows';
  info: {
    description: 'Simple label/value row';
    displayName: 'Table Row';
    icon: 'table';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductTechnicalSpecRow extends Struct.ComponentSchema {
  collectionName: 'components_product_technical_spec_rows';
  info: {
    description: 'Row in the technical specification table';
    displayName: 'Technical Spec Row';
    icon: 'table';
  };
  attributes: {
    columnOne: Schema.Attribute.String & Schema.Attribute.Required;
    columnTwo: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductTechnicalSpecTable extends Struct.ComponentSchema {
  collectionName: 'components_product_technical_spec_tables';
  info: {
    description: 'Technical specification table for product details';
    displayName: 'Technical Spec Table';
    icon: 'table';
  };
  attributes: {
    columnOneHeader: Schema.Attribute.String & Schema.Attribute.Required;
    columnTwoHeader: Schema.Attribute.String & Schema.Attribute.Required;
    detailHeader: Schema.Attribute.String & Schema.Attribute.Required;
    rows: Schema.Attribute.Component<'product.technical-spec-row', true> &
      Schema.Attribute.Required;
  };
}

export interface ServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_service_cards';
  info: {
    description: 'Image card with title and description';
    displayName: 'Service Card';
    icon: 'image';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceClientCard extends Struct.ComponentSchema {
  collectionName: 'components_service_client_cards';
  info: {
    description: 'Client testimonial card';
    displayName: 'Client Card';
    icon: 'user';
  };
  attributes: {
    company: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    location: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_service_cta_banners';
  info: {
    description: 'Image banner with CTA button';
    displayName: 'CTA Banner';
    icon: 'announcement';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    ctaUrl: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ServiceImageItem extends Struct.ComponentSchema {
  collectionName: 'components_service_image_items';
  info: {
    description: 'Standalone image item';
    displayName: 'Image Item';
    icon: 'image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
  };
}

export interface ServiceOutcomeItem extends Struct.ComponentSchema {
  collectionName: 'components_service_outcome_items';
  info: {
    description: 'Outcome item with icon, title, and description';
    displayName: 'Outcome Item';
    icon: 'chart-line';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      ['team', 'shield-check', 'uptrend', 'consistency', 'sustainability']
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceQuoteBanner extends Struct.ComponentSchema {
  collectionName: 'components_service_quote_banners';
  info: {
    description: 'Full-width banner with background image and overlay text';
    displayName: 'Quote Banner';
    icon: 'quote-left';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ServiceReasonItem extends Struct.ComponentSchema {
  collectionName: 'components_service_reason_items';
  info: {
    description: 'Icon + text item for service reasons';
    displayName: 'Reason Item';
    icon: 'check';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['room-cleaning', 'people', 'floor', 'ecology-1']
    > &
      Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.hero': AboutHero;
      'about.manifesto': AboutManifesto;
      'about.manifesto-item': AboutManifestoItem;
      'about.mission': AboutMission;
      'about.story-item': AboutStoryItem;
      'about.story-section': AboutStorySection;
      'blog.heading': BlogHeading;
      'blog.image': BlogImage;
      'blog.paragraph': BlogParagraph;
      'career.culture-card': CareerCultureCard;
      'career.job': CareerJob;
      'career.job-group': CareerJobGroup;
      'career.job-tag': CareerJobTag;
      'career.requirement': CareerRequirement;
      'contact.social-link': ContactSocialLink;
      'faq.answer-row': FaqAnswerRow;
      'faq.item': FaqItem;
      'home.booking-banner': HomeBookingBanner;
      'home.hero': HomeHero;
      'home.hero-line': HomeHeroLine;
      'home.product-card': HomeProductCard;
      'home.service-card': HomeServiceCard;
      'home.tersano': HomeTersano;
      'policy.bullet': PolicyBullet;
      'policy.section': PolicySection;
      'pricing.note': PricingNote;
      'pricing.package': PricingPackage;
      'pricing.row': PricingRow;
      'product-landing.feature-card': ProductLandingFeatureCard;
      'product-landing.reason-item': ProductLandingReasonItem;
      'product-landing.spec-item': ProductLandingSpecItem;
      'product-landing.standard-item': ProductLandingStandardItem;
      'product-landing.table-row': ProductLandingTableRow;
      'product.technical-spec-row': ProductTechnicalSpecRow;
      'product.technical-spec-table': ProductTechnicalSpecTable;
      'service.card': ServiceCard;
      'service.client-card': ServiceClientCard;
      'service.cta-banner': ServiceCtaBanner;
      'service.image-item': ServiceImageItem;
      'service.outcome-item': ServiceOutcomeItem;
      'service.quote-banner': ServiceQuoteBanner;
      'service.reason-item': ServiceReasonItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
