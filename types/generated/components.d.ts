import type { Schema, Struct } from '@strapi/strapi';

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
      'pricing.note': PricingNote;
      'pricing.package': PricingPackage;
      'pricing.row': PricingRow;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
